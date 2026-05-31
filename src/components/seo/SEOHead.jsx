import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const BASE_URL = 'https://www.reisetur237.com'

const SEO_DATA = {
  fr: {
    '/': {
      title: 'Reisetür 237 — Agence de Mobilité Internationale | Yaoundé, Cameroun',
      description: 'Reisetür 237 accompagne les candidats camerounais vers l\'Allemagne, Malte et la Pologne. Formation en langue allemande, assistance visa, Ausbildung Pflege.',
      keywords: 'Reisetür 237, mobilité internationale Cameroun, visa Allemagne Cameroun, Ausbildung Pflege, cours allemand Yaoundé, migration Malte Pologne',
    },
    '/services': {
      title: 'Nos Services — Reisetür 237',
      description: 'Assistance visa, conseil & orientation, Ausbildung Pflege, formation linguistique. Reisetür 237 vous accompagne de A à Z.',
      keywords: 'visa Allemagne Cameroun, Ausbildung Pflege Cameroun, cours allemand Yaoundé, migration Europe',
    },
    '/certifications': {
      title: 'Certifications Linguistiques — Reisetür 237',
      description: 'Centre d\'examen agréé à Yaoundé. Préparation et passage des examens officiels en langue allemande niveaux A1 à C1.',
      keywords: 'certification allemand Cameroun, examen A1 A2 B1 B2 C1 Yaoundé, centre d\'examen allemand',
    },
    '/partnerships': {
      title: 'Partenariats — Reisetür 237',
      description: 'Reisetür 237 collabore avec des institutions européennes reconnues en Allemagne, Malte et Pologne.',
      keywords: 'partenariat institution allemande Cameroun, recrutement Cameroun Allemagne',
    },
    '/blog': {
      title: 'Blog & Actualités — Reisetür 237',
      description: 'Informations, guides et témoignages sur la migration, les études et la vie en Europe depuis le Cameroun.',
      keywords: 'migration Europe Cameroun, études Allemagne Cameroun, visa étudiant Cameroun',
    },
    '/contact': {
      title: 'Contact & Inscription — Reisetür 237',
      description: 'Déposez votre candidature. Un conseiller Reisetür 237 vous recontacte sous 48h. Yaoundé, Cameroun.',
      keywords: 'contacter Reisetür 237, inscription mobilité internationale, candidature visa Cameroun',
    },
  },
  de: {
    '/': '/home'
      title: 'Reisetür 237 — Internationale Mobilitätsagentur | Yaoundé, Kamerun',
      description: 'Reisetür 237 begleitet kamerunische Kandidaten nach Deutschland, Malta und Polen. Deutschkurse, Visumassistenz, Ausbildung Pflege.',
      keywords: 'Reisetür 237, internationale Mobilität Kamerun, Visum Deutschland Kamerun, Ausbildung Pflege, Deutschkurs Yaoundé',
    },
    '/': {
      title: 'Reisetür 237 — Internationale Mobilitätsagentur',
      description: 'Deutschkurse, Ausbildung Pflege und Visumbegleitung für kamerunische Kandidaten nach Deutschland, Malta und Polen.',
      keywords: 'Ausbildung Pflege Kamerun, Deutschkurs Kamerun, Visum Deutschland Afrika',
    },
  },
  en: {
    '/': {
      title: 'Reisetür 237 — International Mobility Agency | Yaoundé, Cameroon',
      description: 'Reisetür 237 supports Cameroonian candidates to Germany, Malta and Poland. German language training, visa assistance, Ausbildung Pflege.',
      keywords: 'Reisetür 237, international mobility Cameroon, Germany visa Cameroon, Ausbildung Pflege, German courses Yaoundé',
    },
  },
}

const SCHEMA_ORG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Reisetür 237',
    alternateName: 'Reisetur 237',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.jpeg`,
    description: 'Agence de mobilité internationale spécialisée dans l\'accompagnement académique et professionnel vers l\'Allemagne, Malte et la Pologne.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yaoundé',
      addressCountry: 'CM',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+237-620-107-489',
      contactType: 'customer service',
      availableLanguage: ['French', 'German', 'English'],
    },
    sameAs: [],
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Reisetür 237',
    image: `${BASE_URL}/logo.jpeg`,
    url: BASE_URL,
    telephone: '+237-620-107-489',
    email: 'reisetur237@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Essos',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre',
      addressCountry: 'CM',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 3.8480,
      longitude: 11.5021,
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
      opens: '08:00',
      closes: '17:00',
    }],
    priceRange: '$$',
  },
}

export default function SEOHead({ page }) {
  const { i18n } = useTranslation()
  const location = useLocation()
  const lang     = i18n.language?.slice(0, 2) || 'fr'
  const path     = location.pathname

  const seoLang = SEO_DATA[lang] || SEO_DATA['fr']
  const meta    = seoLang[path] || seoLang['/']

  const canonical = `${BASE_URL}${path}`
  const ogImage   = `${BASE_URL}/og-image.jpg`

  useEffect(() => {
    // Title
    document.title = meta.title

    // Helper set/create meta
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName] = selector.match(/\[(.+?)=/) || []
        if (attrName) {
          const [k, v] = attrName.replace(/[\[\]]/g,'').split('=')
          el.setAttribute(k, v.replace(/['"]/g,''))
        }
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    // Standard meta
    setMeta('meta[name="description"]',        'content', meta.description)
    setMeta('meta[name="keywords"]',           'content', meta.keywords)
    setMeta('meta[name="robots"]',             'content', 'index, follow')
    setMeta('meta[name="language"]',           'content', lang)
    setMeta('meta[name="author"]',             'content', 'Reisetür 237')

    // Open Graph
    setMeta('meta[property="og:title"]',       'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]',         'content', canonical)
    setMeta('meta[property="og:image"]',       'content', ogImage)
    setMeta('meta[property="og:type"]',        'content', 'website')
    setMeta('meta[property="og:locale"]',      'content', lang === 'fr' ? 'fr_CM' : lang === 'de' ? 'de_DE' : 'en_US')
    setMeta('meta[property="og:site_name"]',   'content', 'Reisetür 237')

    // Twitter Card
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]',       'content', meta.title)
    setMeta('meta[name="twitter:description"]', 'content', meta.description)
    setMeta('meta[name="twitter:image"]',       'content', ogImage)

    // Canonical
    let canonical_el = document.querySelector('link[rel="canonical"]')
    if (!canonical_el) {
      canonical_el = document.createElement('link')
      canonical_el.rel = 'canonical'
      document.head.appendChild(canonical_el)
    }
    canonical_el.href = canonical

    // Hreflang
    const hreflangs = { fr: 'fr', de: 'de', en: 'en' }
    Object.entries(hreflangs).forEach(([l]) => {
      const id = `hreflang-${l}`
      let el = document.getElementById(id)
      if (!el) {
        el = document.createElement('link')
        el.id = id
        el.rel = 'alternate'
        el.hreflang = l
        document.head.appendChild(el)
      }
      el.href = `${BASE_URL}${path}?lang=${l}`
    })

    // Schema.org JSON-LD
    const schemaId = 'schema-org-main'
    let schemaEl = document.getElementById(schemaId)
    if (!schemaEl) {
      schemaEl = document.createElement('script')
      schemaEl.id = schemaId
      schemaEl.type = 'application/ld+json'
      document.head.appendChild(schemaEl)
    }
    schemaEl.textContent = JSON.stringify([
      SCHEMA_ORG.organization,
      SCHEMA_ORG.localBusiness,
    ])

  }, [path, lang, meta])

  return null
}
