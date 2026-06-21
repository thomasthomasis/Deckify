'use client';

import { useState } from 'react';

const demoCards = [
  {
    front: 'What is photosynthesis?',
    back: 'The process plants use to convert light energy into chemical energy.',
  },
  {
    front: 'Where does photosynthesis occur?',
    back: 'Photosynthesis occurs inside chloroplasts.',
  },
  {
    front: 'What pigment absorbs sunlight?',
    back: 'Chlorophyll absorbs light energy.',
  },
];

export default function AIDemo() {
  const [status, setStatus] = useState<'idle' | 'generating' | 'complete'>('idle');

  const generateCards = () => {
    setStatus('generating');

    setTimeout(() => {
      setStatus('complete');
    }, 2500);
  };

  return (
    <section className="mx-auto mt-32 max-w-6xl px-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Watch AI create your deck</h2>

        <p className="mt-4 text-zinc-400">Turn your notes into study material instantly.</p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* NOTES SIDE */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
          <h3 className="font-semibold">Your notes</h3>

          <div className="mt-6 rounded-2xl bg-zinc-950 p-6 leading-relaxed text-zinc-400">
            Photosynthesis is the process plants use to convert sunlight into chemical energy. Chlorophyll absorbs light
            energy inside chloroplasts.
          </div>

          <button
            onClick={generateCards}
            disabled={status === 'generating'}
            className="mt-6 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
          >
            {status === 'idle' && 'Generate Flashcards'}

            {status === 'generating' && '🧠 Creating cards...'}

            {status === 'complete' && '✓ Cards Created'}
          </button>
        </div>

        {/* AI SIDE */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h3 className="font-semibold">AI Generated Cards</h3>

          <div className="mt-6 space-y-4">
            {status === 'idle' && (
              <div className="flex h-64 items-center justify-center text-zinc-500">Your cards will appear here</div>
            )}

            {status === 'generating' && (
              <div className="flex h-64 flex-col items-center justify-center gap-4 text-zinc-400">
                <p>Analyzing notes...</p>

                <p>Finding key concepts...</p>

                <p>Creating flashcards...</p>
              </div>
            )}

            {status === 'complete' &&
              demoCards.map((card) => (
                <div key={card.front} className="rounded-2xl bg-zinc-900 p-5">
                  <p className="font-semibold">{card.front}</p>

                  <p className="mt-3 text-sm text-zinc-400">{card.back}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
