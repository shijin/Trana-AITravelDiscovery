import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ChevronRight } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { initialChatMessage, destinations } from "@/data/mockData";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import { useApp } from "@/context/AppContext";
import { callClaude } from "@/lib/claude";
import {
  ITINERARY_SYSTEM_PROMPT,
  parseItinerary,
  CITY_MAP,
  BUDGET_MAP,
  COMPANION_MAP,
} from "@/lib/itinerary";

interface SingleDest {
  name: string;
  state: string;
  reason: string;
}

interface MultiDest {
  name: string;
  state: string;
  suggestedDays: number;
  reason: string;
}

interface Message {
  role: "user" | "ai";
  text: string;
  intent?: "single" | "multi";
  destinations?: SingleDest[];
  tripTitle?: string;
  totalDays?: number;
  multiDests?: MultiDest[];
}

interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

const CHAT_SYSTEM_PROMPT = `You are Trāna's AI travel discovery assistant — a warm, knowledgeable Indian travel expert who deeply understands the diversity of travel experiences across India.

CRITICAL RULES:
1. Always recommend real Indian destinations only
2. Keep response text concise — maximum 3 sentences
3. Detect whether the user wants:
   A) A SINGLE destination recommendation (exploring options, not sure where to go)
   B) A MULTI-DESTINATION trip (user has explicitly mentioned 2+ places OR asked to combine destinations)

4. Always respond with ONLY this JSON block and nothing else:

For SINGLE destination intent:
RESPONSE: {
  "intent": "single",
  "text": "Your conversational response here",
  "destinations": [
    {"name": "...", "state": "...", "reason": "One sentence why it fits perfectly"},
    {"name": "...", "state": "...", "reason": "One sentence why it fits perfectly"},
    {"name": "...", "state": "...", "reason": "One sentence why it fits perfectly"}
  ]
}

For MULTI-DESTINATION intent:
RESPONSE: {
  "intent": "multi",
  "text": "Your conversational response here",
  "tripTitle": "Destination1 + Destination2",
  "totalDays": 6,
  "destinations": [
    {"name": "Destination1", "state": "State", "suggestedDays": 3, "reason": "Why this deserves these days"},
    {"name": "Destination2", "state": "State", "suggestedDays": 3, "reason": "Why this deserves these days"}
  ]
}

5. Use "multi" intent when:
   - User mentions 2 or more place names together
   - User says "and" between destinations
   - User says "combine", "circuit", "both places"
   - User asks to plan a trip covering multiple cities

6. Use "single" intent when:
   - User asks for recommendations without specifying destinations
   - User mentions only one destination
   - User asks "where should I go"

7. For multi intent:
   - Distribute days logically — more to destinations with more to see
   - Days must always sum exactly to totalDays
   - If no days mentioned, suggest an optimal total

8. Match all recommendations to the user's budget, companion type, and activity level
9. Never recommend the same destination twice in a conversation
10. Be warm and conversational in the "text" field`;

function parseClaudeResponse(response: string): {
  intent: "single" | "multi";
  text: string;
  destinations?: SingleDest[];
  tripTitle?: string;
  totalDays?: number;
  multiDests?: MultiDest[];
} {
  // Try new RESPONSE: {...} format
  const responseMatch = response.match(/RESPONSE:\s*(\{[\s\S]*\})/);
  if (responseMatch) {
    try {
      const parsed = JSON.parse(responseMatch[1]);
      if (parsed.intent === "multi") {
        return {
          intent: "multi",
          text: parsed.text || "",
          tripTitle: parsed.tripTitle || parsed.destinations?.map((d: MultiDest) => d.name).join(" + ") || "",
          totalDays: parsed.totalDays || parsed.destinations?.reduce((s: number, d: MultiDest) => s + (d.suggestedDays || 2), 0),
          multiDests: parsed.destinations || [],
        };
      }
      return {
        intent: "single",
        text: parsed.text || "",
        destinations: parsed.destinations || [],
      };
    } catch {
      // fall through to old format
    }
  }

  // Fallback: old DESTINATIONS: [...] format
  const destMatch = response.match(/DESTINATIONS:\s*(\[[\s\S]*?\])/);
  if (destMatch) {
    try {
      const dests = JSON.parse(destMatch[1]);
      return {
        intent: "single",
        text: response.replace(/DESTINATIONS:\s*\[[\s\S]*?\]/, "").trim(),
        destinations: dests,
      };
    } catch { /* */ }
  }

  return { intent: "single", text: response, destinations: [] };
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

const GRADIENTS: [string, string][] = [
  ["#0f766e", "#16a34a"],
  ["#1d4ed8", "#0891b2"],
  ["#6d28d9", "#4f46e5"],
  ["#0f766e", "#15803d"],
  ["#b45309", "#d97706"],
  ["#be185d", "#e11d48"],
  ["#374151", "#6b7280"],
  ["#7c3aed", "#a855f7"],
];

function getGradient(name: string): [string, string] {
  return GRADIENTS[name.length % GRADIENTS.length];
}

function getTagsFromReason(reason: string): string[] {
  const tagMap: Record<string, string[]> = {
    beach: ["Beach", "Coastal", "Scenic"],
    mountain: ["Mountains", "Trekking", "Adventure"],
    heritage: ["Heritage", "History", "Culture"],
    nature: ["Nature", "Wildlife", "Outdoors"],
    spiritual: ["Spiritual", "Temple", "Peaceful"],
    food: ["Food", "Culinary", "Local Culture"],
    waterfall: ["Nature", "Scenic", "Offbeat"],
    forest: ["Nature", "Offbeat", "Adventure"],
    lake: ["Scenic", "Nature", "Peaceful"],
    temple: ["Spiritual", "Heritage", "Culture"],
    hill: ["Hill Station", "Cool Climate", "Nature"],
    trek: ["Trekking", "Adventure", "Outdoors"],
  };
  const lower = reason.toLowerCase();
  for (const [kw, tags] of Object.entries(tagMap)) {
    if (lower.includes(kw)) return tags;
  }
  return ["Offbeat", "Explore", "Discover"];
}

export default function ChatScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { quizAnswers } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: initialChatMessage.text, intent: "single" },
  ]);
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
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

    const quizContext =
      quizAnswers && Object.keys(quizAnswers).length > 0
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
      { role: "assistant", content: "I understand your travel preferences. How can I help?" },
      ...conversationHistory,
      { role: "user", content: text },
    ];

    try {
      const response = await callClaude(CHAT_SYSTEM_PROMPT, apiMessages, 1000);
      const parsed = parseClaudeResponse(response);

      setConversationHistory((h) => [
        ...h,
        { role: "user", content: text },
        { role: "assistant", content: response },
      ]);

      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: parsed.text,
          intent: parsed.intent,
          destinations: parsed.destinations,
          tripTitle: parsed.tripTitle,
          totalDays: parsed.totalDays,
          multiDests: parsed.multiDests,
        },
      ]);
    } catch (err: unknown) {
      setTyping(false);
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Claude API error:", errMsg);
      setMessages((m) => [...m, { role: "ai", text: `Error: ${errMsg}` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDestTap = (dest: SingleDest) => {
    const mock = findMockDest(dest.name);
    const navState = { fromChat: true, quizAnswers };
    if (mock) {
      navigate(`/destination/${mock.id}`, { state: { dest: mock, ...navState } });
    } else {
      const dynamic = {
        id: -1,
        name: dest.name,
        state: dest.state,
        region: dest.state,
        heroGradient: getGradient(dest.name),
        tags: getTagsFromReason(dest.reason),
        rationale: dest.reason,
        budgetBreakdown: { transport: 5000, stay: 8000, food: 3000 },
        totalBudget: 16000,
        bestMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        currentSeason: "ideal",
        activityLevel: "moderate",
        companionTypes: ["solo", "couple", "family"],
        foodHighlights: [`Local ${dest.state} cuisine`, "Regional specialties", "Street food"],
        videos: [],
        isDynamic: true,
      };
      navigate(`/destination/-1`, { state: { dest: dynamic, ...navState } });
    }
  };

  const handleBuildCombinedCircuit = async (
    multiDests: MultiDest[],
    totalDays: number,
    tripTitle: string
  ) => {
    setIsBuilding(true);
    const startCity = CITY_MAP[quizAnswers?.city || ""] || quizAnswers?.city || "your city";
    const budgetLabel =
      BUDGET_MAP[quizAnswers?.budget || ""] || "₹30,000–₹60,000";
    const companion = COMPANION_MAP[quizAnswers?.companion || ""] || "traveler";

    const destinationList = multiDests
      .map((d) => `${d.name}, ${d.state} (${d.suggestedDays} days)`)
      .join("\n");

    const userPrompt = `Build a ${totalDays}-day travel circuit covering these destinations in order:
${destinationList}

Traveler context:
- Traveling with: ${companion}
- Budget: ${budgetLabel} total for the trip
- Starting from: ${startCity}

IMPORTANT:
- Include ALL destinations listed above — do not skip or merge any
- Give exactly the number of days specified for each destination
- Total days must equal exactly ${totalDays}
- Plan realistic travel between destinations

REMINDER: Return EXACTLY ${totalDays} days in the days array. Not ${totalDays + 1}. Not ${totalDays - 1}. Exactly ${totalDays}.`;

    try {
      const response = await callClaude(
        ITINERARY_SYSTEM_PROMPT,
        [{ role: "user", content: userPrompt }],
        2500
      );
      const itinerary = parseItinerary(response);
      if (itinerary) {
        navigate("/itinerary-detail", { state: { itinerary } });
      } else {
        alert("Could not build the circuit. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        position: "relative",
      }}
    >
      {/* ── Building overlay ── */}
      {isBuilding && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(26, 60, 94, 0.96)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
          }}
        >
          <style>{`
            @keyframes chatBounceDot {
              0%, 100% { transform: scale(0.6); opacity: 0.4; }
              50% { transform: scale(1.2); opacity: 1; }
            }
          `}</style>
          <span style={{ fontSize: 40, marginBottom: 24 }}>🗺️</span>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 8px", textAlign: "center" }}>
            Building your circuit
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "center", margin: "0 0 32px", lineHeight: "1.6" }}>
            Planning the perfect route across{"\n"}all your destinations...
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8, height: 8,
                  borderRadius: 4,
                  backgroundColor: "#14A085",
                  animation: `chatBounceDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Header ── */}
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

      {/* ── Messages ── */}
      <div
        style={{ flex: 1, overflowY: "auto", padding: "16px 16px" }}
        className="hide-scrollbar"
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatBubble role={msg.role} text={msg.text} />

            {/* Single intent — individual destination cards */}
            {msg.role === "ai" &&
              msg.intent !== "multi" &&
              msg.destinations &&
              msg.destinations.length > 0 && (
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

            {/* Multi intent — combined circuit card */}
            {msg.role === "ai" &&
              msg.intent === "multi" &&
              msg.multiDests &&
              msg.multiDests.length > 0 && (
                <div
                  style={{
                    borderRadius: 16,
                    border: `2px solid ${colors.tealDark}`,
                    overflow: "hidden",
                    marginTop: 12,
                    marginBottom: 12,
                    marginLeft: 12,
                  }}
                >
                  {/* Circuit header */}
                  <div style={{ background: colors.primary, padding: 16 }}>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, letterSpacing: 1, margin: "0 0 4px" }}>
                      COMBINED CIRCUIT
                    </p>
                    <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>
                      {msg.tripTitle}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>
                      {msg.totalDays} days · {msg.multiDests.length} destinations
                    </p>
                  </div>

                  {/* Destination rows */}
                  <div style={{ padding: "12px 16px", backgroundColor: colors.card }}>
                    {msg.multiDests.map((dest, di) => (
                      <div
                        key={di}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottom: di < (msg.multiDests?.length || 0) - 1 ? `1px solid ${colors.border}` : "none",
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            backgroundColor: "#D6F0EF",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ color: "#0D7377", fontSize: 15, fontWeight: 700, lineHeight: "18px" }}>
                            {dest.suggestedDays}
                          </span>
                          <span style={{ color: "#0D7377", fontSize: 9, lineHeight: "11px" }}>days</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: "0 0 1px", fontSize: 15, fontWeight: 600, color: colors.foreground }}>
                            {dest.name}
                          </p>
                          <p style={{ margin: "0 0 2px", fontSize: 12, color: colors.mutedForeground }}>
                            {dest.state}
                          </p>
                          <p style={{ margin: 0, fontSize: 12, color: colors.mutedForeground, fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {dest.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Build CTA */}
                  <div style={{ padding: "12px 16px 16px", backgroundColor: colors.card }}>
                    <button
                      onClick={() =>
                        handleBuildCombinedCircuit(
                          msg.multiDests!,
                          msg.totalDays!,
                          msg.tripTitle!
                        )
                      }
                      disabled={isBuilding}
                      style={{
                        width: "100%",
                        height: 52,
                        background: "#C9962B",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: isBuilding ? "not-allowed" : "pointer",
                        opacity: isBuilding ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      Build this {msg.totalDays}-day circuit →
                    </button>
                  </div>
                </div>
              )}
          </div>
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
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
          placeholder="Ask about a destination or plan a circuit..."
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
