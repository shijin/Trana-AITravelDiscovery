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
  isDynamic?: boolean;
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

export interface QuizAnswers {
  mood?: string;
  companion?: string;
  budget?: string;
  activity?: string;
  interests?: string[];
  city?: string;
  duration?: string;
}

export const destinations: Destination[] = [
  // ── Original 5 ──────────────────────────────────────────────────────────────
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
      { id: 1, title: "Coorg in 3 days — solo travel guide", creator: "Nomadic Nisha", views: "284K", companionType: "solo", thumbnail: "coorg1" },
      { id: 2, title: "Coorg couple trip — hidden spots", creator: "Travel with Riya & Raj", views: "156K", companionType: "couple", thumbnail: "coorg2" },
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
      { id: 3, title: "Hampi couple travel — everything you need", creator: "Wandering Together", views: "312K", companionType: "couple", thumbnail: "hampi1" },
      { id: 4, title: "Hampi solo — 2 day itinerary", creator: "Solo Miles India", views: "198K", companionType: "solo", thumbnail: "hampi2" },
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
      { id: 5, title: "Pondy couple guide — best of White Town", creator: "Travel with Meera", views: "445K", companionType: "couple", thumbnail: "pondy1" },
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
      { id: 6, title: "Mysuru — the perfect senior-friendly trip", creator: "Family Travels India", views: "167K", companionType: "senior", thumbnail: "mysuru1" },
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
      { id: 7, title: "Meghalaya — 5 days in the clouds", creator: "Northeast Explorer", views: "521K", companionType: "solo", thumbnail: "meg1" },
    ],
  },

  // ── 15 New destinations ─────────────────────────────────────────────────────
  {
    id: 6,
    name: "Munnar",
    state: "Kerala",
    region: "Western Ghats",
    heroGradient: ["#15803d", "#10b981"],
    tags: ["Tea Estates", "Nature", "Cool Climate"],
    rationale:
      "High-altitude tea country with misty mornings and genuine quiet. One of the few places in India that truly feels removed from everything.",
    budgetBreakdown: { transport: 4000, stay: 10000, food: 3000 },
    totalBudget: 17000,
    bestMonths: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["couple", "solo", "senior"],
    foodHighlights: ["Puttu and kadala curry", "Kerala banana chips", "Filter coffee"],
    videos: [
      { id: 8, title: "Munnar in 3 days — complete guide", creator: "Kerala Wanderer", views: "389K", companionType: "couple", thumbnail: "from-green-800 to-green-600" },
    ],
  },
  {
    id: 7,
    name: "Alleppey",
    state: "Kerala",
    region: "Backwaters",
    heroGradient: ["#0e7490", "#14b8a6"],
    tags: ["Backwaters", "Houseboat", "Serene"],
    rationale:
      "The houseboat experience on Vembanad Lake is one of the most uniquely Indian travel experiences that exists. Calm, slow, and completely unlike anything else.",
    budgetBreakdown: { transport: 3500, stay: 12000, food: 3500 },
    totalBudget: 19000,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["couple", "senior", "family"],
    foodHighlights: ["Karimeen pollichathu", "Appam and stew", "Prawn moilee"],
    videos: [
      { id: 9, title: "Alleppey houseboat experience", creator: "Backwater Dreams", views: "612K", companionType: "couple", thumbnail: "from-cyan-800 to-teal-600" },
    ],
  },
  {
    id: 8,
    name: "Varkala",
    state: "Kerala",
    region: "Thiruvananthapuram Coast",
    heroGradient: ["#2563eb", "#06b6d4"],
    tags: ["Beach", "Cliff Views", "Offbeat"],
    rationale:
      "A cliff-top beach town that manages to be both dramatic and unhurried. Far less chaotic than Goa with genuinely better seafood.",
    budgetBreakdown: { transport: 3800, stay: 7000, food: 2500 },
    totalBudget: 13300,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["solo", "couple"],
    foodHighlights: ["Fresh grilled seafood", "Kerala fish curry", "Coconut water"],
    videos: [
      { id: 10, title: "Varkala — the beach Goa forgot to build", creator: "Coastal India", views: "278K", companionType: "solo", thumbnail: "from-blue-800 to-cyan-600" },
    ],
  },
  {
    id: 9,
    name: "Gokarna",
    state: "Karnataka",
    region: "North Karnataka Coast",
    heroGradient: ["#d97706", "#f97316"],
    tags: ["Beach", "Spiritual", "Offbeat"],
    rationale:
      "A temple town that also has some of Karnataka's best beaches. Half pilgrimage, half beach escape — completely its own thing.",
    budgetBreakdown: { transport: 2800, stay: 5000, food: 2000 },
    totalBudget: 9800,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["solo", "couple", "friends"],
    foodHighlights: ["Fresh coconut fish curry", "Gokarna thali", "Beach shack seafood"],
    videos: [
      { id: 11, title: "Gokarna — the anti-Goa beach trip", creator: "Karnataka Roads", views: "334K", companionType: "solo", thumbnail: "from-amber-800 to-orange-600" },
    ],
  },
  {
    id: 10,
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "Himalayan Foothills",
    heroGradient: ["#4f46e5", "#3b82f6"],
    tags: ["Spiritual", "Adventure", "Yoga"],
    rationale:
      "The yoga capital of the world sits where the Ganges emerges from the Himalayas. Spiritual depth, river rafting, and a genuinely international energy.",
    budgetBreakdown: { transport: 4500, stay: 5000, food: 2000 },
    totalBudget: 11500,
    bestMonths: ["Feb", "Mar", "Apr", "Sep", "Oct", "Nov"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["solo", "couple", "friends"],
    foodHighlights: ["Pure veg thali", "Chai at the ghats", "Rhum Doodle cafe"],
    videos: [
      { id: 12, title: "Rishikesh — more than just yoga", creator: "North India Diaries", views: "487K", companionType: "solo", thumbnail: "from-indigo-800 to-blue-600" },
    ],
  },
  {
    id: 11,
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "Gangetic Plain",
    heroGradient: ["#ea580c", "#eab308"],
    tags: ["Spiritual", "Heritage", "Cultural"],
    rationale:
      "One of the oldest living cities in the world. The Ganga Aarti at dawn is not a tourist activity — it is something that genuinely moves you regardless of faith.",
    budgetBreakdown: { transport: 4000, stay: 6000, food: 2500 },
    totalBudget: 12500,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["solo", "couple", "family", "senior"],
    foodHighlights: ["Kachori sabzi", "Banarasi paan", "Malaiyo in winter"],
    videos: [
      { id: 13, title: "Varanasi — a morning on the ghats", creator: "India Untouched", views: "892K", companionType: "solo", thumbnail: "from-orange-800 to-yellow-600" },
    ],
  },
  {
    id: 12,
    name: "Jaipur",
    state: "Rajasthan",
    region: "Eastern Rajasthan",
    heroGradient: ["#db2777", "#f43f5e"],
    tags: ["Heritage", "Forts", "Royalty"],
    rationale:
      "The Pink City delivers on its reputation — Amber Fort alone is worth the trip. Best experienced slowly over 3 days with a good guide.",
    budgetBreakdown: { transport: 5000, stay: 10000, food: 3000 },
    totalBudget: 18000,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["couple", "family", "solo", "senior"],
    foodHighlights: ["Dal baati churma", "Laal maas", "Ghevar sweet"],
    videos: [
      { id: 14, title: "Jaipur in 3 days — the complete guide", creator: "Rajasthan Diaries", views: "734K", companionType: "couple", thumbnail: "from-pink-800 to-rose-600" },
    ],
  },
  {
    id: 13,
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    region: "Trans-Himalaya",
    heroGradient: ["#475569", "#6b7280"],
    tags: ["High Altitude", "Adventure", "Offbeat"],
    rationale:
      "A cold desert at 12,000 feet with ancient monasteries, surreal landscapes, and zero phone signal. For travelers who want to genuinely disappear.",
    budgetBreakdown: { transport: 9000, stay: 8000, food: 3000 },
    totalBudget: 20000,
    bestMonths: ["Jun", "Jul", "Aug", "Sep"],
    currentSeason: "off-season",
    activityLevel: "high",
    companionTypes: ["solo", "friends"],
    foodHighlights: ["Thukpa noodle soup", "Butter tea", "Tibetan momos"],
    videos: [
      { id: 15, title: "Spiti Valley — the road to nowhere", creator: "Mountain Wanderer", views: "1.2M", companionType: "solo", thumbnail: "from-slate-800 to-gray-600" },
    ],
  },
  {
    id: 14,
    name: "Andaman Islands",
    state: "Andaman & Nicobar",
    region: "Bay of Bengal",
    heroGradient: ["#0ea5e9", "#60a5fa"],
    tags: ["Beach", "Snorkeling", "Remote"],
    rationale:
      "Arguably the most beautiful beaches in India — Radhanagar is consistently ranked among Asia's best. The water color is unlike anything on the mainland.",
    budgetBreakdown: { transport: 12000, stay: 14000, food: 5000 },
    totalBudget: 31000,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["couple", "solo", "friends"],
    foodHighlights: ["Fresh lobster", "Coconut prawn curry", "Fish tikka"],
    videos: [
      { id: 16, title: "Andaman — India's best kept secret", creator: "Island Hopper India", views: "956K", companionType: "couple", thumbnail: "from-sky-800 to-blue-600" },
    ],
  },
  {
    id: 15,
    name: "Pushkar",
    state: "Rajasthan",
    region: "Central Rajasthan",
    heroGradient: ["#ca8a04", "#f59e0b"],
    tags: ["Spiritual", "Offbeat", "Desert"],
    rationale:
      "One of the only Brahma temples in the world sits beside a sacred lake surrounded by 52 bathing ghats. Quirky, spiritual, and surprisingly cosmopolitan.",
    budgetBreakdown: { transport: 5500, stay: 5000, food: 2000 },
    totalBudget: 12500,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["solo", "couple", "senior"],
    foodHighlights: ["Malpua", "Dal baati", "Lassi at Sunset Cafe"],
    videos: [
      { id: 17, title: "Pushkar — the town that surprises everyone", creator: "Rajasthan Soul", views: "312K", companionType: "solo", thumbnail: "from-yellow-800 to-amber-600" },
    ],
  },
  {
    id: 16,
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    region: "Eastern Himalayas",
    heroGradient: ["#65a30d", "#22c55e"],
    tags: ["Offbeat", "Tribal Culture", "Nature"],
    rationale:
      "A UNESCO World Heritage tentative site with Apatani tribal culture, pine forests, and rice paddy landscapes. One of Northeast India's best-kept secrets.",
    budgetBreakdown: { transport: 11000, stay: 6000, food: 2500 },
    totalBudget: 19500,
    bestMonths: ["Mar", "Apr", "May", "Sep", "Oct", "Nov"],
    currentSeason: "ideal",
    activityLevel: "moderate",
    companionTypes: ["solo", "couple"],
    foodHighlights: ["Apong rice beer", "Bamboo shoot pork", "Fish in banana leaf"],
    videos: [
      { id: 18, title: "Ziro Valley — India's hidden paradise", creator: "Northeast Expeditions", views: "445K", companionType: "solo", thumbnail: "from-lime-800 to-green-600" },
    ],
  },
  {
    id: 17,
    name: "Ooty",
    state: "Tamil Nadu",
    region: "Nilgiri Hills",
    heroGradient: ["#059669", "#14b8a6"],
    tags: ["Hill Station", "Tea Gardens", "Family"],
    rationale:
      "The Nilgiri Mountain Railway is a UNESCO World Heritage experience. Ooty rewards those who go beyond the main town into the tea estate roads.",
    budgetBreakdown: { transport: 3000, stay: 7000, food: 2500 },
    totalBudget: 12500,
    bestMonths: ["Apr", "May", "Jun", "Sep", "Oct", "Nov"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["family", "senior", "couple"],
    foodHighlights: ["Ooty varkey biscuit", "Fresh Nilgiri tea", "Homemade chocolate"],
    videos: [
      { id: 19, title: "Ooty family trip — what to actually do", creator: "South India Travels", views: "521K", companionType: "family", thumbnail: "from-emerald-800 to-teal-600" },
    ],
  },
  {
    id: 18,
    name: "Kasol",
    state: "Himachal Pradesh",
    region: "Parvati Valley",
    heroGradient: ["#7c3aed", "#a855f7"],
    tags: ["Mountains", "Backpacking", "Nature"],
    rationale:
      "A tiny village in the Parvati Valley surrounded by pine forests and Himalayan peaks. The starting point for some of India's best high-altitude treks.",
    budgetBreakdown: { transport: 5000, stay: 4000, food: 2000 },
    totalBudget: 11000,
    bestMonths: ["Mar", "Apr", "May", "Jun", "Sep", "Oct"],
    currentSeason: "ideal",
    activityLevel: "high",
    companionTypes: ["solo", "friends"],
    foodHighlights: ["Israeli food (hummus, falafel)", "Maggi at trail stops", "Himachali trout"],
    videos: [
      { id: 20, title: "Kasol — the backpacker's Himalayan base", creator: "Himalayan Trails", views: "678K", companionType: "solo", thumbnail: "from-violet-800 to-purple-600" },
    ],
  },
  {
    id: 19,
    name: "Chettinad",
    state: "Tamil Nadu",
    region: "Sivaganga District",
    heroGradient: ["#b91c1c", "#ea580c"],
    tags: ["Cuisine", "Heritage", "Offbeat"],
    rationale:
      "The cuisine capital of Tamil Nadu — Chettinad cooking is one of India's most complex and underrated culinary traditions. The heritage mansions are extraordinary.",
    budgetBreakdown: { transport: 3500, stay: 6000, food: 2500 },
    totalBudget: 12000,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["couple", "solo", "senior"],
    foodHighlights: ["Chettinad chicken curry", "Kavuni arisi sweet", "Kuzhi paniyaram"],
    videos: [
      { id: 21, title: "Chettinad — eating through Tamil Nadu's heritage", creator: "Food Roads India", views: "289K", companionType: "couple", thumbnail: "from-red-800 to-orange-600" },
    ],
  },
  {
    id: 20,
    name: "Khajuraho",
    state: "Madhya Pradesh",
    region: "Bundelkhand",
    heroGradient: ["#57534e", "#d97706"],
    tags: ["Heritage", "UNESCO", "Sculpture"],
    rationale:
      "The Chandela temple complex is one of India's great architectural achievements — intricate, bold, and unlike anything else in the country.",
    budgetBreakdown: { transport: 5000, stay: 7000, food: 2500 },
    totalBudget: 14500,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["couple", "solo", "senior"],
    foodHighlights: ["Dal bafla", "Bhutte ki kees", "Shikanjvi"],
    videos: [
      { id: 22, title: "Khajuraho — understanding the temples", creator: "Heritage India", views: "198K", companionType: "couple", thumbnail: "from-stone-800 to-amber-700" },
    ],
  },
  {
    id: 21,
    name: "Shillong",
    state: "Meghalaya",
    region: "Northeast India",
    heroGradient: ["#1d4ed8", "#4338ca"],
    tags: ["Hill Station", "Music City", "Northeast"],
    rationale:
      "The Scotland of the East — colonial architecture, an incredible live music scene, and a cool climate year-round. One of India's most underrated cities.",
    budgetBreakdown: { transport: 7000, stay: 6000, food: 2500 },
    totalBudget: 15500,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["solo", "couple", "friends"],
    foodHighlights: ["Jadoh rice and meat", "Dohneiiong pork curry", "Pumaloi steamed rice cake", "Kwai betel nut"],
    videos: [
      { id: 23, title: "Shillong — India's rock music capital", creator: "Northeast Explorer", views: "312K", companionType: "solo", thumbnail: "from-blue-800 to-indigo-600" },
    ],
  },
  {
    id: 22,
    name: "Cherrapunji",
    state: "Meghalaya",
    region: "Northeast India",
    heroGradient: ["#166534", "#0d9488"],
    tags: ["Living Root Bridges", "Waterfalls", "Nature"],
    rationale:
      "Home to the famous double-decker living root bridges and some of the most dramatic waterfall landscapes in Asia. Genuinely otherworldly.",
    budgetBreakdown: { transport: 8000, stay: 5000, food: 2000 },
    totalBudget: 15000,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "high",
    companionTypes: ["solo", "couple", "friends"],
    foodHighlights: ["Jadoh", "Nakham bitchi fish curry", "Local wildflower honey"],
    videos: [
      { id: 24, title: "Cherrapunji — living root bridges & waterfalls", creator: "Northeast Expeditions", views: "478K", companionType: "solo", thumbnail: "from-green-800 to-teal-600" },
    ],
  },
  {
    id: 23,
    name: "Dawki",
    state: "Meghalaya",
    region: "Northeast India",
    heroGradient: ["#0891b2", "#3b82f6"],
    tags: ["Crystal Clear River", "Offbeat", "Nature"],
    rationale:
      "The Umngot River at Dawki is so transparent you can see the riverbed from a boat — one of India's most photographed natural wonders and completely worth the journey.",
    budgetBreakdown: { transport: 8500, stay: 4000, food: 2000 },
    totalBudget: 14500,
    bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    currentSeason: "ideal",
    activityLevel: "low",
    companionTypes: ["solo", "couple", "friends"],
    foodHighlights: ["Jadoh rice and pork", "Tungrymbai fermented soybean", "Smoked river fish"],
    videos: [
      { id: 25, title: "Dawki — India's most transparent river", creator: "Northeast Roads", views: "634K", companionType: "couple", thumbnail: "from-cyan-800 to-blue-600" },
    ],
  },
];

export function getRecommendations(quizAnswers: QuizAnswers): Destination[] {
  const budgetMap: Record<string, number> = {
    "under-15k": 15000,
    "15-30k": 30000,
    "30-60k": 60000,
    "60k+": 999999,
  };
  const maxBudget = budgetMap[quizAnswers.budget || ""] || 30000;

  const scored = destinations.map((dest) => {
    let score = 0;

    if (dest.totalBudget <= maxBudget) score += 30;
    else if (dest.totalBudget <= maxBudget * 1.2) score += 15;

    if (quizAnswers.companion && dest.companionTypes.includes(quizAnswers.companion)) score += 25;

    if (quizAnswers.activity) {
      if (dest.activityLevel === quizAnswers.activity) score += 20;
      else if (quizAnswers.activity === "moderate" && dest.activityLevel === "low") score += 10;
    }

    if (quizAnswers.interests && quizAnswers.interests.length > 0) {
      const tagMatch = dest.tags.some((tag) =>
        quizAnswers.interests!.some(
          (interest) =>
            tag.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (tagMatch) score += 25;
    }

    if (dest.currentSeason === "ideal") score += 10;

    return { ...dest, score };
  });

  return scored
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, 5);
}

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
      experiences: ["Virupaksha Temple at sunrise", "Vittala Temple complex", "Hampi Bazaar walk"],
      food: "Millet dosa at Mango Tree restaurant",
      stay: "Guesthouse near boulders — approx ₹800/night",
      cost: 2800,
    },
    {
      day: 2,
      destination: "Hampi",
      travelTime: "—",
      experiences: ["Royal Enclosure", "Lotus Mahal", "Sunset at Matanga Hill"],
      food: "Banana lassi + local thali",
      stay: "Same guesthouse",
      cost: 1200,
    },
    {
      day: 3,
      destination: "Badami",
      travelTime: "2 hrs from Hampi",
      experiences: ["Badami cave temples", "Agastya Lake", "Bhutanatha temples"],
      food: "Jowar roti at a local dhaba",
      stay: "Budget hotel near caves — approx ₹700/night",
      cost: 1800,
    },
    {
      day: 4,
      destination: "Aihole & Pattadakal",
      travelTime: "30 min from Badami",
      experiences: ["Aihole temple complex — 125 temples", "Pattadakal UNESCO site", "Sunset view from hilltop"],
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
