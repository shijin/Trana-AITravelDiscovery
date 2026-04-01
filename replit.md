# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a Trāna travel discovery mobile app (Expo) plus a shared Express API server.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Mobile**: Expo (React Native) with Expo Router

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   ├── trana/              # Trāna mobile app (Expo)
│   └── mockup-sandbox/     # Design mockup sandbox
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Trāna App (`artifacts/trana`)

AI-powered travel discovery app for Indian travelers.

### Features
- **Home screen**: Welcome with quick actions (Discover, Plan, Chat), trending destinations, wishlist preview
- **Discover screen**: Entry point — solo discovery quiz, plan with partner (V2), circuit builder
- **Quiz screen**: 7-question personalized preference quiz
- **Recommendations screen**: AI-matched destination cards with rationale, budget, season tags
- **Destination Detail screen**: Full bleed hero, budget breakdown, best months, food highlights, videos
- **Chat screen**: AI refinement chat with typing indicator, suggestion chips, destination chips
- **Itinerary Builder screen**: Chat-based circuit planner
- **Itinerary Detail screen**: Day-by-day Karnataka 5-day circuit
- **Wishlist screen**: Saved destinations + itineraries
- **Profile screen**: User stats, preferences, account settings
- **Auth screen**: Sign in / Sign up with local persistence

### Design System
- **Colors**: Navy (#1A3C5E), Teal (#0D7377), Gold (#C9962B), Light Teal (#D6F0EF)
- **Font**: Inter (400/500/600/700) via expo-google-fonts
- **Mock data**: 5 destinations (Coorg, Hampi, Pondicherry, Mysuru, Meghalaya)
- **Persistence**: AsyncStorage for wishlist, itinerary, and user session

### Key Files
- `app/_layout.tsx` — Root layout with all providers including AppProvider
- `context/AppContext.tsx` — Wishlist, itinerary, quiz answers, user session state
- `data/mockData.ts` — All mock destinations, quiz questions, itinerary data
- `constants/colors.ts` — Trāna brand color tokens
- `components/` — DestinationCard, QuizOption, ChatBubble, TypingIndicator

## API Server (`artifacts/api-server`)

Express 5 API server. Routes in `src/routes/`, uses `@workspace/api-zod` and `@workspace/db`.

- Entry: `src/index.ts`
- App setup: `src/app.ts`
- Base path: `/api`

## Packages

### `lib/api-spec` (`@workspace/api-spec`)
OpenAPI 3.1 spec + Orval codegen config.
Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/db` (`@workspace/db`)
Drizzle ORM with PostgreSQL.
Push schema: `pnpm --filter @workspace/db run push`
