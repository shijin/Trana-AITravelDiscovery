import { Feather } from "@expo/vector-icons";
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
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";
import { destinations } from "@/data/mockData";

export default function DiscoverScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 20 : insets.bottom + 64 + 20;

  const handlePlanTogether = () => {
    alert("Coming in V2 — stay tuned!");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad + 20,
        paddingBottom: bottomPad,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.primary }]}>
        What kind of trip?
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Choose how you want to plan
      </Text>

      <View style={styles.cards}>
        <TouchableOpacity
          onPress={() => router.push("/quiz")}
          activeOpacity={0.85}
          style={[styles.optionCard, { borderColor: colors.border, backgroundColor: colors.card }]}
        >
          <View style={[styles.iconBox, { backgroundColor: colors.tealLight }]}>
            <Feather name="compass" size={24} color={colors.tealDark} />
          </View>
          <View style={styles.optionText}>
            <Text style={[styles.optionTitle, { color: colors.foreground }]}>
              Discover for myself
            </Text>
            <Text style={[styles.optionSub, { color: colors.mutedForeground }]}>
              Mood-matched destinations in 3 minutes
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePlanTogether}
          activeOpacity={0.85}
          style={[styles.optionCard, { borderColor: colors.border, backgroundColor: colors.card }]}
        >
          <View style={[styles.iconBox, { backgroundColor: colors.tealLight }]}>
            <Feather name="users" size={24} color={colors.tealDark} />
          </View>
          <View style={styles.optionText}>
            <Text style={[styles.optionTitle, { color: colors.foreground }]}>
              Plan with a partner
            </Text>
            <Text style={[styles.optionSub, { color: colors.mutedForeground }]}>
              Share preferences, get one perfect match
            </Text>
          </View>
          <View style={[styles.v2Badge, { backgroundColor: colors.goldLight }]}>
            <Text style={[styles.v2Text, { color: colors.gold }]}>V2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/itinerary")}
          activeOpacity={0.85}
          style={[styles.optionCard, { borderColor: colors.border, backgroundColor: colors.card }]}
        >
          <View style={[styles.iconBox, { backgroundColor: colors.tealLight }]}>
            <Feather name="map" size={24} color={colors.tealDark} />
          </View>
          <View style={styles.optionText}>
            <Text style={[styles.optionTitle, { color: colors.foreground }]}>
              Build a circuit
            </Text>
            <Text style={[styles.optionSub, { color: colors.mutedForeground }]}>
              Multi-destination trip by region or state
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={[styles.dividerRow, { borderColor: colors.border }]}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>OR</Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <Text style={[styles.continueLabel, { color: colors.mutedForeground }]}>
        Continue where you left off
      </Text>

      <View style={styles.recentRow}>
        {destinations.slice(0, 2).map((dest) => (
          <TouchableOpacity
            key={dest.id}
            onPress={() =>
              router.push({
                pathname: "/destination/[id]",
                params: { id: dest.id, data: JSON.stringify(dest) },
              })
            }
            activeOpacity={0.85}
            style={[styles.recentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <LinearGradient
              colors={dest.heroGradient}
              style={styles.recentHero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.recentInfo}>
              <Text style={[styles.recentName, { color: colors.foreground }]}>
                {dest.name}
              </Text>
              <Text style={[styles.recentState, { color: colors.mutedForeground }]}>
                {dest.state}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  cards: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  optionSub: {
    fontSize: 13,
  },
  v2Badge: {
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  v2Text: {
    fontSize: 11,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: "500",
  },
  continueLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  recentRow: {
    flexDirection: "row",
    gap: 12,
  },
  recentCard: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  recentHero: {
    height: 60,
  },
  recentInfo: {
    padding: 10,
    gap: 2,
  },
  recentName: {
    fontSize: 14,
    fontWeight: "600",
  },
  recentState: {
    fontSize: 12,
  },
});
