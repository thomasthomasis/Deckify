import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: 'Unauthorised',
      },
      {
        status: 401,
      },
    );
  }

  const { dailyGoal, remindersEnabled } = await request.json();

  const { error } = await supabase
    .from('user_settings')
    .update({
      daily_goal: dailyGoal,
      reminders_enabled: remindersEnabled,
      updated_at: new Date(),
    })
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
