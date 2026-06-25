import Link from 'next/link';
import LibraryDeckCard from './LibraryDeckCard';

interface LibraryDeck {
  id: string;
  title: string;
  description?: string | null;
  is_public?: boolean;
  user_id?: string;
  cards?: { id: string }[];
  profiles?: { display_name?: string | null } | { display_name?: string | null }[] | null;
}

interface Props {
  title: string;
  decks: LibraryDeck[];
  sectionType: 'owned' | 'saved';
}

export default function LibrarySection({ title, decks, sectionType }: Props) {
  const isOwned = sectionType === 'owned';

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {decks.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <LibraryDeckCard key={deck.id} deck={deck} isOwner={isOwned} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-lg font-semibold">
            {isOwned ? 'No decks created yet' : 'No saved decks yet'}
          </h3>

          <p className="mt-2 text-zinc-400">
            {isOwned
              ? 'Create your first flashcard deck and start learning.'
              : 'Discover decks from the community and save your favourites.'}
          </p>
        </div>
      )}

      {isOwned ? (
        <div className="mt-6 flex justify-center">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            + Create New Deck
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex justify-center">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Discover More Decks →
          </Link>
        </div>
      )}
    </section>
  );
}