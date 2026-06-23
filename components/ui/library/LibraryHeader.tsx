import Link from 'next/link';

interface Props {
  createdDeckCount: number;
  savedDeckCount: number;
  totalCards: number;
}

export default function LibraryHeader({ createdDeckCount, savedDeckCount, totalCards }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/5 to-white/5 p-8 shadow-xl">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">My Library</h1>

          <p className="mt-3 max-w-xl text-zinc-400">
            Your personal collection of decks. Create, save, and continue learning.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300">
              📚 {createdDeckCount} created
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300">
              ⭐ {savedDeckCount} saved
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300">
              📝 {totalCards} cards
            </span>
          </div>
        </div>

        <Link
          href="/decks/create"
          className="rounded-xl bg-emerald-500 px-6 py-3 text-center font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
        >
          + Create Deck
        </Link>
      </div>
    </section>
  );
}
