'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DeckError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
        <h2 className="text-2xl font-bold">Failed to load deck</h2>

        <p className="mt-3 text-zinc-400">There was a problem loading this deck.</p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            Try again
          </button>

          <Link href="/dashboard" className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5">
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
