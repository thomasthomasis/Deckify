import Link from 'next/link';

interface Props {
  deck: any;
  reviews: any[];
}

export default function DeckCard({ deck, reviews }: Props) {
  const totalCards = deck?.cards?.length ?? 0;
  const dueCards = reviews?.filter((review) => review.cards.deck_id === deck.id).length ?? 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1">
      <h2 className="text-xl font-bold">{deck.title}</h2>

      <p className="mt-2 text-zinc-400">{totalCards} cards</p>

      <div className="mt-5">
        <p className="text-sm text-zinc-400">Due today</p>

        <p className="text-3xl font-bold">🔥 {dueCards}</p>
      </div>

      <Link
        href={`/study/${deck.id}`}
        className="mt-6 inline-block rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400"
      >
        Continue Studying
      </Link>
    </div>
  );
}
