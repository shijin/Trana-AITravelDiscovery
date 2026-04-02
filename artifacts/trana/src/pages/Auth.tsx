import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export default function AuthScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { setUserEmail, setIsLoggedIn } = useApp();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleAuth = () => {
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (tab === "signup" && password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setUserEmail(email);
    setIsLoggedIn(true);
    navigate("/");
  };

  const inputStyle: React.CSSProperties = {
    height: 52,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    color: colors.foreground,
    backgroundColor: colors.card,
    width: "100%",
    outline: "none",
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.tealDark})`,
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "0 32px",
        }}
      >
        <h1 style={{ margin: 0, color: "#fff", fontSize: 38, fontWeight: 800, letterSpacing: -0.5 }}>
          Trāna
        </h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: 14, fontStyle: "italic", textAlign: "center" }}>
          Save your discoveries. Pick up where you left off.
        </p>
      </div>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${colors.border}` }}>
          {(["signin", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              style={{
                flex: 1,
                paddingBottom: 12,
                background: "none",
                border: "none",
                borderBottom: tab === t ? `2px solid ${colors.tealDark}` : "2px solid transparent",
                cursor: "pointer",
                fontSize: 16,
                color: tab === t ? colors.tealDark : colors.mutedForeground,
                fontWeight: tab === t ? 700 : 400,
                marginBottom: -1,
              }}
            >
              {t === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            style={inputStyle}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ ...inputStyle, paddingRight: 60 }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: 14,
                top: 0,
                bottom: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: colors.mutedForeground,
              }}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          {tab === "signup" && (
            <input
              type={showPass ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              style={inputStyle}
            />
          )}
          {error && (
            <p style={{ margin: 0, fontSize: 14, textAlign: "center", color: colors.destructive }}>
              {error}
            </p>
          )}
          <button
            onClick={handleAuth}
            style={{
              height: 52,
              borderRadius: 8,
              backgroundColor: colors.primary,
              color: "#fff",
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            {tab === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              color: colors.mutedForeground,
              paddingTop: 4,
            }}
          >
            Continue without signing in
          </button>
        </div>
      </div>
    </div>
  );
}
