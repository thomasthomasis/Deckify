import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: decks, error } = await supabase
    .from("decks")
    .select("*")
    .order("created_at", { ascending: false });
 
  if (error) {
    console.error(error);
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
        <h1>
            Deckify Dashboard
        </h1>

        <p>
            Welcome {user?.email}
        </p>
        
        <Link href="/decks/new">
            Create Deck
        </Link>

        {decks?.length === 0 && (
            <p>
                No decks yet.
            </p>
        )}

        {decks?.map((deck) => (
            <Link
                key={deck.id}
                href={`/decks/${deck.id}`}
            >
                <div >
                    <h3>
                        {deck.title}
                    </h3>

                    <p>
                        {deck.description}
                    </p>
                </div>
            </Link>
            
        ))}
    </div>
  );
}