export default function StudyLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="h-5 w-24 animate-pulse rounded-xl bg-white/10" />

        <div className="mt-4 h-9 w-48 animate-pulse rounded-xl bg-white/10" />

        <div className="mt-10 h-64 animate-pulse rounded-3xl bg-white/5" />

        <div className="mt-8 grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
