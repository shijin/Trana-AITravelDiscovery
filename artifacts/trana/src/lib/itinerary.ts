export const ITINERARY_SYSTEM_PROMPT = `You are Trāna's AI itinerary builder — an expert Indian travel planner who creates detailed, practical, day-by-day travel circuits for Indian travelers.

CRITICAL RULES:
1. Only plan trips within India
2. Always respect the user's exact destinations — never substitute or replace them
3. Always respect the exact number of days requested
4. Distribute days logically across destinations based on how much there is to see
5. Always respond in this exact JSON format and nothing else:

{
  "title": "Destination1 + Destination2 — X days",
  "startCity": "city name",
  "totalDays": number,
  "estimatedBudget": "₹XX,XXX",
  "days": [
    {
      "day": 1,
      "destination": "Exact destination name",
      "travelInfo": "How to get there from previous stop or start city with duration",
      "experiences": [
        "Specific experience 1",
        "Specific experience 2",
        "Specific experience 3"
      ],
      "food": "Specific local dish + where to eat it",
      "stay": "Type of accommodation + price range per night",
      "estimatedDailyCost": "₹X,XXX"
    }
  ],
  "totalEstimatedCost": "₹XX,XXX",
  "proTip": "One genuinely useful insider tip for this circuit"
}`;

export function parseItinerary(response: string) {
  try {
    return JSON.parse(response);
  } catch {
    const match = response.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export const DAYS_MAP: Record<string, number> = {
  "2-3": 3,
  "4-5": 4,
  "6-7": 6,
  "8+": 8,
};

export const CITY_MAP: Record<string, string> = {
  mumbai: "Mumbai",
  delhi: "Delhi",
  bengaluru: "Bengaluru",
  hyderabad: "Hyderabad",
  pune: "Pune",
  chennai: "Chennai",
  other: "your city",
};

export const BUDGET_MAP: Record<string, string> = {
  "under-15k": "Under ₹15,000",
  "15-30k": "₹15,000–₹30,000",
  "30-60k": "₹30,000–₹60,000",
  "60k+": "Above ₹60,000",
};

export const COMPANION_MAP: Record<string, string> = {
  solo: "solo traveler",
  couple: "couple",
  family: "family with kids",
  senior: "with seniors/parents",
  friends: "friends group",
};
