'use server';

import { createClient } from '@/lib/supabase/server';

export async function getCredits(): Promise<number> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data } = await supabase
    .from('user_stats')
    .select('ai_credits')
    .eq('user_id', user.id)
    .single();

  return data?.ai_credits ?? 0;
}

// Atomically decrements credits. Returns false if the user had 0 credits.
export async function spendCredit(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data } = await supabase.rpc('spend_ai_credit', { p_user_id: user.id });

  return data === true;
}
