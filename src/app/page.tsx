import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { LatestArticles } from '@/components/home/LatestArticles';
import { TestCTA } from '@/components/home/TestCTA';

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
    url: 'https://periметр.рф',
    siteName: 'Периметр',
    title: 'Периметр — психология ясно',
    description:
      'Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды.',
    images: [
      {
        url: '/images/og/og-default.png',
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
    images: ['/images/og/og-default.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Периметр',
  description:
    'Сайт о психологии и ментальном здоровье. Статьи, тесты, инфографика — понятно и без воды.',
  url: 'https://periметр.рф',
  inLanguage: 'ru',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://periметр.рф/articles?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Features />
      <LatestArticles />
      <TestCTA />
    </>
  );
}
