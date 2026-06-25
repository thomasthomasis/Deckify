export default function LibraryLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-white/10" />
        <div className="mt-2 h-5 w-72 animate-pulse rounded-xl bg-white/5" />

        <div className="mt-12 space-y-12">
          {[0, 1].map((section) => (
            <section key={section}>
              <div className="flex items-center justify-between">
                <div className="h-8 w-40 animate-pulse rounded-xl bg-white/10" />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/10" />
                        <div className="h-4 w-full animate-pulse rounded-lg bg-white/5" />
                        <div className="h-4 w-2/3 animate-pulse rounded-lg bg-white/5" />
                      </div>
                    </div>

                    <div className="mb-3 mt-6 flex gap-4">
                      <div className="h-4 w-20 animate-pulse rounded-lg bg-white/5" />
                    </div>

                    <div className="mt-auto flex gap-3 pt-6">
                      <div className="h-9 flex-1 animate-pulse rounded-xl bg-white/10" />
                      <div className="h-9 flex-1 animate-pulse rounded-xl bg-emerald-500/20" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <div className="h-11 w-44 animate-pulse rounded-xl bg-white/10" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
