import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";
import { Destination } from "@/data/mockData";

interface Props {
  destination: Destination;
  onPress: () => void;
  onSave: () => void;
  saved: boolean;
  compact?: boolean;
}

export default function DestinationCard({
  destination,
  onPress,
  onSave,
  saved,
  compact = false,
}: Props) {
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <LinearGradient
        colors={destination.heroGradient as [string, string]}
        style={[styles.hero, compact && styles.heroCompact]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.8}
          style={styles.saveBtn}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Feather
            name="bookmark"
            size={20}
            color={saved ? colors.gold : "rgba(255,255,255,0.9)"}
          />
        </TouchableOpacity>
        <View style={styles.heroBadges}>
          <Text style={styles.heroName}>{destination.name}</Text>
          <View style={styles.statePill}>
            <Text style={styles.stateText}>{destination.state}</Text>
          </View>
        </View>
      </LinearGradient>

      {!compact && (
        <View style={styles.body}>
          <View style={styles.tagsRow}>
            {destination.tags.map((tag) => (
              <View
                key={tag}
                style={[styles.tag, { backgroundColor: colors.tealLight }]}
              >
                <Text style={[styles.tagText, { color: colors.tealDark }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
          <Text style={[styles.rationale, { color: colors.foreground }]}>
            {destination.rationale}
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.budgetRow}>
            <Text style={[styles.budgetLabel, { color: colors.mutedForeground }]}>
              Estimated total
            </Text>
            <Text style={[styles.budgetAmount, { color: colors.primary }]}>
              ₹{destination.totalBudget.toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.seasonRow}>
            {destination.currentSeason === "ideal" && (
              <>
                <View style={[styles.greenDot, { backgroundColor: colors.tealDark }]} />
                <Text style={[styles.seasonText, { color: colors.mutedForeground }]}>
                  Best time to visit
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity onPress={onPress}>
            <Text style={[styles.seeWhy, { color: colors.tealDark }]}>
              See why this fits you →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  hero: {
    height: 160,
    justifyContent: "flex-end",
    padding: 16,
  },
  heroCompact: {
    height: 80,
  },
  saveBtn: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  heroBadges: {
    gap: 4,
  },
  heroName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  statePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  stateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  body: {
    padding: 16,
    gap: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  rationale: {
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 22,
  },
  divider: {
    height: 1,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetLabel: {
    fontSize: 13,
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  seasonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  seasonText: {
    fontSize: 13,
  },
  seeWhy: {
    fontSize: 14,
    fontWeight: "600",
  },
});
