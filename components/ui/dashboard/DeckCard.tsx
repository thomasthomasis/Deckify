import Link from 'next/link';

interface DeckCardProps {
  id: string;
  title: string;
  cardCount: number;
  dueCount: number;
  progress: number;
}

export default function DeckCard({ id, title, cardCount, dueCount, progress }: DeckCardProps) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-400/50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>

          <p className="mt-2 text-sm text-zinc-400">{cardCount} cards</p>
        </div>

        {dueCount > 0 ? (
          <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400">
            {dueCount} due
          </div>
        ) : progress > 0 ? (
          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
            Up to date
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Progress</span>

          <span>{progress}%</span>
        </div>

        <div className="mt-2 h-2 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/decks/${id}`}
          className="flex-1 rounded-xl border border-white/10 py-3 text-center text-sm font-medium transition hover:bg-white/10"
        >
          View
        </Link>

        <Link
          href={`/study/${id}?from=dashboard`}
          className="flex-1 rounded-xl bg-emerald-500 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-400"
        >
          {dueCount > 0 ? `Study ${dueCount}` : 'Review'}
        </Link>
      </div>
    </div>
  );
}
