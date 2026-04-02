import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ChevronRight } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { initialChatMessage, destinations } from "@/data/mockData";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { useApp } from "@/context/AppContext";
import { callClaude } from "@/lib/claude";

interface RecommendedDest {
  name: string;
  state: string;
  reason: string;
}

interface Message {
  role: "user" | "ai";
  text: string;
  destinations?: RecommendedDest[];
}

interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

const CHAT_SYSTEM_PROMPT = `You are Trāna's AI travel discovery assistant — a warm, knowledgeable Indian travel expert who deeply understands the diversity of travel experiences across India.

Your role is to help travelers discover the perfect destination based on their context and preferences.

CRITICAL RULES:
1. Always recommend real Indian destinations only
2. Keep responses concise — maximum 3 sentences of text
3. Always end your response with exactly 3 destination recommendations in this JSON format on a new line:
   DESTINATIONS: [
     {"name": "Destination Name", "state": "State", "reason": "One sentence why it fits perfectly"},
     {"name": "Destination Name", "state": "State", "reason": "One sentence why it fits perfectly"},
     {"name": "Destination Name", "state": "State", "reason": "One sentence why it fits perfectly"}
   ]
4. Match recommendations to the user's budget, companion type, activity level, and mood
5. Never recommend the same destination twice in a conversation
6. Be conversational and warm — like a trusted friend who knows India deeply
7. If the user mentions a specific state like Kerala, ONLY recommend destinations within that state
8. If user mentions budget constraints, strictly respect them`;

function parseClaudeResponse(response: string): { text: string; destinations: RecommendedDest[] } {
  const match = response.match(/DESTINATIONS:\s*(\[[\s\S]*?\])/);
  let destinations: RecommendedDest[] = [];
  let text = response;

  if (match) {
    try {
      destinations = JSON.parse(match[1]);
      text = response.replace(/DESTINATIONS:\s*\[[\s\S]*?\]/, "").trim();
    } catch {
      // keep text as-is if JSON fails
    }
  }

  return { text, destinations };
}

function findMockDest(name: string) {
  const lower = name.toLowerCase();
  return destinations.find(
    (d) =>
      d.name.toLowerCase() === lower ||
      d.name.toLowerCase().includes(lower) ||
      lower.includes(d.name.toLowerCase())
  );
}

export default function ChatScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { quizAnswers } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: initialChatMessage.text },
  ]);
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);

    const quizContext = quizAnswers && Object.keys(quizAnswers).length > 0
      ? `User context from their travel quiz:
- Mood: ${quizAnswers.mood || "not specified"}
- Travel companions: ${quizAnswers.companion || "not specified"}
- Trip duration: ${quizAnswers.duration || "not specified"}
- Budget: ${quizAnswers.budget || "not specified"}
- Interests: ${quizAnswers.interests?.join(", ") || "not specified"}
- Activity level: ${quizAnswers.activity || "not specified"}
- Home city: ${quizAnswers.city || "not specified"}

Use this context to personalise every recommendation.`
      : "No quiz context available — ask the user for preferences.";

    const apiMessages: ConversationTurn[] = [
      { role: "user", content: quizContext },
      {
        role: "assistant",
        content:
          "I understand your travel preferences. How can I help you find the perfect destination?",
      },
      ...conversationHistory,
      { role: "user", content: text },
    ];

    try {
      const response = await callClaude(CHAT_SYSTEM_PROMPT, apiMessages, 800);
      const { text: aiText, destinations: aiDests } = parseClaudeResponse(response);

      setConversationHistory((h) => [
        ...h,
        { role: "user", content: text },
        { role: "assistant", content: response },
      ]);

      setTyping(false);
      setMessages((m) => [
        ...m,
        { role: "ai", text: aiText, destinations: aiDests },
      ]);
    } catch (err: unknown) {
      setTyping(false);
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Claude API error:", errMsg);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Error: ${errMsg}`,
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDestTap = (dest: RecommendedDest) => {
    const mock = findMockDest(dest.name);
    if (mock) {
      navigate(`/destination/${mock.id}`, { state: { dest: mock } });
    } else {
      navigate(`/destination/0`, {
        state: {
          dest: {
            id: 0,
            name: dest.name,
            state: dest.state,
            tagline: dest.reason,
            heroGradient: ["#0D7377", "#14A085"],
            tags: [],
            highlights: [],
            vibes: [],
            budgetPerDay: 0,
            travelTime: "",
            season: "",
            description: dest.reason,
          },
        },
      });
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
          <div key={i}>
            <ChatBubble role={msg.role} text={msg.text} />
            {msg.role === "ai" && msg.destinations && msg.destinations.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4, marginBottom: 12, marginLeft: 12 }}>
                {msg.destinations.map((dest, di) => (
                  <button
                    key={di}
                    onClick={() => handleDestTap(dest)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.card,
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: "#D6F0EF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#0D7377" }}>
                        {dest.name.charAt(0)}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: colors.foreground }}>
                          {dest.name}
                        </span>
                        <span style={{ fontSize: 12, color: colors.mutedForeground }}>
                          {dest.state}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: colors.mutedForeground,
                          fontStyle: "italic",
                          display: "block",
                          lineHeight: "16px",
                          marginTop: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dest.reason}
                      </span>
                    </div>
                    <ChevronRight size={16} color={colors.mutedForeground} style={{ flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            )}
          </div>
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
          disabled={!input.trim() || typing}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: input.trim() && !typing ? colors.tealDark : colors.muted,
            border: "none",
            cursor: input.trim() && !typing ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.15s",
          }}
        >
          <Send size={18} color={input.trim() && !typing ? "#fff" : colors.mutedForeground} />
        </button>
      </div>
    </div>
  );
}
