import { Link } from 'react-router-dom'
import SEOHead from '../../components/seo/SEOHead'

const NAVY='#1A1A1A', GOLD='#C8A84B', RED='#C0392B'
const S = { section:{ marginBottom:36 }, h2:{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:NAVY, marginBottom:12, borderLeft:`3px solid ${GOLD}`, paddingLeft:14 }, p:{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:10 } }

export default function CGV() {
  return (
    <>
      <SEOHead />
      <div style={{ paddingTop:62, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ background:`linear-gradient(135deg,${NAVY},#2a0707)`, padding:'52px 32px 44px', textAlign:'center' }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(24px,4vw,38px)', fontWeight:700, color:'#fff', marginBottom:10 }}>Conditions Générales de Vente</h1>
          <div style={{ width:46, height:4, background:GOLD, borderRadius:2, margin:'0 auto 10px' }}/>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>En vigueur au 1er janvier 2026</p>
        </div>

        <div style={{ maxWidth:860, margin:'0 auto', padding:'56px 28px' }}>

          <div style={S.section}>
            <h2 style={S.h2}>Article 1 — Objet</h2>
            <p style={S.p}>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>Reisetür 237</strong> (ci-après "le Prestataire") et toute personne physique souhaitant bénéficier de ses services (ci-après "le Client").</p>
            <p style={S.p}>Reisetür 237 propose des services d'accompagnement à la mobilité internationale : formation linguistique en langue allemande, orientation académique et professionnelle, assistance dans les procédures de visa et d'admission, et suivi post-départ.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 2 — Services proposés</h2>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {[
                'Formation en langue allemande (niveaux A1 à C1)',
                'Préparation aux examens de certification linguistique',
                'Conseil et orientation académique',
                'Constitution et suivi de dossier de candidature',
                'Accompagnement dans les procédures consulaires (visa)',
                'Assistance à l\'intégration et au logement',
              ].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 3 — Commande et formation du contrat</h2>
            <p style={S.p}>La souscription à un service s'effectue par :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Soumission du formulaire de candidature sur le site','Confirmation écrite (email ou message WhatsApp) par Reisetür 237','Paiement total ou partiel des frais convenus'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
            <p style={S.p}>Le contrat est réputé conclu à la date de réception du paiement confirmé par Reisetür 237.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 4 — Tarifs</h2>
            <p style={S.p}>Les tarifs des services sont communiqués sur devis, en fonction du profil du candidat, de la destination visée et des services souscrits. Les prix sont exprimés en Francs CFA (XAF) ou en Euros (€) selon accord préalable.</p>
            <p style={S.p}>Reisetür 237 se réserve le droit de modifier ses tarifs à tout moment. Les tarifs applicables sont ceux en vigueur au moment de la confirmation de commande.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 5 — Modalités de paiement</h2>
            <p style={S.p}>Le paiement s'effectue par :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Mobile Money (MTN Mobile Money ou Orange Money)','Virement bancaire','Espèces (remise en main propre à l\'agence)'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
            <p style={S.p}>Un acompte de <strong>50% minimum</strong> est généralement requis au démarrage des services. Le solde est exigible selon l'échéancier convenu avec le Client.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 6 — Obligations du Prestataire</h2>
            <p style={S.p}>Reisetür 237 s'engage à :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Fournir les services convenus avec sérieux et professionnalisme','Informer le Client de l\'avancement de son dossier','Répondre aux demandes dans un délai raisonnable (48h ouvrées)','Maintenir la confidentialité des informations du Client'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
            <p style={S.p}><strong>Important :</strong> Reisetür 237 est un prestataire d'accompagnement. L'obtention d'un visa, d'une admission ou d'un contrat d'Ausbildung ne peut être garantie, ces décisions relevant exclusivement des autorités consulaires et des établissements partenaires.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 7 — Obligations du Client</h2>
            <p style={S.p}>Le Client s'engage à :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Fournir des informations exactes et complètes','Transmettre les documents demandés dans les délais convenus','Régler les sommes dues aux échéances convenues','Informer Reisetür 237 de tout changement de situation'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 8 — Annulation et remboursement</h2>
            <p style={S.p}>En cas d'annulation par le Client :</p>
            <ul style={{ paddingLeft:22, marginBottom:10 }}>
              {['Avant le démarrage des services : remboursement intégral de l\'acompte','Après démarrage des services : les frais engagés (formation, constitution de dossier) restent dus','En cas de refus de visa : les frais d\'accompagnement ne sont pas remboursables, les frais de visa consulaires non plus'].map(item => (
                <li key={item} style={{ color:'#374151', fontSize:15, lineHeight:1.8, marginBottom:6 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 9 — Responsabilité</h2>
            <p style={S.p}>La responsabilité de Reisetür 237 est limitée au montant des sommes effectivement versées par le Client pour le service concerné. Reisetür 237 ne peut être tenu responsable des décisions des autorités consulaires, universitaires ou de tout tiers intervenant dans le processus de mobilité.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 10 — Propriété intellectuelle</h2>
            <p style={S.p}>Les documents produits par Reisetür 237 (CV, lettres de motivation, traductions) sont fournis exclusivement au Client pour son usage personnel dans le cadre de sa candidature. Toute reproduction ou utilisation commerciale est interdite sans autorisation écrite.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 11 — Règlement des litiges</h2>
            <p style={S.p}>En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, tout litige sera soumis aux juridictions compétentes de Yaoundé, Cameroun, et régi par le droit camerounais.</p>
          </div>

          <div style={S.section}>
            <h2 style={S.h2}>Article 12 — Contact</h2>
            <p style={S.p}>Pour toute question relative aux présentes CGV :<br/><strong>reisetur237@gmail.com</strong> — <strong>+237 620 107 489</strong></p>
          </div>

          <div style={{ marginTop:40, textAlign:'center' }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:6, color:RED, textDecoration:'none', fontSize:14, fontWeight:600 }}>← Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </>
  )
}
