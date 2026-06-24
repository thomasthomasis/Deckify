import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';

  if (!query.trim()) {
    return NextResponse.json({ decks: [] });
  }

  const { data, error } = await supabase
    .from('decks')
    .select('id, title, description, save_count, study_count, created_at, user_id')
    .eq('is_public', true)
    .ilike('title', `%${query}%`)
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ decks: data ?? [] });
}
