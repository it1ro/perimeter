'use client';

import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import type { Quiz } from '@/types/test';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

type Stage = 'questions' | 'result';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
  }),
};

export function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState<Stage>('questions');
  const [direction, setDirection] = useState(1);

  const total = quiz.questions.length;
  const maxScore = useMemo(
    () =>
      quiz.questions.reduce(
        (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
        0,
      ),
    [quiz.questions],
  );

  const result = useMemo(
    () => quiz.results.find((r) => score >= r.minScore && score <= r.maxScore),
    [quiz.results, score],
  );

  const handleAnswer = useCallback(
    (points: number) => {
      const newScore = score + points;
      setScore(newScore);

      if (currentIndex + 1 < total) {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStage('result');
      }
    },
    [score, currentIndex, total],
  );

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(0);
    setScore(0);
    setStage('questions');
  }, []);

  const progressPercent = stage === 'result' ? 100 : (currentIndex / total) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-text-muted">
          <span>
            {stage === 'result'
              ? 'Результат'
              : `Вопрос ${currentIndex + 1} из ${total}`}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <m.div
            className="h-full rounded-full bg-sage"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait" custom={direction}>
          {stage === 'questions' ? (
            <m.div
              key={`question-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <QuizQuestion
                question={quiz.questions[currentIndex]}
                onAnswer={handleAnswer}
              />
            </m.div>
          ) : (
            result && (
              <m.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <QuizResult
                  title={result.title}
                  description={result.description}
                  score={score}
                  maxScore={maxScore}
                  quizTitle={quiz.title}
                  onRestart={handleRestart}
                />
              </m.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
