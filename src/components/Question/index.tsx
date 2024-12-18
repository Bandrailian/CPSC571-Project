'use client';

import { useState, useRef, useEffect } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { questions } from '@/data/questions';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import styles from './Question.module.scss';

type QuestionProps = {
    question: {
        id: string;
        text: string;
        options: {
            text: string;
            value: number;
        }[];
    };
    onNext: () => void;
    onPrevious: () => void;
};

export function Question({ question, onNext, onPrevious }: QuestionProps) {
    const { state, dispatch } = useAssessment();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const questionRef = useRef<HTMLDivElement>(null);
    useKeyboardNavigation();

    useEffect(() => {
        setSelectedOption(state.answers[question.id]?.value ?? null);
        if (questionRef.current) {
            questionRef.current.focus();
        }
    }, [question.id, state.answers]);

    const handleOptionSelect = (value: number) => {
        setSelectedOption(value);
        dispatch({
            type: 'SET_ANSWER',
            payload: { questionId: question.id, answer: { value } }
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent, value: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOptionSelect(value);
        }
    };

    return (
        <div 
            ref={questionRef}
            className={styles.question}
            tabIndex={0}
            role="region"
            aria-labelledby={`question-${question.id}`}
        >
            <h2 
                id={`question-${question.id}`}
                className={styles.questionText}
            >
                {question.text}
            </h2>
            
            <div 
                className={styles.options}
                role="radiogroup"
                aria-label="Answer options"
            >
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionSelect(option.value)}
                        onKeyPress={(e) => handleKeyPress(e, option.value)}
                        className={`${styles.option} ${
                            selectedOption === option.value ? styles.selected : ''
                        }`}
                        role="radio"
                        aria-checked={selectedOption === option.value}
                        tabIndex={0}
                    >
                        {option.text}
                    </button>
                ))}
            </div>

            <div className={styles.navigation}>
                <button
                    onClick={onPrevious}
                    className={styles.navButton}
                    aria-label="Previous question"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    className={`${styles.navButton} ${styles.primary}`}
                    disabled={selectedOption === null}
                    aria-label="Next question"
                >
                    Next
                </button>
            </div>
        </div>
    );
} 