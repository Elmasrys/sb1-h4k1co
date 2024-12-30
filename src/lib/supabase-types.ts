export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          type: 'corporation' | 'llc' | 'nonprofit'
          jurisdiction: string
          status: 'pending' | 'active' | 'paused' | 'terminated'
          owner_id: string
          contact: {
            email: string
            phone?: string
          }
          settings: {
            autonomy_level: 'full' | 'high' | 'medium' | 'low'
            human_oversight_required: string[]
            notification_preferences: {
              email: boolean
              push: boolean
              urgency_threshold: 'low' | 'medium' | 'high' | 'critical'
            }
            industry: string
            compliance_requirements?: string[]
            operating_hours?: {
              timezone: string
              schedule: Record<string, any>
            }
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'corporation' | 'llc' | 'nonprofit'
          jurisdiction: string
          status?: 'pending' | 'active' | 'paused' | 'terminated'
          owner_id: string
          contact: {
            email: string
            phone?: string
          }
          settings: {
            autonomy_level: 'full' | 'high' | 'medium' | 'low'
            human_oversight_required: string[]
            notification_preferences: {
              email: boolean
              push: boolean
              urgency_threshold: 'low' | 'medium' | 'high' | 'critical'
            }
            industry: string
            compliance_requirements?: string[]
            operating_hours?: {
              timezone: string
              schedule: Record<string, any>
            }
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          type?: 'corporation' | 'llc' | 'nonprofit'
          jurisdiction?: string
          status?: 'pending' | 'active' | 'paused' | 'terminated'
          contact?: {
            email: string
            phone?: string
          }
          settings?: {
            autonomy_level?: 'full' | 'high' | 'medium' | 'low'
            human_oversight_required?: string[]
            notification_preferences?: {
              email: boolean
              push: boolean
              urgency_threshold: 'low' | 'medium' | 'high' | 'critical'
            }
            industry?: string
            compliance_requirements?: string[]
            operating_hours?: {
              timezone: string
              schedule: Record<string, any>
            }
          }
          updated_at?: string
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}