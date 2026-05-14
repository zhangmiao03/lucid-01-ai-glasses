// Edge Function: GET /api/health
export function onRequestGet(context) {
  const data = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    project: "LUCID/01",
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
}
