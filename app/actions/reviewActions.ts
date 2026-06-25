'use server';

import { createClient } from '@/lib/supabase/server';
import { updateCardReview } from '@/lib/study/updateReview';
import { updateStreakAndCards } from '@/lib/profile/updateStats';
import { calculateXP } from '@/lib/study/xp';
import { Rating } from '@/lib/study/algorithm';

export async function submitReview(cardId: string, rating: Rating, studyTimeSeconds: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: cardDeck } = await supabase.from("cards").select("deck:decks(is_public, user_id)").eq("id", cardId).single();
  const deck = Array.isArray(cardDeck?.deck) ? cardDeck.deck[0] : cardDeck?.deck;
  if(!deck || (!deck.is_public && deck.user_id !== user.id)) {
    throw new Error("Unauthorized");
  }

  const xp = calculateXP(rating);

  const [, xpResult] = await Promise.all([
    updateCardReview(cardId, rating, user.id),

    supabase.from('xp_events').insert({
      user_id: user.id,
      amount: xp,
      reason: `card_review_${rating}`,
    }),

    updateStreakAndCards(user.id, studyTimeSeconds),
  ]);

  if (xpResult.error) {
    throw new Error(`Failed to record XP: ${xpResult.error.message}`);
  }
}
