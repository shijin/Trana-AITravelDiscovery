import React, { useState, useRef, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { Destination } from "@/data/mockData";

interface Props {
  destination: Destination;
  onPress: () => void;
  onSave: () => void;
  saved: boolean;
  compact?: boolean;
}

const BURST_DIRS = [
  { x: -14, y: -14 },
  { x: 14, y: -14 },
  { x: -14, y: 14 },
  { x: 14, y: 14 },
];

export default function DestinationCard({
  destination,
  onPress,
  onSave,
  saved,
  compact = false,
}: Props) {
  const colors = useColors();
  const [bookmarkAnim, setBookmarkAnim] = useState(false);
  const [burstVisible, setBurstVisible] = useState(false);
  const prevSavedRef = useRef(saved);

  useEffect(() => {
    if (saved === prevSavedRef.current) return;
    prevSavedRef.current = saved;
    if (saved) {
      setBookmarkAnim(true);
      setBurstVisible(true);
      setTimeout(() => {
        setBookmarkAnim(false);
        setTimeout(() => setBurstVisible(false), 250);
      }, 400);
    }
  }, [saved]);

  return (
    <div
      onClick={onPress}
      style={{
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        backgroundColor: colors.card,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: compact ? 80 : 160,
          background: `linear-gradient(135deg, ${destination.heroGradient[0]}, ${destination.heroGradient[1]})`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 16,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 0,
          }}
        >
          <div
            style={{
              animation: bookmarkAnim ? "bookmark-bounce 0.4s ease" : undefined,
            }}
          >
            <Bookmark
              size={20}
              color={saved ? colors.gold : "rgba(255,255,255,0.9)"}
              fill={saved ? colors.gold : "none"}
            />
          </div>
          {burstVisible &&
            BURST_DIRS.map((dir, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 5,
                  height: 5,
                  borderRadius: 2.5,
                  backgroundColor: colors.gold,
                  top: 7.5,
                  left: 7.5,
                  animation: "burst-dot 0.25s ease forwards",
                  transform: `translate(${dir.x}px, ${dir.y}px)`,
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
            ))}
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>
            {destination.name}
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: 20,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 3,
              paddingBottom: 3,
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            {destination.state}
          </span>
        </div>
      </div>

      {!compact && (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {destination.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: colors.tealLight,
                  borderRadius: 24,
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 12,
                  fontWeight: 500,
                  color: colors.tealDark,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontStyle: "italic",
              lineHeight: "22px",
              color: colors.foreground,
            }}
          >
            {destination.rationale}
          </p>
          <div style={{ height: 1, backgroundColor: colors.border }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: colors.mutedForeground }}>Estimated total</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}>
              ₹{destination.totalBudget.toLocaleString("en-IN")}
            </span>
          </div>
          {destination.currentSeason === "ideal" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.tealDark,
                }}
              />
              <span style={{ fontSize: 13, color: colors.mutedForeground }}>
                Best time to visit
              </span>
            </div>
          )}
          <button
            onClick={onPress}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
              fontSize: 14,
              fontWeight: 600,
              color: colors.tealDark,
            }}
          >
            See why this fits you →
          </button>
        </div>
      )}
    </div>
  );
}
