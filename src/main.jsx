import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './i18n'
import './index.css'
import './performance.css'

const Loader = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#1A1A1A' }}>
    <div style={{ textAlign:'center' }}>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:800, fontSize:28, color:'#fff' }}>
        REISET<span style={{ color:'#C8A84B' }}>Ü</span>R <span style={{ color:'#C0392B' }}>237</span>
      </div>
      <div style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:12 }}>Chargement...</div>
    </div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
