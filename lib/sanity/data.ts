import { serverClient } from '@/sanity/lib/server-client'

/**
 * Data access layer for Sanity content
 * All functions use server-side client with read token
 * These should only be called from server components and routes
 */

// GROQ query constants
const COURSES_QUERY = `
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    "instructor": instructor->{ name, slug, photo },
    "category": category->{ title, slug }
  }
`

const COURSE_BY_SLUG_QUERY = `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes,
    "instructor": instructor->{ _id, name, slug, photo, expertise, bio },
    "category": category->{ _id, title, slug, description },
    modules[]{
      _key,
      title,
      summary,
      lessons[]-> {
        _id,
        title,
        slug,
        videoUrl,
        poster,
        duration,
        freePreview,
        studentCount
      }
    }
  }
`

const LESSON_BY_SLUG_QUERY = `
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources,
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      slug,
      "instructor": instructor->{ name, slug, photo }
    }
  }
`

const INSTRUCTOR_BY_SLUG_QUERY = `
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] {
      _id,
      title,
      slug,
      summary,
      coverImage,
      level,
      studentCount,
      "category": category->{ title, slug }
    }
  }
`

const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

/**
 * Fetch all courses with basic information
 */
export async function getCourses(): Promise<any[]> {
  try {
    return await serverClient.fetch(COURSES_QUERY)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

/**
 * Fetch a single course by slug with full details including modules and lessons
 */
export async function getCourseBySlug(slug: string): Promise<any | null> {
  try {
    return await serverClient.fetch(COURSE_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching course with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch a single lesson by slug with notes, resources, and parent course info
 */
export async function getLessonBySlug(slug: string): Promise<any | null> {
  try {
    return await serverClient.fetch(LESSON_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching lesson with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch an instructor by slug with their courses
 */
export async function getInstructorBySlug(slug: string): Promise<any | null> {
  try {
    return await serverClient.fetch(INSTRUCTOR_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching instructor with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<any[]> {
  try {
    return await serverClient.fetch(CATEGORIES_QUERY)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
