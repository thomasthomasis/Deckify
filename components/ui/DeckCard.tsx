import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  cards: number;
  dueCards: number;
}

export default function DeckCard({ id, title, cards, dueCards }: Props) {
  return (
    <Link href={`/decks/${id}`}>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="mt-6 space-y-2 text-zinc-400">
          <p>{cards} cards</p>

          <p>{dueCards} due today</p>
        </div>

        {dueCards > 0 && (
          <div className="mt-6 inline-flex rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
            Ready to study
          </div>
        )}
      </div>
    </Link>
  );
}
