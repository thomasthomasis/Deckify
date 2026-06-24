'use server';

import { createClient } from '@/lib/supabase/server';
import { updateCardReview } from '@/lib/study/updateReview';
import { calculateXP } from '@/lib/study/xp';
import { updateUserStats } from '@/lib/profile/updateStats';
import { Rating } from '@/lib/study/algorithm';

export async function submitReview(cardId: string, rating: Rating) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  await updateCardReview(cardId, rating, user.id);

  const xp = calculateXP(rating);

  await updateUserStats(user.id, xp);

  await supabase.from('study_sessions').insert({
    user_id: user.id,
    cards_reviewed: 1,
    xp_earned: xp,
  });
}
