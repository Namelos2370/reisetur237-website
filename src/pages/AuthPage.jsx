import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from 'lucide-react'
import { signIn, signUp } from '../lib/supabase'

const NAVY = "#1A1A1A"
const RED  = "#C0392B"
const GOLD = "#C8A84B"

export default function AuthPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [mode, setMode]       = useState('login') // 'login' | 'register'
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [form, setForm]       = useState({
    firstName: '', lastName: '', email: '', password: '', destination: '', phone: ''
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    try {
      if (mode === 'login') {
        const { data, error } = await signIn(form.email, form.password)
        if (error) throw error
        navigate('/candidate/dashboard')
      } else {
        const { data, error } = await signUp(form.email, form.password, {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          destination: form.destination,
        })
        if (error) throw error
        navigate('/candidate/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({ label, name, type = 'text', placeholder = '' }) => (
    <div>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#64748B',
        textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6 }}>{label}</label>
      <div style={{ position:'relative' }}>
        <input
          type={type === 'password' ? (showPw ? 'text' : 'password') : type}
          value={form[name]} onChange={e => set(name, e.target.value)}
          placeholder={placeholder}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:10,
            padding:'11px 14px', fontSize:14, outline:'none', boxSizing:'border-box',
            fontFamily:'inherit' }}
        />
        {type === 'password' && (
          <button onClick={() => setShowPw(!showPw)} style={{
            position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
            background:'none', border:'none', cursor:'pointer', color:'#64748B'
          }}>
            {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0d0d0d,#1a1a1a,#2a0707)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"'DM Sans',sans-serif" }}>

      <div style={{ width:'100%', maxWidth:440 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <Link to="/" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.5)" />
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:13 }}>Retour au site</span>
          </Link>
          <div style={{ marginTop:16 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:26, color:'#fff' }}>
              REISETÜR <span style={{ color:GOLD }}>237</span>
            </div>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:13, marginTop:4 }}>
              {mode === 'login' ? 'Connectez-vous à votre espace' : 'Créez votre espace candidat'}
            </p>
          </div>
        </div>

        {/* Card */}
        <div style={{ background:'#fff', borderRadius:20, padding:32, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>

          {/* Tabs */}
          <div style={{ display:'flex', background:'#F7F8FC', borderRadius:10, padding:4, marginBottom:24, gap:4 }}>
            {[['login','Se connecter'],['register',"S'inscrire"]].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                style={{ flex:1, padding:'9px 0', borderRadius:8, border:'none', cursor:'pointer',
                  fontSize:13, fontWeight:700, transition:'all .15s',
                  background: mode===m ? RED : 'transparent',
                  color: mode===m ? '#fff' : '#64748B' }}>
                {label}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8,
              padding:'10px 14px', marginBottom:16, color:'#DC2626', fontSize:13 }}>
              {error}
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {mode === 'register' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field label="Prénom" name="firstName" placeholder="Gabriel" />
                <Field label="Nom" name="lastName" placeholder="Fokou" />
              </div>
            )}
            <Field label="Email" name="email" type="email" placeholder="vous@exemple.com" />
            <Field label="Mot de passe" name="password" type="password" placeholder="••••••••" />
            {mode === 'register' && (
              <>
                <Field label="Téléphone (WhatsApp)" name="phone" placeholder="+237 6XX XXX XXX" />
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#64748B',
                    textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6 }}>Destination visée</label>
                  <select value={form.destination} onChange={e => set('destination', e.target.value)}
                    style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:10,
                      padding:'11px 14px', fontSize:14, background:'#fff', outline:'none', boxSizing:'border-box' }}>
                    <option value="">Choisir une destination</option>
                    <option value="de">🇩🇪 Allemagne</option>
                    <option value="mt">🇲🇹 Malte</option>
                    <option value="pl">🇵🇱 Pologne</option>
                  </select>
                </div>
              </>
            )}

            <button onClick={handleSubmit} disabled={loading}
              style={{ background:RED, color:'#fff', border:'none', borderRadius:10,
                padding:'13px', fontSize:15, fontWeight:700, cursor:'pointer', marginTop:4,
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                boxShadow:'0 4px 16px rgba(192,57,43,0.4)', opacity: loading ? .7 : 1 }}>
              {loading ? 'Chargement...' : mode === 'login'
                ? <><LogIn size={16}/> Se connecter</>
                : <><UserPlus size={16}/> Créer mon compte</>}
            </button>

            {mode === 'login' && (
              <p style={{ textAlign:'center', fontSize:13, color:'#64748B' }}>
                <a href="#" style={{ color:RED, fontWeight:600, textDecoration:'none' }}>
                  Mot de passe oublié ?
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
    </div>
  )
}
