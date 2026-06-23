'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('deckify-cookie-consent');

    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('deckify-cookie-consent', 'true');

    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed right-6 bottom-6 left-6 z-50 rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl md:left-auto md:w-[420px]">
      <h3 className="font-semibold">We use cookies</h3>

      <p className="mt-2 text-sm text-zinc-400">
        Deckify uses cookies to keep you signed in, improve performance, and enhance your experience.
      </p>

      <div className="mt-4 flex gap-3">
        <button onClick={accept} className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black">
          Accept
        </button>

        <a href="/legal/cookies" className="rounded-xl border border-white/10 px-4 py-2">
          Learn More
        </a>
      </div>
    </div>
  );
}
