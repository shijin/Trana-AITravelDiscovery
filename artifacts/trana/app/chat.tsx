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
import { destinations, initialChatMessage } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  chips?: { id: number; name: string; state: string }[];
}

const SUGGESTIONS = [
  "Show quieter options",
  "Better for couples",
  "Smaller budget",
];

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
  const [suggestionsShown, setSuggestionsShown] = useState(false);
  const listRef = useRef<FlatList>(null);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const contextPills = [
    quizAnswers.duration ? `${quizAnswers.duration} days` : "4–5 days",
    quizAnswers.city
      ? quizAnswers.city.charAt(0).toUpperCase() + quizAnswers.city.slice(1)
      : "Bengaluru",
    quizAnswers.budget
      ? quizAnswers.budget === "15-30k"
        ? "₹30K budget"
        : quizAnswers.budget
      : "₹30K budget",
    quizAnswers.interests?.[0] || "Nature",
  ];

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
    setSuggestionsShown(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: "Based on what you've told me, here are 3 alternatives that better match your updated preference:",
        chips: destinations.slice(0, 3).map((d) => ({
          id: d.id,
          name: d.name,
          state: d.state,
        })),
      };
      setMessages((prev) => [aiMsg, ...prev]);
    }, 1500);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageWrapper}>
      <ChatBubble role={item.role} text={item.text} />
      {item.chips && (
        <View style={styles.chipRow}>
          {item.chips.map((chip) => (
            <TouchableOpacity
              key={chip.id}
              onPress={() =>
                router.push({
                  pathname: "/destination/[id]",
                  params: {
                    id: chip.id,
                    data: JSON.stringify(
                      destinations.find((d) => d.id === chip.id)
                    ),
                  },
                })
              }
              style={[styles.destChip, { backgroundColor: colors.tealLight, borderColor: colors.tealDark }]}
            >
              <Text style={[styles.destChipText, { color: colors.tealDark }]}>
                {chip.name} · {chip.state}
              </Text>
            </TouchableOpacity>
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
        <TouchableOpacity onPress={() => alert("Your quiz context is loaded")}>
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
          contentContainerStyle={[
            styles.messageList,
            { paddingBottom: isTyping ? 16 : 16 },
          ]}
          ListHeaderComponent={
            isTyping ? (
              <View style={{ padding: 16, paddingBottom: 0 }}>
                <TypingIndicator />
              </View>
            ) : null
          }
          ListFooterComponent={
            !suggestionsShown ? (
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
                    <Text style={[styles.suggestionText, { color: colors.tealDark }]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
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
    gap: 8,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingLeft: 4,
  },
  destChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  destChipText: {
    fontSize: 13,
    fontWeight: "500",
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
    paddingTop: 12,
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
