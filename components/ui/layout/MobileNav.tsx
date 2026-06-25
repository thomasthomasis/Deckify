import Link from 'next/link';
import { Home, Search, Plus, Library } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function MobileNav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let credits = 0;
  if (user) {
    try {
      const { data } = await supabase
        .from('user_stats')
        .select('ai_credits')
        .eq('user_id', user.id)
        .single();
      credits = data?.ai_credits ?? 0;
    } catch {
      // ai_credits column may not exist yet
    }
  }

  return (
    <nav className="fixed right-0 bottom-0 left-0 flex border-t border-white/10 bg-zinc-950 px-4 py-3 lg:hidden">
      <Link href="/dashboard" className="flex flex-1 justify-center text-zinc-400">
        <Home />
      </Link>

      <Link href="/discover" className="flex flex-1 justify-center text-zinc-400">
        <Search />
      </Link>

      <Link href="/create" className="relative flex flex-1 justify-center text-emerald-400">
        <Plus />
        {credits === 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            !
          </span>
        )}
      </Link>

      <Link href="/library" className="flex flex-1 justify-center text-zinc-400">
        <Library />
      </Link>
    </nav>
  );
}
