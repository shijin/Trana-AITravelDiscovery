import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  role: "user" | "ai";
  text: string;
}

export default function ChatBubble({ role, text }: Props) {
  const colors = useColors();
  const isUser = role === "user";

  return (
    <View style={[styles.wrapper, isUser && styles.wrapperUser]}>
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.userBubble, { backgroundColor: colors.primary }]
            : [styles.aiBubble, { backgroundColor: "#F0F4F8" }],
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: isUser ? "#fff" : colors.foreground },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-start",
    marginVertical: 4,
  },
  wrapperUser: {
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    paddingHorizontal: 16,
  },
  userBubble: {
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
});
