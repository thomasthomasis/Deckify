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
    <div className="relative mt-8">
      <div className="grid grid-cols-4 gap-3">
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

      <p className="absolute right-0 -bottom-8 left-0 text-center text-xs text-zinc-500">Press 1-4 to rate</p>
    </div>
  );
}
