import { unstable_cache } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAnonClient } from '@supabase/supabase-js';

const publicSupabase = createAnonClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const DECK_COLUMNS = 'id, title, description, save_count, study_count, created_at, user_id, is_public';

const SEARCH_PAGE_SIZE = 12;

export async function searchDecks(query: string, page = 1) {
  const supabase = await createClient();
  const from = (page - 1) * SEARCH_PAGE_SIZE;
  const to = page * SEARCH_PAGE_SIZE - 1;

  const { data, count, error } = await supabase
    .from('decks')
    .select(DECK_COLUMNS, { count: 'exact' })
    .eq('is_public', true)
    .ilike('title', `%${query}%`)
    .range(from, to);

  if (error) return { decks: [], total: 0 };
  return { decks: data ?? [], total: count ?? 0 };
}

export const getTrendingDecks = unstable_cache(
  async () => {
    const { data } = await publicSupabase
      .from('decks')
      .select(DECK_COLUMNS)
      .eq('is_public', true)
      .order('save_count', { ascending: false })
      .limit(8);
    return data ?? [];
  },
  ['trending-decks'],
  { revalidate: 300 },
);

export const getPopularDecks = unstable_cache(
  async () => {
    const { data } = await publicSupabase
      .from('decks')
      .select(DECK_COLUMNS)
      .eq('is_public', true)
      .order('study_count', { ascending: false })
      .limit(8);
    return data ?? [];
  },
  ['popular-decks'],
  { revalidate: 300 },
);

export const getRecentDecks = unstable_cache(
  async () => {
    const { data } = await publicSupabase
      .from('decks')
      .select(DECK_COLUMNS)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(8);
    return data ?? [];
  },
  ['recent-decks'],
  { revalidate: 300 },
);
