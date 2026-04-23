import { create } from 'zustand'
import type { Post, PostStatus } from '../types'
import { persist } from 'zustand/middleware'

interface StoreState {
  posts: Post[]
  search: string
  statusFilter: PostStatus | null
  tagFilter: string | null
  sortKey: 'date' | 'title'
  sortOrder: 'asc' | 'desc'
  addPost: (post: Post) => void
  updatePost: (post: Post) => void
  deletePost: (id: string) => void
  setSearch: (query: string) => void
  setStatusFilter: (status: PostStatus | null) => void
  setTagFilter: (tag: string | null) => void
  setSortKey: (key: 'date' | 'title') => void
  setSortOrder: (order: 'asc' | 'desc') => void

}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      posts: [],
      search: '',
      statusFilter: null,
      tagFilter: null,
      sortKey: 'date',
      sortOrder: 'desc',
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      updatePost: (post) => set((state) => ({
        posts: state.posts.map((p) => p.id === post.id ? post : p) })),
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((p) => p.id !== id)
      })),
      setSearch: (query) => set({ search: query }),
      setStatusFilter: (status) => set({ statusFilter: status }),
      setTagFilter: (tag) => set({ tagFilter: tag }),
      setSortKey: (key) => set({ sortKey: key }),
      setSortOrder: (order) => set({ sortOrder: order }),
    }),
    {
      name: 'postkit-storage',
      partialize: (state) => ({ posts: state.posts }),
    }
  )
)
