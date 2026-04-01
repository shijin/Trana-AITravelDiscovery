import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
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

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  showItineraryBtn?: boolean;
}

const SUGGESTIONS = [
  "5 days in Karnataka",
  "Weekend from Mumbai",
  "North India 7 days",
];

export default function ItineraryBuilderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "ai",
      text: "Hi! Tell me what kind of trip you're planning — where from, how many days, and what you're in the mood for. I'll build you a circuit.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestionsSent, setSuggestionsSent] = useState(false);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
    };
    setMessages((prev) => [userMsg, ...prev]);
    setInput("");
    setIsTyping(true);
    setSuggestionsSent(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: "Perfect — here's your 5-day Karnataka circuit starting from Hyderabad, all within ₹15,000.",
        showItineraryBtn: true,
      };
      setMessages((prev) => [aiMsg, ...prev]);
    }, 1500);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageWrapper}>
      <ChatBubble role={item.role} text={item.text} />
      {item.showItineraryBtn && (
        <TouchableOpacity
          onPress={() => router.push("/itinerary-detail")}
          style={[styles.itineraryBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.itineraryBtnText}>View full itinerary →</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>
          Build a circuit
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
          contentContainerStyle={styles.messageList}
          ListHeaderComponent={
            isTyping ? (
              <View style={{ padding: 16, paddingBottom: 0 }}>
                <TypingIndicator />
              </View>
            ) : null
          }
          ListFooterComponent={
            !suggestionsSent ? (
              <View>
                <View
                  style={[
                    styles.introCard,
                    { backgroundColor: colors.blueLight },
                  ]}
                >
                  <Feather name="map-pin" size={20} color={colors.primary} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      style={[styles.introTitle, { color: colors.primary }]}
                    >
                      Tell me your plan
                    </Text>
                    <Text
                      style={[
                        styles.introSub,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      Share your starting city, how many days you have, and
                      which region interests you — I'll build the route.
                    </Text>
                  </View>
                </View>
                <View style={styles.suggestionsRow}>
                  {SUGGESTIONS.map((s) => (
                    <TouchableOpacity
                      key={s}
                      onPress={() => sendMessage(s)}
                      style={[
                        styles.suggestion,
                        {
                          borderColor: colors.tealDark,
                          backgroundColor: colors.card,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.suggestionText,
                          { color: colors.tealDark },
                        ]}
                      >
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null
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
            placeholder="Where are you starting from?"
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.foreground,
                backgroundColor: colors.background,
              },
            ]}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
          />
          <TouchableOpacity
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
            style={[
              styles.sendBtn,
              { backgroundColor: input.trim() ? colors.primary : colors.border },
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
  introCard: {
    flexDirection: "row",
    gap: 12,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
  },
  introTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  introSub: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageList: {
    padding: 16,
    gap: 8,
  },
  messageWrapper: {
    gap: 10,
  },
  itineraryBtn: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 4,
  },
  itineraryBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  suggestionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  suggestion: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  suggestionText: {
    fontSize: 13,
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
