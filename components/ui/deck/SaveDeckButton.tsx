'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

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
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('You must be logged in');
        return;
      }

      if (saved) {
        const { error } = await supabase
          .from('saved_decks')
          .delete()
          .eq('deck_id', deckId)
          .eq('user_id', user.id);

        if (error) throw error;

        setSaved(false);
        toast.success('Removed from library');
      } else {
        const { error } = await supabase.from('saved_decks').insert({
          deck_id: deckId,
          user_id: user.id,
        });

        if (error) throw error;

        setSaved(true);
        toast.success('Added to library');
      }
    } catch (error) {
      console.error(error);
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
