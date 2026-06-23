import { getTrendingDecks, getPopularDecks, getRecentDecks } from '@/lib/discover/discover';
import SearchBar from '@/components/ui/discover/SearchBar';
import DiscoverSection from '@/components/ui/discover/DiscoverSection';
import DeckCard from '@/components/ui/discover/DeckCard';
import { searchDecks } from '@/lib/discover/discover';

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search;

  let decks = [];

  if (search) {
    decks = await searchDecks(search);
  }

  const trending = await getTrendingDecks();
  const popular = await getPopularDecks();
  const recent = await getRecentDecks();

  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">Discover</h1>

      <SearchBar />

      {search ? (
        <section>
          <h2 className="text-xl font-semibold">Search Results</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <DiscoverSection title="🔥 Trending Now" decks={trending} />

          <DiscoverSection title="⭐ Popular This Week" decks={trending} />

          <DiscoverSection title="✨ Recently Added" decks={recent} />
        </>
      )}
    </div>
  );
}
