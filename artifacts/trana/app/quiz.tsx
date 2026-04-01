import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { quizQuestions } from "@/data/mockData";
import QuizOption from "@/components/QuizOption";
import QuizBackground from "@/components/QuizBackground";
import { useApp } from "@/context/AppContext";

const TOTAL = quizQuestions.length;

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setQuizAnswers } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const headerHeight = topPad + 56;
  const coloredHeight = Math.max(160, Math.round(screenHeight * 0.45) - headerHeight);
  const trackWidth = screenWidth - 40;
  const multiItemWidth = Math.floor((screenWidth - 48 - 12) / 2);

  const [step, setStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const progressAnim = useRef(new Animated.Value(1 / TOTAL)).current;
  const transOpacity = useRef(new Animated.Value(1)).current;
  const transSlide = useRef(new Animated.Value(0)).current;
  const topSlideAnim = useRef(new Animated.Value(0)).current;

  const question = quizQuestions[displayStep];
  const isLast = displayStep === TOTAL - 1;
  const currentAnswer = answers[question.id] as string | string[] | undefined;
  const hasAnswer = question.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : !!currentAnswer;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth],
  });

  const animateToStep = useCallback(
    (newStep: number, direction: "forward" | "back" = "forward") => {
      const exitX = direction === "forward" ? -screenWidth : screenWidth;
      const enterX = direction === "forward" ? screenWidth : -screenWidth;

      Animated.parallel([
        Animated.timing(topSlideAnim, {
          toValue: exitX,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(transOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(transSlide, {
          toValue: direction === "forward" ? -8 : 8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDisplayStep(newStep);
        topSlideAnim.setValue(enterX);
        transSlide.setValue(direction === "forward" ? 12 : -12);
        Animated.parallel([
          Animated.timing(topSlideAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(transOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(transSlide, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [topSlideAnim, transOpacity, transSlide, screenWidth]
  );

  const animateProgress = useCallback(
    (nextStep: number) => {
      Animated.timing(progressAnim, {
        toValue: (nextStep + 1) / TOTAL,
        duration: 400,
        useNativeDriver: false,
      }).start();
    },
    [progressAnim]
  );

  const handleSelect = (optionId: string) => {
    if (question.multiSelect) {
      const prev = (answers[question.id] as string[]) || [];
      const next = prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId];
      setAnswers({ ...answers, [question.id]: next });
    } else {
      setAnswers({ ...answers, [question.id]: optionId });
    }
  };

  const handleContinue = () => {
    if (isLast) {
      setQuizAnswers({
        mood: answers[1] as string,
        companion: answers[2] as string,
        duration: answers[3] as string,
        budget: answers[4] as string,
        interests: answers[5] as string[],
        activity: answers[6] as string,
        city: answers[7] as string,
      });
      router.push("/recommendations");
      return;
    }
    const nextStep = step + 1;
    setStep(nextStep);
    animateProgress(nextStep);
    animateToStep(nextStep, "forward");
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    const prevStep = step - 1;
    setStep(prevStep);
    animateProgress(prevStep);
    animateToStep(prevStep, "back");
  };

  const progressGlow = Platform.select({
    web: { boxShadow: "0 0 8px rgba(13, 115, 119, 0.4)" } as any,
    default: {
      shadowColor: "#0D7377",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 3,
    },
  });

  return (
    <View style={styles.container}>
      {/* White header strip: back, step count, skip, progress bar */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topPad + 8,
            height: headerHeight,
            backgroundColor: "#fff",
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Feather name="arrow-left" size={22} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.stepText, { color: colors.mutedForeground }]}>
            Step {step + 1} of {TOTAL}
          </Text>
          <TouchableOpacity onPress={() => router.push("/recommendations")}>
            <Text style={[styles.skipText, { color: colors.tealDark }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: colors.border, width: trackWidth },
          ]}
        >
          <Animated.View
            style={[
              styles.progressFill,
              { backgroundColor: colors.tealDark, width: progressWidth },
              progressGlow,
            ]}
          />
        </View>
      </View>

      {/* Bold colored top section — slides horizontally on question change */}
      <Animated.View
        style={[
          styles.coloredSection,
          {
            height: coloredHeight,
            transform: [{ translateX: topSlideAnim }],
          },
        ]}
      >
        <QuizBackground questionIndex={displayStep} />
      </Animated.View>

      {/* White scrollable content area */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomPad + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: transOpacity,
            transform: [{ translateY: transSlide }],
          }}
        >
          <Text style={[styles.question, { color: "#1A1A1A" }]}>
            {question.question}
          </Text>
          <Text style={[styles.questionSub, { color: colors.mutedForeground }]}>
            {question.subtitle}
          </Text>

          {question.multiSelect ? (
            <View style={styles.multiGrid}>
              {question.options.map((opt, i) => (
                <QuizOption
                  key={opt.id}
                  label={opt.label}
                  icon={opt.icon}
                  selected={
                    Array.isArray(currentAnswer) &&
                    currentAnswer.includes(opt.id)
                  }
                  onPress={() => handleSelect(opt.id)}
                  compact
                  index={i}
                  style={{ width: multiItemWidth }}
                />
              ))}
            </View>
          ) : (
            <View style={styles.optionsList}>
              {question.options.map((opt, i) => (
                <QuizOption
                  key={opt.id}
                  label={opt.label}
                  icon={opt.icon}
                  selected={currentAnswer === opt.id}
                  onPress={() => handleSelect(opt.id)}
                  index={i}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 16,
            backgroundColor: "#fff",
            borderTopColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!hasAnswer}
          activeOpacity={0.85}
          style={[
            styles.continueBtn,
            {
              backgroundColor: hasAnswer ? colors.primary : colors.border,
              opacity: hasAnswer ? 1 : 0.6,
            },
          ]}
        >
          <Text style={styles.continueBtnText}>
            {isLast ? "Show my destinations" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    justifyContent: "flex-end",
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepText: {
    fontSize: 14,
    fontWeight: "500",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  coloredSection: {
    width: "100%",
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingTop: 24,
    gap: 8,
  },
  question: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
  },
  questionSub: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  optionsList: {
    gap: 10,
  },
  multiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  continueBtn: {
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
