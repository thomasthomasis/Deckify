import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

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
      id,
      title,
      created_at,
      cards(
        id,
        front,
        back,
        card_reviews(*)
      )
    `,
    )
    .eq('id', id)
    .single();

  if (!deck) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-3xl font-bold">Deck not found 😕</h1>

            <p className="mt-3 text-zinc-400">This deck may have been deleted or you may not have access to it.</p>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Back to Dashboard
            </Link>
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
      deck.cards.map((card) => card.id),
    )
    .lte('next_review', new Date().toISOString());

  const dueCount = reviews?.length ?? 0;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-zinc-400 transition hover:text-white">
          ← Back to Dashboard
        </Link>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">{deck.title}</h1>

              <div className="mt-4 flex gap-4 text-zinc-400">
                <span>📚 {cardCount} cards</span>

                <span>🔥 {dueCount} due</span>
              </div>
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
            {deck.cards.map((card) => (
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
