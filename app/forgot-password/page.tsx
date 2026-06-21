import ForgotPasswordForm from '@/components/ui/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Reset your password</h1>

        <p className="mt-2 text-zinc-400">Enter your email and we will send you a reset link.</p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}
