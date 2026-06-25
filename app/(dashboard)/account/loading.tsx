export default function AccountLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-0 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mt-8 h-10 w-52 animate-pulse rounded-xl bg-white/10" />

        <div className="mt-10 space-y-6">
          {/* Account Information */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="h-6 w-44 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 space-y-1">
              <div className="h-4 w-12 animate-pulse rounded-lg bg-white/5" />
              <div className="h-5 w-56 animate-pulse rounded-lg bg-white/10" />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="h-6 w-24 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 h-11 w-40 animate-pulse rounded-xl bg-white/10" />
          </section>

          {/* Preferences */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="h-6 w-28 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 space-y-4">
              <div className="h-11 w-full animate-pulse rounded-xl bg-white/5" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-white/5" />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="h-6 w-28 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 h-11 w-40 animate-pulse rounded-xl bg-red-500/20" />
          </section>
        </div>
      </div>
    </main>
  );
}
