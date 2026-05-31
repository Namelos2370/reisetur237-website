import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import SEOHead from '../../components/seo/SEOHead'
import { Search, Calendar, ChevronRight, BookOpen } from 'lucide-react'

const NAVY = '#1A1A1A', RED = '#C0392B', GOLD = '#C8A84B'

export const ALL_ARTICLES = [
  {
    id:'1', image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80', slug:'ausbildung-pflege-cameroun-guide',
    title_fr:'Guide complet : Partir en Ausbildung Pflege depuis le Cameroun',
    title_de:'Vollständiger Leitfaden: Ausbildung Pflege aus Kamerun',
    title_en:'Complete Guide: Ausbildung Pflege from Cameroon',
    excerpt_fr:"Tout ce que vous devez savoir pour intégrer un programme de formation en soins infirmiers en Allemagne depuis le Cameroun : conditions, étapes, visa.",
    excerpt_en:"Everything you need to know to start a nursing training program in Germany from Cameroon.",
    category:'Formation', created_at:'2026-05-15T10:00:00Z', read_time:8,
    content_fr:`## Qu'est-ce que l'Ausbildung Pflege ?

L'**Ausbildung Pflege** est un programme de formation professionnelle en soins infirmiers en Allemagne, d'une durée de **3 ans**. Il permet d'obtenir un diplôme reconnu dans toute l'Union Européenne et d'accéder à un emploi stable, bien rémunéré et en forte demande.

L'Allemagne compte aujourd'hui plus de **300 000 postes non pourvus** dans le secteur médical. Les candidats formés via l'Ausbildung bénéficient d'un accès privilégié à ce marché de l'emploi européen.

## Conditions d'accès depuis le Cameroun

Pour postuler à une Ausbildung Pflege depuis le Cameroun, vous devez réunir les éléments suivants :

- **Niveau de langue** : Minimum B2 en allemand (certifié)
- **Diplôme** : Baccalauréat ou équivalent reconnu
- **Âge** : Généralement entre 18 et 35 ans
- **Bonne condition physique** : Les soins infirmiers sont un métier exigeant physiquement et mentalement

## Les étapes du processus avec Reisetür 237

### 1. Formation linguistique (12 mois)
Commencez votre parcours chez Reisetür 237 au niveau A1. Avec nos formateurs certifiés, progressez jusqu'au B2 en 12 mois. C'est la clé de tout le reste.

### 2. Constitution du dossier
- CV en allemand (Lebenslauf au format européen)
- Lettre de motivation (Motivationsschreiben)
- Diplômes traduits et apostillés
- Casier judiciaire vierge
- Photos d'identité conformes

### 3. Candidature auprès des établissements
Reisetür 237 vous met en relation directe avec nos institutions partenaires en Allemagne. Nous soumettons votre dossier et assurons le suivi des candidatures.

### 4. Obtention du visa national (Visa D)
Une fois votre contrat d'Ausbildung signé, nous vous accompagnons pour obtenir votre visa national de long séjour auprès de l'ambassade d'Allemagne à Yaoundé.

### 5. Départ et intégration
Avant votre départ, nous vous orientons pour le logement, l'assurance santé internationale et les premières démarches administratives à votre arrivée.

## Avantages de l'Ausbildung Pflege

- **Rémunération dès le premier jour** : entre 800 et 1 200 €/mois pendant la formation
- **Logement** : souvent pris en charge ou subventionné par l'établissement
- **Titre de séjour** : renouvelable, évolutif vers une résidence permanente
- **Famille** : possibilité de regroupement familial après 2 ans
- **Diplôme européen** : reconnu dans toute l'UE

## Témoignage

*"J'ai commencé les cours d'allemand chez Reisetür 237 en ne connaissant pas un seul mot. 14 mois plus tard, j'étais à Berlin avec mon contrat d'Ausbildung en main. Tout s'est passé exactement comme ils me l'avaient expliqué."*
— **Marie-Noëlle F.**, infirmière en formation, Berlin

---

Vous souhaitez démarrer votre parcours Ausbildung ? Contactez Reisetür 237 dès aujourd'hui.`,
  },
  {
    id:'2', image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=80', slug:'visa-etudiant-allemagne-documents',
    title_fr:"Visa étudiant Allemagne : la liste complète des documents",
    title_de:"Studentenvisum Deutschland: die vollständige Dokumentenliste",
    title_en:"Germany Student Visa: the complete document checklist",
    excerpt_fr:"Dossier complet, délais, rendez-vous consulaire — tout ce qu'il faut préparer pour votre visa étudiant vers l'Allemagne.",
    excerpt_en:"Complete file, deadlines, consulate appointment — everything to prepare for your student visa.",
    category:'Visa', created_at:'2026-05-10T10:00:00Z', read_time:6,
    content_fr:`## Le visa national allemand (Type D)

Pour étudier ou effectuer une Ausbildung en Allemagne, les ressortissants camerounais ont besoin d'un **visa national de long séjour (Type D)**, délivré par l'Ambassade d'Allemagne à Yaoundé.

## Liste complète des documents requis

### Documents personnels
- Passeport valide (validité minimum 6 mois après la fin du séjour prévu)
- 2 photos d'identité biométriques récentes (35x45mm, fond blanc)
- Acte de naissance (original + traduction officielle en allemand)
- Casier judiciaire n°3 (moins de 3 mois)

### Documents académiques
- Diplômes originaux + copies certifiées conformes
- Traductions officielles en allemand (traducteur assermenté)
- Relevés de notes des 3 dernières années

### Documents linguistiques
- Certificat de langue allemande niveau B2 minimum
- Pour l'Ausbildung Pflege : B2 requis

### Documents financiers
- Justificatif de ressources : **10 236 € bloqués** sur un compte de blocage allemand (Sperrkonto) OU
- Lettre de prise en charge (Verpflichtungserklärung) d'un répondant en Allemagne OU
- Contrat d'Ausbildung mentionnant la rémunération

### Documents d'admission
- Lettre d'admission de l'université ou contrat d'Ausbildung signé
- Preuve d'assurance santé internationale valable en Allemagne (ex. Care Concept AG)
- Justificatif de logement (si disponible)

## Délais à prévoir

| Étape | Délai estimé |
|-------|-------------|
| Prise de rendez-vous consulaire | 4 à 8 semaines |
| Traitement du dossier | 6 à 12 semaines |
| Total à prévoir | **3 à 5 mois avant le départ** |

## Conseils de Reisetür 237

1. **Commencez tôt** — Ne sous-estimez jamais les délais consulaires
2. **Vérifiez les traductions** — Seuls les traducteurs assermentés sont acceptés
3. **Le Sperrkonto** — Ouvrez le compte de blocage dès que possible (Deutsche Bank, Fintiba, Expatrio)
4. **Préparez l'entretien** — L'ambassade peut vous convoquer pour un entretien

Reisetür 237 vérifie et constitue votre dossier complet pour maximiser vos chances.`,
  },
  {
    id:'3', image:'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=700&q=80', slug:'temoignage-marie-infirmiere-berlin',
    title_fr:"Témoignage : Marie-Noëlle, infirmière à Berlin grâce à Reisetür 237",
    title_de:"Erfahrungsbericht: Marie-Noëlle, Krankenschwester in Berlin",
    title_en:"Testimonial: Marie-Noëlle, nurse in Berlin thanks to Reisetür 237",
    excerpt_fr:"\"Je suis partie de Yaoundé avec zéro expérience en allemand. Aujourd'hui je travaille dans une clinique à Berlin.\" — Marie-Noëlle, 2 ans d'Ausbildung.",
    excerpt_en:"\"I left Yaoundé with zero German experience. Today I work in a Berlin clinic.\"",
    category:'Témoignages', created_at:'2026-05-05T10:00:00Z', read_time:4,
    content_fr:`## Une aventure qui a commencé ici, à Yaoundé

*Marie-Noëlle F., 26 ans, originaire de Yaoundé, est aujourd'hui en 2ème année d'Ausbildung Pflege dans une clinique berlinoise. Voici son témoignage.*

---

**Comment avez-vous connu Reisetür 237 ?**

"C'est une amie qui m'en a parlé. J'avais envie de partir mais je ne savais pas par où commencer. Je n'avais aucune base en allemand, et honnêtement, ça me semblait impossible. En venant ici, on m'a expliqué le parcours étape par étape. Ça m'a donné confiance."

**Comment s'est passée la formation linguistique ?**

"J'ai suivi les cours du niveau A1 au B2 chez Reisetür 237. Ça a duré environ 14 mois. Les formateurs sont très bons, ils connaissent les exigences des examens et ce que les employeurs allemands attendent. Le niveau B2, je l'ai obtenu du premier coup."

**Et la constitution du dossier ?**

"C'est là où Reisetür 237 fait vraiment la différence. Mon CV en allemand, ma lettre de motivation, les traductions des diplômes — tout a été fait avec eux. Ils ont même préparé mon entretien simulé pour l'ambassade. Je savais exactement quoi dire."

**Comment était l'accueil en Allemagne ?**

"Ma clinique m'a aidée pour le logement. Les premiers mois, c'est intense — la langue dans un contexte professionnel médical, c'est différent des cours. Mais j'étais bien préparée. Aujourd'hui je suis à l'aise, mes collègues sont bienveillants."

**Votre message pour ceux qui hésitent ?**

"Ne dites pas que c'est impossible. Moi j'ai commencé à zéro. Si vous êtes prêt à travailler, Reisetür 237 vous donne tous les outils. Ce n'est pas un rêve, c'est un parcours. Et ça vaut vraiment le coup."

---

*Marie-Noëlle est l'une des candidates dont Reisetür 237 a accompagné le dossier de A à Z, de la première leçon d'allemand jusqu'à son installation à Berlin.*`,
  },
  {
    id:'4', image:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80', slug:'temoignages-groupe-formation-allemagne',
    title_fr:"Ils sont partis ensemble : 3 candidats, une même école à Berlin",
    title_de:"Sie gingen zusammen: 3 Kandidaten, eine Schule in Berlin",
    title_en:"They left together: 3 candidates, one school in Berlin",
    excerpt_fr:"Jean-Paul, Honorine et Leslie ont suivi le même parcours chez Reisetür 237 et se retrouvent aujourd'hui dans la même école de formation à Berlin.",
    excerpt_en:"Jean-Paul, Honorine and Leslie followed the same path at Reisetür 237 and are now in the same training school in Berlin.",
    category:'Témoignages', created_at:'2026-04-25T10:00:00Z', read_time:5,
    content_fr:`## Trois amis, un même rêve, un même départ

*Jean-Paul N., Honorine T. et Leslie M. se sont connus lors de leurs cours d'allemand chez Reisetür 237. Aujourd'hui en 1ère année d'Ausbildung Pflege dans la même clinique de Berlin, ils partagent leur expérience.*

---

### Jean-Paul, 27 ans

"Au départ, je voulais partir seul. Mais le fait de se retrouver à plusieurs, ça aide vraiment. On se motivait mutuellement pendant les cours, on révisait ensemble. Et maintenant qu'on est à Berlin dans la même structure, c'est un confort énorme. On se retrouve le week-end, on parle en français quand on est fatigués des cours. C'est important d'avoir des repères."

### Honorine, 24 ans

"Ce que j'apprécie le plus c'est que Reisetür 237 nous a préparés à la réalité, pas à une image idéalisée. On nous a dit que les premiers mois seraient difficiles, que la langue médicale était exigeante, qu'il faudrait s'adapter. Et c'est vrai. Mais parce qu'on était préparés, on n'a pas paniqué. Ma clinique est très structurée, les formateurs sont patients."

### Leslie, 25 ans

"Moi ce qui m'a convaincu, c'est quand j'ai vu que Reisetür 237 suivait les dossiers jusqu'au bout. Pas juste les cours de langue. Ils ont géré mon dossier consulaire, mon assurance, mon contrat. Je n'avais jamais quitté le Cameroun. Ils m'ont accompagné pas à pas. Aujourd'hui j'ai un salaire, un logement, et une perspective d'avenir en Europe."

---

*Jean-Paul, Honorine et Leslie font partie de la même promotion Reisetür 237. Leur départ coordonné a été organisé avec leur école partenaire à Berlin.*`,
  },
  {
    id:'5', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80', slug:'temoignages-formations-differentes',
    title_fr:"Deux parcours différents, deux réussites : Yvan et Valerie",
    title_de:"Zwei verschiedene Wege, zwei Erfolge: Yvan und Valerie",
    title_en:"Two different paths, two successes: Yvan and Valerie",
    excerpt_fr:"Yvan est en Ausbildung dans une maison de retraite à Hambourg. Valerie suit une formation en hôtellerie à Malte. Deux profils, deux destinations, une même agence.",
    excerpt_en:"Yvan is in an Ausbildung at a Hamburg nursing home. Valerie is studying hospitality in Malta. Two profiles, two destinations, one agency.",
    category:'Témoignages', created_at:'2026-04-15T10:00:00Z', read_time:5,
    content_fr:`## Deux chemins, une même confiance

### Yvan, Hambourg — Ausbildung Pflege (1 an)

*Yvan N., 28 ans, est en 1ère année d'Ausbildung dans un établissement de soins pour personnes âgées à Hambourg.*

"J'avais hésité longtemps entre rester au Cameroun et partir. Ce qui m'a décidé, c'est la clarté du parcours que Reisetür 237 m'a présenté. Pas de promesses vagues — juste : voilà ce que vous devez faire, voilà combien de temps ça prend, voilà ce que vous allez gagner.

Hambourg, c'est une ville magnifique. Mon Heim (centre de soins) est bien organisé. Je gagne environ 1 050 € par mois en formation. C'est plus que je ne gagnais au Cameroun, et j'apprends en même temps. Dans 2 ans, j'aurai un diplôme reconnu partout en Europe."

---

### Valerie, Malte — Formation en Hôtellerie (1 an)

*Valerie K., 23 ans, étudie à Domain Academy à Mosta, Malte, en programme anglophone de gestion hôtelière.*

"Mon anglais était déjà bon, donc Malte était le choix logique. Reisetür 237 m'a orientée vers Domain Academy — je ne connaissais pas Malte du tout. Ils ont tout géré : l'admission, le visa, le logement en résidence étudiante.

Malte c'est petit mais dynamique. Il y a beaucoup d'étudiants internationaux, l'ambiance est cosmopolite. Mon programme est en anglais, les profs sont accessibles. Après cette formation, je veux travailler dans l'hôtellerie de luxe en Europe."

---

*Yvan et Valerie illustrent la diversité des destinations et des parcours que Reisetür 237 accompagne, de l'Allemagne à Malte, selon le profil et les ambitions de chaque candidat.*`,
  },
  {
    id:'6', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80', slug:'malte-etudes-anglophones',
    title_fr:"Étudier à Malte : l'option anglophone abordable en Europe",
    title_de:"Studieren auf Malta: die erschwingliche englischsprachige Option",
    title_en:"Study in Malta: the affordable English-language option in Europe",
    excerpt_fr:"Malte attire de plus en plus d'étudiants africains grâce à ses programmes anglophones, son coût de vie modéré et sa situation géographique stratégique.",
    excerpt_en:"Malta is attracting more and more African students thanks to its English programs and moderate cost of living.",
    category:'Migration', created_at:'2026-04-08T10:00:00Z', read_time:5,
    content_fr:`## Pourquoi Malte ?

Malte est souvent sous-estimée comme destination d'études. Pourtant, cette île méditerranéenne membre de l'Union Européenne présente des atouts considérables pour les étudiants africains.

## Les avantages de Malte

### Langue anglaise
Malte est l'un des deux seuls pays de l'UE où l'anglais est langue officielle. Tous les programmes universitaires sont dispensés en anglais — un avantage majeur pour les candidats francophones qui maîtrisent déjà l'anglais.

### Coût de vie modéré
Comparé à l'Allemagne, la France ou les Pays-Bas, Malte offre un coût de vie plus accessible, avec des loyers étudiants entre 400 et 700 €/mois selon la ville.

### Reconnaissance européenne
Les diplômes maltais sont reconnus dans toute l'Union Européenne. Étudier à Malte, c'est obtenir un titre universitaire européen.

### Cadre de vie
Malte bénéficie d'un climat méditerranéen exceptionnel, d'une communauté internationale importante et d'une sécurité exemplaire.

## Notre partenaire : Domain Academy

Reisetür 237 travaille en partenariat avec **Domain Academy**, établissement d'enseignement supérieur basé à Mosta, proposant des programmes en :
- Gestion hôtelière et tourisme
- Business Administration
- Technologies de l'information
- Programmes préparatoires

## Conditions générales

- **Langue** : Anglais niveau B2 minimum
- **Diplôme** : Baccalauréat ou équivalent
- **Visa** : Visa étudiant maltais (simplifié pour les pays tiers)
- **Durée** : 1 à 3 ans selon le programme

Intéressé par Malte ? Contactez Reisetür 237 pour une évaluation gratuite de votre profil.`,
  },
]

const CATS = { fr: ['Tous','Formation','Visa','Témoignages','Migration'], de: ['Alle','Ausbildung','Visum','Erfahrungsberichte','Migration'], en: ['All','Training','Visa','Testimonials','Migration'] }
const ICONS = { 'Formation':'🎓','Visa':'📋','Témoignages':'💬','Migration':'✈️','Actualités':'📰','Ausbildung':'🎓','Erfahrungsberichte':'💬','Training':'🎓','Testimonials':'💬','News':'📰' }
const CAT_COLORS = { 'Formation':{ bg:'#D1FAE5',c:'#059669' },'Visa':{ bg:'#FEE2E2',c:'#DC2626' },'Témoignages':{ bg:'#FEF3C7',c:'#D97706' },'Migration':{ bg:'#DBEAFE',c:'#1D4ED8' } }

export default function BlogPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0,2) || 'fr'
  const [articles, setArticles] = useState(ALL_ARTICLES)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tous')

  useEffect(() => {
    supabase.from('articles').select('*').eq('published',true).order('created_at',{ascending:false})
      .then(({ data }) => { if (data?.length > 0) setArticles([...ALL_ARTICLES, ...data]) })
  }, [])

  const getTitle   = a => a[`title_${lang}`]   || a.title_fr   || ''
  const getExcerpt = a => a[`excerpt_${lang}`] || a.excerpt_fr || ''
  const cats = CATS[lang] || CATS.fr

  const filtered = articles.filter(a => {
    const matchCat = cat === 'Tous' || cat === 'Alle' || cat === 'All' || a.category === cat
    const matchS = getTitle(a).toLowerCase().includes(search.toLowerCase())
    return matchCat && matchS
  })

  const L = {
    fr: { badge:'Blog', title:'Blog & Actualités', sub:'Informations, guides et témoignages', search:'Rechercher...', readMore:'Lire la suite', readTime:'min de lecture', none:'Aucun article trouvé.' },
    de: { badge:'Blog', title:'Blog & Neuigkeiten', sub:'Informationen, Ratgeber und Erfahrungsberichte', search:'Suchen...', readMore:'Weiterlesen', readTime:'Min. Lesezeit', none:'Keine Artikel gefunden.' },
    en: { badge:'Blog', title:'Blog & News', sub:'Information, guides and testimonials', search:'Search...', readMore:'Read more', readTime:'min read', none:'No articles found.' },
  }[lang] || { badge:'Blog', title:'Blog & Actualités', sub:'', search:'Rechercher...', readMore:'Lire la suite', readTime:'min', none:'Aucun article.' }

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop:62, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, padding:'64px 32px 56px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize:'50px 50px' }}/>
          <p style={{ color:GOLD, fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'.18em', marginBottom:12 }}>{L.badge}</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,5vw,46px)', fontWeight:700, color:'#fff', marginBottom:14 }}>{L.title}</h1>
          <div style={{ width:48, height:4, background:GOLD, borderRadius:2, margin:'0 auto 18px' }}/>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:17 }}>{L.sub}</p>
        </div>

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 28px' }}>
          <div style={{ display:'flex', gap:12, marginBottom:28, flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', border:'1.5px solid #E2E8F0', borderRadius:12, padding:'9px 16px', flex:1, minWidth:200 }}>
              <Search size={14} color="#94A3B8" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L.search} style={{ border:'none', outline:'none', fontSize:14, flex:1 }} />
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {cats.map(c => (
                <button key={c} onClick={()=>setCat(c)} style={{ background:cat===c?NAVY:'#fff', color:cat===c?'#fff':'#64748B', border:'1.5px solid #E2E8F0', borderRadius:9, padding:'8px 14px', fontSize:12.5, fontWeight:600, cursor:'pointer' }}>{c}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0
            ? <div style={{ textAlign:'center', padding:'64px 0', color:'#94A3B8' }}><BookOpen size={40} style={{ marginBottom:12, opacity:.4 }}/><p>{L.none}</p></div>
            : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:22 }}>
                {filtered.map((a,i) => {
                  // Vérification de l'image
                  const hasImage = !!a.image;
                  // Dégradé par défaut si pas d'image
                  const fallbackBg = i%3===0 ? `linear-gradient(135deg,${NAVY},#2a0707)` : i%3===1 ? `linear-gradient(135deg,#1B3E6F,#2563A8)` : `linear-gradient(135deg,${NAVY},${RED})`;
                  
                  return (
                    <Link key={a.id} to={`/blog/${a.slug||a.id}`} style={{ textDecoration:'none' }}>
                      <div style={{ background:'#fff', borderRadius:18, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1.5px solid #F1F5FB', height:'100%', display:'flex', flexDirection:'column' }}>
                        
                        {/* Zone d'en-tête de la carte avec l'image ajoutée ici */}
                        <div style={{ 
                          background: hasImage ? `url(${a.image}) center/cover no-repeat` : fallbackBg, 
                          padding:'26px 22px 18px', 
                          minHeight: 160, // Agrandit l'en-tête pour bien voir l'image
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}>
                          {/* Voile sombre pour que le texte reste lisible sur l'image */}
                          {hasImage && <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.35)' }} />}
                          
                          <div style={{ position:'relative', zIndex:1 }}>
                            <div style={{ fontSize:28, marginBottom:6 }}>{ICONS[a.category]||'📰'}</div>
                          </div>
                          <div style={{ position:'relative', zIndex:1 }}>
                            <span style={{ background:'rgba(255,255,255,0.25)', backdropFilter:'blur(4px)', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>{a.category}</span>
                          </div>
                        </div>

                        <div style={{ padding:'18px 20px', flex:1, display:'flex', flexDirection:'column' }}>
                          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15.5, fontWeight:700, color:NAVY, lineHeight:1.4, marginBottom:10, flex:1 }}>{getTitle(a)}</h3>
                          <p style={{ color:'#64748B', fontSize:13, lineHeight:1.65, marginBottom:14 }}>{(getExcerpt(a)||'').slice(0,110)}...</p>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #F1F5FB', paddingTop:10 }}>
                            <span style={{ display:'flex', alignItems:'center', gap:5, color:'#94A3B8', fontSize:11.5 }}>
                              <Calendar size={11} />{new Date(a.created_at).toLocaleDateString(lang==='fr'?'fr-FR':lang==='de'?'de-DE':'en-GB')}
                              {a.read_time && <span style={{ marginLeft:6 }}>· {a.read_time} {L.readTime}</span>}
                            </span>
                            <span style={{ color:RED, fontSize:12.5, fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>{L.readMore} <ChevronRight size={12}/></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
          }
        </div>
      </div>
    </>
  )
}