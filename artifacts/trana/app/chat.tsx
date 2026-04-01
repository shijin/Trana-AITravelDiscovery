import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useColors } from "@/hooks/useColors";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { destinations, initialChatMessage } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

interface DestChip {
  id: string | number;
  name: string;
  state: string;
  reason: string;
}

interface IntentResult {
  text: string;
  destinations: DestChip[];
}

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  chips?: DestChip[];
}

const ROUND1_CHIPS = ["Try Kerala", "Show beaches", "Under ₹20K"];
const ROUND2_CHIPS = ["More options", "Change dates", "Start over"];

function detectIntent(message: string): IntentResult {
  const msg = message.toLowerCase();

  if (msg.includes("kerala")) {
    return {
      text: "Kerala is a wonderful choice! Based on what you told me earlier, here are 3 Kerala destinations that suit your style:",
      destinations: [
        { id: "munnar", name: "Munnar", state: "Kerala", reason: "Quiet tea estates, misty hills, minimal walking — perfect for switching off." },
        { id: "alleppey", name: "Alleppey", state: "Kerala", reason: "Backwater houseboat experience, serene and low-effort — exactly the calm you are looking for." },
        { id: "varkala", name: "Varkala", state: "Kerala", reason: "Cliff-top beach, uncrowded, great food — without the Goa chaos." },
      ],
    };
  }

  if (msg.includes("goa")) {
    return {
      text: "If Goa is calling, here are the sides of Goa that match your preference for quiet and local:",
      destinations: [
        { id: "north-goa", name: "North Goa", state: "Goa", reason: "Vibrant, lively beaches — best for groups and nightlife seekers." },
        { id: "south-goa", name: "South Goa", state: "Goa", reason: "Quieter, cleaner beaches — much better match for your calm preference." },
        { id: "panjim", name: "Panjim Old Town", state: "Goa", reason: "Portuguese architecture, cafe culture, and zero beach noise." },
      ],
    };
  }

  if (
    msg.includes("budget") ||
    msg.includes("cheap") ||
    msg.includes("affordable") ||
    msg.includes("less money") ||
    msg.includes("low budget") ||
    msg.includes("₹20k") ||
    msg.includes("under 20") ||
    msg.includes("15,000") ||
    msg.includes("15000")
  ) {
    return {
      text: "Got it — let me show you destinations that fit within ₹15,000 all-inclusive:",
      destinations: [
        { id: 2, name: "Hampi", state: "Karnataka", reason: "UNESCO heritage, stunning landscapes — total trip under ₹12,000 from most cities." },
        { id: 4, name: "Mysuru", state: "Karnataka", reason: "Palace city with excellent food — comfortable 3-day trip under ₹10,000." },
        { id: 3, name: "Pondicherry", state: "Tamil Nadu", reason: "French Quarter + beach — budget-friendly with hostels under ₹800/night." },
      ],
    };
  }

  if (
    msg.includes("beach") ||
    msg.includes("sea") ||
    msg.includes("ocean") ||
    msg.includes("coastal") ||
    msg.includes("show beaches")
  ) {
    return {
      text: "Beach destinations that are less crowded and more your pace:",
      destinations: [
        { id: 3, name: "Pondicherry", state: "Tamil Nadu", reason: "Rocky beach + French Quarter — calm, walkable, excellent food." },
        { id: "varkala", name: "Varkala", state: "Kerala", reason: "Cliff-top beach town — far less chaotic than Goa." },
        { id: "gokarna", name: "Gokarna", state: "Karnataka", reason: "Temple town with pristine beaches — offbeat and peaceful." },
      ],
    };
  }

  if (
    msg.includes("cold") ||
    msg.includes("hill") ||
    msg.includes("mountain") ||
    msg.includes("snow") ||
    msg.includes("cool") ||
    msg.includes("cold weather")
  ) {
    return {
      text: "For cooler temperatures and mountain air, these fit your profile:",
      destinations: [
        { id: 1, name: "Coorg", state: "Karnataka", reason: "Misty Western Ghats — cool even in summer, peaceful coffee estates." },
        { id: "munnar", name: "Munnar", state: "Kerala", reason: "Tea plantations at high altitude — genuinely cool and refreshing." },
        { id: 5, name: "Meghalaya", state: "Northeast", reason: "Living root bridges and cloud forests — unlike anything in India." },
      ],
    };
  }

  if (
    msg.includes("couple") ||
    msg.includes("romantic") ||
    msg.includes("honeymoon") ||
    msg.includes("partner") ||
    msg.includes("anniversary")
  ) {
    return {
      text: "For a romantic trip that does not feel like every other couple holiday:",
      destinations: [
        { id: 2, name: "Hampi", state: "Karnataka", reason: "Dramatic boulder landscapes and sunset views — romantic without the cliché." },
        { id: 3, name: "Pondicherry", state: "Tamil Nadu", reason: "Evening walks through French Quarter, fresh seafood, boutique stays." },
        { id: 1, name: "Coorg", state: "Karnataka", reason: "Private estate stays surrounded by coffee and spice plantations." },
      ],
    };
  }

  if (
    msg.includes("quick") ||
    msg.includes("weekend") ||
    msg.includes("2 days") ||
    msg.includes("short") ||
    msg.includes("2-3 days") ||
    msg.includes("change dates")
  ) {
    return {
      text: "For a quick 2–3 day escape without long travel:",
      destinations: [
        { id: 4, name: "Mysuru", state: "Karnataka", reason: "3 hours from Bengaluru — palace, markets, food, done in 2 days." },
        { id: 1, name: "Coorg", state: "Karnataka", reason: "4 hours from Bengaluru — arrive, breathe, leave refreshed." },
        { id: 3, name: "Pondicherry", state: "Tamil Nadu", reason: "3 hours from Chennai — French Quarter + beach + great cafes." },
      ],
    };
  }

  if (
    msg.includes("food") ||
    msg.includes("cuisine") ||
    msg.includes("eat") ||
    msg.includes("culinary")
  ) {
    return {
      text: "For travelers who plan trips around food, these are exceptional:",
      destinations: [
        { id: 3, name: "Pondicherry", state: "Tamil Nadu", reason: "Crepes, seafood curry, Tamil-French fusion — genuinely unique food culture." },
        { id: "chettinad", name: "Chettinad", state: "Tamil Nadu", reason: "Home of one of India's most complex cuisines — a food pilgrimage." },
        { id: 4, name: "Mysuru", state: "Karnataka", reason: "Mysuru pak, bisi bele bath, filter coffee — underrated food city." },
      ],
    };
  }

  return {
    text: "Let me search for options that better match what you're describing. Here are refined suggestions:",
    destinations: [
      { id: 1, name: "Coorg", state: "Karnataka", reason: "Still a strong match for your original preference — quiet, green, accessible." },
      { id: 3, name: "Pondicherry", state: "Tamil Nadu", reason: "A different vibe — coastal calm with cultural depth." },
      { id: 4, name: "Mysuru", state: "Karnataka", reason: "Heritage and comfort — very easy trip to plan and execute." },
    ],
  };
}

function DestCard({ chip }: { chip: DestChip }) {
  const router = useRouter();
  const colors = useColors();

  const handlePress = () => {
    if (typeof chip.id === "number") {
      const dest = destinations.find((d) => d.id === chip.id);
      router.push({
        pathname: "/destination/[id]",
        params: { id: chip.id, data: JSON.stringify(dest) },
      });
    } else {
      Alert.alert("Coming soon", "Full destination data coming soon.");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.82}
      style={styles.destCard}
    >
      <View style={[styles.destAvatar, { backgroundColor: colors.tealLight }]}>
        <Text style={[styles.destAvatarText, { color: colors.tealDark }]}>
          {chip.name[0]}
        </Text>
      </View>
      <View style={styles.destCardBody}>
        <Text style={styles.destCardName}>{chip.name}</Text>
        <Text style={[styles.destCardState, { color: colors.mutedForeground }]}>
          {chip.state}
        </Text>
        <Text style={styles.destCardReason}>{chip.reason}</Text>
      </View>
      <Feather name="chevron-right" size={18} color="#0D7377" />
    </TouchableOpacity>
  );
}

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { quizAnswers } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "ai", text: initialChatMessage.text },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const listRef = useRef<FlatList>(null);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const contextPills = [
    quizAnswers.duration ? `${quizAnswers.duration} days` : "4–5 days",
    quizAnswers.city
      ? quizAnswers.city.charAt(0).toUpperCase() + quizAnswers.city.slice(1)
      : "Bengaluru",
    quizAnswers.budget === "15-30k"
      ? "₹30K budget"
      : quizAnswers.budget || "₹30K budget",
    quizAnswers.interests?.[0] || "Nature",
  ];

  const suggestionChips =
    responseCount === 0
      ? ["Show quieter options", "Better for couples", "Smaller budget"]
      : responseCount === 1
        ? ROUND1_CHIPS
        : ROUND2_CHIPS;

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
    };
    setMessages((prev) => [userMsg, ...prev]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const intent = detectIntent(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: intent.text,
        chips: intent.destinations,
      };
      setMessages((prev) => [aiMsg, ...prev]);
      setResponseCount((c) => c + 1);
    }, 1500);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageWrapper}>
      <ChatBubble role={item.role} text={item.text} />
      {item.chips && item.chips.length > 0 && (
        <View style={styles.destCardList}>
          {item.chips.map((chip) => (
            <DestCard key={`${chip.id}-${chip.name}`} chip={chip} />
          ))}
        </View>
      )}
    </View>
  );

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
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>
          Refine your trip
        </Text>
        <TouchableOpacity onPress={() => Alert.alert("Trip context", "Your quiz answers have been loaded to personalise suggestions.")}>
          <Feather name="info" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      <View style={[styles.pillBar, { borderBottomColor: colors.border }]}>
        <FlatList
          horizontal
          data={contextPills}
          keyExtractor={(_, i) => i.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={[styles.contextPill, { backgroundColor: colors.muted }]}>
              <Text style={[styles.contextPillText, { color: colors.mutedForeground }]}>
                {item}
              </Text>
            </View>
          )}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
          contentContainerStyle={styles.messageList}
          ListHeaderComponent={
            isTyping ? (
              <View style={styles.typingWrap}>
                <TypingIndicator />
              </View>
            ) : null
          }
          ListFooterComponent={
            <View style={styles.suggestionsRow}>
              {suggestionChips.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => sendMessage(s)}
                  disabled={isTyping}
                  style={[
                    styles.suggestion,
                    {
                      borderColor: colors.tealDark,
                      backgroundColor: colors.card,
                      opacity: isTyping ? 0.5 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.suggestionText, { color: colors.tealDark }]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          showsVerticalScrollIndicator={false}
        />

        <View
          style={[
            styles.inputBar,
            {
              paddingBottom: bottomPad + 12,
              backgroundColor: colors.card,
              borderTopColor: colors.border,
            },
          ]}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything about your trip..."
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.foreground,
                backgroundColor: colors.background,
              },
            ]}
            multiline={false}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
            editable={!isTyping}
          />
          <TouchableOpacity
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            style={[
              styles.sendBtn,
              {
                backgroundColor:
                  input.trim() && !isTyping ? colors.primary : colors.border,
              },
            ]}
          >
            <Feather name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  pillBar: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  contextPill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  contextPillText: {
    fontSize: 12,
  },
  messageList: {
    padding: 16,
    gap: 4,
  },
  messageWrapper: {
    gap: 10,
    marginBottom: 4,
  },
  typingWrap: {
    paddingBottom: 8,
  },
  destCardList: {
    gap: 8,
    paddingLeft: 4,
    paddingRight: 4,
  },
  destCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    gap: 12,
  },
  destAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  destAvatarText: {
    fontSize: 15,
    fontWeight: "700",
  },
  destCardBody: {
    flex: 1,
    gap: 2,
  },
  destCardName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  destCardState: {
    fontSize: 12,
  },
  destCardReason: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#666666",
    lineHeight: 18,
    marginTop: 2,
  },
  suggestionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 12,
  },
  suggestion: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: "500",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
