import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import { ChevronRight, Calendar } from 'lucide-react'

const NAVY = '#1A1A1A'
const RED  = '#C0392B'
const GOLD = '#C8A84B'

const DEMO = [
  { id:'1', slug:'ausbildung-pflege-cameroun-guide', title_fr:'Guide complet : Partir en Ausbildung Pflege depuis le Cameroun', title_de:'Vollständiger Leitfaden: Ausbildung Pflege aus Kamerun', title_en:'Complete Guide: Ausbildung Pflege from Cameroon', category:'Formation', created_at:'2026-05-15T10:00:00Z', read_time:8 },
  { id:'2', slug:'visa-etudiant-allemagne-documents', title_fr:'Visa étudiant Allemagne : la liste complète des documents', title_de:'Studentenvisum Deutschland: die vollständige Dokumentenliste', title_en:'Germany Student Visa: the complete document checklist', category:'Visa', created_at:'2026-05-10T10:00:00Z', read_time:6 },
  { id:'3', slug:'temoignage-marie-infirmiere-berlin', title_fr:'Témoignage : Marie, infirmière à Berlin grâce à Reisetür 237', title_de:'Erfahrungsbericht: Marie, Krankenschwester in Berlin', title_en:'Testimonial: Marie, nurse in Berlin thanks to Reisetür 237', category:'Témoignages', created_at:'2026-05-05T10:00:00Z', read_time:4 },
]

const ICONS = { 'Formation':'🎓', 'Visa':'📋', 'Témoignages':'💬', 'Migration':'✈️', 'Actualités':'📰', 'Ausbildung':'🎓', 'Erfahrungsberichte':'💬', 'Training':'🎓', 'Testimonials':'💬', 'News':'📰' }

export default function BlogPreviewSection() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0,2) || 'fr'
  const [articles, setArticles] = useState(DEMO)

  useEffect(() => {
    supabase.from('articles').select('id,slug,title_fr,title_de,title_en,category,created_at,read_time').eq('published',true).order('created_at',{ascending:false}).limit(3)
      .then(({ data }) => { if (data?.length > 0) setArticles(data) })
  }, [])

  const getTitle = a => a[`title_${lang}`] || a.title_fr || ''

  const labels = {
    fr: { badge:'Blog', title:'Dernières Actualités', sub:'Informations et guides pour votre projet de mobilité', readMore:'Lire la suite', allArticles:'Tous les articles' },
    de: { badge:'Blog', title:'Neueste Beiträge', sub:'Informationen und Leitfäden für Ihr Mobilitätsprojekt', readMore:'Weiterlesen', allArticles:'Alle Artikel' },
    en: { badge:'Blog', title:'Latest News', sub:'Information and guides for your mobility project', readMore:'Read more', allArticles:'All articles' },
  }
  const L = labels[lang] || labels['fr']

  return (
    <section style={{ padding: '80px 32px', background: '#fff' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 11 }}>{L.badge}</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 700, color: NAVY, marginBottom: 11 }}>{L.title}</h2>
          <div style={{ width: 46, height: 4, background: GOLD, borderRadius: 2, margin: '0 auto 14px' }}/>
          <p style={{ color: '#64748B', fontSize: 16 }}>{L.sub}</p>
        </div>

        {/* Grille */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginBottom: 36 }}>
          {articles.map((a, i) => (
            <Link key={a.id} to={`/blog/${a.slug || a.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 18px rgba(0,0,0,0.07)', border: '1.5px solid #F1F5FB', transition: 'all .2s', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header coloré */}
                <div style={{ background: i===0 ? `linear-gradient(135deg,${NAVY},#2a0707)` : i===1 ? `linear-gradient(135deg,#1B3E6F,#2563A8)` : `linear-gradient(135deg,${NAVY},#C0392B)`, padding: '24px 22px 18px', minHeight: 90 }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{ICONS[a.category] || '📰'}</div>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{a.category}</span>
                </div>
                {/* Contenu */}
                <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15.5, fontWeight: 700, color: NAVY, lineHeight: 1.4, marginBottom: 12, flex: 1 }}>
                    {getTitle(a)}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5FB', paddingTop: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 11.5 }}>
                      <Calendar size={11} />
                      {new Date(a.created_at).toLocaleDateString(lang==='fr'?'fr-FR':lang==='de'?'de-DE':'en-GB')}
                    </span>
                    <span style={{ color: RED, fontSize: 12.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                      {L.readMore} <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Lien tous les articles */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: NAVY, color: '#fff', textDecoration: 'none', borderRadius: 11, padding: '12px 26px', fontSize: 14, fontWeight: 700, boxShadow: '0 2px 14px rgba(0,0,0,0.15)' }}>
            {L.allArticles} <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
