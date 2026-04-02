import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Star,
  Calendar,
  Activity,
  Utensils,
  MapPin,
  Play,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { destinations, type Destination } from "@/data/mockData";
import { callClaude } from "@/lib/claude";
import {
  ITINERARY_SYSTEM_PROMPT,
  parseItinerary,
  DAYS_MAP,
  CITY_MAP,
  BUDGET_MAP,
  COMPANION_MAP,
} from "@/lib/itinerary";

export default function DestinationDetailScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, isWishlisted, quizAnswers: contextQuiz } = useApp();

  // Quiz answers: prefer those passed from chat (more specific), fallback to context
  const quizAnswers = location.state?.quizAnswers || contextQuiz || {};
  const fromChat = location.state?.fromChat === true;

  // State passed via router takes priority over URL param lookup
  const stateDest: Destination | undefined =
    location.state?.dest || location.state?.destination;

  const paramDest: Destination | undefined = destinations.find(
    (d) =>
      d.id === parseInt(id || "0") ||
      d.name.toLowerCase().replace(/\s+/g, "-") === id
  );

  const dest = stateDest || paramDest;

  const [isBuilding, setIsBuilding] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "budget" | "videos">("overview");

  if (!dest) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: 32,
          textAlign: "center",
          backgroundColor: colors.background,
        }}
      >
        <span style={{ fontSize: 48, marginBottom: 16 }}>🧭</span>
        <h2 style={{ color: colors.primary, fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
          Destination not found
        </h2>
        <p style={{ color: colors.mutedForeground, fontSize: 14, margin: "0 0 24px", lineHeight: "20px" }}>
          We don't have details for this destination yet. More are coming soon.
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 24px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Go back
        </button>
      </div>
    );
  }

  // Derive trip context from quiz answers
  const totalDays = DAYS_MAP[quizAnswers.duration || ""] || 4;
  const startCity = CITY_MAP[quizAnswers.city || ""] || quizAnswers.city || "your city";
  const budgetLabel =
    BUDGET_MAP[quizAnswers.budget || ""] ||
    (dest.totalBudget ? `₹${dest.totalBudget.toLocaleString("en-IN")}` : "moderate budget");
  const companion = COMPANION_MAP[quizAnswers.companion || ""] || "traveler";

  async function handleBuildItinerary() {
    setIsBuilding(true);
    const userPrompt = `Build a ${totalDays}-day travel itinerary for ${dest!.name}, ${dest!.state}.

Traveler context:
- Traveling with: ${companion}
- Budget: ${budgetLabel} total
- Starting from: ${startCity}
- Activity level: ${dest!.activityLevel || "moderate"}

Create a detailed day-by-day plan covering the best experiences in ${dest!.name}. Include only ${dest!.name} — do not add other destinations. Make it specific, practical, and memorable.`;

    try {
      const response = await callClaude(
        ITINERARY_SYSTEM_PROMPT,
        [{ role: "user", content: userPrompt }],
        2000
      );
      const itinerary = parseItinerary(response);
      if (itinerary) {
        navigate("/itinerary-detail", { state: { itinerary } });
      } else {
        alert("Could not build itinerary. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsBuilding(false);
    }
  }

  const saved = isWishlisted(dest.id);
  const hasVideos = dest.videos && dest.videos.length > 0;
  const tabs = hasVideos
    ? (["overview", "budget", "videos"] as const)
    : (["overview", "budget"] as const);

  const handleSave = () => {
    if (dest.isDynamic) return;
    if (saved) removeFromWishlist(dest.id);
    else addToWishlist(dest);
  };

  const budgetTotal =
    dest.budgetBreakdown.transport + dest.budgetBreakdown.stay + dest.budgetBreakdown.food;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* ── Loading overlay ── */}
      {isBuilding && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
            @keyframes tranaBounceDot {
              0%, 100% { transform: scale(0.6); opacity: 0.4; }
              50% { transform: scale(1.2); opacity: 1; }
            }
            @keyframes tranaPulseCompass {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.08); }
            }
          `}</style>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              animation: "tranaPulseCompass 1.5s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: 32 }}>🧭</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 8px", textAlign: "center" }}>
            Building your {dest.name} plan
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "center", margin: "0 0 40px", lineHeight: "1.6" }}>
            Finding the best experiences, local food,{"\n"}and stays for your trip...
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#14A085",
                  animation: `tranaBounceDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <div
        style={{
          height: 260,
          background: `linear-gradient(160deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`,
          position: "relative",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <div style={{ position: "absolute", top: 20, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "rgba(0,0,0,0.25)", border: "none", borderRadius: 20, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ArrowLeft size={20} color="#fff" />
          </button>
          {!dest.isDynamic && !fromChat && (
            <button
              onClick={handleSave}
              style={{ background: "rgba(0,0,0,0.25)", border: "none", borderRadius: 20, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <Bookmark size={20} color={saved ? colors.gold : "#fff"} fill={saved ? colors.gold : "none"} />
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {dest.tags.map((tag) => (
            <span
              key={tag}
              style={{ backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 20, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, fontSize: 12, fontWeight: 500, color: "#fff" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 style={{ margin: "0 0 4px", color: "#fff", fontSize: 32, fontWeight: 800 }}>
          {dest.name}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <MapPin size={14} color="rgba(255,255,255,0.8)" />
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
            {dest.state}{dest.region && dest.region !== dest.state ? `, ${dest.region}` : ""}
          </span>
          {dest.currentSeason === "ideal" && !dest.isDynamic && (
            <span style={{ backgroundColor: colors.gold, borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3, fontSize: 11, fontWeight: 600, color: "#fff", marginLeft: 4 }}>
              Best time now
            </span>
          )}
        </div>
      </div>

      {/* ── AI-discovered banner ── */}
      {dest.isDynamic && (
        <div style={{ backgroundColor: "#FDF3DC", borderLeft: "4px solid #C9962B", padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10, flexShrink: 0 }}>
          <Sparkles size={16} color="#C9962B" style={{ marginTop: 1, flexShrink: 0 }} />
          <div>
            <p style={{ margin: "0 0 3px", color: "#C9962B", fontSize: 13, fontWeight: 700 }}>AI-discovered destination</p>
            <p style={{ margin: 0, color: "#7A5A1A", fontSize: 12, lineHeight: "17px" }}>Detailed curated info is coming soon. Budget estimates are approximate.</p>
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div style={{ display: "flex", borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.card, flexShrink: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ flex: 1, paddingTop: 14, paddingBottom: 14, background: "none", border: "none", borderBottom: activeTab === tab ? `2px solid ${colors.tealDark}` : "2px solid transparent", cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab ? 600 : 400, color: activeTab === tab ? colors.tealDark : colors.mutedForeground, textTransform: "capitalize" }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }} className="hide-scrollbar">

        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: colors.primary }}>
                {dest.isDynamic ? "About this destination" : "Why this fits you"}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: "24px", color: colors.foreground, fontStyle: "italic" }}>
                {dest.rationale}
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: Activity, label: "Activity", val: dest.activityLevel },
                { icon: Calendar, label: "Season", val: dest.currentSeason },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} style={{ flex: 1, borderRadius: 10, padding: 14, backgroundColor: colors.muted, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                  <Icon size={18} color={colors.tealDark} />
                  <span style={{ fontSize: 12, color: colors.mutedForeground }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.foreground, textTransform: "capitalize" }}>{val}</span>
                </div>
              ))}
            </div>

            {dest.bestMonths && dest.bestMonths.length > 0 && (
              <div>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: colors.primary }}>Best months to visit</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {dest.bestMonths.map((month) => (
                    <span key={month} style={{ backgroundColor: colors.tealLight, borderRadius: 20, paddingLeft: 14, paddingRight: 14, paddingTop: 6, paddingBottom: 6, fontSize: 13, fontWeight: 500, color: colors.tealDark }}>
                      {month}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: colors.primary }}>Must-try food</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {dest.foodHighlights.map((food) => (
                  <div key={food} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Utensils size={16} color={colors.gold} />
                    <span style={{ fontSize: 15, color: colors.foreground }}>{food}</span>
                  </div>
                ))}
              </div>
            </div>

            {dest.medicalFacilities && (
              <div style={{ borderRadius: 10, padding: 14, backgroundColor: colors.blueLight, display: "flex", alignItems: "center", gap: 10 }}>
                <Heart size={16} color={colors.primary} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.primary, display: "block" }}>Medical facilities nearby</span>
                  <span style={{ fontSize: 13, color: colors.foreground }}>{dest.medicalFacilities}</span>
                </div>
              </div>
            )}

            {fromChat ? (
              <button
                onClick={handleBuildItinerary}
                disabled={isBuilding}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 52, borderRadius: 8, border: "none", backgroundColor: "#C9962B", color: "#fff", fontSize: 16, fontWeight: 600, cursor: isBuilding ? "not-allowed" : "pointer", opacity: isBuilding ? 0.7 : 1, width: "100%" }}
              >
                Build my {totalDays}-day plan →
              </button>
            ) : (
              <button
                onClick={() => navigate("/chat")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 52, borderRadius: 8, border: `1.5px solid ${colors.tealDark}`, backgroundColor: "transparent", color: colors.tealDark, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
              >
                <MessageCircle size={18} color={colors.tealDark} />
                Ask about {dest.name}
              </button>
            )}
          </div>
        )}

        {activeTab === "budget" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.primary }}>Estimated cost breakdown</h3>
            {dest.isDynamic && (
              <p style={{ margin: 0, fontSize: 13, color: colors.mutedForeground, fontStyle: "italic", lineHeight: "18px" }}>
                Rough AI estimates — actual costs depend on group size, season, and booking.
              </p>
            )}
            {[
              { label: "Transport", amount: dest.budgetBreakdown.transport, key: "transport" },
              { label: "Stay", amount: dest.budgetBreakdown.stay, key: "stay" },
              { label: "Food", amount: dest.budgetBreakdown.food, key: "food" },
            ].map(({ label, amount, key }) => {
              const pct = Math.round((amount / budgetTotal) * 100);
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 15, color: colors.foreground }}>{label}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>₹{amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, backgroundColor: colors.muted, overflow: "hidden" }}>
                    <div style={{ height: "100%", backgroundColor: colors.tealDark, borderRadius: 4, width: `${pct}%`, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              );
            })}
            <div style={{ height: 1, backgroundColor: colors.border }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: colors.foreground }}>Total (estimated)</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>₹{dest.totalBudget.toLocaleString("en-IN")}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, lineHeight: "18px", color: colors.mutedForeground, fontStyle: "italic" }}>
              Estimated per couple per trip. Actual costs may vary.
            </p>
            {fromChat ? (
              <button
                onClick={handleBuildItinerary}
                disabled={isBuilding}
                style={{ height: 52, borderRadius: 8, backgroundColor: "#C9962B", color: "#fff", border: "none", fontSize: 16, fontWeight: 600, cursor: isBuilding ? "not-allowed" : "pointer", opacity: isBuilding ? 0.7 : 1, marginTop: 8 }}
              >
                Build my {totalDays}-day plan →
              </button>
            ) : (
              <button
                onClick={() => navigate("/itinerary", { state: { dest } })}
                style={{ height: 52, borderRadius: 8, backgroundColor: colors.primary, color: "#fff", border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer", marginTop: 8 }}
              >
                Build itinerary for {dest.name}
              </button>
            )}
          </div>
        )}

        {activeTab === "videos" && hasVideos && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ margin: 0, fontSize: 14, color: colors.mutedForeground }}>Real travel experiences from the community</p>
            {dest.videos.map((video) => (
              <div key={video.id} style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card }}>
                <div style={{ height: 120, background: `linear-gradient(135deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play size={20} color="#fff" fill="#fff" />
                  </div>
                </div>
                <div style={{ padding: 12 }}>
                  <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>{video.title}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: colors.mutedForeground }}>{video.creator}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Star size={13} color={colors.gold} fill={colors.gold} />
                      <span style={{ fontSize: 12, color: colors.mutedForeground }}>{video.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
