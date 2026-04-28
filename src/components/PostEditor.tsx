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

const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
const labelClass = "flex flex-col gap-1 text-sm font-medium text-gray-700"

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
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-violet-600 hover:underline mb-6 inline-block">
        ← Back
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {existing ? 'Edit Post' : 'New Post'}
      </h1>

      <div className="flex flex-col gap-4">
        <label className={labelClass}>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
        </label>

        <label className={labelClass}>
          Post
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Author
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
        </label>

        <label className={labelClass}>
          Category
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
        </label>

        <label className={labelClass}>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="published">Published</option>
          </select>
        </label>

        <label className={labelClass}>
          Tags <span className="font-normal text-gray-400">(comma-separated)</span>
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} className={inputClass} />
        </label>

        {errors.length > 0 && (
          <ul className="text-sm text-red-600 flex flex-col gap-1">
            {errors.map((error) => (
              <li key={error.field}>{error.message}</li>
            ))}
          </ul>
        )}

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSave}
            className="bg-violet-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-violet-700 transition-colors cursor-pointer"
          >
            Save
          </button>
          {existing && (
            <button
              onClick={handleDelete}
              className="bg-white text-red-500 text-sm font-medium px-5 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
