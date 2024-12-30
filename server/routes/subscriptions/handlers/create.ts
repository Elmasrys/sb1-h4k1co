import { FastifyReply, FastifyRequest } from 'fastify';
import Stripe from 'stripe';
import { supabase } from '../../../lib/supabase';
import { SubscriptionSchema } from '../../../../src/types/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function createSubscriptionHandler(
  request: FastifyRequest<{
    Body: z.infer<typeof SubscriptionSchema>
  }>,
  reply: FastifyReply
) {
  try {
    const { tier, payment_method } = request.body;
    const userId = request.user.id;

    // Get company for the user
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select()
      .eq('owner_id', userId)
      .single();

    if (companyError) throw companyError;

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: request.user.email,
      payment_method: payment_method.id,
      invoice_settings: {
        default_payment_method: payment_method.id
      }
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: getPriceIdForTier(tier) }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });

    // Save subscription in database
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        company_id: company.id,
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        tier,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
        cancel_at_period_end: subscription.cancel_at_period_end,
        features: getFeaturesForTier(tier)
      })
      .select()
      .single();

    if (error) throw error;

    return reply.code(201).send(data);
  } catch (err) {
    request.log.error(err, 'Failed to create subscription');
    return reply.code(500).send({ error: 'Failed to create subscription' });
  }
}

function getPriceIdForTier(tier: string): string {
  const prices = {
    starter: process.env.STRIPE_PRICE_STARTER!,
    growth: process.env.STRIPE_PRICE_GROWTH!,
    enterprise: process.env.STRIPE_PRICE_ENTERPRISE!
  };
  return prices[tier as keyof typeof prices];
}

function getFeaturesForTier(tier: string) {
  const features = {
    starter: {
      max_eves: 3,
      max_users: 5,
      max_storage_gb: 10,
      features: ['Basic Analytics', 'Email Support', 'Core EVE™ Features']
    },
    growth: {
      max_eves: 10,
      max_users: 20,
      max_storage_gb: 50,
      features: ['Advanced Analytics', 'Priority Support', 'Custom EVE™ Training']
    },
    enterprise: {
      max_eves: -1, // Unlimited
      max_users: -1, // Unlimited
      max_storage_gb: 500,
      features: ['Enterprise Analytics', '24/7 Support', 'Custom Development']
    }
  };
  return features[tier as keyof typeof features];
}