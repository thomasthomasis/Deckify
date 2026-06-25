'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { submitReview } from '@/app/actions/reviewActions';
import { Rating } from '@/lib/study/algorithm';
import StudyControls from './StudyControls';
import StudyProgress from './StudyProgress';

const MAX_SECONDS_PER_CARD = 300;

interface Card {
  id: string;
  front: string;
  back: string;
}

interface Props {
  cards: Card[];
}

export default function Flashcard({ cards }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const cardShownAt = useRef<number>(Date.now());
  const ratingInFlight = useRef(false);

  const card = cards[currentIndex];

  function handleNext() {
    cardShownAt.current = Date.now();
    ratingInFlight.current = false;
    setShowAnswer(false);
    setCurrentIndex((prev) => prev + 1);
  }

  const handleRating = useCallback(
    async (rating: Rating) => {
      if (ratingInFlight.current || !card) return;
      ratingInFlight.current = true;

      const elapsed = Math.round((Date.now() - cardShownAt.current) / 1000);
      const studyTimeSeconds = Math.min(elapsed, MAX_SECONDS_PER_CARD);

      try {
        await submitReview(card.id, rating, studyTimeSeconds);
        handleNext();
      } catch {
        toast.error('Failed to save review — please try again.');
        ratingInFlight.current = false;
      }
    },
    [card],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!showAnswer) {
        if (event.key === 'Enter') setShowAnswer(true);
        return;
      }

      if (event.key === '1') handleRating('again');
      if (event.key === '2') handleRating('hard');
      if (event.key === '3') handleRating('good');
      if (event.key === '4') handleRating('easy');
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, handleRating]);

  if (!card) {
    return (
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
        <h2 className="text-2xl font-bold">Complete 🎉</h2>
      </div>
    );
  }

  return (
    <div>
      <StudyProgress current={currentIndex + 1} total={cards.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{ perspective: '1200px' }}
            className="mt-10 cursor-pointer"
            onClick={() => setShowAnswer((v) => !v)}
          >
            <motion.div
              animate={{ rotateY: showAnswer ? 180 : 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: '220px' }}
              className="rounded-3xl"
            >
              {/* Front */}
              <div
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-12 text-center"
              >
                <p className="text-sm text-zinc-400">Question</p>
                <h2 className="mt-6 text-3xl font-bold">{card.front}</h2>
                <p className="mt-6 text-xs text-zinc-500">Click to reveal answer</p>
              </div>

              {/* Back */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-12 text-center"
              >
                <p className="text-sm text-emerald-400">Answer</p>
                <h2 className="mt-6 text-3xl font-bold">{card.back}</h2>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {showAnswer && <StudyControls onRate={handleRating} />}
    </div>
  );
}
