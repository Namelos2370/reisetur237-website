import { Link } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'
import useScrollReveal from '../../hooks/useScrollReveal'
import { ChevronRight } from 'lucide-react'

const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'

const POINTS = [
  { icon: '🎯', texte: 'Accompagnement complet de A à Z' },
  { icon: '🌍', texte: 'Partenaires en Allemagne, Malte et Pologne' },
  { icon: '📜', texte: 'Agence en cours d\'agrément MINEFOP' },
  { icon: '🗣️', texte: 'Formateurs certifiés en langue allemande' },
]

export default function AboutSection() {
  const isMobile = useIsMobile()
  useScrollReveal()

  return (
    <section style={{ padding: isMobile ? '56px 16px' : '80px 32px', background: '#F7F8FC' }} id="a-propos">
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center' }}>

          {/* Image */}
          <div className="reveal reveal-left" style={{ borderRadius: 20, overflow: 'hidden', height: isMobile ? 240 : 360, position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
              alt="Reisetür 237 Language Center Yaoundé"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.65))' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
              <p style={{ color: GOLD, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 4 }}>Yaoundé, Essos</p>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>Avenue Germaine, descente Hôpital de la Caisse</p>
            </div>
            <div style={{ position: 'absolute', top: 16, right: 16, background: GOLD, color: NAVY, borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 700 }}>
              Ouverture juillet 2026
            </div>
          </div>

          {/* Texte */}
          <div className="reveal reveal-right">
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 12 }}>À propos</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: NAVY, marginBottom: 16, lineHeight: 1.3 }}>
              Qui est Reisetür 237 ?
            </h2>
            <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85, marginBottom: 20 }}>
              Reisetür 237 est une agence de mobilité internationale et un centre de langue basé à Yaoundé, Cameroun.
              Nous accompagnons les Camerounais dans leurs projets académiques et professionnels vers l'Europe,
              et les formons à l'allemand de A1 à C1 dans notre Language Center à Essos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {POINTS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ color: '#374151', fontSize: 14, fontWeight: 500 }}>{p.texte}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/about"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: NAVY, color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13.5, fontWeight: 700 }}>
                En savoir plus <ChevronRight size={14} />
              </Link>
              <Link
                to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: NAVY, textDecoration: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13.5, fontWeight: 700, border: `2px solid ${NAVY}` }}>
                Nous contacter <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
