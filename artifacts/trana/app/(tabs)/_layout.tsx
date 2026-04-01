import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="discover">
        <Icon sf={{ default: "safari", selected: "safari.fill" }} />
        <Label>Discover</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="wishlist">
        <Icon sf={{ default: "bookmark", selected: "bookmark.fill" }} />
        <Label>Wishlist</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf={{ default: "person", selected: "person.fill" }} />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

const TAB_ICONS = ["home", "compass", "bookmark", "user"] as const;
const TAB_LABELS = ["Home", "Discover", "Wishlist", "Profile"];
const TAB_NAMES = ["index", "discover", "wishlist", "profile"];
const PILL_W = 48;
const PILL_H = 32;

function SlidingTabBar({
  state,
  navigation,
}: {
  state: { index: number; routes: Array<{ key: string; name: string }> };
  navigation: any;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  const [barWidth, setBarWidth] = useState(0);
  const barHeight = isWeb ? 84 : 64;
  const pillAnim = useRef(new Animated.Value(0)).current;
  const pillInitialized = useRef(false);

  // 4 icon scale animations
  const iconScales = useRef(
    [0, 1, 2, 3].map((i) => new Animated.Value(state.index === i ? 1.1 : 1))
  ).current;
  const prevIndex = useRef(state.index);

  useEffect(() => {
    if (barWidth === 0) return;
    const tabW = barWidth / 4;
    const targetX = state.index * tabW + (tabW - PILL_W) / 2;

    if (!pillInitialized.current) {
      pillInitialized.current = true;
      pillAnim.setValue(targetX);
    } else {
      Animated.timing(pillAnim, {
        toValue: targetX,
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  }, [state.index, barWidth]);

  useEffect(() => {
    const prev = prevIndex.current;
    const curr = state.index;
    prevIndex.current = curr;

    Animated.spring(iconScales[curr], {
      toValue: 1.1,
      tension: 300,
      friction: 12,
      useNativeDriver: true,
    }).start();

    if (prev !== curr) {
      Animated.spring(iconScales[prev], {
        toValue: 1,
        tension: 300,
        friction: 12,
        useNativeDriver: true,
      }).start();
    }
  }, [state.index]);

  const pillTop = (barHeight - PILL_H) / 2;

  return (
    <View
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      style={[
        styles.tabBar,
        {
          height: barHeight + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopColor: colors.border,
          backgroundColor:
            isIOS ? "transparent" : colors.card,
        },
      ]}
    >
      {/* Blur background for iOS */}
      {isIOS && (
        <BlurView
          intensity={100}
          tint={isDark ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* Sliding pill indicator */}
      {barWidth > 0 && (
        <Animated.View
          style={[
            styles.pill,
            {
              top: pillTop,
              left: pillAnim,
              width: PILL_W,
              height: PILL_H,
              backgroundColor: "#D6F0EF",
            },
          ]}
          />
      )}

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(TAB_NAMES[index]);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tab}
          >
            <Animated.View style={{ transform: [{ scale: iconScales[index] }] }}>
              <Feather
                name={TAB_ICONS[index]}
                size={22}
                color={isFocused ? colors.tealDark : "#9CA3AF"}
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? colors.tealDark : "#9CA3AF",
                  fontWeight: isFocused ? "600" : "400",
                  opacity: isFocused ? 1 : 0.7,
                },
              ]}
            >
              {TAB_LABELS[index]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ClassicTabLayout() {
  return (
    <Tabs
      tabBar={(props) => <SlidingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    position: "relative",
    zIndex: 10,
  },
  pill: {
    position: "absolute",
    borderRadius: 16,
    zIndex: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 12,
  },
});
