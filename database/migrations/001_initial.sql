-- World Cup 2026 Prediction Platform
-- Migration 001: Initial schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code CHAR(3) UNIQUE NOT NULL,  -- e.g. BRA, ARG, FRA
  flag_emoji TEXT,
  group_name CHAR(1),            -- A-L
  confederation TEXT
);

-- Matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  home_team_id UUID REFERENCES teams(id),
  away_team_id UUID REFERENCES teams(id),
  stage TEXT NOT NULL,           -- group, r16, qf, sf, final
  group_name CHAR(1),
  kickoff_at TIMESTAMPTZ NOT NULL,
  venue TEXT,
  city TEXT,
  home_score INTEGER,
  away_score INTEGER,
  status TEXT DEFAULT 'upcoming', -- upcoming, live, finished
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Predictions
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  predicted_home INTEGER NOT NULL,
  predicted_away INTEGER NOT NULL,
  points_awarded INTEGER,
  scored_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, match_id)
);

CREATE INDEX idx_predictions_user ON predictions(user_id);
CREATE INDEX idx_predictions_match ON predictions(match_id);
CREATE INDEX idx_matches_kickoff ON matches(kickoff_at);
