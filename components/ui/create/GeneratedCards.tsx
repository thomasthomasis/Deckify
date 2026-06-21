'use client';

import FlashcardEditor from './FlashcardEditor';

interface Card {
  front: string;
  back: string;
}

interface Props {
  cards: Card[];
  setCards: (cards: Card[]) => void;
}

export default function GeneratedCards({ cards, setCards }: Props) {
  function updateCard(index: number, field: 'front' | 'back', value: string) {
    const updated = [...cards];

    updated[index][field] = value;

    setCards(updated);
  }

  function removeCard(index: number) {
    setCards(cards.filter((_, i) => i !== index));
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-2xl font-bold">Review Generated Cards</h2>

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
  );
}
