import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
        <h1 className="text-6xl font-bold text-zinc-600">404</h1>

        <h2 className="mt-4 text-2xl font-bold">Page not found</h2>

        <p className="mt-3 text-zinc-400">The page you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.</p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
