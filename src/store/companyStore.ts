import { create } from 'zustand';
import { CompanyService } from '../services/company';
import { Database } from '../lib/supabase-types';
import { supabase } from '../lib/supabase';
import { CompanySchema } from '../types/company';

type Company = Database['public']['Tables']['companies']['Row'];
type CompanyInsert = Database['public']['Tables']['companies']['Insert'];

interface CompanyState {
  company: Company | null;
  loading: boolean;
  error: string | null;
  setCompany: (company: Company | null) => void;
  fetchCompany: (id: string) => Promise<void>;
  createCompany: (data: Omit<CompanyInsert, 'owner_id' | 'id'>) => Promise<void>;
  updateCompany: (id: string, updates: Partial<Company>) => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  company: null,
  loading: false,
  error: null,

  setCompany: (company) => set({ company }),

  fetchCompany: async (id) => {
    set({ loading: true, error: null });
    try {
      const company = await CompanyService.getById(id);
      set({ company });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch company';
      set({ error: message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createCompany: async (data) => {
    set({ loading: true, error: null });
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Please sign in to create a company');
      }

      // Validate data with Zod schema
      const validatedData = CompanySchema.parse(data);

      // Prepare company data
      const companyData: CompanyInsert = {
        name: validatedData.name,
        type: validatedData.type,
        jurisdiction: validatedData.jurisdiction,
        owner_id: user.id,
        status: 'pending',
        contact: validatedData.contact,
        settings: {
          ...validatedData.settings,
          autonomy_level: validatedData.settings.autonomy_level,
          human_oversight_required: validatedData.settings.human_oversight_required,
          notification_preferences: validatedData.settings.notification_preferences,
          industry: validatedData.settings.industry,
          compliance_requirements: [],
          operating_hours: {
            timezone: 'UTC',
            schedule: {}
          }
        }
      };

      // Create company
      const company = await CompanyService.create(companyData);
      set({ company });
    } catch (error) {
      console.error('Company creation error:', error);
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Failed to create company' });
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateCompany: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updated = await CompanyService.update(id, updates);
      set({ company: updated });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update company';
      set({ error: message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));