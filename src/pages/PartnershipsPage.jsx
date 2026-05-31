import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { ChevronRight, ExternalLink } from 'lucide-react'

const NAVY = '#1A1A1A'
const RED  = '#C0392B'
const GOLD = '#C8A84B'

const PARTNERS = [
  {
    flag: '🇩🇪', country: 'Allemagne',
    name: 'Care Concept AG',
    type: 'Assurance internationale',
    desc: {
      fr: "Leader européen en assurance santé internationale, Care Concept AG accompagne nos candidats avec des solutions d'assurance adaptées aux étudiants et stagiaires étrangers en Allemagne. Une couverture complète, indispensable pour l'obtention du visa.",
      de: "Europäischer Marktführer in der internationalen Krankenversicherung begleitet unsere Kandidaten mit maßgeschneiderten Versicherungslösungen für ausländische Studierende in Deutschland.",
      en: "European leader in international health insurance, Care Concept AG supports our candidates with tailored insurance solutions for foreign students and trainees in Germany.",
    },
    color: '#DBEAFE', tag: 'Assurance Santé',
  },
  {
    flag: '🇩🇪', country: 'Allemagne',
    name: 'F+U Academy of Languages',
    type: 'École de langues — Heidelberg',
    desc: {
      fr: "Basée à Heidelberg, la F+U Academy of Languages est une institution de référence pour l'apprentissage de l'allemand en immersion. Elle accueille nos apprenants pour des programmes intensifs reconnus, préparant aux certifications officielles et à l'intégration professionnelle.",
      de: "Die F+U Academy of Languages in Heidelberg ist eine renommierte Institution für Deutsch-Intensivkurse, die unsere Lernenden auf offizielle Zertifizierungen vorbereitet.",
      en: "Based in Heidelberg, F+U Academy of Languages is a reference institution for German language immersion programs, welcoming our learners for recognized intensive courses.",
    },
    color: '#D1FAE5', tag: 'Formation Linguistique',
  },
  {
    flag: '🇵🇱', country: 'Pologne',
    name: 'Kozminski University',
    type: 'Université — Varsovie',
    desc: {
      fr: "L'Université Kozminski à Varsovie est l'une des rares universités d'Europe centrale à détenir la triple accréditation internationale (AACSB, EQUIS, AMBA). Elle offre des programmes en anglais de haute qualité, accessibles à nos candidats souhaitant poursuivre des études supérieures en Pologne.",
      de: "Die Kozminski Universität in Warschau ist eine der wenigen mitteleuropäischen Universitäten mit dreifacher internationaler Akkreditierung (AACSB, EQUIS, AMBA).",
      en: "Kozminski University in Warsaw is one of the few Central European universities to hold triple international accreditation (AACSB, EQUIS, AMBA), offering high-quality English programs.",
    },
    color: '#FEE2E2', tag: 'Enseignement Supérieur',
  },
  {
    flag: '🇲🇹', country: 'Malte',
    name: 'Domain Academy',
    type: 'Enseignement supérieur — Mosta',
    desc: {
      fr: "Située à Mosta, Domain Academy est un établissement d'enseignement supérieur maltais proposant des programmes en anglais dans des domaines variés : gestion, technologie, tourisme et hôtellerie. Elle constitue une porte d'entrée idéale vers l'Europe pour nos candidats anglophones.",
      de: "Die Domain Academy in Mosta ist eine maltesische Hochschule mit englischsprachigen Programmen in Management, Technologie, Tourismus und Hotellerie.",
      en: "Located in Mosta, Domain Academy is a Maltese higher education institution offering English-language programs in management, technology, tourism and hospitality.",
    },
    color: '#FEF3C7', tag: 'Programmes Anglophones',
  },
]

export default function PartnershipsPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) || 'fr'

  const getDesc = (p) => p.desc[lang] || p.desc.fr

  const labels = {
    fr: {
      badge: 'Partenariats', title: 'Nos Partenariats Institutionnels', sub: 'Des collaborations européennes de confiance',
      intro: "Reisetür 237 collabore avec des institutions partenaires reconnues et accréditées en Allemagne, Pologne et Malte. Ces partenariats garantissent à chaque candidat un accueil de qualité, une formation certifiée et un accompagnement adapté à son projet de mobilité internationale.",
      cta: 'Vous êtes une institution ? Contactez-nous', become: 'Devenir partenaire',
    },
    de: {
      badge: 'Partnerschaften', title: 'Unsere institutionellen Partnerschaften', sub: 'Vertrauenswürdige europäische Zusammenarbeit',
      intro: "Reisetür 237 arbeitet mit anerkannten und akkreditierten Partnerinstitutionen in Deutschland, Polen und Malta zusammen.",
      cta: 'Sie sind eine Institution? Kontaktieren Sie uns', become: 'Partner werden',
    },
    en: {
      badge: 'Partnerships', title: 'Our Institutional Partnerships', sub: 'Trusted European collaborations',
      intro: "Reisetür 237 collaborates with recognized and accredited partner institutions in Germany, Poland and Malta, ensuring quality reception, certified training and tailored support for each candidate.",
      cta: 'Are you an institution? Contact us', become: 'Become a partner',
    },
  }
  const L = labels[lang] || labels.fr

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop: 62, fontFamily: "'DM Sans',sans-serif" }}>

        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${NAVY}, #2a0707)`, padding: '64px 32px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize: '50px 50px' }}/>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 12 }}>{L.badge}</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,46px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{L.title}</h1>
          <div style={{ width: 48, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 18px' }}/>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17 }}>{L.sub}</p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 28px' }}>

          {/* Intro */}
          <p style={{ color: '#64748B', fontSize: 16.5, lineHeight: 1.8, textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>{L.intro}</p>

          {/* Partenaires */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 56 }}>
            {PARTNERS.map((p, i) => (
              <div key={p.name} style={{ background: '#fff', borderRadius: 20, padding: '32px 36px', boxShadow: '0 2px 18px rgba(0,0,0,0.07)', border: '1.5px solid #F1F5FB', display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 36, alignItems: 'start' }}>

                {/* Left */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>{p.flag}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{p.name}</div>
                  <span style={{ background: p.color, color: '#1A1A1A', fontSize: 11.5, fontWeight: 700, padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 8 }}>{p.tag}</span>
                  <div style={{ color: '#94A3B8', fontSize: 12.5 }}>{p.type}</div>
                </div>

                {/* Right */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ background: '#F1F5FB', color: '#64748B', fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>{p.country}</span>
                  </div>
                  <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.8 }}>{getDesc(p)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Devenir partenaire */}
          <div style={{ background: `linear-gradient(135deg, #1B3E6F, ${NAVY})`, borderRadius: 20, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, border: `1px solid rgba(200,168,75,0.3)` }}>
            <div>
              <p style={{ color: GOLD, fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 8 }}>{L.badge}</p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#fff', marginBottom: 8 }}>{L.cta}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>reisetur237@gmail.com • +237 620 107 489</p>
            </div>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: RED, color: '#fff', textDecoration: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 14.5, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 18px rgba(192,57,43,0.4)' }}>
              {L.become} <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
