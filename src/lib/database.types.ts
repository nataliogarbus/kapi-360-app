// Este archivo es un placeholder para los tipos generados por Supabase.
// Para generar los tipos reales, ejecuta el siguiente comando en tu terminal:
// npx supabase gen types typescript --project-id <tu-project-id> > src/lib/database.types.ts
// Reemplaza <tu-project-id> con el ID de tu proyecto de Supabase.

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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          company_name: string | null
          role: "cliente" | "equipo_kapi"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          company_name?: string | null
          role?: "cliente" | "equipo_kapi"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          company_name?: string | null
          role?: "cliente" | "equipo_kapi"
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string | null
          name: string
          description: string | null
          status: "Planificación" | "Activo" | "En Pausa" | "Completado" | "Cancelado"
          start_date: string | null
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          name: string
          description?: string | null
          status?: "Planificación" | "Activo" | "En Pausa" | "Completado" | "Cancelado"
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          name?: string
          description?: string | null
          status?: "Planificación" | "Activo" | "En Pausa" | "Completado" | "Cancelado"
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          project_id: string
          sender_id: string | null
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          sender_id?: string | null
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          sender_id?: string | null
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "cliente" | "equipo_kapi"
      project_status: "Planificación" | "Activo" | "En Pausa" | "Completado" | "Cancelado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
