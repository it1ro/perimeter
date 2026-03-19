import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getAllTests, getTestBySlug } from '@/lib/tests';

const QuizEngine = dynamic(() =>
  import('@/components/tests/QuizEngine').then((mod) => mod.QuizEngine),
  { ssr: false, loading: () => <QuizSkeleton /> },
);

function QuizSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-2 w-full rounded-full bg-white/10" />
      <div className="h-8 w-3/4 rounded-lg bg-white/10" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 w-full rounded-xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const tests = getAllTests();
  return tests.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const test = getTestBySlug(params.slug);
  if (!test) return {};

  return {
    title: test.title,
    description: test.description,
    openGraph: {
      title: `${test.title} | Мой Периметр`,
      description: test.description,
      images: [{ url: '/images/og/og-default.png', width: 1200, height: 630, alt: test.title }],
    },
  };
}

export default function TestPage({ params }: PageProps) {
  const test = getTestBySlug(params.slug);
  if (!test) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: test.title,
    description: test.description,
    about: {
      '@type': 'Thing',
      name: 'Психология',
    },
    provider: {
      '@type': 'Organization',
      name: 'Мой Периметр',
    },
    inLanguage: 'ru',
    numberOfQuestions: test.questions.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <nav className="mb-8">
            <Link
              href="/tests"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-sage"
            >
              <ArrowLeft className="h-4 w-4" />
              Все тесты
            </Link>
          </nav>

          <header className="mb-10 text-center">
            <h1 className="font-display mb-3 text-3xl font-bold leading-tight text-text sm:text-4xl">
              {test.title}
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-text-muted">
              {test.description}
            </p>
          </header>

          <QuizEngine quiz={test} />
        </div>
      </section>
    </>
  );
}
