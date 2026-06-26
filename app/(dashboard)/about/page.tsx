export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">About Deckify</h1>

      <p className="mt-2 text-zinc-400">Built for learners who want to study smarter, not harder.</p>

      <div className="prose prose-invert mt-10 max-w-none">
        <h2>What is Deckify?</h2>

        <p>
          Deckify is an AI-powered flashcard platform that helps you turn your notes into structured study decks in
          seconds. Whether you&apos;re preparing for an exam, learning a new language, or building expertise in your
          field, Deckify adapts to the way you learn.
        </p>

        <h2>How it works</h2>

        <p>
          Paste your notes or study material and our AI generates clear, concise flashcards instantly. Then study
          them using our spaced repetition system — an algorithm that schedules each card based on how well you know
          it, so you spend more time on what needs work and less time on what you already know.
        </p>

        <h2>Community decks</h2>

        <p>
          Browse thousands of decks created by other learners across topics like programming, languages, science,
          history, and more. Save decks to your library and study them alongside your own.
        </p>

        <h2>Who built this?</h2>

        <p>
          Deckify was built by Thomas Sloane — a developer passionate about education technology and building tools
          that make learning more effective and enjoyable.
        </p>

        <h2>Get in touch</h2>

        <p>
          Have feedback, a feature request, or just want to say hello? Reach out at{' '}
          <a href="mailto:thomas.i.sloane@gmail.com">thomas.i.sloane@gmail.com</a> — we read every message.
        </p>
      </div>
    </div>
  );
}
