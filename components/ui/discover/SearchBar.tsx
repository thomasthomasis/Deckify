'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') ?? '';

  const [query, setQuery] = useState(currentSearch);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) {
      router.push('/discover');

      return;
    }

    router.push(`/discover?search=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search decks..."
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-emerald-500"
      />
    </form>
  );
}
