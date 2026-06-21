import { createClient } from '@/lib/supabase/server';
import Flashcard from '@/components/ui/study/Flashcard';

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
    return null;
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
    .eq('deck_id', deckId)
    .eq('card_reviews.user_id', user.id)
    .lte('card_reviews.next_review', new Date().toISOString());

  const cards = data
    ?.filter((card) => {
      const review = card.card_reviews[0];

      return !review.next_review || new Date(review.next_review) <= new Date();
    })
    .map((card) => ({
      id: card.id,

      front: card.front,

      back: card.back,

      review: card.card_reviews[0],
    }));

  console.log('RAW CARDS:', cards);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Study Session</h1>

        <p className="mt-2 text-zinc-400">{cards?.length ?? 0} cards remaining</p>

        {cards && cards.length > 0 ? (
          <Flashcard cards={cards} />
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">🎉 All caught up!</h2>

            <p className="mt-2 text-zinc-400">No cards are due right now.</p>
          </div>
        )}
      </div>
    </main>
  );
}
