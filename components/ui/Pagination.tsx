import Link from 'next/link';

interface Props {
  page: number;
  totalPages: number;
  prevHref: string | null;
  nextHref: string | null;
}

export default function Pagination({ page, totalPages, prevHref, nextHref }: Props) {
  if (totalPages <= 1) return null;

  const base = 'rounded-xl border px-5 py-2.5 text-sm font-medium transition';
  const active = `${base} border-white/10 hover:bg-white/5`;
  const disabled = `${base} border-white/5 text-zinc-600 cursor-default`;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {prevHref ? (
        <Link href={prevHref} className={active}>
          ← Previous
        </Link>
      ) : (
        <span className={disabled}>← Previous</span>
      )}

      <span className="text-sm text-zinc-400">
        Page {page} of {totalPages}
      </span>

      {nextHref ? (
        <Link href={nextHref} className={active}>
          Next →
        </Link>
      ) : (
        <span className={disabled}>Next →</span>
      )}
    </div>
  );
}
