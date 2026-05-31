import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B'
const LEVELS=[
  {level:'A1',label:'Débutant',img:'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80',condition:'Baccalauréat',desc:'Bases de la communication : alphabet, salutations, chiffres, formules courantes.'},
  {level:'A2',label:'Élémentaire',img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',condition:'Réussite A1',desc:'Conversations simples, vie quotidienne, achats, directions.'},
  {level:'B1',label:'Intermédiaire',img:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',condition:'Réussite A2',desc:'Communication autonome, grammaire intermédiaire, compréhension de textes courants.'},
  {level:'B2',label:'Avancé',img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',condition:'Réussite B1',desc:"Niveau requis pour visa Allemagne et Ausbildung Pflege. Argumentation avancée."},
  {level:'C1',label:'Courant',img:'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&q=80',condition:'Réussite B2',desc:'Maîtrise professionnelle. Rédaction complexe, discours techniques et académiques.'},
]
export default function CertificationsPage(){
  const {i18n}=useTranslation()
  const lang=i18n.language?.slice(0,2)||'fr'
  const L={
    fr:{badge:'Certifications',title:'Certifications Linguistiques',sub:'Des examens reconnus internationalement',intro:"Centre d'examen agréé à Yaoundé, Reisetür 237 prépare et organise le passage des certifications officielles en langue allemande, du niveau A1 au C1.",levels:'Les niveaux disponibles',duration:'3 mois',condition:"Condition d'accès",diploma:'Diplôme obtenu',test:'Tester mon niveau gratuitement',testSub:"Simulateur d'examen B1/B2 disponible en ligne"},
    de:{badge:'Zertifizierungen',title:'Sprachzertifizierungen',sub:'International anerkannte Prüfungen',intro:'Reisetür 237 bereitet Kandidaten auf offizielle Deutschzertifizierungen von A1 bis C1 vor.',levels:'Verfügbare Niveaus',duration:'3 Monate',condition:'Zugangsbedingung',diploma:'Erhaltenes Diplom',test:'Mein Niveau kostenlos testen',testSub:'Online B1/B2 Prüfungssimulator'},
    en:{badge:'Certifications',title:'Language Certifications',sub:'Internationally recognized examinations',intro:'Reisetür 237 prepares and organizes official German language certifications from A1 to C1.',levels:'Available levels',duration:'3 months',condition:'Entry requirement',diploma:'Certificate obtained',test:'Test my level for free',testSub:'Online B1/B2 exam simulator'},
  }[lang]||{}
  return(
    <><SEOHead/>
    <div style={{paddingTop:62,fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:`linear-gradient(135deg,${NAVY},#1B3E6F)`,padding:'64px 32px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)',backgroundSize:'50px 50px'}}/>
        <p style={{color:GOLD,fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:'.18em',marginBottom:12}}>{L.badge}</p>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,5vw,46px)',fontWeight:700,color:'#fff',marginBottom:14}}>{L.title}</h1>
        <div style={{width:48,height:4,background:GOLD,borderRadius:2,margin:'0 auto 18px'}}/>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:17}}>{L.sub}</p>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'60px 28px'}}>
        <p style={{color:'#64748B',fontSize:16,lineHeight:1.8,textAlign:'center',maxWidth:720,margin:'0 auto 40px'}}>{L.intro}</p>
        <div style={{background:`linear-gradient(135deg,${NAVY},#1B3E6F)`,borderRadius:20,padding:'32px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginBottom:52,border:'1px solid rgba(200,168,75,0.3)'}}>
          <div style={{position:'relative',width:120,height:80,borderRadius:12,overflow:'hidden',flexShrink:0}}>
            <img src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300&q=80" alt="exam" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </div>
          <div style={{flex:1}}>
            <p style={{color:GOLD,fontSize:11.5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.15em',marginBottom:8}}>Simulateur en ligne</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:'#fff',marginBottom:6}}>{L.test}</h2>
            <p style={{color:'rgba(255,255,255,0.55)',fontSize:14}}>{L.testSub}</p>
          </div>
          <a href="https://reisetuer-bildungswerk.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{background:RED,color:'#fff',textDecoration:'none',borderRadius:12,padding:'13px 26px',fontSize:14,fontWeight:700,whiteSpace:'nowrap'}}>
            🎯 {L.test} →
          </a>
        </div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:NAVY,textAlign:'center',marginBottom:8}}>{L.levels}</h2>
        <div style={{width:48,height:4,background:GOLD,borderRadius:2,margin:'0 auto 36px'}}/>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {LEVELS.map((item)=>(
            <div key={item.level} style={{background:'#fff',borderRadius:18,overflow:'hidden',boxShadow:'0 2px 16px rgba(0,0,0,0.07)',border:'1.5px solid #F1F5FB',display:'grid',gridTemplateColumns:'200px 1fr'}}>
              <div style={{position:'relative',overflow:'hidden'}}>
                <img src={item.img} alt={`Niveau ${item.level}`} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy"/>
                <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.45)'}}/>
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:44,fontWeight:800,color:'#fff'}}>{item.level}</div>
                  <div style={{color:'rgba(255,255,255,0.8)',fontSize:13,fontWeight:600}}>{item.label}</div>
                </div>
              </div>
              <div style={{padding:'22px 26px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:NAVY,marginBottom:8}}>Langue Allemande — Niveau {item.level}</h3>
                <p style={{color:'#64748B',fontSize:14,lineHeight:1.7,marginBottom:14}}>{item.desc}</p>
                <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                  <span style={{fontSize:13,color:'#64748B'}}>📋 <b>{L.condition} :</b> {item.condition}</span>
                  <span style={{fontSize:13,color:'#64748B'}}>⏱ <b>Durée :</b> {L.duration}</span>
                  <span style={{fontSize:13,color:'#64748B'}}>🏆 <b>{L.diploma} :</b> Attestation {item.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'#F7F8FC',borderRadius:14,padding:'22px',marginTop:28,textAlign:'center',border:'1.5px solid #E2E8F0'}}>
          <p style={{color:'#64748B',fontSize:15}}>Parcours complet <b style={{color:NAVY}}>A1 → C1</b> en <b style={{color:RED,fontFamily:"'Playfair Display',serif",fontSize:20}}>15 mois</b></p>
        </div>
      </div>
    </div></>
  )
}