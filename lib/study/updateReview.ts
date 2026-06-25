import { createClient } from '@/lib/supabase/server';
import { calculateNextReview, Rating } from './algorithm';

export async function updateCardReview(cardId: string, rating: Rating, userId: string) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from('card_reviews')
    .select('*')
    .eq('card_id', cardId)
    .eq('user_id', userId)
    .single();

  const next = calculateNextReview(rating, existing);

  const { error } = existing
    ? await supabase
        .from('card_reviews')
        .update({
          interval: next.interval,
          ease_factor: next.ease_factor,
          repetitions: next.repetitions,
          next_review: next.next_review,
          last_reviewed: next.last_reviewed,
        })
        .eq('card_id', cardId)
        .eq('user_id', userId)
    : await supabase.from('card_reviews').insert({
        card_id: cardId,
        user_id: userId,
        interval: next.interval,
        ease_factor: next.ease_factor,
        repetitions: next.repetitions,
        next_review: next.next_review,
        last_reviewed: next.last_reviewed,
      });

  if (error) throw error;
}
