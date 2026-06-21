'use client';

import { toast } from 'sonner';

export default function DeleteAccountButton() {
  async function deleteAccount() {
    const confirmed = confirm('Are you sure? This cannot be undone.');

    if (!confirmed) {
      return;
    }

    toast.error('Delete account coming soon');
  }

  return (
    <button onClick={deleteAccount} className="rounded-xl bg-red-500 px-5 py-3 font-semibold">
      Delete Account
    </button>
  );
}
