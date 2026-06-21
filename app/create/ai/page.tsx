import Link from 'next/link';
import AIDeckForm from '@/components/ui/create/AIDeckForm';

export default function AIPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/create" className="text-sm text-zinc-400 transition hover:text-white">
          ← Back to Create Deck
        </Link>

        <h1 className="mt-8 text-4xl font-bold">Generate with AI ✨</h1>

        <p className="mt-2 text-zinc-400">Turn your notes into personalised flashcards.</p>

        <AIDeckForm />
      </div>
    </main>
  );
}
