'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface ComparisonItem {
  healthy: string;
  unhealthy: string;
}

const items: ComparisonItem[] = [
  {
    healthy: 'Ясно говорю о своих потребностях',
    unhealthy: 'Подавляю потребности ради других',
  },
  {
    healthy: 'Говорю «нет» без чувства вины',
    unhealthy: 'Соглашаюсь на всё, чтобы не обидеть',
  },
  {
    healthy: 'Несу ответственность за свои чувства',
    unhealthy: 'Виню других за своё состояние',
  },
  {
    healthy: 'Уважаю чужие границы',
    unhealthy: 'Нарушаю границы других, не замечая',
  },
  {
    healthy: 'Могу быть уязвимым в безопасной среде',
    unhealthy: 'Закрываюсь от всех или открываюсь каждому',
  },
  {
    healthy: 'Принимаю отказ спокойно',
    unhealthy: 'Обижаюсь или давлю при отказе',
  },
];

type Side = 'healthy' | 'unhealthy';

export function BoundaryComparison() {
  const [side, setSide] = useState<Side>('healthy');

  const isHealthy = side === 'healthy';

  return (
    <section className="rounded-2xl border border-white/10 bg-background-soft p-6 sm:p-8">
      <h2 className="font-display mb-6 text-2xl font-bold text-text">
        Здоровая vs нездоровая граница
      </h2>

      {/* Toggle */}
      <div className="relative mb-8 flex rounded-xl bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setSide('healthy')}
          aria-pressed={isHealthy}
          className={[
            'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200',
            isHealthy ? 'text-sage' : 'text-text-muted hover:text-text',
          ].join(' ')}
        >
          <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
          Здоровая
        </button>
        <button
          type="button"
          onClick={() => setSide('unhealthy')}
          aria-pressed={!isHealthy}
          className={[
            'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200',
            !isHealthy ? 'text-terracotta' : 'text-text-muted hover:text-text',
          ].join(' ')}
        >
          <ShieldAlert className="h-4 w-4" strokeWidth={1.75} />
          Нездоровая
        </button>
        <m.div
          className={[
            'absolute inset-y-1 w-[calc(50%-4px)] rounded-lg',
            isHealthy ? 'bg-sage/15' : 'bg-terracotta/15',
          ].join(' ')}
          animate={{ x: isHealthy ? 4 : 'calc(100% + 4px)' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      </div>

      {/* List */}
      <AnimatePresence mode="wait">
        <m.ul
          key={side}
          initial={{ opacity: 0, x: isHealthy ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isHealthy ? 20 : -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          {items.map((item, i) => (
            <m.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={[
                'flex items-start gap-3 rounded-xl border p-4 text-sm',
                isHealthy
                  ? 'border-sage/20 bg-sage/5'
                  : 'border-terracotta/20 bg-terracotta/5',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  isHealthy
                    ? 'bg-sage/20 text-sage'
                    : 'bg-terracotta/20 text-terracotta',
                ].join(' ')}
              >
                {i + 1}
              </span>
              <span className="text-text">
                {isHealthy ? item.healthy : item.unhealthy}
              </span>
            </m.li>
          ))}
        </m.ul>
      </AnimatePresence>

      <p className="mt-6 text-center text-sm text-text-muted">
        Переключайте между состояниями, чтобы увидеть разницу
      </p>
    </section>
  );
}
