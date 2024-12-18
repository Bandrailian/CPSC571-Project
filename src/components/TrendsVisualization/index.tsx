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
    Legend,
    TooltipItem
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
        // Sort assessments by date (oldest to newest)
        const sortedAssessments = [...assessments].sort((a, b) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        
        const dates = sortedAssessments.map(a => 
            new Date(a.createdAt).toLocaleDateString()
        );
        
        return {
            labels: dates,
            datasets: [
                {
                    label: 'Anxiety Score',
                    data: sortedAssessments.map(a => a.anxietyScore),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Depression Score',
                    data: sortedAssessments.map(a => a.depressionScore),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Sleep Quality',
                    data: sortedAssessments.map(a => 
                        Math.round((a.lifestyle['1'] + a.lifestyle['2']) / 2)),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    yAxisID: 'y1',
                },
                {
                    label: 'Exercise Frequency',
                    data: sortedAssessments.map(a => 
                        Math.round((a.lifestyle['3'] + a.lifestyle['4']) / 2)),
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    yAxisID: 'y1',
                },
                {
                    label: 'Quality of Experiences',
                    data: sortedAssessments.map(a => 
                        Math.round((a.lifestyle['5'] + a.lifestyle['6']) / 2)),
                    borderColor: 'rgb(249, 234, 31)',
                    backgroundColor: 'rgba(221, 215, 23, 0.5)',
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
                    label: function(context: TooltipItem<"line">) {
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
                max: 4,
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                title: {
                    display: true,
                    text: 'Lifestyle Ratings'
                },
                ticks: {
                    callback: function(tickValue: number | string) {
                        const ratings = ['Poor', 'Fair', 'Good', 'Excellent'];
                        return ratings[Number(tickValue)];
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