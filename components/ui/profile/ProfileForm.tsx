'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfileForm({ displayName }: { displayName: string }) {
  const router = useRouter();

  const [name, setName] = useState(displayName);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);

    const response = await fetch('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        displayName: name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? 'Failed to update profile');
    }

    toast.success('Profile updated');
    router.refresh();

    setSaving(false);
  }

  return (
    <div className="mt-6">
      <label className="text-sm text-zinc-400">Display Name</label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-400"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-5 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
