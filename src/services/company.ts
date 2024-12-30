import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase-types';
import { CompanySchema } from '../types/company';

type Company = Database['public']['Tables']['companies']['Row'];
type CompanyInsert = Database['public']['Tables']['companies']['Insert'];
type CompanyUpdate = Database['public']['Tables']['companies']['Update'];

export class CompanyService {
  static async create(data: CompanyInsert): Promise<Company> {
    try {
      // First validate the user's session
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        throw new Error('Authentication failed. Please sign in again.');
      }
      if (!user) {
        throw new Error('No authenticated user found. Please sign in.');
      }

      // Validate company data
      const validatedData = CompanySchema.parse(data);

      // Insert the company
      const { data: company, error: insertError } = await supabase
        .from('companies')
        .insert({
          name: validatedData.name,
          type: validatedData.type,
          jurisdiction: validatedData.jurisdiction,
          owner_id: user.id,
          status: 'pending',
          contact: validatedData.contact,
          settings: validatedData.settings,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        if (insertError.code === '23505') {
          throw new Error('A company with this name already exists.');
        }
        if (insertError.code === '23503') {
          throw new Error('Invalid owner reference. Please try signing in again.');
        }
        throw new Error(`Failed to create company: ${insertError.message}`);
      }

      if (!company) {
        throw new Error('Company creation failed - no data returned');
      }

      return company;
    } catch (error) {
      console.error('Company creation error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while creating the company');
    }
  }

  static async getById(id: string): Promise<Company> {
    try {
      const { data: company, error } = await supabase
        .from('companies')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching company:', error);
        throw new Error(`Failed to fetch company: ${error.message}`);
      }

      if (!company) {
        throw new Error('Company not found');
      }

      return company;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch company');
    }
  }

  static async update(id: string, updates: CompanyUpdate): Promise<Company> {
    try {
      const { data: company, error } = await supabase
        .from('companies')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating company:', error);
        throw new Error(`Failed to update company: ${error.message}`);
      }

      if (!company) {
        throw new Error('Company not found');
      }

      return company;
    } catch (error) {
      console.error('Error in update:', error);
      throw error instanceof Error ? error : new Error('Failed to update company');
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting company:', error);
        throw new Error(`Failed to delete company: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in delete:', error);
      throw error instanceof Error ? error : new Error('Failed to delete company');
    }
  }

  static async getByOwnerId(ownerId: string): Promise<Company[]> {
    try {
      const { data: companies, error } = await supabase
        .from('companies')
        .select()
        .eq('owner_id', ownerId);

      if (error) {
        console.error('Error fetching companies:', error);
        throw new Error(`Failed to fetch companies: ${error.message}`);
      }

      return companies || [];
    } catch (error) {
      console.error('Error in getByOwnerId:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch companies');
    }
  }
}