import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Rect,
} from "react-native-svg";

interface Theme {
  color: string;
  icon: string;
}

const THEMES: Theme[] = [
  { color: "#1A3C5E", icon: "smile" },
  { color: "#0D7377", icon: "users" },
  { color: "#C9962B", icon: "calendar" },
  { color: "#2D6A4F", icon: "credit-card" },
  { color: "#7F35B2", icon: "grid" },
  { color: "#D85A30", icon: "activity" },
  { color: "#185FA5", icon: "map-pin" },
];

function TajMahal() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Ellipse cx="140" cy="90" rx="40" ry="50" fill="white" />
      <Rect x="137" y="40" width="6" height="20" fill="white" />
      <Rect x="120" y="90" width="40" height="50" fill="white" />
      <Ellipse cx="140" cy="90" rx="20" ry="25" fill="white" />
      <Rect x="50" y="60" width="12" height="80" fill="white" />
      <Ellipse cx="56" cy="60" rx="8" ry="12" fill="white" />
      <Rect x="218" y="60" width="12" height="80" fill="white" />
      <Ellipse cx="224" cy="60" rx="8" ry="12" fill="white" />
      <Rect x="30" y="135" width="220" height="8" rx="2" fill="white" />
      <Rect x="75" y="85" width="8" height="55" fill="white" />
      <Rect x="197" y="85" width="8" height="55" fill="white" />
    </Svg>
  );
}

function HawaMahal() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Rect x="40" y="100" width="200" height="40" fill="white" />
      <Rect x="50" y="70" width="25" height="35" fill="white" />
      <Ellipse cx="62" cy="70" rx="12" ry="8" fill="white" />
      <Rect x="90" y="70" width="25" height="35" fill="white" />
      <Ellipse cx="102" cy="70" rx="12" ry="8" fill="white" />
      <Rect x="127" y="70" width="26" height="35" fill="white" />
      <Ellipse cx="140" cy="70" rx="13" ry="8" fill="white" />
      <Rect x="165" y="70" width="25" height="35" fill="white" />
      <Ellipse cx="177" cy="70" rx="12" ry="8" fill="white" />
      <Rect x="202" y="70" width="25" height="35" fill="white" />
      <Ellipse cx="214" cy="70" rx="12" ry="8" fill="white" />
      <Rect x="65" y="42" width="22" height="32" fill="white" />
      <Ellipse cx="76" cy="42" rx="11" ry="7" fill="white" />
      <Rect x="102" y="42" width="22" height="32" fill="white" />
      <Ellipse cx="113" cy="42" rx="11" ry="7" fill="white" />
      <Rect x="140" y="42" width="22" height="32" fill="white" />
      <Ellipse cx="151" cy="42" rx="11" ry="7" fill="white" />
      <Rect x="178" y="42" width="22" height="32" fill="white" />
      <Ellipse cx="189" cy="42" rx="11" ry="7" fill="white" />
      <Rect x="85" y="20" width="18" height="26" fill="white" />
      <Ellipse cx="94" cy="20" rx="9" ry="6" fill="white" />
      <Rect x="121" y="20" width="18" height="26" fill="white" />
      <Ellipse cx="130" cy="20" rx="9" ry="6" fill="white" />
      <Rect x="157" y="20" width="18" height="26" fill="white" />
      <Ellipse cx="166" cy="20" rx="9" ry="6" fill="white" />
      <Rect x="88" y="8" width="4" height="14" fill="white" />
      <Rect x="128" y="8" width="4" height="14" fill="white" />
      <Rect x="161" y="8" width="4" height="14" fill="white" />
    </Svg>
  );
}

function IndiaGate() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Rect x="90" y="40" width="30" height="100" fill="white" />
      <Rect x="160" y="40" width="30" height="100" fill="white" />
      <Rect x="80" y="20" width="120" height="25" fill="white" />
      <Rect x="85" y="10" width="110" height="12" fill="white" />
      <Rect x="50" y="135" width="180" height="8" rx="2" fill="white" />
      <Ellipse cx="140" cy="8" rx="6" ry="10" fill="white" />
    </Svg>
  );
}

function KeralaHouseboat() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Rect x="0" y="110" width="280" height="30" fill="white" opacity={0.4} />
      <Path d="M40 110 L60 95 L220 95 L240 110 Z" fill="white" />
      <Rect x="70" y="70" width="140" height="26" rx="4" fill="white" />
      <Path d="M65 70 L140 50 L215 70 Z" fill="white" />
      <Rect x="130" y="42" width="8" height="12" fill="white" />
      <Rect x="15" y="50" width="6" height="62" fill="white" />
      <Ellipse cx="18" cy="48" rx="22" ry="14" fill="white" />
      <Rect x="255" y="55" width="6" height="57" fill="white" />
      <Ellipse cx="258" cy="53" rx="20" ry="13" fill="white" />
      <Rect x="80" y="112" width="120" height="6" fill="white" opacity={0.3} />
    </Svg>
  );
}

function HampiTemple() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Rect x="110" y="30" width="60" height="110" fill="white" />
      <Path d="M105 30 L140 8 L175 30 Z" fill="white" />
      <Rect x="108" y="55" width="64" height="6" fill="white" opacity={0.5} />
      <Rect x="110" y="70" width="60" height="5" fill="white" opacity={0.5} />
      <Rect x="112" y="83" width="56" height="5" fill="white" opacity={0.5} />
      <Ellipse cx="55" cy="120" rx="45" ry="25" fill="white" />
      <Ellipse cx="35" cy="105" rx="30" ry="20" fill="white" />
      <Ellipse cx="75" cy="108" rx="25" ry="18" fill="white" />
      <Ellipse cx="225" cy="120" rx="45" ry="25" fill="white" />
      <Ellipse cx="245" cy="105" rx="30" ry="20" fill="white" />
      <Ellipse cx="205" cy="110" rx="22" ry="16" fill="white" />
      <Rect x="0" y="135" width="280" height="8" fill="white" />
    </Svg>
  );
}

function HimalayanTrek() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Path d="M0 140 L60 40 L120 100 L180 20 L240 80 L280 50 L280 140 Z" fill="white" />
      <Path d="M150 40 L180 20 L210 40 Z" fill="white" opacity={0.6} />
      <Path d="M30 70 L60 40 L90 70 Z" fill="white" opacity={0.5} />
      <Circle cx="140" cy="85" r="8" fill="white" opacity={0.9} />
      <Rect x="137" y="93" width="6" height="20" fill="white" opacity={0.9} />
      <Line
        x1="150" y1="95" x2="160" y2="118"
        stroke="white" strokeWidth="2" opacity={0.9}
      />
      <Path
        d="M80 140 Q110 120 140 113 Q170 106 200 95"
        fill="none" stroke="white" strokeWidth="2"
        strokeDasharray="6 4" opacity={0.6}
      />
    </Svg>
  );
}

function MumbaiSkyline() {
  return (
    <Svg viewBox="0 0 280 140" width={280} height={140}>
      <Rect x="60" y="50" width="10" height="85" fill="white" />
      <Rect x="210" y="50" width="10" height="85" fill="white" />
      <Line x1="65" y1="50" x2="30" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="65" y1="55" x2="50" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="65" y1="60" x2="70" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="65" y1="55" x2="90" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="215" y1="50" x2="250" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="215" y1="55" x2="230" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="215" y1="60" x2="210" y2="120" stroke="white" strokeWidth="1.5" />
      <Line x1="215" y1="55" x2="190" y2="120" stroke="white" strokeWidth="1.5" />
      <Rect x="20" y="118" width="240" height="8" rx="2" fill="white" />
      <Rect x="0" y="126" width="280" height="14" fill="white" opacity={0.3} />
      <Rect x="0" y="75" width="20" height="50" fill="white" opacity={0.5} />
      <Rect x="22" y="60" width="18" height="65" fill="white" opacity={0.5} />
      <Rect x="242" y="70" width="18" height="55" fill="white" opacity={0.5} />
      <Rect x="262" y="80" width="18" height="45" fill="white" opacity={0.5} />
    </Svg>
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

interface LandmarkProps {
  questionIndex: number;
}

function LandmarkIllustration({ questionIndex }: LandmarkProps) {
  const idx = Math.min(questionIndex, LANDMARKS.length - 1);
  const Landmark = LANDMARKS[idx];
  return (
    <View style={[styles.landmarkContainer, { pointerEvents: "none" }]}>
      <Landmark />
    </View>
  );
}

interface Props {
  questionIndex: number;
}

export default function QuizBackground({ questionIndex }: Props) {
  const idx = Math.min(questionIndex, THEMES.length - 1);
  const theme = THEMES[idx];

  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: theme.color }]}
      pointerEvents="none"
    >
      <LandmarkIllustration questionIndex={idx} />
      <View style={styles.iconContainer}>
        <Feather
          name={theme.icon as any}
          size={32}
          color="rgba(255,255,255,0.88)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  landmarkContainer: {
    position: "absolute",
    bottom: 0,
    left: "50%" as any,
    transform: [{ translateX: -140 }],
    opacity: 0.18,
    width: 280,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
