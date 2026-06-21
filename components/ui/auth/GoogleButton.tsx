'use client';

import { createClient } from '@/lib/supabase/client';

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
      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium transition hover:bg-white/10"
    >
      Continue with Google
    </button>
  );
}
