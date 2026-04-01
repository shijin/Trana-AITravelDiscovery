import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export default function AuthScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setUserEmail, setIsLoggedIn } = useApp();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleAuth = async () => {
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (tab === "signup" && password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    await setUserEmail(email);
    setIsLoggedIn(true);
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={[colors.primary, colors.tealDark]}
        style={[styles.heroSection, { paddingTop: topPad + 24 }]}
      >
        <Text style={styles.appName}>Trāna</Text>
        <Text style={styles.heroTagline}>
          Save your discoveries. Pick up where you left off.
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={[
          styles.formSection,
          { paddingBottom: bottomPad + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.tabRow, { borderBottomColor: colors.border }]}>
          {(["signin", "signup"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => {
                setTab(t);
                setError("");
              }}
              style={[
                styles.tab,
                tab === t && {
                  borderBottomWidth: 2,
                  borderBottomColor: colors.tealDark,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      tab === t ? colors.tealDark : colors.mutedForeground,
                    fontWeight: tab === t ? "700" : "400",
                  },
                ]}
              >
                {t === "signin" ? "Sign in" : "Sign up"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.foreground,
                backgroundColor: colors.card,
              },
            ]}
          />
          <View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry={!showPass}
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.foreground,
                  backgroundColor: colors.card,
                },
              ]}
            />
            <TouchableOpacity
              onPress={() => setShowPass(!showPass)}
              style={styles.eyeBtn}
            >
              <Text style={[styles.eyeText, { color: colors.mutedForeground }]}>
                {showPass ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          {tab === "signup" && (
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirm password"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry={!showPass}
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.foreground,
                  backgroundColor: colors.card,
                },
              ]}
            />
          )}

          {error ? (
            <Text style={[styles.errorText, { color: colors.destructive }]}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleAuth}
            style={[styles.authBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <Text style={styles.authBtnText}>
              {tab === "signin" ? "Sign in" : "Create account"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
            <Text style={[styles.backLinkText, { color: colors.mutedForeground }]}>
              Continue without signing in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 32,
  },
  appName: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  heroTagline: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
  formSection: {
    padding: 24,
    gap: 24,
  },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 12,
  },
  tabText: {
    fontSize: 16,
  },
  form: {
    gap: 14,
  },
  input: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  eyeText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
  authBtn: {
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  authBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backLink: {
    alignItems: "center",
    paddingTop: 4,
  },
  backLinkText: {
    fontSize: 14,
  },
});
