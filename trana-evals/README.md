# Trana AI Eval Framework

AI evaluation framework for Trana built using Promptfoo v0.121+.

## What We Evaluate

Four dimensions across 20 test cases:

- D1 Recommendation Relevance — does the AI surface destinations 
  that match all user inputs simultaneously
- D2 Geographic and Intent Accuracy — does the AI respect 
  stated geographic interests and return appropriate destinations
- D3 Day Count Accuracy — does the itinerary contain exactly 
  the number of days requested
- D4 Reasoning Quality — is the personalised rationale specific 
  to the user's actual quiz inputs

## Results - Week 1

Overall pass rate: 19 out of 20 cases — 95 percent
Model: claude-sonnet-4-6

| Dimension | Score | Target | Status |
|---|---|---|---|
| D1 Recommendation Relevance | 3.0 / 3 | 2.5 | Met |
| D2 Geographic Accuracy | 2.75 / 3 | 2.8 | Narrowly missed |
| D3 Day Count Accuracy | 2.625 / 3 | 3.0 | Below target |
| D4 Reasoning Quality | 3.0 / 3 | 2.3 | Exceeded |

One failure: D3-TC03 — model returned 6 days for a 5-day 
Jaisalmer request. Model self-detected the error but labeled 
Day 6 as INVALID instead of deleting it. Prompt fix applied 
for Week 2.

## How to Run

Install Promptfoo:
npm install -g promptfoo

Set your API key:
export ANTHROPIC_API_KEY=your_key_here

Run recommendations eval:
npx promptfoo eval --config configs/trana-eval-recommendations.yaml

Run itinerary eval:
npx promptfoo eval --config configs/trana-eval-itinerary.yaml

View results:
npx promptfoo view

## Cost

Approximate cost per full 20-case run: USD 0.25
Model: claude-sonnet-4-6
