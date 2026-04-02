import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Check, CheckCircle } from "lucide-react";
import { useColors } from "@/hooks/useColors";

interface Props {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  compact?: boolean;
  style?: React.CSSProperties;
  index?: number;
}

function getIcon(iconName: string) {
  const iconMap: Record<string, string> = {
    "moon": "Moon",
    "zap": "Zap",
    "heart": "Heart",
    "compass": "Compass",
    "user": "User",
    "users": "Users",
    "calendar": "Calendar",
    "sun": "Sun",
    "globe": "Globe",
    "dollar-sign": "DollarSign",
    "award": "Award",
    "coffee": "Coffee",
    "book": "BookOpen",
    "anchor": "Anchor",
    "triangle": "Triangle",
    "star": "Star",
    "truck": "Truck",
    "activity": "Activity",
    "trending-up": "TrendingUp",
    "map-pin": "MapPin",
    "credit-card": "CreditCard",
    "grid": "LayoutGrid",
    "smile": "Smile",
  };
  const name = iconMap[iconName] || "Circle";
  return (LucideIcons as Record<string, React.FC<{ size: number; color: string }>>)[name] || LucideIcons.Circle;
}

export default function QuizOption({
  label,
  icon,
  selected,
  onPress,
  compact = false,
  style,
  index = 0,
}: Props) {
  const colors = useColors();
  const [pressed, setPressed] = useState(false);
  const Icon = getIcon(icon);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onPress();
  };

  if (compact) {
    return (
      <button
        onClick={handleClick}
        style={{
          position: "relative",
          height: 88,
          borderRadius: 12,
          border: selected ? `2px solid ${colors.tealDark}` : "1.5px solid #E5E7EB",
          backgroundColor: selected ? colors.tealLight : "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 16,
          paddingLeft: 8,
          paddingRight: 8,
          cursor: "pointer",
          transform: pressed ? "scale(0.97)" : "scale(1)",
          transition: "transform 0.1s, background-color 0.15s, border-color 0.15s",
          animation: `fade-up 0.3s ease both`,
          animationDelay: `${index * 80}ms`,
          ...style,
        }}
      >
        {selected && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: colors.tealDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "check-spring 0.3s ease",
            }}
          >
            <Check size={8} color="#fff" />
          </div>
        )}
        <Icon size={28} color={selected ? colors.tealDark : colors.mutedForeground} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            textAlign: "center",
            lineHeight: "17px",
            marginTop: 8,
            paddingLeft: 4,
            paddingRight: 4,
            color: selected ? colors.tealDark : "#1A1A1A",
          }}
        >
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        borderRadius: 8,
        border: selected ? `2px solid ${colors.tealDark}` : `1.5px solid ${colors.border}`,
        backgroundColor: selected ? colors.tealLight : colors.card,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 14,
        width: "100%",
        cursor: "pointer",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.1s, background-color 0.15s",
        animation: "fade-up 0.3s ease both",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <Icon size={22} color={selected ? colors.tealDark : colors.mutedForeground} />
      <span
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: 400,
          textAlign: "left",
          color: selected ? colors.tealDark : colors.foreground,
        }}
      >
        {label}
      </span>
      <div
        style={{
          transform: selected ? "scale(1)" : "scale(0)",
          transition: "transform 0.2s ease",
          animation: selected ? "check-spring 0.3s ease" : undefined,
        }}
      >
        <CheckCircle size={20} color={colors.tealDark} />
      </div>
    </button>
  );
}
