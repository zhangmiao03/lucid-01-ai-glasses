// Edge Function: GET /api/vision-pulse
// Uses LUCID_KV (KV namespace) bound via console

export async function onRequestGet(context) {
  try {
    const kv = LUCID_KV
    const today = new Date().toISOString().split("T")[0]

    // Get or initialize counters
    const lifetimeStr = (await kv.get("lifetime_visitors")) || "0"
    const todayStr = (await kv.get(`today:${today}`)) || "0"

    let lifetime = parseInt(lifetimeStr, 10) || 0
    let todayCount = parseInt(todayStr, 10) || 0

    // Check cookie for same-day duplicate
    const cookie = context.request.headers.get("Cookie") || ""
    const hasCheckedIn = cookie.includes(`lucid_checked_in=${today}`)

    if (!hasCheckedIn) {
      todayCount += 1
      lifetime += 1

      // Write updated counters
      await kv.put(`today:${today}`, String(todayCount))
      await kv.put("lifetime_visitors", String(lifetime))
    }

    const data = {
      today: todayCount,
      lifetime: lifetime,
      checkedIn: !hasCheckedIn,
      date: today,
    }

    const response = new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `lucid_checked_in=${today}; Path=/; Max-Age=86400; SameSite=Lax`,
      },
    })

    return response
  } catch (err) {
    return new Response(
      JSON.stringify({
        today: 0,
        lifetime: 0,
        checkedIn: false,
        date: new Date().toISOString().split("T")[0],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
