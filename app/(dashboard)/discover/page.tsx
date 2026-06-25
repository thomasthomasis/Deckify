import { Suspense } from 'react';
import { getTrendingDecks, getPopularDecks, getRecentDecks, searchDecks } from '@/lib/discover/discover';
import SearchBar from '@/components/ui/discover/SearchBar';
import DiscoverSection from '@/components/ui/discover/DiscoverSection';
import DeckCard from '@/components/ui/discover/DeckCard';
import Pagination from '@/components/ui/Pagination';

interface Props {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search;
  const page = Math.max(1, parseInt(params.page ?? '1'));

  const [searchResult, trending, popular, recent] = await Promise.all([
    search ? searchDecks(search, page) : Promise.resolve({ decks: [], total: 0 }),
    getTrendingDecks(),
    getPopularDecks(),
    getRecentDecks(),
  ]);

  const { decks, total } = searchResult;
  const totalPages = Math.ceil(total / 12);

  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">Discover</h1>

      <Suspense fallback={<div className="h-14 animate-pulse rounded-2xl bg-white/5" />}>
        <SearchBar />
      </Suspense>

      {search ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">
            Search Results{total > 0 && <span className="ml-2 text-sm font-normal text-zinc-400">({total} decks)</span>}
          </h2>

          {decks.length === 0 ? (
            <p className="mt-4 text-zinc-400">No decks found for &quot;{search}&quot;.</p>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {decks.map((deck) => (
                  <DeckCard key={deck.id} deck={deck} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                prevHref={page > 1 ? `?search=${encodeURIComponent(search)}&page=${page - 1}` : null}
                nextHref={
                  page < totalPages ? `?search=${encodeURIComponent(search)}&page=${page + 1}` : null
                }
              />
            </>
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
