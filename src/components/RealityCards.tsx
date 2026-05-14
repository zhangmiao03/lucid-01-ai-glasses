"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Bookmark, Share2 } from "lucide-react"
import { REALITY_CARDS } from "@/data/realityCards"
import { getStorageItem, setStorageItem } from "@/lib/storage"

const tabs = ["Commute", "Meeting", "Travel", "Create"]

export default function RealityCards() {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const savedCards = getStorageItem<string[]>("savedRealityCards", [])

  const filteredCards = REALITY_CARDS.filter((c) => c.tab === activeTab)

  const copyCaption = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const saveCard = (cardId: string) => {
    const updated = savedCards.includes(cardId)
      ? savedCards.filter((id) => id !== cardId)
      : [...savedCards, cardId]
    setStorageItem("savedRealityCards", updated)
  }

  return (
    <section id="reality-cards" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">Reality Cards</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            Your life, annotated. Screenshot-ready moments.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                activeTab === tab
                  ? "optical-glass-strong text-cyan-bright border border-cyan-bright/20"
                  : "text-blue-ice/40 hover:text-blue-ice/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="optical-glass-strong rounded-2xl p-6 space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-blue-ice/30">{card.timestamp}</div>
                  <div className="text-[10px] font-mono text-cyan-bright/30">LUCID/01</div>
                </div>

                {/* Data lines */}
                <div className="space-y-2">
                  {card.lines.map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-0.5 rounded bg-cyan-bright/30" />
                      <span className="text-xs font-mono text-blue-ice/50">{line}</span>
                    </div>
                  ))}
                </div>

                {/* Poetic line */}
                <div className="optical-glass rounded-xl p-3">
                  <p className="text-sm text-blue-ice/60 leading-relaxed italic">&ldquo;{card.poetic}&rdquo;</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => copyCaption(card.poetic, card.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-blue-ice/40 hover:text-cyan-bright/60 hover:bg-glass-bg transition-all"
                  >
                    {copiedId === card.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === card.id ? "Copied" : "Copy Caption"}
                  </button>
                  <button
                    onClick={() => saveCard(card.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      savedCards.includes(card.id)
                        ? "text-cyan-bright/60 bg-cyan-bright/5"
                        : "text-blue-ice/40 hover:text-cyan-bright/60 hover:bg-glass-bg"
                    }`}
                  >
                    <Bookmark size={12} />
                    {savedCards.includes(card.id) ? "Saved" : "Save Card"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
