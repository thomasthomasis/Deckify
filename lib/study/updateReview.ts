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

  const updatedReview = calculateNextReview(rating, existing);

  const { error } = await supabase
    .from('card_reviews')
    .update({
      interval: updatedReview.interval,
      ease_factor: updatedReview.ease_factor,
      repetitions: updatedReview.repetitions,
      next_review: updatedReview.next_review,
      last_reviewed: updatedReview.last_reviewed,
    })
    .eq('card_id', cardId)
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
}
