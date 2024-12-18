export type QuestionAnswer = {
  value: number;
  text: string;
};

export type LifestyleData = {
  [key: string]: number;
};

export type AssessmentSection = 'anxiety' | 'depression' | 'lifestyle';

export type ErrorInfo = {
  componentStack: string;
  error: Error;
}; 