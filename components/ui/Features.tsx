"use client";

import { motion } from "framer-motion";

const features = [
  "🤖 AI Generated Flashcards",
  "🧠 Spaced Repetition",
  "🔥 Learning Streaks",
  "📊 Progress Tracking",
];

export default function Features() {
  return (
    <section
      className="
      mx-auto
      mt-32
      max-w-6xl
      px-6
      "
    >

      <h2
        className="
        text-center
        text-4xl
        font-bold
        "
      >
        Study smarter, not harder
      </h2>

      <div
        className="
        mt-12
        grid
        gap-6
        md:grid-cols-2
        "
      >

        {features.map((feature) => (

          <motion.div
            key={feature}
            whileHover={{
              y: -8,
            }}
            className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/50
            p-8
            "
          >
            {feature}
          </motion.div>

        ))}

      </div>

    </section>
  );
}