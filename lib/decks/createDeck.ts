import { createClient } from '@/lib/supabase/client';
import { createEmbedding } from '@/lib/ai/createEmbedding';

interface CreateDeckProps {
  userId: string;

  title: string;
  description: string;

  cards: {
    front: string;
    back: string;
  }[];

  is_public: boolean;

  creationMethod: 'ai' | 'manual';
}

export async function createDeck({ userId, title, description, cards, is_public, creationMethod }: CreateDeckProps) {
  const supabase = createClient();

  const embeddingText = `
    ${title}

    ${description}

    ${cards
      .map(
        (card) =>
          `${card.front}
    ${card.back}`,
      )
      .join('\n')}
  `;

  const embedding = await createEmbedding(embeddingText);

  const { data: deck, error: deckError } = await supabase

    .from('decks')
    .insert({
      user_id: userId,
      title,
      description,
      embedding,
      is_public,
      creation_method: creationMethod,
    })
    .select()
    .single();

  if (deckError) {
    throw deckError;
  }

  const { data: createdCards, error: cardError } = await supabase

    .from('cards')

    .insert(
      cards.map((card) => ({
        deck_id: deck.id,

        front: card.front,

        back: card.back,
      })),
    )

    .select();

  if (cardError) {
    throw cardError;
  }

  await supabase

    .from('card_reviews')

    .insert(
      createdCards.map((card) => ({
        user_id: userId,

        card_id: card.id,
      })),
    );

  return deck;
}
