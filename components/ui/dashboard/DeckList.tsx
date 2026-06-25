import DeckCard from '@/components/ui/dashboard/DeckCard';
import Link from 'next/link';

interface Deck {
  id: string;
  title: string;
  cards?: { id: string }[];
}

interface Review {
  card_id: string;
}

interface Props {
  decks: Deck[];
  reviews: Review[];
}

export default function DeckList({ decks, reviews }: Props) {
  if (decks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
        <h2 className="text-2xl font-bold">Create your first deck</h2>

        <p className="mt-2 text-zinc-400">Generate AI flashcards and start learning.</p>

        <Link
          href="/create"
          className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
        >
          Create Deck
        </Link>
      </div>
    );
  }

  // O(n) lookup — build set once, not inside the per-deck loop
  const dueCardIds = new Set(reviews.map((r) => r.card_id));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {decks.map((deck) => {
        const cardCount = deck.cards?.length ?? 0;
        const dueCount = deck.cards?.filter((card) => dueCardIds.has(card.id)).length ?? 0;
        const progress = cardCount > 0 ? Math.round(((cardCount - dueCount) / cardCount) * 100) : 0;

        return (
          <DeckCard
            key={deck.id}
            id={deck.id}
            title={deck.title}
            cardCount={cardCount}
            dueCount={dueCount}
            progress={progress}
          />
        );
      })}
    </div>
  );
}
