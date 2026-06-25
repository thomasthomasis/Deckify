'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { saveDeckToLibrary, unsaveDeckFromLibrary } from '@/app/actions/library';

interface Props {
  deckId: string;
  initiallySaved: boolean;
}

export default function SaveDeckButton({ deckId, initiallySaved }: Props) {
  const [saved, setSaved] = useState(initiallySaved);
  const [loading, setLoading] = useState(false);

  async function toggleLibrary() {
    setLoading(true);

    try {
      if (saved) {
        await unsaveDeckFromLibrary(deckId);
        setSaved(false);
        toast.success('Removed from library');
      } else {
        await saveDeckToLibrary(deckId);
        setSaved(true);
        toast.success('Added to library');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleLibrary}
      disabled={loading}
      className={`mt-5 flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
        saved
          ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
          : 'border border-white/10 text-white hover:bg-white/10'
      } disabled:opacity-50`}
    >
      {saved ? <>✓ In Library</> : <>+ Add to Library</>}
    </button>
  );
}
