
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import { useEffect } from 'react'
import { useStore } from './lib/store'
import { fixtures } from './lib/fixtures'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import PostEditor from './components/PostEditor'

function EditPostRoute() {
  const { id } = useParams<{ id: string }>()
  const posts = useStore((state) => state.posts)
  const post = posts.find((p) => p.id === id)
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
        <div>
          <Link to="/posts/new">New Post</Link>
          <SearchBar />
          <PostList />          
        </div>
      }/>
      <Route path="/posts/new" element={<PostEditor />}/>
      <Route path="/posts/:id" element={<EditPostRoute />}/>
    </Routes>
  )
}

export default App
