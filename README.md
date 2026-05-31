# Reisetür 237 — Site Web Officiel

Plateforme digitale institutionnelle de l'agence Reisetür 237.

## Stack
- **React 18** + Vite + TailwindCSS
- **react-i18next** — trilingue FR / DE / EN
- **react-router-dom** — navigation SPA
- **Lucide React** — icônes

## Installation

```bash
npm install
npm run dev        # développement → http://localhost:5173
npm run build      # production → /dist
npm run preview    # prévisualisation build
```

## Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout
│   ├── sections/      # HeroSection, ServicesSection, DestinationsSection, ContactSection
│   └── ui/            # LanguageSwitcher
├── i18n/
│   ├── index.js       # config i18next
│   └── locales/
│       ├── fr/        # traductions françaises
│       ├── de/        # traductions allemandes
│       └── en/        # traductions anglaises
├── pages/             # HomePage, pages par route
├── App.jsx
├── main.jsx
└── index.css
```

## Logo
Le logo `logo.jpeg` est déjà placé dans `/public/logo.jpeg` et intégré dans la Navbar et le Footer.
La palette du site (noir `#1A1A1A`, rouge `#C0392B`, or `#C8A84B`) est synchronisée avec les couleurs du logo.

## Déploiement Vercel
1. Push sur GitHub (Namelos2370/reisetur237-website)
2. Connecter le repo sur vercel.com
3. Framework preset : **Vite**
4. Build command : `npm run build`
5. Output directory : `dist`

## Phase 1 — MVP Institutionnel ✅
- [x] Navbar responsive + sélecteur de langue
- [x] Hero section (stats, destinations)
- [x] Section Services (4 domaines)
- [x] Section Destinations (DE / MT / PL)
- [x] Formulaire de candidature
- [x] Footer complet
- [x] Trilingue FR / DE / EN

## Phases suivantes
- [ ] Phase 2 — Espace Candidat (Supabase Auth + dashboard)
- [ ] Phase 3 — Simulateur B1/B2 + CMS Blog
- [ ] Phase 4 — Paiement Mobile Money + Admin
- [ ] Phase 5 — SEO multilingue + Analytics
