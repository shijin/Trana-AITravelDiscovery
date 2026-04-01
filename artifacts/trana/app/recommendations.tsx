import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { getRecommendations } from "@/data/mockData";
import DestinationCard from "@/components/DestinationCard";
import { useApp } from "@/context/AppContext";

const ITEM_COUNT = 7; // 5 recommendations + AI card + refine card

function makeAnimValues(count: number) {
  return Array.from({ length: count }, () => ({
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(24),
  }));
}

export default function RecommendationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isWishlisted, quizAnswers } =
    useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 20 : insets.bottom + 20;

  const recommended = getRecommendations(quizAnswers);

  const animValues = useRef(makeAnimValues(ITEM_COUNT)).current;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const anims = animValues.map((av, i) =>
      Animated.parallel([
        Animated.timing(av.opacity, {
          toValue: 1,
          duration: 350,
          delay: i * 120,
          useNativeDriver: true,
        }),
        Animated.timing(av.translateY, {
          toValue: 0,
          duration: 350,
          delay: i * 120,
          useNativeDriver: true,
        }),
      ])
    );
    Animated.parallel(anims).start();
  }, []);

  const animStyle = (i: number) => ({
    opacity: animValues[i].opacity,
    transform: [{ translateY: animValues[i].translateY }],
  });

  const getBudgetLabel = (budget?: string) => {
    if (budget === "under-15k") return "₹15,000";
    if (budget === "15-30k") return "₹30,000";
    if (budget === "30-60k") return "₹60,000";
    if (budget === "60k+") return "₹60,000+";
    return "Any budget";
  };

  const getCityLabel = (city?: string) => {
    if (!city) return "your city";
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  const getDurationLabel = (duration?: string) => {
    if (!duration) return "Any duration";
    return duration + " days";
  };

  const getExplanationText = () => {
    const parts: string[] = [];
    if (quizAnswers.mood) {
      parts.push(`your ${quizAnswers.mood} mood`);
    }
    if (quizAnswers.companion) {
      const cm: Record<string, string> = {
        solo: "solo travel", couple: "couples", family: "family trips",
        senior: "traveling with seniors", friends: "group travel",
      };
      parts.push(cm[quizAnswers.companion] || quizAnswers.companion);
    }
    if (quizAnswers.budget) {
      const bm: Record<string, string> = {
        "under-15k": "a budget under ₹15K", "15-30k": "a ₹15–30K budget",
        "30-60k": "a ₹30–60K budget", "60k+": "a premium budget",
      };
      parts.push(bm[quizAnswers.budget]);
    }
    if (quizAnswers.activity) {
      parts.push(`${quizAnswers.activity} activity levels`);
    }
    if (parts.length === 0) {
      return `Scored from 20 curated Indian destinations and ranked for ${getCityLabel(quizAnswers.city)}.`;
    }
    const joined =
      parts.length === 1
        ? parts[0]
        : parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
    return `Scored from 20 destinations to match ${joined} — all reachable from ${getCityLabel(quizAnswers.city)}.`;
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
        <Animated.View
          style={[
            styles.aiCard,
            { backgroundColor: colors.blueLight },
            animStyle(0),
          ]}
        >
          <View style={styles.aiCardHeader}>
            <Feather name="compass" size={16} color={colors.tealDark} />
            <Text style={[styles.aiCardLabel, { color: colors.tealDark }]}>
              Why these 5?
            </Text>
          </View>
          <Text style={[styles.aiCardText, { color: colors.primary }]}>
            {getExplanationText()}
          </Text>
        </Animated.View>

        {recommended.map((dest, i) => (
          <Animated.View key={dest.id} style={animStyle(i + 1)}>
            <DestinationCard
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
          </Animated.View>
        ))}

        <Animated.View style={animStyle(recommended.length + 1)}>
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
              <Text
                style={[styles.refineSub, { color: colors.mutedForeground }]}
              >
                Tell me more about what you're looking for
              </Text>
            </View>
            <View
              style={[styles.refineBtn, { borderColor: colors.primary }]}
            >
              <Text style={[styles.refineBtnText, { color: colors.primary }]}>
                Refine with chat
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
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
