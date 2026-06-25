'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { generateAICards } from '@/app/actions/ai';
import { createDeck } from '@/app/actions/decks';
import FlashcardEditor from './FlashcardEditor';
import PaywallModal from '@/components/ui/credits/PaywallModal';

interface Card {
  front: string;
  back: string;
}

interface Props {
  initialCredits: number;
}

export default function AIDeckForm({ initialCredits }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(10);
  const [isPublic, setIsPublic] = useState(false);

  const [cards, setCards] = useState<Card[]>([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(initialCredits);
  const [showPaywall, setShowPaywall] = useState(false);

  function updateCard(index: number, field: 'front' | 'back', value: string) {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  }

  function removeCard(index: number) {
    setCards(cards.filter((_, i) => i !== index));
  }

  async function generateCards() {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!notes.trim()) {
      toast.error('Please enter notes');
      return;
    }

    if (credits <= 0) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);

    try {
      const generatedCards = await generateAICards({ notes, amount });
      setCards(generatedCards);
      setGenerated(true);
      setCredits((prev) => prev - 1);
      toast.success('Cards generated!');
    } catch (error) {
      const msg = error instanceof Error ? error.message : '';
      if (msg === 'Insufficient credits') {
        setCredits(0);
        setShowPaywall(true);
      } else {
        toast.error(msg || 'Failed to generate cards');
      }
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
      toast.error('No cards to save');
      return;
    }

    setLoading(true);

    try {
      const deck = await createDeck({
        title,
        description,
        cards,
        is_public: isPublic,
        creationMethod: 'ai',
      });

      toast.success('Deck created!');
      router.push(`/decks/${deck.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create deck');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}

      <div className="mt-6 flex justify-end">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
          <span className="text-zinc-400">AI Credits</span>
          <span className={`font-bold ${credits === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {credits}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-8">
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
              <label className="text-sm text-zinc-400">Deck description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: The top 100 most commonly used French words"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
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

            <div>
              <label className="w-full text-sm text-zinc-400">Your notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your notes here..."
                rows={10}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-zinc-400">Number of cards</label>
              <select
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-32 cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-zinc-200 outline-none transition hover:bg-white/10 focus:border-emerald-400"
              >
                <option className="bg-white text-black" value={5}>5 cards</option>
                <option className="bg-white text-black" value={10}>10 cards</option>
                <option className="bg-white text-black" value={20}>20 cards</option>
                <option className="bg-white text-black" value={30}>30 cards</option>
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

            <div className="flex items-center gap-4">
              <button
                onClick={() => setGenerated(false)}
                disabled={loading}
                className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5 disabled:opacity-50"
              >
                Regenerate
              </button>

              <button
                onClick={saveDeck}
                disabled={loading}
                className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Deck'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
