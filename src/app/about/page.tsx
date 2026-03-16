import type { Metadata } from 'next';
import { Heart, Target, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'О проекте',
  description:
    'Периметр — проект о психологии и ментальном здоровье. Узнайте о нашей миссии, целях и подходе.',
  openGraph: {
    title: 'О проекте | Периметр',
    description:
      'Периметр — проект о психологии и ментальном здоровье. Узнайте о нашей миссии, целях и подходе.',
    images: [{ url: '/images/og/og-default.png', width: 1200, height: 630, alt: 'Периметр — О проекте' }],
  },
};

const values = [
  {
    icon: BookOpen,
    title: 'Доступность',
    description:
      'Мы объясняем сложные психологические концепции простым языком, без жаргона и наукообразия.',
  },
  {
    icon: Target,
    title: 'Достоверность',
    description:
      'Все материалы основаны на научных данных и проверенных подходах в психологии.',
  },
  {
    icon: Heart,
    title: 'Забота',
    description:
      'Мы создаём контент с уважением к читателю — без манипуляций, давления и ложной мотивации.',
  },
  {
    icon: Users,
    title: 'Сообщество',
    description:
      'Мы верим, что открытый разговор о ментальном здоровье помогает каждому чувствовать себя менее одиноким.',
  },
];

export default function AboutPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-14">
          <h1 className="font-display mb-2 text-4xl font-bold text-text sm:text-5xl">
            О проекте
          </h1>
          <p className="text-base text-text-muted">
            Кто мы, зачем это всё и для кого
          </p>
        </header>

        {/* About author */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center md:justify-start">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-sage/15 ring-2 ring-sage/30 ring-offset-4 ring-offset-background">
              <span className="font-display text-4xl font-bold text-sage">П</span>
            </div>
          </div>

          <div>
            <h2 className="font-display mb-4 text-2xl font-bold text-text">
              Привет! Мы — команда Периметра.
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-muted sm:text-base">
              <p>
                <strong className="text-text">Периметр</strong> — это проект о психологии
                и ментальном здоровье, созданный для тех, кто хочет лучше понимать себя
                и свои отношения с миром.
              </p>
              <p>
                Мы верим, что психология должна быть доступной каждому. Не нужно быть
                специалистом, чтобы разобраться в своих эмоциях, научиться говорить «нет»
                или понять, откуда берётся тревога.
              </p>
              <p>
                Наши материалы написаны простым языком, основаны на научных данных
                и проверены на практике. Мы не даём советов — мы помогаем разобраться.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-16 rounded-2xl border border-sage/20 bg-sage/5 p-6 sm:p-8">
          <h2 className="font-display mb-4 text-2xl font-bold text-text">
            Наша миссия
          </h2>
          <p className="text-sm leading-relaxed text-text-muted sm:text-base">
            Сделать знания о психологии и ментальном здоровье доступными, понятными
            и практичными. Мы хотим, чтобы каждый человек мог найти ответы на свои вопросы
            о себе — без стигмы, без жаргона, без лишнего шума. Просто и честно.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display mb-8 text-center text-2xl font-bold text-text sm:text-3xl">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-background-soft p-6 transition-colors duration-200 hover:border-sage/30"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15">
                    <Icon className="h-5 w-5 text-sage" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display mb-2 text-lg font-semibold text-text">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goals */}
        <div>
          <h2 className="font-display mb-8 text-center text-2xl font-bold text-text sm:text-3xl">
            Что мы делаем
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                emoji: '📝',
                title: 'Статьи',
                text: 'Разбираем сложные темы от тревожности до границ — понятно и без воды.',
              },
              {
                emoji: '🧠',
                title: 'Тесты',
                text: 'Психологические тесты с научной базой для самопознания.',
              },
              {
                emoji: '📊',
                title: 'Инфографика',
                text: 'Наглядные схемы и карточки, которыми удобно делиться.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-background-soft p-6 text-center"
              >
                <span className="mb-3 block text-3xl">{item.emoji}</span>
                <h3 className="font-display mb-2 text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
