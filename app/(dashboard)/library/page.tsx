import { createClient } from '@/lib/supabase/server';
import LibrarySection from '@/components/ui/library/LibrarySection';
import Link from 'next/link';

export default async function LibraryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  /*
    Get decks created by user
  */

  const { data: createdDecks } = await supabase
    .from('decks')
    .select(
      `
      *,
      cards(
        id
      )
    `,
    )
    .eq('user_id', user.id)
    .order('created_at', {
      ascending: false,
    });

  /*
    Get saved decks
  */

  const { data: savedDecks } = await supabase
    .from('saved_decks')
    .select(
      `
      deck:decks(
        *,
        cards(
          id
        ),
        profiles(
          display_name
        )
      )
    `,
    )
    .eq('user_id', user.id);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">My Library</h1>

        <p className="mt-2 text-zinc-400">Your personal collection of decks.</p>

        <div className="mt-12 space-y-12">
          <div>
            <LibrarySection title="Created by You" decks={createdDecks ?? []} />

            <Link
              href="/create"
              className="inline-flex w-fit items-center rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              + New Deck
            </Link>
          </div>

          <LibrarySection title="Saved Decks" decks={savedDecks?.map((item) => item.deck) ?? []} />
        </div>
      </div>
    </main>
  );
}
