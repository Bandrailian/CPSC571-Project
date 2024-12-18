import { LifestyleData } from './common';

export interface AssessmentResult {
    _id?: string;
    user: string;
    anxietyScore: number;
    depressionScore: number;
    lifestyle: LifestyleData;
    diagnosis: {
        hasAnxiety: boolean;
        hasDepression: boolean;
        severityAnxiety: 'mild' | 'moderate' | 'severe' | 'none';
        severityDepression: 'mild' | 'moderate' | 'moderately severe' | 'severe' | 'none';
    };
    recommendations: string[];
    createdAt: Date;
    aiInsights: string;
} 