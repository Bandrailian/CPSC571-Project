'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { AssessmentResult } from '@/types/assessment';
import { ResultsVisualization } from '@/components/ResultsVisualization';
import styles from './page.module.scss';
import { fetchAssessmentsAction } from '@/server/actions/assessment';
import { exportAssessmentData } from '@/utils/exportData';
import { TrendsVisualization } from '@/components/TrendsVisualization';

export default function HistoryPage() {
    const { user } = useUser();
    const router = useRouter();
    const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const exportAssessment = async () => {
        if (assessments.length > 0) {
            exportAssessmentData(assessments);
        }
    }

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await fetchAssessmentsAction();
                setAssessments(response);
                setLoading(false);
            } catch (err) {
                setError('Failed to load assessment history');
                setLoading(false);
                console.error(err);
            }
        };

        fetchAssessments();
    }, [user, router]);

    if (!user) return null;
    if (loading) return <div className={styles.loading}>Loading history...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button 
                    onClick={() => router.push('/')}
                    className={styles.backButton}
                >
                    ← Back to Dashboard
                </button>
                <h1 className={styles.title}>Assessment History</h1>
                <button
                    onClick={exportAssessment}
                    className={`${styles.exportButton} ${assessments.length === 0 ? styles.disabled : ''}`}
                >
                    Export Data
                </button>
            </div>
            
            {assessments.length === 0 ? (
                <div className={styles.empty}>
                    <p>No assessments found.</p>
                    <button 
                        onClick={() => router.push('/assessment')}
                        className={styles.startButton}
                    >
                        Take Your First Assessment
                    </button>
                </div>
            ) : (
                <>
                    <TrendsVisualization assessments={assessments} />
                    <div className={styles.assessments}>
                        {assessments.map((assessment) => (
                            <div key={assessment.createdAt.toString()} className={styles.assessmentCard}>
                                <div className={styles.date}>
                                    {new Date(assessment.createdAt).toLocaleDateString()}
                                </div>
                                <ResultsVisualization result={assessment} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
} 