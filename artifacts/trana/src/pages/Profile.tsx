import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sliders,
  MapPin,
  Coffee,
  Activity,
  Bell,
  Lock,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

function SettingRow({
  icon: Icon,
  label,
  right,
  colors,
}: {
  icon: React.FC<{ size: number; color: string }>;
  label: string;
  right?: React.ReactNode;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Icon size={18} color={colors.mutedForeground} />
      <span style={{ flex: 1, fontSize: 15, color: colors.foreground }}>{label}</span>
      {right || <ChevronRight size={18} color={colors.mutedForeground} />}
    </div>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { userEmail, setIsLoggedIn, wishlist } = useApp();
  const [notifications, setNotifications] = useState(true);
  const initials = userEmail ? userEmail[0].toUpperCase() : "T";

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100%",
        padding: "20px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colors.primary }}>
        My Profile
      </h1>

      <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 24, gap: 8 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.tealDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>{initials}</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 500, color: colors.foreground }}>
            {userEmail || "guest@trana.app"}
          </span>
          <span style={{ fontSize: 13, color: colors.mutedForeground }}>Member since April 2026</span>
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}>
          {[
            { num: "3", label: "Trips planned" },
            { num: `${wishlist.length}`, label: "Destinations saved" },
            { num: "12", label: "Days explored" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 16,
                paddingBottom: 16,
                borderRight: i < 2 ? `1px solid ${colors.border}` : undefined,
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, color: colors.primary }}>{stat.num}</span>
              <span style={{ fontSize: 11, textAlign: "center", marginTop: 2, color: colors.mutedForeground }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card }}>
        <span style={{ display: "block", fontSize: 15, fontWeight: 700, padding: "16px 16px 8px", color: colors.foreground }}>
          Preferences
        </span>
        <SettingRow icon={Sliders} label="My travel style" colors={colors} />
        <SettingRow icon={MapPin} label="Home city" colors={colors} />
        <SettingRow icon={Coffee} label="Dietary preferences" colors={colors} />
        <SettingRow icon={Activity} label="Physical activity level" colors={colors} />
      </div>

      <div style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.card }}>
        <span style={{ display: "block", fontSize: 15, fontWeight: 700, padding: "16px 16px 8px", color: colors.foreground }}>
          Account
        </span>
        <SettingRow
          icon={Bell}
          label="Notifications"
          colors={colors}
          right={
            <label style={{ position: "relative", display: "inline-block", width: 44, height: 24, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  backgroundColor: notifications ? colors.tealDark : colors.border,
                  transition: "background-color 0.2s",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: notifications ? 22 : 2,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                }}
              />
            </label>
          }
        />
        <SettingRow icon={Lock} label="Privacy settings" colors={colors} />
        <SettingRow icon={HelpCircle} label="Help & feedback" colors={colors} />
      </div>

      <button
        onClick={handleSignOut}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          backgroundColor: "transparent",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <LogOut size={18} color={colors.mutedForeground} />
        <span style={{ fontSize: 16, fontWeight: 500, color: colors.mutedForeground }}>Sign out</span>
      </button>
    </div>
  );
}
