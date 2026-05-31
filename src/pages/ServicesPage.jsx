import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { ChevronRight } from 'lucide-react'

const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B'

const SERVICES=[
  {num:'01',image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80',title:"Orientation et Conseil Académique",items:[{title:'Bilan de profil',desc:"Analyse de votre parcours académique pour évaluer vos chances d'éligibilité à l'étranger."},{title:'Choix des filières',desc:"Aide à la sélection des établissements et programmes les plus adaptés à vos objectifs."}]},
  {num:'02',image:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80',title:"Apprentissage des Langues",items:[{title:'Cours de langues',desc:"Formations en langue allemande (A1 à C1) pour les certifications officielles Goethe-Zertifikat et ÖSD."},{title:'Préparation aux examens',desc:"Sessions d'entraînement pour réussir les tests requis pour les visas ou admissions."}]},
  {num:'03',image:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=700&q=80',title:"Assistance aux Procédures d'Admission",items:[{title:'Gestion des candidatures',desc:"Constitution et envoi des dossiers d'inscription auprès des universités partenaires."},{title:'Aide à la rédaction',desc:"Rédaction de lettres de motivation et CV aux normes internationales."}]},
  {num:'04',image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=80',title:"Accompagnement Visa et Procédures Consulaires",items:[{title:'Constitution du dossier visa',desc:"Vérification des pièces requises : justificatifs financiers, formulaires consulaires, traductions et apostilles."},{title:"Simulation d'entretiens",desc:"Préparation aux entretiens consulaires pour maximiser vos chances d'obtention du visa."}]},
  {num:'05',image:'https://images.unsplash.com/photo-1560439514-4e9645039924?w=700&q=80',title:"Intégration et Suivi post-arrivée",items:[{title:'Logement et accueil',desc:"Conseils pour trouver un logement étudiant ou professionnel avant le départ."},{title:'Démarches administratives',desc:"Orientation pour les premières étapes à l'arrivée : inscription universitaire, assurance santé, compte bancaire."}]},
]

export default function ServicesPage(){
  return(
    <>
      <SEOHead/>
      <div style={{paddingTop:62,fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{background:`linear-gradient(135deg,${NAVY},#1B3E6F)`,padding:'64px 32px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)',backgroundSize:'50px 50px'}}/>
          <p style={{color:GOLD,fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:'.18em',marginBottom:12}}>Services</p>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,5vw,46px)',fontWeight:700,color:'#fff',marginBottom:14}}>Nos Domaines d'Expertise</h1>
          <div style={{width:48,height:4,background:GOLD,borderRadius:2,margin:'0 auto 18px'}}/>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:17}}>Un accompagnement complet, de l'orientation au départ</p>
        </div>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'60px 28px'}}>
          {SERVICES.map((svc)=>(
            <div key={svc.num} style={{marginBottom:56}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:36,alignItems:'center'}}>
                <div style={{borderRadius:18,overflow:'hidden',height:260,position:'relative'}}>
                  <img src={svc.image} alt={svc.title} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy"/>
                  <div style={{position:'absolute',top:14,left:14,background:GOLD,color:NAVY,borderRadius:8,padding:'4px 12px',fontSize:13,fontWeight:700}}>{svc.num}</div>
                </div>
                <div>
                  <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:NAVY,marginBottom:8}}>{svc.title}</h2>
                  <div style={{width:40,height:3,background:GOLD,borderRadius:2,marginBottom:18}}/>
                  {svc.items.map((item,i)=>(
                    <div key={i} style={{background:'#fff',borderRadius:12,padding:'16px 18px',marginBottom:12,boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #F1F5FB'}}>
                      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:NAVY,marginBottom:6}}>{item.title}</h3>
                      <p style={{color:'#64748B',fontSize:13.5,lineHeight:1.7}}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div style={{background:`linear-gradient(135deg,${NAVY},${RED})`,borderRadius:20,padding:'40px',textAlign:'center'}}>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:16,marginBottom:20}}>Prêt à concrétiser votre projet à l'étranger ?</p>
            <Link to="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,background:GOLD,color:NAVY,textDecoration:'none',borderRadius:12,padding:'14px 32px',fontSize:15,fontWeight:700}}>
              Déposer ma candidature <ChevronRight size={16}/>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}