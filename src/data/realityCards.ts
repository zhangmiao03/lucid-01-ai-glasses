export interface RealityCardData {
  id: string
  tab: string
  timestamp: string
  lines: string[]
  poetic: string
}

export const REALITY_CARDS: RealityCardData[] = [
  {
    id: "commute-card",
    tab: "Commute",
    timestamp: "2026-05-14 · 08:34 AM",
    lines: [
      "ROUTE CLEAR · 15 MIN ETA",
      "TRANSLATING: 2 LANGUAGE CUES",
      "MEMORY: PICK UP GROCERIES",
    ],
    poetic: "The city did not become faster. You finally learned how to read it.",
  },
  {
    id: "meeting-card",
    tab: "Meeting",
    timestamp: "2026-05-14 · 11:15 AM",
    lines: [
      "3 DECISIONS CAPTURED",
      "4 ACTION ITEMS ASSIGNED",
      "FOLLOW-UP SCHEDULED",
    ],
    poetic: "The meeting ended. The decisions were already waiting.",
  },
  {
    id: "travel-card",
    tab: "Travel",
    timestamp: "2026-05-14 · 02:50 PM",
    lines: [
      "LANDMARK: 7 IDENTIFIED",
      "MENU: 12 ITEMS TRANSLATED",
      "ROUTE: OPTIMAL PATH SET",
    ],
    poetic: "Language stopped being a wall. It became a subtitle.",
  },
  {
    id: "create-card",
    tab: "Create",
    timestamp: "2026-05-14 · 07:22 PM",
    lines: [
      "3 MOMENTS HIGHLIGHTED",
      "1 MEMORY CARD CREATED",
      "DRAFT READY FOR REVIEW",
    ],
    poetic: "Reality looked back and offered a title.",
  },
]
