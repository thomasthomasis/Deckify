'use client';

import { redirectAfterAuth } from '@/lib/auth/redirectAfterAuth';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GoogleButton from '@/components/ui/auth/GoogleButton';

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function login() {
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      await redirectAfterAuth(router, data.user?.id);
      router.refresh();
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
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
        type="email"
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-500"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-500"
        required
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-zinc-400 transition hover:text-white">
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-emerald-400 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-emerald-400 transition hover:text-emerald-300">
          Create one
        </Link>
      </p>
    </form>
  );
}
