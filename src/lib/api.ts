import type { VisionPulseData, DemoFormData } from "@/data/siteContent"

const BASE = import.meta.env.PROD ? "" : ""

export async function fetchVisionPulse(): Promise<VisionPulseData> {
  const res = await fetch(`${BASE}/api/vision-pulse`)
  if (!res.ok) throw new Error("Failed to fetch vision pulse")
  return res.json()
}

export async function submitDemoForm(data: DemoFormData): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE}/api/private-demo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to submit demo request")
  return res.json()
}

export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  const res = await fetch(`${BASE}/api/health`)
  if (!res.ok) throw new Error("Health check failed")
  return res.json()
}
