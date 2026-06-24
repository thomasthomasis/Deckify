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
    .update({
      display_name: trimmed,
      onboarding_complete: true,
    })
    .eq('id', user.id);

  if (error) {
    throw error;
  }
}
