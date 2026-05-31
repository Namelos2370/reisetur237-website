import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const RECIPIENT = 'reisetur237@gmail.com'

export default function ContactSection() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name:'', email:'', phone:'', destination:'', program:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email) { setError('Veuillez remplir au minimum le nom et l\'email.'); return }
    setLoading(true)
    setError('')

    try {
      // Sauvegarder dans Supabase
      await supabase.from('contact_requests').insert({
        full_name:   form.name,
        email:       form.email,
        phone:       form.phone,
        destination: form.destination,
        program:     form.program,
        message:     form.message,
        created_at:  new Date().toISOString(),
      })
    } catch(err) {
      console.log('Supabase save:', err)
    }

    // Construire le template email
    const subject = encodeURIComponent(`🔔 Nouvelle candidature — ${form.name} — ${form.destination || 'Destination non précisée'}`)

    const body = encodeURIComponent(
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOUVELLE CANDIDATURE — REISETÜR 237
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 NOM COMPLET
${form.name}

📧 EMAIL
${form.email}

📱 TÉLÉPHONE
${form.phone || 'Non renseigné'}

🌍 DESTINATION VISÉE
${form.destination || 'Non précisée'}

🎓 TYPE DE PROGRAMME
${form.program || 'Non précisé'}

💬 MESSAGE
${form.message || 'Aucun message'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reçu via le site reisetur237.com
Date : ${new Date().toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    )

    // Ouvrir le client email du candidat avec tout pré-rempli
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`

    setLoading(false)
    // Reset form
    setForm({ name:'', email:'', phone:'', destination:'', program:'', message:'' })
  }

  return (
    <section id="contact" style={{ padding:'80px 32px', background:'#111' }}>
      <div style={{ maxWidth:1080, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>

        {/* Left */}
        <div>
          <p style={{ color:'#C8A84B', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'.18em', marginBottom:12 }}>Contact</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:34, color:'#fff', marginBottom:14 }}>{t('contact.title')}</h2>
          <div style={{ width:46, height:4, background:'#C8A84B', borderRadius:2, marginBottom:18 }}/>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:16, marginBottom:34 }}>{t('contact.subtitle')}</p>

          {[
            { icon: <MapPin size={16} color="#C8A84B" />, text:"Avenue Germaine, Essos — en face de l'Hôpital de la Caisse (CNPS), Yaoundé" },
            { icon: <Mail size={16} color="#C8A84B" />,   text:'reisetur237@gmail.com', href:'mailto:reisetur237@gmail.com' },
            { icon: <Phone size={16} color="#C8A84B" />,  text:'+237 620 107 489', href:'tel:+237620107489' },
          ].map(({ icon, text, href }) => (
            <div key={text} style={{ display:'flex', alignItems:'flex-start', gap:15, marginBottom:18 }}>
              <div style={{ width:40, height:40, borderRadius:11, background:'rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{icon}</div>
              {href
                ? <a href={href} style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.5, textDecoration:'none' }}>{text}</a>
                : <span style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.5 }}>{text}</span>
              }
            </div>
          ))}

          {/* WhatsApp direct */}
          <a href="https://wa.me/237620107489" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:9, background:'#25D366', color:'#fff', textDecoration:'none', borderRadius:12, padding:'12px 22px', fontSize:14, fontWeight:700, marginTop:8, boxShadow:'0 4px 16px rgba(37,211,102,0.35)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrire sur WhatsApp
          </a>
        </div>

        {/* Right — Form */}
        <div style={{ background:'#fff', borderRadius:20, padding:34, boxShadow:'0 8px 44px rgba(0,0,0,0.5)' }}>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:13 }}>
            {error && (
              <div style={{ background:'#FEE2E2', border:'1px solid #FCA5A5', borderRadius:10, padding:'10px 14px', color:'#DC2626', fontSize:13 }}>{error}</div>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
              {[
                { key:'name',  label:t('contact.name'),  type:'text',  required:true  },
                { key:'email', label:t('contact.email'), type:'email', required:true  },
              ].map(({ key, label, type, required }) => (
                <div key={key}>
                  <label style={{ display:'block', fontSize:10.5, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:5 }}>{label}{required && ' *'}</label>
                  <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} required={required}
                    style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:9, padding:'10px 13px', fontSize:13.5, outline:'none', boxSizing:'border-box' }} />
                </div>
              ))}
            </div>

            <div>
              <label style={{ display:'block', fontSize:10.5, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:5 }}>{t('contact.phone')}</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+237 6XX XXX XXX"
                style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:9, padding:'10px 13px', fontSize:13.5, outline:'none', boxSizing:'border-box' }} />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
              {[
                { key:'destination', label:t('contact.destination'), opts:[
                  { v:'', l:t('contact.select_destination') },
                  { v:'Allemagne',  l:'🇩🇪 Allemagne' },
                  { v:'Malte',      l:'🇲🇹 Malte' },
                  { v:'Pologne',    l:'🇵🇱 Pologne' },
                ]},
                { key:'program', label:t('contact.program'), opts:[
                  { v:'', l:t('contact.select_program') },
                  { v:'Ausbildung Pflege',       l:'Ausbildung Pflege' },
                  { v:'Études universitaires',   l:'Études universitaires' },
                  { v:'Assistance visa',         l:'Assistance visa' },
                  { v:'Formation linguistique',  l:'Formation linguistique' },
                  { v:'Malte — Hôtellerie',      l:'Malte — Hôtellerie' },
                ]},
              ].map(({ key, label, opts }) => (
                <div key={key}>
                  <label style={{ display:'block', fontSize:10.5, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:5 }}>{label}</label>
                  <select value={form[key]} onChange={e => set(key, e.target.value)}
                    style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:9, padding:'10px 13px', fontSize:13.5, outline:'none', background:'#fff', boxSizing:'border-box' }}>
                    {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div>
              <label style={{ display:'block', fontSize:10.5, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:5 }}>{t('contact.message')}</label>
              <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={4}
                style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:9, padding:'10px 13px', fontSize:13.5, outline:'none', resize:'none', boxSizing:'border-box' }} />
            </div>

            {/* Info mailto */}
            <p style={{ color:'#94A3B8', fontSize:12, lineHeight:1.5 }}>
              📧 En cliquant "Envoyer", votre application email s'ouvrira avec votre candidature pré-remplie, prête à envoyer à Reisetür 237.
            </p>

            <button type="submit" disabled={loading}
              style={{ background:'#C0392B', color:'#fff', border:'none', borderRadius:11, padding:'13px', fontSize:14.5, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 16px rgba(192,57,43,0.38)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, opacity:loading?0.7:1 }}>
              {loading ? 'Préparation...' : <>{t('contact.submit')} <Send size={15}/></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
