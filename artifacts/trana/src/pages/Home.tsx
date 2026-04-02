import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Compass, Map, MessageCircle, Zap } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { destinations } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export default function HomeScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { wishlist, userEmail } = useApp();
  const featured = destinations.slice(0, 3);

  const [dots, setDots] = useState([1, 1, 1]);
  const frameRef = useRef(0);

  useEffect(() => {
    let t = 0;
    const tick = () => {
      t += 0.05;
      setDots([
        1 + 0.3 * Math.sin(t),
        1 + 0.3 * Math.sin(t + 1),
        1 + 0.3 * Math.sin(t + 2),
      ]);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      style={{ backgroundColor: colors.background, height: "100vh", overflowY: "auto" }}
      className="hide-scrollbar"
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.tealDark})`,
          padding: "28px 20px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
              {userEmail ? "Welcome back" : "Welcome to"}
            </p>
            <h1 style={{ margin: "2px 0 2px", color: "#fff", fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
              Trāna
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: 13, fontStyle: "italic" }}>
              Know where you belong before you go.
            </p>
            <div style={{ display: "flex", gap: 6, marginTop: 12, alignItems: "center" }}>
              {dots.map((scale, i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.gold,
                    transform: `scale(${scale})`,
                    transition: "transform 0.1s",
                  }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate("/profile")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <User size={22} color="#fff" />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, padding: 16, marginTop: -10 }}>
        {[
          { icon: Compass, label: "Discover", sub: "Find your match", color: colors.primary, path: "/quiz" },
          { icon: Map, label: "Plan", sub: "Build a circuit", color: colors.tealDark, path: "/itinerary" },
          { icon: MessageCircle, label: "Chat", sub: "Ask anything", color: colors.gold, path: "/chat" },
        ].map(({ icon: Icon, label, sub, color, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              borderRadius: 12,
              padding: 14,
              backgroundColor: color,
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              textAlign: "left",
            }}
          >
            <Icon size={22} color="#fff" />
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginTop: 4, display: "block" }}>
              {label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, display: "block" }}>
              {sub}
            </span>
          </button>
        ))}
      </div>

      <div style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>Trending This Season</span>
          <button
            onClick={() => navigate("/discover")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: colors.tealDark }}
          >
            See all
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {featured.map((dest) => (
            <div
              key={dest.id}
              onClick={() => navigate(`/destination/${dest.id}`, { state: { dest } })}
              style={{
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                overflow: "hidden",
                backgroundColor: colors.card,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 12,
                }}
              >
                <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>{dest.name}</span>
                <span
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderRadius: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 2,
                    paddingBottom: 2,
                    fontSize: 11,
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {dest.state}
                </span>
              </div>
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {dest.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: colors.tealLight,
                        borderRadius: 20,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 3,
                        paddingBottom: 3,
                        fontSize: 11,
                        fontWeight: 500,
                        color: colors.tealDark,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: "19px",
                    color: colors.mutedForeground,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {dest.rationale}
                </p>
                <span style={{ fontSize: 15, fontWeight: 700, color: colors.primary }}>
                  ₹{dest.totalBudget.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {wishlist.length > 0 && (
        <div style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>Your Wishlist</span>
            <button
              onClick={() => navigate("/wishlist")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: colors.tealDark }}
            >
              See all
            </button>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto" }} className="hide-scrollbar">
            {wishlist.map((dest) => (
              <div
                key={dest.id}
                onClick={() => navigate(`/destination/${dest.id}`, { state: { dest } })}
                style={{ borderRadius: 10, overflow: "hidden", width: 120, flexShrink: 0, cursor: "pointer" }}
              >
                <div
                  style={{
                    height: 70,
                    background: `linear-gradient(135deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`,
                  }}
                />
                <p style={{ margin: 0, padding: 8, fontSize: 13, fontWeight: 600, color: colors.primary }}>
                  {dest.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginLeft: 16,
          marginRight: 16,
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          backgroundColor: colors.blueLight,
        }}
      >
        <Zap size={20} color={colors.primary} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.primary }}>
            Get AI-matched destinations
          </p>
          <p style={{ margin: 0, fontSize: 12, marginTop: 2, color: colors.mutedForeground }}>
            3-minute quiz · personalised results
          </p>
        </div>
        <button
          onClick={() => navigate("/quiz")}
          style={{
            backgroundColor: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
