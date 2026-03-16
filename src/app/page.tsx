import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { LatestArticles } from '@/components/home/LatestArticles';
import { TestCTA } from '@/components/home/TestCTA';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Периметр — психология ясно',
  description:
    'Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды. Разбираемся в психологии вместе.',
  keywords: [
    'психология',
    'ментальное здоровье',
    'тревожность',
    'выгорание',
    'психологические тесты',
    'инфографика',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'Периметр',
    title: 'Периметр — психология ясно',
    description:
      'Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды.',
    images: [
      {
        url: '/images/og/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Периметр — психология ясно',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Периметр — психология ясно',
    description:
      'Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды.',
    images: ['/images/og/og-default.svg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Периметр',
  description:
    'Сайт о психологии и ментальном здоровье. Статьи, тесты, инфографика — понятно и без воды.',
  url: 'https://периметр.рф',
  inLanguage: 'ru',
  publisher: {
    '@type': 'Organization',
    name: 'Периметр',
    url: 'https://периметр.рф',
  },
};

export default function HomePage() {
  const latestArticles = getAllArticles()
    .slice(0, 4)
    .map((a) => a.frontmatter);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Features />
      <LatestArticles articles={latestArticles} />
      <TestCTA />
    </>
  );
}
