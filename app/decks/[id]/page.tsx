import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: deck, error } = await supabase
    .from("decks")
    .select(`
        *,
        cards (*)
    `)
    .eq("id", id)
    .single();

  if (error || !deck) {
    notFound();
  }

  return (
  <div>
    <h1>
      {deck.title}
    </h1>

    <p>
      {deck.description}
    </p>

    <p>
      Cards: {deck.cards?.length ?? 0}
    </p>

    <Link href={`/decks/${id}/study`}>
        Start Studying
    </Link>

    <Link href={`/decks/${id}/cards/new`}>
      Add Card
    </Link>

    <h2>
      Your Cards
    </h2>

    {deck.cards?.length === 0 && (
      <p>
        No cards yet.
      </p>
    )}

    {deck.cards?.map((card:any) => (
      <div key={card.id}>
        <h3>
          {card.front}
        </h3>

        <p>
          {card.back}
        </p>
      </div>
    ))}

  </div>
);
}