import Navbar from '@/components/ui/Navbar';
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

  const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single();

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  const displayName = profile?.display_name ?? 'there';
  const hour = new Date().getHours();

  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const { data: decks } = await supabase.from('decks').select(`*, cards(id)`).eq('user_id', user.id);

  console.log('Decks:', decks);

  const today = new Date().toISOString();

  const { data: reviews } = await supabase
    .from('card_reviews')
    .select(`card_id, cards(deck_id)`)
    .eq('user_id', user.id)
    .lte('next_review', today);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 pb-20">
        <Navbar />

        {/* Greeting */}

        <section className="mt-12">
          <h1 className="text-4xl font-bold">
            {greeting}, <span className="text-emerald-400">{displayName}</span> 👋
          </h1>

          <p className="mt-2 text-zinc-400">Continue building your knowledge.</p>
        </section>

        {/* Stats */}

        <section className="mt-10">
          <DashboardStats stats={stats} />
        </section>

        {/* Decks */}

        <section className="mt-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Continue Learning</h2>

              <p className="mt-1 text-zinc-400">Pick up where you left off.</p>

              <Link
                href="/create"
                className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black hover:bg-emerald-400"
              >
                + New Deck
              </Link>
            </div>

            <div className="mt-8">
              <DeckList decks={decks ?? []} reviews={reviews ?? []} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
