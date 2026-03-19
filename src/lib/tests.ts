import fs from 'fs';
import path from 'path';
import type {
  Quiz,
  QuizOption,
  QuizQuestion,
  QuizResult,
  QuizUxConfig,
  QuizUxResultLabels,
} from '@/types/test';

const TESTS_DIR = path.join(process.cwd(), 'data/tests');
const DEFAULT_IN_PROGRESS_DISCLAIMER = 'Результат носит ознакомительный характер.';
const DEFAULT_RESULT_NOTE = 'Результат не является диагнозом и не заменяет консультацию специалиста.';

const DEFAULT_RESULT_LABELS: QuizUxResultLabels = {
  weeklyActionsTitle: 'Что сделать в ближайшую неделю',
  strengthsTitle: 'Сильные стороны',
  growthZonesTitle: 'Зоны роста',
  dimensionsTitle: 'Разрез по измерениям',
};

const DEFAULT_QUIZ_UX: QuizUxConfig = {
  disclaimers: {
    intro: '',
    inProgress: DEFAULT_IN_PROGRESS_DISCLAIMER,
    result: '',
    resultNote: DEFAULT_RESULT_NOTE,
  },
  optionOrder: {
    lockGradatedScales: true,
    defaultShuffleOptions: true,
  },
  resultLabels: DEFAULT_RESULT_LABELS,
};

function isQuizOption(o: unknown): o is QuizOption {
  if (typeof o !== 'object' || o === null) return false;
  const obj = o as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.text === 'string' &&
    typeof obj.score === 'number'
  );
}

function isQuizQuestion(q: unknown): q is QuizQuestion {
  if (typeof q !== 'object' || q === null) return false;
  const obj = q as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.text === 'string' &&
    Array.isArray(obj.options) &&
    obj.options.length > 0 &&
    obj.options.every(isQuizOption)
  );
}

function isQuizResult(r: unknown): r is QuizResult {
  if (typeof r !== 'object' || r === null) return false;
  const obj = r as Record<string, unknown>;
  const hasValidActionSteps =
    obj.actionSteps === undefined ||
    (Array.isArray(obj.actionSteps) && obj.actionSteps.every((item) => typeof item === 'string'));
  return (
    typeof obj.minScore === 'number' &&
    typeof obj.maxScore === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    hasValidActionSteps
  );
}

function validateQuiz(data: unknown): Quiz | null {
  if (typeof data !== 'object' || data === null) return null;
  const obj = data as Record<string, unknown>;

  if (typeof obj.id !== 'string' || !obj.id) return null;
  if (typeof obj.title !== 'string' || !obj.title) return null;
  if (typeof obj.description !== 'string') return null;
  if (!Array.isArray(obj.questions) || obj.questions.length === 0) return null;
  if (!obj.questions.every(isQuizQuestion)) return null;
  if (!Array.isArray(obj.results) || obj.results.length === 0) return null;
  if (!obj.results.every(isQuizResult)) return null;

  return obj as unknown as Quiz;
}

function isGradatedScale(question: QuizQuestion): boolean {
  const scores = question.options.map((option) => option.score).sort((a, b) => a - b);
  if (scores.length < 3) return false;
  if (new Set(scores).size !== scores.length) return false;

  for (let i = 1; i < scores.length; i += 1) {
    if (scores[i] - scores[i - 1] !== 1) return false;
  }

  return true;
}

function normalizeQuiz(quiz: Quiz): Quiz {
  const legacyDisclaimer = quiz.disclaimer ?? '';
  const legacyShortDisclaimer =
    quiz.disclaimerShort ?? DEFAULT_QUIZ_UX.disclaimers.inProgress;

  const ux: QuizUxConfig = {
    disclaimers: {
      intro: quiz.ux?.disclaimers?.intro ?? legacyDisclaimer,
      inProgress: quiz.ux?.disclaimers?.inProgress ?? legacyShortDisclaimer,
      result: quiz.ux?.disclaimers?.result ?? legacyDisclaimer,
      resultNote: quiz.ux?.disclaimers?.resultNote ?? DEFAULT_QUIZ_UX.disclaimers.resultNote,
    },
    optionOrder: {
      lockGradatedScales:
        quiz.ux?.optionOrder?.lockGradatedScales ?? DEFAULT_QUIZ_UX.optionOrder.lockGradatedScales,
      defaultShuffleOptions:
        quiz.ux?.optionOrder?.defaultShuffleOptions ??
        DEFAULT_QUIZ_UX.optionOrder.defaultShuffleOptions,
    },
    resultLabels: {
      weeklyActionsTitle:
        quiz.ux?.resultLabels?.weeklyActionsTitle ?? DEFAULT_RESULT_LABELS.weeklyActionsTitle,
      strengthsTitle: quiz.ux?.resultLabels?.strengthsTitle ?? DEFAULT_RESULT_LABELS.strengthsTitle,
      growthZonesTitle:
        quiz.ux?.resultLabels?.growthZonesTitle ?? DEFAULT_RESULT_LABELS.growthZonesTitle,
      dimensionsTitle: quiz.ux?.resultLabels?.dimensionsTitle ?? DEFAULT_RESULT_LABELS.dimensionsTitle,
    },
  };

  const normalizedQuestions = quiz.questions.map((question) => {
    if (ux.optionOrder.lockGradatedScales && isGradatedScale(question)) {
      return { ...question, shuffleOptions: false };
    }
    return {
      ...question,
      shuffleOptions: question.shuffleOptions ?? ux.optionOrder.defaultShuffleOptions,
    };
  });

  return {
    ...quiz,
    questions: normalizedQuestions,
    ux,
  };
}

export function getAllTests(): Quiz[] {
  if (!fs.existsSync(TESTS_DIR)) return [];

  const files = fs.readdirSync(TESTS_DIR).filter((f) => f.endsWith('.json'));

  const tests: Quiz[] = [];

  for (const filename of files) {
    const filePath = path.join(TESTS_DIR, filename);
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);
      const quiz = validateQuiz(data);
      if (quiz) tests.push(normalizeQuiz(quiz));
    } catch {
      /* skip malformed files */
    }
  }

  return tests;
}

export function getTestBySlug(slug: string): Quiz | undefined {
  const tests = getAllTests();
  return tests.find((t) => t.id === slug);
}
