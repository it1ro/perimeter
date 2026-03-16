'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ArticleCard, type ArticleCardData } from './ArticleCard';

const PLACEHOLDER_ARTICLES: ArticleCardData[] = [
  {
    slug: 'chto-takoe-trevozhnost',
    title: 'Что такое тревожность и как отличить её от нормального беспокойства',
    excerpt:
      'Тревога — это нормальная реакция организма на стресс. Но когда она становится хронической, важно знать, что с этим делать.',
    tag: 'Тревога',
    readingTime: '5 мин',
  },
  {
    slug: 'sindrom-emotsionalnogo-vygoraniya',
    title: 'Синдром эмоционального выгорания: признаки и пути выхода',
    excerpt:
      'Выгорание — не слабость характера. Это физиологическая реакция на длительный стресс, и с ней можно и нужно работать.',
    tag: 'Выгорание',
    readingTime: '7 мин',
  },
  {
    slug: 'lichnostnye-granicy',
    title: 'Личные границы: как их установить и не чувствовать себя виноватым',
    excerpt:
      'Умение говорить «нет» — один из ключевых навыков психологического здоровья. Рассказываем, с чего начать.',
    tag: 'Отношения',
    readingTime: '6 мин',
  },
  {
    slug: 'kak-uluchshit-son',
    title: 'Как улучшить качество сна: что говорит наука',
    excerpt:
      'Сон напрямую влияет на эмоциональное состояние. Разбираем научно обоснованные способы наладить режим.',
    tag: 'Здоровье',
    readingTime: '4 мин',
  },
];

export function LatestArticles() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-8 flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="font-display mb-1.5 text-3xl font-bold text-text sm:text-4xl">
              Последние статьи
            </h2>
            <p className="text-base text-text-muted">Свежие материалы из нашей базы знаний</p>
          </div>
          <Link
            href="/articles"
            className="hidden items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-sage/80 sm:flex"
          >
            Все статьи
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Horizontal scroll on mobile, 2×2 grid on desktop */}
        <motion.div
          className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4"
          style={{ scrollbarWidth: 'none' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {PLACEHOLDER_ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center sm:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-sage/80"
          >
            Все статьи
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
