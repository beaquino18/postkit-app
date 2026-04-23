import type { Post } from '../types'

export function generateId(): string {
  return crypto.randomUUID()
}

export function createPost(title: string, body: string, author: string, tags: string[], category: string): Post {
  const id = generateId()
  const status = "draft"
  const createdAt = new Date().toISOString()
  const updatedAt = new Date().toISOString()

  return {
    id,
    title,
    body,
    author,
    tags,
    category,
    status,
    createdAt,
    updatedAt
  }
}

export function updatePost(existing: Post, changes: Partial<Post>): Post {
  const updatedAt = new Date().toISOString()

  return { ...existing, ...changes, updatedAt}
}
