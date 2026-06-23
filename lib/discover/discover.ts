import { createClient } from '@/lib/supabase/server';

export async function searchDecks(query: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('decks')
    .select('*')
    .eq('is_public', true)
    .ilike('title', `%${query}%`)
    .limit(20);

  if (error) {
    console.log(error);
    return [];
  }

  return data ?? [];
}

export async function getTrendingDecks() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('decks')
    .select(
      `
*
`,
    )
    .eq('is_public', true)
    .order('save_count', {
      ascending: false,
    })
    .limit(8);

  return data ?? [];
}

export async function getPopularDecks() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('decks')
    .select('*')
    .eq('is_public', true)
    .order('study_count', {
      ascending: false,
    })
    .limit(8);

  return data ?? [];
}

export async function getRecentDecks() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('decks')
    .select('*')
    .eq('is_public', true)
    .order('created_at', {
      ascending: false,
    })
    .limit(8);

  return data ?? [];
}
