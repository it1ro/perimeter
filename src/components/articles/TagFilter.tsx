'use client';

import { useState } from 'react';
import { Tag } from '@/components/ui/Tag';
import type { ArticleFrontmatter } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface TagFilterProps {
  articles: ArticleFrontmatter[];
  allTags: string[];
}

export function TagFilter({ articles, allTags }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles;

  return (
    <div>
      <div
        className="mb-8 flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        <Tag
          label="Все"
          active={activeTag === null}
          onClick={() => setActiveTag(null)}
        />
        {allTags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-text-muted">По этому тегу статей пока нет.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} frontmatter={article} />
          ))}
        </div>
      )}
    </div>
  );
}
