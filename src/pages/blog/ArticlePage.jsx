import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import SEOHead from '../../components/seo/SEOHead'
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react'
import { ALL_ARTICLES } from './BlogPage'

const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'

function renderMd(text) {
  if (!text) return ''
  return text
    .replace(/^## (.+)$/gm, `<h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:${NAVY};margin:28px 0 12px;line-height:1.3">$1</h2>`)
    .replace(/^### (.+)$/gm, `<h3 style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:${NAVY};margin:20px 0 8px">$1</h3>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#64748B">$1</em>')
    .replace(/^- (.+)$/gm, `<li style="margin-bottom:7px;padding-left:4px;color:#374151">$1</li>`)
    .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, `<ul style="margin:14px 0;padding-left:22px;list-style:disc">$&</ul>`)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim() !== '')
      return '<tr>' + cells.map(c => `<td style="padding:8px 12px;border:1px solid #E2E8F0;font-size:13.5px">${c.trim()}</td>`).join('') + '</tr>'
    })
    .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, `<table style="width:100%;border-collapse:collapse;margin:16px 0">$&</table>`)
    .replace(/^---$/gm, `<hr style="border:none;border-top:1.5px solid #F1F5FB;margin:24px 0">`)
    .replace(/\n\n/g, `</p><p style="margin-bottom:16px;color:#374151;line-height:1.8;font-size:15.5px">`)
}

export default function ArticlePage() {
  const { slug } = useParams()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language?.slice(0,2) || 'fr'
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Chercher dans les articles locaux d'abord
    const local = ALL_ARTICLES.find(a => a.slug === slug || a.id === slug)
    if (local) { setArticle(local); setLoading(false); return }
    // Puis Supabase
    supabase.from('articles').select('*').eq('published',true).or(`slug.eq.${slug},id.eq.${slug}`).single()
      .then(({ data }) => {
        if (data) setArticle(data)
        else navigate('/blog')
        setLoading(false)
      })
  }, [slug])

  const getTitle   = a => a[`title_${lang}`]   || a.title_fr   || ''
  const getContent = a => a[`content_${lang}`] || a.content_fr || ''

  const related = ALL_ARTICLES.filter(a => a.id !== article?.id && a.category === article?.category).slice(0,3)

  const L = {
    fr: { back:'Retour au blog', readMore:'Lire la suite', readTime:'min de lecture', related:'Articles similaires', cta:'Déposer ma candidature' },
    de: { back:'Zurück zum Blog', readMore:'Weiterlesen', readTime:'Min. Lesezeit', related:'Ähnliche Artikel', cta:'Bewerbung einreichen' },
    en: { back:'Back to blog', readMore:'Read more', readTime:'min read', related:'Related articles', cta:'Submit my application' },
  }[lang] || { back:'Retour', readMore:'Lire', readTime:'min', related:'Voir aussi', cta:'Candidature' }

  if (loading) return <div style={{ paddingTop:100, textAlign:'center', color:'#94A3B8', fontFamily:"'DM Sans',sans-serif" }}>Chargement...</div>
  if (!article) return null

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop:62, fontFamily:"'DM Sans',sans-serif" }}>
        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, padding:'50px 32px 42px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize:'50px 50px' }}/>
          <div style={{ maxWidth:780, margin:'0 auto' }}>
            <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.5)', fontSize:13, fontWeight:600, textDecoration:'none', marginBottom:18 }}>
              <ArrowLeft size={14} /> {L.back}
            </Link>
            <div style={{ marginBottom:12 }}>
              <span style={{ background:'rgba(200,168,75,0.2)', color:GOLD, fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:999 }}>{article.category}</span>
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(20px,4vw,36px)', fontWeight:700, color:'#fff', lineHeight:1.3, marginBottom:16 }}>{getTitle(article)}</h1>
            <div style={{ display:'flex', alignItems:'center', gap:18, color:'rgba(255,255,255,0.45)', fontSize:13 }}>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}>
                <Calendar size={12} />
                {new Date(article.created_at).toLocaleDateString(lang==='fr'?'fr-FR':lang==='de'?'de-DE':'en-GB',{day:'numeric',month:'long',year:'numeric'})}
              </span>
              {article.read_time && <span style={{ display:'flex', alignItems:'center', gap:5 }}><Clock size={12} />{article.read_time} {L.readTime}</span>}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div style={{ maxWidth:780, margin:'0 auto', padding:'48px 28px' }}>
          <div
            style={{ fontSize:15.5, lineHeight:1.8, color:'#374151' }}
            dangerouslySetInnerHTML={{ __html: `<p style="margin-bottom:16px;color:#374151;line-height:1.8;font-size:15.5px">${renderMd(getContent(article))}</p>` }}
          />

          {/* CTA */}
          <div style={{ background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, borderRadius:16, padding:'28px 32px', marginTop:40, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div>
              <p style={{ color:GOLD, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', marginBottom:6 }}>Reisetür 237</p>
              <p style={{ color:'#fff', fontSize:16, fontWeight:600 }}>
                {lang==='fr'?'Prêt à démarrer votre projet ?':lang==='de'?'Bereit, Ihr Projekt zu starten?':'Ready to start your project?'}
              </p>
            </div>
            <Link to="/contact" style={{ background:RED, color:'#fff', textDecoration:'none', borderRadius:10, padding:'12px 24px', fontSize:14, fontWeight:700, boxShadow:'0 4px 16px rgba(192,57,43,0.38)', display:'inline-flex', alignItems:'center', gap:6, whiteSpace:'nowrap' }}>
              {L.cta} →
            </Link>
          </div>

          {/* Articles liés */}
          {related.length > 0 && (
            <div style={{ marginTop:44 }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:NAVY, marginBottom:18 }}>{L.related}</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:14 }}>
                {related.map(a => (
                  <Link key={a.id} to={`/blog/${a.slug||a.id}`} style={{ textDecoration:'none' }}>
                    <div style={{ background:'#fff', borderRadius:13, padding:'16px 18px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', border:'1.5px solid #F1F5FB' }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.08em' }}>{a.category}</span>
                      <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:14, color:NAVY, margin:'7px 0 9px', lineHeight:1.4 }}>{a[`title_${lang}`]||a.title_fr}</h4>
                      <span style={{ color:RED, fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>{L.readMore} <ChevronRight size={11}/></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
