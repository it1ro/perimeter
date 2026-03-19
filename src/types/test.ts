export interface QuizOption {
  id: string;
  text: string;
  score: number;
}

export type QuizDimension =
  | 'work'
  | 'family'
  | 'friends'
  | 'public'
  | 'digital'
  | 'financial'
  | 'romantic'
  | 'values'
  | 'physical'
  | 'time';

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  dimension?: QuizDimension;
  reverse?: boolean;
  shuffleOptions?: boolean;
}

export interface QuizResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
}

export interface QuizDimensionResult {
  title: string;
  description: string;
}

export interface QuizScoring {
  scaleMin?: number;
  scaleMax?: number;
  reverseFormula?: string;
}

export interface Quiz {
  id: string;
  version?: string;
  title: string;
  description: string;
  instructions?: string;
  disclaimer?: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  scoring?: QuizScoring;
  dimensionResults?: {
    low: QuizDimensionResult;
    medium: QuizDimensionResult;
    high: QuizDimensionResult;
  };
}
