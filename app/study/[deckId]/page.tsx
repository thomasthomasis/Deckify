import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Flashcard from '@/components/ui/study/Flashcard';
import Link from 'next/link';

interface Props {
  params: Promise<{ deckId: string }>;
  searchParams: Promise<{ restudy?: string }>;
}

export default async function StudyPage({ params, searchParams }: Props) {
  const supabase = await createClient();

  const { deckId } = await params;
  const { restudy } = await searchParams;
  const isRestudy = restudy === 'true';

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: deck } = await supabase
    .from('decks')
    .select('id, user_id, is_public')
    .eq('id', deckId)
    .single();

  if (!deck) {
    notFound();
  }

  const isOwner = user.id === deck.user_id;

  if (!deck.is_public && !isOwner) {
    notFound();
  }

  const { data } = await supabase
    .from('cards')
    .select(`id, front, back, card_reviews(interval, repetitions, ease_factor, next_review)`)
    .eq('deck_id', deckId)
    .eq('card_reviews.user_id', user.id);

  const cards =
    data
      ?.filter((card) => {
        if (isRestudy) return true;

        const review = card.card_reviews?.[0];
        if (!review) return true;

        return new Date(review.next_review) <= new Date();
      })
      .map((card) => ({ id: card.id, front: card.front, back: card.back }))
      .sort(() => 0) ?? [];

  // Fisher-Yates shuffle — unbiased
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/decks/${deckId}`}
          className="mb-4 inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to Deck
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Study Session</h1>

          {isRestudy && (
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400">
              Restudy
            </span>
          )}
        </div>

        <p className="mt-2 text-zinc-400">{cards.length} cards ready to review</p>

        {cards.length > 0 ? (
          <Flashcard cards={cards} />
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">🎉 All caught up!</h2>

            <p className="mt-3 text-zinc-400">No cards due right now.</p>

            <Link
              href={`/study/${deckId}?restudy=true`}
              className="mt-6 inline-block rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Restudy all cards anyway
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
