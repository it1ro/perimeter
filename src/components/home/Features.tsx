'use client';

import { m, type Variants } from 'framer-motion';
import { BookOpen, Brain, BarChart2, Layers } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Статьи без воды',
    description:
      'Разбираем сложные темы простым языком: от тревоги и выгорания до здоровых отношений и границ.',
  },
  {
    icon: Brain,
    title: 'Проверенные тесты',
    description:
      'Психологические тесты с научной базой, которые помогают лучше понять себя и своё состояние.',
  },
  {
    icon: BarChart2,
    title: 'Наглядная инфографика',
    description:
      'Сложные концепции в виде понятных схем и визуальных карточек — удобно сохранить и поделиться.',
  },
  {
    icon: Layers,
    title: 'Системный подход',
    description:
      'Материалы структурированы по темам, чтобы вы могли погружаться постепенно и по своему темпу.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <m.h2
            className="font-display mb-3 text-3xl font-bold text-text sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Что вы найдёте здесь
          </m.h2>
          <m.p
            className="mx-auto max-w-lg text-base text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Все материалы написаны и отобраны с заботой о вас — без сенсаций, ложной мотивации и лишнего шума.
          </m.p>
        </div>

        <m.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <m.div
                key={feature.title}
                variants={cardVariants}
                className="rounded-2xl border border-white/10 bg-background-soft p-6 transition-colors duration-200 hover:border-sage/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15">
                  <Icon className="h-5 w-5 text-sage" strokeWidth={1.75} />
                </div>
                <h3 className="font-display mb-2 text-lg font-semibold text-text">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">{feature.description}</p>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
