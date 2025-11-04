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
          phone_number: string
          full_name: string | null
          avatar_url: string | null
          location: string | null
          state: string | null
          bio: string | null
          whatsapp_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phone_number: string
          full_name?: string | null
          avatar_url?: string | null
          location?: string | null
          state?: string | null
          bio?: string | null
          whatsapp_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone_number?: string
          full_name?: string | null
          avatar_url?: string | null
          location?: string | null
          state?: string | null
          bio?: string | null
          whatsapp_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          price: number
          category_id: string
          condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
          location: string
          state: string
          images: string[]
          status: 'active' | 'sold' | 'inactive'
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          price: number
          category_id: string
          condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
          location: string
          state: string
          images?: string[]
          status?: 'active' | 'sold' | 'inactive'
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          price?: number
          category_id?: string
          condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor'
          location?: string
          state?: string
          images?: string[]
          status?: 'active' | 'sold' | 'inactive'
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          created_at?: string
        }
      }
      listing_views: {
        Row: {
          id: string
          listing_id: string
          viewer_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          viewer_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          viewer_id?: string | null
          viewed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_listing_views: {
        Args: {
          listing_id: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
