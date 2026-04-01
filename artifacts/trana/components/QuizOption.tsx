import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  compact?: boolean;
}

export default function QuizOption({
  label,
  icon,
  selected,
  onPress,
  compact = false,
}: Props) {
  const colors = useColors();

  if (compact) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.compactBtn,
          {
            borderColor: selected ? colors.tealDark : colors.border,
            backgroundColor: selected ? colors.tealLight : colors.card,
          },
        ]}
      >
        <Feather
          name={icon as any}
          size={20}
          color={selected ? colors.tealDark : colors.mutedForeground}
        />
        <Text
          style={[
            styles.compactLabel,
            { color: selected ? colors.tealDark : colors.foreground },
          ]}
          numberOfLines={2}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
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
      {selected && (
        <Feather name="check-circle" size={20} color={colors.tealDark} />
      )}
    </TouchableOpacity>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    borderRadius: 8,
    borderWidth: 1.5,
    gap: 6,
    padding: 8,
  },
  compactLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
