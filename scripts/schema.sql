-- Ahiya Analytics Schema
-- Run this in Vercel Postgres console or via migration script
-- Creates the page_views table with all required columns and indexes

BEGIN;

-- Create page_views table with all 18 columns
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(2000),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(200),
  utm_content VARCHAR(200),
  utm_term VARCHAR(200),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  device_type VARCHAR(20) NOT NULL DEFAULT 'desktop',
  browser VARCHAR(50),
  browser_version VARCHAR(20),
  os VARCHAR(50),
  os_version VARCHAR(20),
  country VARCHAR(2),
  city VARCHAR(100),
  region VARCHAR(100),
  user_agent TEXT
);

-- Create indexes for query performance
-- Index 1: For time-based queries (most recent first)
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);

-- Index 2: For filtering by page path
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (path);

-- Index 3: For session-based queries
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);

-- Index 4: For campaign analysis (partial index for non-null values)
CREATE INDEX IF NOT EXISTS idx_page_views_utm_campaign ON page_views (utm_campaign) WHERE utm_campaign IS NOT NULL;

-- Index 5: For path + time queries (compound index)
CREATE INDEX IF NOT EXISTS idx_page_views_path_created ON page_views (path, created_at DESC);

-- Index 6: For unique visitor analysis
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_hash ON page_views (visitor_hash);

COMMIT;

-- ========== PLAN-17 ITERATION-18: Events Table ==========
-- Behavioral event tracking (scroll, click, engagement, conversion)
BEGIN;

-- Events table for behavioral tracking
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64),
  page_path VARCHAR(500) NOT NULL,
  event_category VARCHAR(50) NOT NULL,
  event_action VARCHAR(100) NOT NULL,
  event_label VARCHAR(200),
  event_value INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for query performance
-- Index 1: For time-based queries (most recent first)
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at DESC);

-- Index 2: For session-based queries
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events (session_id);

-- Index 3: For filtering by event category
CREATE INDEX IF NOT EXISTS idx_events_category ON events (event_category);

-- Index 4: For path + category compound queries
CREATE INDEX IF NOT EXISTS idx_events_path_category ON events (page_path, event_category);

-- Index 5: For category + action compound queries
CREATE INDEX IF NOT EXISTS idx_events_category_action ON events (event_category, event_action);

-- Index 6: For visitor analysis (partial index for non-null values)
CREATE INDEX IF NOT EXISTS idx_events_visitor_hash ON events (visitor_hash) WHERE visitor_hash IS NOT NULL;

COMMIT;
-- ========== END PLAN-17 ITERATION-18 ==========
