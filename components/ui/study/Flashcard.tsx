'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { submitReview } from '@/app/actions/reviewActions';
import { Rating } from '@/lib/study/algorithm';
import StudyControls from './StudyControls';
import StudyProgress from './StudyProgress';

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
  const [submitting, setSubmitting] = useState(false);

  const card = cards[currentIndex];

  function handleNext() {
    setShowAnswer(false);
    setCurrentIndex((prev) => prev + 1);
  }

  const handleRating = useCallback(
    async (rating: Rating) => {
      if (submitting || !card) return;

      setSubmitting(true);
      try {
        await submitReview(card.id, rating);
      } catch {
        toast.error('Failed to save review. Please try again.');
      } finally {
        setSubmitting(false);
      }

      handleNext();
    },
    [card, submitting],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!showAnswer) {
        if (event.key === 'Enter') {
          setShowAnswer(true);
        }
        return;
      }

      if (submitting) return;

      if (event.key === '1') handleRating('again');
      if (event.key === '2') handleRating('hard');
      if (event.key === '3') handleRating('good');
      if (event.key === '4') handleRating('easy');
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, submitting, handleRating]);

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
          transition={{ duration: 0.25 }}
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-10 cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-12 text-center"
        >
          <p className="text-sm text-zinc-400">{showAnswer ? 'Answer' : 'Question'}</p>

          <h2 className="mt-8 text-3xl font-bold">{showAnswer ? card.back : card.front}</h2>
        </motion.div>
      </AnimatePresence>

      {showAnswer && <StudyControls onRate={handleRating} />}
    </div>
  );
}
