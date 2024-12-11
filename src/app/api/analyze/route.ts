import { NextResponse } from 'next/server';
import { analyzeAnxietyResponse } from '@/utils/openai';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const analysis = await analyzeAnxietyResponse(formData);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze response' },
      { status: 500 }
    );
  }
} 