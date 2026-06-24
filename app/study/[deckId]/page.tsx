import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Flashcard from '@/components/ui/study/Flashcard';
import Link from 'next/link';

interface Props {
  params: Promise<{
    deckId: string;
  }>;
}

export default async function StudyPage({ params }: Props) {
  const supabase = await createClient();

  const { deckId } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: deck } = await supabase.from('decks').select('id, user_id, is_public').eq('id', deckId).single();

  if (!deck) {
    notFound();
  }

  const isOwner = user.id === deck.user_id;

  if (!deck.is_public && !isOwner) {
    notFound();
  }

  const { data } = await supabase
    .from('cards')
    .select(
      `
        id,
        front,
        back,
        card_reviews(*)
    `,
    )
    .eq('deck_id', deckId);

  const cards =
    data
      ?.filter((card) => {
        const review = card.card_reviews?.[0];

        if (!review) {
          return true;
        }

        return new Date(review.next_review) <= new Date();
      })
      .map((card) => ({
        id: card.id,
        front: card.front,
        back: card.back,
      })) ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/decks/${deckId}`}
          className="mb-4 inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to Deck
        </Link>

        <h1 className="text-3xl font-bold">Study Session</h1>

        <p className="mt-2 text-zinc-400">{cards.length} cards ready to review</p>

        {cards.length > 0 ? (
          <Flashcard cards={cards} />
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">🎉 All caught up!</h2>

            <p className="mt-3 text-zinc-400">You have no cards due right now. Come back later for your next review.</p>
          </div>
        )}
      </div>
    </main>
  );
}
