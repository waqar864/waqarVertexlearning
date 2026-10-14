# Implementation Prompt: Vertex Homepage

## Goal
Implement the Vertex homepage exactly as shown in the design reference (`design/vertex-home.png`), reproducing the layout, spacing, typography, colors, and visual hierarchy precisely on desktop while making it responsive down to mobile.

## Skills Read
- AGENTS.md (project instructions and working methodology)
- Existing component library in `components/`
- Design system in `app/globals.css`

## Code Inspected
- `app/page.tsx` - Current placeholder homepage
- `app/layout.tsx` - Root layout with fonts configured (Playfair Display for display text, Inter for body)
- `components/nav/navbar.tsx` - Navigation component (needs user profile and notification bell additions)
- `components/brand/logo.tsx` - Vertex logo component
- `components/ui/button.tsx` - Button component with variants
- `components/ui/search-input.tsx` - Search input with keyboard shortcut display
- `components/cards/course-card.tsx` - Course card component (needs icon/image customization)
- `app/globals.css` - Design system with color tokens and typography utilities

## Design Analysis
From the reference image, the homepage contains:

1. **Navigation Bar**: Logo on left, "Courses" and "My Learning" links in center, notification bell icon and user avatar on right
2. **Hero Section**: 
   - "INTELLIGENT LEARNING" badge in coral/orange with light background
   - Large display heading: "Search your learning in plain English."
   - Subheading describing the feature
   - "Explore Courses" CTA button in coral/orange
   - Large search input with placeholder "Ask anything about your learning..." and ⌘K shortcut
3. **Course Catalog Section**:
   - "All Courses" heading with "View all courses" link on right
   - Three course cards in a grid:
     - Next.js for Production (N logo, black square)
     - Docker Essentials (Docker whale logo, blue square)
     - TypeScript Deep Dive (TS logo, blue square)
   - Each card shows: icon, title, description, level, duration, and module count
4. **Bottom Banner**: Star icon with text "New courses and lessons added every week."
5. **Decorative Element**: Abstract coral/orange gradient waves at bottom

## Decisions and Assumptions

### Component Reuse
- Use existing `Navbar` component, but enhance it to include:
  - Notification bell icon (Lucide `Bell` icon)
  - User avatar/profile image on the right
- Use existing `SearchInput` component for the hero search
- Use existing `Button` component for CTAs
- Use existing `CourseCard` component, customizing icons per course

### New Components to Create
- `components/ui/badge.tsx` - For "INTELLIGENT LEARNING" tag (if not already exists)
- Hero section will be inline in `app/page.tsx` for now (not extracted to separate component)
- Course icons will be rendered inline or as part of card customization

### Layout Structure
- Full-width sections with max-width containers
- Hero: centered content, generous vertical padding
- Search: prominent, below hero copy
- Course grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Bottom banner: centered with decorative gradient background

### Styling Approach
- Use existing design tokens from `globals.css`
- Primary color `--color-primary-500: #f97316` for CTAs and accents
- Display typography (`text-display-2`) for main headline
- Neutral colors for body text
- White background with subtle gradient decoration at bottom

### Responsive Behavior
- Navigation: Logo always visible, stack nav items on mobile or use hamburger (keep simple for now)
- Hero: Center-aligned on all sizes, scale typography down
- Search bar: Full width with appropriate padding
- Course grid: 3 cols → 2 cols → 1 col stacking
- All spacing scales proportionally

### Data Considerations
- Course data will be hardcoded sample data for now
- Icons will use emoji or Lucide icons as placeholders until real course logos are added
- User avatar will be a placeholder image or generated avatar

## Files Expected to Touch

### Modify
- `app/page.tsx` - Replace with complete homepage implementation
- `components/nav/navbar.tsx` - Add notification bell and user avatar to right side

### Create (if needed)
- `components/ui/badge.tsx` - Small badge/tag component (check if already exists first)
- `public/` - Add any placeholder images if needed (user avatar, course icons if using images)

## Requirements

### Functional
1. Navigation bar with logo, nav links, notification bell, and user avatar
2. Hero section with badge, headline, subheading, and CTA button
3. Prominent search input with keyboard shortcut indicator
4. "All Courses" section header with "View all courses" link
5. Course card grid displaying 3 sample courses
6. Bottom banner with star icon and text
7. All links should use Next.js `Link` component with appropriate hrefs
8. Search input should be interactive (focus states, keyboard shortcut display)

### Visual Accuracy
1. Exact color matching:
   - Primary orange: `#f97316` for buttons, links, badge background
   - Text colors from design system (neutral-900 for headings, neutral-500 for body)
   - White background with subtle gradient decoration
2. Typography matching:
   - Display font (Playfair) for main headline
   - Sans font (Inter) for all other text
   - Exact sizes per design (hero text large and prominent)
3. Spacing precision:
   - Generous hero padding (vertical and horizontal)
   - Consistent card spacing in grid
   - Proper section gaps
4. Border radius: Cards use 12px (`radius-md`), buttons use 12px
5. Shadows: Subtle card shadows from design system

### Responsive
1. Desktop (1024px+): 3-column course grid, full navigation
2. Tablet (768-1023px): 2-column course grid, compact navigation
3. Mobile (< 768px): 1-column course grid, stacked layout, simplified nav

### Accessibility
1. Semantic HTML (nav, main, section)
2. Alt text for images and icons
3. Proper heading hierarchy (h1 for main heading)
4. Keyboard navigation support
5. Focus states on interactive elements
6. ARIA labels where appropriate (notification bell, user menu)

## Security Considerations
- No user data or API calls in this implementation
- All sample data is hardcoded
- No authentication logic (that comes later with Clerk)
- Public routes only
- No sensitive information in code

## Acceptance Criteria

### Visual Match
- [ ] Layout matches design reference at desktop width (1440px)
- [ ] Colors exactly match design tokens
- [ ] Typography sizes and weights match design
- [ ] Spacing and padding match visual hierarchy
- [ ] Icons and badges render correctly
- [ ] Decorative gradient element at bottom

### Responsive Behavior
- [ ] Grid adapts: 3 cols → 2 cols → 1 col at breakpoints
- [ ] Hero content remains centered and readable on all sizes
- [ ] Navigation works on mobile (consider hamburger or simplified)
- [ ] No horizontal scroll at any viewport size
- [ ] Touch targets are adequately sized on mobile (44px minimum)

### Interactive States
- [ ] Button hover states work
- [ ] Link hover states show primary color
- [ ] Search input focus shows border color change
- [ ] All interactive elements have visible focus states

### Code Quality
- [ ] TypeScript with no errors
- [ ] Proper component composition
- [ ] Reuses existing components where appropriate
- [ ] Clean, readable code with minimal duplication
- [ ] Follows Next.js App Router patterns

## Checks to Run

After implementation:
1. `npm run lint` - Must pass with no errors
2. `npx tsc --noEmit` - Type check must pass
3. `npm run build` - Production build must succeed
4. `npm run dev` - Start dev server and verify at http://localhost:3000

## Manual Test Steps

1. **Start dev server**: Run `npm run dev`
2. **Desktop view** (1440px width):
   - Verify navigation bar layout (logo, links, bell, avatar)
   - Check hero section alignment and typography
   - Confirm search bar width and styling
   - Verify 3-column course grid
   - Check bottom banner and gradient decoration
3. **Tablet view** (768px width):
   - Verify 2-column course grid
   - Check responsive spacing adjustments
4. **Mobile view** (375px width):
   - Verify 1-column course grid
   - Check stacked hero layout
   - Verify touch target sizes
   - Confirm no horizontal scroll
5. **Interactions**:
   - Hover over navigation links (should show primary color)
   - Hover over "Explore Courses" button (should darken)
   - Hover over "View all courses" link (should show primary color)
   - Click search input (should show focus border)
   - Hover over course cards (check for subtle effects if any)
6. **Keyboard navigation**:
   - Tab through all interactive elements
   - Verify visible focus states
   - Check logical tab order

## Notes
- This is presentational only - no backend integration yet
- Sample course data is hardcoded
- User avatar and notification features are visual only (non-functional for now)
- Keep implementation focused on visual accuracy, avoid over-engineering
- The decorative gradient at bottom should be CSS-based, not an image
