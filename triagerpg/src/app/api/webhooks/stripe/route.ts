import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = session.metadata?.userId;
    const creditsToAdd = parseInt(session.metadata?.credits || '0', 10);

    if (userId && creditsToAdd > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: creditsToAdd,
          },
        },
      });
      
      await prisma.activityLog.create({
        data: {
          userId,
          action: `purchased_${creditsToAdd}_credits`,
          xpGained: 0,
        }
      });
    }
  }

  return NextResponse.json({ received: true });
}
