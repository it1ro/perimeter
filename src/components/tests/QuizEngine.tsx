'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import type { Quiz } from '@/types/test';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

type Stage = 'intro' | 'questions' | 'result';
type DimensionLevel = 'low' | 'medium' | 'high';

interface DimensionScoreState {
  raw: number;
  max: number;
}

interface DimensionProfile {
  dimension: string;
  ratio: number;
  level: DimensionLevel;
}

interface SavedQuizState {
  stage: Stage;
  currentIndex: number;
  answers: Record<string, string>;
}

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
  const [stage, setStage] = useState<Stage>('intro');
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = quiz.questions.length;
  const storageKey = useMemo(
    () => `quiz-progress:${quiz.id}:${quiz.version ?? '1'}`,
    [quiz.id, quiz.version],
  );

  const scoreState = useMemo(() => {
    const dimensionScoresAccumulator: Record<string, DimensionScoreState> = {};
    const totalScore = quiz.questions.reduce((sum, question) => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.options.find((option) => option.id === selectedOptionId);
      if (!selectedOption) {
        return sum;
      }

      const questionMax = Math.max(...question.options.map((option) => option.score));
      const adjustedScore = question.reverse
        ? questionMax - selectedOption.score
        : selectedOption.score;

      if (question.dimension) {
        const current = dimensionScoresAccumulator[question.dimension] ?? { raw: 0, max: 0 };
        dimensionScoresAccumulator[question.dimension] = {
          raw: current.raw + adjustedScore,
          max: current.max + questionMax,
        };
      }

      return sum + adjustedScore;
    }, 0);

    return {
      score: totalScore,
      dimensionScores: dimensionScoresAccumulator,
    };
  }, [answers, quiz.questions]);

  const maxScore = useMemo(
    () =>
      quiz.questions.reduce(
        (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
        0,
      ),
    [quiz.questions],
  );

  const result = useMemo(
    () => quiz.results.find((r) => scoreState.score >= r.minScore && scoreState.score <= r.maxScore),
    [quiz.results, scoreState.score],
  );

  const dimensionProfiles = useMemo<DimensionProfile[]>(() => {
    return Object.entries(scoreState.dimensionScores)
      .map(([dimension, value]) => {
        const ratio = value.max > 0 ? value.raw / value.max : 0;
        const level: DimensionLevel =
          ratio < 0.4 ? 'low' : ratio < 0.7 ? 'medium' : 'high';
        return { dimension, ratio, level };
      })
      .sort((a, b) => b.ratio - a.ratio);
  }, [scoreState.dimensionScores]);

  const strengths = useMemo(
    () => dimensionProfiles.filter((d) => d.level === 'high').slice(0, 3),
    [dimensionProfiles],
  );

  const growthZones = useMemo(
    () =>
      dimensionProfiles
        .filter((d) => d.level !== 'high')
        .sort((a, b) => a.ratio - b.ratio)
        .slice(0, 2),
    [dimensionProfiles],
  );

  const handleSelectAnswer = useCallback(
    (optionId: string) => {
      const question = quiz.questions[currentIndex];
      setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    },
    [currentIndex, quiz.questions],
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 < total) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    setStage('result');
  }, [currentIndex, total]);

  const handlePrev = useCallback(() => {
    if (currentIndex === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(0);
    setAnswers({});
    setStage('intro');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const handleStart = useCallback(() => {
    setDirection(1);
    setStage('questions');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as SavedQuizState;
      const isValidStage =
        parsed.stage === 'intro' || parsed.stage === 'questions' || parsed.stage === 'result';
      if (!isValidStage) return;
      const safeIndex = Math.min(Math.max(parsed.currentIndex ?? 0, 0), Math.max(total - 1, 0));
      setAnswers(parsed.answers ?? {});
      setCurrentIndex(safeIndex);
      setStage(parsed.stage);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey, total]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload: SavedQuizState = {
      stage,
      currentIndex,
      answers,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [answers, currentIndex, stage, storageKey]);

  const progressPercent =
    stage === 'intro' ? 0 : stage === 'result' ? 100 : (currentIndex / total) * 100;
  const currentQuestion = quiz.questions[currentIndex];
  const selectedOptionId = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isNextDisabled = stage === 'questions' && !selectedOptionId;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-text-muted">
          <span>
            {stage === 'result'
              ? 'Результат'
              : stage === 'intro'
                ? 'Подготовка'
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
          {stage === 'intro' ? (
            <m.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-background-soft p-6 text-left"
            >
              {quiz.instructions && (
                <p className="text-sm leading-relaxed text-text-muted">{quiz.instructions}</p>
              )}
              {quiz.ux?.disclaimers.intro && (
                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                  {quiz.ux.disclaimers.intro}
                </p>
              )}
              <button
                type="button"
                onClick={handleStart}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-sage px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-sage-600"
              >
                Начать тест
              </button>
            </m.div>
          ) : stage === 'questions' ? (
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
                question={currentQuestion}
                selectedOptionId={selectedOptionId}
                onSelectOption={handleSelectAnswer}
                shortDisclaimer={
                  quiz.ux?.disclaimers.inProgress ??
                  'Короткая самопроверка: результат носит ознакомительный характер.'
                }
              />
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-sage/40 hover:text-sage disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className="inline-flex items-center justify-center rounded-lg bg-sage px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-sage-600 disabled:cursor-not-allowed disabled:bg-sage/60"
                >
                  {currentIndex + 1 === total
                    ? 'Сохранить и завершить'
                    : 'Сохранить и продолжить'}
                </button>
              </div>
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
                  actionSteps={result.actionSteps}
                  score={scoreState.score}
                  maxScore={maxScore}
                  quizTitle={quiz.title}
                  dimensionResults={quiz.dimensionResults}
                  dimensionProfiles={dimensionProfiles}
                  strengths={strengths}
                  growthZones={growthZones}
                  disclaimer={quiz.ux?.disclaimers.result}
                  resultNote={quiz.ux?.disclaimers.resultNote}
                  resultLabels={quiz.ux?.resultLabels}
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
