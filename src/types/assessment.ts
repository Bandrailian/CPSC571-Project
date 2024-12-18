export type QuestionType = {
    id: string;
    text: string;
    type: 'anxiety' | 'depression' | 'lifestyle';
    options: {
        text: string;
        value: number;
    }[];
};

export type AssessmentResult = {
    user: string;
    anxietyScore: number;
    depressionScore: number;
    lifestyle: Record<string, any>;
    diagnosis: {
        hasAnxiety: boolean;
        hasDepression: boolean;
        severityAnxiety: 'mild' | 'moderate' | 'severe' | 'none';
        severityDepression: 'mild' | 'moderate' | 'moderately severe' | 'severe' | 'none';
    };
    recommendations: string[];
    aiInsights: string;
    createdAt: Date;
}; 