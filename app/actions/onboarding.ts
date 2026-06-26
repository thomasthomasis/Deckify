'use server';

import { createClient } from '@/lib/supabase/server';

export async function completeOnboarding(name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    throw new Error('Name is required');
  }

  if (trimmed.length > 50) {
    throw new Error('Name must be 50 characters or fewer');
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      display_name: trimmed,
      onboarding_complete: true,
    }, { onConflict: 'id' });

  if (error) {
    throw error;
  }

  await supabase.from('user_stats').upsert({
    user_id: user.id,
    xp: 0,
    level: 1,
    current_streak: 0,
    ai_credits: 3,
    total_cards_reviewed: 0,
  }, { onConflict: 'user_id' });

  await supabase.from('user_settings').upsert({
    user_id: user.id,
    daily_goal: 10,
    reminders_enabled: true,
    timezone: 'UTC',
  }, { onConflict: 'user_id' });
}
