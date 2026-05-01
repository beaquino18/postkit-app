import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import PostList from '../components/PostList'
import SearchBar from '../components/SearchBar'
import { useStore } from '../lib/store'
import { makePost } from './factories'

function renderPostList() {
  render(
    <MemoryRouter>
      <PostList />
    </MemoryRouter>
  )
}

function renderWithSearch() {
  render(
    <MemoryRouter>
      <SearchBar />
      <PostList />
    </MemoryRouter>
  )
}

beforeEach(() => {
  localStorage.clear()
  useStore.setState({
    posts: [],
    search: '',
    statusFilter: null,
    tagFilter: null,
    sortKey: 'date',
    sortOrder: 'desc',
  })
})

// T1 — Status filter
describe('status filter', () => {
  it('shows only draft posts when Draft is clicked', async () => {
    const draft = makePost({ title: 'Draft Post', status: 'draft' })
    const published = makePost({ title: 'Published Post', status: 'published' })
    useStore.setState({ posts: [draft, published] })

    renderPostList()
    await userEvent.click(screen.getByRole('button', { name: 'Draft' }))

    expect(screen.getByText('Draft Post')).toBeInTheDocument()
    expect(screen.queryByText('Published Post')).not.toBeInTheDocument()
  })

  it('shows all posts when All is clicked after filtering', async () => {
    const draft = makePost({ title: 'Draft Post', status: 'draft' })
    const published = makePost({ title: 'Published Post', status: 'published' })
    useStore.setState({ posts: [draft, published] })

    renderPostList()
    await userEvent.click(screen.getByRole('button', { name: 'Draft' }))
    await userEvent.click(screen.getByRole('button', { name: 'All' }))

    expect(screen.getByText('Draft Post')).toBeInTheDocument()
    expect(screen.getByText('Published Post')).toBeInTheDocument()
  })
})

// T2 — Tag filter
describe('tag filter', () => {
  it('shows only posts matching the selected tag', async () => {
    const reactPost = makePost({ title: 'React Post', tags: ['react'] })
    const vuePost = makePost({ title: 'Vue Post', tags: ['vue'] })
    useStore.setState({ posts: [reactPost, vuePost] })

    renderPostList()
    // first combobox is the tag filter (no accessible label on the select)
    await userEvent.selectOptions(screen.getAllByRole('combobox')[0], 'react')

    expect(screen.getByText('React Post')).toBeInTheDocument()
    expect(screen.queryByText('Vue Post')).not.toBeInTheDocument()
  })
})

// T3 — Sort by date
describe('sort by date', () => {
  it('shows newest post first when sorted descending', () => {
    const older = makePost({ title: 'Older Post', createdAt: '2024-01-01T00:00:00.000Z' })
    const newer = makePost({ title: 'Newer Post', createdAt: '2024-06-01T00:00:00.000Z' })
    useStore.setState({ posts: [older, newer], sortKey: 'date', sortOrder: 'desc' })

    renderPostList()

    const titles = screen.getAllByRole('heading', { level: 2 }).map((el) => el.textContent)
    expect(titles.indexOf('Newer Post')).toBeLessThan(titles.indexOf('Older Post'))
  })

  it('shows oldest post first when sorted ascending', () => {
    const older = makePost({ title: 'Older Post', createdAt: '2024-01-01T00:00:00.000Z' })
    const newer = makePost({ title: 'Newer Post', createdAt: '2024-06-01T00:00:00.000Z' })
    useStore.setState({ posts: [older, newer], sortKey: 'date', sortOrder: 'asc' })

    renderPostList()

    const titles = screen.getAllByRole('heading', { level: 2 }).map((el) => el.textContent)
    expect(titles.indexOf('Older Post')).toBeLessThan(titles.indexOf('Newer Post'))
  })
})

// T4 — Search
describe('search', () => {
  it('shows only posts matching the search query', async () => {
    const match = makePost({ title: 'TypeScript Tips' })
    const noMatch = makePost({ title: 'Cooking Recipes' })
    useStore.setState({ posts: [match, noMatch] })

    renderWithSearch()
    await userEvent.type(screen.getByPlaceholderText('Search posts...'), 'TypeScript')

    expect(screen.getByText('TypeScript Tips')).toBeInTheDocument()
    expect(screen.queryByText('Cooking Recipes')).not.toBeInTheDocument()
  })

  it('shows all posts when search is cleared', async () => {
    const a = makePost({ title: 'TypeScript Tips' })
    const b = makePost({ title: 'Cooking Recipes' })
    useStore.setState({ posts: [a, b] })

    renderWithSearch()
    const input = screen.getByPlaceholderText('Search posts...')
    await userEvent.type(input, 'TypeScript')
    await userEvent.clear(input)

    expect(screen.getByText('TypeScript Tips')).toBeInTheDocument()
    expect(screen.getByText('Cooking Recipes')).toBeInTheDocument()
  })
})
