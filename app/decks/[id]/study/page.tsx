"use client";

import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Card = {
  id: string;
  front: string;
  back: string;
};

export default function StudyPage() {
  const supabase = createClient();
  const params = useParams();

  const deckId = params.id as string;

  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

    const card = cards[currentIndex];

  async function loadCards() {

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("card_reviews")
      .select(`
        *,
        cards (*)
        `)
      .lte("next_review", now);

    if (error) {
      console.error(error);
      return;
    }

    const dueCards = data?.filter(
        review => 
            review.cards?.deck_id === deckId
    ) ?? [];

    setCards(
        dueCards.map(review => review.cards)
    );
  }

  useEffect(() => {
    loadCards();
  }, []);

  if (cards.length === 0) {
    return (
      <div>
        <h1>No cards to study</h1>
      </div>
    );
  }

  async function submitReview(
    rating: "again" | "hard" | "good" | "easy"
  ) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: existingReview } = await supabase
        .from("card_reviews")
        .select("*")
        .eq("card_id", card.id)
        .eq("user_id", user.id)
        .maybeSingle();

    let interval = existingReview?.interval ?? 0;
    let repetitions = existingReview?.repetitions ?? 0;

    if (rating === "again") {
        interval = 0;
        repetitions = 0;
    }

    if (rating === "hard") {
        interval = Math.max(1, Math.round(interval * 1.5));
    }

    if (rating === "good") {
        interval = Math.max(1, Math.round(interval * 2.5));
        repetitions += 1;
    }

    if (rating === "easy") {
        interval = Math.max(1, Math.round(interval * 4));
        repetitions += 1;
    }

    const nextReview = new Date();

    nextReview.setDate(
        nextReview.getDate() + interval
    );

    const { error } = await supabase
        .from("card_reviews")
        .upsert(
            {
            user_id: user.id,
            card_id: card.id,
            interval,
            repetitions,
            next_review: nextReview.toISOString(),
            last_reviewed: new Date().toISOString(),
            },
            {
                onConflict: "user_id,card_id",
            }
        );

        if (error) {
        console.error("Review save error:", error);
        alert(error.message);
        }

    nextCard();
  }

  function nextCard() {
    setShowAnswer(false);

    setCurrentIndex((prev) =>
      prev + 1 >= cards.length ? 0 : prev + 1
    );
  }

  if (cards.length === 0) {

    return (
        <div>
            <h1>You're done for today!</h1>

            <p>
                No cards are due right now.
            </p>
        </div>
    )
  }

  return (
    <div>
      <h1>
        Study Mode
      </h1>

      <p>
        {cards.length} cards due today
      </p>

      <div>
        {!showAnswer ? (
          <h2>
            {card.front}
          </h2>
        ) : (
          <h2>
            {card.back}
          </h2>
        )}
      </div>

      {!showAnswer ? (
        <button onClick={() => setShowAnswer(true)}>
          Reveal Answer
        </button>
      ) : (
        <div>
          <button onClick={() => submitReview("again")}>
            Again
          </button>

          <button onClick={() => submitReview("hard")}>
            Hard
          </button>

          <button onClick={() => submitReview("good")}>
            Good
          </button>

          <button onClick={() => submitReview("easy")}>
            Easy
          </button>
        </div>
      )}

    </div>
  );
}