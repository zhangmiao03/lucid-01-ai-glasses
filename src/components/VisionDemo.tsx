"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation, Briefcase, Globe, Zap, Sparkles } from "lucide-react"
import { SCENES, type SceneContent } from "@/data/scenes"
import { getStorageItem, setStorageItem } from "@/lib/storage"

const sceneIcons: Record<string, React.ReactNode> = {
  navigation: <Navigation size={14} />,
  briefcase: <Briefcase size={14} />,
  globe: <Globe size={14} />,
  zap: <Zap size={14} />,
  sparkles: <Sparkles size={14} />,
}

export default function VisionDemo() {
  const [activeScene, setActiveScene] = useState<SceneContent>(() => {
    const saved = getStorageItem<string>("selectedScene", "commute")
    return SCENES.find((s) => s.id === saved) || SCENES[0]
  })
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    setStorageItem("selectedScene", activeScene.id)
    setScanning(true)
    const t = setTimeout(() => setScanning(false), 600)
    return () => clearTimeout(t)
  }, [activeScene.id])

  return (
    <section id="vision-demo" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">See Through AI</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            Experience how LUCID/01 layers intelligence onto everyday moments.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Scene Switcher */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0"
          >
            {SCENES.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 whitespace-nowrap ${
                  activeScene.id === scene.id
                    ? "optical-glass-strong text-cyan-bright border border-cyan-bright/20"
                    : "text-blue-ice/40 hover:text-blue-ice/70 hover:bg-glass-bg border border-transparent"
                }`}
              >
                <span className="hidden lg:block">{sceneIcons[scene.icon]}</span>
                {scene.label}
              </button>
            ))}
          </motion.div>

          {/* HUD Viewport */}
          <motion.div
            layout
            className="flex-1 relative overflow-hidden rounded-2xl optical-glass-strong min-h-[400px] lg:min-h-[500px]"
          >
            {/* Background scan line */}
            {scanning && (
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.03) 50%, transparent 100%)",
                  animation: "scan-line 0.6s ease-out",
                }}
              />
            )}

            {/* Scene content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 relative"
              >
                {/* Scene header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-bright/50">{sceneIcons[activeScene.icon]}</span>
                    <span className="text-xs text-blue-ice/30 font-mono tracking-wider uppercase">{activeScene.label}_VIEW</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright/50" />
                    <span className="text-[10px] text-blue-ice/20 font-mono">AI ACTIVE</span>
                  </div>
                </div>

                {/* HUD Lines */}
                <div className="space-y-5">
                  {activeScene.lines.map((line, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 ${
                        line.highlight ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {/* Detection box */}
                      {line.highlight && (
                        <div className="w-1.5 h-1.5 rounded-sm bg-cyan-bright/60 flex-shrink-0" />
                      )}
                      {!line.highlight && (
                        <div className="w-1.5 h-0.5 rounded-sm bg-blue-luminous/20 flex-shrink-0" />
                      )}
                      <span
                        className={`font-mono text-sm ${
                          line.highlight
                            ? "text-cyan-bright"
                            : "text-blue-ice/60"
                        }`}
                      >
                        {">"} {line.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom coordinates */}
                <div className="absolute bottom-6 right-8 text-[10px] text-blue-ice/15 font-mono">
                  47.6205°N, 122.3493°W · ALT 12M
                </div>

                {/* Summary card */}
                <div className="mt-10 optical-glass rounded-xl p-4 max-w-xs">
                  <div className="text-[10px] text-cyan-bright/40 font-mono mb-2">SUMMARY</div>
                  <div className="text-sm text-blue-ice/70 font-mono">
                    {activeScene.id === "commute" && "Route calculated. 2 language cues active."}
                    {activeScene.id === "meeting" && "3 decisions captured. Follow-up scheduled."}
                    {activeScene.id === "travel" && "7 landmarks identified. Menu translated."}
                    {activeScene.id === "run" && "Pace optimal. 72% goal achieved."}
                    {activeScene.id === "create" && "Highlight detected. Memory card saved."}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
