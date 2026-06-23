'use client';

import { createClient } from '@/lib/supabase/client';
import GoogleIcon from '@/components/ui/GoogleIcon';

export default function GoogleButton() {
  const supabase = createClient();

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',

      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}
