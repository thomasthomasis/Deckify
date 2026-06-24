import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options });
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute = [
    '/dashboard',
    '/decks',
    '/study',
    '/generate',
    '/create',
    '/library',
    '/profile',
    '/account',
    '/discover',
    '/onboarding',
  ].some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/decks/:path*',
    '/study/:path*',
    '/generate/:path*',
    '/create',
    '/create/:path*',
    '/library',
    '/library/:path*',
    '/profile',
    '/profile/:path*',
    '/account',
    '/account/:path*',
    '/discover',
    '/discover/:path*',
    '/onboarding',
    '/onboarding/:path*',
  ],
};
