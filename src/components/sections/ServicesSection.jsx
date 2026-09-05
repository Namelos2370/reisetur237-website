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

export default function ServicesSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  useScrollReveal()

  return (
    <section style={{ padding: isMobile ? '48px 16px' : '80px 32px', background: '#fff' }} id="services">
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* En-tête */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>Services</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 26 : 34, fontWeight: 700, color: NAVY, marginBottom: 11 }}>{t('services.title')}</h2>
          <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }} />
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>{t('services.subtitle')}</p>
        </div>

        {/* Cartes services */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap: isMobile ? 16 : 22 }}>
          {SERVICES.map(({ key, img }, i) => (
            <div key={key} className={`reveal reveal-delay-${i + 1}`}
              style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 18px rgba(0,0,0,0.08)', border: '1.5px solid #F1F5FB', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: isMobile ? 160 : 180, overflow: 'hidden', position: 'relative' }}>
                <img src={img} alt={t(`services.${key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.4))' }} />
              </div>
              <div style={{ padding: '18px 18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15.5, fontWeight: 700, color: NAVY, marginBottom: 7, lineHeight: 1.3 }}>
                  {t(`services.${key}.title`)}
                </h3>
                <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.65, flex: 1 }}>
                  {key === 'language'
                    ? 'Formations en langue allemande (A1 à C1), cours intensifs avec préparation aux examens officiels.'
                    : t(`services.${key}.desc`)}
                </p>
                <Link
                  to="/services"
                  style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 4, color: RED, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                  {t('common.learn_more')} <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Teaser cours d'allemand */}
        <div className="reveal" style={{ marginTop: isMobile ? 40 : 60, background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, borderRadius: 16, padding: isMobile ? '28px 20px' : '40px 52px', border: `1px solid ${GOLD}44` }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: GOLD, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.16em', marginBottom: 8 }}>
                Reisetür 237 Language Center
              </p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 26, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>
                Parcours complet A1 → C1 en <span style={{ color: GOLD }}>8 mois</span>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.7, maxWidth: 520 }}>
                Cours intensifs à Yaoundé — Essos, Avenue Germaine. Paiement échelonné disponible.
                Matériel de cours offert. Ouverture officielle juillet 2026.
              </p>
              <div style={{ marginTop: 12, display: 'inline-block', background: 'rgba(255,204,0,0.15)', border: '1px solid rgba(255,204,0,0.4)', borderRadius: 8, padding: '5px 14px', fontSize: 12.5, color: '#FFD700', fontWeight: 600 }}>
                🎉 Inscription promotionnelle : 5 000 FCFA — jusqu'à fin septembre 2026
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
              <Link
                to="/services"
                onClick={(e) => { e.preventDefault(); window.location.href = '/services#cours-langue' }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: GOLD, color: NAVY, textDecoration: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
                Voir les niveaux et tarifs <ChevronRight size={14} />
              </Link>
              <a
                href="https://wa.me/237620107489?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20aux%20cours%20d%27allemand%20Reiset%C3%BCr%20237"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
                S'inscrire sur WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
