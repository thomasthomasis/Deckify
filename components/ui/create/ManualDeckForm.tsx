'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDeck } from '@/app/actions/decks';
import FlashcardEditor from './FlashcardEditor';
import { toast } from 'sonner';

interface Card {
  front: string;
  back: string;
}

export default function ManualDeckForm() {

  const router = useRouter();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<Card[]>([
    {
      front: '',
      back: '',
    },
  ]);
  const [isPublic, setIsPublic] = useState(false);

  const [loading, setLoading] = useState(false);

  function updateCard(index: number, field: 'front' | 'back', value: string) {
    const updatedCards = [...cards];

    updatedCards[index][field] = value;

    setCards(updatedCards);
  }

  function addCard() {
    setCards([
      ...cards,
      {
        front: '',
        back: '',
      },
    ]);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  }

  function removeCard(index: number) {
    if (cards.length === 1) {
      return;
    }

    setCards(cards.filter((_, i) => i !== index));
  }

  async function handleCreateDeck() {

    if(!title.trim()) {
      toast.error("Please enter a deck title");
      return;
    }

     const invalidCard = cards.some(
      (card) =>
        !card.front.trim() ||
        !card.back.trim()
    );


    if (invalidCard) {
      toast.error(
        "Every card needs a front and back"
      );
      return;
    }

    setLoading(true);

    try {
      
      const deck = await createDeck({
        title, description, cards, is_public:isPublic, creationMethod:"manual",
      });

      toast.success("Deck created!");
      router.refresh();
      router.push(`/decks/${deck.id}`);
    }
    catch(error) {
      toast.error(
        error instanceof Error
        ? error.message
        : "Failed to create deck"
      );
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 space-y-8">
      <div>
        <label className="text-sm text-zinc-400">Deck title</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: French Vocabulary"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition outline-none focus:border-emerald-400"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Deck description</label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows={3}
          placeholder="Describe your deck..."
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition outline-none focus:border-emerald-400"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Deck Visibility</label>

        <label className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-5 w-5 rounded border-white/20 bg-white/5 text-emerald-400 focus:ring-emerald-400"
          />

          <span className="text-sm text-zinc-200">Make this deck public</span>
        </label>
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => (
          <FlashcardEditor
            key={index}
            index={index}
            front={card.front}
            back={card.back}
            onChange={updateCard}
            onRemove={removeCard}
            canRemove={cards.length > 1}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={addCard}
          className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/5"
        >
          + Add Card
        </button>

        <button
          type="button"
          onClick={handleCreateDeck}
          disabled={loading}
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Deck'}
        </button>
      </div>
    </div>
  );
}
