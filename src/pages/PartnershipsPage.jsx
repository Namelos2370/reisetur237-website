import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import { ChevronRight } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'
const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B'
const PARTNERS=[
  {flag:'🇩🇪',image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',title_fr:'Assurance Internationale — Allemagne',desc_fr:"Partenaire spécialisé en assurance santé internationale pour étudiants étrangers en Allemagne. Couverture complète indispensable pour l'obtention du visa."},
  {flag:'🇩🇪',image:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',title_fr:'École de Langues — Heidelberg',desc_fr:"Institution de référence pour l'apprentissage de la langue allemande en immersion. Programmes intensifs préparant aux certifications officielles."},
  {flag:'🇵🇱',image:'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',title_fr:'Université Accréditée — Varsovie',desc_fr:"Université détenant la triple accréditation internationale. Programmes en anglais de haute qualité accessibles à nos candidats."},
  {flag:'🇲🇹',image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',title_fr:"Enseignement Supérieur — Malte",desc_fr:"Établissement proposant des programmes anglophones en gestion, technologie et hôtellerie. Porte d'entrée idéale vers l'Europe."},
]
export default function PartnershipsPage(){
  const{i18n}=useTranslation()
  const lang=i18n.language?.slice(0,2)||'fr'
  const isMobile=useIsMobile()
  const getTitle=p=>p[`title_${lang}`]||p.title_fr
  const getDesc=p=>p[`desc_${lang}`]||p.desc_fr
  return(
    <><SEOHead/>
    <div style={{paddingTop:62,fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:`linear-gradient(135deg,${NAVY},#2a0707)`,padding:isMobile?'48px 16px 40px':'64px 32px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)',backgroundSize:'50px 50px'}}/>
        <p style={{color:GOLD,fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:'.18em',marginBottom:12}}>Partenariats</p>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?28:46,fontWeight:700,color:'#fff',marginBottom:14}}>Nos Partenariats Institutionnels</h1>
        <div style={{width:48,height:4,background:GOLD,borderRadius:2,margin:'0 auto 18px'}}/>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:isMobile?15:17}}>Des collaborations européennes de confiance</p>
      </div>
      <div style={{maxWidth:1080,margin:'0 auto',padding:isMobile?'36px 16px':'60px 28px'}}>
        <p style={{color:'#64748B',fontSize:15,lineHeight:1.8,textAlign:'center',maxWidth:700,margin:'0 auto 44px'}}>Reisetür 237 collabore avec des institutions partenaires reconnues et accréditées en Allemagne, Pologne et Malte.</p>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',gap:isMobile?16:24,marginBottom:40}}>
          {PARTNERS.map(p=>(
            <div key={p.title_fr} style={{background:'#fff',borderRadius:18,overflow:'hidden',boxShadow:'0 2px 18px rgba(0,0,0,0.08)',border:'1.5px solid #F1F5FB'}}>
              <div style={{height:isMobile?180:220,overflow:'hidden',position:'relative'}}>
                <img src={p.image} alt={getTitle(p)} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy"/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.5))'}}/>
                <span style={{position:'absolute',bottom:14,left:16,fontSize:24}}>{p.flag}</span>
              </div>
              <div style={{padding:isMobile?'16px':'22px 24px'}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?15:17,fontWeight:700,color:NAVY,marginBottom:8,lineHeight:1.3}}>{getTitle(p)}</h3>
                <p style={{color:'#64748B',fontSize:isMobile?13:14,lineHeight:1.75}}>{getDesc(p)}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:40}}>
          {[{value:'4',label:'Partenaires'},{value:'3',label:'Pays'},{value:'100%',label:'Accrédités'}].map(({value,label})=>(
            <div key={label} style={{background:'#F7F8FC',borderRadius:12,padding:isMobile?'16px 8px':'22px',textAlign:'center',border:'1px solid #E2E8F0'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?24:32,fontWeight:700,color:RED,marginBottom:4}}>{value}</div>
              <div style={{color:'#64748B',fontSize:isMobile?11:13}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{background:`linear-gradient(135deg,#1B3E6F,${NAVY})`,borderRadius:16,padding:isMobile?'24px 16px':'36px 40px',display:'flex',flexDirection:isMobile?'column':'row',alignItems:isMobile?'flex-start':'center',justifyContent:'space-between',gap:16,border:'1px solid rgba(200,168,75,0.3)'}}>
          <div>
            <p style={{color:GOLD,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.15em',marginBottom:8}}>Reisetür 237</p>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?17:20,color:'#fff',marginBottom:6}}>Vous êtes une institution ? Contactez-nous</h3>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>reisetur237@gmail.com</p>
          </div>
          <Link to="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,background:RED,color:'#fff',textDecoration:'none',borderRadius:11,padding:'12px 22px',fontSize:13.5,fontWeight:700,width:isMobile?'100%':'auto',justifyContent:'center'}}>
            Déposer ma candidature <ChevronRight size={14}/>
          </Link>
        </div>
      </div>
    </div></>
  )
}