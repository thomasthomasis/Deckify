import Link from 'next/link';

export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <Link href="/create" className="text-sm text-zinc-400 transition hover:text-white">
        ← Back
      </Link>

      <h1 className="mt-6 text-4xl font-bold">{title}</h1>

      <p className="mt-2 text-zinc-400">{description}</p>
    </div>
  );
}
