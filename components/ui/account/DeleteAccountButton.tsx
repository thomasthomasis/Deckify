'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { deleteAccount } from '@/app/actions/account';

export default function DeleteAccountButton() {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = confirm(
      'Are you sure? This permanently deletes your account, all your decks, and all your progress. This cannot be undone.',
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteAccount();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete account');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-400">
        Permanently deletes your account, decks, and all progress. This cannot be undone.
      </p>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-xl bg-red-500 px-5 py-3 font-semibold transition hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? 'Deleting account...' : 'Delete Account'}
      </button>
    </div>
  );
}
