# SEO & Performance — Reisetür 237
## Guide de configuration complet

---

## 1. Google Analytics 4

### Étapes :
1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Créer une propriété → **Reisetür 237**
3. Copier l'ID de mesure (format `G-XXXXXXXXXX`)
4. Ajouter dans `.env` :
```
VITE_GA_ID=G-XXXXXXXXXX
```

### Événements trackés automatiquement :
- `page_view` — chaque changement de page
- `form_submit` — soumission candidature
- `sign_up` — nouvelle inscription candidat
- `lang_switch` — changement de langue
- `doc_upload` — upload de document
- `cta_click` — clic sur les boutons d'appel à l'action

---

## 2. Google Search Console

### Étapes :
1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter la propriété `https://www.reisetur237.com`
3. Vérifier via le fichier HTML ou DNS
4. Soumettre le sitemap : `https://www.reisetur237.com/sitemap.xml`

---

## 3. SEO Multilingue

### Fichiers en place :
| Fichier | Rôle |
|---------|------|
| `public/sitemap.xml` | Toutes les URLs avec hreflang FR/DE/EN |
| `public/robots.txt` | Directives crawlers + lien sitemap |
| `index.html` | Meta de base + OG + schema.org |
| `src/components/seo/SEOHead.jsx` | Meta dynamiques par page et par langue |

### SEOHead.jsx — utilisation :
```jsx
// Dans chaque page
import SEOHead from '../components/seo/SEOHead'

export default function HomePage() {
  return (
    <>
      <SEOHead page="home" />
      {/* ... contenu ... */}
    </>
  )
}
```

---

## 4. Schema.org implémenté

- `EducationalOrganization` — présence de l'agence
- `LocalBusiness` — adresse, horaires, géolocalisation
- Mis à jour dynamiquement par `SEOHead.jsx`

---

## 5. Performance

### Optimisations en place :
- **Code splitting** par route (vendor, candidate, admin)
- **Minification Terser** — console.log supprimés en prod
- **Lazy loading images** — attribut `loading="lazy"` global
- **Preconnect fonts** — Google Fonts préconnecté
- **Preload logo** — image critique chargée en priorité
- **content-visibility** — éléments hors écran non rendus
- **Font smoothing** — rendu optimisé sur tous OS
- **iOS zoom fix** — inputs en 16px sur mobile

### Pour mesurer :
1. [PageSpeed Insights](https://pagespeed.web.dev/) — objectif 90+ mobile
2. [GTmetrix](https://gtmetrix.com/) — vérification Cameroun
3. Chrome DevTools → Lighthouse

---

## 6. Checklist avant mise en ligne

- [ ] Domaine `reisetur237.com` configuré sur Hostinger
- [ ] Variables `.env` remplies (Supabase + GA4)
- [ ] `npm run build` → pas d'erreurs
- [ ] `npm run preview` → tester le build
- [ ] Push GitHub → Vercel déploie automatiquement
- [ ] Soumettre sitemap dans Search Console
- [ ] Tester les 3 langues FR/DE/EN
- [ ] Tester sur mobile Android (Chrome)
- [ ] Vérifier robots.txt : `https://www.reisetur237.com/robots.txt`
- [ ] Créer l'image OG (`/public/og-image.jpg`) — 1200×630px

---

## 7. Image OG recommandée

Créer une image `og-image.jpg` (1200×630px) avec :
- Logo Reisetür 237
- Texte : "Votre passerelle vers l'Europe"
- Drapeaux 🇩🇪 🇲🇹 🇵🇱
- Fond sombre (#1A1A1A)

Placer dans `/public/og-image.jpg`
