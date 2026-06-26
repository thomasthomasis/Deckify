import { Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">Contact</h1>

      <p className="mt-2 text-zinc-400">We&apos;d love to hear from you.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="mailto:thomas.i.sloane@gmail.com"
          className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/50 hover:bg-white/10"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Mail size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Email</h2>
            <p className="mt-1 text-sm text-zinc-400">thomas.i.sloane@gmail.com</p>
            <p className="mt-2 text-sm text-zinc-500">For support, feedback, or general enquiries.</p>
          </div>
        </Link>

        <Link
          href="https://github.com/thomasisloane"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/50 hover:bg-white/10"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <FaGithub size={20} />
          </div>

          <div>
            <h2 className="font-semibold">GitHub</h2>
            <p className="mt-1 text-sm text-zinc-400">github.com/thomasisloane</p>
            <p className="mt-2 text-sm text-zinc-500">Follow along or raise an issue.</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-semibold">Response time</h2>
        <p className="mt-2 text-sm text-zinc-400">
          We aim to respond to all messages within 24–48 hours. For urgent issues, email is the fastest way to reach
          us.
        </p>
      </div>
    </div>
  );
}
