import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()
    const eventId = event.id || `evt_${Date.now()}`

    console.log(`📨 Supabase Event Received [${eventId}]: ${event.type}`)

    // Store webhook event
    const { data, error } = await supabaseAdmin
      .from("webhook_events")
      .insert({
        event_id: eventId,
        event_type: event.type,
        source: "supabase",
        payload: event,
      })

    if (error) {
      console.error("Database error:", error)
    }

    return NextResponse.json({
      status: "success",
      message: "Event processed successfully",
      eventId,
    })
  } catch (error) {
    console.error(`Supabase webhook error:`, error)
    return NextResponse.json(
      { status: "error", message: "Error processing webhook" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ status: "Supabase webhook endpoint active" })
}
