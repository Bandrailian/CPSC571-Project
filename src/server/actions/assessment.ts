'use server';

import { AssessmentResult } from '@/types/assessment';
import { OpenAI } from 'openai';
import { Assessment } from '@/server/models';
import { getAuthenticatedUser } from '@/server/helpers/auth';
import { parseToJSON } from '../helpers';
import { calculateSimilarity, getEmbedding } from '@/utils/embeddings';
import { QuestionAnswer } from '@/types/common';

const openai = new OpenAI();

type AssessmentAnswers = Record<string, QuestionAnswer>;
type PatternData = {
  embedding: number[];
  diagnosis: AssessmentResult['diagnosis'];
  date: Date;
};

function calculateAnxietyScore(answers: Record<string, QuestionAnswer>): number {
    const anxietyQuestions = Object.entries(answers).filter(([id]) => id.startsWith('anxiety'));
    const totalScore = anxietyQuestions.reduce((sum, [, answer]) => sum + answer.value, 0);
    return totalScore;
}

function calculateDepressionScore(answers: Record<string, QuestionAnswer>): number {
    const depressionQuestions = Object.entries(answers).filter(([id]) => id.startsWith('depression'));
    const totalScore = depressionQuestions.reduce((sum, [, answer]) => sum + answer.value, 0);
    return totalScore;
}

async function getAIInsights(answers: Record<string, QuestionAnswer>) {
    const prompt = `Analyze these assessment answers for subtle signs of anxiety or depression:
        ${JSON.stringify(answers, null, 2)}
        
        Consider: tone, patterns, and severity of symptoms.
        Provide insights about potential mental health concerns.`;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-turbo-preview",
    });

    return completion.choices[0].message.content as string;
}

async function getAIRecommendations(
    answers: AssessmentAnswers,
    diagnosis: AssessmentResult['diagnosis'],
    previousAssessments: AssessmentResult[]
) {
    const currentAnswersEmbedding = await getEmbedding(JSON.stringify(answers));
    
    const previousPatterns: PatternData[] = await Promise.all(
        previousAssessments.map(async (assessment) => ({
            embedding: await getEmbedding(JSON.stringify(assessment)),
            diagnosis: assessment.diagnosis,
            date: assessment.createdAt
        }))
    );

    const similarityScores = previousPatterns.map(pattern => 
        calculateSimilarity(currentAnswersEmbedding, pattern.embedding)
    );

    const prompt = `As a mental health professional, analyze these assessment results and provide personalized recommendations:

Assessment Data:
${JSON.stringify(answers, null, 2)}

Diagnosis:
${JSON.stringify(diagnosis, null, 2)}

Lifestyle Factors:
${JSON.stringify(extractLifestyleAnswers(answers), null, 2)}

Context:
- User has ${previousAssessments.length} previous assessments
- ${previousPatterns.length > 0 ? 'Shows pattern of ' + getPatternInsights(previousPatterns) : 'First assessment'}
- Similarity to previous assessments (based on embeddings): ${similarityScores.map((score, index) => 
    `${new Date(previousPatterns[index].date).toLocaleDateString()}: ${Math.round(score * 100)}%`
  ).join(', ')}

Based on this comprehensive analysis:
1. Provide 3-5 specific, actionable recommendations
2. Consider both immediate coping strategies and long-term improvement plans
3. Address specific lifestyle factors (sleep, exercise, social activity)
4. Prioritize evidence-based interventions
5. Include both mental health and lifestyle recommendations

Format your recommendations using markdown:
- Use **bold** for key points
- Use *italic* for emphasis
- Use bullet points for sub-recommendations
- Use numbered lists for sequential steps
- Highlight important terms with appropriate formatting`;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
    });

    const recommendations = (completion.choices[0].message.content as string)
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

    return recommendations;
}

function getPatternInsights(patterns: PatternData[]) {
    return patterns
        .map(p => `${p.diagnosis.severity} ${p.diagnosis.hasAnxiety ? 'anxiety' : ''}${p.diagnosis.hasDepression ? 'depression' : ''}`)
        .join(', ');
}

function extractLifestyleAnswers(answers: AssessmentAnswers) {
    const lifestyle: Record<string, number> = {};
    Object.entries(answers)
        .filter(([id]) => id.startsWith('lifestyle'))
        .forEach(([id, answer]) => {
            const key = id.replace('lifestyle-', '');
            lifestyle[key] = answer.value;
        });
    return lifestyle;
}

async function determineDiagnosis(
    anxietyScore: number, 
    depressionScore: number, 
    answers: AssessmentAnswers
) {
    const diagnosis: AssessmentResult['diagnosis'] = {
        hasAnxiety: false,
        hasDepression: false,
        severity: 'none'
    };

    const aiInsights = await getAIInsights(answers);

    if (anxietyScore >= 15) {
        diagnosis.hasAnxiety = true;
        diagnosis.severity = 'severe';
    } else if (anxietyScore >= 10) {
        diagnosis.hasAnxiety = true;
        diagnosis.severity = 'moderate';
    } else if (anxietyScore >= 5) {
        diagnosis.hasAnxiety = true;
        diagnosis.severity = 'mild';
    }

    if (depressionScore >= 20) {
        diagnosis.hasDepression = true;
        diagnosis.severity = 'severe';
    } else if (depressionScore >= 15) {
        diagnosis.hasDepression = true;
        diagnosis.severity = 'moderate';
    } else if (depressionScore >= 5) {
        diagnosis.hasDepression = true;
        diagnosis.severity = 'mild';
    }

    return {
        ...diagnosis,
        aiInsights
    };
}

export async function saveAssessment(
    answers: AssessmentAnswers
): Promise<AssessmentResult> {
    const user = (await getAuthenticatedUser())._id;
    
    const previousAssessments = await (await Assessment).find({ user })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const anxietyScore = calculateAnxietyScore(answers);
    const depressionScore = calculateDepressionScore(answers);
    const diagnosis = await determineDiagnosis(anxietyScore, depressionScore, answers);
    
    const recommendations = await getAIRecommendations(answers, diagnosis, previousAssessments);

    const assessment: Partial<AssessmentResult> = {
        user,
        anxietyScore,
        depressionScore,
        lifestyle: extractLifestyleAnswers(answers),
        diagnosis,
        recommendations,
        aiInsights: diagnosis.aiInsights,
    };
    
    const result = await (await Assessment).create(assessment);
    return parseToJSON(result);
}

export async function fetchAssessmentsAction() {
    const user = (await getAuthenticatedUser())._id;
    const assessments = await (await Assessment)
    .find({ user })
    .sort({ createdAt: -1 })
    .lean();
    return parseToJSON({ assessments }).assessments;
}