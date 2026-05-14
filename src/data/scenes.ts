export interface SceneContent {
  id: string
  label: string
  lines: { type: string; text: string; highlight?: boolean }[]
  icon: string
}

export const SCENES: SceneContent[] = [
  {
    id: "commute",
    label: "Commute",
    icon: "navigation",
    lines: [
      { type: "route", text: "TURN LEFT IN 200M", highlight: true },
      { type: "translate", text: "TRANSLATING: EXIT → 出口" },
      { type: "info", text: "METRO LINE 2 · 3 MIN" },
      { type: "eta", text: "ETA 08:42" },
    ],
  },
  {
    id: "meeting",
    label: "Meeting",
    icon: "briefcase",
    lines: [
      { type: "brief", text: "MEETING BRIEF READY", highlight: true },
      { type: "decision", text: "DECISION: Beta test this Friday" },
      { type: "todo", text: "TODO: Send interaction draft before 18:00" },
      { type: "risk", text: "RISK: Scope may expand" },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    icon: "globe",
    lines: [
      { type: "identify", text: "IDENTIFIED: MODERNIST BUILDING", highlight: true },
      { type: "translate", text: "MENU TRANSLATION ACTIVE" },
      { type: "place", text: "CAFE NEARBY · 4.8 ★" },
      { type: "walk", text: "WALK 7 MIN" },
    ],
  },
  {
    id: "run",
    label: "Run",
    icon: "zap",
    lines: [
      { type: "pace", text: "PACE 5'42\" / KM" },
      { type: "hr", text: "HEART RATE 142 BPM", highlight: true },
      { type: "goal", text: "GOAL 72% COMPLETE" },
      { type: "rhythm", text: "KEEP CURRENT RHYTHM 8 MIN" },
    ],
  },
  {
    id: "create",
    label: "Create",
    icon: "sparkles",
    lines: [
      { type: "moment", text: "HIGHLIGHT MOMENT DETECTED", highlight: true },
      { type: "title", text: "TITLE: The city reboots at dusk" },
      { type: "memory", text: "MEMORY CARD SAVED" },
      { type: "post", text: "POST IDEA READY" },
    ],
  },
]
