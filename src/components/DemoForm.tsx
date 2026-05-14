"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Send } from "lucide-react"
import { submitDemoForm } from "@/lib/api"
import { getStorageItem, setStorageItem } from "@/lib/storage"
import { LUCID_PRODUCT } from "@/data/products"
import type { DemoFormData } from "@/data/siteContent"

const scenarios = [
  "Daily Commute",
  "Professional Meetings",
  "Travel & Navigation",
  "Creative Work",
  "Fitness & Sports",
]

export default function DemoForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<DemoFormData>(() =>
    getStorageItem("demoFormDraft", {
      name: "",
      contact: "",
      city: "",
      frameColor: LUCID_PRODUCT.colors[0].name,
      scenario: scenarios[0],
      note: "",
    })
  )

  useEffect(() => {
    if (!submitted) setStorageItem("demoFormDraft", form)
  }, [form, submitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitDemoForm(form)
    } catch {
      // Save locally if API fails
      const saved = getStorageItem<DemoFormData[]>("savedDemoForms", [])
      setStorageItem("savedDemoForms", [...saved, form])
    }
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <section id="demo" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">Book a Private Demo</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            Experience LUCID/01 firsthand. A member of our team will reach out.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center optical-glass-strong rounded-2xl p-10"
          >
            <CheckCircle size={40} className="text-cyan-bright mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-blue-ice mb-2">Demo Requested</h3>
            <p className="text-sm text-blue-ice/40">
              We&apos;ll contact you shortly to arrange a private session.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
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
            </div>
            <div>
              <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">City</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors"
                placeholder="Your city"
              />
            </div>
            <div>
              <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Preferred Frame Color</label>
              <select
                value={form.frameColor}
                onChange={(e) => setForm({ ...form, frameColor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors appearance-none"
              >
                {LUCID_PRODUCT.colors.map((c) => (
                  <option key={c.id} value={c.name} className="bg-navy-800">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Preferred Scenario</label>
              <select
                value={form.scenario}
                onChange={(e) => setForm({ ...form, scenario: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors appearance-none"
              >
                {scenarios.map((s) => (
                  <option key={s} value={s} className="bg-navy-800">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-blue-ice/40 font-mono mb-1.5 block">Note (optional)</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-700/30 border border-glass-border text-blue-ice text-sm focus:outline-none focus:border-cyan-bright/30 transition-colors resize-none"
                placeholder="Anything you'd like to share..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-blue-luminous/20 to-cyan-bright/10 border border-blue-luminous/30 text-blue-ice hover:bg-blue-luminous/30 transition-all duration-300 text-sm disabled:opacity-50"
            >
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  Send Request
                  <Send size={14} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
