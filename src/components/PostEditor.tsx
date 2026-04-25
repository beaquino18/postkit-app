import { useNavigate } from "react-router-dom"
import { getPostValidationErrors, isPostValid } from "postkit-validation-library"
import { parseTags, normalizeTag, removeDuplicateTags } from "postkit-tag"
import type { Post, PostStatus } from "../types"
import { useState } from "react"

interface PostEditorProps {
  onSave: (post: Post) => void
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
  const navigate = useNavigate()
  

  return(
    <article>
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
    </article>
  )
}
