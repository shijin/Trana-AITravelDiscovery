export interface Video {
  id: number;
  title: string;
  creator: string;
  views: string;
  companionType: string;
  thumbnail: string;
}

export interface Destination {
  id: number;
  name: string;
  state: string;
  region: string;
  heroGradient: [string, string];
  tags: string[];
  rationale: string;
  budgetBreakdown: { transport: number; stay: number; food: number };
  totalBudget: number;
  bestMonths: string[];
  currentSeason: string;
  activityLevel: string;
  companionTypes: string[];
  foodHighlights: string[];
  videos: Video[];
  medicalFacilities?: string;
}

export interface QuizOption {
  id: string;
  label: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Coorg",
    state: "Karnataka",
    region: "Western Ghats",
    heroGradient: ["#166534", "#15803d"],
    tags: ["Nature", "Quiet", "Hill Station"],
    rationale:
      "Perfect for switching off — misty hills, coffee estates, and zero tourist noise. You can walk at your own pace with no agenda.",
    budgetBreakdown: { transport: 3200, stay: 8000, food: 2500 },
    totalBudget: 13700,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["solo", "couple"],
    foodHighlights: ["Pandi curry", "Akki roti", "Filter coffee"],
    videos: [
      {
        id: 1,
        title: "Coorg in 3 days — solo travel guide",
        creator: "Nomadic Nisha",
        views: "284K",
        companionType: "solo",
        thumbnail: "coorg1",
      },
      {
        id: 2,
        title: "Coorg couple trip — hidden spots",
        creator: "Travel with Riya & Raj",
        views: "156K",
        companionType: "couple",
        thumbnail: "coorg2",
      },
    ],
  },
  {
    id: 2,
    name: "Hampi",
    state: "Karnataka",
    region: "North Karnataka",
    heroGradient: ["#b45309", "#d97706"],
    tags: ["Heritage", "Offbeat", "Couple-Friendly"],
    rationale:
      "Dramatic boulder landscapes, ancient temples, and boutique stays — romantic without being clichéd. Fewer crowds than you'd expect.",
    budgetBreakdown: { transport: 2800, stay: 7000, food: 2200 },
    totalBudget: 12000,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["couple", "solo"],
    foodHighlights: ["Millet dosa", "Banana lassi", "Local thali"],
    videos: [
      {
        id: 3,
        title: "Hampi couple travel — everything you need",
        creator: "Wandering Together",
        views: "312K",
        companionType: "couple",
        thumbnail: "hampi1",
      },
      {
        id: 4,
        title: "Hampi solo — 2 day itinerary",
        creator: "Solo Miles India",
        views: "198K",
        companionType: "solo",
        thumbnail: "hampi2",
      },
    ],
  },
  {
    id: 3,
    name: "Pondicherry",
    state: "Tamil Nadu",
    region: "Coromandel Coast",
    heroGradient: ["#1d4ed8", "#0891b2"],
    tags: ["Beach", "French Quarter", "Calm"],
    rationale:
      "A rare blend of French colonial architecture, quiet beaches, and excellent food. Perfect for couples who want culture without the chaos.",
    budgetBreakdown: { transport: 2400, stay: 9000, food: 3000 },
    totalBudget: 14400,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["couple", "solo", "senior"],
    foodHighlights: ["Crepes", "Seafood curry", "Banana blossom salad"],
    videos: [
      {
        id: 5,
        title: "Pondy couple guide — best of White Town",
        creator: "Travel with Meera",
        views: "445K",
        companionType: "couple",
        thumbnail: "pondy1",
      },
    ],
  },
  {
    id: 4,
    name: "Mysuru",
    state: "Karnataka",
    region: "South Karnataka",
    heroGradient: ["#6d28d9", "#4f46e5"],
    tags: ["Heritage", "Senior-Friendly", "Comfortable"],
    rationale:
      "Wide roads, excellent connectivity, world-famous palace, and a relaxed pace. Ideal for travelers who want culture without exertion.",
    budgetBreakdown: { transport: 1800, stay: 6000, food: 2000 },
    totalBudget: 9800,
    bestMonths: ["Sep", "Oct", "Nov", "Dec", "Jan"],
    currentSeason: "ideal",
    activityLevel: "low",
    medicalFacilities: "Manipal Hospital — 2.4 km",
    companionTypes: ["senior", "family", "couple"],
    foodHighlights: ["Mysuru pak", "Bisi bele bath", "Set dosa"],
    videos: [
      {
        id: 6,
        title: "Mysuru — the perfect senior-friendly trip",
        creator: "Family Travels India",
        views: "167K",
        companionType: "senior",
        thumbnail: "mysuru1",
      },
    ],
  },
  {
    id: 5,
    name: "Meghalaya",
    state: "Meghalaya",
    region: "Northeast India",
    heroGradient: ["#0f766e", "#16a34a"],
    tags: ["Nature", "Adventure", "Offbeat"],
    rationale:
      "Living root bridges, the wettest place on earth, and landscapes unlike anything in India. For travelers who want to be genuinely surprised.",
    budgetBreakdown: { transport: 8500, stay: 9000, food: 3000 },
    totalBudget: 20500,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "high",
    companionTypes: ["solo", "couple"],
    foodHighlights: ["Jadoh", "Dohneiiong", "Tungrymbai"],
    videos: [
      {
        id: 7,
        title: "Meghalaya — 5 days in the clouds",
        creator: "Northeast Explorer",
        views: "521K",
        companionType: "solo",
        thumbnail: "meg1",
      },
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How are you feeling right now?",
    subtitle: "Be honest — this shapes everything.",
    options: [
      { id: "exhausted", label: "Exhausted and need quiet", icon: "moon" },
      { id: "excited", label: "Excited and ready to explore", icon: "zap" },
      { id: "romantic", label: "In the mood for romance", icon: "heart" },
      { id: "curious", label: "Curious and want to discover", icon: "compass" },
    ],
  },
  {
    id: 2,
    question: "Who are you traveling with?",
    subtitle: "This helps us match the right vibe.",
    options: [
      { id: "solo", label: "Just me", icon: "user" },
      { id: "couple", label: "My partner", icon: "heart" },
      { id: "family", label: "Family with kids", icon: "users" },
      { id: "senior", label: "With parents or seniors", icon: "users" },
      { id: "friends", label: "Friends group", icon: "users" },
    ],
  },
  {
    id: 3,
    question: "How many days do you have?",
    subtitle: "We'll plan around your time.",
    options: [
      { id: "2-3", label: "2–3 days (quick escape)", icon: "zap" },
      { id: "4-5", label: "4–5 days (sweet spot)", icon: "calendar" },
      { id: "6-7", label: "6–7 days (proper holiday)", icon: "sun" },
      { id: "8+", label: "8+ days (go deep)", icon: "globe" },
    ],
  },
  {
    id: 4,
    question: "What's your total budget for this trip?",
    subtitle: "Transport + stay + food — all in.",
    options: [
      { id: "under-15k", label: "Under ₹15,000", icon: "dollar-sign" },
      { id: "15-30k", label: "₹15,000 – ₹30,000", icon: "dollar-sign" },
      { id: "30-60k", label: "₹30,000 – ₹60,000", icon: "dollar-sign" },
      { id: "60k+", label: "Above ₹60,000", icon: "award" },
    ],
  },
  {
    id: 5,
    question: "What kind of experience are you after?",
    subtitle: "Pick everything that feels right.",
    multiSelect: true,
    options: [
      { id: "nature", label: "Nature & outdoors", icon: "sun" },
      { id: "food", label: "Food & local culture", icon: "coffee" },
      { id: "heritage", label: "Heritage & history", icon: "book" },
      { id: "beach", label: "Beach & water", icon: "anchor" },
      { id: "adventure", label: "Adventure & trekking", icon: "triangle" },
      { id: "spiritual", label: "Spiritual & wellness", icon: "star" },
    ],
  },
  {
    id: 6,
    question: "How much walking are you comfortable with?",
    subtitle: "No judgment — we'll plan accordingly.",
    options: [
      { id: "low", label: "Minimal — comfortable & easy", icon: "truck" },
      { id: "moderate", label: "Moderate — some walking is fine", icon: "activity" },
      { id: "high", label: "High — I enjoy physical activity", icon: "trending-up" },
    ],
  },
  {
    id: 7,
    question: "Where are you traveling from?",
    subtitle: "We'll factor in flight time.",
    options: [
      { id: "mumbai", label: "Mumbai", icon: "map-pin" },
      { id: "delhi", label: "Delhi", icon: "map-pin" },
      { id: "bengaluru", label: "Bengaluru", icon: "map-pin" },
      { id: "hyderabad", label: "Hyderabad", icon: "map-pin" },
      { id: "pune", label: "Pune", icon: "map-pin" },
      { id: "chennai", label: "Chennai", icon: "map-pin" },
      { id: "other", label: "Other city", icon: "map-pin" },
    ],
  },
];

export const itineraryData = {
  title: "Karnataka in 5 days",
  startCity: "Hyderabad",
  totalBudget: 15000,
  days: [
    {
      day: 1,
      destination: "Hampi",
      travelTime: "7 hrs by bus from Hyderabad",
      experiences: [
        "Virupaksha Temple at sunrise",
        "Vittala Temple complex",
        "Hampi Bazaar walk",
      ],
      food: "Millet dosa at Mango Tree restaurant",
      stay: "Guesthouse near boulders — approx ₹800/night",
      cost: 2800,
    },
    {
      day: 2,
      destination: "Hampi",
      travelTime: "—",
      experiences: [
        "Royal Enclosure",
        "Lotus Mahal",
        "Sunset at Matanga Hill",
      ],
      food: "Banana lassi + local thali",
      stay: "Same guesthouse",
      cost: 1200,
    },
    {
      day: 3,
      destination: "Badami",
      travelTime: "2 hrs from Hampi",
      experiences: [
        "Badami cave temples",
        "Agastya Lake",
        "Bhutanatha temples",
      ],
      food: "Jowar roti at a local dhaba",
      stay: "Budget hotel near caves — approx ₹700/night",
      cost: 1800,
    },
    {
      day: 4,
      destination: "Aihole & Pattadakal",
      travelTime: "30 min from Badami",
      experiences: [
        "Aihole temple complex — 125 temples",
        "Pattadakal UNESCO site",
        "Sunset view from hilltop",
      ],
      food: "Packed lunch from Badami hotel",
      stay: "Return to Badami",
      cost: 900,
    },
    {
      day: 5,
      destination: "Return journey",
      travelTime: "8 hrs to Hyderabad",
      experiences: ["Morning at Badami fort", "Bus back to Hyderabad"],
      food: "Local breakfast before departure",
      stay: "—",
      cost: 1500,
    },
  ],
  totalCost: 14200,
};

export const initialChatMessage = {
  role: "ai" as const,
  text: "Hi! Tell me what kind of trip you're planning — where from, how many days, and what you're in the mood for. I'll build you a circuit.",
};
