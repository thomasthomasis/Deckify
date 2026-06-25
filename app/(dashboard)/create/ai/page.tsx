import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AIDeckForm from '@/components/ui/create/AIDeckForm';

export default async function AIPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: stats } = await supabase
    .from('user_stats')
    .select('ai_credits')
    .eq('user_id', user.id)
    .single();

  const credits = stats?.ai_credits ?? 0;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <Link href="/create" className="text-sm text-zinc-400 transition hover:text-white">
            ← Back to Create Deck
          </Link>

          <div className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
            <span className="text-zinc-400">AI Credits</span>
            <span className={`font-bold ${credits === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {credits}
            </span>
          </div>
        </div>

        <h1 className="mt-8 text-4xl font-bold">Generate with AI ✨</h1>

        <p className="mt-2 text-zinc-400">Turn your notes into personalised flashcards.</p>

        <AIDeckForm initialCredits={credits} />
      </div>
    </main>
  );
}
