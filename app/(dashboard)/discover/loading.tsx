export default function DiscoverLoading() {
  return (
    <div>
      <div className="mb-4 h-14 w-44 animate-pulse rounded-xl bg-white/10" />

      {/* SearchBar */}
      <div className="h-14 animate-pulse rounded-2xl bg-white/5" />

      {/* 3 deck sections */}
      {[0, 1, 2].map((section) => (
        <section key={section} className="mt-8">
          <div className="mb-6 flex items-end justify-between">
            <div className="h-6 w-48 animate-pulse rounded-xl bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="aspect-square animate-pulse rounded-lg bg-zinc-800" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded-lg bg-white/10" />
                <div className="mt-1 h-3 w-1/2 animate-pulse rounded-lg bg-white/5" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
