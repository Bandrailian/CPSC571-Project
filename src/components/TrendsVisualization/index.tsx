'use client';

import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { AssessmentResult } from '@/types/assessment';
import styles from './TrendsVisualization.module.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type TrendsVisualizationProps = {
    assessments: AssessmentResult[];
};

export function TrendsVisualization({ assessments }: TrendsVisualizationProps) {
    const chartData = useMemo(() => {
        const dates = assessments.map(a => 
            new Date(a.createdAt).toLocaleDateString()
        );
        
        return {
            labels: dates,
            datasets: [
                {
                    label: 'Anxiety Score',
                    data: assessments.map(a => a.anxietyScore),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Depression Score',
                    data: assessments.map(a => a.depressionScore),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
    }, [assessments]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Assessment Score Trends',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 30,
            },
        },
    };

    return (
        <div className={styles.container}>
            <Line options={options} data={chartData} />
        </div>
    );
} 