'use client';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error: _error, reset }: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
        <h2 className="text-2xl font-bold">Something went wrong</h2>

        <p className="mt-3 text-zinc-400">There was a problem loading your dashboard.</p>

        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
