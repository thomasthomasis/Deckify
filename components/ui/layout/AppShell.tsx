import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/ui/layout/Navbar';
import Sidebar from '@/components/ui/layout/Sidebar';
import MobileNav from '@/components/ui/layout/MobileNav';
import Footer from '@/components/ui/layout/Footer';
import CookieBanner from '@/components/ui/layout/CookieBanner';

interface Props {
  children: React.ReactNode;
}

export default async function AppShell({ children }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let credits = 0;
  if (user) {
    try {
      const { data } = await supabase.from('user_stats').select('ai_credits').eq('user_id', user.id).single();
      credits = data?.ai_credits ?? 0;
    } catch {
      // ai_credits column may not exist yet
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar user={user} credits={credits} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-6 py-8 pb-24 lg:pb-8">{children}</main>
      </div>

      <MobileNav credits={credits} hasUser={!!user} />

      <Footer />

      <CookieBanner />
    </div>
  );
}
