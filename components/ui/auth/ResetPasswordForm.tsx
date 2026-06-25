'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ResetPasswordForm() {
  const supabase = createClient();

  const router = useRouter();

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function validatePassword(password: string): string | null {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain a number';
    return null;
  }

  async function handleResetPassword() {

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError)
      return;
    }
    
    if (!password || !confirmPassword) {
      toast.error('Please fill in both fields');

      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');

      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 6 characters');

      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      toast.error(error.message);

      setLoading(false);

      return;
    }

    toast.success('Password updated successfully');

    router.push('/login');

    setLoading(false);
  }

  return (
    <div className="mt-8 space-y-5">
      <div>
        <label className="text-sm text-zinc-400">New password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition outline-none focus:border-emerald-400"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Confirm password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition outline-none focus:border-emerald-400"
        />
      </div>

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  );
}
