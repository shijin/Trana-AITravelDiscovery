import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Compass, Bookmark, User } from "lucide-react";

const TABS = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/discover", label: "Discover", Icon: Compass },
  { path: "/wishlist", label: "Wishlist", Icon: Bookmark },
  { path: "/profile", label: "Profile", Icon: User },
];

export default function TabLayout() {
  const location = useLocation();
  const activeIndex = TABS.findIndex((t) => t.path === location.pathname);
  const isOnTabRoute = activeIndex >= 0;
  const idx = isOnTabRoute ? activeIndex : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="hide-scrollbar">
        <Outlet />
      </div>
      <nav
        style={{
          display: "flex",
          backgroundColor: "#fff",
          borderTop: "1px solid #E5E7EB",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 6,
            left: `calc(${idx} * 25% + (25% - 56px) / 2)`,
            width: 56,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#D6F0EF",
            transition: "left 0.25s ease, opacity 0.15s ease",
            pointerEvents: "none",
            zIndex: 0,
            opacity: isOnTabRoute ? 1 : 0,
          }}
        />
        {TABS.map(({ path, label, Icon }, i) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 8,
                paddingBottom: 10,
                textDecoration: "none",
                position: "relative",
                zIndex: 1,
                cursor: "pointer",
              }}
            >
              <Icon
                size={22}
                color={isActive ? "#0D7377" : "#666666"}
                style={{
                  transition: "transform 0.15s",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  marginTop: 3,
                  color: isActive ? "#0D7377" : "#666666",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
