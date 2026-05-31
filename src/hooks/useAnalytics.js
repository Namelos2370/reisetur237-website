import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = import.meta.env.VITE_GA_ID // G-XXXXXXXXXX

// Injecter le script GA4
function injectGA() {
  if (!GA_ID || document.getElementById('ga4-script')) return

  const script1 = document.createElement('script')
  script1.id    = 'ga4-script'
  script1.async = true
  script1.src   = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script1)

  window.dataLayer = window.dataLayer || []
  window.gtag = function() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, {
    send_page_view: false, // on gère manuellement
    anonymize_ip: true,
  })
}

// Tracker une page vue
export function trackPageView(path, title) {
  if (!window.gtag || !GA_ID) return
  window.gtag('event', 'page_view', {
    page_path:  path,
    page_title: title,
    send_to:    GA_ID,
  })
}

// Tracker un événement custom
export function trackEvent(action, category, label, value) {
  if (!window.gtag || !GA_ID) return
  window.gtag('event', action, {
    event_category: category,
    event_label:    label,
    value,
  })
}

// Hook principal — à placer dans App.jsx
export function useAnalytics() {
  const location = useLocation()

  useEffect(() => {
    injectGA()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location.pathname])
}

// Événements prédéfinis Reisetür 237
export const Analytics = {
  // Candidature
  formStart:     () => trackEvent('form_start',     'candidature', 'Formulaire contact ouvert'),
  formSubmit:    (dest) => trackEvent('form_submit', 'candidature', `Candidature soumise — ${dest}`),
  // Auth
  signUp:        (dest) => trackEvent('sign_up',    'auth', `Inscription — ${dest}`),
  signIn:        () => trackEvent('login',          'auth', 'Connexion candidat'),
  // Navigation
  navClick:      (page) => trackEvent('nav_click',  'navigation', page),
  langSwitch:    (lang) => trackEvent('lang_switch','ui', `Langue → ${lang}`),
  // Documents
  docUpload:     () => trackEvent('doc_upload',     'documents', 'Document uploadé'),
  // CTA
  ctaClick:      (label) => trackEvent('cta_click', 'cta', label),
}
