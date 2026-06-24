'use client';

import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push('/login');
    router.refresh();
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-6">
      <Link href="/dashboard" className="text-xl font-bold">
        Deckify
      </Link>

      <div className="relative">
        <button type="button" onClick={() => setOpen(!open)} className="text-zinc-400 transition hover:text-white">
          <UserCircle size={28} />
        </button>

        {open && (
          <div className="absolute top-5 right-0 mt-3 w-48 rounded-xl border border-white/10 bg-zinc-900 p-2 shadow-lg">
            <Link
              href="/profile"
              className="block rounded-lg px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Visit Profile
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="block w-full rounded-lg px-4 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
