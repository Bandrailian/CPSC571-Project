'use client';

import { useAssessment } from '@/contexts/AssessmentContext';
import { AssessmentSection } from '@/types/common';
import styles from './Breadcrumb.module.scss';

const sections = ['Anxiety', 'Depression', 'Lifestyle'] as const;

export function Breadcrumb() {
    const { state, dispatch } = useAssessment();
    const currentSectionIndex = sections.findIndex(
        section => section.toLowerCase() === state.section
    );

    const handleSectionClick = (index: number) => {
        if (index <= currentSectionIndex) {
            dispatch({
                type: 'SET_SECTION',
                payload: sections[index].toLowerCase() as AssessmentSection
            });
        }
    };

    return (
        <div className={styles.breadcrumb}>
            {sections.map((section, index) => (
                <div key={section} className={styles.breadcrumbItem}>
                    <button
                        className={`${styles.section} ${
                            index === currentSectionIndex ? styles.active : ''
                        } ${index > currentSectionIndex ? styles.disabled : ''}`}
                        onClick={() => handleSectionClick(index)}
                        disabled={index > currentSectionIndex}
                    >
                        {section}
                    </button>
                    {index < sections.length - 1 && (
                        <span className={styles.separator}>→</span>
                    )}
                </div>
            ))}
        </div>
    );
} 