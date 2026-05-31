import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'

const NAVY = '#1A1A1A'
const RED  = '#C0392B'
const GOLD = '#C8A84B'

const LEVELS = [
  { level: 'A1', label: 'Débutant', duration: '3 mois', desc: 'Bases de la communication : alphabet, salutations, chiffres, formules courantes.', condition: 'Baccalauréat' },
  { level: 'A2', label: 'Élémentaire', duration: '3 mois', desc: 'Conversations simples, vie quotidienne, achats, directions.', condition: 'Réussite A1' },
  { level: 'B1', label: 'Intermédiaire', duration: '3 mois', desc: 'Communication autonome, grammaire intermédiaire, compréhension de textes courants.', condition: 'Réussite A2' },
  { level: 'B2', label: 'Avancé', duration: '3 mois', desc: 'Niveau requis pour visa Allemagne et Ausbildung Pflege. Argumentation et compréhension avancées.', condition: 'Réussite B1' },
  { level: 'C1', label: 'Courant', duration: '3 mois', desc: 'Maîtrise professionnelle. Rédaction complexe, discours techniques et académiques.', condition: 'Réussite B2' },
]

export default function CertificationsPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.slice(0,2) || 'fr'

  const labels = {
    fr: {
      title: 'Certifications Linguistiques',
      sub: 'Des examens reconnus internationalement',
      intro: 'Centre d\'examen agréé à Yaoundé, Reisetür 237 prépare et organise le passage des certifications officielles en langue allemande, du niveau A1 au C1.',
      levels: 'Les niveaux disponibles',
      duration: 'Durée',
      condition: 'Condition d\'accès',
      diploma: 'Diplôme obtenu',
      test: 'Tester mon niveau gratuitement',
      testSub: 'Simulateur d\'examen B1 / B2 disponible en ligne',
      badge: 'Certifications',
      months: 'mois de formation',
    },
    de: {
      title: 'Sprachzertifizierungen',
      sub: 'International anerkannte Prüfungen',
      intro: 'Als zugelassenes Prüfungszentrum in Yaoundé bereitet Reisetür 237 Kandidaten auf offizielle Deutschzertifizierungen von A1 bis C1 vor.',
      levels: 'Verfügbare Niveaus',
      duration: 'Dauer',
      condition: 'Zugangsbedingung',
      diploma: 'Erhaltenes Diplom',
      test: 'Mein Niveau kostenlos testen',
      testSub: 'Online B1/B2 Prüfungssimulator verfügbar',
      badge: 'Zertifizierungen',
      months: 'Monate Ausbildung',
    },
    en: {
      title: 'Language Certifications',
      sub: 'Internationally recognized examinations',
      intro: 'As an approved examination center in Yaoundé, Reisetür 237 prepares and organizes official German language certifications from A1 to C1.',
      levels: 'Available levels',
      duration: 'Duration',
      condition: 'Entry requirement',
      diploma: 'Certificate obtained',
      test: 'Test my level for free',
      testSub: 'Online B1/B2 exam simulator available',
      badge: 'Certifications',
      months: 'months of training',
    },
  }

  const L = labels[lang] || labels['fr']

  return (
    <>
      <SEOHead page="certifications" />
      <div style={{ paddingTop: 62, fontFamily: "'DM Sans',sans-serif" }}>

        {/* ── HERO ── */}
        <div style={{ background: `linear-gradient(135deg, ${NAVY}, #2a0707)`, padding: '64px 32px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize: '50px 50px' }}/>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 12 }}>{L.badge}</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,46px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{L.title}</h1>
          <div style={{ width: 48, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 18px' }}/>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>{L.sub}</p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 28px' }}>

          {/* Intro */}
          <p style={{ color: '#64748B', fontSize: 16.5, lineHeight: 1.8, textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>{L.intro}</p>

          {/* ── CTA SIMULATEUR ── */}
          <div style={{
            background: `linear-gradient(135deg, ${NAVY}, #1B3E6F)`,
            borderRadius: 20, padding: '36px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20, marginBottom: 56,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: `1px solid rgba(200,168,75,0.3)`,
          }}>
            <div>
              <p style={{ color: GOLD, fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 8 }}>Simulateur en ligne</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#fff', marginBottom: 8 }}>{L.test}</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14.5 }}>{L.testSub}</p>
            </div>
            <a
              href="https://reisetuer-bildungswerk.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: RED, color: '#fff', textDecoration: 'none',
                borderRadius: 12, padding: '14px 28px',
                fontSize: 15, fontWeight: 700,
                boxShadow: '0 4px 18px rgba(192,57,43,0.45)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                whiteSpace: 'nowrap',
              }}>
              🎯 {L.test} →
            </a>
          </div>

          {/* ── NIVEAUX ── */}
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: NAVY, textAlign: 'center', marginBottom: 8 }}>{L.levels}</h2>
          <div style={{ width: 48, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 36px' }}/>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {LEVELS.map((item, i) => (
              <div key={item.level} style={{
                background: '#fff', borderRadius: 16, padding: '24px 28px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                display: 'grid', gridTemplateColumns: '80px 1fr auto',
                gap: 24, alignItems: 'center',
                border: '1.5px solid #F1F5FB',
                transition: 'box-shadow .2s',
              }}>
                {/* Badge niveau */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 62, height: 62, borderRadius: '50%',
                    background: i < 2 ? '#DBEAFE' : i < 4 ? '#FEF3C7' : '#D1FAE5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 6px',
                  }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: i < 2 ? '#1D4ED8' : i < 4 ? '#D97706' : '#059669' }}>{item.level}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{item.label}</span>
                </div>

                {/* Contenu */}
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
                    Langue Allemande de Niveau {item.level}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: 13.5, lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12.5, color: '#64748B' }}>
                      📋 <b>{L.condition} :</b> {item.condition}
                    </span>
                    <span style={{ fontSize: 12.5, color: '#64748B' }}>
                      🏆 <b>{L.diploma} :</b> Attestation de Réussite {item.level}
                    </span>
                  </div>
                </div>

                {/* Durée */}
                <div style={{ textAlign: 'center', minWidth: 80 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: RED, lineHeight: 1 }}>3</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.3 }}>{L.months}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Parcours total */}
          <div style={{ background: '#F7F8FC', borderRadius: 16, padding: '24px 28px', marginTop: 28, textAlign: 'center', border: '1.5px solid #E2E8F0' }}>
            <p style={{ color: '#64748B', fontSize: 15 }}>
              Parcours complet <b style={{ color: NAVY }}>A1 → C1</b> en{' '}
              <b style={{ color: RED, fontFamily: "'Playfair Display',serif", fontSize: 20 }}>15 mois</b>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
