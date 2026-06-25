'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_COOKIE = 'deckify-cookie-consent';
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getConsent(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setConsent(value: 'accepted' | 'declined') {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setConsent('accepted');
    setVisible(false);
  }

  function decline() {
    setConsent('declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed right-6 bottom-6 left-6 z-50 rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl md:left-auto md:w-[420px]">
      <h3 className="font-semibold">We use cookies</h3>

      <p className="mt-2 text-sm text-zinc-400">
        Deckify uses essential cookies to keep you signed in. You can decline optional analytics cookies — essential
        cookies will remain active.
      </p>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={accept}
          className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400"
        >
          Accept
        </button>

        <button
          type="button"
          onClick={decline}
          className="rounded-xl border border-white/10 px-4 py-2 transition hover:bg-white/5"
        >
          Decline
        </button>

        <Link href="/legal/cookies" className="rounded-xl border border-white/10 px-4 py-2 transition hover:bg-white/5">
          Learn More
        </Link>
      </div>
    </div>
  );
}
