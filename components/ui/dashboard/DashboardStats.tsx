interface DashboardStatsProps {
  stats: {
    current_streak?: number | null;
    level?: number | null;
    xp?: number | null;
    total_cards_reviewed?: number | null;
  } | null;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1">
        <p className="text-sm text-zinc-400">Current Streak</p>

        <h2 className="mt-3 text-3xl font-bold">🔥 {stats?.current_streak ?? 0}</h2>

        <p className="mt-2 text-sm text-zinc-500">days</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1">
        <p className="text-sm text-zinc-400">Level</p>

        <h2 className="mt-3 text-3xl font-bold">⭐ {stats?.level ?? 1}</h2>

        <p className="mt-2 text-sm text-zinc-500">learner</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1">
        <p className="text-sm text-zinc-400">Experience</p>

        <h2 className="mt-3 text-3xl font-bold">⚡ {stats?.xp ?? 0}</h2>

        <p className="mt-2 text-sm text-zinc-500">XP earned</p>
      </div>
    </section>
  );
}
