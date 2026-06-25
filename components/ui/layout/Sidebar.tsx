import Link from 'next/link';
import { Home, Search, Library, User, Settings } from 'lucide-react';

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Discover', href: '/discover', icon: Search },
];

const libraryLinks = [
  { label: 'My Library', href: '/library', icon: Library },
];

const accountLinks = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/account', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-white/10 px-6 py-8 lg:block">
      <nav className="space-y-8">
        <div className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div>
          <p className="mb-3 px-4 text-xs uppercase text-zinc-500">Library</p>
          {libraryLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div>
          <p className="mb-3 px-4 text-xs uppercase text-zinc-500">Account</p>
          {accountLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
