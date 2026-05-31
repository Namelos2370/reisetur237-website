import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function SEOHead() {
  const location = useLocation()

  const titles = {
    '/':               'Reisetür 237 — Agence de Mobilité Internationale | Yaoundé',
    '/services':       'Nos Services — Reisetür 237',
    '/certifications': 'Certifications Linguistiques — Reisetür 237',
    '/partnerships':   'Partenariats — Reisetür 237',
    '/blog':           'Blog & Actualités — Reisetür 237',
    '/contact':        'Contact & Candidature — Reisetür 237',
  }

  useEffect(() => {
    document.title = titles[location.pathname] || 'Reisetür 237'
    let el = document.querySelector('meta[name="description"]')
    if (!el) { el = document.createElement('meta'); el.name = 'description'; document.head.appendChild(el) }
    el.content = 'Reisetür 237 accompagne les candidats camerounais vers l\'Allemagne, Malte et la Pologne. Formation en langue allemande, assistance visa, Ausbildung Pflege.'
  }, [location.pathname])

  return null
}