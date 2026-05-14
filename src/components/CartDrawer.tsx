"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { getStorageItem, setStorageItem } from "@/lib/storage"
import type { CartItem } from "@/data/siteContent"
import { LUCID_PRODUCT } from "@/data/products"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>(() => getStorageItem("cartItems", []))

  useEffect(() => {
    setStorageItem("cartItems", items)
  }, [items])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setItems((prev) => {
        const existing = prev.find(
          (item) => item.color === detail.color
        )
        if (existing) {
          return prev.map((item) =>
            item.color === detail.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        const newItem: CartItem = {
          id: `cart-${Date.now()}`,
          productName: LUCID_PRODUCT.name,
          color: detail.color,
          price: LUCID_PRODUCT.price,
          quantity: 1,
        }
        return [...prev, newItem]
      })
      onClose()
    }
    window.addEventListener("add-to-cart", handler)
    return () => window.removeEventListener("add-to-cart", handler)
  }, [onClose])

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 optical-glass-strong"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-border">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-cyan-bright/60" />
                  <span className="text-blue-ice font-medium">Cart</span>
                  <span className="text-xs text-blue-ice/30 font-mono">
                    ({items.length})
                  </span>
                </div>
                <button onClick={onClose} className="text-blue-ice/30 hover:text-blue-ice">
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingBag size={32} className="text-blue-ice/10 mx-auto mb-3" />
                    <p className="text-blue-ice/30 text-sm">Your cart is empty</p>
                  </div>
                )}
                {items.map((item) => (
                  <div key={item.id} className="optical-glass rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="text-sm text-blue-ice">{item.productName}</div>
                        <div className="text-xs text-blue-ice/40 font-mono">{item.color}</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-blue-ice/20 hover:text-red-400/60 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full border border-glass-border text-blue-ice/40 hover:text-blue-ice flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-sm text-blue-ice">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full border border-glass-border text-blue-ice/40 hover:text-blue-ice flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="font-mono text-sm text-cyan-bright/60">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-glass-border space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-ice/50">Subtotal</span>
                    <span className="font-mono text-lg text-cyan-bright">
                      ¥{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={onCheckout}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-blue-luminous/20 to-cyan-bright/10 border border-blue-luminous/30 text-blue-ice hover:bg-blue-luminous/30 transition-all duration-300 text-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
