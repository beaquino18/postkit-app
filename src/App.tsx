
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
            <h1 className="text-3xl font-semibold text-[#1a1408]">Posts</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadPosts(posts)}
                className="bg-[#fffdf5] text-[#6a5a38] border border-[#e0d0a0] text-sm font-medium px-4 py-2 rounded-lg hover:border-[#e8971a]/60 hover:text-[#e8971a] transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => importRef.current?.click()}
                className="bg-[#fffdf5] text-[#6a5a38] border border-[#e0d0a0] text-sm font-medium px-4 py-2 rounded-lg hover:border-[#e8971a]/60 hover:text-[#e8971a] transition-colors"
              >
                Import
              </button>
              <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
              <Link
                to="/posts/new"
                className="bg-[#e8971a] text-[#1a1408] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#f5b942] transition-colors"
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
