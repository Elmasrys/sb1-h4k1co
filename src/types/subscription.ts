import { z } from 'zod';

export type SubscriptionTier = 'starter' | 'growth' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface Subscription {
  id: string;
  company_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  current_period_start: Date;
  current_period_end: Date;
  cancel_at_period_end: boolean;
  trial_end?: Date;
  features: {
    max_eves: number;
    max_users: number;
    max_storage_gb: number;
    features: string[];
  };
}

export const SubscriptionSchema = z.object({
  tier: z.enum(['starter', 'growth', 'enterprise']),
  payment_method: z.object({
    type: z.enum(['card']),
    card: z.object({
      number: z.string(),
      exp_month: z.number(),
      exp_year: z.number(),
      cvc: z.string()
    })
  })
});