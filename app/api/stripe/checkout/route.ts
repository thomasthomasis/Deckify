import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const CREDIT_PACKS: Record<string, { credits: number; priceId: string }> = {
  starter: { credits: 10, priceId: process.env.STRIPE_PRICE_STARTER! },
  popular: { credits: 30, priceId: process.env.STRIPE_PRICE_POPULAR! },
  pro:     { credits: 100, priceId: process.env.STRIPE_PRICE_PRO! },
};

export async function POST(request: Request) {
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

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: selected.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/create/ai?credits=added`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/create/ai`,
    metadata: {
      user_id: user.id,
      credits: String(selected.credits),
    },
  });

  return NextResponse.json({ url: session.url });
}
