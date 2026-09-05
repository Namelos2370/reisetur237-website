import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { ChevronRight } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'

const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'

const SERVICES = [
  { num:'01', image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80', title:"Orientation et Conseil Académique", items:[
    { title:'Bilan de profil', desc:"Analyse de votre parcours académique pour évaluer vos chances d'éligibilité à l'étranger." },
    { title:'Choix des filières', desc:"Aide à la sélection des établissements et programmes les plus adaptés à vos objectifs." },
  ]},
  { num:'02', image:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80', title:"Apprentissage des Langues", items:[
    { title:'Cours de langues', desc:"Formations en langue allemande de A1 à C1, cours intensifs avec préparation aux examens officiels." },
    { title:'Préparation aux examens', desc:"Sessions d'entraînement pour réussir les tests requis pour les visas ou admissions." },
  ]},
  { num:'03', image:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=700&q=80', title:"Assistance aux Procédures d'Admission", items:[
    { title:'Gestion des candidatures', desc:"Constitution et envoi des dossiers d'inscription auprès des universités partenaires." },
    { title:'Aide à la rédaction', desc:"Rédaction de lettres de motivation et CV aux normes internationales." },
  ]},
  { num:'04', image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=80', title:"Accompagnement Visa et Procédures Consulaires", items:[
    { title:'Constitution du dossier visa', desc:"Vérification des pièces requises : justificatifs, formulaires consulaires, traductions et apostilles." },
    { title:"Simulation d'entretiens", desc:"Préparation aux entretiens consulaires pour maximiser vos chances d'obtention du visa." },
  ]},
  { num:'05', image:'https://images.unsplash.com/photo-1560439514-4e9645039924?w=700&q=80', title:"Intégration et Suivi post-arrivée", items:[
    { title:'Logement et accueil', desc:"Conseils pour trouver un logement étudiant ou professionnel avant le départ." },
    { title:'Démarches administratives', desc:"Orientation pour les premières étapes à l'arrivée : inscription universitaire, assurance santé, compte bancaire." },
  ]},
]

const LANGUAGE_LEVELS = [
  { level:'A1', label:'Débutant', color:'#4CAF50', duree:'2 mois', prix:'115 000 FCFA', modalite:'Présentiel', horaires:'Lun–Ven 8h–12h ou 15h–17h30', desc:'Bases de la communication : alphabet, salutations, chiffres et formules courantes.' },
  { level:'A2', label:'Élémentaire', color:'#8BC34A', duree:'1,5 mois', prix:'115 000 FCFA', modalite:'Présentiel', horaires:'Lun–Ven 8h–12h ou 15h–17h30', desc:'Conversations simples, vie quotidienne, achats et directions.' },
  { level:'B1', label:'Intermédiaire', color:GOLD, duree:'1,5 mois', prix:'120 000 FCFA', modalite:'Présentiel', horaires:'Lun–Ven 8h–12h (matin) ou 11h30–15h (après-midi)', desc:'Communication autonome, grammaire intermédiaire, textes courants.' },
  { level:'B2', label:'Avancé', color:'#FF9800', duree:'1,5 mois', prix:'125 000 FCFA', modalite:'Présentiel', horaires:'Lun–Ven 11h30–15h', desc:'Niveau requis pour visa Allemagne et Ausbildung Pflege. Argumentation avancée.' },
  { level:'C1', label:'Courant', color:RED, duree:'1,5 mois', prix:'130 000 FCFA', modalite:'Présentiel', horaires:'Sur demande', desc:'Maîtrise professionnelle, rédaction complexe, discours techniques et académiques.' },
]

function getWaLink(level) {
  return 'https://wa.me/237620107489?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20au%20cours%20d%27allemand%20niveau%20' + level
}

export default function ServicesPage() {
  const isMobile = useIsMobile()
  useScrollReveal()

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop: 62, fontFamily: "'DM Sans',sans-serif" }}>

        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, padding: isMobile ? '48px 16px 40px' : '64px 32px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize: '50px 50px' }} />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 12 }}>Services</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 28 : 46, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Nos Domaines d'Expertise</h1>
          <div style={{ width: 48, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 18px' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 15 : 17 }}>Un accompagnement complet, de l'orientation au départ</p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '36px 16px' : '60px 28px' }}>

          {/* Liste des services */}
          {SERVICES.map((svc) => (
            <div key={svc.num} className="reveal" style={{ marginBottom: isMobile ? 32 : 52 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 36, alignItems: 'center' }}>
                <div style={{ borderRadius: 16, overflow: 'hidden', height: isMobile ? 200 : 260, position: 'relative' }}>
                  <img src={svc.image} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: GOLD, color: NAVY, borderRadius: 7, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{svc.num}</div>
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 22, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{svc.title}</h2>
                  <div style={{ width: 40, height: 3, background: GOLD, borderRadius: 2, marginBottom: 14 }} />
                  {svc.items.map((item, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '12px 14px' : '16px 18px', marginBottom: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F1F5FB' }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 14 : 15, fontWeight: 700, color: NAVY, marginBottom: 5 }}>{item.title}</h3>
                      <p style={{ color: '#64748B', fontSize: isMobile ? 12.5 : 13.5, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  ))}
                  {svc.num === '02' && (
                    <button
                      onClick={() => document.getElementById('cours-langue')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, background: GOLD, color: NAVY, border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                      Voir les niveaux et tarifs <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Section Cours de langue */}
          <div id="cours-langue" style={{ marginTop: isMobile ? 48 : 72, scrollMarginTop: 80 }}>

            <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
              <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>Language Center</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 34, fontWeight: 700, color: NAVY, marginBottom: 11 }}>
                Nos Cours d'Allemand
              </h2>
              <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }} />
              <p style={{ color: '#64748B', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
                Cours intensifs du niveau A1 au C1 — Yaoundé, Essos, Avenue Germaine.<br />
                Ouverture officielle <strong>juillet 2026</strong>.
              </p>
              <div style={{ marginTop: 14, display: 'inline-block', background: '#FFF3CD', border: '1px solid #FFCC00', borderRadius: 8, padding: '7px 18px', fontSize: 13, color: '#856404', fontWeight: 600 }}>
                🎉 Frais d'inscription promotionnels : 5 000 FCFA — valable jusqu'à fin septembre 2026
              </div>
            </div>

            {/* Cartes niveaux */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 14 : 20 }}>
              {LANGUAGE_LEVELS.map((lvl, i) => (
                <div key={lvl.level}
                  className={`reveal reveal-delay-${(i % 3) + 1}`}
                  style={{ background: '#fff', borderRadius: 16, border: `2px solid ${lvl.color}33`, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.13)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}>

                  <div style={{ background: lvl.color, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 800, color: '#fff' }}>{lvl.level}</span>
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginLeft: 8, fontWeight: 500 }}>{lvl.label}</span>
                    </div>
                    <span style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>{lvl.duree}</span>
                  </div>

                  <div style={{ padding: '16px 20px 20px' }}>
                    <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{lvl.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                        <span>⏱</span>
                        <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Durée :</strong> {lvl.duree}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                        <span>🕐</span>
                        <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Horaires :</strong> {lvl.horaires}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                        <span>💰</span>
                        <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Prix :</strong> <span style={{ color: RED, fontWeight: 700 }}>{lvl.prix}</span></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                        <span>📍</span>
                        <span style={{ color: '#64748B' }}><strong style={{ color: NAVY }}>Modalité :</strong> {lvl.modalite}</span>
                      </div>
                    </div>
                    <a
                      href={getWaLink(lvl.level)}
                      target="_blank" rel="noopener noreferrer"
                      style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: lvl.color, color: '#fff', borderRadius: 10, padding: '10px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none', width: '100%' }}>
                      S'inscrire — Niveau {lvl.level} →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Avantages */}
            <div className="reveal" style={{ marginTop: 28, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 12 }}>
              {[
                { icon: '👨‍🏫', label: "Cadre d'apprentissage optimal" },
                { icon: '🖥️', label: 'Salles modernes et équipées' },
                { icon: '📚', label: 'Matériel de cours offert' },
                { icon: '📶', label: 'Wi-Fi haut débit' },
                { icon: '🎯', label: 'Préparation intensive aux examens' },
                { icon: '✈️', label: 'Accompagnement vers le rêve allemand' },
              ].map((a, i) => (
                <div key={i} style={{ background: '#F7F8FC', borderRadius: 12, padding: '14px 10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, lineHeight: 1.4 }}>{a.label}</div>
                </div>
              ))}
            </div>

            {/* CTA cours */}
            <div className="reveal" style={{ marginTop: 28, background: `linear-gradient(135deg,${NAVY},#1B3E6F)`, borderRadius: 16, padding: isMobile ? '24px 16px' : '36px 40px', textAlign: 'center', border: `1px solid ${GOLD}44` }}>
              <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 8 }}>Inscriptions ouvertes</p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 26, color: '#fff', marginBottom: 10 }}>
                Parcours complet A1 → C1 en <span style={{ color: GOLD }}>8 mois</span>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 20 }}>
                Paiement échelonné disponible — Samedi réservé aux évaluations — Yaoundé, Essos
              </p>
              <a href="https://wa.me/237620107489?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20aux%20cours%20d%27allemand%20Reiset%C3%BCr%20237"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                📲 Nous contacter sur WhatsApp
              </a>
            </div>
          </div>

          {/* CTA candidature */}
          <div className="reveal" style={{ marginTop: 40, background: `linear-gradient(135deg,${NAVY},${RED})`, borderRadius: 16, padding: isMobile ? '28px 16px' : '40px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 18 }}>Prêt à concrétiser votre projet à l'étranger ?</p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, textDecoration: 'none', borderRadius: 11, padding: '13px 28px', fontSize: 14.5, fontWeight: 700 }}>
              Déposer ma candidature <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
