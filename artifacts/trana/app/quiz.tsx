import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
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
import { useApp } from "@/context/AppContext";

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setQuizAnswers } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const progressAnim = useRef(new Animated.Value(0)).current;
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const question = quizQuestions[step];
  const isLast = step === quizQuestions.length - 1;
  const totalSteps = quizQuestions.length;
  const progress = (step + 1) / totalSteps;

  const currentAnswer = answers[question.id] as string | string[] | undefined;
  const hasAnswer = question.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : !!currentAnswer;

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
    } else {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Feather name="arrow-left" size={22} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.stepText, { color: colors.mutedForeground }]}>
            Step {step + 1} of {totalSteps}
          </Text>
          <TouchableOpacity onPress={() => router.push("/recommendations")}>
            <Text style={[styles.skipText, { color: colors.tealDark }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.tealDark,
                width: `${(step / (totalSteps - 1)) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomPad + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.question, { color: colors.primary }]}>
          {question.question}
        </Text>
        <Text style={[styles.questionSub, { color: colors.mutedForeground }]}>
          {question.subtitle}
        </Text>

        {question.multiSelect ? (
          <View style={styles.multiGrid}>
            {question.options.map((opt) => (
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
              />
            ))}
          </View>
        ) : (
          <View style={styles.optionsList}>
            {question.options.map((opt) => (
              <QuizOption
                key={opt.id}
                label={opt.label}
                icon={opt.icon}
                selected={currentAnswer === opt.id}
                onPress={() => handleSelect(opt.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 16,
            backgroundColor: colors.card,
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
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    gap: 12,
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
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 32,
    gap: 8,
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  questionSub: {
    fontSize: 14,
    marginBottom: 24,
  },
  optionsList: {
    gap: 10,
  },
  multiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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
