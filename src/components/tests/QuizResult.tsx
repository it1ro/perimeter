'use client';

import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';

interface QuizResultProps {
  title: string;
  description: string;
  score: number;
  maxScore: number;
  quizTitle: string;
  onRestart: () => void;
}

export function QuizResult({
  title,
  description,
  score,
  maxScore,
  quizTitle,
  onRestart,
}: QuizResultProps) {
  const copyText = `${quizTitle}\n\nМой результат: ${title} (${score} из ${maxScore})\n\n${description}`;

  return (
    <motion.div
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
    </motion.div>
  );
}
