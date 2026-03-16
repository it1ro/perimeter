'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ArticleFrontmatter } from '@/types/article';
import { ArticleCard } from '@/components/articles/ArticleCard';

interface LatestArticlesProps {
  articles: ArticleFrontmatter[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <m.div
          className="mb-8 flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="font-display mb-1.5 text-3xl font-bold text-text sm:text-4xl">
              Последние статьи
            </h2>
            <p className="text-base text-text-muted">Свежие материалы из нашей базы знаний</p>
          </div>
          <Link
            href="/articles"
            className="hidden items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-sage/80 sm:flex"
          >
            Все статьи
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>

        <m.div
          className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          style={{ scrollbarWidth: 'none' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {articles.map((frontmatter) => (
            <ArticleCard key={frontmatter.slug} frontmatter={frontmatter} variant="compact" />
          ))}
        </m.div>

        <m.div
          className="mt-6 flex justify-center sm:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-sage/80"
          >
            Все статьи
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
