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
        severity: 'mild' | 'moderate' | 'severe' | 'none';
    };
    recommendations: string[];
    aiInsights: string;
    createdAt: Date;
}; 