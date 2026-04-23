import './App.css'
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import { useEffect } from 'react'
import { useStore } from './lib/store'
import { fixtures } from './lib/fixtures'

function App() {
  const posts = useStore((state) => state.posts)
  const addPost = useStore((state) => state.addPost)

  useEffect(() => {
    if (posts.length === 0) {
      fixtures.forEach((post) => addPost(post))
    }
  }, []) 

  return (
    <div>
      <h1>Postkit</h1>
      <SearchBar />
      <PostList />
    </div>
  )
}

export default App
