import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const VALID_DAILY_GOALS = [5, 10, 20, 50];

export async function PATCH(request: Request) {
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
