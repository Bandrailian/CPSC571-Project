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
                {
                    label: 'Sleep Quality',
                    data: assessments.map(a => a.lifestyle['1']),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    yAxisID: 'y1',
                },
                {
                    label: 'Exercise Frequency',
                    data: assessments.map(a => a.lifestyle['2']),
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    yAxisID: 'y1',
                }
            ],
        };
    }, [assessments]);

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Assessment Score Trends',
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            if (context.dataset.yAxisID === 'y1') {
                                const ratings = ['Poor', 'Fair', 'Good', 'Excellent'];
                                label += ratings[context.parsed.y] || 'Unknown';
                            } else {
                                label += context.parsed.y + ' points';
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                min: 0,
                max: 30,
                title: {
                    display: true,
                    text: 'Mental Health Scores'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                min: 0,
                max: 3,
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                title: {
                    display: true,
                    text: 'Lifestyle Ratings'
                },
                ticks: {
                    callback: function(value: any) {
                        const ratings = ['Poor', 'Fair', 'Good', 'Excellent'];
                        return ratings[value];
                    }
                }
            },
        },
    };

    return (
        <div className={styles.container}>
            <Line options={options} data={chartData} />
        </div>
    );
} 