import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import * as Haptics from "expo-haptics";

const DEST_GRADIENTS: [string, string][] = [
  ["#1A3C5E", "#0D7377"],
  ["#7F35B2", "#4f46e5"],
  ["#C9962B", "#d97706"],
  ["#D85A30", "#e85d04"],
  ["#2D6A4F", "#16a34a"],
  ["#185FA5", "#0ea5e9"],
];

interface DestData {
  experiences: string[];
  food: string;
  stay: string;
  travelNote: string;
  costPerDay: number;
}

const DESTINATION_DB: Record<string, DestData> = {
  gokarna: {
    experiences: [
      "Kudle Beach at sunset",
      "Om Beach morning walk",
      "Mahabaleshwar Temple",
      "Half Moon Beach hike",
    ],
    food: "Fresh seafood at Om Beach shacks",
    stay: "Beach hostel or guesthouse — ₹600–800/night",
    travelNote: "Best by overnight bus from Goa or Bengaluru",
    costPerDay: 1200,
  },
  hampi: {
    experiences: [
      "Virupaksha Temple at sunrise",
      "Vittala Temple complex",
      "Sunset at Matanga Hill",
      "Royal Enclosure & Lotus Mahal",
      "Boulder hopping",
    ],
    food: "Millet dosa at Mango Tree restaurant",
    stay: "Guesthouse near boulders — ₹700–1000/night",
    travelNote: "3 hrs from Gokarna, 7 hrs from Hyderabad",
    costPerDay: 1500,
  },
  coorg: {
    experiences: [
      "Abbey Falls morning visit",
      "Coffee estate walk",
      "Raja's Seat sunset",
      "Namdroling Monastery",
      "Dubare Elephant Camp",
    ],
    food: "Pandi curry and Akki roti at local homestay",
    stay: "Coffee estate homestay — ₹1200–2000/night",
    travelNote: "4 hrs from Bengaluru",
    costPerDay: 2000,
  },
  munnar: {
    experiences: [
      "Tea plantation sunrise walk",
      "Eravikulam National Park",
      "Mattupetty Dam",
      "Tea Museum visit",
      "Top Station viewpoint",
    ],
    food: "Kerala breakfast — puttu, kadala curry, filter coffee",
    stay: "Tea estate bungalow — ₹1500–2500/night",
    travelNote: "4 hrs from Kochi airport",
    costPerDay: 2200,
  },
  alleppey: {
    experiences: [
      "Houseboat backwater cruise",
      "Sunrise kayaking in canals",
      "Kumarakom bird sanctuary",
      "Vembanad Lake sunset",
      "Village walk along canals",
    ],
    food: "Karimeen pollichathu (pearl spot fish) — Kerala specialty",
    stay: "Houseboat night stay — ₹3500–5000/night",
    travelNote: "1.5 hrs from Kochi",
    costPerDay: 3000,
  },
  mysuru: {
    experiences: [
      "Mysuru Palace evening lights",
      "Devaraja Market walk",
      "Chamundi Hill temple",
      "Brindavan Gardens evening",
      "Mysuru Zoo",
    ],
    food: "Mysuru pak sweet, bisi bele bath, set dosa",
    stay: "Heritage hotel near palace — ₹1500–2500/night",
    travelNote: "3 hrs from Bengaluru",
    costPerDay: 1800,
  },
  pondicherry: {
    experiences: [
      "French Quarter morning walk",
      "Promenade Beach sunrise",
      "Auroville visit",
      "Sri Aurobindo Ashram",
      "White Town cafes",
    ],
    food: "Crepes and cafe au lait at Baker Street",
    stay: "French Quarter heritage guesthouse — ₹1800–3000/night",
    travelNote: "3 hrs from Chennai",
    costPerDay: 2500,
  },
  jaipur: {
    experiences: [
      "Amber Fort morning visit",
      "City Palace and museum",
      "Hawa Mahal photo stop",
      "Jantar Mantar",
      "Johari Bazaar shopping",
    ],
    food: "Dal baati churma, laal maas, ghevar sweet",
    stay: "Heritage haveli stay — ₹2000–4000/night",
    travelNote: "5 hrs from Delhi",
    costPerDay: 2500,
  },
  varanasi: {
    experiences: [
      "Ganga Aarti at Dashashwamedh Ghat",
      "Sunrise boat ride on the Ganges",
      "Kashi Vishwanath Temple",
      "Sarnath ruins",
      "Old city lane walk at dawn",
    ],
    food: "Kachori sabzi, thandai, malaiyo (winter)",
    stay: "Heritage guesthouse near ghats — ₹800–1500/night",
    travelNote: "Well connected by train from all major cities",
    costPerDay: 1500,
  },
  rishikesh: {
    experiences: [
      "Morning yoga at Parmarth Niketan",
      "River rafting on the Ganga",
      "Laxman Jhula walk",
      "Beatles Ashram visit",
      "Ganga Aarti at Triveni Ghat",
    ],
    food: "Pure veg cafes — try The Sitting Elephant",
    stay: "Ashram stay or riverside camp — ₹600–1500/night",
    travelNote: "6 hrs from Delhi",
    costPerDay: 1200,
  },
};

interface ItineraryItem {
  destination: string;
  days: number;
  experiences: string[];
  food: string;
  stay: string;
  travelNote: string;
  totalCost: number;
}

function buildItinerary(
  destinations: string[],
  totalDays: number,
  startCity: string
): ItineraryItem[] {
  const daysPerDest = Math.floor(totalDays / destinations.length);
  const remainder = totalDays % destinations.length;

  return destinations.map((dest, index) => {
    const key = dest.toLowerCase().replace(/\s+/g, "");
    const data: DestData = DESTINATION_DB[key] || {
      experiences: [
        `Explore ${dest} old town`,
        "Local market visit",
        "Sunrise viewpoint",
        "Heritage walk",
      ],
      food: `Try local specialties at ${dest}`,
      stay: `Mid-range hotel — ₹800–1500/night`,
      travelNote: `Check connectivity from ${startCity}`,
      costPerDay: 1500,
    };

    const days = index === destinations.length - 1
      ? daysPerDest + remainder
      : daysPerDest;

    return {
      destination: dest,
      days: Math.max(days, 1),
      experiences: data.experiences.slice(0, Math.min(days + 2, data.experiences.length)),
      food: data.food,
      stay: data.stay,
      travelNote: data.travelNote,
      totalCost: data.costPerDay * Math.max(days, 1),
    };
  });
}

export default function ItineraryDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { saveItinerary, savedItinerary } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 20 : insets.bottom + 20;

  const params = useLocalSearchParams<{
    destinations: string;
    days: string;
    budget: string;
    startCity: string;
  }>();

  const destinations: string[] = params.destinations
    ? JSON.parse(params.destinations as string)
    : ["Hampi", "Coorg"];
  const totalDays = parseInt((params.days as string) || "5", 10);
  const budget = (params.budget as string) || "₹15–30K";
  const startCity = (params.startCity as string) || "Bengaluru";

  const items = buildItinerary(destinations, totalDays, startCity);
  const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
  const tripTitle = destinations.join(" + ") + " — " + totalDays + " days";
  const summaryRoute = destinations.join(" → ");

  const handleSave = async () => {
    await saveItinerary();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Saved!", "Itinerary saved to your wishlist.");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: topPad + 12,
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primary }]} numberOfLines={1}>
          {destinations.join(" + ")}
        </Text>
        <TouchableOpacity onPress={() => Alert.alert("Share", "Sharing coming soon.")}>
          <Feather name="share-2" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryBar, { backgroundColor: colors.primary }]}>
        <Text style={styles.summaryMain}>
          {totalDays} days · {budget} · Starting {startCity}
        </Text>
        <Text style={styles.summaryRoute} numberOfLines={1}>
          {summaryRoute}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, i) => (
          <View
            key={item.destination}
            style={[
              styles.destCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <LinearGradient
              colors={DEST_GRADIENTS[i % DEST_GRADIENTS.length]}
              style={styles.destHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View>
                <Text style={styles.destDays}>
                  {item.days} {item.days === 1 ? "day" : "days"}
                </Text>
                <Text style={styles.destName}>{item.destination}</Text>
              </View>
              <View style={styles.costBadge}>
                <Text style={styles.costBadgeText}>
                  ₹{item.totalCost.toLocaleString("en-IN")}
                </Text>
              </View>
            </LinearGradient>

            <View style={styles.destBody}>
              {item.travelNote ? (
                <View style={styles.travelRow}>
                  <Feather name="navigation" size={13} color={colors.mutedForeground} />
                  <Text style={[styles.travelText, { color: colors.mutedForeground }]}>
                    {item.travelNote}
                  </Text>
                </View>
              ) : null}

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <Text style={[styles.sectionLabel, { color: colors.tealDark }]}>
                WHAT TO DO
              </Text>
              {item.experiences.map((exp, j) => (
                <View key={j} style={styles.expRow}>
                  <View style={[styles.dot, { backgroundColor: colors.tealDark }]} />
                  <Text style={[styles.expText, { color: colors.foreground }]}>{exp}</Text>
                </View>
              ))}

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.infoRow}>
                <Feather name="coffee" size={13} color={colors.mutedForeground} />
                <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
                  {item.food}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Feather name="home" size={13} color={colors.mutedForeground} />
                <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
                  {item.stay}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Total card */}
        <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.totalLabel}>Total estimated spend</Text>
          <Text style={styles.totalAmount}>
            ₹{totalCost.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.totalSub}>
            {totalDays} days · {startCity} → {summaryRoute} → {startCity}
          </Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={savedItinerary}
            style={[
              styles.saveBtn,
              { backgroundColor: savedItinerary ? "#9ca3af" : colors.gold },
            ]}
          >
            <Feather
              name={savedItinerary ? "check" : "bookmark"}
              size={18}
              color="#fff"
            />
            <Text style={styles.saveBtnText}>
              {savedItinerary ? "Saved" : "Save this itinerary"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  summaryBar: {
    padding: 16,
    gap: 4,
  },
  summaryMain: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryRoute: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  destCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  destHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  destDays: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  destName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  costBadge: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  costBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  destBody: {
    padding: 14,
    gap: 10,
  },
  travelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  travelText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  divider: {
    height: 1,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
  expRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  expText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  totalCard: {
    borderRadius: 12,
    padding: 20,
    gap: 6,
    alignItems: "flex-start",
  },
  totalLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },
  totalAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  totalSub: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    marginBottom: 8,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
