import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0.6)).current;
  const dot2 = useRef(new Animated.Value(0.6)).current;
  const dot3 = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.6,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.bubble}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            { transform: [{ scale: dot }] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#F0F4F8",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0D7377",
  },
});
