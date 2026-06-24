'use server';

import { createClient } from '@/lib/supabase/server';
import { createEmbedding } from '@/lib/ai/createEmbedding';

const MAX_TITLE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_CARD_FRONT_LENGTH = 1000;
const MAX_CARD_BACK_LENGTH = 2000;
const MAX_CARDS = 200;

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
  if (!title.trim()) {
    throw new Error('Deck title is required');
  }

  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(`Title must be ${MAX_TITLE_LENGTH} characters or fewer`);
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`);
  }

  if (cards.length > MAX_CARDS) {
    throw new Error(`Deck cannot have more than ${MAX_CARDS} cards`);
  }

  if (cards.some((card) => !card.front.trim() || !card.back.trim())) {
    throw new Error('Cards cannot be empty');
  }

  if (cards.some((card) => card.front.length > MAX_CARD_FRONT_LENGTH || card.back.length > MAX_CARD_BACK_LENGTH)) {
    throw new Error('Card content exceeds maximum length');
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: deck } = await supabase.from('decks').select('user_id').eq('id', deckId).single();

  if (!deck || deck.user_id !== user.id) {
    throw new Error('You do not own this deck');
  }

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

  const { data: existingCards } = await supabase.from('cards').select('id').eq('deck_id', deckId);

  const existingIds = existingCards?.map((card) => card.id) ?? [];
  const updatedIds = cards.filter((card) => card.id).map((card) => card.id as string);

  const deletedIds = existingIds.filter((id) => !updatedIds.includes(id));

  if (deletedIds.length) {
    const { error } = await supabase.from('cards').delete().in('id', deletedIds);

    if (error) {
      throw error;
    }
  }

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

  const newCards = cards
    .filter((card) => !card.id)
    .map((card) => ({
      deck_id: deckId,
      front: card.front,
      back: card.back,
    }));

  if (newCards.length) {
    const { data: insertedCards, error } = await supabase.from('cards').insert(newCards).select();

    if (error) {
      throw error;
    }

    const reviews = insertedCards.map((card) => ({
      user_id: user.id,
      card_id: card.id,
    }));

    const { error: reviewError } = await supabase.from('card_reviews').insert(reviews);

    if (reviewError) {
      throw reviewError;
    }
  }

  return { success: true };
}

export async function deleteDeck(deckId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Unauthorized');
  }

  const { data: deck, error: deckError } = await supabase.from('decks').select('user_id').eq('id', deckId).single();

  if (deckError || !deck) {
    throw new Error('Deck not found');
  }

  if (deck.user_id !== user.id) {
    throw new Error('You do not own this deck');
  }

  const { error } = await supabase.from('decks').delete().eq('id', deckId);

  if (error) {
    throw error;
  }

  return { success: true };
}

export async function createDeck({ title, description, cards, is_public, creationMethod }: CreateDeckProps) {
  if (!title.trim()) {
    throw new Error('Deck title is required');
  }

  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(`Title must be ${MAX_TITLE_LENGTH} characters or fewer`);
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`);
  }

  if (cards.length > MAX_CARDS) {
    throw new Error(`Deck cannot have more than ${MAX_CARDS} cards`);
  }

  if (cards.some((card) => !card.front.trim() || !card.back.trim())) {
    throw new Error('All cards must have a front and back');
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const embeddingText = `
    ${title}

    ${description}

    ${cards.map((card) => `${card.front}\n${card.back}`).join('\n')}
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
    throw cardError ?? new Error('Failed to create cards');
  }

  const { error: reviewError } = await supabase.from('card_reviews').insert(
    createdCards.map((card) => ({
      user_id: user.id,
      card_id: card.id,
    })),
  );

  if (reviewError) {
    throw reviewError;
  }

  return deck;
}
