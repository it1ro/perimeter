import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { ArticleContent } from '@/components/articles/ArticleContent';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.frontmatter.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const { title, description, cover } = article.frontmatter;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Периметр`,
      description,
      type: 'article',
      ...(cover && {
        images: [{ url: cover, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(cover && { images: [cover] }),
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const { title, date, tags, cover } = article.frontmatter;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: article.frontmatter.description,
    datePublished: date,
    author: {
      '@type': 'Organization',
      name: 'Периметр',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Периметр',
    },
    ...(cover && {
      image: cover,
    }),
    keywords: tags.join(', '),
    inLanguage: 'ru',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/articles"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-sage"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к статьям
          </Link>

          <header className="mb-10">
            {cover && (
              <div className="mb-6 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt={title}
                  className="aspect-[2/1] w-full object-cover"
                />
              </div>
            )}

            <div className="mb-4 flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display mb-3 text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-[2.5rem]">
              {title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          </header>

          <ArticleContent content={article.content} />
        </div>
      </article>
    </>
  );
}
