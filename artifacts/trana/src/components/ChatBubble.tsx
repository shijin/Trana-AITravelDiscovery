import React from "react";
import { useColors } from "@/hooks/useColors";

interface Props {
  role: "user" | "ai";
  text: string;
}

export default function ChatBubble({ role, text }: Props) {
  const colors = useColors();
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 4,
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "12px 16px",
          borderRadius: 16,
          borderBottomRightRadius: isUser ? 4 : 16,
          borderBottomLeftRadius: isUser ? 16 : 4,
          backgroundColor: isUser ? colors.primary : "#F0F4F8",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: "22px",
            color: isUser ? "#fff" : colors.foreground,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
