import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { useIsMobile } from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'
import { ChevronRight } from 'lucide-react'

const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'

const STATS = [
  { value: '500+', label: 'Candidats accompagnés' },
  { value: '15+',  label: 'Partenaires européens' },
  { value: '8',    label: 'Mois A1 → C1' },
  { value: '92%',  label: 'Taux de réussite' },
]

const VALEURS = [
  { icon: '🎯', titre: 'Expertise terrain', desc: "Notre équipe connaît chaque étape du parcours : langue, dossier, visa, intégration. Nous l'avons vécu avec des centaines de candidats." },
  { icon: '🤝', titre: 'Accompagnement total', desc: "De votre première leçon d'allemand jusqu'à votre arrivée en Europe, nous sommes à vos côtés à chaque étape clé." },
  { icon: '📜', titre: 'Agence agréée', desc: "Reisetür 237 est en cours d'agrément MINEFOP comme centre de formation professionnelle privé à Yaoundé." },
  { icon: '🌍', titre: 'Réseau européen', desc: "Partenariats directs avec des établissements en Allemagne, Malte et Pologne pour des placements concrets et vérifiés." },
  { icon: '🗣️', titre: 'Formateurs certifiés', desc: "Tous nos enseignants sont certifiés et formés aux exigences des examens officiels : telc, Goethe-Zertifikat, ÖSD et ECL." },
  { icon: '💰', titre: 'Tarifs transparents', desc: "Pas de frais cachés. Nos tarifs sont affichés clairement et le paiement échelonné est disponible pour tous les niveaux." },
]

const EQUIPE = [
  { nom: 'Gabriel (Namelos)', role: 'Fondateur & Directeur', desc: "Entrepreneur et développeur web basé à Yaoundé, Gabriel a fondé Reisetür 237 avec la conviction que chaque Camerounais mérite un accès structuré et honnête à la mobilité internationale." },
  { nom: 'Équipe pédagogique', role: 'Formateurs certifiés', desc: "Une équipe de formateurs certifiés, spécialisés dans l'enseignement de l'allemand et la préparation aux examens officiels Goethe, telc, ÖSD et ECL." },
  { nom: 'Équipe dossiers', role: 'Conseillers mobilité', desc: "Des conseillers spécialisés dans la constitution de dossiers de candidature, les procédures consulaires et le suivi des candidats jusqu'à l'obtention du visa." },
]

export default function AboutPage() {
  const isMobile = useIsMobile()
  useScrollReveal()

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop: 62, fontFamily: "'DM Sans',sans-serif" }}>

        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, padding: isMobile ? '48px 16px 40px' : '64px 32px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize: '50px 50px' }} />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 12 }}>À propos</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 28 : 46, fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            Qui est Reisetür 237 ?
          </h1>
          <div style={{ width: 48, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 18px' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 15 : 17, maxWidth: 640, margin: '0 auto' }}>
            Agence de mobilité internationale et centre de langue basé à Yaoundé, Cameroun.
          </p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '36px 16px' : '60px 28px' }}>

          {/* Histoire */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'center', marginBottom: isMobile ? 48 : 72 }}>
            <div className="reveal reveal-left" style={{ borderRadius: 20, overflow: 'hidden', height: isMobile ? 250 : 380, position: 'relative' }}>
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

            <div className="reveal reveal-right">
              <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 12 }}>Notre histoire</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: NAVY, marginBottom: 16, lineHeight: 1.3 }}>
                Nés de la conviction que chaque Camerounais mérite une chance en Europe
              </h2>
              <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85, marginBottom: 14 }}>
                Reisetür 237 est née d'un constat simple : des milliers de Camerounais ont le potentiel, la motivation et les diplômes pour réussir en Europe — mais manquent d'un accompagnement structuré, honnête et efficace.
              </p>
              <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85, marginBottom: 14 }}>
                Depuis Yaoundé, nous avons construit un parcours complet : formation linguistique certifiée, constitution de dossiers professionnels, mise en relation avec des employeurs et établissements partenaires en Allemagne et à Malte, et suivi jusqu'à l'obtention du visa.
              </p>
              <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.85 }}>
                Aujourd'hui, Reisetür 237 Language Center ouvre ses portes à Essos pour offrir les meilleurs cours d'allemand de Yaoundé — du niveau A1 au C1 — avec des formateurs certifiés et du matériel pédagogique offert.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 12 : 20, marginBottom: isMobile ? 48 : 64 }}>
            {STATS.map((s, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}
                style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '20px 14px' : '28px 20px', textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', border: '1.5px solid #F1F5FB' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 32 : 42, fontWeight: 800, color: GOLD, marginBottom: 6 }}>{s.value}</div>
                <div style={{ color: '#64748B', fontSize: isMobile ? 11 : 13, fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Valeurs */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>Nos valeurs</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: NAVY, marginBottom: 11 }}>
              Ce qui nous distingue
            </h2>
            <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 14 : 20, marginBottom: isMobile ? 48 : 64 }}>
            {VALEURS.map((v, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 3) + 1}`}
                style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '20px 16px' : '26px 24px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: '1.5px solid #F1F5FB' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
                <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{v.titre}</h4>
                <p style={{ color: '#64748B', fontSize: 13.5, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Équipe */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>Notre équipe</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: NAVY, marginBottom: 11 }}>
              Les personnes derrière Reisetür 237
            </h2>
            <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 14 : 20, marginBottom: isMobile ? 48 : 64 }}>
            {EQUIPE.map((m, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}
                style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '24px 18px' : '32px 24px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: '1.5px solid #F1F5FB', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                  {i === 0 ? '👨‍💼' : i === 1 ? '👨‍🏫' : '🤝'}
                </div>
                <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{m.nom}</h4>
                <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>{m.role}</p>
                <p style={{ color: '#64748B', fontSize: 13.5, lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Localisation */}
          <div className="reveal" style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '24px 18px' : '36px 40px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: '1.5px solid #F1F5FB', marginBottom: isMobile ? 40 : 56 }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28, alignItems: 'center' }}>
              <div>
                <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 12 }}>Où nous trouver</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 24, fontWeight: 700, color: NAVY, marginBottom: 16 }}>
                  Reisetür 237 Language Center
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { icon: '📍', texte: 'Essos, Avenue Germaine, descente Hôpital de la Caisse/CNPS, Yaoundé' },
                    { icon: '📞', texte: '+237 620 107 489' },
                    { icon: '📞', texte: '+237 699 164 497' },
                    { icon: '✉️', texte: 'reisetur237@gmail.com' },
                    { icon: '⏰', texte: 'Lun–Ven : 8h–17h30 | Sam : 8h–16h (évaluations)' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                      <span style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>{item.texte}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#F7F8FC', borderRadius: 12, padding: '20px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <p style={{ color: '#64748B', fontSize: 13, marginBottom: 16 }}>
                  Situé en face de l'Hôpital de la Caisse, dans la ruelle droite.
                </p>
                <a
                  href="https://wa.me/237620107489?text=Bonjour%2C%20je%20voudrais%20des%20informations%20sur%20Reiset%C3%BCr%20237"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13.5, fontWeight: 700 }}>
                  Nous écrire sur WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="reveal" style={{ background: `linear-gradient(135deg,${NAVY},${RED})`, borderRadius: 16, padding: isMobile ? '28px 20px' : '44px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 10 }}>
              Prêt à concrétiser votre projet à l'étranger ?
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 28, color: '#fff', marginBottom: 20 }}>
              Commencez votre parcours aujourd'hui
            </h3>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, textDecoration: 'none', borderRadius: 11, padding: '13px 28px', fontSize: 14.5, fontWeight: 700 }}>
                Déposer ma candidature <ChevronRight size={15} />
              </Link>
              <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', color: '#fff', textDecoration: 'none', borderRadius: 11, padding: '13px 28px', fontSize: 14.5, fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }}>
                Voir nos services <ChevronRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
