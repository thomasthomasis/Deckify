import { createClient } from '@/lib/supabase/server';
import { calculateNextReview, Rating } from './algorithm';

export async function updateCardReview(cardId: string, rating: Rating, userId: string) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from('card_reviews')
    .select('interval, repetitions, ease_factor')
    .eq('card_id', cardId)
    .eq('user_id', userId)
    .maybeSingle();

  const next = calculateNextReview(rating, existing);

  const { error } = await supabase.from('card_reviews').upsert(
    {
      card_id: cardId,
      user_id: userId,
      interval: next.interval,
      ease_factor: next.ease_factor,
      repetitions: next.repetitions,
      next_review: next.next_review,
      last_reviewed: next.last_reviewed,
    },
    { onConflict: 'card_id,user_id' },
  );

  if (error) throw error;
}
