import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getAllTests, getTestBySlug } from '@/lib/tests';
import { QuizEngine } from '@/components/tests/QuizEngine';

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
      title: `${test.title} | Периметр`,
      description: test.description,
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
      name: 'Периметр',
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
