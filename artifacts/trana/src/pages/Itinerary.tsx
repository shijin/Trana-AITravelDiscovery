import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronDown, Plus, X } from "lucide-react";
import { useColors } from "@/hooks/useColors";

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Kochi", "Jaipur"];
const DAYS_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const BUDGET_OPTIONS = ["Under ₹15,000", "₹15,000 – ₹30,000", "₹30,000 – ₹60,000", "Above ₹60,000"];

const SUGGESTIONS = [
  "Hampi", "Gokarna", "Coorg", "Munnar", "Alleppey",
  "Jaisalmer", "Udaipur", "Ladakh", "Spiti", "Darjeeling",
  "Kochi", "Andaman", "Pondicherry", "Mysuru", "Ooty",
];

export default function ItineraryScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const preselected = location.state?.dest;

  const [city, setCity] = useState("Bengaluru");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("₹15,000 – ₹30,000");
  const [destNames, setDestNames] = useState<string[]>(
    preselected ? [preselected.name] : []
  );
  const [inputValue, setInputValue] = useState("");

  const addDest = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (destNames.find((d) => d.toLowerCase() === trimmed.toLowerCase())) return;
    setDestNames((prev) => [...prev, trimmed]);
    setInputValue("");
  };

  const removeDest = (name: string) => {
    setDestNames((prev) => prev.filter((d) => d !== name));
  };

  const handleBuild = () => {
    if (destNames.length === 0) return;
    navigate("/itinerary-detail", {
      state: { destNames, days, budget, startCity: city },
    });
  };

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
    appearance: "none" as const,
    cursor: "pointer",
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: colors.background }}>
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

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }} className="hide-scrollbar">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Starting city
            </p>
            <div style={{ position: "relative" }}>
              <select value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle}>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} color={colors.mutedForeground} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>

          <div>
            <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: colors.foreground }}>
              Destinations
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addDest(inputValue); }}
                placeholder="Type a destination (e.g. Hampi)"
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontSize: 15,
                  color: colors.foreground,
                  backgroundColor: colors.card,
                  outline: "none",
                }}
              />
              <button
                onClick={() => addDest(inputValue)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: colors.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Plus size={20} color="#fff" />
              </button>
            </div>

            {destNames.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {destNames.map((name) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      paddingLeft: 12,
                      paddingRight: 8,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderRadius: 20,
                      backgroundColor: colors.tealLight,
                      border: `1.5px solid ${colors.tealDark}`,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.tealDark }}>{name}</span>
                    <button
                      onClick={() => removeDest(name)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0, display: "flex" }}
                    >
                      <X size={14} color={colors.tealDark} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, color: colors.mutedForeground }}>Popular choices</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SUGGESTIONS.filter((s) => !destNames.find((d) => d.toLowerCase() === s.toLowerCase())).slice(0, 10).map((s) => (
                  <button
                    key={s}
                    onClick={() => addDest(s)}
                    style={{
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 5,
                      paddingBottom: 5,
                      borderRadius: 20,
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.card,
                      fontSize: 13,
                      color: colors.foreground,
                      cursor: "pointer",
                    }}
                  >
                    + {s}
                  </button>
                ))}
              </div>
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
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={inputStyle}>
                {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
              </select>
              <ChevronDown size={16} color={colors.mutedForeground} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>

        </div>
      </div>

      <div style={{ padding: "12px 16px 20px", backgroundColor: colors.card, borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
        <button
          onClick={handleBuild}
          disabled={destNames.length === 0}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 8,
            backgroundColor: destNames.length === 0 ? colors.border : colors.primary,
            color: "#fff",
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: destNames.length === 0 ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {destNames.length === 0 ? "Add at least one destination" : `Build itinerary — ${destNames.length} stop${destNames.length > 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
