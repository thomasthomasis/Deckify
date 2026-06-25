export default function CreateLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-8 pb-20">
        <div className="mt-12 h-10 w-64 animate-pulse rounded-xl bg-white/10" />
        <div className="mt-2 h-5 w-48 animate-pulse rounded-xl bg-white/5" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
