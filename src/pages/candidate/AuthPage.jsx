import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { Eye, EyeOff, LogIn, UserPlus, Loader } from 'lucide-react'

export default function AuthPage() {
  const { t } = useTranslation()
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode]       = useState('login') // login | register
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [showPwd, setShowPwd] = useState(false)

  const [form, setForm] = useState({
    email: '', password: '', fullName: '', phone: '',
    destination: '', confirmPassword: '',
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn({ email: form.email, password: form.password })
        navigate('/candidate/dashboard')
      } else {
        if (form.password !== form.confirmPassword) throw new Error('Les mots de passe ne correspondent pas.')
        if (!form.fullName || !form.destination) throw new Error('Veuillez remplir tous les champs.')
        await signUp({
          email: form.email, password: form.password,
          fullName: form.fullName, phone: form.phone,
          destination: form.destination,
        })
        navigate('/candidate/dashboard')
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const NAVY = '#1A1A1A'
  const RED  = '#C0392B'
  const GOLD = '#C8A84B'

  const inputClass = {
    width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 10,
    padding: '11px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'DM Sans, sans-serif',
  }
  const labelClass = {
    display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B',
    textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5,
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2a0707)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/">
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 28, color: '#fff' }}>
              REISET<span style={{ color: GOLD }}>Ü</span>R <span style={{ color: RED }}>237</span>
            </span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 6 }}>
            {mode === 'login' ? 'Connectez-vous à votre espace candidat' : 'Créez votre espace candidat'}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 32px', boxShadow: '0 8px 44px rgba(0,0,0,0.5)' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#F1F5FB', borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
            {[['login', 'Connexion'], ['register', 'Inscription']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                style={{
                  flex: 1, border: 'none', borderRadius: 8, padding: '9px',
                  fontSize: 13.5, fontWeight: 700, cursor: 'pointer', transition: 'all .15s',
                  background: mode === m ? NAVY : 'transparent',
                  color: mode === m ? '#fff' : '#64748B',
                }}>
                {label}
              </button>
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 14px', marginBottom: 18, color: RED, fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Nom (inscription) */}
            {mode === 'register' && (
              <div>
                <label style={labelClass}>Nom complet</label>
                <input style={inputClass} value={form.fullName}
                  onChange={e => set('fullName', e.target.value)} placeholder="FOKOU Gabriel Ezekiel" />
              </div>
            )}

            {/* Email */}
            <div>
              <label style={labelClass}>Adresse email</label>
              <input type="email" style={inputClass} value={form.email}
                onChange={e => set('email', e.target.value)} placeholder="exemple@gmail.com" />
            </div>

            {/* Téléphone (inscription) */}
            {mode === 'register' && (
              <div>
                <label style={labelClass}>Téléphone (WhatsApp)</label>
                <input style={inputClass} value={form.phone}
                  onChange={e => set('phone', e.target.value)} placeholder="+237 6XX XXX XXX" />
              </div>
            )}

            {/* Destination (inscription) */}
            {mode === 'register' && (
              <div>
                <label style={labelClass}>Destination visée</label>
                <select style={{ ...inputClass, background: '#fff' }} value={form.destination}
                  onChange={e => set('destination', e.target.value)}>
                  <option value="">— Choisir une destination —</option>
                  <option value="Allemagne">🇩🇪 Allemagne</option>
                  <option value="Malte">🇲🇹 Malte</option>
                  <option value="Pologne">🇵🇱 Pologne</option>
                </select>
              </div>
            )}

            {/* Mot de passe */}
            <div>
              <label style={labelClass}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <input type={showPwd ? 'text' : 'password'} style={{ ...inputClass, paddingRight: 42 }}
                  value={form.password} onChange={e => set('password', e.target.value)} />
                <button onClick={() => setShowPwd(!showPwd)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirmer mdp (inscription) */}
            {mode === 'register' && (
              <div>
                <label style={labelClass}>Confirmer le mot de passe</label>
                <input type="password" style={inputClass} value={form.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)} />
              </div>
            )}

            {/* Bouton */}
            <button onClick={handleSubmit} disabled={loading}
              style={{
                background: RED, color: '#fff', border: 'none', borderRadius: 11,
                padding: '13px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(192,57,43,0.38)', marginTop: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: loading ? 0.7 : 1,
              }}>
              {loading
                ? <><Loader size={16} className="animate-spin" /> Chargement...</>
                : mode === 'login'
                  ? <><LogIn size={16} /> Se connecter</>
                  : <><UserPlus size={16} /> Créer mon compte</>
              }
            </button>

            {mode === 'login' && (
              <p style={{ textAlign: 'center', fontSize: 13, color: '#64748B' }}>
                Mot de passe oublié ?{' '}
                <span style={{ color: RED, fontWeight: 600, cursor: 'pointer' }}>Réinitialiser</span>
              </p>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 20 }}>
          © 2026 Reisetür 237 — <Link to="/" style={{ color: 'rgba(255,255,255,0.4)' }}>Retour au site</Link>
        </p>
      </div>
    </div>
  )
}
