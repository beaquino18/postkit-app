import type { Post, PostStatus } from "../types";
import { createExcerpt } from 'postkit-excerpt'
import { readingTime, formatTime } from 'postkit-reading-time'
import { formatDate, statusToLabel, statusToColor } from 'postkit-date-status-display'

interface PostPreviewProps {
  post: Post
}

// statusToColor returns a bright yellow for 'review' which is unreadable on light backgrounds
const statusTextColor: Record<PostStatus, string> = {
  draft: '#6a7060',
  review: '#92600a',
  published: '#2a7a2a',
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { title, body, author, tags, createdAt, status } = post
  const textColor = statusTextColor[status]
  const bgColor = statusToColor(status)

  return(
    <article className="bg-[#fffdf5] border border-[#e0d0a0] rounded-xl p-5 hover:border-[#e8971a]/50 hover:shadow-lg hover:shadow-amber-200/60 transition-all">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h2 className="text-base font-semibold text-[#1a1408] leading-snug">{title}</h2>
        <span
          className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ color: textColor, backgroundColor: `${bgColor}22` }}
        >
          {statusToLabel(status)}
        </span>
      </div>

      <p className="text-sm text-[#6a5a38] mb-3 line-clamp-2">{createExcerpt(body, 150)}</p>

      <div className="flex flex-wrap items-center gap-2 text-xs text-[#8a7a50]">
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
                <span key={tag} className="bg-[#eaf5d8] text-[#4a8010] border border-[#c0d890] px-2 py-0.5 rounded-full">
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
