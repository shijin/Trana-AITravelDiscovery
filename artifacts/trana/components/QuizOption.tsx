import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  index?: number;
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
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mountSlide = useRef(new Animated.Value(20)).current;
  // Check indicator scale — spring-in when selected, fade out when not
  const checkScale = useRef(new Animated.Value(selected ? 1 : 0)).current;
  const prevSelectedRef = useRef(selected);

  useEffect(() => {
    const delay = index * 80;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(mountSlide, {
        toValue: 0,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (selected === prevSelectedRef.current) return;
    prevSelectedRef.current = selected;

    if (selected) {
      checkScale.setValue(0);
      Animated.spring(checkScale, {
        toValue: 1,
        tension: 280,
        friction: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(checkScale, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [selected]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 70,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  const outerStyle: StyleProp<ViewStyle>[] = [
    style,
    {
      opacity: fadeAnim,
      transform: [{ translateY: mountSlide }, { scale: scaleAnim }],
    },
  ];

  if (compact) {
    return (
      <Animated.View style={outerStyle}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.95}
          style={[
            styles.compactBtn,
            {
              borderColor: selected ? colors.tealDark : "#E5E7EB",
              borderWidth: selected ? 2 : 1.5,
              backgroundColor: selected ? colors.tealLight : "#FFFFFF",
            },
          ]}
        >
          {/* Spring-in check badge — always rendered, scale 0→1 */}
          <Animated.View
            style={[
              styles.checkBadge,
              {
                backgroundColor: colors.tealDark,
                transform: [{ scale: checkScale }],
              },
            ]}
          >
            <Feather name="check" size={8} color="#fff" />
          </Animated.View>

          <Feather
            name={icon as any}
            size={28}
            color={selected ? colors.tealDark : colors.mutedForeground}
          />
          <Text
            style={[
              styles.compactLabel,
              { color: selected ? colors.tealDark : "#1A1A1A" },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={outerStyle}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.95}
        style={[
          styles.btn,
          {
            borderColor: selected ? colors.tealDark : colors.border,
            backgroundColor: selected ? colors.tealLight : colors.card,
            borderWidth: selected ? 2 : 1.5,
          },
        ]}
      >
        <Feather
          name={icon as any}
          size={22}
          color={selected ? colors.tealDark : colors.mutedForeground}
        />
        <Text
          style={[
            styles.label,
            { color: selected ? colors.tealDark : colors.foreground },
          ]}
        >
          {label}
        </Text>
        {/* Spring-in check icon for regular options */}
        <Animated.View style={{ transform: [{ scale: checkScale }] }}>
          <Feather name="check-circle" size={20} color={colors.tealDark} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 14,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
  },
  compactBtn: {
    height: 88,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  compactLabel: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 17,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
