import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/login?error=auth_failed', origin));
  }

  const { data: { user } } = await supabase.auth.getUser();
  if(user) {
    const { data: profile } = await supabase.from("profiles").select("onboarding_complete").eq("id", user.id).single();

    if(!profile?.onboarding_complete) {
      return NextResponse.redirect(new URL('/onboarding', origin));
    }
  }

  return NextResponse.redirect(new URL('/dashboard', origin));
}
