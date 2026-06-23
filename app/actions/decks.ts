'use server';

import { createClient } from '@/lib/supabase/server';
import { createEmbedding } from '@/lib/ai/createEmbedding';

interface UpdateDeckInput {
  deckId: string;
  title: string;
  description: string;
  isPublic: boolean;
  cards: {
    id?: string;
    front: string;
    back: string;
  }[];
}

interface CreateDeckProps {
  title: string;
  description: string;

  cards: {
    front: string;
    back: string;
  }[];

  is_public: boolean;

  creationMethod: 'ai' | 'manual';
}

export async function updateDeck({ deckId, title, description, isPublic, cards }: UpdateDeckInput) {

    console.log("UPDATE CARDS:", cards);
    
  if (!title.trim()) {
    throw new Error('Deck title is required');
  }

  if (cards.some((card) => !card.front.trim() || !card.back.trim())) {
    throw new Error('Cards cannot be empty');
  }

  const supabase = await createClient();

  /*
    1. Check logged in user
  */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  /*
    2. Check ownership
  */

  const { data: deck } = await supabase.from('decks').select('user_id').eq('id', deckId).single();

  if (!deck || deck.user_id !== user.id) {
    throw new Error('You do not own this deck');
  }

  /*
    3. Update deck
  */

  const { error: deckError } = await supabase
    .from('decks')
    .update({
      title,
      description,
      is_public: isPublic,
    })
    .eq('id', deckId);

  if (deckError) {
    throw deckError;
  }

  /*
    4. Get current cards
  */

  const { data: existingCards } = await supabase.from('cards').select('id').eq('deck_id', deckId);

  const existingIds = existingCards?.map((card) => card.id) ?? [];

  const updatedIds = cards.filter((card) => card.id).map((card) => card.id);

  /*
    5. Delete removed cards
  */

  const deletedIds = existingIds.filter((id) => !updatedIds.includes(id));

  if (deletedIds.length) {
    const { error } = await supabase.from('cards').delete().in('id', deletedIds);

    if (error) {
      throw error;
    }
  }

  /*
    6. Update existing cards
  */

  for (const card of cards) {
    if (!card.id) continue;

    const { error } = await supabase
      .from('cards')
      .update({
        front: card.front,
        back: card.back,
      })
      .eq('id', card.id);

    if (error) {
      throw error;
    }
  }

  /*
    7. Insert new cards
  */

  const newCards = cards
    .filter((card) => !card.id)
    .map((card) => ({
      deck_id: deckId,
      front: card.front,
      back: card.back,
    }));

  if (newCards.length) {
    const { error } = await supabase.from('cards').insert(newCards);

    if (error) {
      throw error;
    }
  }

  return {
    success: true,
  };
}

export async function deleteDeck(deckId: string) {
  const supabase = await createClient();

  // Check user
  const { data, error: userError } = await supabase.auth.getUser();
  const user = data.user;

  if (userError || !user) {
    throw new Error('Unauthorized');
  }

  // Check ownership

  const { data: deck, error: deckError } = await supabase.from('decks').select('user_id').eq('id', deckId).single();

  if (deckError || !deck) {
    throw new Error('Deck not found');
  }

  if (deck.user_id !== user.id) {
    throw new Error('You do not own this deck');
  }

  // Delete deck

  const { error } = await supabase.from('decks').delete().eq('id', deckId);

  if (error) {
    throw error;
  }

  return {
    success: true,
  };
}

export async function createDeck({ title, description, cards, is_public, creationMethod }: CreateDeckProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) {
    throw new Error("Unauthorized");
  }

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
        user_id: user.id,
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

  if (cardError || !createdCards) {
    throw cardError ?? new Error("Failed to create cards");
  }

  await supabase

    .from('card_reviews')

    .insert(
      createdCards.map((card) => ({
        user_id: user.id,

        card_id: card.id,
      })),
    );

  return deck;
}

