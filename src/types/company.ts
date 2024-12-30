import { z } from 'zod';

export interface Company {
  id: string;
  name: string;
  status: 'setup' | 'active' | 'paused' | 'terminated';
  type: 'corporation' | 'llc' | 'nonprofit';
  jurisdiction: string;
  incorporation_date?: Date;
  fiscal_year_end?: string;
  tax_id?: string;
  registered_address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
  directors: {
    id: string;
    name: string;
    role: string;
    ownership_percentage?: number;
  }[];
  settings: {
    autonomy_level: 'full' | 'high' | 'medium' | 'low';
    human_oversight_required: string[];
    notification_preferences: {
      email: boolean;
      push: boolean;
      urgency_threshold: 'low' | 'medium' | 'high' | 'critical';
    };
    compliance_requirements: string[];
    operating_hours: {
      timezone: string;
      schedule: {
        [key: string]: {
          start: string;
          end: string;
        };
      };
    };
    industry: string;
  };
  integrations: {
    [key: string]: {
      enabled: boolean;
      config: Record<string, any>;
      last_sync?: Date;
    };
  };
  metrics: {
    eve_efficiency: number;
    human_interventions: number;
    tasks_automated: number;
    cost_savings: number;
    compliance_score: number;
  };
}

export const CompanySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  type: z.enum(['corporation', 'llc', 'nonprofit']),
  jurisdiction: z.string().min(1, 'Jurisdiction is required'),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
  }),
  settings: z.object({
    autonomy_level: z.enum(['full', 'high', 'medium', 'low']),
    human_oversight_required: z.array(z.string()),
    notification_preferences: z.object({
      email: z.boolean(),
      push: z.boolean(),
      urgency_threshold: z.enum(['low', 'medium', 'high', 'critical']),
    }),
    industry: z.string().min(1, 'Industry is required'),
  }),
});