"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Eye } from "lucide-react"
import GlassesModel from "./GlassesModel"
import { LUCID_PRODUCT, type ProductColor } from "@/data/products"
import { getStorageItem, setStorageItem } from "@/lib/storage"

export default function ProductSelector() {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(() => {
    const saved = getStorageItem<string>("selectedFrameColor", "moon-silver")
    return LUCID_PRODUCT.colors.find((c) => c.id === saved) || LUCID_PRODUCT.colors[0]
  })

  useEffect(() => {
    setStorageItem("selectedFrameColor", selectedColor.id)
  }, [selectedColor.id])

  const product = LUCID_PRODUCT

  return (
    <section id="product" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">Choose Your Frame</h2>
          <p className="text-blue-ice/40 text-sm">Four expressions of the same intelligence.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Product Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="optical-glass-strong rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <GlassesModel color={selectedColor.hex} className="mb-6" />
                </motion.div>
              </AnimatePresence>
              <div className="text-center">
                <div className="text-blue-ice/40 text-xs font-mono">{selectedColor.name}</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-serif text-3xl text-blue-ice mb-2">{product.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-cyan-bright">
                  {product.currency}{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-blue-ice/30">from</span>
              </div>
            </div>

            {/* Specs */}
            <div className="flex gap-8">
              <div>
                <div className="font-mono text-lg text-cyan-bright/70">{product.weight}</div>
                <div className="text-xs text-blue-ice/40 mt-1">Weight</div>
              </div>
              <div>
                <div className="font-mono text-lg text-cyan-bright/70">{product.battery}</div>
                <div className="text-xs text-blue-ice/40 mt-1">Battery</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-blue-ice/60">
                  <div className="w-1 h-1 rounded-full bg-cyan-bright/40" />
                  {f}
                </div>
              ))}
            </div>

            {/* Color selector */}
            <div>
              <div className="text-xs text-blue-ice/40 font-mono mb-3 tracking-wider">COLOR</div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      selectedColor.id === color.id
                        ? "border-cyan-bright scale-110"
                        : "border-glass-border hover:border-blue-ice/30"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const event = new CustomEvent("add-to-cart", {
                    detail: { color: selectedColor.name, colorHex: selectedColor.hex },
                  })
                  window.dispatchEvent(event)
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-luminous/20 to-cyan-bright/10 border border-blue-luminous/30 text-blue-ice hover:bg-blue-luminous/30 transition-all duration-300 text-sm"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <a
                href="#demo"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-glass-border text-blue-ice/60 hover:bg-glass-bg hover:text-blue-ice transition-all duration-300 text-sm"
              >
                <Eye size={16} />
                Book Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
