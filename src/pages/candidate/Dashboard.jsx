import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, FileText, Upload, MessageSquare, LogOut, ChevronRight, CheckCircle, Clock, XCircle, AlertCircle, User, Menu, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { useIsMobile } from '../../hooks/useIsMobile'

const NAVY='#1A1A1A',RED='#C0392B',GOLD='#C8A84B',BLUE='#1B3E6F'
const DEST_FLAGS={ 'Allemagne':'🇩🇪','Malte':'🇲🇹','Pologne':'🇵🇱' }
const STATUS_CFG={ 'En attente':{color:'#F59E0B',bg:'#FEF3C7',Icon:Clock},'En cours':{color:'#3B82F6',bg:'#EFF6FF',Icon:AlertCircle},'Validé':{color:'#10B981',bg:'#D1FAE5',Icon:CheckCircle},'Rejeté':{color:'#EF4444',bg:'#FEE2E2',Icon:XCircle} }
const VISA_STEPS=[{key:'depot',label:'Dossier déposé'},{key:'etude',label:'Dossier en étude'},{key:'rdv',label:'RDV consulaire'},{key:'decision',label:'Décision visa'},{key:'depart',label:'Départ confirmé'}]
const SECTIONS=[{key:'dashboard',label:'Tableau de bord',Icon:LayoutDashboard},{key:'documents',label:'Mes Documents',Icon:FileText},{key:'messages',label:'Messagerie',Icon:MessageSquare},{key:'profile',label:'Mon Profil',Icon:User}]
const AMBER='#F59E0B',GREEN='#10B981'

export default function CandidateDashboard(){
  const{user,profile,signOut}=useAuth()
  const navigate=useNavigate()
  const isMobile=useIsMobile()
  const[section,setSection]=useState('dashboard')
  const[sideOpen,setSideOpen]=useState(false)
  const[docs,setDocs]=useState([])
  const[messages,setMessages]=useState([])
  const[visa,setVisa]=useState(null)
  const[msgInput,setMsgInput]=useState('')
  const[uploading,setUploading]=useState(false)
  const[unread,setUnread]=useState(0)

  useEffect(()=>{if(!user){navigate('/candidate/auth');return}fetchAll()},[user])

  async function fetchAll(){
    const[d,m,v]=await Promise.all([
      supabase.from('documents').select('*').eq('user_id',user.id).order('created_at',{ascending:false}),
      supabase.from('messages').select('*').eq('candidate_id',user.id).order('created_at',{ascending:true}),
      supabase.from('visa_dossiers').select('*').eq('candidate_id',user.id).eq('archived',false).maybeSingle(),
    ])
    setDocs(d.data||[]);setMessages(m.data||[]);setVisa(v.data||null)
    setUnread((m.data||[]).filter(msg=>msg.sender==='admin'&&!msg.read).length)
  }

  async function uploadDoc(e){
    const file=e.target.files[0];if(!file)return
    setUploading(true)
    try{
      const ext=file.name.split('.').pop()
      const path=`${user.id}/${Date.now()}.${ext}`
      const{error:upErr}=await supabase.storage.from('documents').upload(path,file)
      if(upErr)throw upErr
      await supabase.from('documents').insert({user_id:user.id,name:file.name,path,status:'En attente',size:file.size})
      fetchAll()
    }catch(err){alert('Erreur: '+err.message)}
    finally{setUploading(false)}
  }

  async function sendMsg(){
    if(!msgInput.trim())return
    await supabase.from('messages').insert({candidate_id:user.id,sender:'candidate',content:msgInput,read:false})
    setMsgInput('');fetchAll()
  }

  const handleLogout=async()=>{await signOut();navigate('/')}
  const navTo=(key)=>{setSection(key);setSideOpen(false)}

  const StatusBadge=({status})=>{
    const cfg=STATUS_CFG[status]||STATUS_CFG['En attente']
    return <span style={{display:'inline-flex',alignItems:'center',gap:5,background:cfg.bg,color:cfg.color,borderRadius:20,padding:'4px 10px',fontSize:12,fontWeight:600}}><cfg.Icon size={12}/> {status}</span>
  }

  const currentStepIdx=VISA_STEPS.findIndex(s=>s.key===visa?.step)??0

  const Sidebar=()=>(
    <div style={{width:isMobile?'100%':240,background:'#fff',borderRight:'1px solid #F1F5FB',display:'flex',flexDirection:'column',padding:'20px 0',height:isMobile?'auto':'100vh',position:isMobile?'relative':'sticky',top:0}}>
      <div style={{padding:'0 20px',marginBottom:24,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:18,color:NAVY}}>REISET<span style={{color:GOLD}}>Ü</span>R <span style={{color:RED}}>237</span></div>
          <p style={{color:'#64748B',fontSize:11,marginTop:2}}>Espace Candidat</p>
        </div>
        {isMobile&&<button onClick={()=>setSideOpen(false)} style={{background:'none',border:'none',cursor:'pointer'}}><X size={20} color={NAVY}/></button>}
      </div>
      <nav style={{flex:1,padding:'0 12px'}}>
        {SECTIONS.map(({key,label,Icon})=>(
          <button key={key} onClick={()=>navTo(key)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'11px 14px',borderRadius:10,border:'none',cursor:'pointer',marginBottom:4,background:section===key?RED:'transparent',color:section===key?'#fff':'#64748B',fontSize:14,fontWeight:section===key?700:500,textAlign:'left',position:'relative'}}>
            <Icon size={16}/> {label}
            {key==='messages'&&unread>0&&<span style={{position:'absolute',right:12,background:RED,color:'#fff',borderRadius:'50%',width:18,height:18,fontSize:10,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>{unread}</span>}
          </button>
        ))}
      </nav>
      <div style={{padding:'16px 20px',borderTop:'1px solid #F1F5FB'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
          <div style={{width:34,height:34,borderRadius:'50%',background:RED,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:13,fontWeight:700}}>{profile?.full_name?.[0]||'C'}</div>
          <div>
            <p style={{fontSize:13,fontWeight:600,color:NAVY}}>{profile?.full_name||'Candidat'}</p>
            <p style={{fontSize:11,color:'#94A3B8'}}>{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'9px 14px',borderRadius:8,border:'1px solid #F1F5FB',background:'#fff',cursor:'pointer',color:'#64748B',fontSize:13,fontWeight:600}}>
          <LogOut size={14}/> Se déconnecter
        </button>
      </div>
    </div>
  )

  const renderDashboard=()=>(
    <div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?20:24,color:NAVY,marginBottom:6}}>Bonjour, {profile?.full_name?.split(' ')[0]||'Candidat'} 👋</h2>
      <p style={{color:'#64748B',marginBottom:20,fontSize:14}}>Voici l'état de votre dossier de mobilité internationale.</p>
      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:12,marginBottom:20}}>
        <div style={{background:'#fff',borderRadius:12,padding:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #F1F5FB'}}>
          <p style={{color:'#64748B',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:6}}>Statut dossier</p>
          <p style={{color:BLUE,fontSize:14,fontWeight:700}}>{profile?.dossier_status||'En attente'}</p>
        </div>
        <div style={{background:'#fff',borderRadius:12,padding:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #F1F5FB'}}>
          <p style={{color:'#64748B',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:6}}>Documents</p>
          {docs.length===0?<p style={{color:'#94A3B8',fontSize:13,fontStyle:'italic'}}>Aucun document soumis</p>:docs.filter(d=>d.status==='Validé').length===0?<p style={{color:AMBER,fontSize:13,fontWeight:700}}>En attente de validation</p>:<p style={{color:GREEN,fontSize:14,fontWeight:700}}>{docs.filter(d=>d.status==='Validé').length}/{docs.length} validé(s)</p>}
        </div>
        <div style={{background:'#fff',borderRadius:12,padding:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #F1F5FB'}}>
          <p style={{color:'#64748B',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:6}}>Destination</p>
          <p style={{color:RED,fontSize:14,fontWeight:700}}>{profile?.destination?`${DEST_FLAGS[profile.destination]||'🌍'} ${profile.destination}`:'—'}</p>
        </div>
      </div>
      <div style={{background:'#fff',borderRadius:14,padding:isMobile?'16px':'20px 24px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #F1F5FB',marginBottom:16}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:NAVY,marginBottom:16}}>Progression du dossier</h3>
        {visa?VISA_STEPS.map((step,i)=>{
          const done=i<currentStepIdx,curr=i===currentStepIdx
          return(<div key={step.key} style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
            <div style={{width:26,height:26,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:done?'#10B981':curr?RED:'#E2E8F0',color:done||curr?'#fff':'#94A3B8',fontSize:11,fontWeight:700}}>
              {done?'✓':i+1}
            </div>
            <p style={{fontSize:13.5,fontWeight:curr?700:500,color:done?'#10B981':curr?RED:'#94A3B8'}}>{step.label}</p>
            {curr&&<span style={{background:'#FEF2F2',color:RED,fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:20,marginLeft:'auto'}}>En cours</span>}
          </div>)
        }):<p style={{color:'#94A3B8',fontSize:13.5}}>Aucun dossier visa en cours.</p>}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {[{label:'Uploader un document',action:()=>setSection('documents'),color:BLUE},{label:'Envoyer un message',action:()=>setSection('messages'),color:RED}].map(({label,action,color})=>(
          <button key={label} onClick={action} style={{background:'#fff',border:`2px solid ${color}`,borderRadius:11,padding:'12px 8px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',color,fontSize:isMobile?12:13.5,fontWeight:700}}>
            {label} <ChevronRight size={14}/>
          </button>
        ))}
      </div>
    </div>
  )

  const renderDocuments=()=>(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?18:22,color:NAVY}}>Mes Documents</h2>
        <label style={{background:RED,color:'#fff',borderRadius:9,padding:'8px 14px',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
          <Upload size={13}/> {uploading?'Envoi...':'Ajouter'}
          <input type="file" style={{display:'none'}} onChange={uploadDoc} accept=".pdf,.jpg,.jpeg,.png" disabled={uploading}/>
        </label>
      </div>
      {docs.length===0?<div style={{background:'#fff',borderRadius:14,padding:'40px',textAlign:'center',color:'#94A3B8',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}><FileText size={32} style={{marginBottom:10,opacity:.3}}/><p>Aucun document déposé.</p></div>
        :docs.map(doc=>(
          <div key={doc.id} style={{background:'#fff',borderRadius:11,padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',border:`1px solid ${doc.status==='Rejeté'?'#FCA5A5':'#F1F5FB'}`,marginBottom:8}}>
            <div style={{display:'flex',alignItems:'center',gap:10,flex:1}}>
              <div style={{width:34,height:34,borderRadius:8,background:doc.status==='Rejeté'?'#FEE2E2':'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><FileText size={15} color={doc.status==='Rejeté'?'#EF4444':BLUE}/></div>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:NAVY}}>{doc.name}</p>
                <p style={{fontSize:11,color:'#94A3B8'}}>{(doc.size/1024).toFixed(0)} Ko</p>
                {doc.status==='Rejeté'&&<p style={{fontSize:11,color:'#EF4444',fontWeight:600,marginTop:2}}>⚠️ Veuillez soumettre à nouveau</p>}
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <StatusBadge status={doc.status}/>
              {doc.status==='Rejeté'&&(
                <label style={{background:'#C0392B',color:'#fff',borderRadius:7,padding:'5px 10px',fontSize:11,fontWeight:700,cursor:'pointer',flexShrink:0}}>
                  Renvoyer
                  <input type="file" style={{display:'none'}} onChange={async e=>{
                    const file=e.target.files[0];if(!file)return
                    const ext=file.name.split('.').pop()
                    const path=`${user.id}/${Date.now()}.${ext}`
                    await supabase.storage.from('documents').upload(path,file)
                    await supabase.from('documents').update({name:file.name,path,status:'En attente',size:file.size}).eq('id',doc.id)
                    fetchAll()
                  }} accept=".pdf,.jpg,.jpeg,.png"/>
                </label>
              )}
            </div>
          </div>
        ))}
    </div>
  )

  const renderMessages=()=>(
    <div style={{display:'flex',flexDirection:'column',height:isMobile?'calc(100vh - 200px)':'calc(100vh - 160px)'}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?18:22,color:NAVY,marginBottom:14}}>Messagerie</h2>
      <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:8,background:'#F7F8FC',borderRadius:14,padding:14,marginBottom:10}}>
        {messages.length===0?<p style={{textAlign:'center',color:'#94A3B8',fontSize:13.5,marginTop:30}}>Démarrez la conversation avec l'équipe.</p>
          :messages.map(msg=>(
            <div key={msg.id} style={{display:'flex',justifyContent:msg.sender==='candidate'?'flex-end':'flex-start'}}>
              {msg.sender==='admin'&&<div style={{width:26,height:26,borderRadius:'50%',background:NAVY,display:'flex',alignItems:'center',justifyContent:'center',color:GOLD,fontSize:9,fontWeight:700,marginRight:7,flexShrink:0}}>R</div>}
              <div style={{maxWidth:'75%',borderRadius:msg.sender==='candidate'?'14px 14px 4px 14px':'14px 14px 14px 4px',padding:'9px 13px',fontSize:13,lineHeight:1.5,background:msg.sender==='candidate'?RED:'#fff',color:msg.sender==='candidate'?'#fff':NAVY,boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}}>
                {msg.content}
                <div style={{fontSize:10,marginTop:3,opacity:.6}}>{new Date(msg.created_at).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</div>
              </div>
            </div>
          ))}
      </div>
      <div style={{display:'flex',gap:8}}>
        <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder="Écrire un message..."
          style={{flex:1,border:'1.5px solid #E2E8F0',borderRadius:10,padding:'10px 13px',fontSize:14,outline:'none',fontFamily:'inherit'}}/>
        <button onClick={sendMsg} style={{background:RED,color:'#fff',border:'none',borderRadius:10,padding:'10px 16px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Envoyer</button>
      </div>
    </div>
  )

  const renderProfile=()=>(
    <div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?18:22,color:NAVY,marginBottom:18}}>Mon Profil</h2>
      <div style={{background:'#fff',borderRadius:14,padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #F1F5FB'}}>
        {[['Nom complet',profile?.full_name],['Email',user?.email],['Téléphone',profile?.phone||'—'],['Destination',profile?.destination?`${DEST_FLAGS[profile.destination]||'🌍'} ${profile.destination}`:'—'],['Statut',<StatusBadge status={profile?.dossier_status||'En attente'}/>],['Membre depuis',user?new Date(user.created_at).toLocaleDateString('fr-FR'):'—']].map(([label,value])=>(
          <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid #F1F5FB'}}>
            <span style={{color:'#64748B',fontSize:13}}>{label}</span>
            <span style={{color:NAVY,fontSize:13,fontWeight:600}}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const RENDERS={dashboard:renderDashboard,documents:renderDocuments,messages:renderMessages,profile:renderProfile}

  return(
    <div style={{display:'flex',minHeight:'100vh',background:'#F7F8FC',fontFamily:"'DM Sans',sans-serif",flexDirection:isMobile?'column':'row'}}>

      {/* Sidebar desktop */}
      {!isMobile&&<div style={{width:240,background:'#fff',borderRight:'1px solid #F1F5FB',display:'flex',flexDirection:'column',padding:'20px 0',position:'sticky',top:0,height:'100vh',flexShrink:0}}><Sidebar/></div>}

      {/* Overlay sidebar mobile */}
      {isMobile&&sideOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:100,background:'rgba(0,0,0,0.5)'}} onClick={()=>setSideOpen(false)}>
          <div style={{width:280,height:'100%',background:'#fff'}} onClick={e=>e.stopPropagation()}><Sidebar/></div>
        </div>
      )}

      {/* Main */}
      <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
        {/* Top bar */}
        <div style={{background:'#fff',borderBottom:'1px solid #F1F5FB',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
          {isMobile?<>
            <button onClick={()=>setSideOpen(true)} style={{background:'none',border:'none',cursor:'pointer',padding:4}}><Menu size={22} color={NAVY}/></button>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:16,color:NAVY}}>REISET<span style={{color:GOLD}}>Ü</span>R <span style={{color:RED}}>237</span></div>
            <Link to="/" style={{color:'#64748B',fontSize:12,textDecoration:'none'}}>Site</Link>
          </>:<>
            <h1 style={{fontSize:15,fontWeight:700,color:NAVY}}>{SECTIONS.find(s=>s.key===section)?.label}</h1>
            <Link to="/" style={{color:'#64748B',fontSize:13,textDecoration:'none'}}>← Site</Link>
          </>}
        </div>

        {/* Bottom nav mobile */}
        {isMobile&&(
          <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #F1F5FB',display:'flex',zIndex:50,padding:'8px 0 4px'}}>
            {SECTIONS.map(({key,label,Icon})=>(
              <button key={key} onClick={()=>setSection(key)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,background:'none',border:'none',cursor:'pointer',padding:'4px 0',color:section===key?RED:'#94A3B8',position:'relative'}}>
                <Icon size={20}/>
                <span style={{fontSize:9,fontWeight:600}}>{label.split(' ')[0]}</span>
                {key==='messages'&&unread>0&&<span style={{position:'absolute',top:0,right:'20%',background:RED,color:'#fff',borderRadius:'50%',width:14,height:14,fontSize:9,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>{unread}</span>}
              </button>
            ))}
          </div>
        )}

        <div style={{flex:1,padding:isMobile?'16px 14px 80px':'24px',maxWidth:800,width:'100%',margin:'0 auto'}}>
          {(RENDERS[section]||renderDashboard)()}
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}button:hover{opacity:.88;}`}</style>
    </div>
  )
}
