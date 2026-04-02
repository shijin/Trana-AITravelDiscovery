import React from "react";

export default function TypingIndicator() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "14px 16px",
        backgroundColor: "#F0F4F8",
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        marginBottom: 4,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#0D7377",
            animation: "typing-dot 0.6s ease infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
