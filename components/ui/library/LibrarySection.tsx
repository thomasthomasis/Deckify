import LibraryDeckCard from './LibraryDeckCard';

interface Props {
  title: string;

  decks: any[];
}

export default function LibrarySection({ title, decks }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <LibraryDeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </section>
  );
}
