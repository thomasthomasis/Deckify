export default function ManualCreateLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-8 pb-20">
        <div className="mt-12 h-10 w-64 animate-pulse rounded-xl bg-white/10" />
        <div className="mt-10 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />
          ))}
          <div className="mt-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
