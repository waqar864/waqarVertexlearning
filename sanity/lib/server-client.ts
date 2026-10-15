import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Server-side Sanity client with read token
 * Uses fresh data (useCdn: false) for guaranteed accuracy
 * Only use this in server components, route handlers, and server actions
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
})
