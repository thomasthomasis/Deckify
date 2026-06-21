'use client';

import GenerateCard from '@/components/ui/GenerateCard';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GeneratePage() {
  const supabase = createClient();
  const router = useRouter();

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<{ front: string; back: string }[]>([]);
  const [deckName, setDeckName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cardCount, setCardCount] = useState(10);

  async function generateCards() {
    if (notes.trim().length < 100) {
      toast.error('Please enter more study material. Add at least a paragraph of notes.');
      return;
    }

    setLoading(true);

    const res = await fetch(
      '/api/generate-cards',

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          notes,
          difficulty,
          cardCount,
        }),
      },
    );

    const data = await res.json();

    console.log(data);

    if (!data.flashcards) {
      toast.error('No flashcards were generated.');
      return;
    }

    setCards(data.flashcards ?? []);

    setLoading(false);
  }

  async function saveDeck() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error('You must be logged in!');
      return;
    }

    const { data: deck, error: deckError } = await supabase
      .from('decks')
      .insert({
        title: deckName,
        user_id: user.id,
      })
      .select()
      .single();

    if (deckError) {
      console.error(deckError);
      return;
    }

    const cardsToInsert = cards.map((card) => ({
      deck_id: deck.id,
      front: card.front,
      back: card.back,
    }));

    const { data: createdCards, error: cardError } = await supabase.from('cards').insert(cardsToInsert).select();

    const reviews = createdCards?.map((card) => ({
      user_id: user.id,
      card_id: card.id,
    }));

    if (reviews) {
      await supabase.from('card_reviews').insert(reviews);
    }

    router.push(`/decks/${deck.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold">Create AI Deck</h1>

      <p className="mt-3 text-zinc-400">Paste your own notes and let AI create your flashcards.</p>

      <input
        className="mt-6 w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        placeholder="Deck name..."
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />

      <textarea
        className="mt-8 h-64 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        placeholder="Paste your lecture notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="mt-8">
        <h3 className="font-semibold">Number of cards</h3>

        <div className="mt-3 flex gap-3">
          {[10, 20, 30, 50].map((number) => (
            <button
              key={number}
              onClick={() => setCardCount(number)}
              className={`rounded-xl px-4 py-2 ${cardCount === number ? 'bg-green-500 text-black' : 'bg-zinc-900'}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold">Difficulty</h3>

        <select
          className="mt-3 rounded-xl bg-zinc-900 p-3"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>University</option>
          <option>Advanced</option>
        </select>
      </div>

      <button onClick={generateCards} className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-semibold text-black">
        {loading ? 'Generating...' : 'Generate Cards'}
      </button>

      {cards.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Generated Cards</h2>

          <div className="mt-6 space-y-4">
            {cards.map((card, index) => (
              <GenerateCard key={index} front={card.front} back={card.back} />
            ))}
          </div>

          <button onClick={saveDeck} className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-semibold text-black">
            Save Deck
          </button>
        </section>
      )}
    </div>
  );
}
