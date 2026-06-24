import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_NOTES_LENGTH = 50_000;
const MAX_CARD_COUNT = 50;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { notes, difficulty, cardCount } = body;

    if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
      return NextResponse.json({ error: 'Notes are required' }, { status: 400 });
    }

    if (notes.length > MAX_NOTES_LENGTH) {
      return NextResponse.json({ error: 'Notes exceed maximum length' }, { status: 400 });
    }

    const safeCardCount = Math.min(Math.max(1, Math.floor(Number(cardCount) || 10)), MAX_CARD_COUNT);

    const safeDifficulty =
      typeof difficulty === 'string' && ['Beginner', 'Intermediate', 'University', 'Advanced'].includes(difficulty)
        ? difficulty
        : 'Intermediate';

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: `
You are an expert flashcard creator.

Create ${safeCardCount} flashcards.

Difficulty level:
${safeDifficulty}

Create as many useful flashcards as the material supports.
Do not create unnecessary or repetitive cards.
If the material is short, create fewer cards rather than inventing information.

Rules:
- One concept per card
- Focus on important information
- Test understanding, not memorization
- Keep answers concise
- Avoid duplicates
- Do not invent information

Return JSON only.

Format:

{
    "flashcards": [
        {
            "front": "",
            "back": ""
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

    const cards = JSON.parse(response.choices[0].message.content ?? '{}');

    return NextResponse.json(cards);
  } catch (error) {
    console.error('AI ERROR:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
      },
    );
  }
}
