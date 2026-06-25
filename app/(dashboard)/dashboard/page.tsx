import DashboardStats from '@/components/ui/dashboard/DashboardStats';
import DeckList from '@/components/ui/dashboard/DeckList';
import Link from 'next/link';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const today = new Date().toISOString();

  const [statsResult, profileResult, ownedResult, savedResult, reviewsResult] = await Promise.all([
    supabase.from('user_stats').select('*').eq('user_id', user.id).single(),
    supabase.from('profiles').select('display_name').eq('id', user.id).single(),
    supabase.from('decks').select('id, title, cards(id)').eq('user_id', user.id),
    supabase.from('saved_decks').select('deck:decks(id, title, cards(id))').eq('user_id', user.id),
    supabase.from('card_reviews').select('card_id').eq('user_id', user.id).lte('next_review', today),
  ]);

  const stats = statsResult.data;
  const displayName = profileResult.data?.display_name ?? 'there';
  const reviews = reviewsResult.data ?? [];

  type DeckRow = { id: string; title: string; cards: { id: string }[] };

  const ownedDecks: DeckRow[] = (ownedResult.data ?? []) as DeckRow[];
  const savedDecks: DeckRow[] = (savedResult.data ?? [])
    .map((row) => (Array.isArray(row.deck) ? row.deck[0] : row.deck))
    .filter((d): d is DeckRow => Boolean(d));

  // Merge owned + saved, deduplicate by id
  const ownedIds = new Set(ownedDecks.map((d) => d.id));
  const allDecks = [...ownedDecks, ...savedDecks.filter((d) => !ownedIds.has(d.id))];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 pb-20">
        <section className="mt-12">
          <h1 className="text-4xl font-bold">
            {greeting}, <span className="text-emerald-400">{displayName}</span> 👋
          </h1>

          <p className="mt-2 text-zinc-400">Continue building your knowledge.</p>
        </section>

        <section className="mt-10">
          <DashboardStats stats={stats} />
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Continue Learning</h2>

              <p className="mt-1 text-zinc-400">Pick up where you left off.</p>
            </div>

            <Link
              href="/create"
              className="inline-flex w-fit items-center rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              + New Deck
            </Link>
          </div>

          <div className="mt-8">
            <DeckList decks={allDecks} reviews={reviews} />
          </div>
        </section>
      </div>
    </main>
  );
}
