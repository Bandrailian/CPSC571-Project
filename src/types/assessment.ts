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
        severity: 'none' | 'mild' | 'moderate' | 'severe';
    };
    recommendations: string[];
    createdAt: Date;
    aiInsights: string;
} 