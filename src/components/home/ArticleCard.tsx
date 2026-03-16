import Link from 'next/link';

export interface ArticleCardData {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readingTime: string;
}

interface ArticleCardProps {
  article: ArticleCardData;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex min-w-[260px] flex-col rounded-2xl border border-white/10 bg-background-soft p-5 transition-colors duration-200 hover:border-sage/30 sm:min-w-[300px]"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage">
          {article.tag}
        </span>
        <span className="text-xs text-text-muted">{article.readingTime}</span>
      </div>
      <h3 className="font-display mb-2 flex-1 text-base font-semibold leading-snug text-text transition-colors group-hover:text-sage">
        {article.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">{article.excerpt}</p>
    </Link>
  );
}
