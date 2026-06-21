'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  dailyGoal: number;
  remindersEnabled: boolean;
}

export default function PreferencesForm({ dailyGoal, remindersEnabled }: Props) {
  const [goal, setGoal] = useState(dailyGoal);

  const [reminders, setReminders] = useState(remindersEnabled);

  const [saving, setSaving] = useState(false);

  async function saveSettings() {
    try {
      setSaving(true);

      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dailyGoal: goal,
          remindersEnabled: reminders,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success('Settings updated');
    } catch {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm text-zinc-400">Daily Study Goal</label>

        <select
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
        >
          <option value={5}>5 cards</option>

          <option value={10}>10 cards</option>

          <option value={20}>20 cards</option>

          <option value={50}>50 cards</option>
        </select>
      </div>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} />
        Study reminders
      </label>

      <button
        onClick={saveSettings}
        disabled={saving}
        className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black"
      >
        {saving ? 'Saving...' : 'Save Preferences'}
      </button>
    </div>
  );
}
