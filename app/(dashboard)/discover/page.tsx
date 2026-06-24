import { Suspense } from 'react';
import { getTrendingDecks, getPopularDecks, getRecentDecks, searchDecks } from '@/lib/discover/discover';
import SearchBar from '@/components/ui/discover/SearchBar';
import DiscoverSection from '@/components/ui/discover/DiscoverSection';
import DeckCard from '@/components/ui/discover/DeckCard';

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search;

  const [decks, trending, popular, recent] = await Promise.all([
    search ? searchDecks(search) : Promise.resolve([]),
    getTrendingDecks(),
    getPopularDecks(),
    getRecentDecks(),
  ]);

  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">Discover</h1>

      <Suspense fallback={<div className="h-14 animate-pulse rounded-2xl bg-white/5" />}>
        <SearchBar />
      </Suspense>

      {search ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Search Results</h2>

          {decks.length === 0 ? (
            <p className="mt-4 text-zinc-400">No decks found for &quot;{search}&quot;.</p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <DiscoverSection title="🔥 Trending Now" decks={trending} />

          <DiscoverSection title="⭐ Popular This Week" decks={popular} />

          <DiscoverSection title="✨ Recently Added" decks={recent} />
        </>
      )}
    </div>
  );
}
