import Link from 'next/link';

interface LibraryDeck {
  id: string;
  title: string;
  description?: string | null;
  cards?: { id: string }[];
  profiles?: { display_name?: string | null } | { display_name?: string | null }[] | null;
}

interface Props {
  deck: LibraryDeck;
  isOwner?: boolean;
}

export default function LibraryDeckCard({ deck, isOwner = false }: Props) {
  const cardCount = deck.cards?.length ?? 0;
  const profileEntry = Array.isArray(deck.profiles) ? deck.profiles[0] : deck.profiles;
  const displayName = profileEntry?.display_name;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      {/* Header */}

      <div className="flex items-start justify-between gap-5">
        <div>
          <h3 className="text-lg font-bold text-white">{deck.title}</h3>

          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{deck.description || 'No description provided.'}</p>
        </div>

        {isOwner && (
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Your Deck
          </span>
        )}
      </div>

      {/* Stats */}

      <div className="mt-6 mb-3 flex gap-4 text-sm text-zinc-400">
        <span>📚 {cardCount} cards</span>

        {displayName && <span>👤 {displayName}</span>}
      </div>

      {/* Actions */}

      <div className="mt-auto flex gap-3 pt-6">
        <Link
          href={`/decks/${deck.id}`}
          className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-center text-sm font-semibold transition hover:bg-white/20"
        >
          View
        </Link>

        <Link
          href={`/study/${deck.id}`}
          className="flex-1 rounded-xl bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-black transition hover:bg-emerald-400"
        >
          Study
        </Link>
      </div>

      {isOwner && (
        <Link
          href={`/decks/${deck.id}/edit`}
          className="absolute top-5 right-5 text-sm text-zinc-400 opacity-0 transition group-hover:opacity-100 hover:text-white"
        >
          Edit
        </Link>
      )}
    </div>
  );
}
