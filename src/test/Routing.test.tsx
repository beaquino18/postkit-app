import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import PostEditor from '../components/PostEditor'
import { useStore } from '../lib/store'
import { makePost } from './factories'

function EditPostRouteWrapper() {
  const { slug } = useParams<{ slug: string }>()
  const posts = useStore((state) => state.posts)
  const post = posts.find((p) => p.slug === slug)
  return <PostEditor existing={post} />
}

beforeEach(() => {
  localStorage.clear()
  useStore.setState({ posts: [], search: '', statusFilter: null, tagFilter: null, sortKey: 'date', sortOrder: 'desc' })
})

// T10 — Routing loads correct post
describe('routing', () => {
  it('loads the correct post into the editor when navigating to its slug URL', () => {
    const post = makePost({ title: 'Routed Post', slug: 'routed-post' })
    useStore.setState({ posts: [post] })

    render(
      <MemoryRouter initialEntries={['/posts/routed-post']}>
        <Routes>
          <Route path="/posts/:slug" element={<EditPostRouteWrapper />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByDisplayValue('Routed Post')).toBeInTheDocument()
  })
})
