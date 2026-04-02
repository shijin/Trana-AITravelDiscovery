import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Bookmark, MapPin, Clock, DollarSign, Utensils, Bed, Bus } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

interface DestInfo {
  experiences: string[];
  food: string;
  stay: string;
  travelNote: string;
  costPerDay: number;
}

const destinationData: Record<string, DestInfo> = {
  coorg: {
    experiences: ["Abbey Falls trek", "Raja's Seat viewpoint", "Coffee estate walk", "Namdroling Monastery visit"],
    food: "Pandi curry, kadambuttu, and bamboo shoot pickle at local homes",
    stay: "Coffee estate resort or jungle villa — ₹2000–4000/night",
    travelNote: "5 hrs from Bengaluru by road via NH275",
    costPerDay: 2500,
  },
  hampi: {
    experiences: ["Virupaksha Temple at sunrise", "Vittala Temple complex and stone chariot", "Sunset at Matanga Hill", "Royal Enclosure and Lotus Mahal", "Boulder hopping in Hippie Island"],
    food: "Millet dosa at Mango Tree restaurant, banana lassi at Gopi rooftop",
    stay: "Guesthouse near boulders — ₹700–1200/night",
    travelNote: "3 hrs from Gokarna, 7 hrs overnight bus from Hyderabad",
    costPerDay: 1500,
  },
  gokarna: {
    experiences: ["Kudle Beach sunrise walk", "Om Beach afternoon", "Mahabaleshwar Temple visit", "Half Moon Beach hike — 45 min trek", "Paradise Beach for sunset"],
    food: "Fresh coconut fish curry at Om Beach shacks, Namaste Cafe for breakfast",
    stay: "Beach guesthouse or Om Beach resort — ₹600–1500/night",
    travelNote: "Overnight bus from Goa or Bengaluru. 3 hrs from Hampi by road.",
    costPerDay: 1200,
  },
  munnar: {
    experiences: ["Tea plantation sunrise walk", "Eravikulam National Park Nilgiri tahr spotting", "Top Station viewpoint", "Mattupetty Dam boat ride"],
    food: "Puttu and kadala curry, fresh tea tasting at KDHP estate",
    stay: "Plantation stay or tea estate bungalow — ₹2000–3500/night",
    travelNote: "4 hrs from Kochi, scenic drive via Adimali",
    costPerDay: 2000,
  },
  alleppey: {
    experiences: ["Houseboat cruise on backwaters", "Alappuzha Beach sunrise", "Marari Beach cycling", "Kuttanad paddy fields boat ride"],
    food: "Karimeen pollichathu, prawn moilee, and toddy at a backwater shack",
    stay: "Houseboat overnight stay — ₹4000–8000 (full boat)",
    travelNote: "1.5 hrs from Kochi by road or ferry",
    costPerDay: 3000,
  },
  pondicherry: {
    experiences: ["French Quarter morning walk", "Auroville Matrimandir meditation", "Promenade Beach evening", "Sri Aurobindo Ashram visit"],
    food: "Crepes at Le Cafe, French bakery breakfast, Tamil thali at Le Club",
    stay: "Heritage guesthouse in French Quarter — ₹1500–3000/night",
    travelNote: "3 hrs from Chennai by road or bus",
    costPerDay: 1800,
  },
  mysuru: {
    experiences: ["Mysuru Palace evening illumination", "Chamundi Hill temple hike", "Devaraja Market spice walk", "Brindavan Gardens fountain show"],
    food: "Mysuru pak, set dosa at Vinayaka Mylari, obbattu at local sweet shops",
    stay: "Heritage hotel near palace — ₹1500–3000/night",
    travelNote: "3 hrs from Bengaluru by express bus or train",
    costPerDay: 1800,
  },
  ooty: {
    experiences: ["Nilgiri Mountain Railway toy train", "Ooty Lake boating", "Botanical Gardens morning walk", "Doddabetta Peak viewpoint"],
    food: "Fresh homemade chocolate, varkey bread at Nilgiris bakery",
    stay: "Colonial-style heritage hotel — ₹1800–3500/night",
    travelNote: "5 hrs from Bengaluru, 3 hrs from Coimbatore",
    costPerDay: 2000,
  },
  jaisalmer: {
    experiences: ["Jaisalmer Fort at sunrise", "Sam Sand Dunes camel safari", "Patwon Ki Haveli", "Desert camping overnight"],
    food: "Dal baati churma, ker sangri sabzi",
    stay: "Desert camp or fort haveli — ₹1500–3000/night",
    travelNote: "5 hrs from Jodhpur by road",
    costPerDay: 2500,
  },
  udaipur: {
    experiences: ["Lake Pichola boat ride", "City Palace museum", "Sunset at Ambrai Ghat", "Bagore Ki Haveli folk show"],
    food: "Dal baati at Santosh Restaurant, rooftop dining overlooking the lake",
    stay: "Lake view heritage hotel — ₹2000–5000/night",
    travelNote: "2.5 hrs from Chittorgarh, connected by train and flight",
    costPerDay: 2800,
  },
  jaipur: {
    experiences: ["Amber Fort sunrise elephant ride", "Hawa Mahal sunrise photography", "Jantar Mantar astronomical park", "Johari Bazaar gems and textiles"],
    food: "Laal maas, dal baati at Chokhi Dhani, lassi at Lassiwala",
    stay: "Heritage haveli hotel — ₹2000–5000/night",
    travelNote: "5 hrs from Delhi by road, well connected by train",
    costPerDay: 2500,
  },
  ladakh: {
    experiences: ["Pangong Lake sunrise", "Nubra Valley camel ride", "Thiksey Monastery morning prayers", "Magnetic Hill", "Zanskar River rafting"],
    food: "Skyu pasta, Thukpa, butter tea at local cafes",
    stay: "Homestay in Leh — ₹800–1500/night",
    travelNote: "Fly to Leh from Delhi or Srinagar. Acclimatize for 1 full day before activities.",
    costPerDay: 2200,
  },
  spiti: {
    experiences: ["Key Monastery", "Chandratal Lake", "Kaza town walk", "Pin Valley National Park"],
    food: "Thukpa and butter tea at local dhabas",
    stay: "Homestay in Kaza — ₹600–1000/night",
    travelNote: "Accessible June–September only, via Shimla or Manali",
    costPerDay: 1800,
  },
  darjeeling: {
    experiences: ["Tiger Hill sunrise over Kanchenjunga", "Darjeeling Himalayan Railway toy train", "Tea estate walk and tasting", "Batasia Loop viewpoint"],
    food: "Darjeeling first flush tea, momos at Glenarys bakery",
    stay: "Heritage hotel with mountain view — ₹1500–3000/night",
    travelNote: "3 hrs from Siliguri NJP station by toy train or road",
    costPerDay: 2000,
  },
  andaman: {
    experiences: ["Radhanagar Beach", "Cellular Jail", "Snorkeling at Elephant Beach", "Neil Island day trip"],
    food: "Fresh grilled lobster at beachside shacks",
    stay: "Beach resort — ₹2500–4000/night",
    travelNote: "Fly from Chennai, Kolkata or Delhi",
    costPerDay: 3500,
  },
  kochi: {
    experiences: ["Fort Kochi Chinese fishing nets at dawn", "Mattancherry Dutch Palace", "Jewish Quarter Synagogue Lane walk", "Kerala Kathakali performance evening"],
    food: "Karimeen pollichathu, appam and stew, seafood at Fort House restaurant",
    stay: "Heritage homestay in Fort Kochi — ₹1800–3500/night",
    travelNote: "Well connected by flight from all metros",
    costPerDay: 2500,
  },
  manali: {
    experiences: ["Solang Valley snow activities", "Rohtang Pass (permit required)", "Old Manali village walk", "Hadimba Temple forest walk"],
    food: "Sidu bread with ghee, trout fish at local dhabas",
    stay: "Mountain view guesthouse — ₹800–2000/night",
    travelNote: "10 hrs from Chandigarh by road, 14 hrs from Delhi",
    costPerDay: 2000,
  },
  shimla: {
    experiences: ["The Ridge morning walk", "Mall Road shopping", "Jakhu Temple monkey trail", "Toy train from Kalka"],
    food: "Chha gosht, sidu, Tibetan momos at local joints",
    stay: "Heritage hotel on Mall Road — ₹1500–3500/night",
    travelNote: "5 hrs from Chandigarh, toy train from Kalka",
    costPerDay: 2000,
  },
  varanasi: {
    experiences: ["Ganga Aarti at Dasaswamedh Ghat", "Sunrise boat ride on the Ganges", "Vishwanath Temple darshan", "Sarnath Buddhist ruins"],
    food: "Kachori sabzi at Kashi Chat Bhandar, thandai at Pehelwan Lassi",
    stay: "Heritage guesthouse near the ghats — ₹800–2000/night",
    travelNote: "Connected by train and flight from major cities",
    costPerDay: 1500,
  },
  goa: {
    experiences: ["Palolem Beach morning walk", "Old Goa Portuguese churches", "Spice plantation tour", "Sunset cruise on Mandovi river"],
    food: "Goan fish curry, prawn balchao, bebinca dessert",
    stay: "Beach shack or boutique resort — ₹1500–5000/night",
    travelNote: "Well connected by flight and Konkan Railway",
    costPerDay: 3000,
  },
  mcleodganj: {
    experiences: ["Namgyal Monastery morning prayers", "Bhagsu Nag waterfall hike", "Triund trek — 9 km", "Tibetan Market handicrafts"],
    food: "Tibetan momos, thukpa, apple cake at German bakeries",
    stay: "Cosy guesthouse with mountain view — ₹600–1500/night",
    travelNote: "6 hrs from Chandigarh, 14 hrs from Delhi by bus",
    costPerDay: 1500,
  },
  jodhpur: {
    experiences: ["Mehrangarh Fort sunrise", "Clock Tower market walk", "Umaid Bhawan Palace museum", "Bishnoi village safari"],
    food: "Mirchi bada, mawa kachori at Janta Sweet Home",
    stay: "Blue city haveli — ₹1500–3500/night",
    travelNote: "6 hrs from Jaipur, 5 hrs from Jaisalmer",
    costPerDay: 2200,
  },
};

function findDestinationData(name: string): DestInfo | null {
  const cleaned = name.toLowerCase().trim().replace(/\s+/g, "");
  if (destinationData[cleaned]) return destinationData[cleaned];
  const keys = Object.keys(destinationData);
  const partial = keys.find((k) => k.includes(cleaned) || cleaned.includes(k));
  if (partial) return destinationData[partial];
  return null;
}

function buildFallback(name: string): DestInfo {
  return {
    experiences: [
      `Explore ${name}'s old town and local markets`,
      `Visit the most popular viewpoint or landmark`,
      `Sunset at the best local spot`,
      `Morning walk through the historic area`,
    ],
    food: `Ask locals for the best regional dish in ${name}`,
    stay: `Mid-range hotel or guesthouse — ₹800–1500/night`,
    travelNote: `Check bus or train connectivity from previous stop`,
    costPerDay: 1500,
  };
}

interface BuiltDay {
  day: number;
  destination: string;
  experiences: string[];
  food: string;
  stay: string;
  travelNote: string;
  cost: number;
}

function buildItinerary(destNames: string[], totalDays: number, startCity: string) {
  const days: BuiltDay[] = [];
  const n = destNames.length;
  const daysPerDest = Math.max(1, Math.floor(totalDays / n));
  let dayCount = 0;

  destNames.forEach((name, i) => {
    const data = findDestinationData(name) || buildFallback(name);
    const isLast = i === n - 1;
    const daysHere = isLast ? totalDays - dayCount : daysPerDest;

    for (let d = 0; d < daysHere; d++) {
      dayCount++;
      const expIndex = d % data.experiences.length;
      days.push({
        day: dayCount,
        destination: name,
        experiences: d === 0
          ? data.experiences.slice(0, Math.min(3, data.experiences.length))
          : data.experiences.slice(expIndex, expIndex + 2).concat(data.experiences.slice(0, Math.max(0, 2 - (data.experiences.length - expIndex)))),
        food: d === 0 ? data.food : `Continue exploring local food in ${name}`,
        stay: data.stay,
        travelNote: d === 0 && i > 0 ? data.travelNote : "—",
        cost: data.costPerDay,
      });
    }
  });

  const totalCost = days.reduce((s, d) => s + d.cost, 0);
  const title = destNames.join(" + ") + ` — ${totalDays} days`;
  return { days, totalCost, title };
}

export default function ItineraryDetailScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { savedItinerary, saveItinerary } = useApp();

  const { destNames = [], days: totalDays = 5, budget = "", startCity = "Mumbai" } = location.state || {};

  const itinerary = buildItinerary(destNames, totalDays, startCity);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: colors.background }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.tealDark})`,
          padding: "20px 16px 20px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ArrowLeft size={18} color="#fff" />
          </button>
          <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: "22px" }}>
            {itinerary.title}
          </span>
          <button
            onClick={saveItinerary}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <Bookmark size={18} color={savedItinerary ? colors.gold : "#fff"} fill={savedItinerary ? colors.gold : "none"} />
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { icon: MapPin, label: `Starting from ${startCity}` },
            { icon: Clock, label: `${totalDays} days` },
            { icon: DollarSign, label: `₹${itinerary.totalCost.toLocaleString("en-IN")} est.` },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20, paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5 }}
            >
              <Icon size={13} color="#fff" />
              <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }} className="hide-scrollbar">
        {itinerary.days.map((day) => (
          <div key={day.day} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.tealDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>D{day.day}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, display: "block" }}>
                  {day.destination}
                </span>
                {day.travelNote !== "—" && (
                  <span style={{ fontSize: 11, color: colors.mutedForeground }}>{day.travelNote}</span>
                )}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>
                ₹{day.cost.toLocaleString("en-IN")}
              </span>
            </div>

            <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card }}>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.tealDark, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Experiences
                  </span>
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 5 }}>
                    {day.experiences.map((exp, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.tealDark, marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: colors.foreground, lineHeight: "20px" }}>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {day.food !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Utensils size={15} color={colors.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.foreground, lineHeight: "19px" }}>{day.food}</span>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Bed size={15} color={colors.primary} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: colors.foreground, lineHeight: "19px" }}>{day.stay}</span>
                </div>

                {day.travelNote !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Bus size={15} color={colors.mutedForeground} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.mutedForeground, lineHeight: "19px" }}>{day.travelNote}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card, marginBottom: 20 }}>
          <div style={{ padding: "16px" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, display: "block", marginBottom: 12 }}>
              Cost summary
            </span>
            {itinerary.days
              .filter((d, i, arr) => arr.findIndex((x) => x.destination === d.destination) === i)
              .map((day) => {
                const count = itinerary.days.filter((d) => d.destination === day.destination).length;
                const subtotal = day.cost * count;
                return (
                  <div key={day.destination} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: colors.foreground }}>{day.destination} ({count} day{count > 1 ? "s" : ""})</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                );
              })}
            <div style={{ height: 1, backgroundColor: colors.border, margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: colors.foreground }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>₹{itinerary.totalCost.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {!savedItinerary && (
        <div style={{ padding: "12px 16px 20px", backgroundColor: colors.card, borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
          <button
            onClick={saveItinerary}
            style={{ width: "100%", height: 52, borderRadius: 8, backgroundColor: colors.primary, color: "#fff", border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
          >
            Save to wishlist
          </button>
        </div>
      )}
    </div>
  );
}
