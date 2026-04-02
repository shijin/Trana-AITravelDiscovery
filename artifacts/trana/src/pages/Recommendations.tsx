import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MapPin, RefreshCw } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { getRecommendations, type QuizAnswers, type Destination } from "@/data/mockData";
import DestinationCard from "@/components/DestinationCard";

function BuildingOverlay({ onDone }: { onDone: () => void }) {
  const colors = useColors();
  const nodes = [
    { id: 1, label: "Mood mapped" },
    { id: 2, label: "Budget filtered" },
    { id: 3, label: "Top destinations" },
  ];

  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: colors.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        zIndex: 100,
      }}
    >
      <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0, textAlign: "center", paddingLeft: 20, paddingRight: 20 }}>
        Building your curated list…
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                animation: "node-fade-in 0.3s ease both",
                animationDelay: `${i * 0.55}s`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: colors.gold,
                  border: `2px solid rgba(255,255,255,0.4)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={14} color="#fff" />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                  maxWidth: 70,
                }}
              >
                {node.label}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <div
                style={{
                  height: 2,
                  backgroundColor: "rgba(255,255,255,0.4)",
                  width: 60,
                  marginBottom: 24,
                  animation: "line-grow 0.35s ease both",
                  animationDelay: `${i * 0.55 + 0.3}s`,
                  overflow: "hidden",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function RecommendationsScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useApp();

  const quizAnswers: QuizAnswers = location.state?.quizAnswers || {};
  const recs: Destination[] = getRecommendations(quizAnswers);

  const [building, setBuilding] = useState(true);

  const handleSave = (dest: Destination) => {
    if (isWishlisted(dest.id)) {
      removeFromWishlist(dest.id);
    } else {
      addToWishlist(dest);
    }
  };

  if (building) {
    return <BuildingOverlay onDone={() => setBuilding(false)} />;
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 12,
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.border}`,
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
          <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary, display: "block" }}>
            Your match
          </span>
          <span style={{ fontSize: 12, color: colors.mutedForeground }}>Based on your preferences</span>
        </div>
        <button
          onClick={() => navigate("/quiz")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
        >
          <RefreshCw size={22} color={colors.tealDark} />
        </button>
      </div>

      <div
        style={{ flex: 1, overflowY: "auto", padding: "16px 16px" }}
        className="hide-scrollbar"
      >
        {recs.map((dest, i) => (
          <div
            key={dest.id}
            style={{
              marginBottom: 14,
              animation: `fade-up 0.35s ease both`,
              animationDelay: `${i * 120}ms`,
            }}
          >
            {i === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  padding: "6px 12px",
                  borderRadius: 8,
                  backgroundColor: colors.goldLight,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.gold }}>
                  ✦ Best match for you
                </span>
              </div>
            )}
            <DestinationCard
              destination={dest}
              onPress={() => navigate(`/destination/${dest.id}`, { state: { dest } })}
              onSave={() => handleSave(dest)}
              saved={isWishlisted(dest.id)}
            />
          </div>
        ))}
        <div style={{ paddingBottom: 16 }}>
          <button
            onClick={() => navigate("/chat")}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: `1.5px solid ${colors.tealDark}`,
              backgroundColor: "transparent",
              color: colors.tealDark,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Not what you wanted? Chat with AI
          </button>
        </div>
      </div>
    </div>
  );
}
