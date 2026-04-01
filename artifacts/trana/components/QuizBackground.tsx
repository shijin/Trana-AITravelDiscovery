import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

const THEMES = [
  { gradStart: "#E8F4F0", blobColor: "#0D7377", opacity: 0.08 },
  { gradStart: "#EEF2FF", blobColor: "#7F77DD", opacity: 0.07 },
  { gradStart: "#FFF8EC", blobColor: "#C9962B", opacity: 0.08 },
  { gradStart: "#F0FFF4", blobColor: "#0D7377", opacity: 0.06 },
  { gradStart: "#FFF0F0", blobColor: "#D85A30", opacity: 0.07 },
  { gradStart: "#F0F4FF", blobColor: "#1A3C5E", opacity: 0.08 },
  { gradStart: "#F5F0FF", blobColor: "#7F77DD", opacity: 0.07 },
];

interface Props {
  questionIndex: number;
}

export default function QuizBackground({ questionIndex }: Props) {
  const theme = THEMES[Math.min(questionIndex, THEMES.length - 1)];

  return (
    <LinearGradient
      colors={[theme.gradStart, "#F8F9FA"]}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <View
        style={[
          styles.blob,
          {
            width: 200,
            height: 200,
            borderRadius: 100,
            top: 40,
            right: -60,
            backgroundColor: theme.blobColor,
            opacity: theme.opacity,
          },
        ]}
      />
      <View
        style={[
          styles.blob,
          {
            width: 150,
            height: 150,
            borderRadius: 75,
            top: "38%",
            left: -40,
            backgroundColor: theme.blobColor,
            opacity: theme.opacity,
          },
        ]}
      />
      <View
        style={[
          styles.blob,
          {
            width: 120,
            height: 120,
            borderRadius: 60,
            bottom: 120,
            right: 20,
            backgroundColor: theme.blobColor,
            opacity: theme.opacity,
          },
        ]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
  },
});
