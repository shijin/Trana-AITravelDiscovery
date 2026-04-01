import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
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
import { useApp } from "@/context/AppContext";
import { LinearGradient as LG } from "expo-linear-gradient";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { wishlist, userEmail } = useApp();
  const topPad =
    Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 20 : insets.bottom + 64 + 20;

  const featured = destinations.slice(0, 3);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.primary, colors.tealDark]}
        style={[styles.header, { paddingTop: topPad + 20 }]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>
              {userEmail ? `Welcome back` : `Welcome to`}
            </Text>
            <Text style={styles.appName}>Trāna</Text>
            <Text style={styles.tagline}>Know where you belong before you go.</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            style={[styles.avatarBtn, { backgroundColor: "rgba(255,255,255,0.2)" }]}
          >
            <Feather name="user" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.quickActions}>
        <TouchableOpacity
          onPress={() => router.push("/quiz")}
          style={[styles.actionCard, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
        >
          <Feather name="compass" size={22} color="#fff" />
          <Text style={styles.actionLabel}>Discover</Text>
          <Text style={styles.actionSub}>Find your match</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/itinerary")}
          style={[styles.actionCard, { backgroundColor: colors.tealDark }]}
          activeOpacity={0.85}
        >
          <Feather name="map" size={22} color="#fff" />
          <Text style={styles.actionLabel}>Plan</Text>
          <Text style={styles.actionSub}>Build a circuit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/chat")}
          style={[styles.actionCard, { backgroundColor: colors.gold }]}
          activeOpacity={0.85}
        >
          <Feather name="message-circle" size={22} color="#fff" />
          <Text style={styles.actionLabel}>Chat</Text>
          <Text style={styles.actionSub}>Ask anything</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Trending This Season
          </Text>
          <TouchableOpacity onPress={() => router.push("/discover")}>
            <Text style={[styles.seeAll, { color: colors.tealDark }]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        {featured.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            onPress={() =>
              router.push({
                pathname: "/destination/[id]",
                params: { id: dest.id, data: JSON.stringify(dest) },
              })
            }
            activeOpacity={0.88}
            style={[
              styles.featuredCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <LG
              colors={dest.heroGradient}
              style={styles.featuredHero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredName}>{dest.name}</Text>
                <View style={styles.featuredPill}>
                  <Text style={styles.featuredState}>{dest.state}</Text>
                </View>
              </View>
            </LG>
            <View style={styles.featuredBody}>
              <View style={styles.featuredTagRow}>
                {dest.tags.slice(0, 2).map((t) => (
                  <View
                    key={t}
                    style={[
                      styles.smallTag,
                      { backgroundColor: colors.tealLight },
                    ]}
                  >
                    <Text style={[styles.smallTagText, { color: colors.tealDark }]}>
                      {t}
                    </Text>
                  </View>
                ))}
              </View>
              <Text
                style={[styles.featuredRationale, { color: colors.mutedForeground }]}
                numberOfLines={2}
              >
                {dest.rationale}
              </Text>
              <Text style={[styles.featuredBudget, { color: colors.primary }]}>
                ₹{dest.totalBudget.toLocaleString("en-IN")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {wishlist.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Your Wishlist
            </Text>
            <TouchableOpacity onPress={() => router.push("/wishlist")}>
              <Text style={[styles.seeAll, { color: colors.tealDark }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {wishlist.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                onPress={() =>
                  router.push({
                    pathname: "/destination/[id]",
                    params: { id: dest.id, data: JSON.stringify(dest) },
                  })
                }
                activeOpacity={0.88}
                style={styles.wishlistChip}
              >
                <LG
                  colors={dest.heroGradient}
                  style={styles.wishlistChipGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Text
                  style={[styles.wishlistChipName, { color: colors.primary }]}
                >
                  {dest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={[styles.ctaBanner, { backgroundColor: colors.blueLight }]}>
        <Feather name="zap" size={20} color={colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.ctaTitle, { color: colors.primary }]}>
            Get AI-matched destinations
          </Text>
          <Text style={[styles.ctaSub, { color: colors.mutedForeground }]}>
            3-minute quiz · personalised results
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/quiz")}
          style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.ctaBtnText}>Start</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
  },
  appName: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  tagline: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 2,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    marginTop: -10,
  },
  actionCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  actionLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  actionSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "600",
  },
  featuredCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredHero: {
    height: 120,
    justifyContent: "flex-end",
    padding: 12,
  },
  featuredOverlay: {
    gap: 4,
  },
  featuredName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  featuredPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  featuredState: {
    color: "#fff",
    fontSize: 11,
  },
  featuredBody: {
    padding: 12,
    gap: 6,
  },
  featuredTagRow: {
    flexDirection: "row",
    gap: 6,
  },
  smallTag: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  smallTagText: {
    fontSize: 11,
    fontWeight: "500",
  },
  featuredRationale: {
    fontSize: 13,
    lineHeight: 19,
  },
  featuredBudget: {
    fontSize: 15,
    fontWeight: "700",
  },
  wishlistChip: {
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: 120,
  },
  wishlistChipGradient: {
    height: 70,
  },
  wishlistChipName: {
    padding: 8,
    fontSize: 13,
    fontWeight: "600",
  },
  ctaBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  ctaSub: {
    fontSize: 12,
    marginTop: 2,
  },
  ctaBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ctaBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
