import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { InfographicCard } from '@/components/infographics/InfographicCard';

const InteractiveTabs = dynamic(() =>
  import('@/components/infographics/InteractiveTabs').then((mod) => mod.InteractiveTabs),
  { ssr: false, loading: () => <InteractiveSkeleton /> },
);

const BoundaryComparison = dynamic(() =>
  import('@/components/infographics/BoundaryComparison').then((mod) => mod.BoundaryComparison),
  { ssr: false, loading: () => <InteractiveSkeleton /> },
);

function InteractiveSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-background-soft p-6 sm:p-8">
      <div className="mb-6 h-7 w-48 rounded-lg bg-white/10" />
      <div className="mb-6 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-white/10" />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-5 w-full rounded bg-white/5" />
        <div className="h-5 w-3/4 rounded bg-white/5" />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Инфографика',
  description:
    'Визуальные материалы о психологии и ментальном здоровье — наглядные схемы, карточки и интерактивные элементы.',
  openGraph: {
    title: 'Инфографика | Мой Периметр',
    description:
      'Визуальные материалы о психологии и ментальном здоровье — наглядные схемы, карточки и интерактивные элементы.',
    images: [{ url: '/images/og/og-default.png', width: 1200, height: 630, alt: 'Мой Периметр — Инфографика' }],
  },
};

const infographics = [
  {
    src: '/images/infographics/types-of-boundaries.svg',
    alt: 'Инфографика: Типы личных границ — физические, эмоциональные, интеллектуальные',
    title: 'Типы личных границ',
    description: 'Физические, эмоциональные и интеллектуальные границы — в чём разница',
  },
  {
    src: '/images/infographics/signs-of-burnout.svg',
    alt: 'Инфографика: Признаки эмоционального выгорания',
    title: 'Признаки выгорания',
    description: 'Как распознать выгорание и что с этим делать',
  },
  {
    src: '/images/infographics/healthy-vs-toxic.svg',
    alt: 'Инфографика: Здоровые и токсичные отношения — сравнение',
    title: 'Здоровые vs токсичные отношения',
    description: 'Наглядное сравнение паттернов в отношениях',
  },
  {
    src: '/images/infographics/anxiety-cycle.svg',
    alt: 'Инфографика: Цикл тревожности — как он работает',
    title: 'Цикл тревожности',
    description: 'Как устроен замкнутый круг тревоги и как его разорвать',
  },
];

export default function InfographicsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-display mb-2 text-4xl font-bold text-text sm:text-5xl">
            Инфографика
          </h1>
          <p className="text-base text-text-muted">
            Сложные концепции в виде понятных схем — удобно сохранить и поделиться
          </p>
        </header>

        {/* Static infographics grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {infographics.map((item) => (
            <InfographicCard key={item.src} {...item} />
          ))}
        </div>

        {/* Interactive section */}
        <div className="mb-10">
          <h2 className="font-display mb-2 text-2xl font-bold text-text sm:text-3xl">
            Интерактивные материалы
          </h2>
          <p className="mb-8 text-base text-text-muted">
            Изучайте темы в удобном формате — переключайте вкладки и сравнивайте
          </p>
        </div>

        <div className="space-y-8">
          <InteractiveTabs />
          <BoundaryComparison />
        </div>
      </div>
    </section>
  );
}
