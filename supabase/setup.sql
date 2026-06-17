-- ============================================================
-- SETUP — à exécuter dans l'éditeur SQL de Supabase
-- ============================================================

-- 1. Table albums
CREATE TABLE IF NOT EXISTS albums (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT,
  cover_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table photos
CREATE TABLE IF NOT EXISTS photos (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id     UUID        REFERENCES albums(id) ON DELETE CASCADE,
  url          TEXT        NOT NULL,
  storage_path TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security — accès public en lecture/écriture
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public select albums"  ON albums FOR SELECT  USING (true);
CREATE POLICY "Public insert albums"  ON albums FOR INSERT  WITH CHECK (true);
CREATE POLICY "Public update albums"  ON albums FOR UPDATE  USING (true);

CREATE POLICY "Public select photos"  ON photos FOR SELECT  USING (true);
CREATE POLICY "Public insert photos"  ON photos FOR INSERT  WITH CHECK (true);

-- ============================================================
-- STORAGE — à faire manuellement dans Supabase Dashboard
-- ============================================================
-- 1. Aller dans Storage > New Bucket
-- 2. Nom : photos
-- 3. Cocher "Public bucket"
-- 4. Sauvegarder
-- ============================================================
