'use client';

import { Rating } from '@/lib/study/algorithm';

interface Props {
  onRate: (rating: Rating) => void;
}

export default function StudyControls({ onRate }: Props) {
  return (
    <div className="relative mt-8">
      <div className="grid grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onRate('again')}
          className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
        >
          Again
        </button>

        <button
          type="button"
          onClick={() => onRate('hard')}
          className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
        >
          Hard
        </button>

        <button
          type="button"
          onClick={() => onRate('good')}
          className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
        >
          Good
        </button>

        <button
          type="button"
          onClick={() => onRate('easy')}
          className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
        >
          Easy
        </button>
      </div>

      <p className="absolute right-0 -bottom-8 left-0 text-center text-xs text-zinc-500">Press 1–4 to rate</p>
    </div>
  );
}
