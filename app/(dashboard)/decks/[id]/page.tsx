import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import SaveDeckButton from '@/components/ui/deck/SaveDeckButton';
import DeleteDeckButton from '@/components/ui/deck/DeleteDeckButton';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeckPage({ params }: Props) {
  const supabase = await createClient();

  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: deck } = await supabase
    .from('decks')
    .select('id, title, description, is_public, user_id, profiles(display_name), cards(id, front, back)')
    .eq('id', id)
    .single();

  if (!deck) {
    notFound();
  }

  const isOwner = user.id === deck.user_id;

  if (!deck.is_public && !isOwner) {
    notFound();
  }

  const { data: savedDeck } = await supabase
    .from('saved_decks')
    .select('id')
    .eq('deck_id', deck.id)
    .eq('user_id', user.id)
    .maybeSingle();

  const isSaved = !!savedDeck;

  const cardCount = deck.cards?.length ?? 0;

  const cardIds = (deck.cards ?? []).map((card: { id: string }) => card.id);

  const { data: reviews } =
    cardIds.length > 0
      ? await supabase
          .from('card_reviews')
          .select('card_id')
          .eq('user_id', user.id)
          .in('card_id', cardIds)
          .lte('next_review', new Date().toISOString())
      : { data: [] };

  const dueCount = reviews?.length ?? 0;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">{deck.title}</h1>

              <div className="mt-4 flex gap-4 text-zinc-400">
                <span>📚 {cardCount} cards</span>
                <span>🔥 {dueCount} due</span>
              </div>

              {isOwner ? (
                <Link
                  href={`/decks/${deck.id}/edit`}
                  className="mt-5 rounded-xl border border-white/10 px-5 py-3 font-semibold"
                >
                  Edit Deck
                </Link>
              ) : (
                <SaveDeckButton deckId={deck.id} initiallySaved={isSaved} />
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href={`/study/${deck.id}`}
                className="rounded-xl bg-emerald-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-emerald-400"
              >
                Study {dueCount > 0 ? `(${dueCount} due)` : ''}
              </Link>

              <Link
                href={`/study/${deck.id}?restudy=true`}
                className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm font-medium transition hover:bg-white/10"
              >
                Restudy All
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Cards</h2>

          <div className="mt-6 space-y-4">
            {(deck.cards ?? []).map((card: { id: string; front: string; back: string }) => (
              <div key={card.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold">{card.front}</p>

                <p className="mt-2 text-zinc-400">{card.back}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
