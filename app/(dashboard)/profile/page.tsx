import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/ui/profile/ProfileForm';
import ProfileStats from '@/components/ui/profile/ProfileStats';
import ProfileHeader from '@/components/ui/profile/ProfileHeader';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(
      `
      display_name,
      created_at
    `,
    )
    .eq('id', user.id)
    .single();

  const { data: stats } = await supabase
    .from('user_stats')
    .select(
      `
      current_streak,
      longest_streak,
      xp,
      level,
      total_cards_reviewed,
      total_study_time
    `,
    )
    .eq('user_id', user.id)
    .single();

  console.log(stats);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-0 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mt-8 text-4xl font-bold">Profile</h1>

        <div className="mt-8 space-y-8">
          <ProfileHeader displayName={profile?.display_name} email={user?.email} />

          <ProfileStats
            current_streak={stats?.current_streak}
            longest_streak={stats?.longest_streak}
            xp={stats?.xp}
            level={stats?.level}
            total_cards_reviewed={stats?.total_cards_reviewed}
            total_study_time={stats?.total_study_time}
          />

          <section id="edit-profile" className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <ProfileForm displayName={profile?.display_name ?? ''} />
          </section>

          <Link
            href="/account"
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400"
          >
            <h2 className="text-xl font-bold">⚙ Account Settings</h2>

            <p className="mt-2 text-zinc-400">Manage security, data and account actions.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
