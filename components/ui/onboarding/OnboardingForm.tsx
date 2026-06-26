'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { completeOnboarding } from '@/app/actions/onboarding';

export default function OnboardingForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await completeOnboarding(name);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-bold">Welcome to Deckify 👋</h1>

      <p className="mt-3 text-zinc-400">What should we call you?</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={50}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition outline-none focus:border-emerald-500"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
