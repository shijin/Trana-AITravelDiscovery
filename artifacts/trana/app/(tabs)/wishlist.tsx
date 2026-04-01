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
import { useApp } from "@/context/AppContext";

export default function WishlistScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { wishlist, savedItinerary, removeFromWishlist } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 20 : insets.bottom + 64 + 20;

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
      <Text style={[styles.title, { color: colors.primary }]}>My Wishlist</Text>

      {wishlist.length === 0 && !savedItinerary ? (
        <View style={styles.empty}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.muted }]}>
            <Feather name="bookmark" size={36} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
            Nothing saved yet
          </Text>
          <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
            Tap the bookmark icon on any destination to save it here
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/discover")}
            style={[styles.discoverBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.discoverBtnText}>Start discovering</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {wishlist.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                  Saved destinations
                </Text>
                <View style={[styles.badge, { backgroundColor: colors.tealLight }]}>
                  <Text style={[styles.badgeText, { color: colors.tealDark }]}>
                    {wishlist.length}
                  </Text>
                </View>
              </View>
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
                  style={[
                    styles.destCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={dest.heroGradient}
                    style={styles.destHero}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.destName}>{dest.name}</Text>
                  </LinearGradient>
                  <View style={styles.destBody}>
                    <View style={styles.destInfo}>
                      <Text
                        style={[styles.destState, { color: colors.mutedForeground }]}
                      >
                        {dest.state}
                      </Text>
                      <View style={styles.tagRow}>
                        {dest.tags.slice(0, 2).map((t) => (
                          <View
                            key={t}
                            style={[
                              styles.smallTag,
                              { backgroundColor: colors.tealLight },
                            ]}
                          >
                            <Text
                              style={[
                                styles.smallTagText,
                                { color: colors.tealDark },
                              ]}
                            >
                              {t}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFromWishlist(dest.id)}
                      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                    >
                      <Feather
                        name="trash-2"
                        size={18}
                        color={colors.mutedForeground}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {savedItinerary && (
            <View style={styles.section}>
              <Text
                style={[styles.sectionTitle, { color: colors.foreground, marginBottom: 12 }]}
              >
                Saved itineraries
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/itinerary-detail")}
                activeOpacity={0.88}
                style={[
                  styles.itineraryCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.itineraryIcon,
                    { backgroundColor: colors.blueLight },
                  ]}
                >
                  <Feather name="map" size={22} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itineraryTitle, { color: colors.foreground }]}>
                    Karnataka circuit · 5 days
                  </Text>
                  <Text style={[styles.itinerarySub, { color: colors.mutedForeground }]}>
                    ₹14,200 total · Starting Hyderabad
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
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
    marginBottom: 24,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 16,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  emptySub: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  discoverBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  discoverBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  destCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 10,
  },
  destHero: {
    height: 80,
    justifyContent: "flex-end",
    padding: 10,
  },
  destName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  destBody: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  destInfo: {
    flex: 1,
    gap: 6,
  },
  destState: {
    fontSize: 13,
  },
  tagRow: {
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
  itineraryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  itineraryIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itineraryTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  itinerarySub: {
    fontSize: 13,
    marginTop: 2,
  },
});
