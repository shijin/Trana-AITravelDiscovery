import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { destinations } from "@/data/mockData";

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad"];
const DAYS_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const BUDGET_OPTIONS = ["Under ₹15,000", "₹15,000 – ₹30,000", "₹30,000 – ₹60,000", "Above ₹60,000"];
const REGION_OPTIONS = [
  "South India",
  "North India",
  "Northeast India",
  "Rajasthan",
  "Himachal Pradesh",
  "Kerala & Karnataka",
];

export default function ItineraryScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const preselected = location.state?.dest;

  const [city, setCity] = useState("Bengaluru");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("₹15,000 – ₹30,000");
  const [region, setRegion] = useState("South India");
  const [selectedDests, setSelectedDests] = useState<number[]>(
    preselected ? [preselected.id] : []
  );

  const inputStyle: React.CSSProperties = {
    height: 48,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 15,
    color: colors.foreground,
    backgroundColor: colors.card,
    width: "100%",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
  };

  const toggleDest = (id: number) => {
    setSelectedDests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBuild = () => {
    navigate("/itinerary-detail", {
      state: {
        destinations: destinations.filter((d) => selectedDests.includes(d.id)),
        days,
        budget,
        startCity: city,
      },
    });
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
          padding: "20px 16px 16px",
          gap: 12,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.card,
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
            Build a circuit
          </span>
          <span style={{ fontSize: 12, color: colors.mutedForeground }}>Multi-destination trip planner</span>
        </div>
      </div>

      <div
        style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}
        className="hide-scrollbar"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Starting city
            </p>
            <div style={{ position: "relative" }}>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={inputStyle}
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                color={colors.mutedForeground}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              />
            </div>
          </div>

          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Number of days
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {DAYS_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 20,
                    border: days === d ? `2px solid ${colors.tealDark}` : `1px solid ${colors.border}`,
                    backgroundColor: days === d ? colors.tealLight : colors.card,
                    color: days === d ? colors.tealDark : colors.foreground,
                    fontSize: 14,
                    fontWeight: days === d ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Budget
            </p>
            <div style={{ position: "relative" }}>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={inputStyle}
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                color={colors.mutedForeground}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              />
            </div>
          </div>

          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Region (optional)
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {REGION_OPTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  style={{
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 7,
                    paddingBottom: 7,
                    borderRadius: 20,
                    border: region === r ? `2px solid ${colors.tealDark}` : `1px solid ${colors.border}`,
                    backgroundColor: region === r ? colors.tealLight : colors.card,
                    color: region === r ? colors.tealDark : colors.foreground,
                    fontSize: 13,
                    fontWeight: region === r ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Add destinations to circuit
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {destinations.slice(0, 10).map((dest) => {
                const sel = selectedDests.includes(dest.id);
                return (
                  <button
                    key={dest.id}
                    onClick={() => toggleDest(dest.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 12,
                      borderRadius: 10,
                      border: sel ? `2px solid ${colors.tealDark}` : `1px solid ${colors.border}`,
                      backgroundColor: sel ? colors.tealLight : colors.card,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: `linear-gradient(135deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: sel ? colors.tealDark : colors.foreground, display: "block" }}>
                        {dest.name}
                      </span>
                      <span style={{ fontSize: 12, color: colors.mutedForeground }}>{dest.state}</span>
                    </div>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        border: sel ? "none" : `2px solid ${colors.border}`,
                        backgroundColor: sel ? colors.tealDark : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {sel && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 16px 20px", backgroundColor: colors.card, borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <button
          onClick={handleBuild}
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
          Build itinerary
        </button>
      </div>
    </div>
  );
}
