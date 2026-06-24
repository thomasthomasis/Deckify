import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OnboardingForm from '@/components/ui/onboarding/OnboardingForm';

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase.from('profiles').select('onboarding_complete').eq('id', user.id).single();

  if (profile?.onboarding_complete) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <OnboardingForm />
    </main>
  );
}
