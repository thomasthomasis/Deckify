'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const PACKS = [
  {
    id: 'starter',
    credits: 10,
    price: '$4.99',
    label: 'Starter',
    description: 'Perfect for trying it out',
  },
  {
    id: 'popular',
    credits: 30,
    price: '$9.99',
    label: 'Popular',
    description: 'Best value for regular use',
    highlighted: true,
  },
  {
    id: 'pro',
    credits: 100,
    price: '$19.99',
    label: 'Pro',
    description: 'For power users',
  },
];

interface Props {
  onClose: () => void;
}

export default function PaywallModal({ onClose }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handlePurchase(packId: string) {
    setLoading(packId);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pack: packId }),
      });

      const { url, error } = await res.json();

      if (error || !url) throw new Error(error ?? 'Failed to create checkout');

      window.location.href = url;
    } catch {
      setLoading(null);
      toast.error('Failed to start checkout. Please try again.');
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="paywall-title" className="text-2xl font-bold">Out of AI Credits</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Purchase a credit pack to keep generating decks with AI.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 rounded-lg p-1 text-zinc-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {PACKS.map((pack) => (
            <button
              key={pack.id}
              onClick={() => handlePurchase(pack.id)}
              disabled={loading !== null}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition disabled:opacity-60 ${
                pack.highlighted
                  ? 'border-emerald-400/60 bg-emerald-500/10 hover:bg-emerald-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{pack.label}</span>
                  {pack.highlighted && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-zinc-400">{pack.description}</p>
              </div>

              <div className="ml-4 text-right">
                <p className="font-bold">{pack.price}</p>
                <p className="text-sm text-zinc-400">{pack.credits} credits</p>
              </div>

              {loading === pack.id && (
                <span className="ml-3 text-sm text-zinc-400">Redirecting…</span>
              )}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Payments are processed securely by Stripe. Credits never expire.
        </p>
      </div>
    </div>
  );
}
