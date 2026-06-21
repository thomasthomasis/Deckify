'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import StudyControls from './StudyControls';
import StudyProgress from './StudyProgress';

interface Props {
  cards: any[];
}

export default function Flashcard({ cards }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false);

  const card = cards[currentIndex];

  function handleNext() {
    setShowAnswer(false);

    setCurrentIndex((prev) => prev + 1);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!showAnswer) {
        if (event.key === 'Enter') {
          setShowAnswer(true);
        }

        return;
      }

      if (event.key === '1') {
        handleRating('again');
      }

      if (event.key === '2') {
        handleRating('hard');
      }

      if (event.key === '3') {
        handleRating('good');
      }

      if (event.key === '4') {
        handleRating('easy');
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAnswer]);

  function handleRating(rating: string) {
    console.log(rating);

    handleNext();
  }

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
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-10 cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-12 text-center"
        >
          <p className="text-sm text-zinc-400">{showAnswer ? 'Answer' : 'Question'}</p>

          <h2 className="mt-8 text-3xl font-bold">{showAnswer ? card.back : card.front}</h2>
        </motion.div>
      </AnimatePresence>

      {showAnswer && <StudyControls cardReview={card.review} onNext={handleNext} />}
    </div>
  );
}
