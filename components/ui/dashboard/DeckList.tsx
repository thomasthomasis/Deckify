import DeckCard from '@/components/ui/dashboard/DeckCard';
import Link from 'next/link';

interface Props {
  decks: any[];
  reviews: any[];
}

export default function DeckList({ decks, reviews }: Props) {
  if (decks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
        <h2 className="text-2xl font-bold">Create your first deck</h2>

        <p className="mt-2 text-zinc-400">Generate AI flashcards and start learning.</p>

        <Link href="/create" className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black">
          Create Deck
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} reviews={reviews} />
      ))}
    </div>
  );
}
