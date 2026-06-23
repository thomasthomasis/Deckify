import Link from 'next/link';

interface Props {
  deck: {
    id: string;
    title: string;
    description?: string | null;
    save_count?: number | null;
    study_count?: number | null;
  };
}

export default function DeckCard({ deck }: Props) {
  return (
    <Link
      href={`/decks/${deck.id}`}
      className="group block rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
    >
      <div className="aspect-square rounded-lg bg-zinc-800" />

      <h3 className="mt-3 truncate text-sm font-semibold">{deck.title}</h3>

      <p className="mt-1 text-xs text-zinc-400">{deck.save_count ?? 0} learners</p>
    </Link>
  );
}
