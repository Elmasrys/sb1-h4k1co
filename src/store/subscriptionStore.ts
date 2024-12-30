import { create } from 'zustand';
import { Subscription } from '../types/subscription';
import { apiClient } from '../lib/api-client';

interface SubscriptionState {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
  createSubscription: (tier: string, paymentMethod: any) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  fetchSubscription: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  loading: false,
  error: null,

  createSubscription: async (tier, paymentMethod) => {
    set({ loading: true, error: null });
    try {
      const subscription = await apiClient.post('/api/subscriptions', {
        tier,
        payment_method: paymentMethod
      });
      set({ subscription });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create subscription' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  cancelSubscription: async () => {
    set({ loading: true, error: null });
    try {
      await apiClient.post('/api/subscriptions/cancel');
      set(state => ({
        subscription: state.subscription
          ? { ...state.subscription, cancel_at_period_end: true }
          : null
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to cancel subscription' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchSubscription: async () => {
    set({ loading: true, error: null });
    try {
      const subscription = await apiClient.get('/api/subscriptions/current');
      set({ subscription });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch subscription' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));