"use client"

import { motion } from "framer-motion"
import { Feather, Eye, Cpu, Shield } from "lucide-react"
import { FEATURES } from "@/data/siteContent"

const featureIcons: Record<string, React.ReactNode> = {
  feather: <Feather size={24} />,
  eye: <Eye size={24} />,
  cpu: <Cpu size={24} />,
  shield: <Shield size={24} />,
}

export default function FeatureHighlights() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">Built Different</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            Every detail engineered for seamless integration into your daily life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="optical-glass rounded-2xl p-6 sm:p-8 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-luminous/5 border border-blue-luminous/10 flex items-center justify-center text-cyan-bright/60 mb-5 group-hover:bg-blue-luminous/10 transition-all duration-300">
                {featureIcons[feature.icon]}
              </div>
              <h3 className="font-serif text-xl text-blue-ice mb-3">{feature.title}</h3>
              <p className="text-sm text-blue-ice/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
