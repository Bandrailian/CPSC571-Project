'use client';

import ReactMarkdown from 'react-markdown';
import { AssessmentResult } from '@/types/assessment';
import styles from './ResultsVisualization.module.scss';

type ResultsVisualizationProps = {
    result: AssessmentResult;
};

export function ResultsVisualization({ result }: ResultsVisualizationProps) {
    const getScoreColor = (score: number, type: 'anxiety' | 'depression') => {
        const maxScore = type === 'anxiety' ? 21 : 27; // GAD-7 max is 21, PHQ-9 max is 27
        const percentage = (score / maxScore) * 100;
        
        if (percentage >= 75) return styles.severe;
        if (percentage >= 50) return styles.moderate;
        if (percentage >= 25) return styles.mild;
        return styles.normal;
    };

    return (
        <div className={styles.container}>
            <div className={styles.scoreSection}>
                <h3>Assessment Scores</h3>
                <div className={styles.scores}>
                    <div className={styles.scoreCard}>
                        <span className={styles.label}>Anxiety</span>
                        <div className={`${styles.score} ${getScoreColor(result.anxietyScore, 'anxiety')}`}>
                            {result.anxietyScore}
                        </div>
                    </div>
                    <div className={styles.scoreCard}>
                        <span className={styles.label}>Depression</span>
                        <div className={`${styles.score} ${getScoreColor(result.depressionScore, 'depression')}`}>
                            {result.depressionScore}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.diagnosisSection}>
                <h3>Diagnosis</h3>
                <div className={styles.diagnosis}>
                    {result.diagnosis.hasAnxiety && (
                        <p>Signs of {result.diagnosis.severity} anxiety detected</p>
                    )}
                    {result.diagnosis.hasDepression && (
                        <p>Signs of {result.diagnosis.severity} depression detected</p>
                    )}
                    {!result.diagnosis.hasAnxiety && !result.diagnosis.hasDepression && (
                        <p>No significant signs of anxiety or depression detected</p>
                    )}
                </div>
            </div>

            <div className={styles.recommendationsSection}>
                <h3>Recommendations</h3>
                <ul className={styles.recommendations}>
                    {result.recommendations.map((recommendation, index) => (
                        <li key={index} className={styles.recommendation}>
                            <ReactMarkdown>{recommendation}</ReactMarkdown>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 