'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 max-w-5xl text-6xl font-bold tracking-tight"
      >
        Stop making flashcards.
        <span className="block bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
          Start learning immediately.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 max-w-2xl text-xl text-zinc-400"
      >
        Turn your notes into intelligent flashcards using AI and master anything with spaced repetition.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex gap-4"
      >
        <Link href="/signup" className="rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-black">
          Create Your First Deck
        </Link>

        <Link href="/login" className="rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-4">
          Login
        </Link>
      </motion.div>
    </section>
  );
}
