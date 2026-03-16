import Link from 'next/link';
import type { ArticleFrontmatter } from '@/types/article';
import { Calendar } from 'lucide-react';

interface ArticleCardProps {
  frontmatter: ArticleFrontmatter;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

export function ArticleCard({ frontmatter }: ArticleCardProps) {
  const { slug, title, description, date, tags } = frontmatter;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex min-w-[260px] flex-col rounded-2xl border border-white/10 bg-background-soft p-5 transition-colors duration-200 hover:border-sage/30 sm:min-w-[300px]"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage">
          {tags[0]}
        </span>
        <span className="flex items-center gap-1 text-xs text-text-muted">
          <Calendar className="h-3 w-3" />
          <time dateTime={date}>{formatDate(date)}</time>
        </span>
      </div>
      <h3 className="font-display mb-2 flex-1 text-base font-semibold leading-snug text-text transition-colors group-hover:text-sage">
        {title}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">{description}</p>
    </Link>
  );
}
