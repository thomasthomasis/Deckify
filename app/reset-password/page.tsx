import ResetPasswordForm from '@/components/ui/auth/ResetPasswordForm';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md">
        <Link
          href={`/account`}
          className="mb-4 inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to Account
        </Link>

        <h1 className="text-3xl font-bold">Create a new password</h1>

        <p className="mt-2 text-zinc-400">Choose a new password for your account.</p>

        <ResetPasswordForm />
      </div>
    </main>
  );
}
