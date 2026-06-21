import { createClient } from '@/lib/supabase/server';
import { calculateLevel } from './level';
import { calculateStreak } from './streaks';

export async function updateUserStats(userId: string, xpEarned: number) {
  const supabase = await createClient();

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();

  const newXP = profile.xp + xpEarned;

  await supabase
    .from('profiles')
    .update({
      xp: newXP,

      level: calculateLevel(newXP),

      streak: calculateStreak(profile.last_studied, profile.streak),

      words_studied: profile.words_studied + 1,
    })
    .eq('id', userId);
}
