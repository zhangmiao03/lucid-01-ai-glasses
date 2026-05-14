"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Eye, Activity } from "lucide-react"
import { fetchVisionPulse } from "@/lib/api"
import { getStorageItem, setStorageItem } from "@/lib/storage"
import type { VisionPulseData } from "@/data/siteContent"

export default function VisionPulse() {
  const [data, setData] = useState<VisionPulseData>(() =>
    getStorageItem("visionPulseData", {
      today: 0,
      lifetime: 0,
      checkedIn: false,
      date: new Date().toISOString().split("T")[0],
    })
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchVisionPulse()
        setData(result)
        setStorageItem("visionPulseData", result)
        setError(false)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="vision-pulse" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">Vision Pulse Today</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            The LUCID/01 community grows with every moment.
          </p>
        </motion.div>

        {error ? (
          <div className="flex justify-center">
            <div className="optical-glass rounded-2xl p-8 text-center max-w-sm">
              <Activity size={24} className="text-blue-ice/20 mx-auto mb-3" />
              <p className="text-blue-ice/40 text-sm">Vision Pulse is resting right now.</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="optical-glass rounded-2xl p-6 text-center"
              >
                <Users size={20} className="text-cyan-bright/40 mx-auto mb-3" />
                <div className="font-mono text-2xl text-cyan-bright">
                  {loading ? "..." : data.today.toLocaleString()}
                </div>
                <div className="text-xs text-blue-ice/40 mt-2">Today</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="optical-glass rounded-2xl p-6 text-center"
              >
                <Eye size={20} className="text-cyan-bright/40 mx-auto mb-3" />
                <div className="font-mono text-2xl text-cyan-bright">
                  {loading ? "..." : data.lifetime.toLocaleString()}
                </div>
                <div className="text-xs text-blue-ice/40 mt-2">Lifetime</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="optical-glass rounded-2xl p-6 text-center"
              >
                <Activity size={20} className="text-cyan-bright/40 mx-auto mb-3" />
                <div className="font-mono text-lg text-cyan-bright">
                  {data.checkedIn ? "ACTIVE" : "PASSIVE"}
                </div>
                <div className="text-xs text-blue-ice/40 mt-2">Status</div>
              </motion.div>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <div className="text-[10px] font-mono text-blue-ice/20">
            {data.date || "---"}
          </div>
        </div>
      </div>
    </section>
  )
}
