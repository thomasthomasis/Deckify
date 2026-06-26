import Link from 'next/link';

interface ProfileHeader {
  displayName?: string | null;
  email?: string | null;
}

export default function ProfileHeader({ displayName, email }: ProfileHeader) {
  const name = displayName ?? 'New User';
  const initials = name.charAt(0).toUpperCase();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-black md:h-24 md:w-24 md:text-4xl">
            {initials}
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold md:text-4xl">{name}</h1>

            <p className="mt-1 truncate text-sm text-zinc-400 md:mt-2 md:text-base">{email}</p>
          </div>
        </div>

        <Link
          href="#edit-profile"
          className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:border-emerald-400 hover:bg-white/10 md:inline-flex md:w-auto"
        >
          Edit Profile
        </Link>
      </div>
    </section>
  );
}
