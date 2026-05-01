import { searchPosts } from 'postkit-search-library'
import { filterByStatus, filterByTag, sortByDate, sortByTitle } from 'postkit-filter-sort'
import { useStore } from '../lib/store'
import PostPreview from './PostPreview'
import { Link } from 'react-router-dom'
import type { Post } from "../types"

const STATUS_FILTERS = [
  { label: 'All', value: null },
  { label: 'Draft', value: 'draft' },
  { label: 'Review', value: 'review' },
  { label: 'Published', value: 'published' },
] as const

const selectClass = "px-3 py-1 text-sm bg-[#fffdf5] border border-[#e0d0a0] rounded-lg text-[#6a5a38] focus:outline-none focus:ring-2 focus:ring-[#e8971a]/40"

export default function PostList() {
  const posts = useStore((state) => state.posts)
  const search = useStore((state) => state.search)
  const statusFilter = useStore((state) => state.statusFilter)
  const setStatusFilter = useStore((state) => state.setStatusFilter)
  const tagFilter = useStore((state) => state.tagFilter)
  const setTagFilter = useStore((state) => state.setTagFilter)
  const sortKey = useStore((state) => state.sortKey)
  const setSortKey = useStore((state) => state.setSortKey)
  const sortOrder = useStore((state) => state.sortOrder)
  const setSortOrder = useStore((state) => state.setSortOrder)

  const allTags = posts.flatMap((x) => x.tags)
  const noDuplicates = [... new Set(allTags)]

  let result = searchPosts(posts, search) as Post[]
  if (statusFilter) result = filterByStatus(result, statusFilter) as Post[]
  if (tagFilter) result = filterByTag(result, tagFilter) as Post[]
  if (sortKey === 'date') result = sortByDate(result, sortOrder) as Post[]
  if (sortKey === 'title') result = sortByTitle(result, sortOrder) as Post[]

  return(
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <section className="flex gap-1">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => setStatusFilter(value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer ${
                statusFilter === value
                  ? 'bg-[#e8971a] text-[#1a1408]'
                  : 'bg-[#fffdf5] text-[#6a5a38] border border-[#e0d0a0] hover:border-[#e8971a]/60 hover:text-[#e8971a]'
              }`}
            >
              {label}
            </button>
          ))}
        </section>

        <section className="flex gap-2 ml-auto">
          <select
            onChange={(e) => setTagFilter(e.target.value || null)}
            className={selectClass}
          >
            <option value="">All tags</option>
            {noDuplicates.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as 'date' | 'title')}
            className={selectClass}
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
            className={selectClass}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </section>
      </div>

      <div className="flex flex-col gap-3">
        {result.map((post) => (
          <Link key={post.id} to={`/posts/${post.slug}`} className="no-underline">
            <PostPreview post={post} />
          </Link>
        ))}
      </div>
    </div>
  )
}
