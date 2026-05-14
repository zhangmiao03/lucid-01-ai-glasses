"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, MicOff, HardDrive } from "lucide-react"
import { getStorageItem, setStorageItem } from "@/lib/storage"
import type { PrivacyToggle } from "@/data/siteContent"

const defaultToggles: PrivacyToggle[] = [
  { id: "capture-light", label: "Visible Capture Light", enabled: true },
  { id: "one-tap-silence", label: "One-tap Silence", enabled: true },
  { id: "local-memory", label: "Local-first Memory", enabled: true },
]

const toggleIcons: Record<string, React.ReactNode> = {
  "capture-light": <Eye size={20} />,
  "one-tap-silence": <MicOff size={20} />,
  "local-memory": <HardDrive size={20} />,
}

export default function PrivacyControls() {
  const [toggles, setToggles] = useState<PrivacyToggle[]>(() =>
    getStorageItem("privacyToggles", defaultToggles)
  )

  useEffect(() => {
    setStorageItem("privacyToggles", toggles)
  }, [toggles])

  const toggle = (id: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    )
  }

  return (
    <section id="privacy" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">Privacy You Can See</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            Control what your glasses share. Always visible, always yours.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {toggles.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`optical-glass rounded-2xl p-6 text-center transition-all duration-300 ${
                item.enabled ? "border-cyan-bright/20" : "opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                  item.enabled
                    ? "bg-cyan-bright/10 text-cyan-bright/70"
                    : "bg-blue-luminous/5 text-blue-ice/30"
                }`}
              >
                {toggleIcons[item.id]}
              </div>
              <h3 className="text-sm text-blue-ice mb-4">{item.label}</h3>
              <button
                onClick={() => toggle(item.id)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 mx-auto ${
                  item.enabled ? "bg-cyan-bright/30" : "bg-blue-luminous/10"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white/80 transition-all duration-300 shadow-sm ${
                    item.enabled ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
              <div className="text-[10px] font-mono mt-3 text-blue-ice/30">
                {item.enabled ? "ENABLED" : "DISABLED"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
