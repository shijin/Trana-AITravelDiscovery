import React from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Map, ChevronRight, Trash2 } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export default function WishlistScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { wishlist, savedItinerary, removeFromWishlist } = useApp();

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100%",
        padding: "20px 20px",
      }}
    >
      <h1 style={{ margin: "0 0 24px", fontSize: 24, fontWeight: 700, color: colors.primary }}>
        My Wishlist
      </h1>

      {wishlist.length === 0 && !savedItinerary ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, gap: 16 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bookmark size={36} color={colors.mutedForeground} />
          </div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: colors.foreground }}>
            Nothing saved yet
          </h2>
          <p style={{ margin: 0, fontSize: 14, textAlign: "center", lineHeight: "20px", color: colors.mutedForeground, paddingLeft: 20, paddingRight: 20 }}>
            Tap the bookmark icon on any destination to save it here
          </p>
          <button
            onClick={() => navigate("/discover")}
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              paddingLeft: 28,
              paddingRight: 28,
              paddingTop: 14,
              paddingBottom: 14,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Start discovering
          </button>
        </div>
      ) : (
        <>
          {wishlist.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: colors.foreground }}>
                  Saved destinations
                </span>
                <span
                  style={{
                    backgroundColor: colors.tealLight,
                    borderRadius: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 3,
                    paddingBottom: 3,
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.tealDark,
                  }}
                >
                  {wishlist.length}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {wishlist.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => navigate(`/destination/${dest.id}`, { state: { dest } })}
                    style={{
                      borderRadius: 12,
                      border: `1px solid ${colors.border}`,
                      overflow: "hidden",
                      backgroundColor: colors.card,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: 80,
                        background: `linear-gradient(135deg, ${dest.heroGradient[0]}, ${dest.heroGradient[1]})`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: 10,
                      }}
                    >
                      <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{dest.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", padding: 12, gap: 12 }}>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ fontSize: 13, color: colors.mutedForeground }}>{dest.state}</span>
                        <div style={{ display: "flex", gap: 6 }}>
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
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(dest.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 8,
                        }}
                      >
                        <Trash2 size={18} color={colors.mutedForeground} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {savedItinerary && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 700, color: colors.foreground }}>
                Saved itineraries
              </p>
              <button
                onClick={() => navigate("/itinerary-detail")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 14,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.card,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: colors.blueLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Map size={22} color={colors.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: colors.foreground }}>
                    Karnataka circuit · 5 days
                  </p>
                  <p style={{ margin: 0, fontSize: 13, marginTop: 2, color: colors.mutedForeground }}>
                    ₹14,200 total · Starting Hyderabad
                  </p>
                </div>
                <ChevronRight size={18} color={colors.mutedForeground} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
