import type { Post } from '../types'
import { createSlugFromTitle, makeUniqueSlug } from 'postkit-slug'

export function generateId(): string {
  return crypto.randomUUID()
}

export function createPost(title: string, body: string, author: string, tags: string[], category: string, existingSlugs: string[] = []): Post {
  const id = generateId()
  const status = "draft"
  const createdAt = new Date().toISOString()
  const updatedAt = new Date().toISOString()
  const slug = title.trim() ? makeUniqueSlug(createSlugFromTitle(title), existingSlugs) : ''

  return {
    id,
    title,
    body,
    author,
    tags,
    category,
    status,
    slug,
    createdAt,
    updatedAt
  }
}

export function updatePost(existing: Post, changes: Partial<Post>): Post {
  const updatedAt = new Date().toISOString()

  return { ...existing, ...changes, updatedAt}
}
