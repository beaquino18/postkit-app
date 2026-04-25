import { searchPosts } from 'postkit-search-library'
import { filterByStatus, filterByTag, sortByDate, sortByTitle } from 'postkit-filter-sort'
import { useStore } from '../lib/store'
import PostPreview from './PostPreview'

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

  let result = searchPosts(posts, search)
  if (statusFilter) result = filterByStatus(result, statusFilter)
  if (tagFilter) result = filterByTag(result, tagFilter)
  if (sortKey === 'date') result = sortByDate(result, sortOrder)
  if (sortKey === 'title') result = sortByTitle(result, sortOrder)

  return(
    <div>
      <section className="status-filter">
        <button onClick={() => setStatusFilter(null)}>All</button>
        <button onClick={() => setStatusFilter('draft')}>Draft</button>
        <button onClick={() => setStatusFilter('review')}>Review</button>
        <button onClick={() => setStatusFilter('published')}>Published</button>
      </section>

      <section className="tag-filter">
        <select onChange={(e) => setTagFilter(e.target.value || null)}>
          <option value="">All tags</option>
          {noDuplicates.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </section>

      <section className="sort">
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as 'date' | 'title')}>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </section>
      {result.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  )
}
