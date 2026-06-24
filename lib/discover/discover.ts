import { createClient } from '@/lib/supabase/server';

const DECK_COLUMNS = 'id, title, description, save_count, study_count, created_at, user_id, is_public';

export async function searchDecks(query: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('decks')
    .select(DECK_COLUMNS)
    .eq('is_public', true)
    .ilike('title', `%${query}%`)
    .limit(20);

  if (error) {
    return [];
  }

  return data ?? [];
}

export async function getTrendingDecks() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('decks')
    .select(DECK_COLUMNS)
    .eq('is_public', true)
    .order('save_count', { ascending: false })
    .limit(8);

  return data ?? [];
}

export async function getPopularDecks() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('decks')
    .select(DECK_COLUMNS)
    .eq('is_public', true)
    .order('study_count', { ascending: false })
    .limit(8);

  return data ?? [];
}

export async function getRecentDecks() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('decks')
    .select(DECK_COLUMNS)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(8);

  return data ?? [];
}
