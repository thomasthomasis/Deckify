export default function ProfileLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-0 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mt-8 h-10 w-28 animate-pulse rounded-xl bg-white/10" />

        <div className="mt-8 space-y-8">
          {/* ProfileHeader */}
          <section className="border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 animate-pulse rounded-full bg-white/10" />
                <div className="space-y-3">
                  <div className="h-9 w-48 animate-pulse rounded-xl bg-white/10" />
                  <div className="h-5 w-56 animate-pulse rounded-xl bg-white/5" />
                </div>
              </div>
              <div className="h-11 w-32 animate-pulse rounded-xl bg-white/10" />
            </div>
          </section>

          {/* ProfileStats */}
          <div className="grid gap-6 md:grid-cols-4">
            {/* Level progress bar — spans full width */}
            <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded-lg bg-white/10" />
                  <div className="h-8 w-20 rounded-xl bg-white/10" />
                </div>
                <div className="h-7 w-24 rounded-xl bg-white/10" />
              </div>
              <div className="mt-6 h-3 w-full rounded-full bg-zinc-800" />
              <div className="mt-3 h-4 w-40 rounded-lg bg-white/5" />
            </div>

            {/* 4 stat cards */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="h-4 w-28 rounded-lg bg-white/10" />
                <div className="mt-2 h-9 w-16 rounded-xl bg-white/10" />
                <div className="mt-2 h-4 w-36 rounded-lg bg-white/5" />
              </div>
            ))}
          </div>

          {/* Edit profile form */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="h-6 w-32 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-6 space-y-4">
              <div className="h-11 w-full animate-pulse rounded-xl bg-white/5" />
              <div className="h-11 w-36 animate-pulse rounded-xl bg-emerald-500/20" />
            </div>
          </section>

          {/* Account settings link */}
          <div className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </div>
    </main>
  );
}
