import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

const VALID_DAILY_GOALS = [5, 10, 20, 50];

export async function PATCH(request: Request) {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = request.headers.get('origin');
  if (siteOrigin && origin && origin !== siteOrigin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  if (!await rateLimit(`settings:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await request.json();
  const { dailyGoal, remindersEnabled } = body;

  if (!VALID_DAILY_GOALS.includes(Number(dailyGoal))) {
    return NextResponse.json(
      { error: `Daily goal must be one of: ${VALID_DAILY_GOALS.join(', ')}` },
      { status: 400 },
    );
  }

  if (typeof remindersEnabled !== 'boolean') {
    return NextResponse.json({ error: 'remindersEnabled must be a boolean' }, { status: 400 });
  }

  const { error } = await supabase
    .from('user_settings')
    .update({
      daily_goal: Number(dailyGoal),
      reminders_enabled: remindersEnabled,
      updated_at: new Date(),
    })
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
