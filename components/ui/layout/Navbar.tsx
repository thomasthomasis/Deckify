import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import NavbarUserMenu from './NavbarUserMenu';

export default async function Navbar() {
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
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-6">
      <Link href="/dashboard" className="text-xl font-bold">
        Deckify
      </Link>

      <div className="flex items-center gap-4">
        {user && (
          <Link
            href="/create/ai"
            className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm transition hover:bg-white/10"
          >
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-zinc-300">Credits</span>
            <span className={`font-bold ${credits === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {credits}
            </span>
          </Link>
        )}

        <NavbarUserMenu />
      </div>
    </header>
  );
}
