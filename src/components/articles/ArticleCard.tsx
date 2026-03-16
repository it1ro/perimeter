import Link from 'next/link';
import type { ArticleFrontmatter } from '@/types/article';
import { Calendar } from 'lucide-react';

interface ArticleCardProps {
  frontmatter: ArticleFrontmatter;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ArticleCard({ frontmatter }: ArticleCardProps) {
  const { slug, title, description, date, tags } = frontmatter;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-background-soft p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sage/30 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-display mb-2 flex-1 text-base font-semibold leading-snug text-text transition-colors group-hover:text-sage sm:text-lg">
        {title}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-muted">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-1.5 text-xs text-text-muted">
        <Calendar className="h-3.5 w-3.5" />
        <time dateTime={date}>{formatDate(date)}</time>
      </div>
    </Link>
  );
}
