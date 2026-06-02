import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import CandidateDetail from './CandidateDetail'
import {
  Users, FileText, CreditCard, BookOpen, Globe2,
  Newspaper, Handshake, BarChart2, Settings, LogOut,
  ChevronRight, Search, CheckCircle, XCircle, Clock,
  Plus, Trash2, Edit2, Save, X, Eye, EyeOff
} from 'lucide-react'

const NAVY = '#1A1A1A'
const RED  = '#C0392B'
const GOLD = '#C8A84B'
const BL   = '#1B3E6F'

const STATUS_COLOR = {
  'En attente': { c: '#F59E0B', bg: '#FEF3C7' },
  'En cours':   { c: '#3B82F6', bg: '#DBEAFE' },
  'Validé':     { c: '#10B981', bg: '#D1FAE5' },
  'Rejeté':     { c: '#EF4444', bg: '#FEE2E2' },
  'Échoué':     { c: '#EF4444', bg: '#FEE2E2' },
}

const MODULES = [
  { id: 'dashboard',  label: 'Tableau de bord',     icon: BarChart2 },
  { id: 'candidates', label: 'Candidats',            icon: Users },
  { id: 'documents',  label: 'Documents',            icon: FileText },
  { id: 'payments',   label: 'Paiements',            icon: CreditCard },
  { id: 'visa',       label: 'Dossiers Visa',        icon: Globe2 },
  { id: 'exams',      label: 'Formations & Examens', icon: BookOpen },
  { id: 'blog',       label: 'Blog & Contenu',       icon: Newspaper },
  { id: 'partners',   label: 'Partenaires',          icon: Handshake },
  { id: 'team',       label: 'Équipe & Rôles',       icon: Settings },
]

const ROLE_LABELS = {
  super_admin:     'Super Admin',
  admin:           'Admin',
  charged_dossier: 'Chargé de dossier',
  accountant:      'Comptable',
  editor:          'Rédacteur',
}

const VISA_STEPS = ['depot','etude','rdv','decision','depart']
const VISA_STEP_LABELS = { depot:'Dépôt', etude:'Étude', rdv:'RDV consulaire', decision:'Décision', depart:'Départ' }

// ── Composants réutilisables ──────────────────────────────────────────────────
const Tag = ({ status }) => {
  const cfg = STATUS_COLOR[status] || { c: '#64748B', bg: '#F1F5FB' }
  return <span style={{ fontSize: 11, fontWeight: 700, color: cfg.c, background: cfg.bg, padding: '3px 9px', borderRadius: 999 }}>{status}</span>
}

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
    <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: NAVY }}>{title}</h2>
        <button onClick={onClose} style={{ background: '#F1F5FB', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer' }}><X size={16} /></button>
      </div>
      {children}
    </div>
  </div>
)

const Input = ({ label, value, onChange, type='text', placeholder='', required=false }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>{label}{required && ' *'}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
      style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans',sans-serif" }} />
  </div>
)

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
      {options.map(({ value: v, label: l }) => <option key={v} value={v}>{l}</option>)}
    </select>
  </div>
)

const Textarea = ({ label, value, onChange, rows=4, placeholder='' }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
      style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: "'DM Sans',sans-serif" }} />
  </div>
)

const Btn = ({ onClick, color=RED, children, outline=false, small=false }) => (
  <button onClick={onClick} style={{
    background: outline ? 'transparent' : color,
    color: outline ? color : '#fff',
    border: outline ? `1.5px solid ${color}` : 'none',
    borderRadius: 9, padding: small ? '6px 12px' : '10px 18px',
    fontSize: small ? 12 : 13.5, fontWeight: 700, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    transition: 'all .15s',
  }}>{children}</button>
)

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div style={{ background: '#fff', borderRadius: 14, padding: '18px 22px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={20} color={color} />
    </div>
    <div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: NAVY }}>{value}</div>
      <div style={{ color: '#64748B', fontSize: 12 }}>{label}</div>
    </div>
  </div>
)

const THead = ({ cols }) => (
  <thead>
    <tr style={{ background: NAVY }}>
      {cols.map(c => <th key={c} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{c}</th>)}
    </tr>
  </thead>
)

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  
  const [tab, setTab] = useState('dashboard')

  // Data
  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [documents,  setDocuments]  = useState([])
  const [payments,   setPayments]   = useState([])
  const [visas,      setVisas]      = useState([])
  const [articles,   setArticles]   = useState([])
  const [partners,   setPartners]   = useState([])
  const [exams,      setExams]      = useState([])
  const [team,       setTeam]       = useState([])

  // UI
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('Tous')
  const [modal,   setModal]   = useState(null) // null | 'article' | 'visa' | 'partner' | 'exam' | 'team'
  const [editing, setEditing] = useState(null) // objet en cours d'édition
  const [saving,  setSaving]  = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/candidate/auth'); return }
    fetchAll()
  }, [user])

  async function fetchAll() {
    const [c, d, p, v, a, pt, ex, t] = await Promise.all([
      supabase.from('profiles').select('*').eq('role','candidate').order('created_at',{ascending:false}),
      supabase.from('documents').select('*, profiles(full_name)').order('created_at',{ascending:false}),
      supabase.from('payments').select('*, profiles(full_name)').order('created_at',{ascending:false}),
      supabase.from('visa_dossiers').select('*, profiles!visa_dossiers_candidate_id_fkey(full_name,destination)').order('created_at',{ascending:false}),
      supabase.from('articles').select('*').order('created_at',{ascending:false}),
      supabase.from('partners').select('*').order('created_at',{ascending:false}),
      supabase.from('exam_sessions').select('*').order('date',{ascending:true}),
      supabase.from('profiles').select('*').neq('role','candidate'),
    ])
    setCandidates(c.data || [])
    setDocuments(d.data  || [])
    setPayments(p.data   || [])
    setVisas(v.data      || [])
    setArticles(a.data   || [])
    setPartners(pt.data  || [])
    setExams(ex.data     || [])
    setTeam(t.data       || [])
  }

  // ── Actions CRUD ────────────────────────────────────────────────────────────
  const updateCandidateStatus = async (id, status) => { await supabase.from('profiles').update({ dossier_status: status }).eq('id', id); fetchAll() }
  const updateDocStatus       = async (id, status) => { await supabase.from('documents').update({ status }).eq('id', id); fetchAll() }
  const confirmPayment        = async (id) => { await supabase.from('payments').update({ status: 'Validé', confirmed_by: user.id }).eq('id', id); fetchAll() }
  const updateVisaStep        = async (id, step) => { await supabase.from('visa_dossiers').update({ step }).eq('id', id); fetchAll() }
  const archiveVisa           = async (id, archived) => { await supabase.from('visa_dossiers').update({ archived: !archived }).eq('id', id); fetchAll() }
  const toggleArticle         = async (id, pub) => { await supabase.from('articles').update({ published: !pub }).eq('id', id); fetchAll() }
  const togglePartner         = async (id, active) => { await supabase.from('partners').update({ active: !active }).eq('id', id); fetchAll() }
  const deleteItem            = async (table, id) => { if (!window.confirm('Confirmer la suppression ?')) return; await supabase.from(table).delete().eq('id', id); fetchAll() }

  // ── Sauvegarde article ──────────────────────────────────────────────────────
  async function saveArticle() {
    setSaving(true)
    const data = {
      title_fr: editing.title_fr, title_de: editing.title_de, title_en: editing.title_en,
      content_fr: editing.content_fr, content_de: editing.content_de, content_en: editing.content_en,
      excerpt_fr: editing.excerpt_fr, excerpt_de: editing.excerpt_de, excerpt_en: editing.excerpt_en,
      category: editing.category, published: editing.published || false,
      slug: editing.slug || editing.title_fr?.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
      author_id: user.id,
    }
    if (editing.id) await supabase.from('articles').update(data).eq('id', editing.id)
    else             await supabase.from('articles').insert(data)
    setSaving(false); setModal(null); setEditing(null); fetchAll()
  }

  // ── Sauvegarde partenaire ───────────────────────────────────────────────────
  async function savePartner() {
    setSaving(true)
    const data = { name: editing.name, country: editing.country, type: editing.type, contact_email: editing.contact_email, description: editing.description, is_active: editing.is_active ?? true }
    if (editing.id) await supabase.from('partners').update(data).eq('id', editing.id)
    else             await supabase.from('partners').insert(data)
    setSaving(false); setModal(null); setEditing(null); fetchAll()
  }

  // ── Sauvegarde session examen ───────────────────────────────────────────────
  async function saveExam() {
    setSaving(true)
    const data = { title: editing.title, level: editing.level, date: editing.date, location: editing.location, capacity: editing.capacity, price: editing.price, status: editing.status || 'Ouvert' }
    if (editing.id) await supabase.from('exam_sessions').update(data).eq('id', editing.id)
    else             await supabase.from('exam_sessions').insert(data)
    setSaving(false); setModal(null); setEditing(null); fetchAll()
  }

  // ── Sauvegarde dossier visa ─────────────────────────────────────────────────
  async function saveVisa() {
    setSaving(true)
    const data = { candidate_id: editing.candidate_id, destination: editing.destination, step: editing.step || 'depot', notes: editing.notes, archived: false }
    if (editing.id) await supabase.from('visa_dossiers').update(data).eq('id', editing.id)
    else             await supabase.from('visa_dossiers').insert(data)
    setSaving(false); setModal(null); setEditing(null); fetchAll()
  }

  // ── Créer compte admin ──────────────────────────────────────────────────────
  async function saveTeamMember() {
    setSaving(true)
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: editing.email, password: editing.password,
        user_metadata: { full_name: editing.full_name },
      })
      if (error) throw error
      await supabase.from('profiles').upsert({ id: data.user.id, full_name: editing.full_name, email: editing.email, role: editing.role, phone: editing.phone })
      setModal(null); setEditing(null); fetchAll()
    } catch(e) {
      alert('Erreur : ' + e.message)
    } finally { setSaving(false) }
  }

  async function updateTeamRole(id, role) { await supabase.from('profiles').update({ role }).eq('id', id); fetchAll() }

  const handleLogout = async () => { await signOut(); navigate('/') }

  const filteredCandidates = candidates.filter(c =>
    (filter === 'Tous' || c.dossier_status === filter) &&
    (c.full_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()))
  )

  const isSuperAdmin = profile?.role === 'super_admin'

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", background: '#F7F8FC' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 232, background: NAVY, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 }}>
        <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 18, color: '#fff' }}>
              REISET<span style={{ color: GOLD }}>Ü</span>R <span style={{ color: RED }}>237</span>
            </div>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, marginTop: 3 }}>Panneau Administrateur</p>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {MODULES.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSearch(''); setFilter('Tous') }}
              style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', background: tab === id ? RED : 'transparent', color: tab === id ? '#fff' : 'rgba(255,255,255,0.55)', border: 'none', borderRadius: 9, padding: '9px 12px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', marginBottom: 2, transition: 'all .15s', textAlign: 'left' }}>
              <Icon size={14} />{label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: BL, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, fontWeight: 700, fontSize: 13 }}>{profile?.full_name?.[0] || 'A'}</div>
            <div>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{profile?.full_name || 'Admin'}</div>
              <div style={{ color: GOLD, fontSize: 10 }}>{ROLE_LABELS[profile?.role] || 'Admin'}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: 'none', borderRadius: 7, padding: '7px 10px', fontSize: 12, cursor: 'pointer', width: '100%' }}>
            <LogOut size={12} /> Déconnexion
          </button>
        </div>
      </aside>
      <main style={{ marginLeft: 232, flex: 1, padding: '24px 28px' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: NAVY, marginBottom: 22 }}>Tableau de bord</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 26 }}>
              <StatCard label="Candidats"       value={candidates.length}                                                        icon={Users}      color="#3B82F6" bg="#DBEAFE" />
              <StatCard label="Revenus validés"  value={`${payments.filter(p=>p.status==='Validé').reduce((s,p)=>s+Number(p.amount),0).toLocaleString()} XAF`} icon={CreditCard} color="#10B981" bg="#D1FAE5" />
              <StatCard label="Documents reçus"  value={documents.length}                                                         icon={FileText}   color="#F59E0B" bg="#FEF3C7" />
              <StatCard label="Dossiers actifs"  value={visas.filter(v=>!v.archived).length}                                     icon={Globe2}     color={RED}     bg="#FEE2E2" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Derniers candidats */}
              <div style={{ background: '#fff', borderRadius: 16, padding: '22px 24px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: NAVY }}>Derniers candidats</h3>
                  <button onClick={() => setTab('candidates')} style={{ color: RED, fontSize: 12.5, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>Voir tout <ChevronRight size={13} /></button>
                onClick={() => setSelectedCandidate(c)}
                 </div>
                {candidates.slice(0,5).map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #F1F5FB' }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: NAVY }}>{c.full_name}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>{c.destination}</div>
                    </div>
                    <Tag status={c.dossier_status} />
                  </div>
                ))}
              </div>
              {/* Paiements récents */}
              <div style={{ background: '#fff', borderRadius: 16, padding: '22px 24px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: NAVY }}>Paiements récents</h3>
                  <button onClick={() => setTab('payments')} style={{ color: RED, fontSize: 12.5, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>Voir tout <ChevronRight size={13} /></button>
                </div>
                {payments.slice(0,5).map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #F1F5FB' }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: NAVY }}>{p.profiles?.full_name}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>{Number(p.amount).toLocaleString()} XAF</div>
                    </div>
                    <Tag status={p.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CANDIDATS ── */}
        {tab === "candidates" && selectedCandidate ? <CandidateDetail candidate={selectedCandidate} onBack={()=>setSelectedCandidate(null)}/> : tab === "candidates" && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: NAVY, marginBottom: 18 }}>Gestion des Candidats</h1>
            <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '8px 14px', flex: 1 }}>
                <Search size={14} color="#94A3B8" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ border: 'none', outline: 'none', fontSize: 13.5, flex: 1 }} />
              </div>
              {['Tous','En attente','En cours','Validé','Rejeté'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ background: filter===f ? NAVY : '#fff', color: filter===f ? '#fff' : '#64748B', border: '1.5px solid #E2E8F0', borderRadius: 9, padding: '8px 14px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>{f}</button>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 14px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <THead cols={['Nom','Email','Téléphone','Destination','Statut','Changer statut']} />
                <tbody>
                  {filteredCandidates.map((c,i) => (
                    <tr key={c.id} style={{ background: i%2===0?'#fff':'#F7F8FC', borderBottom: '1px solid #F1F5FB' }}>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:NAVY }}>{c.full_name}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:'#64748B' }}>{c.email}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:'#64748B' }}>{c.phone}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5 }}>{c.destination}</td>
                      <td style={{ padding:'11px 14px' }}><Tag status={c.dossier_status} /></td>
                      <td style={{ padding:'11px 14px' }}>
                          <button onClick={async()=>{if(window.confirm("Supprimer ?")){await supabase.from("profiles").delete().eq("id",c.id);fetchAll()}}} style={{background:"#EF4444",color:"#fff",border:"none",borderRadius:7,padding:"5px 8px",fontSize:11,fontWeight:700,cursor:"pointer",marginRight:4}}>Suppr</button>
                          <button onClick={()=>setSelectedCandidate(c)} style={{background:"#1B3E6F",color:"#fff",border:"none",borderRadius:7,padding:"5px 8px",fontSize:11,fontWeight:700,cursor:"pointer",marginRight:4}}>Voir</button>
                          <select onChange={e=>updateCandidateStatus(c.id,e.target.value)} value={c.dossier_status} style={{fontSize:12,border:"1px solid #E2E8F0",borderRadius:7,padding:"4px 8px",cursor:"pointer",background:"#fff"}}>
                            {["En attente","En cours","Validé","Rejeté"].map(s=><option key={s}>{s}</option>)}
                          </select>
                      </td>
                    </tr>
                  ))}
                  {filteredCandidates.length===0 && <tr><td colSpan={6} style={{ padding:'28px', textAlign:'center', color:'#94A3B8' }}>Aucun candidat trouvé.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── DOCUMENTS ── */}
        {tab === 'documents' && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: NAVY, marginBottom: 18 }}>Gestion des Documents</h1>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 14px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <THead cols={['Candidat','Document','Taille','Date','Statut','Actions']} />
                <tbody>
                  {documents.map((d,i) => (
                    <tr key={d.id} style={{ background: i%2===0?'#fff':'#F7F8FC', borderBottom: '1px solid #F1F5FB' }}>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:NAVY }}>{d.profiles?.full_name}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:'#64748B' }}>{d.name}</td>
                      <td style={{ padding:'11px 14px', fontSize:12, color:'#94A3B8' }}>{d.size?`${(d.size/1024).toFixed(0)} Ko`:'—'}</td>
                      <td style={{ padding:'11px 14px', fontSize:12, color:'#94A3B8' }}>{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                      <td style={{ padding:'11px 14px' }}><Tag status={d.status} /></td>
                      <td style={{ padding:'11px 14px', display:'flex', gap:6 }}>
                        <Btn small onClick={() => updateDocStatus(d.id,'Validé')} color="#10B981">✓ Valider</Btn>
                        <Btn small onClick={() => updateDocStatus(d.id,'Rejeté')} color="#EF4444">✗ Rejeter</Btn>
                      </td>
                    </tr>
                  ))}
                  {documents.length===0 && <tr><td colSpan={6} style={{ padding:'28px', textAlign:'center', color:'#94A3B8' }}>Aucun document reçu.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PAIEMENTS ── */}
        {tab === 'payments' && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: NAVY, marginBottom: 18 }}>Gestion des Paiements</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 22 }}>
              <StatCard label="Total validé"  value={`${payments.filter(p=>p.status==='Validé').reduce((s,p)=>s+Number(p.amount),0).toLocaleString()} XAF`} icon={CheckCircle} color="#10B981" bg="#D1FAE5" />
              <StatCard label="En attente"    value={payments.filter(p=>p.status==='En attente').length} icon={Clock}        color="#F59E0B" bg="#FEF3C7" />
              <StatCard label="Échoués"       value={payments.filter(p=>p.status==='Échoué').length}     icon={XCircle}      color="#EF4444" bg="#FEE2E2" />
            </div>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 14px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <THead cols={['Candidat','Service','Montant','Opérateur','Statut','Action']} />
                <tbody>
                  {payments.map((p,i) => (
                    <tr key={p.id} style={{ background: i%2===0?'#fff':'#F7F8FC', borderBottom: '1px solid #F1F5FB' }}>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:NAVY }}>{p.profiles?.full_name}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:'#64748B' }}>{p.service}</td>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:700, color:NAVY }}>{Number(p.amount).toLocaleString()} XAF</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5 }}>{p.operator}</td>
                      <td style={{ padding:'11px 14px' }}><Tag status={p.status} /></td>
                      <td style={{ padding:'11px 14px' }}>
                        {p.status==='En attente' && <Btn small onClick={() => confirmPayment(p.id)} color="#10B981">Confirmer</Btn>}
                      </td>
                    </tr>
                  ))}
                  {payments.length===0 && <tr><td colSpan={6} style={{ padding:'28px', textAlign:'center', color:'#94A3B8' }}>Aucun paiement.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── VISA ── */}
        {tab === 'visa' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:NAVY }}>Dossiers Visa</h1>
              <Btn onClick={() => { setEditing({ step:'depot', destination:'Allemagne' }); setModal('visa') }}><Plus size={14} /> Nouveau dossier</Btn>
            </div>
            <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 14px rgba(0,0,0,0.06)', overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <THead cols={['Candidat','Destination','Étape actuelle','Notes','Archivé','Actions']} />
                <tbody>
                  {visas.map((v,i) => (
                    <tr key={v.id} style={{ background:i%2===0?'#fff':'#F7F8FC', borderBottom:'1px solid #F1F5FB' }}>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:NAVY }}>{v.profiles?.full_name}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5 }}>{v.destination || v.profiles?.destination}</td>
                      <td style={{ padding:'11px 14px' }}>
                        <select value={v.step} onChange={e => updateVisaStep(v.id,e.target.value)} style={{ fontSize:12, border:'1px solid #E2E8F0', borderRadius:7, padding:'4px 8px', cursor:'pointer', background:'#fff' }}>
                          {VISA_STEPS.map(s => <option key={s} value={s}>{VISA_STEP_LABELS[s]}</option>)}
                        </select>
                      </td>
                      <td style={{ padding:'11px 14px', fontSize:12, color:'#64748B', maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{v.notes || '—'}</td>
                      <td style={{ padding:'11px 14px', fontSize:13 }}>{v.archived ? '✓' : '—'}</td>
                      <td style={{ padding:'11px 14px', display:'flex', gap:5 }}>
                        <Btn small outline onClick={() => { setEditing(v); setModal('visa') }} color={NAVY}><Edit2 size={12} /></Btn>
                        <Btn small onClick={() => archiveVisa(v.id, v.archived)} color={v.archived ? '#10B981' : '#F59E0B'}>{v.archived ? 'Désarchiver' : 'Archiver'}</Btn>
                      </td>
                    </tr>
                  ))}
                  {visas.length===0 && <tr><td colSpan={6} style={{ padding:'28px', textAlign:'center', color:'#94A3B8' }}>Aucun dossier visa.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── EXAMENS ── */}
        {tab === 'exams' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:NAVY }}>Formations & Examens</h1>
              <Btn onClick={() => { setEditing({ level:'A1', status:'Ouvert' }); setModal('exam') }}><Plus size={14} /> Nouvelle session</Btn>
            </div>
            <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 14px rgba(0,0,0,0.06)', overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <THead cols={['Titre','Niveau','Date','Lieu','Places','Prix','Statut','Actions']} />
                <tbody>
                  {exams.map((e,i) => (
                    <tr key={e.id} style={{ background:i%2===0?'#fff':'#F7F8FC', borderBottom:'1px solid #F1F5FB' }}>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:NAVY }}>{e.title}</td>
                      <td style={{ padding:'11px 14px' }}><span style={{ background:'#DBEAFE', color:'#1D4ED8', fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:999 }}>{e.level}</span></td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:'#64748B' }}>{e.date ? new Date(e.date).toLocaleDateString('fr-FR') : '—'}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:'#64748B' }}>{e.location}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:NAVY, fontWeight:600 }}>{e.capacity}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:NAVY }}>{e.price ? `${Number(e.price).toLocaleString()} XAF` : '—'}</td>
                      <td style={{ padding:'11px 14px' }}><Tag status={e.status || 'Ouvert'} /></td>
                      <td style={{ padding:'11px 14px', display:'flex', gap:5 }}>
                        <Btn small outline onClick={() => { setEditing(e); setModal('exam') }} color={NAVY}><Edit2 size={12} /></Btn>
                        <Btn small onClick={() => deleteItem('exam_sessions',e.id)} color="#EF4444"><Trash2 size={12} /></Btn>
                      </td>
                    </tr>
                  ))}
                  {exams.length===0 && <tr><td colSpan={8} style={{ padding:'28px', textAlign:'center', color:'#94A3B8' }}>Aucune session. Créez votre première session !</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── BLOG ── */}
        {tab === 'blog' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:NAVY }}>Blog & Contenu</h1>
              <Btn onClick={() => { setEditing({ published:false, category:'Migration' }); setModal('article') }}><Plus size={14} /> Nouvel article</Btn>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {articles.map(a => (
                <div key={a.id} style={{ background:'#fff', borderRadius:14, padding:'16px 20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:15, fontWeight:700, color:NAVY, marginBottom:3 }}>{a.title_fr || '(Sans titre)'}</div>
                    <div style={{ fontSize:12, color:'#94A3B8' }}>{a.category} • {new Date(a.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Tag status={a.published ? 'Validé' : 'En attente'} />
                    <Btn small outline onClick={() => { setEditing(a); setModal('article') }} color={NAVY}><Edit2 size={12} /> Modifier</Btn>
                    <Btn small onClick={() => toggleArticle(a.id,a.published)} color={a.published?'#F59E0B':'#10B981'}>{a.published ? <EyeOff size={12}/> : <Eye size={12}/>} {a.published?'Dépublier':'Publier'}</Btn>
                    <Btn small onClick={() => deleteItem('articles',a.id)} color="#EF4444"><Trash2 size={12} /></Btn>
                  </div>
                </div>
              ))}
              {articles.length===0 && <div style={{ background:'#fff', borderRadius:14, padding:'48px', textAlign:'center', color:'#94A3B8' }}>Aucun article. Créez votre premier article !</div>}
            </div>
          </div>
        )}

        {/* ── PARTENAIRES ── */}
        {tab === 'partners' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:NAVY }}>Partenaires</h1>
              <Btn onClick={() => { setEditing({ country:'Allemagne', active:true }); setModal('partner') }}><Plus size={14} /> Nouveau partenaire</Btn>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
              {partners.map(p => (
                <div key={p.id} style={{ background:'#fff', borderRadius:14, padding:'20px 22px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1.5px solid #F1F5FB' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:10 }}>
                    <div>
                      <div style={{ fontSize:15, fontWeight:700, color:NAVY }}>{p.name}</div>
                      <div style={{ fontSize:12, color:'#94A3B8', marginTop:2 }}>{p.country} • {p.type}</div>
                    </div>
                    <span style={{ background:p.is_active?'#D1FAE5':'#F1F5FB', color:p.is_active?'#10B981':'#94A3B8', fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:999 }}>{p.is_active?'Actif':'Inactif'}</span>
                  </div>
                  {p.contact_email && <div style={{ fontSize:12.5, color:'#64748B', marginBottom:12 }}>✉️ {p.contact_email}</div>}
                  {p.description && <div style={{ fontSize:12.5, color:'#64748B', marginBottom:14, lineHeight:1.5 }}>{p.description}</div>}
                  <div style={{ display:'flex', gap:6 }}>
                    <Btn small outline onClick={() => { setEditing(p); setModal('partner') }} color={NAVY}><Edit2 size={12} /> Modifier</Btn>
                    <Btn small onClick={() => togglePartner(p.id,p.is_active)} color={p.active?'#F59E0B':'#10B981'}>{p.is_active?'Désactiver':'Activer'}</Btn>
                    <Btn small onClick={() => deleteItem('partners',p.id)} color="#EF4444"><Trash2 size={12} /></Btn>
                  </div>
                </div>
              ))}
              {partners.length===0 && <div style={{ background:'#fff', borderRadius:14, padding:'48px', textAlign:'center', color:'#94A3B8', gridColumn:'1/-1' }}>Aucun partenaire. Ajoutez votre premier partenaire !</div>}
            </div>
          </div>
        )}

        {/* ── ÉQUIPE ── */}
        {tab === 'team' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:NAVY }}>Équipe & Rôles</h1>
              {isSuperAdmin && <Btn onClick={() => { setEditing({ role:'editor' }); setModal('team') }}><Plus size={14} /> Ajouter un membre</Btn>}
            </div>
            <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 14px rgba(0,0,0,0.06)', overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <THead cols={['Nom','Email','Téléphone','Rôle','Depuis','Actions']} />
                <tbody>
                  {team.map((m,i) => (
                    <tr key={m.id} style={{ background:i%2===0?'#fff':'#F7F8FC', borderBottom:'1px solid #F1F5FB' }}>
                      <td style={{ padding:'12px 14px', fontSize:13.5, fontWeight:600, color:NAVY }}>{m.full_name}</td>
                      <td style={{ padding:'12px 14px', fontSize:12.5, color:'#64748B' }}>{m.email}</td>
                      <td style={{ padding:'12px 14px', fontSize:12.5, color:'#64748B' }}>{m.phone || '—'}</td>
                      <td style={{ padding:'12px 14px' }}>
                        {isSuperAdmin && m.id !== user.id
                          ? <select value={m.role} onChange={e => updateTeamRole(m.id,e.target.value)} style={{ fontSize:12, border:'1px solid #E2E8F0', borderRadius:7, padding:'4px 8px', cursor:'pointer', background:'#fff' }}>
                              {Object.entries(ROLE_LABELS).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                          : <span style={{ background:m.role==='super_admin'?'#FEF3C7':'#DBEAFE', color:m.role==='super_admin'?'#D97706':'#1D4ED8', fontSize:11.5, fontWeight:700, padding:'3px 9px', borderRadius:999 }}>{ROLE_LABELS[m.role]||m.role}</span>
                        }
                      </td>
                      <td style={{ padding:'12px 14px', fontSize:12, color:'#94A3B8' }}>{new Date(m.created_at).toLocaleDateString('fr-FR')}</td>
                      <td style={{ padding:'12px 14px' }}>
                        {isSuperAdmin && m.id !== user.id && <Btn small onClick={() => deleteItem('profiles',m.id)} color="#EF4444"><Trash2 size={12} /></Btn>}
                      </td>
                    </tr>
                  ))}
                  {team.length===0 && <tr><td colSpan={6} style={{ padding:'28px', textAlign:'center', color:'#94A3B8' }}>Aucun membre.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════════════════════════════ */}

      {/* Modal Article */}
      {modal === 'article' && editing && (
        <Modal title={editing.id ? 'Modifier l\'article' : 'Nouvel article'} onClose={() => { setModal(null); setEditing(null) }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <Input label="Titre FR *" value={editing.title_fr||''} onChange={v => setEditing(p=>({...p,title_fr:v}))} required />
            <Input label="Titre DE"   value={editing.title_de||''} onChange={v => setEditing(p=>({...p,title_de:v}))} />
            <Input label="Titre EN"   value={editing.title_en||''} onChange={v => setEditing(p=>({...p,title_en:v}))} />
            <Select label="Catégorie" value={editing.category||'Migration'} onChange={v => setEditing(p=>({...p,category:v}))}
              options={[{value:'Migration',label:'Migration'},{value:'Formation',label:'Formation'},{value:'Témoignages',label:'Témoignages'},{value:'Actualités',label:'Actualités'},{value:'Visa',label:'Visa'}]} />
          </div>
          <Textarea label="Résumé FR" value={editing.excerpt_fr||''} onChange={v => setEditing(p=>({...p,excerpt_fr:v}))} rows={2} placeholder="Courte description visible dans la liste..." />
          <Textarea label="Contenu FR (Markdown)" value={editing.content_fr||''} onChange={v => setEditing(p=>({...p,content_fr:v}))} rows={8} placeholder="## Titre&#10;Contenu en Markdown..." />
          <Textarea label="Contenu DE" value={editing.content_de||''} onChange={v => setEditing(p=>({...p,content_de:v}))} rows={4} />
          <Textarea label="Contenu EN" value={editing.content_en||''} onChange={v => setEditing(p=>({...p,content_en:v}))} rows={4} />
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <input type="checkbox" id="pub" checked={editing.published||false} onChange={e => setEditing(p=>({...p,published:e.target.checked}))} />
            <label htmlFor="pub" style={{ fontSize:13.5, color:NAVY, fontWeight:600 }}>Publier immédiatement</label>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
            <Btn outline onClick={() => { setModal(null); setEditing(null) }} color="#64748B">Annuler</Btn>
            <Btn onClick={saveArticle} color={RED}><Save size={14} /> {saving ? 'Enregistrement...' : 'Enregistrer'}</Btn>
          </div>
        </Modal>
      )}

      {/* Modal Partenaire */}
      {modal === 'partner' && editing && (
        <Modal title={editing.id ? 'Modifier le partenaire' : 'Nouveau partenaire'} onClose={() => { setModal(null); setEditing(null) }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <Input label="Nom *"      value={editing.name||''}          onChange={v => setEditing(p=>({...p,name:v}))} required />
            <Select label="Pays"      value={editing.country||'Allemagne'} onChange={v => setEditing(p=>({...p,country:v}))}
              options={[{value:'Allemagne',label:'🇩🇪 Allemagne'},{value:'Malte',label:'🇲🇹 Malte'},{value:'Pologne',label:'🇵🇱 Pologne'}]} />
            <Input label="Type"       value={editing.type||''}           onChange={v => setEditing(p=>({...p,type:v}))}   placeholder="ex: Clinique, Université..." />
            <Input label="Email contact" value={editing.contact_email||''} onChange={v => setEditing(p=>({...p,contact_email:v}))} type="email" />
          </div>
          <Textarea label="Description" value={editing.description||''} onChange={v => setEditing(p=>({...p,description:v}))} rows={3} />
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <input type="checkbox" id="active" checked={editing.active!==false} onChange={e => setEditing(p=>({...p,active:e.target.checked}))} />
            <label htmlFor="active" style={{ fontSize:13.5, color:NAVY, fontWeight:600 }}>Afficher sur le site</label>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
            <Btn outline onClick={() => { setModal(null); setEditing(null) }} color="#64748B">Annuler</Btn>
            <Btn onClick={savePartner} color={RED}><Save size={14} /> {saving?'Enregistrement...':'Enregistrer'}</Btn>
          </div>
        </Modal>
      )}

      {/* Modal Session Examen */}
      {modal === 'exam' && editing && (
        <Modal title={editing.id ? 'Modifier la session' : 'Nouvelle session'} onClose={() => { setModal(null); setEditing(null) }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <Input label="Titre *"    value={editing.title||''}    onChange={v => setEditing(p=>({...p,title:v}))} required placeholder="ex: Examen B2 — Mai 2026" />
            <Select label="Niveau"    value={editing.level||'A1'}  onChange={v => setEditing(p=>({...p,level:v}))}
              options={['A1','A2','B1','B2','C1'].map(l => ({value:l,label:l}))} />
            <Input label="Date"       value={editing.date||''}     onChange={v => setEditing(p=>({...p,date:v}))} type="date" />
            <Input label="Lieu"       value={editing.location||''} onChange={v => setEditing(p=>({...p,location:v}))} placeholder="Yaoundé — Essos" />
            <Input label="Places"     value={editing.capacity||''} onChange={v => setEditing(p=>({...p,capacity:v}))} type="number" placeholder="20" />
            <Input label="Prix (XAF)" value={editing.price||''}    onChange={v => setEditing(p=>({...p,price:v}))}   type="number" placeholder="25000" />
            <Select label="Statut"    value={editing.status||'Ouvert'} onChange={v => setEditing(p=>({...p,status:v}))}
              options={[{value:'Ouvert',label:'Ouvert'},{value:'Complet',label:'Complet'},{value:'Clôturé',label:'Clôturé'}]} />
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
            <Btn outline onClick={() => { setModal(null); setEditing(null) }} color="#64748B">Annuler</Btn>
            <Btn onClick={saveExam} color={RED}><Save size={14} /> {saving?'Enregistrement...':'Enregistrer'}</Btn>
          </div>
        </Modal>
      )}

      {/* Modal Dossier Visa */}
      {modal === 'visa' && editing && (
        <Modal title={editing.id ? 'Modifier le dossier' : 'Nouveau dossier visa'} onClose={() => { setModal(null); setEditing(null) }}>
          <Select label="Candidat" value={editing.candidate_id||''} onChange={v => setEditing(p=>({...p,candidate_id:v}))}
            options={[{value:'',label:'— Choisir un candidat —'},...candidates.map(c => ({value:c.id,label:c.full_name}))]} />
          <Select label="Destination" value={editing.destination||'Allemagne'} onChange={v => setEditing(p=>({...p,destination:v}))}
            options={[{value:'Allemagne',label:'🇩🇪 Allemagne'},{value:'Malte',label:'🇲🇹 Malte'},{value:'Pologne',label:'🇵🇱 Pologne'}]} />
          <Select label="Étape actuelle" value={editing.step||'depot'} onChange={v => setEditing(p=>({...p,step:v}))}
            options={VISA_STEPS.map(s => ({value:s,label:VISA_STEP_LABELS[s]}))} />
          <Textarea label="Notes internes" value={editing.notes||''} onChange={v => setEditing(p=>({...p,notes:v}))} rows={3} placeholder="Remarques, documents manquants..." />
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
            <Btn outline onClick={() => { setModal(null); setEditing(null) }} color="#64748B">Annuler</Btn>
            <Btn onClick={saveVisa} color={RED}><Save size={14} /> {saving?'Enregistrement...':'Enregistrer'}</Btn>
          </div>
        </Modal>
      )}

      {/* Modal Membre équipe */}
      {modal === 'team' && editing && (
        <Modal title="Ajouter un membre" onClose={() => { setModal(null); setEditing(null) }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <Input label="Nom complet *" value={editing.full_name||''} onChange={v => setEditing(p=>({...p,full_name:v}))} required />
            <Input label="Email *"       value={editing.email||''}     onChange={v => setEditing(p=>({...p,email:v}))}     required type="email" />
            <Input label="Téléphone"     value={editing.phone||''}     onChange={v => setEditing(p=>({...p,phone:v}))} />
            <Select label="Rôle"         value={editing.role||'editor'} onChange={v => setEditing(p=>({...p,role:v}))}
              options={Object.entries(ROLE_LABELS).map(([v,l]) => ({value:v,label:l}))} />
          </div>
          <div style={{ position:'relative', marginBottom:14 }}>
            <Input label="Mot de passe temporaire *" value={editing.password||''} onChange={v => setEditing(p=>({...p,password:v}))} type={showPwd?'text':'password'} required />
            <button onClick={() => setShowPwd(!showPwd)} style={{ position:'absolute', right:12, top:32, background:'none', border:'none', cursor:'pointer', color:'#64748B' }}>
              {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
            </button>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
            <Btn outline onClick={() => { setModal(null); setEditing(null) }} color="#64748B">Annuler</Btn>
            <Btn onClick={saveTeamMember} color={RED}><Save size={14} /> {saving?'Création...':'Créer le compte'}</Btn>
          </div>
        </Modal>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        table { font-family: 'DM Sans', sans-serif; }
        button:hover { opacity: 0.88; }
        input:focus, select:focus, textarea:focus { border-color: #1B3E6F !important; }
      `}</style>
    </div>
  )
}
