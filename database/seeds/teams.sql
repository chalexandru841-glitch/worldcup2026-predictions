-- FIFA World Cup 2026 — 48 qualified teams seed data
INSERT INTO teams (name, code, flag_emoji, group_name, confederation) VALUES
  -- Group A
  ('United States', 'USA', '🇺🇸', 'A', 'CONCACAF'),
  ('Canada', 'CAN', '🇨🇦', 'A', 'CONCACAF'),
  ('Mexico', 'MEX', '🇲🇽', 'A', 'CONCACAF'),
  -- Group B
  ('Brazil', 'BRA', '🇧🇷', 'B', 'CONMEBOL'),
  ('Argentina', 'ARG', '🇦🇷', 'B', 'CONMEBOL'),
  ('Colombia', 'COL', '🇨🇴', 'B', 'CONMEBOL'),
  -- Group C
  ('France', 'FRA', '🇫🇷', 'C', 'UEFA'),
  ('England', 'ENG', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'C', 'UEFA'),
  ('Germany', 'GER', '🇩🇪', 'C', 'UEFA'),
  -- Group D
  ('Spain', 'ESP', '🇪🇸', 'D', 'UEFA'),
  ('Portugal', 'POR', '🇵🇹', 'D', 'UEFA'),
  ('Netherlands', 'NED', '🇳🇱', 'D', 'UEFA'),
  -- Group E
  ('Japan', 'JPN', '🇯🇵', 'E', 'AFC'),
  ('South Korea', 'KOR', '🇰🇷', 'E', 'AFC'),
  ('Australia', 'AUS', '🇦🇺', 'E', 'AFC'),
  -- Group F
  ('Morocco', 'MAR', '🇲🇦', 'F', 'CAF'),
  ('Senegal', 'SEN', '🇸🇳', 'F', 'CAF'),
  ('Nigeria', 'NGA', '🇳🇬', 'F', 'CAF');
