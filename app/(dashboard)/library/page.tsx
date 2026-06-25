import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LibrarySection from '@/components/ui/library/LibrarySection';
import Pagination from '@/components/ui/Pagination';

const PAGE_SIZE = 9;

interface Props {
  searchParams: Promise<{ createdPage?: string; savedPage?: string }>;
}

export default async function LibraryPage({ searchParams }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const params = await searchParams;
  const createdPage = Math.max(1, parseInt(params.createdPage ?? '1'));
  const savedPage = Math.max(1, parseInt(params.savedPage ?? '1'));

  const [createdResult, savedResult] = await Promise.all([
    supabase
      .from('decks')
      .select('id, title, description, is_public, user_id, cards(id)', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range((createdPage - 1) * PAGE_SIZE, createdPage * PAGE_SIZE - 1),

    supabase
      .from('saved_decks')
      .select('deck:decks(id, title, description, is_public, user_id, cards(id), profiles(display_name))', {
        count: 'exact',
      })
      .eq('user_id', user.id)
      .range((savedPage - 1) * PAGE_SIZE, savedPage * PAGE_SIZE - 1),
  ]);

  const createdDecks = createdResult.data ?? [];
  const createdTotalPages = Math.ceil((createdResult.count ?? 0) / PAGE_SIZE);

  const savedDecks = savedResult.data?.flatMap((item) => item.deck ?? []) ?? [];
  const savedTotalPages = Math.ceil((savedResult.count ?? 0) / PAGE_SIZE);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">My Library</h1>

        <p className="mt-2 text-zinc-400">Your personal collection of decks.</p>

        <div className="mt-12 space-y-12">
          <div>
            <LibrarySection title="Created by You" decks={createdDecks} sectionType="owned" />
            <Pagination
              page={createdPage}
              totalPages={createdTotalPages}
              prevHref={createdPage > 1 ? `?createdPage=${createdPage - 1}&savedPage=${savedPage}` : null}
              nextHref={
                createdPage < createdTotalPages
                  ? `?createdPage=${createdPage + 1}&savedPage=${savedPage}`
                  : null
              }
            />
          </div>

          <div>
            <LibrarySection title="Saved Decks" decks={savedDecks} sectionType="saved" />
            <Pagination
              page={savedPage}
              totalPages={savedTotalPages}
              prevHref={savedPage > 1 ? `?createdPage=${createdPage}&savedPage=${savedPage - 1}` : null}
              nextHref={
                savedPage < savedTotalPages
                  ? `?createdPage=${createdPage}&savedPage=${savedPage + 1}`
                  : null
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
