import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, CheckCircle, XCircle, Clock, Send, FileText, MessageSquare, User, Globe2 } from 'lucide-react'

const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B',BLUE='#1B3E6F'
const GREEN='#10B981',AMBER='#F59E0B'

const STATUTS=['En attente','En cours','Validé','Rejeté','Archivé']
const VISA_STEPS=[{key:'depot',label:'Dossier déposé'},{key:'etude',label:'Dossier en étude'},{key:'rdv',label:'RDV consulaire'},{key:'decision',label:'Décision visa'},{key:'depart',label:'Départ confirmé'}]

export default function CandidateDetail({ candidate, onBack }) {
  const [tab, setTab] = useState('profil')
  const [docs, setDocs] = useState([])
  const [messages, setMessages] = useState([])
  const [visa, setVisa] = useState(null)
  const [msgInput, setMsgInput] = useState('')
  const [status, setStatus] = useState(candidate?.dossier_status || 'En attente')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchAll() }, [candidate])

  async function fetchAll() {
    if (!candidate?.id) return
    const [d, m, v] = await Promise.all([
      supabase.from('documents').select('*').eq('user_id', candidate.id).order('created_at', { ascending: false }),
      supabase.from('messages').select('*').eq('candidate_id', candidate.id).order('created_at', { ascending: true }),
      supabase.from('visa_dossiers').select('*').eq('candidate_id', candidate.id).eq('archived', false).maybeSingle(),
    ])
    setDocs(d.data || [])
    setMessages(m.data || [])
    setVisa(v.data || null)
    // Marquer messages candidat comme lus
    await supabase.from('messages').update({ read: true }).eq('candidate_id', candidate.id).eq('sender', 'candidate')
  }

  async function updateStatus(newStatus) {
    setStatus(newStatus)
    setSaving(true)
    await supabase.from('profiles').update({ dossier_status: newStatus }).eq('id', candidate.id)
    setSaving(false)
  }

  async function updateDoc(docId, newStatus) {
    await supabase.from('documents').update({ status: newStatus }).eq('id', docId)
    fetchAll()
  }

  async function sendMsg() {
    if (!msgInput.trim()) return
    await supabase.from('messages').insert({ candidate_id: candidate.id, sender: 'admin', content: msgInput, read: false })
    setMsgInput('')
    fetchAll()
  }

  async function updateVisaStep(step) {
    if (visa) {
      await supabase.from('visa_dossiers').update({ step }).eq('id', visa.id)
    } else {
      await supabase.from('visa_dossiers').insert({ candidate_id: candidate.id, step, archived: false })
    }
    fetchAll()
  }

  const TABS = [
    { key:'profil',    label:'Profil',    Icon:User },
    { key:'documents', label:`Docs (${docs.length})`, Icon:FileText },
    { key:'messages',  label:`Messages (${messages.filter(m=>m.sender==='candidate'&&!m.read).length} non lus)`, Icon:MessageSquare },
    { key:'visa',      label:'Visa',      Icon:Globe2 },
  ]

  const statusColor = { 'En attente':AMBER, 'En cours':BLUE, 'Validé':GREEN, 'Rejeté':RED, 'Archivé':'#94A3B8' }

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
        <button onClick={onBack} style={{ background:'#F1F5FB', border:'none', borderRadius:10, padding:'9px 14px', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:NAVY }}>
          <ArrowLeft size={15}/> Retour
        </button>
        <div style={{ flex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:NAVY }}>{candidate?.full_name}</h2>
          <p style={{ color:'#64748B', fontSize:13 }}>{candidate?.email} · {candidate?.destination || 'Destination non renseignée'}</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <select value={status} onChange={e=>updateStatus(e.target.value)}
            style={{ border:`2px solid ${statusColor[status]}`, color:statusColor[status], borderRadius:9, padding:'7px 12px', fontSize:13, fontWeight:700, background:'#fff', cursor:'pointer' }}>
            {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {saving && <span style={{ fontSize:12, color:'#94A3B8' }}>Sauvegarde...</span>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:20, borderBottom:'2px solid #F1F5FB', paddingBottom:0 }}>
        {TABS.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 16px', border:'none', background:'none', cursor:'pointer', fontSize:13.5, fontWeight:tab===key?700:500, color:tab===key?RED:'#64748B', borderBottom:tab===key?`2px solid ${RED}`:'2px solid transparent', marginBottom:-2 }}>
            <Icon size={14}/> {label}
          </button>
        ))}
      </div>

      {/* ── PROFIL ── */}
      {tab === 'profil' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {[
            ['Nom complet', candidate?.full_name],
            ['Email', candidate?.email],
            ['Téléphone', candidate?.phone || '—'],
            ['Destination', candidate?.destination || '—'],
            ['Programme', candidate?.program || '—'],
            ['Membre depuis', candidate?.created_at ? new Date(candidate.created_at).toLocaleDateString('fr-FR') : '—'],
          ].map(([label, value]) => (
            <div key={label} style={{ background:'#fff', borderRadius:12, padding:'16px', boxShadow:'0 1px 8px rgba(0,0,0,0.05)', border:'1px solid #F1F5FB' }}>
              <p style={{ color:'#94A3B8', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>{label}</p>
              <p style={{ color:NAVY, fontSize:14, fontWeight:600 }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── DOCUMENTS ── */}
      {tab === 'documents' && (
        <div>
          {docs.length === 0
            ? <p style={{ color:'#94A3B8', textAlign:'center', padding:'40px', fontSize:14 }}>Aucun document déposé par ce candidat.</p>
            : docs.map(doc => (
              <div key={doc.id} style={{ background:'#fff', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 1px 8px rgba(0,0,0,0.05)', border:'1px solid #F1F5FB', marginBottom:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <FileText size={16} color={BLUE}/>
                  </div>
                  <div>
                    <p style={{ fontSize:13.5, fontWeight:600, color:NAVY }}>{doc.name}</p>
                    <p style={{ fontSize:11, color:'#94A3B8' }}>{new Date(doc.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:12, fontWeight:600, color: doc.status==='Validé'?GREEN:doc.status==='Rejeté'?RED:AMBER, background: doc.status==='Validé'?'#D1FAE5':doc.status==='Rejeté'?'#FEE2E2':'#FEF3C7', padding:'3px 10px', borderRadius:20 }}>
                    {doc.status}
                  </span>
                  {doc.status !== 'Validé' && (
                    <button onClick={() => updateDoc(doc.id, 'Validé')} style={{ background:GREEN, color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                      <CheckCircle size={13}/> Valider
                    </button>
                  )}
                  {doc.status !== 'Rejeté' && (
                    <button onClick={() => updateDoc(doc.id, 'Rejeté')} style={{ background:RED, color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                      <XCircle size={13}/> Rejeter
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ── MESSAGES ── */}
      {tab === 'messages' && (
        <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 300px)' }}>
          <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, background:'#F7F8FC', borderRadius:14, padding:14, marginBottom:12 }}>
            {messages.length === 0
              ? <p style={{ textAlign:'center', color:'#94A3B8', fontSize:13.5, marginTop:30 }}>Aucun message avec ce candidat.</p>
              : messages.map(msg => (
                <div key={msg.id} style={{ display:'flex', justifyContent: msg.sender==='admin'?'flex-end':'flex-start' }}>
                  {msg.sender==='candidate' && (
                    <div style={{ width:28, height:28, borderRadius:'50%', background:RED, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:10, fontWeight:700, marginRight:8, flexShrink:0 }}>
                      {candidate?.full_name?.[0] || 'C'}
                    </div>
                  )}
                  <div style={{ maxWidth:'70%', borderRadius: msg.sender==='admin'?'14px 14px 4px 14px':'14px 14px 14px 4px', padding:'10px 14px', fontSize:13, lineHeight:1.5, background: msg.sender==='admin'?NAVY:'#fff', color: msg.sender==='admin'?'#fff':NAVY, boxShadow:'0 1px 6px rgba(0,0,0,0.08)' }}>
                    {msg.content}
                    <div style={{ fontSize:10, marginTop:4, opacity:.6 }}>{new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' })}</div>
                  </div>
                </div>
              ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&sendMsg()}
              placeholder={`Répondre à ${candidate?.full_name?.split(' ')[0]}...`}
              style={{ flex:1, border:'1.5px solid #E2E8F0', borderRadius:10, padding:'11px 14px', fontSize:14, outline:'none', fontFamily:'inherit' }}/>
            <button onClick={sendMsg} style={{ background:NAVY, color:'#fff', border:'none', borderRadius:10, padding:'11px 20px', fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
              <Send size={14}/> Envoyer
            </button>
          </div>
        </div>
      )}

      {/* ── VISA ── */}
      {tab === 'visa' && (
        <div>
          <div style={{ background:'#fff', borderRadius:16, padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #F1F5FB' }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:NAVY, marginBottom:20 }}>Progression du dossier visa</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {VISA_STEPS.map((step, i) => {
                const currentIdx = VISA_STEPS.findIndex(s => s.key === visa?.step)
                const done = i < currentIdx
                const current = i === currentIdx
                return (
                  <div key={step.key} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 16px', borderRadius:10, background: current?'#FEF2F2':done?'#F0FDF4':'#F7F8FC', border:`1px solid ${current?'#FCA5A5':done?'#BBF7D0':'#E2E8F0'}`, cursor:'pointer' }}
                    onClick={() => updateVisaStep(step.key)}>
                    <div style={{ width:30, height:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:done?GREEN:current?RED:'#E2E8F0', color:done||current?'#fff':'#94A3B8', fontSize:12, fontWeight:700, flexShrink:0 }}>
                      {done ? '✓' : i+1}
                    </div>
                    <p style={{ fontSize:14, fontWeight:current?700:500, color:done?GREEN:current?RED:'#64748B', flex:1 }}>{step.label}</p>
                    {current && <span style={{ fontSize:11, fontWeight:700, color:RED, background:'#FEE2E2', padding:'3px 8px', borderRadius:20 }}>Étape actuelle</span>}
                    {!current && !done && <span style={{ fontSize:11, color:'#94A3B8' }}>Cliquer pour définir</span>}
                  </div>
                )
              })}
            </div>
            {!visa && <p style={{ color:'#94A3B8', fontSize:13, marginTop:16, textAlign:'center' }}>Cliquez sur une étape pour créer le dossier visa.</p>}
          </div>
        </div>
      )}
    </div>
  )
}