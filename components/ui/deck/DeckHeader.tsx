interface Props {
  title: string;

  cards: number;

  due: number;
}

export default function DeckHeader({ title, cards, due }: Props) {
  return (
    <div>
      <h1 className="text-4xl font-bold">{title}</h1>

      <div className="mt-4 flex gap-4 text-zinc-400">
        <span>{cards} cards</span>

        <span>🔥 {due} due</span>
      </div>
    </div>
  );
}
