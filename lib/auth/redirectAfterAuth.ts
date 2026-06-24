import { createClient } from '@/lib/supabase/client';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function redirectAfterAuth(router: AppRouterInstance) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    router.push('/login');
    return;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_complete')
    .eq('id', user.id)
    .single();

  if (!profile?.onboarding_complete) {
    router.push('/onboarding');
  } else {
    router.push('/dashboard');
  }
}
