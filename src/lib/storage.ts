import { exportPosts, importPosts } from 'postkit-storage-lib'
import type { Post } from '../types'

export function downloadPosts(posts: Post[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = exportPosts(posts as any[])
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'postkit-backup.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function readImportFile(file: File): Promise<Post[]> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const json = e.target?.result as string
      resolve(importPosts(json) as Post[])
    }
    reader.readAsText(file)
  })
}
