'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuizQuestion as QuizQuestionType } from '@/types/test';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (score: number) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string, score: number) => {
    if (selectedId) return;
    setSelectedId(optionId);
    setTimeout(() => onAnswer(score), 400);
  };

  return (
    <div>
      <h2 className="font-display mb-6 text-xl font-semibold leading-snug text-text sm:text-2xl">
        {question.text}
      </h2>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.text}>
        {question.options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <motion.button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(option.id, option.score)}
              disabled={selectedId !== null && !isSelected}
              className={[
                'w-full rounded-xl border px-5 py-4 text-left text-base leading-relaxed transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isSelected
                  ? 'border-sage bg-sage/15 text-text'
                  : selectedId
                    ? 'border-white/5 bg-background-soft/50 text-text-muted'
                    : 'border-white/10 bg-background-soft text-text hover:border-sage/30 hover:bg-sage/5',
              ].join(' ')}
              whileTap={!selectedId ? { scale: 0.98 } : undefined}
            >
              {option.text}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
