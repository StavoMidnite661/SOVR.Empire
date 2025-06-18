import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

export interface Transaction {
  id: string
  user_id: string
  tx_hash: string | null
  amount: number
  currency: string
  vendor: string
  status: "pending" | "completed" | "failed"
  offset_token: string
  trust_reference: string
  created_at: string
  updated_at: string
}

export interface WalletBalance {
  id: string
  user_id: string
  matic_balance: number
  sovr_balance: number
  echo_balance: number
  updated_at: string
}
