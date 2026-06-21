import { createClient } from '@/lib/supabase/server';
import { calculateNextReview, Rating } from './algorithm';

export async function updateCardReview(cardReview: any, rating: Rating) {
  const supabase = await createClient();

  const updatedReview = calculateNextReview(rating, cardReview);

  const { error } = await supabase
    .from('card_reviews')
    .update({
      interval: updatedReview.interval,

      ease_factor: updatedReview.ease_factor,

      repetitions: updatedReview.repetitions,

      next_review: updatedReview.next_review,

      last_reviewed: updatedReview.last_reviewed,
    })
    .eq('card_id', cardReview.card_id);

  if (error) {
    throw error;
  }
}
