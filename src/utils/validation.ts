import { AssessmentState } from '@/contexts/AssessmentContext';
import { questions } from '@/data/questions';

export function validateAssessment(answers: AssessmentState['answers']) {
    const errors: string[] = [];
    
    // Check for required questions
    questions.forEach(question => {
        if (!answers[question.id]) {
            errors.push(`Question "${question.text}" is required`);
        }
    });

    // Validate answer values
    Object.entries(answers).forEach(([questionId, answer]) => {
        const question = questions.find(q => q.id === questionId);
        if (question) {
            const validValues = question.options.map(opt => opt.value);
            if (!validValues.includes(answer.value)) {
                errors.push(`Invalid answer for question "${question.text}"`);
            }
        }
    });

    return errors;
} 