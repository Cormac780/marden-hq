// ALL editable content lives in this file. Agents: change only this file (plus images in assets/moodboard/).
// Anything not given by Cormac is "TBC" — never invent facts.
window.MARDEN_DATA = {
  siteName: "Marden HQ",

  thesis: {
    headline: "Stop paying for marketing.",
    blocks: [
      { title: "The model", paragraphs: [
        "A $65 lifetime membership per phase or group. Phase 1 is about 20 brands; Phase 2 is a second group at another $65, and the groups upsell each other."
      ]},
      { title: "Where the profit is", paragraphs: [
        "Product margin is near zero. Profit comes from the membership fee."
      ]},
      { title: "Launch", paragraphs: [
        "Remote-first and content-led. Launch city: TBC (where I live at launch: Auckland/NZ if in Auckland, Australia if in Australia)."
      ]},
      { title: "Long-term vision", paragraphs: [
        "Hundreds of sub-brands, each a named product line with its own short-form content.",
        "They share platform, packaging, supply, and membership."
      ]}
    ]
  },

  roadmap: {
    exitTarget: "NZ$50M sale",
    stages: [
      { name: "Planning", current: true,
        done: "Open decisions are settled and the launch city is chosen (launch city: TBC).",
        unblocks: "Choosing the pilot city and opening Phase 1." },
      { name: "Pilot city",
        done: "The pilot reaches its member target (pilot preset is 1 city, 500 members). Success threshold: TBC.",
        unblocks: "Having real numbers to write the playbook from." },
      { name: "Playbook extraction",
        done: "What worked is written down so another city can repeat it. Format: TBC.",
        unblocks: "Opening city 2 without reinventing the launch." },
      { name: "Replication",
        done: "City 2, 3, 4… run from the playbook. The proven-playbook preset assumes 8 cities.",
        unblocks: "Evidence that results repeat across cities." },
      { name: "Proven playbook",
        done: "Results repeat across cities and trailing annual profit is on the books.",
        unblocks: "A credible sale process." },
      { name: "Sale", exit: true,
        done: "Sale completes at or above the target.",
        unblocks: "Nothing further. This is the exit." }
    ]
  },

  calculator: {
    defaults: { members: 500, cities: 8, fee: 65, attach: 45, currency: "NZD" },
    limits: { membersMax: 2000, citiesMin: 1, citiesMax: 30 },
    currencies: ["AUD", "NZD", "USD"],
    presets: [
      { name: "Pilot", members: 500, cities: 1 },
      { name: "8-city proven playbook", members: 500, cities: 8 },
      { name: "30-city scale", members: 500, cities: 30 }
    ],
    presetNote: "Presets use 500 members per city, the pilot figure. Change it with the slider.",
    matureNote: "450 members per month is a mature rate for a city (explainer only, not an input).",
    currencyNote: "Currency only changes the label. No exchange rates are applied.",
    explainers: [
      "The fee never subsidises an order.",
      "Every order breaks even on its own.",
      "Product margin is near zero, so fee revenue is the profit engine in this model."
    ]
  },

  finance: {
    target: 50000000,
    multipleMin: 10, multipleMax: 15, multipleDefault: 12.5,
    scenarioDefault: "Base",
    // trailing annual profit in NZ$ per scenario. null = TBC (type a number in the page).
    scenarios: [
      { name: "Conservative", profit: null },
      { name: "Base", profit: 4000000 },
      { name: "Bull", profit: null }
    ],
    scenarioNote: "Base uses the $4.0M worked example from the brief. Conservative and Bull profit: TBC."
  },

  // One list feeds both the Financial model notes panel and the Decision log.
  decisions: [
    { title: "Shipping", detail: "Exact cost recovery vs free over $50.", status: "open", lean: "TBC" },
    { title: "Brand architecture", detail: "One master brand vs micro-brands.", status: "open", lean: "TBC" },
    { title: "Referral pay", detail: "Status/access only. No cash per recruit without written legal clearance.", status: "open", lean: "TBC" },
    { title: "Legal definition of “lifetime”", detail: "What “lifetime” means in the membership terms.", status: "open", lean: "TBC" },
    { title: "Launch city", detail: "Where I live at launch (Auckland/NZ or Australia).", status: "open", lean: "TBC" }
  ],

  products: [
    { wave: "Wave 1 — test", items: [
      { name: "Tallow balm (candidate #1)", gate: "TBC", status: "idea" },
      { name: "Body oil / butter", gate: "TBC", status: "idea" },
      { name: "Soap", gate: "TBC", status: "idea" },
      { name: "Candle", gate: "TBC", status: "idea" }
    ]},
    { wave: "Wave 2", items: [
      { name: "Electrolytes", gate: "Gated on AU regulatory classification", status: "idea" },
      { name: "Magnesium drink", gate: "Gated on AU regulatory classification", status: "idea" },
      { name: "Coffee concentrate", gate: "TBC", status: "idea" },
      { name: "Mushroom latte", gate: "TBC", status: "idea" }
    ]},
    { wave: "Wave 3", items: [
      { name: "Manuka + clay masks", gate: "TBC", status: "idea" },
      { name: "Perfume", gate: "TBC", status: "idea" },
      { name: "Aperitif", gate: "TBC", status: "idea" },
      { name: "Toothpaste", gate: "TBC", status: "idea" }
    ]}
  ],

  // Add an image to assets/moodboard/ and one entry here.
  // Masonry grid, filled left to right. Each item: image + a short lowercase caption. No brand names in text.
  moodboard: [
    { image: "assets/moodboard/01.png", caption: "manuka honey mask" },
    { image: "assets/moodboard/02.png", caption: "body oil" },
    { image: "assets/moodboard/03.png", caption: "tallow balm" },
    { image: "assets/moodboard/04.png", caption: "tallow balm + milk" },
    { image: "assets/moodboard/05.png", caption: "body oil" },
    { image: "assets/moodboard/06.png", caption: "face oil" },
    { image: "assets/moodboard/07.png", caption: "deodorant" },
    { image: "assets/moodboard/08.png", caption: "mouth wash" },
    { image: "assets/moodboard/09.png", caption: "perfume" },
    { image: "assets/moodboard/10.png", caption: "perfume" },
    { image: "assets/moodboard/11.png", caption: "lip balm" },
    { image: "assets/moodboard/12.png", caption: "eye m" },
    { image: "assets/moodboard/13.png", caption: "manuka hand cream" },
    { image: "assets/moodboard/14.png", caption: "shampoo + conditioner" },
    { image: "assets/moodboard/15.png", caption: "candle" },
    { image: "assets/moodboard/16.png", caption: "beauty cream" },
    { image: "assets/moodboard/17.png", caption: "electrolyte concentrate" },
    { image: "assets/moodboard/18.png", caption: "soap bar" },
    { image: "assets/moodboard/19.png", caption: "perfume" },
    { image: "assets/moodboard/20.png", caption: "dental care" }
  ]
};
