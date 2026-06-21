'use client';

import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewCardPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const deckId = params.id as string;

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  async function handleCreateCard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: newCard, error } = await supabase
      .from('cards')
      .insert({
        deck_id: deckId,
        front,
        back,
      })
      .select()
      .single();

    await supabase.from('card_reviews').insert({
      user_id: user.id,
      card_id: newCard.id,
      next_review: new Date().toISOString(),
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    router.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <h1>Add Card</h1>

      <input placeholder="Question" value={front} onChange={(e) => setFront(e.target.value)} />

      <textarea placeholder="Answer" value={back} onChange={(e) => setBack(e.target.value)} />

      <button onClick={handleCreateCard}>Create Card</button>
    </div>
  );
}
