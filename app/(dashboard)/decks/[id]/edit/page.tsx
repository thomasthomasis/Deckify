import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import EditDeckForm from '@/components/ui/deck/EditDeckForm';
import DeleteDeckButton from '@/components/ui/deck/DeleteDeckButton';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditDeckPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();

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
      cards(
        id,
        front,
        back
      )
      `,
    )
    .eq('id', id)
    .single();

  if (!deck) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">Deck not found</h1>
        </div>
      </main>
    );
  }

  // Security check

  if (deck.user_id !== user.id) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">You cannot edit this deck</h1>

          <Link href={`/decks/${deck.id}`} className="mt-5 inline-flex rounded-xl bg-white/10 px-5 py-3">
            Back to Deck
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href={`/decks/${deck.id}`} className="text-sm text-zinc-400 transition hover:text-white">
          ← Back to Deck
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold">Edit Deck</h1>

          <p className="mt-2 text-zinc-400">Update your deck details, cards, and visibility.</p>
        </div>

        <div className="mt-10">
          <EditDeckForm
            deck={{
              id: deck.id,
              title: deck.title,
              description: deck.description,
              is_public: deck.is_public,
              cards: deck.cards ?? [],
            }}
          />
        </div>

        <section className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
          <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Permanently delete this deck and all of its cards. This action cannot be undone.
          </p>

          <div className="mt-6">
            <DeleteDeckButton deckId={deck.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
