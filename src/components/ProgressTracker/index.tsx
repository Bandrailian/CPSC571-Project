'use client';

import { useMemo } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { questions } from '@/data/questions';
import styles from './ProgressTracker.module.scss';

export function ProgressTracker() {
    const { state } = useAssessment();

    const progress = useMemo(() => {
        const totalQuestions = questions.length;
        const answeredQuestions = Object.keys(state.answers).length;
        return Math.round((answeredQuestions / totalQuestions) * 100);
    }, [state.answers]);

    const sectionProgress = useMemo(() => {
        const sections = {
            anxiety: questions.filter(q => q.type === 'anxiety').length,
            depression: questions.filter(q => q.type === 'depression').length,
            lifestyle: questions.filter(q => q.type === 'lifestyle').length,
        };

        return Object.entries(sections).map(([section, total]) => {
            const answered = Object.entries(state.answers)
                .filter(([id]) => id.startsWith(section))
                .length;
            return {
                section,
                progress: Math.round((answered / total) * 100),
            };
        });
    }, [state.answers]);

    return (
        <div className={styles.container}>
            <div className={styles.overall}>
                <div className={styles.progressBar}>
                    <div 
                        className={styles.progress}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className={styles.percentage}>{progress}% Complete</span>
            </div>
            
            <div className={styles.sections}>
                {sectionProgress.map(({ section, progress }) => (
                    <div key={section} className={styles.section}>
                        <span className={styles.label}>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </span>
                        <div className={styles.sectionBar}>
                            <div 
                                className={styles.sectionProgress}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 