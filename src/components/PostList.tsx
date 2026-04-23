import { searchPosts } from 'postkit-search-library'
import { filterByStatus, filterByTag, sortByDate, sortByTitle } from 'postkit-filter-sort'
import { useStore } from '../lib/store'
import PostPreview from './PostPreview'

export default function PostList() {
  const posts = useStore((state) => state.posts)
  const search = useStore((state) => state.search)
  const statusFilter = useStore((state) => state.statusFilter)
  const tagFilter = useStore((state) => state.tagFilter)
  const sortKey = useStore((state) => state.sortKey)
  const sortOrder = useStore((state) => state.sortOrder)

  let result = searchPosts(posts, search)
  if (statusFilter) result = filterByStatus(result, statusFilter)
  if (tagFilter) result = filterByTag(result, tagFilter)
  if (sortKey === 'date') result = sortByDate(result, sortOrder)
  if (sortKey === 'title') result = sortByTitle(result, sortOrder)

  return(
    <div>
      {result.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  )
}
