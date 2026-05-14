"use client"

import { useState } from "react"
import BackgroundWallpaper from "./components/BackgroundWallpaper"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import VisionDemo from "./components/VisionDemo"
import ProductSelector from "./components/ProductSelector"
import FeatureHighlights from "./components/FeatureHighlights"
import RealityCards from "./components/RealityCards"
import VisionPulse from "./components/VisionPulse"
import PrivacyControls from "./components/PrivacyControls"
import CartDrawer from "./components/CartDrawer"
import CheckoutModal from "./components/CheckoutModal"
import DemoForm from "./components/DemoForm"
import ClosingFooter from "./components/ClosingFooter"

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#06111f] text-white overflow-x-hidden relative">
      {/* Build marker */}
      <div data-project="LUCID-01-AI-GLASSES" className="sr-only">
        LUCID/01 AI Glasses Current Build
      </div>

      {/* Background */}
      <BackgroundWallpaper />

      {/* Navbar with cart button */}
      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 z-30 w-14 h-14 rounded-full optical-glass-strong flex items-center justify-center text-blue-ice hover:text-cyan-bright transition-all duration-300 hover:scale-105"
        aria-label="Open cart"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </button>

      {/* Sections */}
      <main className="relative z-10">
        <HeroSection />
        <VisionDemo />
        <ProductSelector />
        <FeatureHighlights />
        <RealityCards />
        <VisionPulse />
        <PrivacyControls />
        <DemoForm />
        <ClosingFooter />
      </main>

      {/* Cart & Checkout */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  )
}

export default App
