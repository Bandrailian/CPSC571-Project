'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuestionAnswer } from '@/types/common';

export type AssessmentState = {
  currentQuestion: number;
  answers: Record<string, QuestionAnswer>;
  section: 'anxiety' | 'depression' | 'lifestyle';
  isComplete: boolean;
};

type AssessmentAction = 
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: QuestionAnswer } }
  | { type: 'JUMP_TO_QUESTION'; payload: number }
  | { type: 'SET_SECTION'; payload: AssessmentState['section'] }
  | { type: 'COMPLETE_ASSESSMENT' };

const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | null>(null);

const initialState: AssessmentState = {
  currentQuestion: 0,
  answers: {},
  section: 'anxiety',
  isComplete: false,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case 'PREV_QUESTION':
      return { ...state, currentQuestion: Math.max(0, state.currentQuestion - 1) };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.questionId]: action.payload.answer }
      };
    case 'JUMP_TO_QUESTION':
      return { ...state, currentQuestion: action.payload };
    case 'SET_SECTION':
      return { ...state, section: action.payload };
    case 'COMPLETE_ASSESSMENT':
      return { ...state, isComplete: true };
    default:
      return state;
  }
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
} 