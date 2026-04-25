import type { Post } from "../types";
import { createExcerpt } from 'postkit-excerpt'
import { readingTime, formatTime } from 'postkit-reading-time'
import { formatDate, statusToLabel, statusToColor } from 'postkit-date-status-display'

interface PostPreviewProps {
  post: Post
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { title, body, author, tags, createdAt, status } = post
  
  return(
    <article>
      <h2>{ title }</h2>
      <p>{ createExcerpt(body, 150) }</p>
      <p>by { author }</p>
      { tags.map((tag) => <span key={tag}>{tag} </span>) }
      <p> Reading Time: { formatTime(readingTime(body)) }</p>
      <p> Posted on: { formatDate(createdAt) }</p>
      <p style={{ color: statusToColor(status) ?? undefined }}>{ statusToLabel(status) }</p>
    </article>
  )
}
