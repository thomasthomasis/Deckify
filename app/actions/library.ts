'use server';

import { createClient } from '@/lib/supabase/server';

export async function saveDeckToLibrary(deckId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('saved_decks').insert({ deck_id: deckId, user_id: user.id });
  if (error) throw new Error('Failed to save deck');
}

export async function unsaveDeckFromLibrary(deckId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('saved_decks')
    .delete()
    .eq('deck_id', deckId)
    .eq('user_id', user.id);

  if (error) throw new Error('Failed to remove deck');
}
