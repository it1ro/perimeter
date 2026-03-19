import fs from 'fs';
import path from 'path';
import type { Quiz, QuizOption, QuizQuestion, QuizResult } from '@/types/test';

const TESTS_DIR = path.join(process.cwd(), 'data/tests');

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
      if (quiz) tests.push(quiz);
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
