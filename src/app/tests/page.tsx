import Link from 'next/link';
import type { Metadata } from 'next';
import { Brain, ArrowRight } from 'lucide-react';
import { getAllTests } from '@/lib/tests';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Тесты',
  description:
    'Психологические тесты с научной базой — пройдите онлайн, узнайте результат мгновенно.',
  openGraph: {
    title: 'Тесты | Периметр',
    description:
      'Психологические тесты с научной базой — пройдите онлайн, узнайте результат мгновенно.',
  },
};

export default function TestsPage() {
  const tests = getAllTests();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-display mb-2 text-4xl font-bold text-text sm:text-5xl">
            Тесты
          </h1>
          <p className="text-base text-text-muted">
            Узнайте больше о себе — быстро, честно и без регистрации
          </p>
        </header>

        {tests.length === 0 ? (
          <p className="text-text-muted">Тесты скоро появятся. Заходите позже!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tests.map((test) => (
              <Link key={test.id} href={`/tests/${test.id}`} className="group">
                <Card hoverable as="article" className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15">
                    <Brain className="h-5 w-5 text-sage" strokeWidth={1.75} />
                  </div>

                  <h2 className="font-display mb-2 text-lg font-semibold text-text group-hover:text-sage transition-colors duration-150">
                    {test.title}
                  </h2>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                    {test.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      {test.questions.length}{' '}
                      {pluralQuestions(test.questions.length)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-sage transition-transform duration-150 group-hover:translate-x-0.5">
                      Пройти
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function pluralQuestions(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'вопрос';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'вопроса';
  return 'вопросов';
}
