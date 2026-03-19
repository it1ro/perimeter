'use client';

import { m } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import type { Quiz } from '@/types/test';

interface QuizResultProps {
  title: string;
  description: string;
  actionSteps?: string[];
  score: number;
  maxScore: number;
  quizTitle: string;
  dimensionResults?: Quiz['dimensionResults'];
  dimensionProfiles: Array<{ dimension: string; level: 'low' | 'medium' | 'high'; ratio: number }>;
  strengths: Array<{ dimension: string }>;
  growthZones: Array<{ dimension: string; level: 'low' | 'medium' | 'high' }>;
  disclaimer?: string;
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
  actionSteps,
  score,
  maxScore,
  quizTitle,
  dimensionResults,
  dimensionProfiles,
  strengths,
  growthZones,
  disclaimer,
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

      {actionSteps && actionSteps.length > 0 && (
        <div className="mx-auto mb-8 max-w-lg rounded-xl border border-white/10 bg-background-soft p-4 text-left">
          <p className="mb-2 text-sm font-medium text-text">Что сделать в ближайшую неделю</p>
          <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
            {actionSteps.map((step, index) => (
              <li key={`${index}-${step}`} className="flex gap-2">
                <span className="mt-[2px] text-sage">-</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

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

      {dimensionResults && dimensionProfiles.length > 0 && (
        <div className="mx-auto mb-8 max-w-lg rounded-xl border border-white/10 bg-background-soft p-4 text-left">
          <p className="mb-3 text-sm font-medium text-text">Разрез по измерениям</p>
          <div className="space-y-3">
            {dimensionProfiles.map((item) => {
              const levelMeta =
                item.level === 'high'
                  ? dimensionResults.high
                  : item.level === 'medium'
                    ? dimensionResults.medium
                    : dimensionResults.low;

              return (
                <div key={item.dimension} className="rounded-lg border border-white/10 px-3 py-2">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm text-text">
                      {dimensionLabels[item.dimension] ?? item.dimension}
                    </p>
                    <span className="text-xs text-text-muted">{levelMeta.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-text-muted">{levelMeta.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {disclaimer && (
        <div className="mx-auto mb-8 max-w-lg rounded-xl border border-white/10 bg-background-soft px-4 py-3 text-left">
          <p className="text-xs leading-relaxed text-text-muted">{disclaimer}</p>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            Результат не является диагнозом и не заменяет консультацию специалиста.
          </p>
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
