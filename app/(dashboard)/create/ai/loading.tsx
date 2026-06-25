export default function AiCreateLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-8 pb-20">
        <div className="mt-12 h-10 w-64 animate-pulse rounded-xl bg-white/10" />
        <div className="mt-10 space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />
          ))}
          <div className="h-40 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
    </main>
  );
}
