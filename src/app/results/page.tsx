'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useAssessment } from '@/contexts/AssessmentContext';
import { saveAssessment } from '@/server/actions/assessment';
import { ResultsVisualization } from '@/components/ResultsVisualization';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AssessmentResult } from '@/types/assessment';
import styles from './page.module.scss';

export default function ResultsPage() {
    const { user } = useUser();
    const router = useRouter();
    const { state } = useAssessment();
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const submissionAttempted = useRef(false);

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
            return;
        }

        if (!state.isComplete) {
            router.push('/assessment');
            return;
        }

        const saveResults = async () => {
            if (submissionAttempted.current) return;
            submissionAttempted.current = true;

            try {
                const assessmentResult = await saveAssessment(state.answers);
                setResult(assessmentResult);
            } catch (err) {
                setError('Failed to process assessment results');
                console.error('Failed to save assessment:', err);
            } finally {
                setLoading(false);
            }
        };

        saveResults();
    }, [user, router, state]);

    if (!user || !state.isComplete) return null;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <LoadingSpinner />
                    <div className={styles.loadingSteps}>
                        <div className={styles.step}>
                            <span className={styles.stepLabel}>Analyzing responses</span>
                            <div className={styles.stepProgress} />
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepLabel}>Generating insights</span>
                            <div className={styles.stepProgress} />
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepLabel}>Preparing recommendations</span>
                            <div className={styles.stepProgress} />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className={styles.title}>Your Assessment Results</h1>
                    <ResultsVisualization result={result!} />
                    <div className={styles.actions}>
                        <button 
                            className={styles.button}
                            onClick={() => router.push('/')}
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </>
            )}
        </div>
    );
} 