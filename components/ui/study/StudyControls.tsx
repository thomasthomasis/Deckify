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
      <button
        onClick={() => handleRating('again')}
        className="rounded-xl bg-red-500/20 px-4 py-3 text-red-400 transition hover:bg-red-500/30"
      >
        Again
      </button>

      <button
        onClick={() => handleRating('hard')}
        className="rounded-xl bg-orange-500/20 px-4 py-3 text-orange-400 transition hover:bg-orange-500/30"
      >
        Hard
      </button>

      <button
        onClick={() => handleRating('good')}
        className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400 transition hover:bg-emerald-500/30"
      >
        Good
      </button>

      <button
        onClick={() => handleRating('easy')}
        className="rounded-xl bg-blue-500/20 px-4 py-3 text-blue-400 transition hover:bg-blue-500/30"
      >
        Easy
      </button>
    </div>
  );
}
