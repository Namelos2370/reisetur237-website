import { Link } from 'react-router-dom'
import SEOHead from '../../components/seo/SEOHead'

const NAVY='#1A1A1A', GOLD='#C8A84B', RED='#C0392B'
const S = { section:{ marginBottom:36 }, h2:{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:NAVY, marginBottom:12, borderLeft:`3px solid ${GOLD}`, paddingLeft:14 }, p:{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:10 } }

export default function PolitiqueConfidentialite() {
  return (
    <>
      <SEOHead />
      <div style={{ paddingTop:62, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, padding:'52px 32px 44px', textAlign:'center' }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(24px,4vw,38px)', fontWeight:700, color:'#fff', marginBottom:10 }}>Politique de Confidentialité</h1>
          <div style={{ width:46, height:4, background:GOLD, borderRadius:2, margin:'0 auto' }}/>
        </div>

        <div style={{ maxWidth:860, margin:'0 auto', padding:'56px 28px' }}>

          <div style={S.section}>
            <h2 style={S.h2}>1. Responsable du traitement</h2>
            <p style={S.p}>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
            <p style={S.p}><strong>Reisetür 237</strong> — Gabriel Ezéchiel Junior Fokou<br/>Avenue Germaine, Essos, Yaoundé, Cameroun<br/>Email : reisetur237@gmail.com — Tél : </p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>2. Données collectées</h2>
            <p style={S.p}>Lors de l'utilisation de ce site, Reisetür 237 peut collecter les données suivantes :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Nom et prénom','Adresse email','Numéro de téléphone','Destination visée et programme d\'études','Contenu des messages envoyés via le formulaire de contact','Données de navigation (via Google Analytics 4)'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>3. Finalités du traitement</h2>
            <p style={S.p}>Les données collectées sont utilisées pour :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Traiter les demandes de candidature et d\'information','Vous recontacter dans le cadre de nos services d\'accompagnement','Améliorer nos services via l\'analyse statistique anonymisée','Vous envoyer des informations pertinentes sur nos programmes (avec votre consentement)'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>4. Base légale</h2>
            <p style={S.p}>Le traitement de vos données repose sur :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Votre consentement (formulaire de contact, inscription)','L\'exécution d\'un contrat (accompagnement de votre dossier)','Notre intérêt légitime (amélioration de nos services)'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>5. Durée de conservation</h2>
            <p style={S.p}>Vos données personnelles sont conservées pendant <strong>3 ans</strong> à compter du dernier contact, puis supprimées ou anonymisées. Les données comptables sont conservées 10 ans conformément à la législation applicable.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>6. Partage des données</h2>
            <p style={S.p}>Reisetür 237 ne vend ni ne loue vos données personnelles à des tiers. Vos données peuvent être partagées avec :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Nos partenaires institutionnels (uniquement pour les dossiers de candidature, avec votre accord)','Nos prestataires techniques (Supabase, Vercel, EmailJS) dans le cadre strict de leurs missions','Les autorités compétentes en cas d\'obligation légale'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>7. Sécurité</h2>
            <p style={S.p}>Reisetür 237 met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Le site utilise le protocole HTTPS et les données sont stockées sur des serveurs sécurisés (Supabase — hébergement EU).</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>8. Vos droits</h2>
            <p style={S.p}>Conformément aux réglementations applicables, vous disposez des droits suivants sur vos données personnelles :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Droit d\'accès — consulter les données que nous détenons sur vous','Droit de rectification — corriger des données inexactes','Droit à l\'effacement — demander la suppression de vos données','Droit à la portabilité — recevoir vos données dans un format lisible','Droit d\'opposition — vous opposer au traitement de vos données'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
            <p style={S.p}>Pour exercer ces droits, contactez-nous à : <strong>reisetur237@gmail.com</strong></p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>9. Cookies et traceurs</h2>
            <p style={S.p}>Ce site utilise Google Analytics 4 pour mesurer l'audience de manière anonymisée. Aucun cookie publicitaire n'est utilisé. Vous pouvez désactiver Google Analytics via les paramètres de votre navigateur ou via l'extension officielle Google Analytics Opt-out.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>10. Modification de la politique</h2>
            <p style={S.p}>Reisetür 237 se réserve le droit de modifier cette politique de confidentialité à tout moment. La version en vigueur est celle publiée sur ce site. Dernière mise à jour : <strong>Mai 2026</strong>.</p>
          </div>

          <div style={{ marginTop:40, textAlign:'center' }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:6, color:RED, textDecoration:'none', fontSize:14, fontWeight:600 }}>← Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </>
  )
}
