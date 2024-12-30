import { create } from 'zustand';
import { EVE, EVEAction } from '../types/eve';

interface EVEState {
  eves: EVE[];
  actions: EVEAction[];
  loading: boolean;
  error: string | null;
  selectedEVE: EVE | null;
  createEVE: (eve: Omit<EVE, 'id'>) => Promise<void>;
  updateEVE: (id: string, updates: Partial<EVE>) => Promise<void>;
  deleteEVE: (id: string) => Promise<void>;
  selectEVE: (eve: EVE | null) => void;
  logAction: (action: Omit<EVEAction, 'id'>) => Promise<void>;
  initializeEVEs: () => void;
}

export const useEVEStore = create<EVEState>((set, get) => ({
  eves: [],
  actions: [],
  loading: false,
  error: null,
  selectedEVE: null,

  initializeEVEs: () => {
    // Start with empty state for new accounts
    set({ eves: [] });
  },

  createEVE: async (eve) => {
    set({ loading: true, error: null });
    try {
      const newEVE: EVE = {
        ...eve,
        id: Date.now().toString(),
      };
      set(state => ({ eves: [...state.eves, newEVE] }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create EVE' });
    } finally {
      set({ loading: false });
    }
  },

  updateEVE: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        eves: state.eves.map(eve =>
          eve.id === id ? { ...eve, ...updates } : eve
        ),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update EVE' });
    } finally {
      set({ loading: false });
    }
  },

  deleteEVE: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        eves: state.eves.filter(eve => eve.id !== id),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete EVE' });
    } finally {
      set({ loading: false });
    }
  },

  selectEVE: (eve) => {
    set({ selectedEVE: eve });
  },

  logAction: async (action) => {
    try {
      const newAction: EVEAction = {
        ...action,
        id: Date.now().toString(),
      };
      set(state => ({ actions: [...state.actions, newAction] }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to log action' });
    }
  },
}));