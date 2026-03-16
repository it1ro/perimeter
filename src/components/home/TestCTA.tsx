'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function TestCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <m.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage/20 via-background-soft to-blue/15 p-8 sm:p-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sage/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-blue/15 blur-3xl"
          />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/20">
                <Sparkles className="h-6 w-6 text-sage" strokeWidth={1.75} />
              </div>
              <h2 className="font-display mb-2 text-2xl font-bold text-text sm:text-3xl">
                Узнайте себя лучше
              </h2>
              <p className="max-w-md text-base leading-relaxed text-text-muted">
                Пройдите один из наших тестов и получите персональную расшифровку — без регистрации
                и без лишних вопросов.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/tests"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-sage px-8 text-base font-semibold text-white shadow-lg shadow-sage/20 transition-all duration-200 hover:bg-sage/90 hover:shadow-sage/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Пройти тест
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
