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

Consider the presence and severity of either anxiety or depression:
- If one is much more severe than the other focus on it
- If one is very low, don't mention it during the recommendations

Consider which of the first 16 questions have the highest score:
- Questions 1, 2, & 4 show signs of excessive worry
- Questions 3, 13, & 14 show need for better organization
- Questions 8, 9, 12, & 16 suggest need for engaging and/or social activities
- Questions 10, 11, & 15 suggest need for more sleep
- Questions 5, 6, 7, & 16 show signs of instability and need for self care

Consider the last 8 questions, A low score is 0 or 1:
- If questions 17 & 18 have low scores sleep should be improved
- If questions 19 & 20 have low scores more exercise should be recommended
- If questions 21 & 22 have low scores more engaging and/or social activities are needed
- If question 23 has a low score the user is drinking too much caffeine
- If question 24 has a low score the user is consuming too much alcohol

  Based on this comprehensive analysis:
1. Provide the best 1-3 specific, actionable recommendations
2. Encourage improvements in lifestyle scores and decreases in anxiety or depression
3. Mention if any changes made so far have had a positive impact
4. If scores for questions 17-22 are high, consider other lifestyle changes to recommend
5. If anxiety and depression severity scores are high (10+) and no changes occur, recommend speaking to a doctor

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
        .map(p => `${p.diagnosis.hasAnxiety ? `${p.diagnosis.severityAnxiety} anxiety` : ''}${p.diagnosis.hasDepression ? `${p.diagnosis.severityDepression} depression` : ''}`)
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
        severityAnxiety: 'none',
        severityDepression: 'none'
    };

    const aiInsights = await getAIInsights(answers);

    if (anxietyScore >= 15) {
        diagnosis.hasAnxiety = true;
        diagnosis.severityAnxiety = 'severe';
    } else if (anxietyScore >= 10) {
        diagnosis.hasAnxiety = true;
        diagnosis.severityAnxiety = 'moderate';
    } else if (anxietyScore >= 5) {
        diagnosis.hasAnxiety = true;
        diagnosis.severityAnxiety = 'mild';
    }

    if (depressionScore >= 20) {
        diagnosis.hasDepression = true;
        diagnosis.severityDepression = 'severe';
    } else if (depressionScore >= 15) {
        diagnosis.hasDepression = true;
        diagnosis.severityDepression = 'moderately severe';
    } else if (depressionScore >= 10) {
        diagnosis.hasDepression = true;
        diagnosis.severityDepression = 'moderate';
    } else if (depressionScore >= 5) {
        diagnosis.hasDepression = true;
        diagnosis.severityDepression = 'mild';
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