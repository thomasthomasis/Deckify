import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

const MAX_DISPLAY_NAME_LENGTH = 50;

export async function PATCH(request: Request) {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = request.headers.get('origin');
  if (siteOrigin && origin && origin !== siteOrigin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  if (!await rateLimit(`profile:${ip}`, 10, 60_000)) {
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
