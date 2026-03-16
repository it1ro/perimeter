import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { formatDate } from '@/lib/format';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.frontmatter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const { frontmatter } = article;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
      ...(frontmatter.cover && {
        images: [{ url: frontmatter.cover, width: 1200, height: 630, alt: frontmatter.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.cover && { images: [frontmatter.cover] }),
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    url: `${SITE_URL}/articles/${frontmatter.slug}/`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${frontmatter.slug}/`,
    },
    inLanguage: 'ru',
    ...(frontmatter.cover && {
      image: frontmatter.cover,
    }),
    keywords: frontmatter.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <nav className="mb-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-sage"
            >
              <ArrowLeft className="h-4 w-4" />
              Все статьи
            </Link>
          </nav>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display mb-4 text-3xl font-bold leading-tight text-text sm:text-4xl">
              {frontmatter.title}
            </h1>

            <p className="mb-4 text-base leading-relaxed text-text-muted">
              {frontmatter.description}
            </p>

            <div className="flex items-center gap-3 text-sm text-text-muted">
              <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
              {frontmatter.readingTime && (
                <>
                  <span className="text-white/20">&middot;</span>
                  <span>{frontmatter.readingTime} чтения</span>
                </>
              )}
            </div>
          </header>

          {frontmatter.cover && (
            <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
              <Image
                src={frontmatter.cover}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, 672px"
              />
            </div>
          )}

          <ArticleContent content={content} />

          <footer className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-sage/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться к статьям
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}
