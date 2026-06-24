'use server';

import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_NOTES_LENGTH = 50_000;
const MAX_CARDS = 50;

interface GenerateCardsInput {
  notes: string;
  amount: number;
}

export async function generateAICards({ notes, amount }: GenerateCardsInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (!notes || typeof notes !== 'string') {
    throw new Error('Notes are required');
  }

  if (notes.length > MAX_NOTES_LENGTH) {
    throw new Error('Notes exceed maximum length of 50,000 characters');
  }

  const safeAmount = Math.min(Math.max(1, Math.floor(Number(amount) || 10)), MAX_CARDS);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: `
Generate ${safeAmount} flashcards.

Return ONLY JSON.

Format:

{
 "cards":[
   {
     "front":"",
     "back":""
   }
 ]
}
`,
      },
      {
        role: 'user',
        content: notes,
      },
    ],
    response_format: {
      type: 'json_object',
    },
  });

  const result = JSON.parse(completion.choices[0].message.content ?? '{}');

  return result.cards;
}
