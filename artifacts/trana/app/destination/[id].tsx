import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { Destination } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

const ALL_MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

export default function DestinationDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  let dest: Destination | null = null;
  try {
    dest = JSON.parse(params.data as string) as Destination;
  } catch {
    return null;
  }

  if (!dest) return null;

  const saved = isWishlisted(dest.id);

  const handleSave = () => {
    if (saved) {
      removeFromWishlist(dest!.id);
    } else {
      addToWishlist(dest!);
    }
  };

  const handleShare = () => {
    const msg = `Check out ${dest!.name} — ${dest!.rationale.split(".")[0]}.`;
    Linking.openURL(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(dest!.name + " travel India")}`
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={dest.heroGradient as [string, string]}
        style={[styles.hero, { paddingTop: topPad + 12 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroTopRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconBtn}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <Feather name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={styles.iconBtn}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <Feather name="share-2" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.heroBottom}>
          <Text style={styles.heroName}>{dest.name}</Text>
          <View style={styles.heroStatePill}>
            <Text style={styles.heroState}>{dest.state}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomPad + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Section label="WHY THIS FITS YOU" colors={colors}>
          <View
            style={[
              styles.rationaleBox,
              { backgroundColor: colors.tealLight },
            ]}
          >
            <Text style={[styles.rationaleText, { color: colors.foreground }]}>
              {dest.rationale}
            </Text>
          </View>
        </Section>

        <Section label="BUDGET ESTIMATE" colors={colors}>
          <View style={[styles.budgetCard, { borderColor: colors.border }]}>
            <View style={styles.budgetItems}>
              {[
                { icon: "send", label: "Transport", amount: dest.budgetBreakdown.transport },
                { icon: "home", label: "Stay", amount: dest.budgetBreakdown.stay },
                { icon: "coffee", label: "Food & more", amount: dest.budgetBreakdown.food },
              ].map((item, i) => (
                <View
                  key={item.label}
                  style={[
                    styles.budgetItem,
                    i < 2 && {
                      borderRightWidth: 1,
                      borderRightColor: colors.border,
                    },
                  ]}
                >
                  <Feather name={item.icon as any} size={16} color={colors.mutedForeground} />
                  <Text style={[styles.budgetItemLabel, { color: colors.mutedForeground }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.budgetItemAmount, { color: colors.primary }]}>
                    ₹{item.amount.toLocaleString("en-IN")}
                  </Text>
                </View>
              ))}
            </View>
            <View style={[styles.budgetTotal, { borderTopColor: colors.border }]}>
              <Text style={[styles.budgetTotalLabel, { color: colors.mutedForeground }]}>
                Total estimated spend
              </Text>
              <Text style={[styles.budgetTotalAmount, { color: colors.primary }]}>
                ₹{dest.totalBudget.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </Section>

        <Section label="BEST TIME TO VISIT" colors={colors}>
          <View style={styles.monthsRow}>
            {ALL_MONTHS.map((m) => (
              <View
                key={m}
                style={[
                  styles.monthPill,
                  dest!.bestMonths.includes(m)
                    ? { backgroundColor: colors.tealDark }
                    : { backgroundColor: colors.muted },
                ]}
              >
                <Text
                  style={[
                    styles.monthText,
                    { color: dest!.bestMonths.includes(m) ? "#fff" : colors.mutedForeground },
                  ]}
                >
                  {m}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section label="FOOD TO TRY" colors={colors}>
          <View style={styles.foodRow}>
            {dest.foodHighlights.map((food) => (
              <View
                key={food}
                style={[styles.foodPill, { backgroundColor: colors.tealLight }]}
              >
                <Feather name="coffee" size={12} color={colors.tealDark} />
                <Text style={[styles.foodText, { color: colors.tealDark }]}>
                  {food}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section label="SEE IT FIRST" colors={colors}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dest.videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                activeOpacity={0.85}
                onPress={() =>
                  Linking.openURL(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(dest!.name + " " + video.companionType + " travel")}`
                  )
                }
                style={[styles.videoCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <LinearGradient
                  colors={dest!.heroGradient as [string, string]}
                  style={styles.videoThumb}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.playBtn}>
                    <Feather name="play" size={14} color="#fff" />
                  </View>
                  <View
                    style={[
                      styles.companionBadge,
                      { backgroundColor: colors.gold },
                    ]}
                  >
                    <Text style={styles.companionText}>
                      {video.companionType.charAt(0).toUpperCase() +
                        video.companionType.slice(1)}
                    </Text>
                  </View>
                </LinearGradient>
                <View style={styles.videoInfo}>
                  <Text
                    style={[styles.videoTitle, { color: colors.foreground }]}
                    numberOfLines={2}
                  >
                    {video.title}
                  </Text>
                  <Text style={[styles.videoCreator, { color: colors.mutedForeground }]}>
                    {video.creator} · {video.views}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Section>

        {dest.medicalFacilities && (
          <Section label="MEDICAL" colors={colors}>
            <View style={[styles.medicalRow, { backgroundColor: colors.blueLight }]}>
              <Feather name="heart" size={16} color={colors.primary} />
              <Text style={[styles.medicalText, { color: colors.primary }]}>
                {dest.medicalFacilities}
              </Text>
            </View>
          </Section>
        )}
      </ScrollView>

      <View
        style={[
          styles.actionBar,
          {
            paddingBottom: bottomPad + 12,
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push("/chat")}
          style={[
            styles.chatBtn,
            { borderColor: colors.primary },
          ]}
        >
          <Feather name="message-circle" size={18} color={colors.primary} />
          <Text style={[styles.chatBtnText, { color: colors.primary }]}>
            Refine
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          style={[
            styles.saveBtn,
            { backgroundColor: saved ? colors.gold : colors.primary },
          ]}
          activeOpacity={0.85}
        >
          <Feather
            name={saved ? "check" : "bookmark"}
            size={18}
            color="#fff"
          />
          <Text style={styles.saveBtnText}>
            {saved ? "Saved" : "Save to wishlist"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Section({
  label,
  colors,
  children,
}: {
  label: string;
  colors: any;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionLabel, { color: colors.tealDark }]}>
        {label}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    height: 240,
    padding: 16,
    justifyContent: "space-between",
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 18,
  },
  heroBottom: {
    gap: 6,
  },
  heroName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  heroStatePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  heroState: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    gap: 4,
  },
  section: {
    marginBottom: 24,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
  rationaleBox: {
    borderRadius: 8,
    padding: 12,
  },
  rationaleText: {
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 24,
  },
  budgetCard: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  budgetItems: {
    flexDirection: "row",
  },
  budgetItem: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    gap: 4,
  },
  budgetItemLabel: {
    fontSize: 12,
  },
  budgetItemAmount: {
    fontSize: 14,
    fontWeight: "700",
  },
  budgetTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  budgetTotalLabel: {
    fontSize: 13,
  },
  budgetTotalAmount: {
    fontSize: 18,
    fontWeight: "700",
  },
  monthsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  monthPill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "500",
  },
  foodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  foodPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  foodText: {
    fontSize: 13,
    fontWeight: "500",
  },
  videoCard: {
    width: 160,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
  },
  videoThumb: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  companionBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  companionText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  videoInfo: {
    padding: 8,
    gap: 4,
  },
  videoTitle: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  videoCreator: {
    fontSize: 11,
  },
  medicalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    padding: 12,
  },
  medicalText: {
    fontSize: 14,
    flex: 1,
  },
  actionBar: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  chatBtn: {
    flex: 0.45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    gap: 6,
  },
  chatBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  saveBtn: {
    flex: 0.55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    gap: 6,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
