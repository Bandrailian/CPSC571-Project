'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Question } from '@/components/Question';
import { useAssessment } from '@/contexts/AssessmentContext';
import { questions } from '@/data/questions';
import { validateAssessment } from '@/utils/validation';
import { AssessmentErrorBoundary } from '@/components/AssessmentErrorBoundary';
import { ProgressTracker } from '@/components/ProgressTracker';
import styles from './page.module.scss';

export default function AssessmentPage() {
    const { user } = useUser();
    const router = useRouter();
    const { state, dispatch } = useAssessment();

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        }
    }, [user, router]);

    const currentQuestion = questions[state.currentQuestion];

    const handleNext = () => {
        try {
            if (state.currentQuestion === questions.length - 1) {
                const errors = validateAssessment(state.answers);
                if (errors.length > 0) {
                    throw new Error(errors.join('\n'));
                }
                dispatch({ type: 'COMPLETE_ASSESSMENT' });
                router.push('/results');
            } else {
                dispatch({ type: 'NEXT_QUESTION' });
            }
        } catch (error) {
            console.error('Assessment error:', error);
            throw error; // Let the error boundary handle it
        }
    };

    const handlePrevious = () => {
        dispatch({ type: 'PREV_QUESTION' });
    };

    if (!user) return null;

    return (
        <AssessmentErrorBoundary>
            <div className={styles.container}>
                <div className={styles.info} aria-hidden="true">
                {`Reflect back upon the last two weeks. Answer the following
                questions based on how often it has applied to you, or your
                best guess of an estimated average. Questions within the 
                'Anxiety' and 'Depression' sections are taken from the GAD-7
                and the PHQ-9 respectively. 'Lifestyle' questions will provide 
                insight into factors that commonly affect mental health status.`}
                </div>
                <div className={styles.keyboardHelp} aria-hidden="true">
                <p>Keyboard Shortcuts:</p>
                <ul>
                    <li>← Previous Question</li>
                    <li>→ Next Question</li>
                    <li>1-4 Select Option</li>
                </ul>
            </div>
                <ProgressTracker />
                <div className={styles.assessmentContent}>
                    <Question
                        question={currentQuestion}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                </div>
            </div>
        </AssessmentErrorBoundary>
    );
} 