import type { Metadata } from 'next';
import { getAllArticles, getAllTags } from '@/lib/articles';
import { ArticlesGrid } from '@/components/articles/ArticlesGrid';

export const metadata: Metadata = {
  title: 'Статьи',
  description:
    'Статьи о психологии, личных границах и ментальном здоровье — понятно, честно и без воды.',
  openGraph: {
    title: 'Статьи | Периметр',
    description:
      'Статьи о психологии, личных границах и ментальном здоровье — понятно, честно и без воды.',
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const tags = getAllTags();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="font-display mb-2 text-3xl font-bold text-text sm:text-4xl">
            Статьи
          </h1>
          <p className="text-base text-text-muted">
            Разбираемся в психологии — понятно, честно и без воды
          </p>
        </div>

        <ArticlesGrid articles={articles} tags={tags} />
      </div>
    </section>
  );
}
