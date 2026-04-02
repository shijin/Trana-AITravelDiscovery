import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Users, Map, ChevronRight } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { destinations } from "@/data/mockData";

export default function DiscoverScreen() {
  const colors = useColors();
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100%",
        padding: "20px 20px",
      }}
    >
      <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 700, color: colors.primary }}>
        What kind of trip?
      </h1>
      <p style={{ margin: "0 0 24px", fontSize: 14, color: colors.mutedForeground }}>
        Choose how you want to plan
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          onClick={() => navigate("/quiz")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: 16,
            borderRadius: 12,
            border: `1.5px solid ${colors.border}`,
            backgroundColor: colors.card,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: colors.tealLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Compass size={24} color={colors.tealDark} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.foreground }}>
              Discover for myself
            </span>
            <span style={{ fontSize: 13, color: colors.mutedForeground }}>
              Mood-matched destinations in 3 minutes
            </span>
          </div>
          <ChevronRight size={20} color="#999" />
        </button>

        <button
          onClick={() => alert("Coming in V2 — stay tuned!")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: 16,
            borderRadius: 12,
            border: `1.5px solid ${colors.border}`,
            backgroundColor: colors.card,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: colors.tealLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Users size={24} color={colors.tealDark} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.foreground }}>
              Plan with a partner
            </span>
            <span style={{ fontSize: 13, color: colors.mutedForeground }}>
              Share preferences, get one perfect match
            </span>
          </div>
          <span
            style={{
              backgroundColor: colors.goldLight,
              borderRadius: 24,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 4,
              paddingBottom: 4,
              fontSize: 11,
              fontWeight: 600,
              color: colors.gold,
            }}
          >
            V2
          </span>
        </button>

        <button
          onClick={() => navigate("/itinerary")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: 16,
            borderRadius: 12,
            border: `1.5px solid ${colors.border}`,
            backgroundColor: colors.card,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: colors.tealLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Map size={24} color={colors.tealDark} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.foreground }}>
              Build a circuit
            </span>
            <span style={{ fontSize: 13, color: colors.mutedForeground }}>
              Multi-destination trip by region or state
            </span>
          </div>
          <ChevronRight size={20} color="#999" />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28, marginBottom: 28 }}>
        <div style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: colors.mutedForeground }}>OR</span>
        <div style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
      </div>

      <p style={{ margin: "0 0 12px", fontSize: 14, color: colors.mutedForeground }}>
        Continue where you left off
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        {destinations.slice(0, 2).map((dest) => (
          <div
            key={dest.id}
            onClick={() => navigate(`/destination/${dest.id}`, { state: { dest } })}
            style={{
              flex: 1,
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
              backgroundColor: colors.card,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: 60,
                background: `linear-gradient(135deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`,
              }}
            />
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.foreground }}>{dest.name}</span>
              <span style={{ fontSize: 12, color: colors.mutedForeground }}>{dest.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
