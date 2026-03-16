'use client';

import type { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { TagFilter } from './TagFilter';

interface ArticlesGridProps {
  articles: Article[];
  tags: string[];
}

export function ArticlesGrid({ articles, tags }: ArticlesGridProps) {
  return (
    <TagFilter tags={tags} articles={articles}>
      {(filtered) =>
        filtered.length === 0 ? (
          <p className="py-12 text-center text-text-muted">
            Статей с таким тегом пока нет
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard
                key={article.frontmatter.slug}
                frontmatter={article.frontmatter}
              />
            ))}
          </div>
        )
      }
    </TagFilter>
  );
}
