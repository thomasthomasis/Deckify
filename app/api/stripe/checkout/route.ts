import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rateLimit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const CREDIT_PACKS: Record<string, { credits: number; priceId: string }> = {
  starter: { credits: 10, priceId: process.env.STRIPE_PRICE_STARTER! },
  popular: { credits: 30, priceId: process.env.STRIPE_PRICE_POPULAR! },
  pro:     { credits: 100, priceId: process.env.STRIPE_PRICE_PRO! },
};

export async function POST(request: Request) {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = request.headers.get('origin');
  if (siteOrigin && origin && origin !== siteOrigin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  if (!await rateLimit(`checkout:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pack } = await request.json();
  const selected = CREDIT_PACKS[pack];

  if (!selected) {
    return NextResponse.json({ error: 'Invalid pack' }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: selected.priceId, quantity: 1 }],
    success_url: `${siteUrl}/create/ai?credits=added`,
    cancel_url: `${siteUrl}/create/ai`,
    metadata: {
      user_id: user.id,
      credits: String(selected.credits),
    },
  });

  return NextResponse.json({ url: session.url });
}
