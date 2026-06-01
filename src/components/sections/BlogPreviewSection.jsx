import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import { ChevronRight, Calendar } from 'lucide-react'
import { useIsMobile } from '../../hooks/useIsMobile'
const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B'
const DEMO=[
  {id:'1',slug:'ausbildung-pflege-cameroun-guide',title_fr:'Guide complet : Partir en Ausbildung Pflege depuis le Cameroun',category:'Formation',created_at:'2026-05-15T10:00:00Z',read_time:8,image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80'},
  {id:'2',slug:'visa-etudiant-allemagne-documents',title_fr:'Visa étudiant Allemagne : la liste complète des documents',category:'Visa',created_at:'2026-05-10T10:00:00Z',read_time:6,image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'},
  {id:'3',slug:'temoignage-marie-infirmiere-berlin',title_fr:'Témoignage : Marie-Noëlle, infirmière à Berlin grâce à Reisetür 237',category:'Témoignages',created_at:'2026-05-05T10:00:00Z',read_time:4,image:'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80'},
]
export default function BlogPreviewSection(){
  const{i18n}=useTranslation()
  const lang=i18n.language?.slice(0,2)||'fr'
  const isMobile=useIsMobile()
  const[articles,setArticles]=useState(DEMO)
  useEffect(()=>{
    supabase.from('articles').select('id,slug,title_fr,title_de,title_en,category,created_at,read_time,image').eq('published',true).order('created_at',{ascending:false}).limit(3)
      .then(({data})=>{if(data?.length>0)setArticles(data)})
  },[])
  const getTitle=a=>a[`title_${lang}`]||a.title_fr||''
  const L={
    fr:{badge:'Blog',title:'Dernières Actualités',sub:'Informations et guides pour votre projet de mobilité',readMore:'Lire la suite',allArticles:'Tous les articles',readTime:'min de lecture'},
    de:{badge:'Blog',title:'Neueste Beiträge',sub:'Informationen für Ihr Mobilitätsprojekt',readMore:'Weiterlesen',allArticles:'Alle Artikel',readTime:'Min.'},
    en:{badge:'Blog',title:'Latest News',sub:'Information and guides for your mobility project',readMore:'Read more',allArticles:'All articles',readTime:'min read'},
  }[lang]||{}
  return(
    <section style={{padding:isMobile?'48px 16px':'80px 32px',background:'#F7F8FC'}}>
      <div style={{maxWidth:1160,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:isMobile?32:48}}>
          <p style={{color:GOLD,fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:'.18em',marginBottom:11}}>{L.badge}</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?26:34,fontWeight:700,color:NAVY,marginBottom:11}}>{L.title}</h2>
          <div style={{width:46,height:4,background:GOLD,borderRadius:2,margin:'0 auto 14px'}}/>
          <p style={{color:'#64748B',fontSize:15}}>{L.sub}</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:isMobile?16:24,marginBottom:32}}>
          {articles.map(a=>(
            <Link key={a.id} to={`/blog/${a.slug||a.id}`} style={{textDecoration:'none'}}>
              <div style={{background:'#fff',borderRadius:18,overflow:'hidden',boxShadow:'0 2px 18px rgba(0,0,0,0.07)',border:'1.5px solid #F1F5FB',display:'flex',flexDirection:'column'}}>
                <div style={{height:isMobile?180:200,overflow:'hidden',position:'relative'}}>
                  {a.image?<img src={a.image} alt={getTitle(a)} style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy"/>:<div style={{height:'100%',background:`linear-gradient(135deg,${NAVY},#1B3E6F)`}}/>}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.55))'}}/>
                  <span style={{position:'absolute',top:12,left:12,background:'rgba(255,255,255,0.15)',backdropFilter:'blur(4px)',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:999}}>{a.category}</span>
                </div>
                <div style={{padding:'16px 18px',flex:1,display:'flex',flexDirection:'column'}}>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:15.5,fontWeight:700,color:NAVY,lineHeight:1.4,marginBottom:10,flex:1}}>{getTitle(a)}</h3>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid #F1F5FB',paddingTop:10}}>
                    <span style={{display:'flex',alignItems:'center',gap:5,color:'#94A3B8',fontSize:11}}><Calendar size={11}/>{new Date(a.created_at).toLocaleDateString(lang==='fr'?'fr-FR':'en-GB')}{a.read_time&&<span style={{marginLeft:4}}>· {a.read_time} {L.readTime}</span>}</span>
                    <span style={{color:RED,fontSize:12,fontWeight:700,display:'flex',alignItems:'center',gap:3}}>{L.readMore} <ChevronRight size={11}/></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{textAlign:'center'}}>
          <Link to="/blog" style={{display:'inline-flex',alignItems:'center',gap:7,background:NAVY,color:'#fff',textDecoration:'none',borderRadius:11,padding:'12px 26px',fontSize:14,fontWeight:700}}>
            {L.allArticles} <ChevronRight size={15}/>
          </Link>
        </div>
      </div>
    </section>
  )
}