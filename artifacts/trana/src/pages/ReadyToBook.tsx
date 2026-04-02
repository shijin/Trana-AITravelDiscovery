import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useColors } from "@/hooks/useColors";

const BOOKING_PARTNERS = [
  {
    id: "mmt",
    name: "MakeMyTrip",
    subtitle: "Flights, hotels & packages",
    abbr: "MMT",
    logoGradient: "linear-gradient(135deg, #E8240B, #FF6B35)",
    url: "https://makemytrip.com",
  },
  {
    id: "booking",
    name: "Booking.com",
    subtitle: "Hotels & stays",
    abbr: "Bkg",
    logoGradient: "linear-gradient(135deg, #003580, #0055a5)",
    url: "https://booking.com",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    subtitle: "Unique stays & experiences",
    abbr: "Bnb",
    logoGradient: "linear-gradient(135deg, #FF5A5F, #FF8589)",
    url: "https://airbnb.com",
  },
];

export default function ReadyToBookScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { itinerary } = location.state || {};

  if (!itinerary) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 32 }}>
        <span style={{ fontSize: 16, color: colors.mutedForeground, textAlign: "center" }}>
          No trip data found. Please go back and build an itinerary.
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

  const firstDest: string = itinerary.days?.[0]?.destination || "";
  const lastDest: string = itinerary.days?.[itinerary.days.length - 1]?.destination || firstDest;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: colors.background, overflowY: "auto" }} className="hide-scrollbar">

      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 16px 16px",
          backgroundColor: colors.card,
          borderBottom: `1px solid ${colors.border}`,
          flexShrink: 0,
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
        >
          <ArrowLeft size={24} color={colors.foreground} />
        </button>
        <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>Ready to book</span>
      </div>

      {/* ── Hero confirmation card ── */}
      <div
        style={{
          backgroundColor: colors.primary,
          padding: 20,
          borderRadius: "0 0 24px 24px",
          marginBottom: 24,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 22, color: "#fff" }}>✓</span>
        </div>
        <h2 style={{ margin: "0 0 4px", color: "#fff", fontSize: 22, fontWeight: 700, textAlign: "center" }}>
          Your trip is planned
        </h2>
        <p style={{ margin: "0 0 12px", color: "rgba(255,255,255,0.85)", fontSize: 16, textAlign: "center" }}>
          {itinerary.title}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            `📅 ${itinerary.totalDays} days`,
            `💰 ${itinerary.totalEstimatedCost || itinerary.estimatedBudget}`,
          ].map((label) => (
            <span
              key={label}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: 13,
                borderRadius: 20,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Booking partners ── */}
      <div style={{ padding: "0 20px", flex: 1 }}>
        <p
          style={{
            margin: "0 0 4px",
            color: colors.tealDark,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Book with your preferred platform
        </p>
        <p style={{ margin: "0 0 16px", color: colors.mutedForeground, fontSize: 13 }}>
          Trāna helps you discover. These platforms help you book.
        </p>

        {BOOKING_PARTNERS.map((partner) => (
          <button
            key={partner.id}
            onClick={() => window.open(partner.url, "_blank")}
            style={{
              width: "100%",
              height: 72,
              backgroundColor: "#fff",
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              marginBottom: 12,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: partner.logoGradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#fff", fontSize: partner.id === "booking" ? 11 : 12, fontWeight: 700 }}>
                {partner.abbr}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 700, color: colors.foreground }}>
                {partner.name}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: colors.mutedForeground }}>
                {partner.subtitle}
              </p>
            </div>
            <span style={{ color: colors.tealDark, fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
              Search →
            </span>
          </button>
        ))}

        {/* ── Pro tip ── */}
        {firstDest && (
          <div
            style={{
              backgroundColor: "#FDF3DC",
              borderLeft: "4px solid #C9962B",
              borderRadius: "0 8px 8px 0",
              padding: "14px 16px",
              marginBottom: 20,
            }}
          >
            <p style={{ margin: "0 0 4px", color: "#C9962B", fontSize: 13, fontWeight: 600 }}>
              💡 Pro tip
            </p>
            <p style={{ margin: 0, color: "#666", fontSize: 13, lineHeight: "1.6" }}>
              Search for {firstDest}{lastDest !== firstDest ? ` to ${lastDest}` : ""} on MakeMyTrip for the best flight + hotel bundle deals.
            </p>
          </div>
        )}

        {/* ── Start over ── */}
        <button
          onClick={() => navigate("/discover")}
          style={{
            width: "100%",
            height: 52,
            border: `1px solid ${colors.border}`,
            backgroundColor: "#fff",
            color: colors.mutedForeground,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            marginBottom: 32,
          }}
        >
          Plan another trip
        </button>
      </div>
    </div>
  );
}
