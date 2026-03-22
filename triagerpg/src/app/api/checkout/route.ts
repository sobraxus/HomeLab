import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia', // Latest version as of writing
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bundleId } = await req.json();

    // Define bundles
    const bundles = {
      'small': { name: '100 Energy Points', price: 500, credits: 100 }, // $5.00
      'medium': { name: '500 Energy Points', price: 2000, credits: 500 }, // $20.00
      'large': { name: '1500 Energy Points', price: 5000, credits: 1500 }, // $50.00
    };

    const bundle = bundles[bundleId as keyof typeof bundles];

    if (!bundle) {
      return NextResponse.json({ error: 'Invalid bundle' }, { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: bundle.name,
              description: 'Energy Points for TriageRPG AI features',
            },
            unit_amount: bundle.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?canceled=true`,
      client_reference_id: session.user.id,
      metadata: {
        credits: bundle.credits.toString(),
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
