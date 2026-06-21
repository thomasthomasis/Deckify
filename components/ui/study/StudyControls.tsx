'use client';

import { submitReview } from '@/app/actions/reviewActions';
import { Rating } from '@/lib/study/algorithm';

interface Props {
  cardReview: any;

  onNext: () => void;
}

export default function StudyControls({ cardReview, onNext }: Props) {
  async function handleRating(rating: Rating) {
    await submitReview(cardReview, rating);

    onNext();
  }

  return (
    <div className="mt-8 grid grid-cols-4 gap-3">
      <p className="mb-4 text-center text-sm text-zinc-500">Press 1-4 to rate</p>

      <button
        onClick={() => handleRating('again')}
        className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
      >
        Again
      </button>

      <button
        onClick={() => handleRating('hard')}
        className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
      >
        Hard
      </button>

      <button
        onClick={() => handleRating('good')}
        className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
      >
        Good
      </button>

      <button
        onClick={() => handleRating('easy')}
        className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:-translate-y-1 hover:bg-emerald-500/30"
      >
        Easy
      </button>
    </div>
  );
}
