'use client';

import { useMemo } from 'react';
import { m } from 'framer-motion';
import type { QuizQuestion as QuizQuestionType } from '@/types/test';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  shortDisclaimer?: string;
}

export function QuizQuestion({
  question,
  selectedOptionId,
  onSelectOption,
  shortDisclaimer,
}: QuizQuestionProps) {
  const isGradatedScale = useMemo(() => {
    const scores = question.options.map((option) => option.score);
    if (scores.length < 3) return false;
    const sorted = [...scores].sort((a, b) => a - b);
    if (new Set(sorted).size !== sorted.length) return false;
    for (let i = 1; i < sorted.length; i += 1) {
      if (sorted[i] - sorted[i - 1] !== 1) return false;
    }
    return true;
  }, [question.options]);

  const options = useMemo(() => {
    if (isGradatedScale) return question.options;
    if (question.shuffleOptions === true) {
      return [...question.options].sort(() => Math.random() - 0.5);
    }
    return question.options;
  }, [isGradatedScale, question.options, question.shuffleOptions]);

  return (
    <div>
      <h2 className="font-display mb-6 text-xl font-semibold leading-snug text-text sm:text-2xl">
        {question.text}
      </h2>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.text}>
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <m.button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(option.id)}
              className={[
                'w-full rounded-xl border px-5 py-4 text-left text-base leading-relaxed transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isSelected
                  ? 'border-sage bg-sage/15 text-text'
                  : 'border-white/10 bg-background-soft text-text hover:border-sage/30 hover:bg-sage/5',
              ].join(' ')}
              whileTap={{ scale: 0.98 }}
            >
              {option.text}
            </m.button>
          );
        })}
      </div>

      {shortDisclaimer && (
        <p className="mt-4 text-xs leading-relaxed text-text-muted">{shortDisclaimer}</p>
      )}
    </div>
  );
}
