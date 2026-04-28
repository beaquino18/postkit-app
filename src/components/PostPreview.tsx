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
    <article className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h2 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h2>
        <span
          className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ color: statusToColor(status) ?? undefined, backgroundColor: `${statusToColor(status)}18` }}
        >
          {statusToLabel(status)}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{createExcerpt(body, 150)}</p>

      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
        <span>by {author}</span>
        <span>·</span>
        <span>{formatDate(createdAt)}</span>
        <span>·</span>
        <span>{formatTime(readingTime(body))}</span>
        {tags.length > 0 && (
          <>
            <span>·</span>
            <div className="flex gap-1">
              {tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
