import Link from 'next/link';

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center px-6">
        <div className="w-full">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-8 text-center text-4xl font-bold">Create a new deck</h1>

          <p className="mt-3 text-center text-zinc-400">Choose how you want to create your flashcards.</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Link
              href="/create/ai"
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-2 hover:border-emerald-400"
            >
              <h2 className="text-2xl font-bold">✨ Generate with AI</h2>

              <p className="mt-4 text-zinc-400">Paste notes and let AI create flashcards automatically.</p>

              <div className="mt-8 font-semibold text-emerald-400">Generate →</div>
            </Link>

            <Link
              href="/create/manual"
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-2 hover:border-emerald-400"
            >
              <h2 className="text-2xl font-bold">✏️ Create manually</h2>

              <p className="mt-4 text-zinc-400">Create your own cards and customise everything.</p>

              <div className="mt-8 font-semibold text-emerald-400">Create →</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
