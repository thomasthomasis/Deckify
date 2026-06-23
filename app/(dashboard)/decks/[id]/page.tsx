import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
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
    return null;
  }

  const { data: deck } = await supabase
    .from('decks')
    .select(
      `
      *,
      profiles(
        display_name
      ),
      cards(
        id,
        front,
        back
      )
    `,
    )
    .eq('id', id)
    .single();

  const { data: savedDeck } = await supabase
    .from('saved_decks')
    .select('id')
    .eq('deck_id', deck.id)
    .eq('user_id', user.id)
    .maybeSingle();

  const isSaved = !!savedDeck;

  const isOwner = user?.id === deck?.user_id;

  if (!deck) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-3xl font-bold">Deck not found 😕</h1>

            <p className="mt-3 text-zinc-400">This deck may have been deleted or you may not have access to it.</p>
          </div>
        </div>
      </main>
    );
  }

  const cardCount = deck.cards?.length ?? 0;

  const { data: reviews } = await supabase
    .from('card_reviews')
    .select('*')
    .eq('user_id', user.id)
    .in(
      'card_id',
      deck.cards.map((card: any) => card.id),
    )
    .lte('next_review', new Date().toISOString());

  const dueCount = reviews?.length ?? 0;

  if (!deck.is_public && !isOwner) {
    return <div>Deck not found</div>;
  }

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
                  className="rounded-xl border border-white/10 px-5 py-3 font-semibold mt-5"
                >
                  Edit Deck
                </Link>
              ) : (
                <SaveDeckButton deckId={deck.id} initiallySaved={isSaved} />
              )}
            </div>

            <Link
              href={`/study/${deck.id}`}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-emerald-400"
            >
              Start Studying
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Cards</h2>

          <div className="mt-6 space-y-4">
            {(deck.cards ?? []).map((card: any) => (
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
