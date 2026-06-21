'use server';

import { updateCardReview } from '@/lib/study/updateReview';

import { Rating } from '@/lib/study/algorithm';

export async function submitReview(cardReview: any, rating: Rating) {
  await updateCardReview(cardReview, rating);
}
