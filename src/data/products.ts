export interface ProductColor {
  id: string
  name: string
  hex: string
  label: string
}

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  currency: string
  weight: string
  battery: string
  features: string[]
  colors: ProductColor[]
}

export const LUCID_PRODUCT: Product = {
  id: "lucid-01",
  name: "LUCID/01",
  tagline: "Reality, gently annotated.",
  price: 3999,
  currency: "¥",
  weight: "38g",
  battery: "12h",
  features: ["Whisper HUD", "Context AI", "Local-first Memory", "Privacy Pulse"],
  colors: [
    { id: "moon-silver", name: "Moon Silver", hex: "#c0cbd9", label: "MS" },
    { id: "graphite-black", name: "Graphite Black", hex: "#2a2d35", label: "GB" },
    { id: "ice-titanium", name: "Ice Titanium", hex: "#8aa8c0", label: "IT" },
    { id: "sand-gold", name: "Sand Gold", hex: "#c4a97d", label: "SG" },
  ],
}
