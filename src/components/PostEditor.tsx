import { useNavigate, Link } from "react-router-dom"
import { getPostValidationErrors, isPostValid } from "postkit-validation-library"
import { parseTags, normalizeTag, removeDuplicateTags } from "postkit-tag"
import type { Post, PostStatus } from "../types"
import { useState } from "react"
import { createPost, updatePost } from "../lib/posts"
import { useStore } from "../lib/store"

interface PostEditorProps {
  onSave?: (post: Post) => void
  onDelete?: (id: string) => void
  existing?: Post

}

export default function PostEditor({ existing }: PostEditorProps) {
  const [ title, setTitle ] = useState(existing?.title ?? '')
  const [ body, setBody ] = useState(existing?.body ?? '')
  const [ author, setAuthor ] = useState(existing?.author ?? '')
  const [ category, setCategory ] = useState(existing?.category ?? '')
  const [ status, setStatus ] = useState<PostStatus>(existing?.status ?? 'draft')
  const [ tagInput, setTagInput ] = useState(existing?.tags.join(', ') ?? '')
  const posts = useStore((state) => state.posts)
  const existingSlugs = posts.map((p) => p.slug)
  const addPost = useStore((state) => state.addPost)
  const storeUpdatePost = useStore((state) => state.updatePost)
  const deletePost = useStore((state) => state.deletePost)
  const navigate = useNavigate()

  const tags = removeDuplicateTags(parseTags(tagInput).map(normalizeTag))
  const currentPost = existing
    ? updatePost(existing, { title, body, author, category, status, tags })
    : createPost(title, body, author, tags, category, existingSlugs)
  const errors = getPostValidationErrors(currentPost)

  function handleSave() {
    if (!isPostValid(currentPost)) return

    if (existing) {
      storeUpdatePost(currentPost)
    } else {
      addPost(currentPost)
    }

    navigate('/')
  }

  function handleDelete() {
    if (!existing) return
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(existing.id)
      navigate('/')
    }
  }

  return(
    <article>
      <Link to="/">← Back</Link>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </label>
      <label>
        Post
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
      </label>
      <label>
        Author
        <input value={author} onChange={(e) => setAuthor(e.target.value)}></input>
      </label>
      <label>
        Category
        <input value={category} onChange={(e) => setCategory(e.target.value)}></input>
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value as PostStatus)}>
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="published">Published</option>
        </select>
      </label>
      <label>
        Tags
        <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}></input>
      </label>
      <section>
        <button onClick={handleSave}>Save</button>
        { existing && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </section>
      <section className="errors">
        {errors.map((error) => (
          <p key={error.field}>{error.message}</p>
        ))}
      </section>
    </article>
  )
}
