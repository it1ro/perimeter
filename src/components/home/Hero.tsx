'use client';

import Link from 'next/link';
import { m } from 'framer-motion';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  };
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Decorative blobs */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-[320px] w-[420px] rounded-full bg-blue/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <m.span
          className="mb-6 inline-block rounded-full border border-sage/30 bg-sage/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage"
          {...fadeUp(0)}
        >
          Психология без жаргона
        </m.span>

        <m.h1
          className="font-display mb-6 text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl"
          {...fadeUp(0.1)}
        >
          Понять себя{' '}
          <span className="relative whitespace-nowrap text-sage">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-full -mt-1 w-full fill-sage/30"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 6.233-.139 10.266-.76l.024-.004 1.91-.268a441.512 441.512 0 0 1 42.95-3.99c18.896-.519 35.369.676 57.345 5.756 13.314 3.131 14.464 3.249 15.078 2.383.416-.574.653-1.618.448-2.538-.36-1.633-1.938-2.532-8.568-4.531C316.51 23.17 305.065 19.41 300 17.88c-22.73-6.911-40.925-9.437-71.577-9.981Z" />
            </svg>
            <span className="relative">проще</span>
          </span>
        </m.h1>

        <m.p
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-muted"
          {...fadeUp(0.2)}
        >
          Статьи, тесты и инфографика о ментальном здоровье — понятно, честно и без лишней воды.
        </m.p>

        <m.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          {...fadeUp(0.3)}
        >
          <Link
            href="/articles"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-sage px-7 text-base font-medium text-white transition-colors duration-150 hover:bg-sage/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Читать статьи
          </Link>
          <Link
            href="/tests"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-transparent px-7 text-base font-medium text-text transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Пройти тест
          </Link>
        </m.div>
      </div>
    </section>
  );
}
