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
  actionSteps?: string[];
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

export interface QuizUxDisclaimers {
  intro: string;
  inProgress: string;
  result: string;
  resultNote: string;
}

export interface QuizUxOptionOrder {
  lockGradatedScales: boolean;
  defaultShuffleOptions: boolean;
}

export interface QuizUxResultLabels {
  weeklyActionsTitle: string;
  strengthsTitle: string;
  growthZonesTitle: string;
  dimensionsTitle: string;
}

export interface QuizUxConfig {
  disclaimers: QuizUxDisclaimers;
  optionOrder: QuizUxOptionOrder;
  resultLabels: QuizUxResultLabels;
}

export interface Quiz {
  id: string;
  version?: string;
  title: string;
  description: string;
  instructions?: string;
  disclaimer?: string;
  disclaimerShort?: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  scoring?: QuizScoring;
  dimensionResults?: {
    low: QuizDimensionResult;
    medium: QuizDimensionResult;
    high: QuizDimensionResult;
  };
  ux?: Partial<QuizUxConfig>;
}
