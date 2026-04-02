import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, DollarSign, Utensils, Bed, Bus, Lightbulb } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export default function ItineraryDetailScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { savedItinerary, saveItinerary } = useApp();

  const { itinerary } = location.state || {};
  const [showToast, setShowToast] = useState(false);
  const [pressing, setPressing] = useState(false);

  if (!itinerary) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 32 }}>
        <span style={{ fontSize: 16, color: colors.mutedForeground, textAlign: "center" }}>
          No itinerary data found. Please go back and build one.
        </span>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "12px 24px", borderRadius: 8, backgroundColor: colors.primary, color: "#fff", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          Go back
        </button>
      </div>
    );
  }

  const destChain: string[] = [];
  itinerary.days.forEach((d: { destination: string }) => {
    if (!destChain.includes(d.destination)) destChain.push(d.destination);
  });

  const handleSaveToWishlist = () => {
    saveItinerary();
    setPressing(true);
    setTimeout(() => setPressing(false), 150);
    setShowToast(false);
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 10);
  };

  const handleReadyToBook = () => {
    navigate("/book", { state: { itinerary } });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: colors.background }}>

      {/* ── Toast ── */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: 20,
            right: 20,
            backgroundColor: "#1A3C5E",
            borderRadius: 12,
            padding: "14px 20px",
            zIndex: 2000,
            animation: "slideUpToast 0.25s ease-out",
          }}
        >
          <style>{`@keyframes slideUpToast { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
          <p style={{ margin: "0 0 3px", color: "#fff", fontSize: 15, fontWeight: 600 }}>Saved to wishlist</p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Come back when you feel ready.</p>
        </div>
      )}

      {/* ── Hero header ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.tealDark})`,
          padding: "20px 16px 20px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ArrowLeft size={18} color="#fff" />
          </button>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: "22px" }}>
            {itinerary.title}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {[
            { icon: MapPin, label: `Starting from ${itinerary.startCity}` },
            { icon: Clock, label: `${itinerary.totalDays} days` },
            { icon: DollarSign, label: itinerary.totalEstimatedCost || itinerary.estimatedBudget },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20, paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5 }}
            >
              <Icon size={13} color="#fff" />
              <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {destChain.map((name, i) => (
            <React.Fragment key={name}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{name}</span>
              {i < destChain.length - 1 && (
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Day cards ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 96 }} className="hide-scrollbar">
        {itinerary.days.map((day: {
          day: number;
          destination: string;
          travelInfo?: string;
          experiences: string[];
          food: string;
          stay: string;
          estimatedDailyCost?: string;
        }) => (
          <div key={day.day} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.tealDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>D{day.day}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, display: "block" }}>
                  {day.destination}
                </span>
                {day.travelInfo && day.travelInfo !== "—" && (
                  <span style={{ fontSize: 11, color: colors.mutedForeground, lineHeight: "15px" }}>
                    {day.travelInfo}
                  </span>
                )}
              </div>
              {day.estimatedDailyCost && (
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.primary, flexShrink: 0 }}>
                  {day.estimatedDailyCost}
                </span>
              )}
            </div>

            <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card }}>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.tealDark, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Experiences
                  </span>
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 5 }}>
                    {day.experiences.map((exp: string, idx: number) => (
                      <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.tealDark, marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: colors.foreground, lineHeight: "20px" }}>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {day.food && day.food !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Utensils size={15} color={colors.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.foreground, lineHeight: "19px" }}>{day.food}</span>
                  </div>
                )}

                {day.stay && day.stay !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Bed size={15} color={colors.primary} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.foreground, lineHeight: "19px" }}>{day.stay}</span>
                  </div>
                )}

                {day.travelInfo && day.travelInfo !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Bus size={15} color={colors.mutedForeground} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.mutedForeground, lineHeight: "19px" }}>{day.travelInfo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {itinerary.proTip && (
          <div
            style={{
              borderRadius: 12,
              backgroundColor: "#FDF3DC",
              borderLeft: "4px solid #C9962B",
              padding: "14px 14px",
              marginBottom: 16,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <Lightbulb size={18} color="#C9962B" style={{ marginTop: 1, flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#C9962B", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 4 }}>
                Pro Tip
              </span>
              <span style={{ fontSize: 14, color: "#7A5A1A", lineHeight: "20px" }}>{itinerary.proTip}</span>
            </div>
          </div>
        )}

        <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card, marginBottom: 20 }}>
          <div style={{ padding: "16px" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, display: "block", marginBottom: 12 }}>
              Cost summary
            </span>
            {destChain.map((dest) => {
              const destDays = itinerary.days.filter((d: { destination: string }) => d.destination === dest);
              const firstDay = destDays[0];
              const costText = firstDay?.estimatedDailyCost || "—";
              return (
                <div key={dest} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: colors.foreground }}>
                    {dest} ({destDays.length} day{destDays.length > 1 ? "s" : ""})
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>{costText}/day</span>
                </div>
              );
            })}
            <div style={{ height: 1, backgroundColor: colors.border, margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: colors.foreground }}>Total estimate</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>
                {itinerary.totalEstimatedCost || itinerary.estimatedBudget}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: colors.card,
          borderTop: `1px solid ${colors.border}`,
          padding: "12px 20px 24px",
          display: "flex",
          gap: 12,
          zIndex: 100,
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleSaveToWishlist}
          style={{
            flex: 1,
            height: 52,
            backgroundColor: "#fff",
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transform: pressing ? "scale(0.96)" : "scale(1)",
            transition: "transform 150ms ease",
          }}
        >
          🔖 Save trip
        </button>
        <button
          onClick={handleReadyToBook}
          style={{
            flex: 2,
            height: 52,
            backgroundColor: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          Ready to book →
        </button>
      </div>
    </div>
  );
}
