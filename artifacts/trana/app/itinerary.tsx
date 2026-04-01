import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

const BUDGET_OPTIONS = ["Under ₹15,000", "₹15–30K", "₹30–60K", "Above ₹60K"];
const CITIES = ["Bengaluru", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Kochi", "Pune", "Ahmedabad"];
const QUICK_ADDS = ["Gokarna", "Hampi", "Coorg"];
const { width: SCREEN_W } = Dimensions.get("window");

function BuildingOverlay({ destinations }: { destinations: string[] }) {
  const nodes = destinations.slice(0, 3);
  const op1 = useRef(new Animated.Value(0)).current;
  const op2 = useRef(new Animated.Value(0)).current;
  const op3 = useRef(new Animated.Value(0)).current;
  const lw1 = useRef(new Animated.Value(0)).current;
  const lw2 = useRef(new Animated.Value(0)).current;
  const textOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const lineTarget = Math.min(SCREEN_W * 0.18, 80);
    const seq =
      nodes.length === 1
        ? [
            Animated.timing(op1, { toValue: 1, duration: 250, useNativeDriver: true }),
          ]
        : nodes.length === 2
        ? [
            Animated.timing(op1, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(lw1, { toValue: lineTarget, duration: 400, useNativeDriver: false }),
            Animated.timing(op2, { toValue: 1, duration: 250, useNativeDriver: true }),
          ]
        : [
            Animated.timing(op1, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(lw1, { toValue: lineTarget, duration: 350, useNativeDriver: false }),
            Animated.timing(op2, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(lw2, { toValue: lineTarget, duration: 350, useNativeDriver: false }),
            Animated.timing(op3, { toValue: 1, duration: 250, useNativeDriver: true }),
          ];

    Animated.sequence([
      ...seq,
      Animated.timing(textOp, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={ol.container}>
      <View style={ol.routeRow}>
        <Animated.View style={[ol.nodeWrap, { opacity: op1 }]}>
          <View style={ol.nodeDot} />
          <Text style={ol.nodeLabel} numberOfLines={1}>{nodes[0]}</Text>
        </Animated.View>

        {nodes.length > 1 && (
          <>
            <Animated.View style={[ol.line, { width: lw1 }]} />
            <Animated.View style={[ol.nodeWrap, { opacity: op2 }]}>
              <View style={ol.nodeDot} />
              <Text style={ol.nodeLabel} numberOfLines={1}>{nodes[1]}</Text>
            </Animated.View>
          </>
        )}

        {nodes.length > 2 && (
          <>
            <Animated.View style={[ol.line, { width: lw2 }]} />
            <Animated.View style={[ol.nodeWrap, { opacity: op3 }]}>
              <View style={ol.nodeDot} />
              <Text style={ol.nodeLabel} numberOfLines={1}>{nodes[2]}</Text>
            </Animated.View>
          </>
        )}
      </View>

      <Animated.Text style={[ol.planningText, { opacity: textOp }]}>
        Planning your circuit...
      </Animated.Text>
    </View>
  );
}

const ol = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1A3C5E",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  nodeWrap: {
    alignItems: "center",
    width: 72,
  },
  nodeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  nodeLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  line: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginBottom: 22,
  },
  planningText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default function ItineraryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { quizAnswers } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const rawCity = quizAnswers?.city || "";
  const initialCity = rawCity
    ? rawCity.charAt(0).toUpperCase() + rawCity.slice(1)
    : CITIES[0];

  const [destinations, setDestinations] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [days, setDays] = useState(3);
  const [budgetIndex, setBudgetIndex] = useState(1);
  const [cityIndex, setCityIndex] = useState(
    Math.max(CITIES.findIndex((c) => c.toLowerCase() === initialCity.toLowerCase()), 0)
  );
  const [isBuilding, setIsBuilding] = useState(false);

  const budget = BUDGET_OPTIONS[budgetIndex];
  const startCity = CITIES[cityIndex];
  const canBuild = destinations.length > 0;

  const addDestination = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const cap = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (!destinations.includes(cap)) {
      setDestinations((prev) => [...prev, cap]);
    }
    setInputText("");
  };

  const removeDestination = (name: string) => {
    setDestinations((prev) => prev.filter((d) => d !== name));
  };

  const handleBuild = () => {
    if (!canBuild) return;
    setIsBuilding(true);
    setTimeout(() => {
      router.push({
        pathname: "/itinerary-detail",
        params: {
          destinations: JSON.stringify(destinations),
          days: days.toString(),
          budget,
          startCity,
        },
      });
      setTimeout(() => setIsBuilding(false), 200);
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isBuilding && <BuildingOverlay destinations={destinations} />}

      {/* Header */}
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
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: "#1A3C5E" }]}>
          Plan a circuit
        </Text>
        <Feather name="map-pin" size={20} color="#0D7377" />
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Where do you want to go?</Text>
        <Text style={styles.heroSub}>
          Add your destinations and we'll build the route.
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: bottomPad + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 1 — Destinations */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>YOUR DESTINATIONS</Text>

          <View style={styles.inputRow}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a destination e.g. Gokarna"
              placeholderTextColor={colors.mutedForeground}
              style={[
                styles.destInput,
                {
                  borderColor: "#E5E7EB",
                  color: colors.foreground,
                  backgroundColor: colors.background,
                },
              ]}
              returnKeyType="done"
              onSubmitEditing={() => addDestination(inputText)}
            />
            <TouchableOpacity
              onPress={() => addDestination(inputText)}
              style={styles.addBtn}
            >
              <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {destinations.length > 0 ? (
            <View style={styles.pillsWrap}>
              {destinations.map((dest) => (
                <View key={dest} style={styles.destPill}>
                  <Feather name="menu" size={13} color="#0D7377" style={{ marginRight: 4 }} />
                  <Text style={styles.destPillText}>{dest}</Text>
                  <TouchableOpacity
                    onPress={() => removeDestination(dest)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={{ marginLeft: 6 }}
                  >
                    <Feather name="x" size={13} color="#0D7377" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text style={[styles.quickLabel, { color: colors.mutedForeground }]}>
                Quick add
              </Text>
              <View style={styles.quickRow}>
                {QUICK_ADDS.map((q) => (
                  <TouchableOpacity
                    key={q}
                    onPress={() => addDestination(q)}
                    style={[styles.quickChip, { borderColor: "#E5E7EB" }]}
                  >
                    <Text style={[styles.quickChipText, { color: colors.mutedForeground }]}>
                      {q}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Step 2 — Trip Details */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>TRIP DETAILS</Text>

          {/* Days stepper */}
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Feather name="calendar" size={16} color={colors.mutedForeground} />
              <Text style={[styles.detailLabel, { color: colors.foreground }]}>
                Number of days
              </Text>
            </View>
            <View style={styles.stepper}>
              <TouchableOpacity
                onPress={() => setDays((d) => Math.max(1, d - 1))}
                style={[styles.stepperBtn, { borderColor: "#E5E7EB" }]}
              >
                <Feather name="minus" size={14} color={colors.foreground} />
              </TouchableOpacity>
              <Text style={[styles.stepperVal, { color: colors.foreground }]}>
                {days}
              </Text>
              <TouchableOpacity
                onPress={() => setDays((d) => Math.min(30, d + 1))}
                style={[styles.stepperBtn, { borderColor: "#E5E7EB" }]}
              >
                <Feather name="plus" size={14} color={colors.foreground} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Budget */}
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setBudgetIndex((i) => (i + 1) % BUDGET_OPTIONS.length)}
            activeOpacity={0.7}
          >
            <View style={styles.detailLeft}>
              <Feather name="credit-card" size={16} color={colors.mutedForeground} />
              <Text style={[styles.detailLabel, { color: colors.foreground }]}>
                Total budget
              </Text>
            </View>
            <View style={styles.selectorRight}>
              <Text style={[styles.selectorText, { color: "#0D7377" }]}>
                {budget}
              </Text>
              <Feather name="chevron-down" size={14} color="#0D7377" />
            </View>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Starting city */}
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => setCityIndex((i) => (i + 1) % CITIES.length)}
            activeOpacity={0.7}
          >
            <View style={styles.detailLeft}>
              <Feather name="map-pin" size={16} color={colors.mutedForeground} />
              <Text style={[styles.detailLabel, { color: colors.foreground }]}>
                Starting city
              </Text>
            </View>
            <View style={styles.selectorRight}>
              <Text style={[styles.selectorText, { color: "#0D7377" }]}>
                {startCity}
              </Text>
              <Feather name="chevron-down" size={14} color="#0D7377" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Build Button */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 16,
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBuild}
          disabled={!canBuild}
          activeOpacity={0.85}
          style={[
            styles.buildBtn,
            { backgroundColor: canBuild ? "#1A3C5E" : colors.border },
          ]}
        >
          <Text style={styles.buildBtnText}>Build my circuit →</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 18,
    fontWeight: "700",
  },
  hero: {
    backgroundColor: "#1A3C5E",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  heroSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 20,
  },
  scroll: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLabel: {
    color: "#0D7377",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  destInput: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0D7377",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  destPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#0D7377",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  destPillText: {
    color: "#0D7377",
    fontSize: 14,
    fontWeight: "500",
  },
  quickLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  quickRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  quickChip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  quickChipText: {
    fontSize: 13,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  detailLabel: {
    fontSize: 15,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperVal: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 24,
    textAlign: "center",
  },
  selectorRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selectorText: {
    fontSize: 15,
    fontWeight: "500",
  },
  divider: {
    height: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  buildBtn: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buildBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
