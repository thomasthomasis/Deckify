export default function DeckLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mt-8 h-48 animate-pulse rounded-3xl bg-white/5" />

        <div className="mt-10">
          <div className="h-8 w-24 animate-pulse rounded-xl bg-white/10" />

          <div className="mt-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
