import { createClient } from '@/lib/supabase/client';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function redirectAfterAuth(router: AppRouterInstance, userId?: string) {
  const supabase = createClient();

  let uid = userId;

  if (!uid) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    uid = user.id;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_complete')
    .eq('id', uid)
    .single();

  router.push(profile?.onboarding_complete ? '/dashboard' : '/onboarding');
}
