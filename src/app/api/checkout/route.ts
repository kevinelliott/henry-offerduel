import { NextResponse } from 'next/server';

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeKey) {
    return NextResponse.json(
      { error: 'Payment processing is being configured. Please try again soon.' },
      { status: 503 }
    );
  }

  try {
    // Dynamic import to avoid build issues when Stripe isn't installed
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'OfferDuel Negotiation Kit',
              description: 'Professional comparison report + 3 negotiation email templates + salary research + 30-day timeline',
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://henry-offerduel.vercel.app'}/compare?purchased=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://henry-offerduel.vercel.app'}/compare`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Payment processing error. Please try again.' },
      { status: 500 }
    );
  }
}
