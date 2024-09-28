export interface Step {
  id: number;
  title: string;
  questions: Question[];
}

export interface Question {
  id: number;
  label: string;
  type: QuestionType;
  options?: string[];
}

export type QuestionType = 'text' | 'single-choice' | 'multi-choice' | 'number';

export interface QuizAnswer {
  questionId: number;
  answer: any;
}

export interface QuizData {
  answers: QuizAnswer[];
}
