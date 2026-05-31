-- ============================================================
-- SCHEMA SUPABASE — Reisetür 237
-- ============================================================

-- 1. TABLE PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT,
  email           TEXT,
  phone           TEXT,
  destination     TEXT CHECK (destination IN ('Allemagne','Malte','Pologne')),
  role            TEXT DEFAULT 'candidate' CHECK (role IN ('candidate','admin','super_admin','charged_dossier','accountant','editor')),
  dossier_status  TEXT DEFAULT 'En attente' CHECK (dossier_status IN ('En attente','En cours','Validé','Rejeté')),
  notes           TEXT,
  assigned_to     UUID,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE DOCUMENTS
CREATE TABLE IF NOT EXISTS documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  path        TEXT NOT NULL,
  size        BIGINT,
  status      TEXT DEFAULT 'En attente' CHECK (status IN ('En attente','Validé','Rejeté')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id  UUID REFERENCES profiles(id) ON DELETE CASCADE,
  sender        TEXT CHECK (sender IN ('candidate','admin')),
  content       TEXT NOT NULL,
  read          BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES profiles(id),
  amount          NUMERIC NOT NULL,
  currency        TEXT DEFAULT 'XAF',
  service         TEXT,
  status          TEXT DEFAULT 'En attente' CHECK (status IN ('En attente','Validé','Échoué')),
  phone_number    TEXT,
  operator        TEXT CHECK (operator IN ('MTN','Orange')),
  transaction_ref TEXT,
  confirmed_by    UUID,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE DOSSIERS VISA
CREATE TABLE IF NOT EXISTS visa_dossiers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id    UUID REFERENCES profiles(id),
  destination     TEXT,
  step            TEXT DEFAULT 'depot' CHECK (step IN ('depot','etude','rdv','decision','depart')),
  assigned_to     UUID,
  notes           TEXT,
  archived        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE ARTICLES
CREATE TABLE IF NOT EXISTS articles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr    TEXT,
  title_de    TEXT,
  title_en    TEXT,
  content_fr  TEXT,
  content_de  TEXT,
  content_en  TEXT,
  excerpt_fr  TEXT,
  excerpt_de  TEXT,
  excerpt_en  TEXT,
  slug        TEXT,
  category    TEXT,
  read_time   INTEGER,
  published   BOOLEAN DEFAULT FALSE,
  author_id   UUID,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLE PARTENAIRES
CREATE TABLE IF NOT EXISTS partners (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  country       TEXT,
  type          TEXT,
  contact_email TEXT,
  description   TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLE SESSIONS EXAMEN
CREATE TABLE IF NOT EXISTS exam_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  level      TEXT CHECK (level IN ('A1','A2','B1','B2','C1')),
  date       DATE,
  location   TEXT,
  capacity   INTEGER,
  price      NUMERIC,
  status     TEXT DEFAULT 'Ouvert' CHECK (status IN ('Ouvert','Complet','Clôturé')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents     ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners      ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;

-- Candidat : ses propres données
CREATE POLICY "candidate_own_profile"   ON profiles     FOR ALL USING (auth.uid() = id);
CREATE POLICY "candidate_own_documents" ON documents    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "candidate_own_messages"  ON messages     FOR ALL USING (auth.uid() = candidate_id);
CREATE POLICY "candidate_own_payments"  ON payments     FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "candidate_own_dossier"   ON visa_dossiers FOR SELECT USING (auth.uid() = candidate_id);

-- Admin : accès complet
CREATE POLICY "admin_profiles"    ON profiles      FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','charged_dossier')));
CREATE POLICY "admin_documents"   ON documents     FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','charged_dossier')));
CREATE POLICY "admin_messages"    ON messages      FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','charged_dossier')));
CREATE POLICY "admin_payments"    ON payments      FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','accountant')));
CREATE POLICY "admin_dossiers"    ON visa_dossiers FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','charged_dossier')));
CREATE POLICY "admin_articles"    ON articles      FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','editor')));
CREATE POLICY "admin_partners"    ON partners      FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));
CREATE POLICY "admin_exams"       ON exam_sessions FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));

-- Public : articles publiés et partenaires actifs visibles par tous
CREATE POLICY "public_articles"   ON articles      FOR SELECT USING (published = TRUE);
CREATE POLICY "public_partners"   ON partners      FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_exams"      ON exam_sessions FOR SELECT USING (status != 'Clôturé');

-- TABLE DEMANDES DE CONTACT
CREATE TABLE IF NOT EXISTS contact_requests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT,
  email       TEXT,
  phone       TEXT,
  destination TEXT,
  program     TEXT,
  message     TEXT,
  status      TEXT DEFAULT 'Nouveau',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_contact" ON contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_read_contact"    ON contact_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','super_admin','charged_dossier'))
);
