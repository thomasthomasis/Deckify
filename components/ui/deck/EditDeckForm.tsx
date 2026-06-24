'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateDeck } from '@/app/actions/decks';

interface Card {
  id?: string;
  front: string;
  back: string;
}

interface Props {
  deck: {
    id: string;
    title: string;
    description: string | null;
    is_public: boolean;
    cards: Card[];
  };
}

export default function EditDeckForm({ deck }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(deck.title);
  const [description, setDescription] = useState(deck.description ?? '');
  const [isPublic, setIsPublic] = useState(deck.is_public);
  const [cards, setCards] = useState<Card[]>(deck.cards ?? []);
  const [saving, setSaving] = useState(false);

  function addCard() {
    setCards([
      ...cards,
      {
        front: '',
        back: '',
      },
    ]);

    setTimeout(() => {
      window.scrollBy({
        top: 300,
        behavior: 'smooth',
      });
    }, 100);
  }

  function updateCard(index: number, field: 'front' | 'back', value: string) {
    const updated = [...cards];

    updated[index][field] = value;

    setCards(updated);
  }

  function deleteCard(index: number) {
    const updated = cards.filter((_, i) => i !== index);

    setCards(updated);
  }

  async function saveChanges() {
    setSaving(true);

    try {
      await updateDeck({
        deckId: deck.id,
        title,
        description,
        isPublic,
        cards,
      });

      toast.success('Deck updated successfully');

      router.refresh();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update deck');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="space-y-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          />

          <label className="flex items-center justify-between rounded-xl border border-white/10 p-4">
            <span>Public Deck</span>

            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          </label>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="mt-8 text-2xl font-bold">Cards</h2>
        </div>

        <div className="mt-6 space-y-4">
          {cards.map((card, index) => (
            <div key={card.id ?? index} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex justify-between">
                <p className="text-sm text-zinc-400">Card {index + 1}</p>

                <button onClick={() => deleteCard(index)} className="text-sm text-red-400 hover:text-red-300">
                  Delete
                </button>
              </div>

              <input
                value={card.front}
                onChange={(e) => updateCard(index, 'front', e.target.value)}
                placeholder="Question"
                className="mb-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              />

              <textarea
                value={card.back}
                onChange={(e) => updateCard(index, 'back', e.target.value)}
                placeholder="Answer"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              />
            </div>
          ))}

          <button onClick={addCard} className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
            + Add Card
          </button>
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button
          onClick={saveChanges}
          disabled={saving}
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
