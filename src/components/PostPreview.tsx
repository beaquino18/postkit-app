import type { Post } from "../types";
import { createExcerpt } from 'postkit-excerpt'
import { readingTime, formatTime } from 'postkit-reading-time'
import { formatDate, statusToLabel, statusToColor } from 'postkit-date-status-display'

interface PostPreviewProps {
  post: Post
}

export default function PostPreview({ post }: PostPreviewProps) {

  return(
    <article>
      <h2>{ post.title }</h2>
      <p>{ createExcerpt(post.body, 150) }</p>
      <p>by { post.author }</p>
      {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
      <p> Reading Time: { formatTime(readingTime(post.body)) }</p>
      <p> Posted on: { formatDate(post.createdAt) }</p>
      <p style={{ color: statusToColor(post.status) ?? undefined }}>{ statusToLabel(post.status) }</p>
    </article>
  )
}
