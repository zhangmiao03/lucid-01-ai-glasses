// Edge Function: POST /api/private-demo
export async function onRequestPost(context) {
  try {
    const body = await context.request.json()

    // Validate required fields
    if (!body.name || !body.contact) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name and contact are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Store in KV if available
    try {
      const kv = LUCID_KV
      const id = `demo:${Date.now()}`
      const data = {
        ...body,
        submittedAt: new Date().toISOString(),
      }
      await kv.put(id, JSON.stringify(data))
    } catch {
      // KV not available, just acknowledge
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Demo request received. We'll contact you shortly.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid request",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
