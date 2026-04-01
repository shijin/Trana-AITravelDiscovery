import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userEmail, setIsLoggedIn, wishlist } = useApp();
  const [notifications, setNotifications] = useState(true);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 20 : insets.bottom + 64 + 20;

  const initials = userEmail ? userEmail[0].toUpperCase() : "T";

  const handleSignOut = () => {
    setIsLoggedIn(false);
    router.replace("/");
  };

  const SettingRow = ({
    icon,
    label,
    right,
  }: {
    icon: string;
    label: string;
    right?: React.ReactNode;
  }) => (
    <View
      style={[
        styles.settingRow,
        { borderBottomColor: colors.border },
      ]}
    >
      <Feather name={icon as any} size={18} color={colors.mutedForeground} />
      <Text style={[styles.settingLabel, { color: colors.foreground }]}>
        {label}
      </Text>
      {right || (
        <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      )}
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad + 20,
        paddingBottom: bottomPad,
        paddingHorizontal: 20,
        gap: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.primary }]}>My Profile</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.avatarSection}>
          <LinearGradient
            colors={[colors.primary, colors.tealDark]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
          <Text style={[styles.email, { color: colors.foreground }]}>
            {userEmail || "guest@trana.app"}
          </Text>
          <Text style={[styles.memberSince, { color: colors.mutedForeground }]}>
            Member since April 2026
          </Text>
        </View>
        <View style={[styles.statsRow, { borderColor: colors.border }]}>
          {[
            { num: "3", label: "Trips planned" },
            { num: `${wishlist.length}`, label: "Destinations saved" },
            { num: "12", label: "Days explored" },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={[styles.statNum, { color: colors.primary }]}>
                {stat.num}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Preferences
        </Text>
        <SettingRow icon="sliders" label="My travel style" />
        <SettingRow icon="map-pin" label="Home city" />
        <SettingRow icon="coffee" label="Dietary preferences" />
        <SettingRow icon="activity" label="Physical activity level" />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Account
        </Text>
        <SettingRow
          icon="bell"
          label="Notifications"
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.tealDark }}
              thumbColor="#fff"
            />
          }
        />
        <SettingRow icon="lock" label="Privacy settings" />
        <SettingRow icon="help-circle" label="Help & feedback" />
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        style={[
          styles.signOutBtn,
          { borderColor: colors.border },
        ]}
        activeOpacity={0.7}
      >
        <Feather name="log-out" size={18} color={colors.mutedForeground} />
        <Text style={[styles.signOutText, { color: colors.mutedForeground }]}>
          Sign out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  avatarSection: {
    alignItems: "center",
    padding: 24,
    gap: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
  },
  memberSince: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  statNum: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    padding: 16,
    paddingBottom: 8,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
  },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
