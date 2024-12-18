import { Model, Schema } from 'mongoose';
import { AssessmentResult } from '@/types/assessment';
import { DATABASE_CONNECTION } from '@/server/helpers/database';

const AssessmentSchema = new Schema<AssessmentResult>({
    user: {
        type: String,
        required: true,
        ref: 'User',
    },
    anxietyScore: {
        type: Number,
        required: true,
    },
    depressionScore: {
        type: Number,
        required: true,
    },
    lifestyle: {
        type: Map,
        of: Schema.Types.Mixed,
        required: true,
    },
    diagnosis: {
        hasAnxiety: Boolean,
        hasDepression: Boolean,
        severityAnxiety: {
            type: String,
            enum: ['mild', 'moderate', 'severe', 'none'],
        },
        severityDepression: {
            type: String,
            enum: ['mild', 'moderate', 'severe', 'none', 'moderately severe'],
        },
    },
    recommendations: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    aiInsights: {
        type: String,
        required: true,
    },
}, { collection: 'Assessments', timestamps: true, versionKey: false });

export const AssessmentModel = DATABASE_CONNECTION.models.Assessment as Model<AssessmentResult> ||
DATABASE_CONNECTION.model<AssessmentResult>('Assessment', AssessmentSchema); 