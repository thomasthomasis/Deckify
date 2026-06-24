'use client';

import { redirectAfterAuth } from '@/lib/auth/redirectAfterAuth';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GoogleButton from '@/components/ui/auth/GoogleButton';

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return null;
}

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function signup() {
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    setError('');

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      await redirectAfterAuth(router);
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signup();
      }}
      className="space-y-5"
    >
      <GoogleButton />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />

        <span className="text-sm text-zinc-500">OR</span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      <input
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white transition outline-none placeholder:text-zinc-500 focus:border-emerald-500"
        required
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div>
        <input
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white transition outline-none placeholder:text-zinc-500 focus:border-emerald-500"
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="mt-1 text-xs text-zinc-500">Min. 8 characters, one uppercase letter, one number</p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-emerald-400 active:scale-95 disabled:opacity-50"
      >
        <span className="relative z-10">{loading ? 'Creating account...' : 'Create Account'}</span>
      </button>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-emerald-400 transition hover:text-emerald-300">
          Log in
        </Link>
      </p>
    </form>
  );
}
