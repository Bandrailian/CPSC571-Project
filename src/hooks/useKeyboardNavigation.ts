'use client';

import { useEffect } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { questions } from '@/data/questions';
import { useRouter } from 'next/navigation';

export function useKeyboardNavigation() {
    const { state, dispatch } = useAssessment();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.key) {
                case 'ArrowRight':
                case 'n':
                    if (state.currentQuestion < questions.length - 1) {
                        dispatch({ type: 'NEXT_QUESTION' });
                    }
                    break;
                case 'ArrowLeft':
                case 'p':
                    if (state.currentQuestion > 0) {
                        dispatch({ type: 'PREV_QUESTION' });
                    }
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    const optionIndex = parseInt(e.key) - 1;
                    const currentQuestion = questions[state.currentQuestion];
                    if (currentQuestion?.options[optionIndex]) {
                        dispatch({
                            type: 'SET_ANSWER',
                            payload: {
                                questionId: currentQuestion.id,
                                answer: { value: currentQuestion.options[optionIndex].value }
                            }
                        });
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.currentQuestion, dispatch]);
} 