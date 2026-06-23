import DeckCard from '@/components/ui/discover/DeckCard';

interface Props {
  title: string;
  subtitle?: string;
  decks: any[];
}

export default function DiscoverSection({ title, subtitle, decks }: Props) {
  if (!decks || decks.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>

          {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </section>
  );
}
