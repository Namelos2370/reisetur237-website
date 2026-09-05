import { Link } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'
import useScrollReveal from '../../hooks/useScrollReveal'
import { ChevronRight } from 'lucide-react'

const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'

const STATS = [
  { value: '500+', label: 'Candidats accompagnes' },
  { value: '15+',  label: 'Partenaires europeens' },
  { value: '8',    label: 'Mois A1 vers C1' },
  { value: '92%',  label: 'Taux de reussite' },
]

const VALEURS = [
  { icon: '🎯', titre: 'Expertise terrain', desc: 'Notre equipe connait chaque etape du parcours : langue, dossier, visa, integration. Nous l\'avons vecu avec des centaines de candidats.' },
  { icon: '🤝', titre: 'Accompagnement total', desc: 'De votre premiere lecon d\'allemand jusqu\'a votre arrivee en Europe, nous sommes a vos cotes a chaque etape cle.' },
  { icon: '📜', titre: 'Agence agreee', desc: 'Reisetür 237 est en cours d\'agrement MINEFOP comme centre de formation professionnelle prive a Yaounde.' },
  { icon: '🌍', titre: 'Reseau europeen', desc: 'Partenariats directs avec des etablissements en Allemagne, Malte et Pologne pour des placements concrets et verifies.' },
]

export default function AboutSection() {
  const isMobile = useIsMobile()
  useScrollReveal()

  return (
    <section style={{ padding: isMobile ? '56px 16px' : '88px 32px', background: '#F7F8FC' }} id="a-propos">
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 56 }}>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>A propos</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 26 : 36, fontWeight: 700, color: NAVY, marginBottom: 11 }}>
            Qui est Reisetür 237 ?
          </h2>
          <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 18px' }} />
          <p style={{ color: '#64748B', fontSize: 15, maxWidth: 680, margin: '0 auto', lineHeight: 1.8 }}>
            Reisetür 237 est une agence de mobilite internationale et un centre de langue base a Yaounde, Cameroun.
            Nous accompagnons les Camerounais dans leurs projets academiques et professionnels vers l'Europe,
            et les formons a l'allemand de A1 a C1 dans notre Language Center a Essos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 52, alignItems: 'center', marginBottom: isMobile ? 48 : 72 }}>

          <div className="reveal reveal-left">
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: isMobile ? 260 : 380 }}>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="Reisetur 237 Language Center Yaounde"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                <p style={{ color: GOLD, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 4 }}>Yaounde, Essos</p>
                <p style={{ color: '#fff', fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>Avenue Germaine, descente Hopital de la Caisse</p>
              </div>
              <div style={{ position: 'absolute', top: 16, right: 16, background: GOLD, color: NAVY, borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700 }}>
                Ouverture Juillet 2026
              </div>
            </div>
          </div>

          <div className="reveal reveal-right">
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 14 }}>Notre histoire</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: NAVY, marginBottom: 16, lineHeight: 1.3 }}>
              Nes de la conviction que chaque Camerounais merite une chance en Europe
            </h3>
            <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85, marginBottom: 14 }}>
              Reisetür 237 est nee d'un constat simple : des milliers de Camerounais ont le potentiel, la motivation et les diplomes pour reussir en Europe — mais manquent d'un accompagnement structure, honnete et efficace.
            </p>
            <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85, marginBottom: 14 }}>
              Depuis Yaounde, nous avons construit un parcours complet : formation linguistique certifiee, constitution de dossiers professionnels, mise en relation avec des employeurs et etablissements partenaires en Allemagne et a Malte, et suivi jusqu'a l'obtention du visa.
            </p>
            <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85, marginBottom: 24 }}>
              Aujourd'hui, Reisetür 237 Language Center ouvre ses portes a Essos pour offrir les meilleurs cours d'allemand de Yaounde — du niveau A1 au C1 — avec des formateurs certifies et du materiel pedagogique offert.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: NAVY, color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13.5, fontWeight: 700 }}>
                Nos services <ChevronRight size={14} />
              </Link>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: NAVY, textDecoration: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13.5, fontWeight: 700, border: `2px solid ${NAVY}` }}>
                Nous contacter <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 12 : 20, marginBottom: isMobile ? 48 : 64 }}>
          {STATS.map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}
              style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '20px 14px' : '28px 20px', textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', border: '1.5px solid #F1F5FB' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 32 : 42, fontWeight: 800, color: GOLD, marginBottom: 6 }}>{s.value}</div>
              <div style={{ color: '#64748B', fontSize: isMobile ? 11 : 13, fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: isMobile ? 14 : 20, marginBottom: isMobile ? 40 : 56 }}>
          {VALEURS.map((v, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 2) + 1}`}
              style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '20px 16px' : '26px 28px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: '1.5px solid #F1F5FB', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{v.icon}</div>
              <div>
                <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 7 }}>{v.titre}</h4>
                <p style={{ color: '#64748B', fontSize: 13.5, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, borderRadius: 18, padding: isMobile ? '28px 20px' : '44px 52px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 24, justifyContent: 'space-between', border: `1px solid ${GOLD}33` }}>
          <div>
            <p style={{ color: GOLD, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 8 }}>Rejoignez-nous</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 26, color: '#fff', marginBottom: 8 }}>
              Votre projet europeen commence ici
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 480 }}>
              Cours d'allemand, dossiers de candidature, accompagnement visa — tout sous un meme toit a Yaounde.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: RED, color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '12px 22px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
              Deposer ma candidature <ChevronRight size={14} />
            </Link>
            <a href="https://wa.me/237620107489?text=Bonjour%20Reisetur%20237%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '12px 22px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
