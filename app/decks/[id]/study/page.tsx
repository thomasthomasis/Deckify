"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StudyCard from "@/components/ui/StudyCard";
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

    const progress = ((currentIndex + 1) / cards.length) * 100;

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
        <main className="mx-auto max-w-3xl p-8">
            <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
                <h1 className="text-5xl">
                    Congratulations!
                </h1>

                <h2 className="mt-6 text-3xl font-bold">
                    You're done for today
                </h2>

                <p className="mt-3 text-zinc-400">

                </p>
            </div>
        </main>
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

    <main className="mx-auto max-w-4xl p-8">
        <div className="mb-8">

            <h1 className="text-3xl font-bold">
                Study Mode
            </h1>

            <p className="mt-2 text-zinc-400">
                {currentIndex + 1} / {cards.length} cards
            </p>
        </div>

        <Progress
            value={progress}
            className="mb-8"
        />


        <StudyCard
            content={
                showAnswer
                    ? card.back
                    : card.front
            }
        />

        {!showAnswer ? (
            <div className="mt-8 flex justify-center">

                <Button
                    size="lg"
                    onClick={() => setShowAnswer(true)}
                >
                    Reveal Answer
                </Button>
            </div>
        ) : (

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

                <Button
                    variant="destructive"
                    onClick={() => submitReview("again")}
                >
                    Again
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => submitReview("hard")}
                >
                    Hard
                </Button>

                <Button
                    onClick={() => submitReview("good")}
                >
                    Good
                </Button>

                <Button
                    className="bg-green-500 hover:bg-green-400"
                    onClick={() => submitReview("easy")}
                >
                    Easy
                </Button>
            </div>
        )}
    </main>
  );
}