'use server';

import { createClient } from '@/lib/supabase/server';

import { updateCardReview } from '@/lib/study/updateReview';

import { calculateXP } from '@/lib/study/xp';

import { updateUserStats } from '@/lib/profile/updateStats';

export async function submitReview(cardReview: any, rating: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await updateCardReview(cardReview, rating);

  const xp = calculateXP(rating);

  await updateUserStats(user.id, xp);

  await supabase.from('study_sessions').insert({
    user_id: user.id,

    cards_reviewed: 1,

    xp_earned: xp,
  });
}
