'use client';

import { motion } from 'framer-motion';

interface StudyCardProps {
  content: string;
  showAnswer: boolean;
}

export default function StudyCard({ content, showAnswer }: StudyCardProps) {
  return (
    <motion.div
      key={showAnswer ? 'answer' : 'question'}
      initial={{
        rotateY: 90,
        opacity: 0,
      }}
      animate={{
        rotateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
      }}
      className="flex min-h-[400px] items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 p-12 shadow-xl"
    >
      <h2 className="text-center text-3xl leading-relaxed font-bold">{content}</h2>
    </motion.div>
  );
}
