import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { quizQuestions } from "@/data/mockData";
import QuizBackground from "@/components/QuizBackground";
import QuizOption from "@/components/QuizOption";

export default function QuizScreen() {
  const colors = useColors();
  const navigate = useNavigate();
  const { setQuizAnswers } = useApp();

  const [step, setStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const question = quizQuestions[displayStep];
  const isMulti = !!question.multiSelect;

  const selectedFor = (qId: number): string | string[] => answers[qId] ?? (isMulti ? [] : "");

  const toggleOption = (optId: string) => {
    if (isMulti) {
      const prev = (answers[question.id] as string[]) || [];
      setAnswers((a) => ({
        ...a,
        [question.id]: prev.includes(optId)
          ? prev.filter((x) => x !== optId)
          : [...prev, optId],
      }));
    } else {
      setAnswers((a) => ({ ...a, [question.id]: optId }));
    }
  };

  const canProgress = () => {
    const val = answers[question.id];
    if (isMulti) return Array.isArray(val) && val.length > 0;
    return !!val;
  };

  const transition = useCallback(
    (newStep: number, dir: "forward" | "back") => {
      setDirection(dir);
      setAnimKey((k) => k + 1);
      setDisplayStep(newStep);
      setStep(newStep);
    },
    []
  );

  const handleNext = () => {
    if (!canProgress()) return;
    if (step < quizQuestions.length - 1) {
      transition(step + 1, "forward");
    } else {
      const qa = {
        mood: answers[1] as string,
        companion: answers[2] as string,
        duration: answers[3] as string,
        budget: answers[4] as string,
        interests: answers[5] as string[],
        activity: answers[6] as string,
        city: answers[7] as string,
      };
      setQuizAnswers(qa);
      navigate("/recommendations", { state: { quizAnswers: qa } });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      transition(step - 1, "back");
    } else {
      navigate(-1);
    }
  };

  const progress = (step + 1) / quizQuestions.length;
  const colsForQ = question.options.length > 3 && isMulti;

  const slideAnim = direction === "forward"
    ? "quiz-slide-in-right 0.28s ease both"
    : "quiz-slide-in-left 0.28s ease both";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff", overflow: "hidden" }}>
      <div
        style={{ position: "relative", height: 220, flexShrink: 0, overflow: "hidden" }}
        key={`bg-${animKey}`}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: slideAnim,
          }}
        >
          <QuizBackground questionIndex={step} />
        </div>

        <div
          style={{
            position: "absolute",
            top: 20,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 10,
          }}
        >
          <button
            onClick={handleBack}
            style={{
              background: "rgba(255,255,255,0.25)",
              border: "none",
              borderRadius: 20,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} color="#fff" />
          </button>
          <div
            style={{
              flex: 1,
              height: 4,
              backgroundColor: "rgba(255,255,255,0.35)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: 2,
                width: `${progress * 100}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", flexShrink: 0 }}>
            {step + 1}/{quizQuestions.length}
          </span>
        </div>

        <div
          key={`text-${animKey}`}
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 10,
            animation: "quiz-text-in 0.35s 0.1s ease both",
          }}
        >
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: "30px" }}>
            {question.question}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
            {question.subtitle}
          </p>
        </div>
      </div>

      <div
        key={`options-${animKey}`}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px",
          animation: "quiz-text-in 0.35s 0.15s ease both",
        }}
        className="hide-scrollbar"
      >
        {colsForQ ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {question.options.map((opt, i) => {
              const sel = Array.isArray(selectedFor(question.id))
                ? (selectedFor(question.id) as string[]).includes(opt.id)
                : selectedFor(question.id) === opt.id;
              return (
                <QuizOption
                  key={opt.id}
                  label={opt.label}
                  icon={opt.icon}
                  selected={sel}
                  onPress={() => toggleOption(opt.id)}
                  compact
                  index={i}
                />
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {question.options.map((opt, i) => {
              const sel = Array.isArray(selectedFor(question.id))
                ? (selectedFor(question.id) as string[]).includes(opt.id)
                : selectedFor(question.id) === opt.id;
              return (
                <QuizOption
                  key={opt.id}
                  label={opt.label}
                  icon={opt.icon}
                  selected={sel}
                  onPress={() => toggleOption(opt.id)}
                  compact={false}
                  index={i}
                />
              );
            })}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "12px 16px 20px",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleNext}
          disabled={!canProgress()}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 8,
            backgroundColor: canProgress() ? colors.primary : colors.muted,
            color: canProgress() ? "#fff" : colors.mutedForeground,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: canProgress() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background-color 0.15s",
          }}
        >
          {step === quizQuestions.length - 1 ? "See my destinations" : "Next"}
          <ArrowRight size={18} color={canProgress() ? "#fff" : colors.mutedForeground} />
        </button>
      </div>
    </div>
  );
}
