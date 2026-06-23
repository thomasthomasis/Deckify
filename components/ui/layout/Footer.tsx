import Link from 'next/link';
import { Mail, BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-xl font-bold text-white">Deckify</h2>

            <p className="mt-3 text-sm text-zinc-400">
              Learn smarter with AI-powered flashcards, spaced repetition, and community-created decks.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Product</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
              <Link href="/discover">Discover</Link>
              <Link href="/create">Create Deck</Link>
              <Link href="/library">Library</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Company</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Legal</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
              <Link href="/legal/privacy">Privacy Policy</Link>

              <Link href="/legal/terms">Terms of Service</Link>

              <Link href="/legal/cookies">Cookie Policy</Link>

              <Link href="/legal/ai-policy">AI Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Deckify. All rights reserved.</p>

          <div className="flex items-center gap-4 text-zinc-400">
            <Link href="mailto:thomas.i.sloane@gmail.com">
              <Mail size={22} />
            </Link>

            <Link href="https://github/thomasthomasis.com">
              <FaGithub size={22} />
            </Link>

            <Link href="/discover">
              <BookOpen size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
