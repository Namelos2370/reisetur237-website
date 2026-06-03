import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { Send, MessageSquare } from 'lucide-react'
const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B'
export default function AdminMessaging({ candidates }) {
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [unreadMap, setUnreadMap] = useState({})
  const bottomRef = useRef(null)
  useEffect(() => { fetchUnread() }, [candidates])
  useEffect(() => {
    if (!selected) return
    fetchMessages(selected.id)
    const sub = supabase.channel('admin-msgs-' + selected.id)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `candidate_id=eq.${selected.id}` }, () => fetchMessages(selected.id))
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [selected])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  async function fetchUnread() {
    const { data } = await supabase.from('messages').select('candidate_id').eq('sender', 'candidate').eq('read', false)
    const map = {}
    data?.forEach(m => { map[m.candidate_id] = (map[m.candidate_id] || 0) + 1 })
    setUnreadMap(map)
  }
  async function fetchMessages(candidateId) {
    const { data } = await supabase.from('messages').select('*').eq('candidate_id', candidateId).order('created_at', { ascending: true })
    setMessages(data || [])
    await supabase.from('messages').update({ read: true }).eq('candidate_id', candidateId).eq('sender', 'candidate')
    setUnreadMap(prev => ({ ...prev, [candidateId]: 0 }))
  }
  async function sendMsg() {
    if (!input.trim() || !selected) return
    await supabase.from('messages').insert({ candidate_id: selected.id, sender: 'admin', content: input, read: false })
    setInput('')
    fetchMessages(selected.id)
  }
  return (
    <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', height:'calc(100vh - 160px)', background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 18px rgba(0,0,0,0.08)', border:'1px solid #F1F5FB' }}>
      <div style={{ borderRight:'1px solid #F1F5FB', overflowY:'auto' }}>
        <div style={{ padding:'16px', borderBottom:'1px solid #F1F5FB' }}>
          <p style={{ fontSize:13, color:'#94A3B8' }}>{candidates.length} candidat(s)</p>
        </div>
        {candidates.length === 0
          ? <p style={{ padding:20, color:'#94A3B8', fontSize:13 }}>Aucun candidat.</p>
          : candidates.map(c => (
            <div key={c.id} onClick={() => setSelected(c)}
              style={{ padding:'12px 16px', cursor:'pointer', background:selected?.id===c.id?'#FEF2F2':'transparent', borderBottom:'1px solid #F7F8FC', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:selected?.id===c.id?RED:NAVY, display:'flex', alignItems:'center', justifyContent:'center', color:GOLD, fontSize:13, fontWeight:700, flexShrink:0 }}>
                  {c.full_name?.[0] || 'C'}
                </div>
                <div>
                  <p style={{ fontSize:13.5, fontWeight:600, color:NAVY }}>{c.full_name || 'Candidat'}</p>
                  <p style={{ fontSize:11, color:'#94A3B8' }}>{c.destination || '—'}</p>
                </div>
              </div>
              {unreadMap[c.id] > 0 && (
                <span style={{ background:RED, color:'#fff', borderRadius:'50%', width:20, height:20, fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {unreadMap[c.id]}
                </span>
              )}
            </div>
          ))
        }
      </div>
      {selected ? (
        <div style={{ display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid #F1F5FB', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:RED, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:700 }}>{selected.full_name?.[0]}</div>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:NAVY }}>{selected.full_name}</p>
              <p style={{ fontSize:11, color:'#94A3B8' }}>{selected.email} · {selected.destination || '—'}</p>
            </div>
          </div>
          <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, padding:16, background:'#F7F8FC' }}>
            {messages.length === 0
              ? <p style={{ textAlign:'center', color:'#94A3B8', fontSize:13.5, marginTop:40 }}>Démarrez la conversation.</p>
              : messages.map(msg => (
                <div key={msg.id} style={{ display:'flex', justifyContent:msg.sender==='admin'?'flex-end':'flex-start' }}>
                  {msg.sender==='candidate' && <div style={{ width:26, height:26, borderRadius:'50%', background:RED, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:10, fontWeight:700, marginRight:8, flexShrink:0 }}>{selected.full_name?.[0]}</div>}
                  <div style={{ maxWidth:'70%', borderRadius:msg.sender==='admin'?'14px 14px 4px 14px':'14px 14px 14px 4px', padding:'10px 14px', fontSize:13, lineHeight:1.5, background:msg.sender==='admin'?NAVY:'#fff', color:msg.sender==='admin'?'#fff':NAVY, boxShadow:'0 1px 6px rgba(0,0,0,0.08)' }}>
                    {msg.content}
                    <div style={{ fontSize:10, marginTop:4, opacity:.6 }}>{new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' })}</div>
                  </div>
                </div>
              ))
            }
            <div ref={bottomRef}/>
          </div>
          <div style={{ padding:'12px 16px', borderTop:'1px solid #F1F5FB', display:'flex', gap:10, background:'#fff' }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()}
              placeholder={`Répondre à ${selected.full_name?.split(' ')[0]}...`}
              style={{ flex:1, border:'1.5px solid #E2E8F0', borderRadius:10, padding:'11px 14px', fontSize:14, outline:'none', fontFamily:'inherit' }}/>
            <button onClick={sendMsg} style={{ background:NAVY, color:'#fff', border:'none', borderRadius:10, padding:'11px 20px', fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
              <Send size={14}/> Envoyer
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#94A3B8' }}>
          <MessageSquare size={48} style={{ marginBottom:14, opacity:.3 }}/>
          <p style={{ fontSize:15 }}>Sélectionnez un candidat</p>
        </div>
      )}
    </div>
  )
}