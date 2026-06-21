import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { notes, difficulty, cardCount } = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',

      messages: [
        {
          role: 'system',
          content: `
                    You are an expert flashcard creator.

                    Create ${cardCount} flashcards.

                    Difficulty level:
                    ${difficulty}

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
        error: error instanceof Error ? error.message : 'Unkown error',
      },
      {
        status: 500,
      },
    );
  }
}
