import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Bookmark, MapPin, Clock, DollarSign, Utensils, Bed } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { itineraryData } from "@/data/mockData";

export default function ItineraryDetailScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { savedItinerary, saveItinerary } = useApp();

  const { days: customDays, budget, startCity } = location.state || {};
  const itinerary = itineraryData;

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
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.tealDark})`,
          padding: "20px 16px 20px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 20,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={18} color="#fff" />
          </button>
          <span style={{ flex: 1, fontSize: 18, fontWeight: 700, color: "#fff" }}>
            {customDays ? `${customDays}-Day Circuit` : itinerary.title}
          </span>
          <button
            onClick={saveItinerary}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 20,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bookmark
              size={18}
              color={savedItinerary ? colors.gold : "#fff"}
              fill={savedItinerary ? colors.gold : "none"}
            />
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {[
            { icon: MapPin, label: startCity || itinerary.startCity },
            { icon: Clock, label: `${itinerary.days.length} days` },
            { icon: DollarSign, label: `₹${itinerary.totalCost.toLocaleString("en-IN")}` },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 20,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Icon size={13} color="#fff" />
              <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ flex: 1, overflowY: "auto", padding: "16px 16px" }}
        className="hide-scrollbar"
      >
        {itinerary.days.map((day, i) => (
          <div key={day.day} style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: colors.tealDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>D{day.day}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, display: "block" }}>
                  {day.destination}
                </span>
                <span style={{ fontSize: 12, color: colors.mutedForeground }}>{day.travelTime}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>
                ₹{day.cost.toLocaleString("en-IN")}
              </span>
            </div>

            <div
              style={{
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                overflow: "hidden",
                backgroundColor: colors.card,
              }}
            >
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.tealDark, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Experiences
                  </span>
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 5 }}>
                    {day.experiences.map((exp) => (
                      <div key={exp} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: colors.tealDark,
                            marginTop: 7,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 14, color: colors.foreground, lineHeight: "20px" }}>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {day.food !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Utensils size={15} color={colors.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.foreground, lineHeight: "19px" }}>{day.food}</span>
                  </div>
                )}

                {day.stay !== "—" && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Bed size={15} color={colors.primary} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.foreground, lineHeight: "19px" }}>{day.stay}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
            backgroundColor: colors.card,
            marginBottom: 20,
          }}
        >
          <div style={{ padding: "16px 16px" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, display: "block", marginBottom: 12 }}>
              Cost summary
            </span>
            {itinerary.days
              .filter((d) => d.destination !== "Return journey" || d.cost > 0)
              .map((day) => (
                <div
                  key={day.day}
                  style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}
                >
                  <span style={{ fontSize: 14, color: colors.foreground }}>Day {day.day} — {day.destination}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>
                    ₹{day.cost.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            <div style={{ height: 1, backgroundColor: colors.border, margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: colors.foreground }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>
                ₹{itinerary.totalCost.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!savedItinerary && (
        <div style={{ padding: "12px 16px 20px", backgroundColor: colors.card, borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
          <button
            onClick={saveItinerary}
            style={{
              width: "100%",
              height: 52,
              borderRadius: 8,
              backgroundColor: colors.primary,
              color: "#fff",
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save to wishlist
          </button>
        </div>
      )}
    </div>
  );
}
