export interface VisionPulseData {
  today: number
  lifetime: number
  checkedIn: boolean
  date: string
}

export interface DemoFormData {
  name: string
  contact: string
  city: string
  frameColor: string
  scenario: string
  note: string
}

export interface CartItem {
  id: string
  productName: string
  color: string
  price: number
  quantity: number
}

export interface PrivacyToggle {
  id: string
  label: string
  enabled: boolean
}

export const NAV_LINKS = [
  { label: "Experience", href: "#vision-demo" },
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Privacy", href: "#privacy" },
  { label: "Demo", href: "#demo" },
]

export const HERO_BADGE = "AI GLASSES CONCEPT · 2026"
export const HERO_HEADLINE = "Reality, gently annotated."
export const HERO_SUBHEADLINE =
  "LUCID/01 is a lightweight AI glasses concept that layers translation, navigation, meeting intelligence, and subtle memory support onto daily life."

export const FLOATING_LABELS = [
  "Live Translate",
  "Route 200m",
  "Meeting Brief",
  "Memory Ready",
  "Privacy On",
]

export const HERO_METRICS = [
  { value: "38g", label: "Feather Frame" },
  { value: "12h", label: "Smart Assist" },
  { value: "Local-first", label: "Memory" },
]

export const FEATURES = [
  {
    title: "FeatherFrame",
    description: "38g of all-day comfort. Precision-milled titanium alloy wrapped in a whisper-thin frame.",
    icon: "feather",
  },
  {
    title: "Whisper HUD",
    description: "Information appears near your vision, not in front of your life. Contextual, minimal, yours.",
    icon: "eye",
  },
  {
    title: "Context AI",
    description: "Translation, navigation, meeting capture, and memory support — all running locally on device.",
    icon: "cpu",
  },
  {
    title: "Privacy Pulse",
    description: "Visible privacy status you can trust. A gentle blue glow tells you and everyone around you: AI is active.",
    icon: "shield",
  },
]

export const CLOSING_HEADLINE = "The next screen is not in your hand."
export const CLOSING_SUBHEADLINE = "It is quietly layered over the world."
