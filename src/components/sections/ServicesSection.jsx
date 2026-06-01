import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useIsMobile } from '../../hooks/useIsMobile'
const SERVICES=[
  {key:'visa',img:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'},
  {key:'orientation',img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80'},
  {key:'ausbildung',img:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80'},
  {key:'language',img:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80'},
]
const NAVY='#1A1A1A',GOLD='#C8A84B',RED='#C0392B'
export default function ServicesSection(){
  const{t}=useTranslation()
  const isMobile=useIsMobile()
  return(
    <section style={{padding:isMobile?'48px 16px':'80px 32px',background:'#fff'}} id="services">
      <div style={{maxWidth:1160,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:isMobile?32:48}}>
          <p style={{color:GOLD,fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:'.18em',marginBottom:11}}>Services</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?26:34,fontWeight:700,color:NAVY,marginBottom:11}}>{t('services.title')}</h2>
          <div style={{width:46,height:4,background:GOLD,borderRadius:2,margin:'0 auto 14px'}}/>
          <p style={{color:'#64748B',fontSize:15,maxWidth:520,margin:'0 auto'}}>{t('services.subtitle')}</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(4,1fr)',gap:isMobile?16:22}}>
          {SERVICES.map(({key,img})=>(
            <div key={key} style={{background:'#fff',borderRadius:18,overflow:'hidden',boxShadow:'0 2px 18px rgba(0,0,0,0.08)',border:'1.5px solid #F1F5FB',display:'flex',flexDirection:'column'}}>
              <div style={{height:isMobile?160:180,overflow:'hidden',position:'relative'}}>
                <img src={img} alt={t(`services.${key}.title`)} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy"/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.4))'}}/>
              </div>
              <div style={{padding:'18px 18px 16px',flex:1,display:'flex',flexDirection:'column'}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:15.5,fontWeight:700,color:NAVY,marginBottom:7,lineHeight:1.3}}>{t(`services.${key}.title`)}</h3>
                <p style={{color:'#64748B',fontSize:13,lineHeight:1.65,flex:1}}>{t(`services.${key}.desc`)}</p>
                <Link to="/services" style={{marginTop:12,display:'inline-flex',alignItems:'center',gap:4,color:RED,fontSize:13,fontWeight:700,textDecoration:'none'}}>
                  {t('common.learn_more')} <ChevronRight size={13}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}