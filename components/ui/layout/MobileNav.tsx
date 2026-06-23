import Link from 'next/link';
import { Home, Search, Plus, Library } from 'lucide-react';

export default function MobileNav() {
  return (
    <nav className="fixed right-0 bottom-0 left-0 flex border-t border-white/10 bg-zinc-950 px-4 py-3 lg:hidden">
      <Link href="/dashboard" className="flex flex-1 justify-center text-zinc-400">
        <Home />
      </Link>

      <Link href="/discover" className="flex flex-1 justify-center text-zinc-400">
        <Search />
      </Link>

      <Link href="/create" className="flex flex-1 justify-center text-emerald-400">
        <Plus />
      </Link>

      <Link href="/library" className="flex flex-1 justify-center text-zinc-400">
        <Library />
      </Link>
    </nav>
  );
}
