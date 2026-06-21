import { createClient } from '@/lib/supabase/client';

interface CreateDeckProps {
  userId: string;

  title: string;

  cards: {
    front: string;
    back: string;
  }[];

  creationMethod: 'ai' | 'manual';
}

export async function createDeck({ userId, title, cards, creationMethod }: CreateDeckProps) {
  const supabase = createClient();

  const { data: deck, error: deckError } = await supabase

    .from('decks')

    .insert({
      user_id: userId,

      title,

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
