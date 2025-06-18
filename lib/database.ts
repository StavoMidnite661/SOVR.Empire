import { supabase } from "./supabase"
import type { Transaction, WalletBalance, AuditLog } from "./supabase"

export class SOVRDatabase {
  // Transaction operations
  static async createTransaction(transaction: Omit<Transaction, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("transactions").insert(transaction).select().single()

    if (error) throw error
    return data
  }

  static async getTransactions(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }

  static async updateTransactionStatus(id: string, status: string, txHash?: string) {
    const updateData: any = { status, updated_at: new Date().toISOString() }
    if (txHash) updateData.tx_hash = txHash

    const { data, error } = await supabase.from("transactions").update(updateData).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Wallet balance operations
  static async getWalletBalance(userId: string) {
    const { data, error } = await supabase.from("wallet_balances").select("*").eq("user_id", userId).single()

    if (error) {
      // Create initial balance if doesn't exist
      if (error.code === "PGRST116") {
        return this.createWalletBalance(userId)
      }
      throw error
    }
    return data
  }

  static async createWalletBalance(userId: string) {
    const { data, error } = await supabase
      .from("wallet_balances")
      .insert({
        user_id: userId,
        matic_balance: 2.5,
        sovr_balance: 1250.75,
        echo_balance: 5000.0,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateWalletBalance(userId: string, balances: Partial<WalletBalance>) {
    const { data, error } = await supabase
      .from("wallet_balances")
      .update({
        ...balances,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Audit log operations
  static async createAuditLog(log: Omit<AuditLog, "id" | "timestamp">) {
    const { data, error } = await supabase
      .from("audit_logs")
      .insert({
        ...log,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getAuditLogs(eventId: string) {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .eq("event_id", eventId)
      .order("timestamp", { ascending: true })

    if (error) throw error
    return data
  }

  // Vault operations
  static async createVaultOperation(operation: {
    user_id: string
    operation_type: string
    amount: number
    token: string
    tx_hash?: string
    block_number?: number
  }) {
    const { data, error } = await supabase.from("vault_operations").insert(operation).select().single()

    if (error) throw error
    return data
  }

  static async updateVaultOperation(
    id: string,
    updates: {
      status?: string
      tx_hash?: string
      block_number?: number
    },
  ) {
    const { data, error } = await supabase
      .from("vault_operations")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Webhook events
  static async createWebhookEvent(event: {
    event_id: string
    event_type: string
    source: string
    payload: any
  }) {
    const { data, error } = await supabase.from("webhook_events").insert(event).select().single()

    if (error) throw error
    return data
  }

  static async markWebhookProcessed(eventId: string) {
    const { data, error } = await supabase
      .from("webhook_events")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("event_id", eventId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Real-time subscriptions
  static subscribeToTransactions(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel("transactions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe()
  }

  static subscribeToWalletBalance(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel("wallet_balance")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "wallet_balances",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe()
  }
}
