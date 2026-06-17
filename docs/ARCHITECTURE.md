# Architecture Overview

## Folder Structure

```
worldcup2026-predictions/
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── assets/         # Flags, logos, images
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Button, Card, Modal, Badge
│   │   │   ├── match/      # MatchCard, ScoreInput, Countdown
│   │   │   ├── leaderboard/# LeaderboardTable, RankBadge
│   │   │   ├── bracket/    # KnockoutBracket, GroupTable
│   │   │   └── layout/     # Navbar, Sidebar, Footer
│   │   ├── pages/          # Route-level pages
│   │   ├── store/          # Zustand state slices
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API call functions
│   │   ├── utils/          # Helpers, formatters
│   │   └── styles/         # Global CSS / Tailwind config
│   └── public/
├── backend/                # Node.js / Express API
│   ├── src/
│   │   ├── routes/         # Express routers
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # DB models / schemas
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helpers
│   └── config/
├── database/
│   ├── migrations/         # SQL migrations
│   └── seeds/              # Seed data (teams, matches)
├── docs/                   # Documentation
└── .github/
    └── workflows/          # CI/CD pipelines
```

## Data Flow
1. User logs in → JWT issued
2. User selects match → submits score prediction
3. Prediction stored in DB with timestamp (locked once match starts)
4. After match: results entered → scoring engine calculates points
5. Leaderboard recalculated and displayed in real-time

## Scoring System
| Outcome | Points |
|---------|--------|
| Exact score | 3 pts |
| Correct winner + goal diff | 2 pts |
| Correct winner only | 1 pt |
| Wrong | 0 pts |
