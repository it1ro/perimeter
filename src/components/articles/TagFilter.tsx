'use client';

import { useState, useCallback } from 'react';
import type { Article } from '@/types/article';

interface TagFilterProps {
  tags: string[];
  articles: Article[];
  children: (filtered: Article[]) => React.ReactNode;
}

export function TagFilter({ tags, articles, children }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const toggle = useCallback((tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }, []);

  const filtered = activeTag
    ? articles.filter((a) => a.frontmatter.tags.includes(activeTag))
    : articles;

  return (
    <>
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={[
            'inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50',
            activeTag === null
              ? 'bg-sage/20 text-sage ring-1 ring-sage/40'
              : 'bg-white/10 text-text-muted hover:bg-white/20 hover:text-text',
          ].join(' ')}
        >
          Все
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            aria-pressed={activeTag === tag}
            className={[
              'inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50',
              activeTag === tag
                ? 'bg-sage/20 text-sage ring-1 ring-sage/40'
                : 'bg-white/10 text-text-muted hover:bg-white/20 hover:text-text',
            ].join(' ')}
          >
            {tag}
          </button>
        ))}
      </div>
      {children(filtered)}
    </>
  );
}
