import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PostEditor from '../components/PostEditor'
import { useStore } from '../lib/store'
import { makePost } from './factories'

function renderNewPostEditor() {
  render(
    <MemoryRouter initialEntries={['/posts/new']}>
      <Routes>
        <Route path="/" element={<div>Post List</div>} />
        <Route path="/posts/new" element={<PostEditor />} />
      </Routes>
    </MemoryRouter>
  )
}

function renderEditPostEditor(post: ReturnType<typeof makePost>) {
  render(
    <MemoryRouter initialEntries={[`/posts/${post.slug}`]}>
      <Routes>
        <Route path="/" element={<div>Post List</div>} />
        <Route path="/posts/:slug" element={<PostEditor existing={post} />} />
      </Routes>
    </MemoryRouter>
  )
}

beforeEach(() => {
  localStorage.clear()
  useStore.setState({ posts: [], search: '', statusFilter: null, tagFilter: null, sortKey: 'date', sortOrder: 'desc' })
})

// T6 — Create post
describe('creating a post', () => {
  it('adds the post to the store and navigates home on save', async () => {
    renderNewPostEditor()

    await userEvent.type(screen.getByLabelText('Title'), 'My New Post')
    await userEvent.type(screen.getByLabelText('Post'), 'Some body content here.')
    await userEvent.type(screen.getByLabelText('Author'), 'Jane Doe')
    await userEvent.type(screen.getByLabelText('Category'), 'Tech')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    const posts = useStore.getState().posts
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('My New Post')
    expect(posts[0].status).toBe('draft')
    expect(screen.getByText('Post List')).toBeInTheDocument()
  })
})

// T7 — Edit post
describe('editing a post', () => {
  it('updates the post in the store and navigates home on save', async () => {
    const post = makePost({ title: 'Original Title' })
    useStore.setState({ posts: [post] })

    renderEditPostEditor(post)

    const titleInput = screen.getByLabelText('Title')
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    const posts = useStore.getState().posts
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Updated Title')
    expect(screen.getByText('Post List')).toBeInTheDocument()
  })
})

// T8 — Delete post
describe('deleting a post', () => {
  it('removes the post from the store and navigates home after confirmation', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const post = makePost({ title: 'Post To Delete' })
    useStore.setState({ posts: [post] })

    renderEditPostEditor(post)
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(useStore.getState().posts).toHaveLength(0)
    expect(screen.getByText('Post List')).toBeInTheDocument()
  })

  it('does not remove the post if confirmation is cancelled', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    const post = makePost({ title: 'Post To Keep' })
    useStore.setState({ posts: [post] })

    renderEditPostEditor(post)
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(useStore.getState().posts).toHaveLength(1)
  })
})

// T9 — Validation
describe('validation', () => {
  it('shows error messages and does not save when required fields are empty', async () => {
    renderNewPostEditor()

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(useStore.getState().posts).toHaveLength(0)
    expect(screen.getByText('title is required')).toBeInTheDocument()
  })
})
