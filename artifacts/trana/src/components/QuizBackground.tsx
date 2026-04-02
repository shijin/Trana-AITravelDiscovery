import React from "react";
import {
  Smile,
  Users,
  Calendar,
  CreditCard,
  LayoutGrid,
  Activity,
  MapPin,
} from "lucide-react";

interface Theme {
  color: string;
  Icon: React.FC<{ size: number; color: string }>;
}

const THEMES: Theme[] = [
  { color: "#1A3C5E", Icon: Smile },
  { color: "#0D7377", Icon: Users },
  { color: "#C9962B", Icon: Calendar },
  { color: "#2D6A4F", Icon: CreditCard },
  { color: "#7F35B2", Icon: LayoutGrid },
  { color: "#D85A30", Icon: Activity },
  { color: "#185FA5", Icon: MapPin },
];

const SVG_W = 84;
const SVG_H = 42;

function TajMahal() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <ellipse cx="140" cy="90" rx="40" ry="50" fill="white" />
      <rect x="137" y="40" width="6" height="20" fill="white" />
      <rect x="120" y="90" width="40" height="50" fill="white" />
      <ellipse cx="140" cy="90" rx="20" ry="25" fill="white" />
      <rect x="50" y="60" width="12" height="80" fill="white" />
      <ellipse cx="56" cy="60" rx="8" ry="12" fill="white" />
      <rect x="218" y="60" width="12" height="80" fill="white" />
      <ellipse cx="224" cy="60" rx="8" ry="12" fill="white" />
      <rect x="30" y="135" width="220" height="8" rx="2" fill="white" />
      <rect x="75" y="85" width="8" height="55" fill="white" />
      <rect x="197" y="85" width="8" height="55" fill="white" />
    </svg>
  );
}

function HawaMahal() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <rect x="40" y="100" width="200" height="40" fill="white" />
      <rect x="50" y="70" width="25" height="35" fill="white" />
      <ellipse cx="62" cy="70" rx="12" ry="8" fill="white" />
      <rect x="90" y="70" width="25" height="35" fill="white" />
      <ellipse cx="102" cy="70" rx="12" ry="8" fill="white" />
      <rect x="127" y="70" width="26" height="35" fill="white" />
      <ellipse cx="140" cy="70" rx="13" ry="8" fill="white" />
      <rect x="165" y="70" width="25" height="35" fill="white" />
      <ellipse cx="177" cy="70" rx="12" ry="8" fill="white" />
      <rect x="202" y="70" width="25" height="35" fill="white" />
      <ellipse cx="214" cy="70" rx="12" ry="8" fill="white" />
      <rect x="65" y="42" width="22" height="32" fill="white" />
      <ellipse cx="76" cy="42" rx="11" ry="7" fill="white" />
      <rect x="102" y="42" width="22" height="32" fill="white" />
      <ellipse cx="113" cy="42" rx="11" ry="7" fill="white" />
      <rect x="140" y="42" width="22" height="32" fill="white" />
      <ellipse cx="151" cy="42" rx="11" ry="7" fill="white" />
      <rect x="178" y="42" width="22" height="32" fill="white" />
      <ellipse cx="189" cy="42" rx="11" ry="7" fill="white" />
      <rect x="85" y="20" width="18" height="26" fill="white" />
      <ellipse cx="94" cy="20" rx="9" ry="6" fill="white" />
      <rect x="121" y="20" width="18" height="26" fill="white" />
      <ellipse cx="130" cy="20" rx="9" ry="6" fill="white" />
      <rect x="157" y="20" width="18" height="26" fill="white" />
      <ellipse cx="166" cy="20" rx="9" ry="6" fill="white" />
    </svg>
  );
}

function IndiaGate() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <rect x="90" y="40" width="30" height="100" fill="white" />
      <rect x="160" y="40" width="30" height="100" fill="white" />
      <rect x="80" y="20" width="120" height="25" fill="white" />
      <rect x="85" y="10" width="110" height="12" fill="white" />
      <rect x="50" y="135" width="180" height="8" rx="2" fill="white" />
      <ellipse cx="140" cy="8" rx="6" ry="10" fill="white" />
    </svg>
  );
}

function KeralaHouseboat() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <rect x="0" y="110" width="280" height="30" fill="white" opacity={0.4} />
      <path d="M40 110 L60 95 L220 95 L240 110 Z" fill="white" />
      <rect x="70" y="70" width="140" height="26" rx="4" fill="white" />
      <path d="M65 70 L140 50 L215 70 Z" fill="white" />
      <rect x="130" y="42" width="8" height="12" fill="white" />
      <rect x="15" y="50" width="6" height="62" fill="white" />
      <ellipse cx="18" cy="48" rx="22" ry="14" fill="white" />
      <rect x="255" y="55" width="6" height="57" fill="white" />
      <ellipse cx="258" cy="53" rx="20" ry="13" fill="white" />
    </svg>
  );
}

function HampiTemple() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <rect x="110" y="30" width="60" height="110" fill="white" />
      <path d="M105 30 L140 8 L175 30 Z" fill="white" />
      <rect x="108" y="55" width="64" height="6" fill="white" opacity={0.5} />
      <rect x="110" y="70" width="60" height="5" fill="white" opacity={0.5} />
      <rect x="112" y="83" width="56" height="5" fill="white" opacity={0.5} />
      <ellipse cx="55" cy="120" rx="45" ry="25" fill="white" />
      <ellipse cx="35" cy="105" rx="30" ry="20" fill="white" />
      <ellipse cx="75" cy="108" rx="25" ry="18" fill="white" />
      <ellipse cx="225" cy="120" rx="45" ry="25" fill="white" />
      <ellipse cx="245" cy="105" rx="30" ry="20" fill="white" />
      <rect x="0" y="135" width="280" height="8" fill="white" />
    </svg>
  );
}

function HimalayanTrek() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <path d="M0 140 L60 40 L120 100 L180 20 L240 80 L280 50 L280 140 Z" fill="white" />
      <path d="M150 40 L180 20 L210 40 Z" fill="white" opacity={0.6} />
      <circle cx="140" cy="85" r="8" fill="white" opacity={0.9} />
      <rect x="137" y="93" width="6" height="20" fill="white" opacity={0.9} />
      <line x1="150" y1="95" x2="160" y2="118" stroke="white" strokeWidth="2" opacity={0.9} />
      <path
        d="M80 140 Q110 120 140 113 Q170 106 200 95"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="6 4"
        opacity={0.6}
      />
    </svg>
  );
}

function MumbaiSkyline() {
  return (
    <svg viewBox="0 0 280 140" width={SVG_W} height={SVG_H}>
      <rect x="60" y="50" width="10" height="85" fill="white" />
      <rect x="210" y="50" width="10" height="85" fill="white" />
      <line x1="65" y1="50" x2="30" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="65" y1="55" x2="50" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="65" y1="60" x2="70" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="65" y1="55" x2="90" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="215" y1="50" x2="250" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="215" y1="55" x2="230" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="215" y1="60" x2="210" y2="120" stroke="white" strokeWidth="1.5" />
      <line x1="215" y1="55" x2="190" y2="120" stroke="white" strokeWidth="1.5" />
      <rect x="20" y="118" width="240" height="8" rx="2" fill="white" />
      <rect x="0" y="75" width="20" height="50" fill="white" opacity={0.5} />
      <rect x="22" y="60" width="18" height="65" fill="white" opacity={0.5} />
      <rect x="242" y="70" width="18" height="55" fill="white" opacity={0.5} />
      <rect x="262" y="80" width="18" height="45" fill="white" opacity={0.5} />
    </svg>
  );
}

const LANDMARKS = [
  TajMahal,
  HawaMahal,
  IndiaGate,
  KeralaHouseboat,
  HampiTemple,
  HimalayanTrek,
  MumbaiSkyline,
];

interface Props {
  questionIndex: number;
}

export default function QuizBackground({ questionIndex }: Props) {
  const idx = Math.min(questionIndex, THEMES.length - 1);
  const theme = THEMES[idx];
  const Landmark = LANDMARKS[Math.min(idx, LANDMARKS.length - 1)];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: theme.color,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          opacity: 0.18,
        }}
      >
        <Landmark />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <theme.Icon size={28} color="rgba(255,255,255,0.88)" />
      </div>
    </div>
  );
}
