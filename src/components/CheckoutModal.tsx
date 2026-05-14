"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, CreditCard, Truck, Building2 } from "lucide-react"
import { getStorageItem, setStorageItem } from "@/lib/storage"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState(() =>
    getStorageItem("checkoutForm", {
      name: "",
      contact: "",
      city: "",
      delivery: "standard",
      payment: "card",
    })
  )

  useEffect(() => {
    if (!open) {
      setStep("form")
      setSubmitting(false)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStorageItem("checkoutForm", form)
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1500))
    setStep("success")
    setSubmitting(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="optical-glass-strong rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              {step === "form" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-xl text-blue-ice">Checkout</h3>
                    <button onClick={onClose} className="text-blue-ice/30 hover:text-blue-ice">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Contact</label>
                      <input
                        required
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors"
                        placeholder="Email or phone"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">City</label>
                      <input
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Delivery</label>
                      <div className="flex gap-3">
                        {[
                          { value: "standard", label: "Standard", icon: <Truck size={14} /> },
                          { value: "express", label: "Express", icon: <Building2 size={14} /> },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, delivery: opt.value })}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs transition-all ${
                              form.delivery === opt.value
                                ? "bg-cyan-bright/10 border border-cyan-bright/20 text-cyan-bright"
                                : "bg-navy-700/30 border border-glass-border text-blue-ice/40"
                            }`}
                          >
                            {opt.icon}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Payment</label>
                      <div className="flex gap-3">
                        {[
                          { value: "card", label: "Card", icon: <CreditCard size={14} /> },
                          { value: "wallet", label: "Wallet", icon: <Building2 size={14} /> },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, payment: opt.value })}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs transition-all ${
                              form.payment === opt.value
                                ? "bg-cyan-bright/10 border border-cyan-bright/20 text-cyan-bright"
                                : "bg-navy-700/30 border border-glass-border text-blue-ice/40"
                            }`}
                          >
                            {opt.icon}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-blue-luminous/20 to-cyan-bright/10 border border-blue-luminous/30 text-blue-ice hover:bg-blue-luminous/30 transition-all duration-300 text-sm disabled:opacity-50"
                    >
                      {submitting ? "Processing..." : "Place Order"}
                    </button>
                  </form>
                </>
              )}

              {step === "success" && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-bright/10 flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-cyan-bright" />
                  </div>
                  <h3 className="font-serif text-2xl text-blue-ice">Your LUCID/01 experience has been reserved.</h3>
                  <p className="text-sm text-blue-ice/40">
                    We&apos;ll be in touch with next steps.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 rounded-full border border-glass-border text-blue-ice/60 hover:text-blue-ice transition-colors text-sm"
                  >
                    Continue Exploring
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
