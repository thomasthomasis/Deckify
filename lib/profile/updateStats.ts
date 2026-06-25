import { createClient } from '@/lib/supabase/server';
import { calculateStreak } from './streaks';

export async function updateStreakAndCards(userId: string, studyTimeSeconds: number) {
  const supabase = await createClient();

  const [statsResult, profileResult, settingsResult] = await Promise.all([
    supabase
      .from('user_stats')
      .select('current_streak, longest_streak, total_cards_reviewed, total_study_time')
      .eq('user_id', userId)
      .single(),
    supabase.from('profiles').select('last_studied').eq('id', userId).single(),
    supabase.from('user_settings').select('timezone').eq('user_id', userId).maybeSingle(),
  ]);

  const stats = statsResult.data;
  const profile = profileResult.data;
  const timezone = settingsResult.data?.timezone ?? 'UTC';

  const newStreak = calculateStreak(profile?.last_studied ?? null, stats?.current_streak ?? 0, timezone);
  const newLongest = Math.max(newStreak, stats?.longest_streak ?? 0);
  const newTotalCards = (stats?.total_cards_reviewed ?? 0) + 1;
  const newStudyTime = (stats?.total_study_time ?? 0) + studyTimeSeconds;

  const [statsUpdate, profileUpdate] = await Promise.all([
    supabase
      .from('user_stats')
      .update({
        current_streak: newStreak,
        longest_streak: newLongest,
        total_cards_reviewed: newTotalCards,
        total_study_time: newStudyTime,
      })
      .eq('user_id', userId)
      .select('user_id'),

    supabase.from('profiles').update({ last_studied: new Date().toISOString() }).eq('id', userId),
  ]);

  if (statsUpdate.error) {
    throw new Error(`Failed to update stats: ${statsUpdate.error.message}`);
  }

  if (!statsUpdate.data?.length) {
    throw new Error('Stats update matched no rows — check RLS policy on user_stats');
  }

  if (profileUpdate.error) {
    throw new Error(`Failed to update profile: ${profileUpdate.error.message}`);
  }
}
