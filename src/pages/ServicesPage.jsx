import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { ChevronRight } from 'lucide-react'

const NAVY = '#1A1A1A'
const RED  = '#C0392B'
const GOLD = '#C8A84B'

const SERVICES = [
  {
    num: '01', icon: '🎯',
    titleFr: "Orientation et Conseil Académique",
    titleDe: "Akademische Orientierung und Beratung",
    titleEn: "Academic Orientation and Counseling",
    color: '#DBEAFE',
    itemsFr: [
      { title: 'Bilan de profil', desc: "Analyse approfondie de votre parcours académique et professionnel pour évaluer vos chances d'éligibilité à l'étranger et identifier les opportunités les mieux adaptées." },
      { title: 'Choix des filières et universités', desc: "Aide à la sélection des établissements et des programmes d'études les plus adaptés à vos objectifs, votre budget et votre niveau académique." },
    ],
    itemsDe: [
      { title: 'Profilanalyse', desc: "Eingehende Analyse Ihres akademischen und beruflichen Werdegangs zur Bewertung Ihrer Chancen im Ausland." },
      { title: 'Auswahl von Studiengängen', desc: "Hilfe bei der Auswahl der am besten geeigneten Einrichtungen und Studienprogramme." },
    ],
    itemsEn: [
      { title: 'Profile Assessment', desc: "In-depth analysis of your academic and professional background to evaluate your eligibility abroad." },
      { title: 'Course and University Selection', desc: "Help selecting the most suitable institutions and programs for your goals and budget." },
    ],
  },
  {
    num: '02', icon: '🗣️',
    titleFr: "Apprentissage des Langues",
    titleDe: "Sprachausbildung",
    titleEn: "Language Learning",
    color: '#D1FAE5',
    itemsFr: [
      { title: 'Cours de langues', desc: "Formations intensives ou extensives en langue allemande (A1 à C1), pour la préparation aux certifications officielles de type Goethe-Zertifikat et ÖSD." },
      { title: 'Préparation aux examens', desc: "Sessions d'entraînement spécifiques pour réussir les tests de langue requis pour les visas ou les admissions universitaires." },
    ],
    itemsDe: [
      { title: 'Sprachkurse', desc: "Intensive oder extensive Deutschkurse (A1 bis C1) zur Vorbereitung auf offizielle Zertifizierungen wie Goethe-Zertifikat und ÖSD." },
      { title: 'Prüfungsvorbereitung', desc: "Spezifische Trainingseinheiten für die für Visa oder Zulassungen erforderlichen Sprachtests." },
    ],
    itemsEn: [
      { title: 'Language Courses', desc: "Intensive or extensive German language training (A1 to C1) for official certifications such as Goethe-Zertifikat and ÖSD." },
      { title: 'Exam Preparation', desc: "Specific training sessions to pass the language tests required for visas or university admissions." },
    ],
  },
  {
    num: '03', icon: '📋',
    titleFr: "Assistance aux Procédures d'Admission",
    titleDe: "Unterstützung bei Zulassungsverfahren",
    titleEn: "Admission Procedures Assistance",
    color: '#FEF3C7',
    itemsFr: [
      { title: 'Gestion des candidatures', desc: "Accompagnement complet dans la constitution et l'envoi des dossiers d'inscription auprès des universités partenaires en Allemagne, Malte et Pologne." },
      { title: 'Aide à la rédaction', desc: "Conseils et rédaction de lettres de motivation, CV aux normes internationales (format européen, Lebenslauf allemand) et projets d'études." },
    ],
    itemsDe: [
      { title: 'Bewerbungsmanagement', desc: "Vollständige Begleitung bei der Zusammenstellung und dem Versand von Bewerbungsunterlagen." },
      { title: 'Schreibhilfe', desc: "Beratung und Verfassung von Motivationsschreiben, Lebensläufen nach internationalen Normen." },
    ],
    itemsEn: [
      { title: 'Application Management', desc: "Full support in building and submitting application files to partner universities in Germany, Malta and Poland." },
      { title: 'Writing Assistance', desc: "Advice and drafting of motivation letters, CVs to international standards, and study plans." },
    ],
  },
  {
    num: '04', icon: '🛂',
    titleFr: "Accompagnement Visa et Procédures Consulaires",
    titleDe: "Visum- und Konsularverfahren",
    titleEn: "Visa and Consular Procedures",
    color: '#FEE2E2',
    itemsFr: [
      { title: 'Constitution du dossier de visa', desc: "Vérification minutieuse des pièces requises : justificatifs financiers, garanties, formulaires consulaires, traductions officielles et apostilles." },
      { title: "Simulation d'entretiens", desc: "Préparation intensive aux entretiens consulaires pour maximiser vos chances d'obtention du visa étudiant ou de travail." },
    ],
    itemsDe: [
      { title: 'Zusammenstellung der Visaunterlagen', desc: "Sorgfältige Prüfung der erforderlichen Unterlagen: Finanz-, Bürgschafts- und Konsulatsformulare." },
      { title: 'Interviewsimulation', desc: "Intensive Vorbereitung auf Konsularinterviews zur Maximierung Ihrer Chancen." },
    ],
    itemsEn: [
      { title: 'Visa File Preparation', desc: "Thorough verification of required documents: financial proof, guarantees, consular forms, official translations and apostilles." },
      { title: 'Interview Simulation', desc: "Intensive preparation for consular interviews to maximize your chances of obtaining a student or work visa." },
    ],
  },
  {
    num: '05', icon: '🏠',
    titleFr: "Intégration et Suivi post-arrivée",
    titleDe: "Integration und Betreuung nach der Ankunft",
    titleEn: "Integration and Post-Arrival Support",
    color: '#F3E8FF',
    itemsFr: [
      { title: 'Logement et accueil', desc: "Conseils pratiques et mise en relation pour trouver un logement étudiant ou professionnel avant le départ, selon la ville de destination." },
      { title: 'Démarches administratives sur place', desc: "Orientation pour les premières étapes cruciales à l'arrivée : inscription universitaire, assurance santé internationale, ouverture de compte bancaire et enregistrement en mairie." },
    ],
    itemsDe: [
      { title: 'Unterkunft und Empfang', desc: "Praktische Ratschläge und Vernetzung zur Suche nach einer Studenten- oder Berufswohnung vor der Abreise." },
      { title: 'Verwaltungsverfahren vor Ort', desc: "Orientierung für die ersten wichtigen Schritte bei der Ankunft: Universitätsanmeldung, Krankenversicherung, Kontoeröffnung." },
    ],
    itemsEn: [
      { title: 'Housing and Welcome', desc: "Practical advice and networking to find student or professional housing before departure." },
      { title: 'Administrative Procedures on Site', desc: "Guidance for the first crucial steps upon arrival: university registration, health insurance, bank account opening." },
    ],
  },
]

export default function ServicesPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) || 'fr'

  const getTitle = (s) => lang === 'de' ? s.titleDe : lang === 'en' ? s.titleEn : s.titleFr
  const getItems = (s) => lang === 'de' ? s.itemsDe : lang === 'en' ? s.itemsEn : s.itemsFr

  const labels = {
    fr: { badge: 'Services', title: "Nos Domaines d'Expertise", sub: "Un accompagnement complet, de l'orientation au départ", cta: 'Déposer ma candidature' },
    de: { badge: 'Leistungen', title: 'Unsere Fachgebiete', sub: 'Umfassende Begleitung von der Orientierung bis zur Abreise', cta: 'Bewerbung einreichen' },
    en: { badge: 'Services', title: 'Our Areas of Expertise', sub: 'Comprehensive support from orientation to departure', cta: 'Submit my application' },
  }
  const L = labels[lang] || labels.fr

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop: 62, fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ background: `linear-gradient(135deg, ${NAVY}, #1B3E6F)`, padding: '64px 32px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize: '50px 50px' }}/>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 12 }}>{L.badge}</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,46px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{L.title}</h1>
          <div style={{ width: 48, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 18px' }}/>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17 }}>{L.sub}</p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 28px' }}>
          {SERVICES.map((svc) => (
            <div key={svc.num} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40, marginBottom: 56, alignItems: 'start' }}>
              <div>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 16 }}>{svc.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>{svc.num}</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>{getTitle(svc)}</h2>
                <div style={{ width: 36, height: 3, background: GOLD, borderRadius: 2, marginTop: 12 }}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {getItems(svc).map((item, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '22px 26px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: '1.5px solid #F1F5FB' }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16.5, fontWeight: 700, color: NAVY, marginBottom: 9 }}>{item.title}</h3>
                    <p style={{ color: '#64748B', fontSize: 14.5, lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${RED})`, borderRadius: 20, padding: '40px', textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, marginBottom: 20 }}>
              {lang === 'fr' ? "Prêt à concrétiser votre projet à l'étranger ?" : lang === 'de' ? "Bereit, Ihr Auslandsprojekt zu verwirklichen?" : "Ready to realize your project abroad?"}
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, textDecoration: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 700, boxShadow: '0 4px 20px rgba(200,168,75,0.4)' }}>
              {L.cta} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
