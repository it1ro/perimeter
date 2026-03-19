import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { LatestArticles } from '@/components/home/LatestArticles';
import { TestCTA } from '@/components/home/TestCTA';
import { getAllArticles } from '@/lib/articles';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Мой Периметр — психология ясно',
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
    siteName: 'Мой Периметр',
    title: 'Мой Периметр — психология ясно',
    description:
      'Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды.',
    images: [
      {
        url: '/images/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Мой Периметр — психология ясно',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мой Периметр — психология ясно',
    description:
      'Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды.',
    images: ['/images/og/og-default.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  description:
    'Сайт о психологии и ментальном здоровье. Статьи, тесты, инфографика — понятно и без воды.',
  url: SITE_URL,
  inLanguage: 'ru',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
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
