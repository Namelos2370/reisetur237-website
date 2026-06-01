import { Link } from 'react-router-dom'
import SEOHead from '../../components/seo/SEOHead'

const NAVY='#1A1A1A', RED='#C0392B', GOLD='#C8A84B'
const S = { section: { marginBottom:36 }, h2: { fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:NAVY, marginBottom:12, borderLeft:`3px solid ${GOLD}`, paddingLeft:14 }, p: { color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:10 }, li: { color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6, paddingLeft:4 } }

export default function MentionsLegales() {
  return (
    <>
      <SEOHead />
      <div style={{ paddingTop:62, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, padding:'52px 32px 44px', textAlign:'center' }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(24px,4vw,38px)', fontWeight:700, color:'#fff', marginBottom:10 }}>Mentions Légales</h1>
          <div style={{ width:46, height:4, background:GOLD, borderRadius:2, margin:'0 auto' }}/>
        </div>

        <div style={{ maxWidth:860, margin:'0 auto', padding:'56px 28px' }}>

          <div style={S.section}>
            <h2 style={S.h2}>1. Éditeur du site</h2>
            <p style={S.p}><strong>Dénomination :</strong> Reisetür 237</p>
            <p style={S.p}><strong>Forme juridique :</strong> Entreprise individuelle enregistrée au Cameroun</p>
            <p style={S.p}><strong>Promoteur :</strong> Le Promoteur</p>
            <p style={S.p}><strong>Adresse :</strong> Avenue Germaine, Essos — en face de l'Hôpital de la Caisse (CNPS), Yaoundé, Cameroun</p>
            <p style={S.p}><strong>Téléphone :</strong></p>
            <p style={S.p}><strong>Email :</strong> reisetur237@gmail.com</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>2. Hébergement</h2>
            <p style={S.p}><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p style={S.p}><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p style={S.p}><strong>Site web :</strong> https://vercel.com</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>3. Propriété intellectuelle</h2>
            <p style={S.p}>L'ensemble du contenu de ce site (textes, images, logos, graphismes, icônes) est la propriété exclusive de Reisetür 237, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation non autorisée de tout ou partie du contenu est strictement interdite.</p>
            <p style={S.p}>Le logo Reisetür 237 et l'identité visuelle associée sont des créations originales protégées.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>4. Limitation de responsabilité</h2>
            <p style={S.p}>Reisetür 237 s'efforce de fournir des informations précises et à jour. Toutefois, nous ne pouvons garantir l'exactitude, l'exhaustivité ou l'actualité des informations diffusées sur ce site. En conséquence, Reisetür 237 décline toute responsabilité pour toute imprécision, inexactitude ou omission.</p>
            <p style={S.p}>Les informations relatives aux procédures d'obtention de visa sont données à titre indicatif. Les conditions consulaires peuvent évoluer. Reisetür 237 ne saurait être tenu responsable des décisions consulaires ou administratives concernant les candidats.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>5. Liens hypertextes</h2>
            <p style={S.p}>Ce site peut contenir des liens vers des sites tiers. Reisetür 237 n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>6. Droit applicable</h2>
            <p style={S.p}>Le présent site et les présentes mentions légales sont soumis au droit camerounais. Tout litige relatif à l'utilisation de ce site sera soumis à la juridiction compétente de Yaoundé, Cameroun.</p>
          </div>

          <div style={{ marginTop:40, textAlign:'center' }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:6, color:RED, textDecoration:'none', fontSize:14, fontWeight:600 }}>← Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </>
  )
}
