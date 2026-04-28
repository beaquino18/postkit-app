
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import { useEffect } from 'react'
import { useStore } from './lib/store'
import { fixtures } from './lib/fixtures'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import PostEditor from './components/PostEditor'

function EditPostRoute() {
  const { slug } = useParams<{ slug: string }>()
  const posts = useStore((state) => state.posts)
  const post = posts.find((p) => p.slug === slug)
  return <PostEditor existing={post} />
}

function App() {
  const posts = useStore((state) => state.posts)
  const addPost = useStore((state) => state.addPost)

  useEffect(() => {
    if (posts.length === 0) {
      fixtures.forEach((post) => addPost(post))
    }
  }, []) 

  return (
    <Routes>
      <Route path="/" element={
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">Posts</h1>
            <Link
              to="/posts/new"
              className="bg-violet-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              New Post
            </Link>
          </div>
          <SearchBar />
          <PostList />
        </div>
      }/>
      <Route path="/posts/new" element={<PostEditor />}/>
      <Route path="/posts/:slug" element={<EditPostRoute />}/>
    </Routes>
  )
}

export default App
