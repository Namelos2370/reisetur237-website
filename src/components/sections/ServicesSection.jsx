import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useIsMobile } from '../../hooks/useIsMobile'
import useScrollReveal from '../../hooks/useScrollReveal'

const NAVY='#1A1A1A', GOLD='#C8A84B', RED='#C0392B'

const SERVICES = [
  { key:'visa',        img:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80' },
  { key:'orientation', img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80' },
  { key:'ausbildung',  img:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80' },
  { key:'language',    img:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80' },
]

const LANGUAGE_LEVELS = [
  {
    level: 'A1', label: 'Débutant', color: '#4CAF50',
    duree: '2 mois', prix: '115 000 FCFA', modalite: 'Présentiel',
    horaires: 'Lun–Ven 8h–12h ou 15h–17h30',
    desc: 'Bases de la communication : alphabet, salutations, chiffres et formules courantes.',
  },
  {
    level: 'A2', label: 'Élémentaire', color: '#8BC34A',
    duree: '1,5 mois', prix: '115 000 FCFA', modalite: 'Présentiel',
    horaires: 'Lun–Ven 8h–12h ou 15h–17h30',
    desc: 'Conversations simples, vie quotidienne, achats et directions.',
  },
  {
    level: 'B1', label: 'Intermédiaire', color: GOLD,
    duree: '1,5 mois', prix: '120 000 FCFA', modalite: 'Présentiel',
    horaires: 'Lun–Ven 8h–12h (matin) ou 11h30–15h (après-midi)',
    desc: 'Communication autonome, grammaire intermédiaire, textes courants.',
  },
  {
    level: 'B2', label: 'Avancé', color: '#FF9800',
    duree: '1,5 mois', prix: '125 000 FCFA', modalite: 'Présentiel',
    horaires: 'Lun–Ven 11h30–15h',
    desc: 'Niveau requis pour visa Allemagne et Ausbildung Pflege. Argumentation avancée.',
  },
  {
    level: 'C1', label: 'Courant', color: RED,
    duree: '1,5 mois', prix: '130 000 FCFA', modalite: 'Présentiel',
    horaires: 'Sur demande',
    desc: 'Maîtrise professionnelle, rédaction complexe, discours techniques et académiques.',
  },
]

export default function ServicesSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  useScrollReveal()

  return (
    <section style={{ padding: isMobile ? '48px 16px' : '80px 32px', background: '#fff' }} id="services">
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>Services</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 26 : 34, fontWeight: 700, color: NAVY, marginBottom: 11 }}>{t('services.title')}</h2>
          <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }} />
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>{t('services.subtitle')}</p>
        </div>

        {/* Service cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap: isMobile ? 16 : 22 }}>
          {SERVICES.map(({ key, img }, i) => (
            <div key={key} className={`reveal reveal-delay-${i + 1}`}
              style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 18px rgba(0,0,0,0.08)', border: '1.5px solid #F1F5FB', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: isMobile ? 160 : 180, overflow: 'hidden', position: 'relative' }}>
                <img src={img} alt={t(`services.${key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.4))' }} />
              </div>
              <div style={{ padding: '18px 18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15.5, fontWeight: 700, color: NAVY, marginBottom: 7, lineHeight: 1.3 }}>{t(`services.${key}.title`)}</h3>
                <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.65, flex: 1 }}>
                  {key === 'language'
                    ? 'Formations en langue allemande (A1 à C1), cours intensifs avec préparation aux examens officiels.'
                    : t(`services.${key}.desc`)}
                </p>
                <Link
                  to={key === 'language' ? '#cours-langue' : '/services'}
                  onClick={key === 'language' ? (e) => { e.preventDefault(); document.getElementById('cours-langue')?.scrollIntoView({ behavior: 'smooth' }) } : undefined}
                  style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 4, color: RED, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                  {t('common.learn_more')} <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Cours de langue */}
        <div id="cours-langue" style={{ marginTop: isMobile ? 48 : 72 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>Language Center</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: NAVY, marginBottom: 11 }}>
              Nos Cours d'Allemand
            </h2>
            <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }} />
            <p style={{ color: '#64748B', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
              Cours intensifs du niveau A1 au C1 — Yaoundé, Essos. Ouverture officielle <strong>juillet 2026</strong>.
            </p>
            <div style={{ marginTop: 12, display: 'inline-block', background: '#FFF3CD', border: '1px solid #FFCC00', borderRadius: 8, padding: '6px 16px', fontSize: 13, color: '#856404', fontWeight: 600 }}>
              🎉 Frais d'inscription promotionnels : 5 000 FCFA jusqu'à fin septembre 2026
            </div>
          </div>

          {/* Level cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 14 : 20 }}>
            {LANGUAGE_LEVELS.map((lvl, i) => (
              <div key={lvl.level} className={`reveal reveal-delay-${(i % 3) + 1}`}
                style={{ background: '#fff', borderRadius: 16, border: `2px solid ${lvl.color}22`, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden', cursor: 'default', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}>

                {/* Level header */}
                <div style={{ background: lvl.color, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: '#fff' }}>{lvl.level}</span>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginLeft: 8, fontWeight: 500 }}>{lvl.label}</span>
                  </div>
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>{lvl.duree}</span>
                </div>

                {/* Content */}
                <div style={{ padding: '16px 20px 18px' }}>
                  <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{lvl.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                      <span style={{ fontSize: 15 }}>⏱</span>
                      <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Durée :</strong> {lvl.duree}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                      <span style={{ fontSize: 15 }}>🕐</span>
                      <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Horaires :</strong> {lvl.horaires}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                      <span style={{ fontSize: 15 }}>💰</span>
                      <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Prix :</strong> <span style={{ color: RED, fontWeight: 700 }}>{lvl.prix}</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                      <span style={{ fontSize: 15 }}>📍</span>
                      <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Modalité :</strong> {lvl.modalite}</span>
                    </div>
                  </div>
                  <a href="https://wa.me/237620107489?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20au%20cours%20d%27allemand%20niveau%20" + lvl.level
                    target="_blank" rel="noopener noreferrer"
                    style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: lvl.color, color: '#fff', borderRadius: 10, padding: '10px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none', width: '100%' }}>
                    S'inscrire au niveau {lvl.level} →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA inscription */}
          <div className="reveal" style={{ marginTop: 32, textAlign: 'center', background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, borderRadius: 16, padding: isMobile ? '24px 16px' : '32px 40px', border: `1px solid ${GOLD}44` }}>
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 8 }}>Inscriptions ouvertes</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 26, color: '#fff', marginBottom: 10 }}>
              Parcours complet A1 → C1 en <span style={{ color: GOLD }}>8 mois</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 20 }}>
              Paiement échelonné disponible • Matériel de cours offert • Wi-Fi haut débit
            </p>
            <a href="https://wa.me/237620107489?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20aux%20cours%20d%27allemand%20Reiset%C3%BCr%20237"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              📲 Nous contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
