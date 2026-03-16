import type { Metadata } from 'next';
import { inter, manrope } from './fonts';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--e1afmkfd.xn--p1ai'),
  title: {
    default: 'Периметр — психология ясно',
    template: '%s | Периметр',
  },
  description:
    'Периметр — сайт о психологии и ментальном здоровье. Статьи, тесты, инфографика — понятно и без воды.',
  keywords: ['психология', 'ментальное здоровье', 'статьи', 'тесты'],
  authors: [{ name: 'Периметр' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Периметр',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
