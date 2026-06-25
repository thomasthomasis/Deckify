'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteDeck } from '@/app/actions/decks';

interface Props {
  deckId: string;
}

export default function DeleteDeckButton({ deckId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this deck?');

    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteDeck(deckId);

      toast.success('Deck deleted');
      router.replace('/dashboard');
    } catch {
      toast.error('Failed to delete deck');
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete Deck'}
    </button>
  );
}
