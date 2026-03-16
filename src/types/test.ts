export interface QuizOption {
  id: string;
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface QuizResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: QuizResult[];
}
