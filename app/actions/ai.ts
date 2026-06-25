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
  if (!notes || typeof notes !== 'string') {
    throw new Error('Notes are required');
  }

  if (notes.length > MAX_NOTES_LENGTH) {
    throw new Error('Notes exceed maximum length of 50,000 characters');
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const safeAmount = Math.min(Math.max(1, Math.floor(Number(amount) || 10)), MAX_CARDS);

  // Atomically spend credit before calling OpenAI — prevents abuse with 1 credit
  const { data: spent, error: spendError } = await supabase.rpc('spend_ai_credit', { p_user_id: user.id });
  if (spendError) throw new Error('Failed to process credit. Please try again.');
  if (spent !== true) throw new Error('Insufficient credits');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: `Generate ${safeAmount} flashcards.\n\nReturn ONLY JSON.\n\nFormat:\n\n{\n "cards":[\n   {\n     "front":"",\n     "back":""\n   }\n ]\n}`,
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

  let result: { cards?: unknown[] };
  try {
    result = JSON.parse(completion.choices[0].message.content ?? '{}');
  } catch {
    throw new Error('Failed to parse AI response. Please try again.');
  }

  if (!Array.isArray(result.cards) || result.cards.length === 0) {
    throw new Error('AI returned an unexpected response. Please try again.');
  }

  return result.cards as { front: string; back: string }[];
}
