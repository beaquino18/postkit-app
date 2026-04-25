
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import { useEffect } from 'react'
import { useStore } from './lib/store'
import { fixtures } from './lib/fixtures'
import { Routes, Route, Link } from 'react-router-dom'

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
      <Route path="/posts/new" element={<div>Coming Soon</div>}/>
      <Route path="/posts/:id" element={<div>Coming Soon</div>}/>
    </Routes>
  )
}

export default App
