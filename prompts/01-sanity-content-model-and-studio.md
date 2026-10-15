# Implementation Prompt: Sanity Content Model and Standalone Studio for Vertex

## Goal
Implement the complete Sanity content model (schemas for course, module, lesson, instructor, category, video, and progress) using a standalone Studio workspace, and set up a server-side read client with a data access layer for the Vertex learning platform.

## Skills Read
- `~/.claude/skills/sanity-best-practices/SKILL.md` - Core Sanity development patterns
- `~/.claude/skills/sanity-best-practices/references/schema.md` - Schema design rules
- `~/.claude/skills/sanity-best-practices/references/nextjs.md` - Next.js integration patterns (standalone Studio section)
- `~/.claude/skills/sanity-best-practices/references/portable-text.md` - Rich text modeling

## Existing Code Inspected
- `sanity.config.ts` - Currently embedded Studio config at `/studio` route (will be removed/moved)
- `sanity/env.ts` - Environment variable setup (projectId, dataset, apiVersion)
- `sanity/lib/client.ts` - Basic Sanity client (currently uses CDN)
- `sanity/lib/live.ts` - Live Content API setup (exists)
- `sanity/schemaTypes/index.ts` - Empty schema array
- `sanity/structure.ts` - Default structure with all document types
- `.env.local` - Contains Sanity project credentials (znfr2n50, production dataset)
- `package.json` - Has `next-sanity@13.3.4`, `sanity@5.31.2`, `@sanity/image-url@2.1.1`, `@sanity/vision@5.31.2`
- Project structure: Currently single workspace with embedded Studio

## Decisions and Assumptions

### Architecture - STANDALONE STUDIO (Recommended)
Following sanity-best-practices guidance, we will:
1. **Create a separate `studio/` workspace** at the root level alongside the existing Next.js app
2. **Move schema files** from `sanity/schemaTypes/` to `studio/schemaTypes/`
3. **Create new `studio/sanity.config.ts`** for the standalone Studio
4. **Remove embedded Studio** route at `app/studio/[[...tool]]/page.tsx`
5. **Keep `sanity/` folder in root** for Next.js integration files (client, live, env, image)
6. **Run Studio separately** on its own port (typically 3333) with `sanity dev`

Benefits of standalone Studio:
- 10-30x faster dev and builds (Vite vs Next.js bundling)
- Auto-updates without redeploying Next.js app
- TypeGen watch mode that regenerates on query changes
- Independent content model from website code
- Better separation of concerns

### Content Model Design
1. **Course** (document) - Top-level container with marketing fields, modules array, references to instructor and category
2. **Module** (object) - Embedded in course, not standalone, contains ordered lesson references
3. **Lesson** (document) - Standalone with video URL, rich notes, key points, resources
4. **Instructor** (document) - Reusable across courses
5. **Category** (document) - For course categorization
6. **Video** (document) - Internal lookup for transcripts/chapters, built by offline pipeline (schema only, no ingestion yet)
7. **Progress** (document) - User state keyed by Clerk userId, written server-side only

### Field Modeling Decisions
- **Modules are embedded objects** (not separate documents) per AGENTS.md requirement
- **Lessons are documents** with reverse reference lookup to find parent course
- **Video documents** are keyed by a sanitized video URL (id field), with chapters and transcript chunks arrays
- **Portable Text** for lesson notes (rich text with structure)
- **Simple arrays of objects** for learning outcomes, key points, resources
- **References** for instructor, category, and lesson relationships
- **All arrays include _key** for Visual Editing support
- **All documents and objects have icons** from `@sanity/icons` using correct v5 import pattern

### Token Security
- Add `SANITY_API_READ_TOKEN` to `.env.local` (server-only)
- Server client uses token, disables CDN for fresh reads
- Browser-exposed client stays CDN-based, no token

## Requirements

### 1. Create Standalone Studio Workspace

Create `studio/` directory at project root with:

```
studio/
├── sanity.config.ts       # Studio configuration
├── sanity.cli.ts          # CLI configuration
├── package.json           # Studio dependencies
├── tsconfig.json          # TypeScript config for Studio
├── .gitignore            # Ignore node_modules, etc
├── schemaTypes/
│   ├── index.ts
│   ├── course.ts
│   ├── lesson.ts
│   ├── instructor.ts
│   ├── category.ts
│   ├── video.ts
│   ├── progress.ts
│   ├── module.ts
│   └── shared/
│       └── portableTextConfig.ts
└── structure.ts
```

#### `studio/package.json`:
```json
{
  "name": "vertex-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy"
  },
  "dependencies": {
    "@sanity/icons": "^3.6.0",
    "@sanity/vision": "^5.31.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "sanity": "^5.31.2",
    "styled-components": "^6.6.0"
  },
  "devDependencies": {
    "@types/react": "^18",
    "typescript": "^5"
  }
}
```

#### `studio/sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'znfr2n50'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'vertex-studio',
  title: 'Vertex Learning Platform',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2026-10-15' }),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

#### `studio/sanity.cli.ts`:
```typescript
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'znfr2n50'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
```

#### `studio/tsconfig.json`:
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["./**/*.ts", "./**/*.tsx"],
  "exclude": ["node_modules"]
}
```

#### `studio/.gitignore`:
```
node_modules
dist
.sanity
```

### 2. Schema Types in `studio/schemaTypes/`

Create all schema files following the same structure as before:

#### Documents
- `course.ts` - Course document with all fields as specified
- `lesson.ts` - Lesson document with video, notes, resources
- `instructor.ts` - Instructor with name, photo, bio
- `category.ts` - Category with title, slug, description
- `video.ts` - Video with chapters and transcript chunks
- `progress.ts` - Progress tracking per user

#### Objects
- `module.ts` - Module object (embedded in course)

#### Shared
- `shared/portableTextConfig.ts` - Portable Text configuration

All schemas use:
- `defineType`, `defineField`, `defineArrayMember` from 'sanity'
- Icons from `@sanity/icons` using v5 import pattern (`@sanity/icons/IconName`)
- Proper validation and preview configurations

### 3. Studio Structure in `studio/structure.ts`

```typescript
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Courses')
        .schemaType('course')
        .child(S.documentTypeList('course')),
      S.listItem()
        .title('Lessons')
        .schemaType('lesson')
        .child(S.documentTypeList('lesson')),
      S.listItem()
        .title('Instructors')
        .schemaType('instructor')
        .child(S.documentTypeList('instructor')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category')),
      S.divider(),
      S.listItem()
        .title('System')
        .child(
          S.list()
            .title('System Documents')
            .items([
              S.listItem()
                .title('Videos')
                .schemaType('video')
                .child(S.documentTypeList('video')),
              S.listItem()
                .title('Progress')
                .schemaType('progress')
                .child(S.documentTypeList('progress')),
            ])
        ),
    ])
```

### 4. Update Root Files

#### Remove/Update:
- **Delete** `app/studio/[[...tool]]/page.tsx` (embedded Studio route)
- **Delete** root `sanity.config.ts` (embedded Studio config)
- **Keep** root `sanity/` folder for Next.js integration

#### Keep in root `sanity/` folder:
- `sanity/env.ts` - Environment variables
- `sanity/lib/client.ts` - Browser client (CDN)
- `sanity/lib/server-client.ts` - **NEW** Server client with token
- `sanity/lib/live.ts` - Live Content API
- `sanity/lib/image.ts` - Image URL builder

### 5. Server-Side Read Client

Create `sanity/lib/server-client.ts`:
```typescript
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
})
```

### 6. Data Access Layer

Create `lib/sanity/data.ts` with typed fetch helpers:
- `getCourses()` - All courses with basic fields
- `getCourseBySlug(slug)` - Course with modules, lessons, instructor, category
- `getLessonBySlug(slug)` - Lesson with notes, resources, parent course
- `getInstructorBySlug(slug)` - Instructor with their courses
- `getCategories()` - All categories

Each with GROQ query constants and error handling.

### 7. Environment Variables

Update `.env.local`:
```env
# Existing Clerk vars...
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="znfr2n50"

# Server-only token
SANITY_API_READ_TOKEN=<get-from-sanity-manage>
```

Create `.env.example`:
```env
# Public Sanity config
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-15

# Clerk (public)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Server-only tokens
CLERK_SECRET_KEY=
SANITY_API_READ_TOKEN=
```

Create `studio/.env.local`:
```env
SANITY_STUDIO_PROJECT_ID="znfr2n50"
SANITY_STUDIO_DATASET="production"
```

### 8. Update Root package.json Scripts

Add Studio commands to root `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:studio": "cd studio && npm run dev",
    "dev:all": "concurrently \"npm run dev\" \"npm run dev:studio\"",
    "build": "next build",
    "build:studio": "cd studio && npm run build",
    "studio:deploy": "cd studio && npm run deploy"
  }
}
```

(Optional: install `concurrently` for parallel dev servers)

### 9. CORS Configuration

After setup, add CORS origins for localhost:
```bash
cd studio
npx sanity cors add http://localhost:3000 --credentials
```

## Security Considerations
- **Private dataset**: All content fetching uses server-side client with token
- **Token isolation**: `SANITY_API_READ_TOKEN` never exposed to browser
- **Separate Studio**: Runs on different port, independently deployed
- **Progress writes**: Via server routes only (implemented later)
- **Video documents**: Internal only, never surfaced to users

## Acceptance Criteria
1. Standalone `studio/` workspace exists with its own package.json
2. All schema types defined with proper Sanity helpers and v5 icon imports
3. Studio runs independently on port 3333 with `npm run dev` from studio folder
4. Embedded Studio route removed from Next.js app
5. Server client isolated with token and `useCdn: false`
6. Data layer exports typed fetch functions
7. Environment files configured for both workspaces
8. Studio structure organizes content logically
9. No TypeScript errors in either workspace

## Checks to Run

### From `studio/` directory:
1. `npm install` - Install Studio dependencies
2. `npm run dev` - Studio should start on http://localhost:3333
3. Verify all content types visible in Studio navigation
4. Test Vision plugin query: `*[_type == "course"]`

### From root directory:
1. `npx tsc --noEmit` - Type check Next.js app
2. `npm run lint` - Lint Next.js app
3. `npm run build` - Production build
4. `npm run dev` - Next.js dev server on http://localhost:3000
5. Verify no `/studio` route exists (should 404)

## Exact Manual Test Steps
1. Install Studio dependencies: `cd studio && npm install && cd ..`
2. Start Studio: Open terminal 1, `cd studio && npm run dev`
3. Start Next.js: Open terminal 2, `npm run dev`
4. Navigate to `http://localhost:3333` (Studio)
5. Create test category: "Programming"
6. Create test instructor with name and expertise
7. Create test lesson with title, YouTube URL, duration, notes
8. Create test course, reference instructor/category, add module with lesson
9. Verify course shows with module containing lesson
10. Open Vision plugin, run: `*[_type == "course"][0]{ title, modules[]{title, lessons[]->{ title }} }`
11. Verify query returns course with populated data
12. Navigate to `http://localhost:3000` (Next.js app)
13. Verify `/studio` route returns 404

## Schema Deploy
After content model is working locally:
```bash
cd studio
npx sanity deploy  # Deploys Studio app (required for Context MCP)
npx sanity schema deploy  # Deploys schema to Sanity
```

## Notes
- Standalone Studio is the **recommended architecture** per sanity-best-practices
- Studio runs independently, deploys independently, updates independently
- Schema files live in `studio/`, integration files in root `sanity/`
- This is phase 1: content model and read infrastructure only
- Video ingestion, search, progress UI come in later phases
