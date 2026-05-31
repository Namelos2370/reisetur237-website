import { Link } from 'react-router-dom'
const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'
export default function NotFoundPage() {
  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", textAlign:'center', padding:32 }}>
      <div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:120, fontWeight:800, color:GOLD, lineHeight:1, marginBottom:8 }}>404</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:'#fff', marginBottom:14 }}>Page introuvable</h1>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:16, marginBottom:32, maxWidth:400, margin:'0 auto 32px' }}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:8, background:RED, color:'#fff', textDecoration:'none', borderRadius:12, padding:'14px 28px', fontSize:15, fontWeight:700, boxShadow:'0 4px 18px rgba(192,57,43,0.4)' }}>
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
