import OpenAI from 'openai';

const openai = new OpenAI();

export async function analyzeAnxietyResponse(formData: any) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a mental health professional specialized in anxiety disorders. Analyze the following patient data and provide an assessment of their anxiety levels, considering both explicit indicators and subtle signs in their language and reported symptoms."
      },
      {
        role: "user",
        content: JSON.stringify(formData)
      }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
} 