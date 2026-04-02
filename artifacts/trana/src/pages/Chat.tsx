import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { initialChatMessage } from "@/data/mockData";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  role: "user" | "ai";
  text: string;
}

const AI_RESPONSES = [
  "That sounds like a great plan! Based on what you've told me, I'd suggest starting from Bengaluru and working your way south — Coorg → Wayanad → Munnar is a classic 7-day circuit under ₹20,000 per person.",
  "For a 4-day trip from Delhi, Rishikesh + Haridwar is hard to beat. You'll catch the Ganga Aarti in Haridwar on day 1, then white-water rafting in Rishikesh on day 3. Budget around ₹12,000 total.",
  "If you're travelling with seniors, I'd actually suggest Mysuru over Jaipur this season — better medical infrastructure, cooler climate, and far fewer stairs at the main sights.",
  "Interesting combination! Hampi + Goa in 6 days is doable — 3 nights in Hampi, then an overnight bus to Goa. Total budget around ₹18,000 for two including accommodation.",
  "For that budget, Kasol is perfect for October. Book your Chalal trek in advance — the guesthouses fill up fast. Total trip around ₹11,000 from Delhi including transport.",
];

let aiResponseIndex = 0;

export default function ChatScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: initialChatMessage.text },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const response = AI_RESPONSES[aiResponseIndex % AI_RESPONSES.length];
      aiResponseIndex++;
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: response }]);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px 16px",
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.card,
          gap: 12,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
        >
          <ArrowLeft size={24} color={colors.foreground} />
        </button>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: colors.foreground, display: "block" }}>
            Trip Planner AI
          </span>
          <span style={{ fontSize: 12, color: colors.tealDark }}>● Online · Indian travel specialist</span>
        </div>
      </div>

      <div
        style={{ flex: 1, overflowY: "auto", padding: "16px 16px" }}
        className="hide-scrollbar"
      >
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} text={msg.text} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          padding: "12px 16px 20px",
          borderTop: `1px solid ${colors.border}`,
          backgroundColor: colors.card,
          flexShrink: 0,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Where are you travelling from? How many days?"
          rows={1}
          style={{
            flex: 1,
            borderRadius: 20,
            border: `1px solid ${colors.border}`,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 12,
            fontSize: 15,
            resize: "none",
            fontFamily: "inherit",
            outline: "none",
            backgroundColor: colors.muted,
            color: colors.foreground,
            lineHeight: "20px",
            maxHeight: 120,
            overflowY: "auto",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: input.trim() ? colors.tealDark : colors.muted,
            border: "none",
            cursor: input.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.15s",
          }}
        >
          <Send size={18} color={input.trim() ? "#fff" : colors.mutedForeground} />
        </button>
      </div>
    </div>
  );
}
