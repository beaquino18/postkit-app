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
    <article className="bg-[#0a1628] border border-[#162035] rounded-xl p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-900/20 transition-all">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h2 className="text-base font-semibold text-[#d4e0f5] leading-snug">{title}</h2>
        <span
          className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ color: statusToColor(status) ?? undefined, backgroundColor: `${statusToColor(status)}22` }}
        >
          {statusToLabel(status)}
        </span>
      </div>

      <p className="text-sm text-[#8b9bb8] mb-3 line-clamp-2">{createExcerpt(body, 150)}</p>

      <div className="flex flex-wrap items-center gap-2 text-xs text-[#3d5070]">
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
                <span key={tag} className="bg-[#0e1f38] text-[#5b7fa6] border border-[#162035] px-2 py-0.5 rounded-full">
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
