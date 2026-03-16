import Link from 'next/link';
import type { ArticleFrontmatter } from '@/types/article';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/format';

interface ArticleCardProps {
  frontmatter: ArticleFrontmatter;
  variant?: 'compact' | 'full';
}

export function ArticleCard({ frontmatter, variant = 'full' }: ArticleCardProps) {
  const { slug, title, description, date, tags } = frontmatter;
  const isCompact = variant === 'compact';

  return (
    <Link
      href={`/articles/${slug}`}
      className={[
        'group flex flex-col rounded-2xl border border-white/10 bg-background-soft p-5 duration-200',
        isCompact
          ? 'min-w-[260px] transition-colors sm:min-w-[300px]'
          : 'transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20',
        'hover:border-sage/30',
      ].join(' ')}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {(isCompact ? tags.slice(0, 1) : tags.slice(0, 2)).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage"
          >
            {tag}
          </span>
        ))}
        {isCompact && (
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Calendar className="h-3 w-3" />
            <time dateTime={date}>{formatDate(date, 'short')}</time>
          </span>
        )}
      </div>

      <h3
        className={[
          'font-display mb-2 flex-1 text-base font-semibold leading-snug text-text transition-colors group-hover:text-sage',
          !isCompact && 'sm:text-lg',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </h3>

      <p
        className={[
          'line-clamp-2 text-sm leading-relaxed text-text-muted',
          !isCompact && 'mb-4',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {description}
      </p>

      {!isCompact && (
        <div className="mt-auto flex items-center gap-1.5 text-xs text-text-muted">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
      )}
    </Link>
  );
}
