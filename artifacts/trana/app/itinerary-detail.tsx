import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { itineraryData } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import * as Haptics from "expo-haptics";

const DAY_GRADIENTS: [string, string][] = [
  ["#b45309", "#d97706"],
  ["#b45309", "#d97706"],
  ["#6d28d9", "#4f46e5"],
  ["#6d28d9", "#4f46e5"],
  ["#0f766e", "#16a34a"],
];

export default function ItineraryDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { saveItinerary, savedItinerary } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 20 : insets.bottom + 20;

  const handleSave = async () => {
    await saveItinerary();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert("Itinerary saved to your wishlist!");
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
        <Text style={[styles.headerTitle, { color: colors.primary }]}>
          Karnataka circuit
        </Text>
        <TouchableOpacity>
          <Feather name="share-2" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryBar, { backgroundColor: colors.primary }]}>
        <Text style={styles.summaryMain}>
          5 days · Starting Hyderabad · ₹14,200 total
        </Text>
        <Text style={styles.summaryRoute}>
          Hampi → Badami → Aihole → Pattadakal
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomPad },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {itineraryData.days.map((day, i) => (
          <View
            key={day.day}
            style={[
              styles.dayCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <LinearGradient
              colors={DAY_GRADIENTS[i] || ["#1A3C5E", "#0D7377"]}
              style={styles.dayHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.dayLabel}>Day {day.day}</Text>
              <Text style={styles.dayDest}>{day.destination}</Text>
            </LinearGradient>
            <View style={styles.dayBody}>
              {day.travelTime !== "—" && (
                <View style={styles.travelRow}>
                  <Feather name="truck" size={14} color={colors.mutedForeground} />
                  <Text style={[styles.travelText, { color: colors.mutedForeground }]}>
                    {day.travelTime}
                  </Text>
                </View>
              )}
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={[styles.sectionLabel, { color: colors.tealDark }]}>
                WHAT TO DO
              </Text>
              {day.experiences.map((exp, j) => (
                <View key={j} style={styles.expRow}>
                  <View style={[styles.dot, { backgroundColor: colors.tealDark }]} />
                  <Text style={[styles.expText, { color: colors.foreground }]}>
                    {exp}
                  </Text>
                </View>
              ))}
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.detailRow}>
                <Feather name="coffee" size={14} color={colors.mutedForeground} />
                <Text style={[styles.detailText, { color: colors.mutedForeground }]}>
                  {day.food}
                </Text>
              </View>
              {day.stay !== "—" && (
                <View style={styles.detailRow}>
                  <Feather name="home" size={14} color={colors.mutedForeground} />
                  <Text style={[styles.detailText, { color: colors.mutedForeground }]}>
                    {day.stay}
                  </Text>
                </View>
              )}
              <View style={styles.costRow}>
                <Text style={[styles.costAmount, { color: colors.primary }]}>
                  ₹{day.cost.toLocaleString("en-IN")}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.totalLabel}>Total estimated spend</Text>
          <Text style={styles.totalAmount}>
            ₹{itineraryData.totalCost.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.totalSub}>
            5 days · Hyderabad → Karnataka → Hyderabad
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  summaryBar: {
    padding: 16,
    gap: 6,
  },
  summaryMain: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryRoute: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  dayCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  dayLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
  },
  dayDest: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dayBody: {
    padding: 14,
    gap: 10,
  },
  travelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  travelText: {
    fontSize: 13,
    flex: 1,
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
  },
  expText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  costRow: {
    alignItems: "flex-end",
  },
  costAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
  totalCard: {
    borderRadius: 12,
    padding: 20,
    gap: 6,
    alignItems: "flex-start",
  },
  totalLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  totalAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  totalSub: {
    color: "rgba(255,255,255,0.7)",
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
