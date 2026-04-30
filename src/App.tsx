
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import { useEffect, useRef } from 'react'
import { useStore } from './lib/store'
import { fixtures } from './lib/fixtures'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import PostEditor from './components/PostEditor'
import { downloadPosts, readImportFile } from './lib/storage'

function EditPostRoute() {
  const { slug } = useParams<{ slug: string }>()
  const posts = useStore((state) => state.posts)
  const post = posts.find((p) => p.slug === slug)
  return <PostEditor existing={post} />
}

function App() {
  const posts = useStore((state) => state.posts)
  const addPost = useStore((state) => state.addPost)
  const importRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (posts.length === 0) {
      fixtures.forEach((post) => addPost(post))
    }
  }, [])

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const imported = await readImportFile(file)
    if (imported.length === 0) {
      alert('Could not import that file.')
    } else {
      imported.forEach((post) => addPost(post))
    }
    e.target.value = ''
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-[#d4e0f5]">Posts</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadPosts(posts)}
                className="bg-[#0a1628] text-[#8b9bb8] border border-[#162035] text-sm font-medium px-4 py-2 rounded-lg hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => importRef.current?.click()}
                className="bg-[#0a1628] text-[#8b9bb8] border border-[#162035] text-sm font-medium px-4 py-2 rounded-lg hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
              >
                Import
              </button>
              <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
              <Link
                to="/posts/new"
                className="bg-cyan-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
              >
                New Post
              </Link>
            </div>
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
