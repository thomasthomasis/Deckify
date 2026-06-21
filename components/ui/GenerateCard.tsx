interface Props {
  front: string;
  back: string;
}

export default function GenerateCard({ front, back }: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-lg font-semibold">{front}</h3>

      <div className="my-4 h-px bg-zinc-800" />

      <p className="text-zinc-400">{back}</p>
    </div>
  );
}
