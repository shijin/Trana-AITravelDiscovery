import { Feather } from "@expo/vector-icons";
import React from "react";
import {
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
}

export default function QuizOption({
  label,
  icon,
  selected,
  onPress,
  compact = false,
  style,
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
            borderColor: selected ? colors.tealDark : "#E5E7EB",
            borderWidth: selected ? 2 : 1.5,
            backgroundColor: selected ? colors.tealLight : "#FFFFFF",
          },
          style,
        ]}
      >
        {selected && (
          <View
            style={[
              styles.checkBadge,
              { backgroundColor: colors.tealDark },
            ]}
          >
            <Feather name="check" size={8} color="#fff" />
          </View>
        )}
        <Feather
          name={icon as any}
          size={28}
          color={selected ? colors.tealDark : colors.mutedForeground}
          style={styles.compactIcon}
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
    height: 88,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  compactIcon: {
    marginTop: 0,
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
