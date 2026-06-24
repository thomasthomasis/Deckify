import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const MAX_DISPLAY_NAME_LENGTH = 50;

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await request.json();
  const { displayName } = body;

  if (!displayName || typeof displayName !== 'string' || !displayName.trim()) {
    return NextResponse.json({ error: 'Display name is required' }, { status: 400 });
  }

  if (displayName.trim().length > MAX_DISPLAY_NAME_LENGTH) {
    return NextResponse.json(
      { error: `Display name must be ${MAX_DISPLAY_NAME_LENGTH} characters or fewer` },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from('profiles')
    .update({ display_name: displayName.trim() })
    .eq('id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
