import type { Metadata } from 'next';
import { getAllArticles, getAllTags } from '@/lib/articles';
import { TagFilter } from '@/components/articles/TagFilter';

export const metadata: Metadata = {
  title: 'Статьи',
  description:
    'Материалы о психологии, ментальном здоровье, отношениях и саморазвитии — понятно, честно, без воды.',
  openGraph: {
    title: 'Статьи | Периметр',
    description:
      'Материалы о психологии, ментальном здоровье, отношениях и саморазвитии.',
    images: [{ url: '/images/og/og-default.png', width: 1200, height: 630, alt: 'Периметр — Статьи' }],
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles().map((a) => a.frontmatter);
  const allTags = getAllTags();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-display mb-2 text-4xl font-bold text-text sm:text-5xl">
            Статьи
          </h1>
          <p className="text-base text-text-muted">
            Материалы о психологии и ментальном здоровье — понятно и без воды
          </p>
        </header>

        <TagFilter articles={articles} allTags={allTags} />
      </div>
    </section>
  );
}
