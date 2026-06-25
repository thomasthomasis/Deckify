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
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-black">
            {initials}
          </div>

          <div>
            <h1 className="text-4xl font-bold">{name}</h1>

            <p className="mt-2 text-zinc-400">{email}</p>
          </div>
        </div>

        <Link
          href="#edit-profile"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:border-emerald-400 hover:bg-white/10"
        >
          Edit Profile
        </Link>
      </div>
    </section>
  );
}
