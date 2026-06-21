interface ProfileStatsProps {
  current_streak?: number;
  longest_streak?: number;
  xp?: number;
  level?: number;
  total_cards_reviewed?: number;
  total_study_time?: number;
}

export default function ProfileStats({
  current_streak = 0,
  longest_streak = 0,
  xp = 0,
  level = 1,
  total_cards_reviewed = 0,
  total_study_time = 0,
}: ProfileStatsProps) {
  const xpPerLevel = 1000;
  const currentXP = xp % xpPerLevel;
  const progress = Math.min((currentXP / xpPerLevel) * 100);

  return (
    <section className="grid gap-6 md:grid-cols-4">
      {/* Level Progress */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-400">Current Level</p>

            <h3 className="mt-1 text-3xl font-bold">Level {level}</h3>
          </div>

          <p className="mt-1 text-xl font-semibold">
            {currentXP} / {xpPerLevel}
          </p>
        </div>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-zinc-400">
          {xpPerLevel - currentXP} XP until Level {level + 1}
        </p>
      </div>

      {/* Streak */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-400">Current Streak</p>

        <h3 className="mt-2 text-3xl font-bold">🔥 {current_streak}</h3>

        <p className="mt-2 text-sm text-zinc-500">Days learning consistently</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-400">Longest Streak</p>

        <h3 className="mt-2 text-3xl font-bold">🔥 {longest_streak}</h3>

        <p className="mt-2 text-sm text-zinc-500">Days learning consistently</p>
      </div>

      {/* Cards Reviewed */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-400">Cards Reviewed</p>

        <h3 className="mt-2 text-3xl font-bold">{total_cards_reviewed}</h3>

        <p className="mt-2 text-sm text-zinc-500">Total cards reviewed</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-400">Study Time</p>

        <h3 className="mt-2 text-3xl font-bold">{total_study_time}</h3>

        <p className="mt-2 text-sm text-zinc-500">Total study time</p>
      </div>
    </section>
  );
}
