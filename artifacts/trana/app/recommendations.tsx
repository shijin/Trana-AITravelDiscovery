import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { destinations } from "@/data/mockData";
import DestinationCard from "@/components/DestinationCard";
import { useApp } from "@/context/AppContext";

export default function RecommendationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isWishlisted, quizAnswers } =
    useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 20 : insets.bottom + 20;

  const getBudgetLabel = (budget?: string) => {
    if (budget === "under-15k") return "₹15,000";
    if (budget === "15-30k") return "₹30,000";
    if (budget === "30-60k") return "₹60,000";
    if (budget === "60k+") return "₹60,000+";
    return "Any budget";
  };

  const getCityLabel = (city?: string) => {
    if (!city) return "Your city";
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  const getDurationLabel = (duration?: string) => {
    if (!duration) return "Any duration";
    return duration + " days";
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
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Feather name="arrow-left" size={22} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>
            Your matches
          </Text>
          <TouchableOpacity onPress={() => alert("Filters coming soon")}>
            <Feather name="sliders" size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.contextBar, { backgroundColor: colors.tealDark }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.contextText}>
            {quizAnswers.mood
              ? `${quizAnswers.mood.charAt(0).toUpperCase() + quizAnswers.mood.slice(1)} mood`
              : "Your mood"}{" "}
            · {getDurationLabel(quizAnswers.duration)} ·{" "}
            {getBudgetLabel(quizAnswers.budget)} ·{" "}
            {getCityLabel(quizAnswers.city)}
          </Text>
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomPad },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.aiCard, { backgroundColor: colors.blueLight }]}>
          <View style={styles.aiCardHeader}>
            <Feather name="compass" size={16} color={colors.tealDark} />
            <Text style={[styles.aiCardLabel, { color: colors.tealDark }]}>
              Why these 5?
            </Text>
          </View>
          <Text style={[styles.aiCardText, { color: colors.primary }]}>
            These destinations match your need for quiet nature, a moderate
            budget, and low physical activity — all reachable from{" "}
            {getCityLabel(quizAnswers.city)}.
          </Text>
        </View>

        {destinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onPress={() =>
              router.push({
                pathname: "/destination/[id]",
                params: { id: dest.id, data: JSON.stringify(dest) },
              })
            }
            onSave={() => {
              if (isWishlisted(dest.id)) {
                removeFromWishlist(dest.id);
              } else {
                addToWishlist(dest);
              }
            }}
            saved={isWishlisted(dest.id)}
          />
        ))}

        <TouchableOpacity
          onPress={() => router.push("/chat")}
          activeOpacity={0.85}
          style={[
            styles.refineCard,
            { backgroundColor: colors.card, borderColor: colors.tealDark },
          ]}
        >
          <Feather name="message-circle" size={20} color={colors.tealDark} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.refineTitle, { color: colors.foreground }]}>
              Not quite right?
            </Text>
            <Text style={[styles.refineSub, { color: colors.mutedForeground }]}>
              Tell me more about what you're looking for
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/chat")}
            style={[styles.refineBtn, { borderColor: colors.primary }]}
          >
            <Text style={[styles.refineBtnText, { color: colors.primary }]}>
              Refine with chat
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  contextBar: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contextText: {
    color: "#fff",
    fontSize: 12,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  aiCard: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  aiCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  aiCardLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  aiCardText: {
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 22,
  },
  refineCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    padding: 16,
  },
  refineTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  refineSub: {
    fontSize: 13,
  },
  refineBtn: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  refineBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
