import { AssessmentResult } from '@/types/assessment';

export function exportAssessmentData(assessments: AssessmentResult[]) {
    const csvContent = generateCSV(assessments);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `assessment_history_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generateCSV(assessments: AssessmentResult[]): string {
    const headers = [
        'Date',
        'Anxiety Score',
        'Anxiety Severity',
        'Depression Score',
        'Depression Severity',
        'Diagnosis',
        'Sleep Quality',
        'Exercise Frequency',
        'Social Activity'
    ].join(',');

    const rows = assessments.map(assessment => [
        new Date(assessment.createdAt).toLocaleDateString(),
        assessment.anxietyScore,
        assessment.diagnosis.severityAnxiety,
        assessment.depressionScore,
        assessment.diagnosis.severityDepression,
        `${assessment.diagnosis.hasAnxiety ? `Anxiety ${assessment.diagnosis.severityAnxiety}` : ''} ${assessment.diagnosis.hasDepression ? `Depression ${assessment.diagnosis.severityDepression}` : ''}`.trim(),
        assessment.lifestyle.sleep,
        assessment.lifestyle.exercise,
        assessment.lifestyle.social
    ].join(','));

    return [headers, ...rows].join('\n');
} 