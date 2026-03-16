import type { Metadata } from 'next';
import { inter, manrope } from './fonts';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/Toast';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Периметр — психология ясно',
    template: '%s | Периметр',
  },
  description:
    'Периметр — сайт о психологии и ментальном здоровье. Статьи, тесты, инфографика — понятно и без воды.',
  keywords: ['психология', 'ментальное здоровье', 'статьи', 'тесты'],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
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
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[100] -translate-y-20 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Перейти к содержимому
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
        <ToastContainer />
        <YandexMetrika />
      </body>
    </html>
  );
}
