'use client';

import { useState } from 'react';
import FlashcardEditor from './FlashcardEditor';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { createDeck } from '@/lib/decks/createDeck';
import { toast } from 'sonner';

interface Card {
  front: string;
  back: string;
}

export default function AIDeckForm() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(10);

  const [cards, setCards] = useState<Card[]>([]);

  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  function updateCard(index: number, field: 'front' | 'back', value: string) {
    const updatedCards = [...cards];

    updatedCards[index][field] = value;

    setCards(updatedCards);
  }

  function removeCard(index: number) {
    setCards(cards.filter((_, i) => i !== index));
  }

  async function generateCards() {
    if (!notes.trim()) {
      toast.error('Please add some notes first');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cards');
      }

      const data = await response.json();

      setCards(data.flashcards);

      setGenerated(true);
    } catch (error) {
      console.error(error);

      toast.error('Something went wrong generating cards');
    } finally {
      setLoading(false);
    }
  }

  async function saveDeck() {
    if (!title.trim()) {
      toast.error('Please enter a deck title');
      return;
    }

    if (cards.length === 0) {
      toast.error('No cards generated');
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('You must be logged in');
        return;
      }

      await createDeck({
        userId: user.id,
        title,
        cards,
        creationMethod: 'ai',
      });

      toast.success('Deck created successfully!');

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create deck');
    }
  }

  return (
    <div className="mt-10 space-y-8">
      {!generated && (
        <>
          <div>
            <label className="text-sm text-zinc-400">Deck title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Biology Chapter 5"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Your notes</label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your notes here..."
              rows={10}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Number of cards</label>

            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <option value={5}>5 cards</option>

              <option value={10}>10 cards</option>

              <option value={20}>20 cards</option>

              <option value={30}>30 cards</option>
            </select>
          </div>

          <button
            onClick={generateCards}
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Cards ✨'}
          </button>
        </>
      )}

      {generated && (
        <>
          <div>
            <h2 className="text-2xl font-bold">Review Generated Cards</h2>

            <p className="mt-2 text-zinc-400">Edit anything before saving your deck.</p>
          </div>

          <div className="space-y-6">
            {cards.map((card, index) => (
              <FlashcardEditor
                key={index}
                index={index}
                front={card.front}
                back={card.back}
                canRemove={cards.length > 1}
                onChange={updateCard}
                onRemove={removeCard}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setGenerated(false)}
              className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
            >
              Regenerate
            </button>

            <button
              onClick={saveDeck}
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Save Deck
            </button>
          </div>
        </>
      )}
    </div>
  );
}
