import { Feather } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const W = Dimensions.get("window").width;

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

function Q1Shape() {
  return (
    <View
      style={[
        styles.abs,
        {
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "rgba(255,255,255,0.12)",
          alignSelf: "center",
          top: -40,
        },
      ]}
    />
  );
}

function Q2Shape() {
  return (
    <View
      style={[
        styles.abs,
        {
          width: 180,
          height: 180,
          borderRadius: 28,
          backgroundColor: "rgba(255,255,255,0.15)",
          right: -30,
          top: -20,
          transform: [{ rotate: "15deg" }],
        },
      ]}
    />
  );
}

function Q3Shape() {
  return (
    <>
      <View
        style={[
          styles.abs,
          {
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: "rgba(255,255,255,0.15)",
            left: W * 0.18,
            top: 10,
          },
        ]}
      />
      <View
        style={[
          styles.abs,
          {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "rgba(255,255,255,0.15)",
            left: W * 0.18 + 80,
            top: 40,
          },
        ]}
      />
    </>
  );
}

function Q4Shape() {
  return (
    <View
      style={[
        styles.abs,
        {
          width: 150,
          height: 150,
          backgroundColor: "rgba(255,255,255,0.12)",
          left: -40,
          top: 10,
          transform: [{ rotate: "45deg" }],
        },
      ]}
    />
  );
}

function Q5Shape() {
  const cx = W / 2;
  return (
    <>
      <View
        style={[
          styles.abs,
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "rgba(255,255,255,0.18)",
            left: cx - 30,
            top: 18,
          },
        ]}
      />
      <View
        style={[
          styles.abs,
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "rgba(255,255,255,0.18)",
            left: cx - 90,
            top: 80,
          },
        ]}
      />
      <View
        style={[
          styles.abs,
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "rgba(255,255,255,0.18)",
            left: cx + 28,
            top: 80,
          },
        ]}
      />
    </>
  );
}

function Q6Shape() {
  return (
    <View
      style={[
        styles.abs,
        {
          width: 200,
          height: 200,
          borderRadius: 100,
          borderWidth: 3,
          borderColor: "rgba(255,255,255,0.2)",
          backgroundColor: "transparent",
          right: -50,
          top: -60,
        },
      ]}
    />
  );
}

function Q7Shape() {
  const DOT = 6;
  const GAP = 24;
  return (
    <View style={[styles.abs, { right: 28, top: 20 }]}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.dotRow}>
          {[0, 1, 2].map((col) => (
            <View
              key={col}
              style={{
                width: DOT,
                height: DOT,
                borderRadius: DOT / 2,
                backgroundColor: "rgba(255,255,255,0.25)",
                marginRight: col < 2 ? GAP : 0,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const SHAPES = [Q1Shape, Q2Shape, Q3Shape, Q4Shape, Q5Shape, Q6Shape, Q7Shape];

interface Props {
  questionIndex: number;
}

export default function QuizBackground({ questionIndex }: Props) {
  const idx = Math.min(questionIndex, THEMES.length - 1);
  const theme = THEMES[idx];
  const Shape = SHAPES[idx];

  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: theme.color }]}
      pointerEvents="none"
    >
      <Shape />
      <View style={styles.iconContainer}>
        <Feather
          name={theme.icon as any}
          size={48}
          color="rgba(255,255,255,0.88)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute",
  },
  dotRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  iconContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
