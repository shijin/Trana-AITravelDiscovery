# Week 1 Findings — Trana AI Eval

Date: April 2026
Model: claude-sonnet-4-6
Total test cases: 20
Pass rate: 95 percent (19/20)

## Executive Summary

Trana's AI recommendation and itinerary engine performed strongly across three of four dimensions in Week 1. Reasoning quality exceeded target significantly. Budget conservatism worked after prompt improvements. 
Geographic specificity worked for clearly defined regions.

One genuine failure identified in Day Count Accuracy. The model returned 6 days for a 5-day request, self-detected the error, but labeled rather than deleted the excess day. Prompt fix applied for Week 2.

## Highest Priority Finding

D3-TC03 — Jaisalmer 5-day itinerary returned 6 days. Day 6 was labeled INVALID — REMOVE THIS by the model itself. Root cause: prompt instructs the model to count days but does not instruct it to delete excess days.

Fix applied to itinerary prompt:
"If your days array contains more objects than requested, delete the excess entirely before responding. Do not label them INVALID. Simply remove them."

## Secondary Finding

D2-TC03 — Northeast India request returned 5 Meghalaya destinations only. No destinations from Assam, Arunachal, Sikkim, or Nagaland appeared despite user specifying Northeast India broadly.

Root cause: living root bridge interest anchors the model to Meghalaya as the dominant state.

Fix planned for V2 prompt.

## What Worked Well

- Budget bias instruction: no destination exceeded the upper limit of any stated budget range across all 12 recommendation test cases
- Reasoning quality: all rationales referenced 2 or more specific user inputs. Zero generic copy detected.
- Senior accessibility language: flat terrain, easy access, comfortable journey mentioned consistently
- Couple-specific rationale: romantic language distinctly different from solo rationale for same destinations
- Cost range gap: all itinerary cost ranges within Rs 5,000 maximum gap

## Week 2 Plan

Run D3-TC03 only after applying deletion instruction fix.
If passes: Day Count Accuracy reaches 100 percent.
If fails: escalate to explicit JSON array truncation instruction.
