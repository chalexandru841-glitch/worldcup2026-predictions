-- Migration 002: Security hardening

-- Refresh tokens table (server-side session control)
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT UNIQUE NOT NULL,  -- Store hash, not raw token
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash);

-- Audit log table
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address INET,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Failed login attempts tracking
CREATE TABLE login_attempts (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address INET NOT NULL,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  success BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_login_attempts_email ON login_attempts(email, attempted_at DESC);
CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address, attempted_at DESC);

-- Auto-cleanup: delete old login attempts after 24h
CREATE OR REPLACE FUNCTION cleanup_old_login_attempts()
RETURNS void AS $$
  DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL '24 hours';
$$ LANGUAGE sql;

-- Row Level Security on predictions — users can only see/edit their own
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY predictions_user_isolation ON predictions
  USING (user_id = current_setting('app.current_user_id')::uuid);

-- Immutable predictions once match starts (enforced via trigger)
CREATE OR REPLACE FUNCTION prevent_locked_prediction_edit()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM matches
    WHERE id = NEW.match_id AND kickoff_at <= NOW()
  ) THEN
    RAISE EXCEPTION 'Predictions locked after match kickoff';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lock_predictions_on_kickoff
  BEFORE INSERT OR UPDATE ON predictions
  FOR EACH ROW EXECUTE FUNCTION prevent_locked_prediction_edit();

-- Revoke public schema access from default role
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
