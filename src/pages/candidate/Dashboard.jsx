import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Upload, MessageSquare,
  LogOut, Bell, ChevronRight, CheckCircle, Clock,
  XCircle, AlertCircle, User, Menu
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

const NAVY = '#1A1A1A', RED = '#C0392B', GOLD = '#C8A84B', BLUE = '#1B3E6F'

const DEST_FLAGS = { 'Allemagne':'🇩🇪', 'Malte':'🇲🇹', 'Pologne':'🇵🇱' }

const STATUS_CFG = {
  'En attente':  { color:'#F59E0B', bg:'#FEF3C7', Icon: Clock },
  'En cours':    { color:'#3B82F6', bg:'#EFF6FF', Icon: AlertCircle },
  'Validé':      { color:'#10B981', bg:'#D1FAE5', Icon: CheckCircle },
  'Rejeté':      { color:'#EF4444', bg:'#FEE2E2', Icon: XCircle },
}

const VISA_STEPS = [
  { key:'depot',    label:'Dossier déposé' },
  { key:'etude',    label:'Dossier en étude' },
  { key:'rdv',      label:'RDV consulaire' },
  { key:'decision', label:'Décision visa' },
  { key:'depart',   label:'Départ confirmé' },
]

const SECTIONS = [
  { key:'dashboard', label:'Tableau de bord', Icon: LayoutDashboard },
  { key:'documents', label:'Mes Documents',   Icon: FileText },
  { key:'messages',  label:'Messagerie',      Icon: MessageSquare },
  { key:'profile',   label:'Mon Profil',      Icon: User },
]

export default function CandidateDashboard() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const [section,   setSection]   = useState('dashboard')
  const [sideOpen,  setSideOpen]  = useState(false)
  const [docs,      setDocs]      = useState([])
  const [messages,  setMessages]  = useState([])
  const [visa,      setVisa]      = useState(null)
  const [msgInput,  setMsgInput]  = useState('')
  const [uploading, setUploading] = useState(false)
  const [unread,    setUnread]    = useState(0)

  useEffect(() => {
    if (!user) { navigate('/candidate/auth'); return }
    fetchAll()
  }, [user])

  async function fetchAll() {
    const [d, m, v] = await Promise.all([
      supabase.from('documents').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('messages').select('*').eq('candidate_id', user.id).order('created_at', { ascending: true }),
      supabase.from('visa_dossiers').select('*').eq('candidate_id', user.id).eq('archived', false).maybeSingle(),
    ])
    setDocs(d.data || [])
    setMessages(m.data || [])
    setVisa(v.data || null)
    setUnread((m.data || []).filter(msg => msg.sender === 'admin' && !msg.read).length)
  }

  async function uploadDoc(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const ext  = file.name.split('.').pop()
      const path = `${user.id}/${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from('documents').upload(path, file)
      if (upErr) throw upErr
      await supabase.from('documents').insert({
        user_id: user.id, name: file.name,
        path, status: 'En attente', size: file.size,
      })
      fetchAll()
    } catch(err) { alert('Erreur upload : ' + err.message) }
    finally { setUploading(false) }
  }

  async function sendMsg() {
    if (!msgInput.trim()) return
    await supabase.from('messages').insert({
      candidate_id: user.id, sender: 'candidate',
      content: msgInput, read: false,
    })
    setMsgInput('')
    fetchAll()
  }

  const handleLogout = async () => { await signOut(); navigate('/') }

  const StatusBadge = ({ status }) => {
    const cfg = STATUS_CFG[status] || STATUS_CFG['En attente']
    return (
      <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:cfg.bg, color:cfg.color, borderRadius:20, padding:'4px 10px', fontSize:12, fontWeight:600 }}>
        <cfg.Icon size={12}/> {status}
      </span>
    )
  }

  const currentStepIdx = VISA_STEPS.findIndex(s => s.key === visa?.step) ?? 0

  // ── TABLEAU DE BORD ────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:NAVY, marginBottom:6 }}>
        Bonjour, {profile?.full_name?.split(' ')[0] || 'Candidat'} 👋
      </h2>
      <p style={{ color:'#64748B', marginBottom:24 }}>Voici l'état de votre dossier de mobilité internationale.</p>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {/* Statut dossier */}
        <div style={{ background:'#fff', borderRadius:14, padding:'18px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #F1F5FB' }}>
          <p style={{ color:'#64748B', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Statut dossier</p>
          <p style={{ color:BLUE, fontSize:15, fontWeight:700 }}>{profile?.dossier_status || 'En attente'}</p>
        </div>

        {/* Documents — affichage conditionnel */}
        <div style={{ background:'#fff', borderRadius:14, padding:'18px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #F1F5FB' }}>
          <p style={{ color:'#64748B', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Documents</p>
          {docs.length === 0
            ? <p style={{ color:'#94A3B8', fontSize:14, fontStyle:'italic' }}>Aucun document soumis</p>
            : docs.filter(d => d.status === 'Validé').length === 0
              ? <p style={{ color:AMBER, fontSize:14, fontWeight:700 }}>En attente de validation</p>
              : <p style={{ color:GREEN, fontSize:15, fontWeight:700 }}>{docs.filter(d=>d.status==='Validé').length}/{docs.length} validé{docs.filter(d=>d.status==='Validé').length > 1 ? 's' : ''}</p>
          }
        </div>

        {/* Destination */}
        <div style={{ background:'#fff', borderRadius:14, padding:'18px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #F1F5FB' }}>
          <p style={{ color:'#64748B', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Destination</p>
          <p style={{ color:RED, fontSize:15, fontWeight:700 }}>
            {profile?.destination ? `${DEST_FLAGS[profile.destination] || '🌍'} ${profile.destination}` : '—'}
          </p>
        </div>
      </div>

      {/* Progression visa */}
      <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #F1F5FB', marginBottom:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:NAVY, marginBottom:18 }}>Progression du dossier</h3>
        {visa ? (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {VISA_STEPS.map((step, i) => {
              const done = i < currentStepIdx
              const current = i === currentStepIdx
              return (
                <div key={step.key} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background: done ? '#10B981' : current ? RED : '#E2E8F0', color: done||current ? '#fff' : '#94A3B8', fontSize:12, fontWeight:700 }}>
                    {done ? '✓' : i+1}
                  </div>
                  <p style={{ fontSize:14, fontWeight:current?700:500, color:done?'#10B981':current?RED:'#94A3B8' }}>{step.label}</p>
                  {current && <span style={{ background:'#FEF2F2', color:RED, fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:20, marginLeft:'auto' }}>En cours</span>}
                </div>
              )
            })}
          </div>
        ) : (
          <p style={{ color:'#94A3B8', fontSize:14 }}>Aucun dossier visa en cours. Contactez Reisetür 237 pour démarrer votre accompagnement.</p>
        )}
      </div>

      {/* Actions rapides */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {[
          { label:'Uploader un document', action:()=>setSection('documents'), color:BLUE },
          { label:'Envoyer un message',   action:()=>setSection('messages'),  color:RED },
        ].map(({ label, action, color }) => (
          <button key={label} onClick={action} style={{ background:'#fff', border:`2px solid ${color}`, borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', color, fontSize:14, fontWeight:700 }}>
            {label} <ChevronRight size={16}/>
          </button>
        ))}
      </div>
    </div>
  )

  // ── DOCUMENTS ─────────────────────────────────────────────────────────────
  const renderDocuments = () => (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:NAVY }}>Mes Documents</h2>
        <label style={{ background:RED, color:'#fff', borderRadius:10, padding:'9px 16px', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          <Upload size={14}/> {uploading ? 'Envoi...' : 'Ajouter'}
          <input type="file" style={{ display:'none' }} onChange={uploadDoc} accept=".pdf,.jpg,.jpeg,.png" disabled={uploading}/>
        </label>
      </div>
      {docs.length === 0 ? (
        <div style={{ background:'#fff', borderRadius:16, padding:'48px', textAlign:'center', color:'#94A3B8', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          <FileText size={36} style={{ marginBottom:12, opacity:.3 }}/>
          <p>Aucun document déposé.<br/>Ajoutez vos pièces (CNI, diplômes, photos...)</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {docs.map(doc => (
            <div key={doc.id} style={{ background:'#fff', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 1px 8px rgba(0,0,0,0.05)', border:'1px solid #F1F5FB' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <FileText size={16} color={BLUE}/>
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:NAVY }}>{doc.name}</p>
                  <p style={{ fontSize:11, color:'#94A3B8' }}>{(doc.size/1024).toFixed(0)} Ko • {new Date(doc.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <StatusBadge status={doc.status}/>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // ── MESSAGERIE ─────────────────────────────────────────────────────────────
  const renderMessages = () => (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 160px)' }}>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:NAVY, marginBottom:16 }}>Messagerie</h2>
      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:10, background:'#F7F8FC', borderRadius:16, padding:16, marginBottom:12 }}>
        {messages.length === 0 ? (
          <p style={{ textAlign:'center', color:'#94A3B8', fontSize:14, marginTop:40 }}>Aucun message. Démarrez la conversation avec l'équipe Reisetür 237.</p>
        ) : messages.map(msg => (
          <div key={msg.id} style={{ display:'flex', justifyContent:msg.sender==='candidate'?'flex-end':'flex-start' }}>
            {msg.sender === 'admin' && (
              <div style={{ width:28, height:28, borderRadius:'50%', background:NAVY, display:'flex', alignItems:'center', justifyContent:'center', color:GOLD, fontSize:10, fontWeight:700, marginRight:8, flexShrink:0 }}>R</div>
            )}
            <div style={{ maxWidth:'75%', borderRadius:msg.sender==='candidate'?'16px 16px 4px 16px':'16px 16px 16px 4px', padding:'10px 14px', fontSize:13, lineHeight:1.5, background:msg.sender==='candidate'?RED:'#fff', color:msg.sender==='candidate'?'#fff':NAVY, boxShadow:'0 1px 6px rgba(0,0,0,0.08)' }}>
              {msg.content}
              <div style={{ fontSize:10, marginTop:4, opacity:.6 }}>{new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' })}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:10 }}>
        <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()}
          placeholder="Écrire un message..."
          style={{ flex:1, border:'1.5px solid #E2E8F0', borderRadius:10, padding:'11px 14px', fontSize:14, outline:'none', fontFamily:'inherit' }}/>
        <button onClick={sendMsg} style={{ background:RED, color:'#fff', border:'none', borderRadius:10, padding:'11px 18px', fontSize:14, fontWeight:700, cursor:'pointer' }}>Envoyer</button>
      </div>
    </div>
  )

  // ── PROFIL ──────────────────────────────────────────────────────────────────
  const renderProfile = () => (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:NAVY, marginBottom:20 }}>Mon Profil</h2>
      <div style={{ background:'#fff', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #F1F5FB' }}>
        {[
          { label:'Nom complet',   value: profile?.full_name },
          { label:'Email',         value: user?.email },
          { label:'Téléphone',     value: profile?.phone || '—' },
          { label:'Destination',   value: profile?.destination ? `${DEST_FLAGS[profile.destination]||'🌍'} ${profile.destination}` : '—' },
          { label:'Statut',        value: <StatusBadge status={profile?.dossier_status || 'En attente'}/> },
          { label:'Membre depuis', value: user ? new Date(user.created_at).toLocaleDateString('fr-FR') : '—' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 0', borderBottom:'1px solid #F1F5FB' }}>
            <span style={{ color:'#64748B', fontSize:14 }}>{label}</span>
            <span style={{ color:NAVY, fontSize:14, fontWeight:600 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const RENDERS = { dashboard:renderDashboard, documents:renderDocuments, messages:renderMessages, profile:renderProfile }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F7F8FC', fontFamily:"'DM Sans',sans-serif" }}>

      {/* Sidebar */}
      <div style={{ width:240, background:'#fff', borderRight:'1px solid #F1F5FB', display:'flex', flexDirection:'column', padding:'24px 0', position:'sticky', top:0, height:'100vh', flexShrink:0 }}>
        <div style={{ padding:'0 20px', marginBottom:28 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:20, color:NAVY }}>
            REISET<span style={{ color:GOLD }}>Ü</span>R <span style={{ color:RED }}>237</span>
          </div>
          <p style={{ color:'#64748B', fontSize:12, marginTop:2 }}>Espace Candidat</p>
        </div>
        <nav style={{ flex:1, padding:'0 12px' }}>
          {SECTIONS.map(({ key, label, Icon }) => (
            <button key={key} onClick={()=>setSection(key)}
              style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'11px 14px', borderRadius:10, border:'none', cursor:'pointer', marginBottom:4, background:section===key?RED:'transparent', color:section===key?'#fff':'#64748B', fontSize:14, fontWeight:section===key?700:500, textAlign:'left', transition:'all .15s', position:'relative' }}>
              <Icon size={16}/> {label}
              {key==='messages' && unread>0 && (
                <span style={{ position:'absolute', right:12, background:RED, color:'#fff', borderRadius:'50%', width:18, height:18, fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{unread}</span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 20px', borderTop:'1px solid #F1F5FB' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:34, height:34, borderRadius:'50%', background:RED, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>
              {profile?.full_name?.[0] || 'C'}
            </div>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color:NAVY }}>{profile?.full_name || 'Candidat'}</p>
              <p style={{ fontSize:11, color:'#94A3B8' }}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width:'100%', display:'flex', alignItems:'center', gap:8, padding:'9px 14px', borderRadius:8, border:'1px solid #F1F5FB', background:'#fff', cursor:'pointer', color:'#64748B', fontSize:13, fontWeight:600 }}>
            <LogOut size={14}/> Se déconnecter
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        <div style={{ background:'#fff', borderBottom:'1px solid #F1F5FB', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50 }}>
          <h1 style={{ fontSize:16, fontWeight:700, color:NAVY }}>{SECTIONS.find(s=>s.key===section)?.label}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link to="/" style={{ color:'#64748B', fontSize:13, textDecoration:'none' }}>← Site</Link>
          </div>
        </div>
        <div style={{ flex:1, padding:24, maxWidth:800, width:'100%', margin:'0 auto' }}>
          {(RENDERS[section] || renderDashboard)()}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button:hover{opacity:.88;}
      `}</style>
    </div>
  )
}
