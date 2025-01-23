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
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      career_paths: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          color?: string
          created_at?: string
        }
      }
      user_career_paths: {
        Row: {
          id: string
          user_id: string
          career_path_id: string
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          career_path_id: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          career_path_id?: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}