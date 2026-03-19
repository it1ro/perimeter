'use client';

import { m } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import type { Quiz } from '@/types/test';

interface QuizResultProps {
  title: string;
  description: string;
  score: number;
  maxScore: number;
  quizTitle: string;
  dimensionResults?: Quiz['dimensionResults'];
  strengths: Array<{ dimension: string }>;
  growthZones: Array<{ dimension: string; level: 'low' | 'medium' | 'high' }>;
  onRestart: () => void;
}

const dimensionLabels: Record<string, string> = {
  work: 'Работа',
  family: 'Семья',
  friends: 'Друзья',
  public: 'Публичные ситуации',
  digital: 'Цифровые границы',
  financial: 'Финансы',
  romantic: 'Партнерские отношения',
  values: 'Ценности',
  physical: 'Физический комфорт',
  time: 'Личное время',
};

export function QuizResult({
  title,
  description,
  score,
  maxScore,
  quizTitle,
  dimensionResults,
  strengths,
  growthZones,
  onRestart,
}: QuizResultProps) {
  const copyText = `${quizTitle}\n\nМой результат: ${title} (${score} из ${maxScore})\n\n${description}`;

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center"
    >
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <span className="text-2xl font-bold text-sage">{score}</span>
      </div>

      <p className="mb-2 text-sm text-text-muted">
        {score} из {maxScore} баллов
      </p>

      <h2 className="font-display mb-4 text-2xl font-bold text-text sm:text-3xl">
        {title}
      </h2>

      <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-text-muted">
        {description}
      </p>

      {(strengths.length > 0 || growthZones.length > 0) && (
        <div className="mx-auto mb-8 max-w-lg space-y-4 text-left">
          {strengths.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-background-soft p-4">
              <p className="mb-2 text-sm font-medium text-text">Сильные стороны</p>
              <p className="text-sm leading-relaxed text-text-muted">
                {strengths
                  .map((item) => dimensionLabels[item.dimension] ?? item.dimension)
                  .join(', ')}
              </p>
            </div>
          )}
          {growthZones.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-background-soft p-4">
              <p className="mb-2 text-sm font-medium text-text">Зоны роста</p>
              <p className="text-sm leading-relaxed text-text-muted">
                {growthZones
                  .map((item) => dimensionLabels[item.dimension] ?? item.dimension)
                  .join(', ')}
              </p>
              {dimensionResults && (
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {growthZones.some((item) => item.level === 'low')
                    ? dimensionResults.low.description
                    : dimensionResults.medium.description}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <CopyButton
          text={copyText}
          label="Скопировать результат"
          successLabel="Скопировано!"
        />
        <Button variant="secondary" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          Пройти заново
        </Button>
      </div>
    </m.div>
  );
}
