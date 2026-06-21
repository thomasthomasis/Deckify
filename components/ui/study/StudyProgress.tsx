interface Props {
  current: number;

  total: number;
}

export default function StudyProgress({ current, total }: Props) {
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>
          Card {current} of {total}
        </span>

        <span>{percentage}%</span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
