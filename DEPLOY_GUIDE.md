# 🚀 Guide de Déploiement — Reisetür 237
## Du code au site en ligne

---

## ÉTAPE 1 — Supabase (Base de données)

### 1.1 Créer le projet
1. Aller sur **https://supabase.com**
2. Cliquer **New Project**
3. Remplir :
   - **Name** : `reisetur237`
   - **Database Password** : choisir un mot de passe fort (noter quelque part)
   - **Region** : `West EU (Ireland)` — le plus proche du Cameroun
4. Cliquer **Create new project** — attendre ~2 minutes

### 1.2 Exécuter le schema SQL
1. Dans Supabase → **SQL Editor** → **New query**
2. Copier-coller tout le contenu du fichier `supabase_schema.sql`
3. Cliquer **Run** (bouton vert)
4. Vérifier dans **Table Editor** que les tables suivantes existent :
   - `profiles`, `documents`, `messages`, `payments`
   - `visa_dossiers`, `articles`, `partners`, `exam_sessions`

### 1.3 Créer le bucket Storage
1. Supabase → **Storage** → **New bucket**
2. **Name** : `documents`
3. **Public** : ❌ Non (laisser privé)
4. Cliquer **Save**

### 1.4 Récupérer les clés API
1. Supabase → **Settings** → **API**
2. Copier :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`

---

## ÉTAPE 2 — GitHub (Code)

### 2.1 Créer le dépôt
1. Aller sur **https://github.com/Namelos2370**
2. **New repository**
3. **Name** : `reisetur237-website`
4. **Private** : ✅ Oui (recommandé)
5. **Create repository**

### 2.2 Pousser le code
```bash
# Décompresser l'archive reisetur237-complet.zip
unzip reisetur237-complet.zip
cd reisetur237

# Initialiser git
git init
git add .
git commit -m "🚀 Initial commit — Reisetür 237 v1.0"

# Connecter au dépôt GitHub
git remote add origin https://github.com/Namelos2370/reisetur237-website.git
git branch -M main
git push -u origin main
```

---

## ÉTAPE 3 — Vercel (Hébergement)

### 3.1 Connecter le projet
1. Aller sur **https://vercel.com**
2. **New Project**
3. **Import** → choisir `reisetur237-website`
4. Framework Preset : **Vite** (détecté automatiquement)
5. Build Command : `npm run build`
6. Output Directory : `dist`

### 3.2 Variables d'environnement ⚠️ IMPORTANT
Avant de déployer, ajouter les variables :

| Nom | Valeur |
|-----|--------|
| `VITE_SUPABASE_URL` | `https://xxxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` |
| `VITE_GA_ID` | `G-XXXXXXXXXX` (optionnel) |

**Comment ajouter :**
1. Vercel → Settings → Environment Variables
2. Ajouter chaque variable
3. Cocher **Production**, **Preview**, **Development**

### 3.3 Déployer
1. Cliquer **Deploy**
2. Attendre ~2 minutes
3. Votre site est en ligne sur `reisetur237-website.vercel.app` 🎉

---

## ÉTAPE 4 — Domaine Hostinger

### 4.1 Configurer le domaine
1. Aller sur **https://hpanel.hostinger.com**
2. **Domaines** → `reisetur237.com` (ou acheter le domaine)
3. **DNS** → **Gérer les DNS**

### 4.2 Ajouter les enregistrements DNS Vercel
Dans Hostinger DNS, ajouter :

| Type | Nom | Valeur |
|------|-----|--------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

### 4.3 Connecter dans Vercel
1. Vercel → Settings → **Domains**
2. Ajouter `reisetur237.com`
3. Ajouter `www.reisetur237.com`
4. Attendre propagation DNS (~15 min à 24h)

---

## ÉTAPE 5 — Créer le compte Super Admin

### 5.1 S'inscrire via le site
1. Aller sur `https://reisetur237.com/candidate/auth`
2. S'inscrire avec votre email admin
3. Remplir le formulaire

### 5.2 Passer en Super Admin
1. Supabase → **Table Editor** → `profiles`
2. Trouver votre enregistrement
3. Changer `role` de `candidate` → `super_admin`
4. **Save**

### 5.3 Accéder au panneau admin
1. Aller sur `https://reisetur237.com/admin`
2. Se connecter avec vos identifiants

---

## ÉTAPE 6 — Google Analytics 4

### 6.1 Créer la propriété
1. Aller sur **https://analytics.google.com**
2. **Créer une propriété** → `Reisetür 237`
3. URL du site : `https://reisetur237.com`
4. Copier l'**ID de mesure** (format `G-XXXXXXXXXX`)

### 6.2 Ajouter dans Vercel
1. Vercel → Settings → Environment Variables
2. Ajouter `VITE_GA_ID` = `G-XXXXXXXXXX`
3. **Redéployer** : Vercel → Deployments → **Redeploy**

---

## ÉTAPE 7 — Google Search Console

### 7.1 Vérifier le site
1. Aller sur **https://search.google.com/search-console**
2. **Ajouter une propriété** → `https://www.reisetur237.com`
3. Vérifier via **enregistrement DNS** dans Hostinger
4. Ajouter enregistrement TXT fourni par Google

### 7.2 Soumettre le sitemap
1. Search Console → **Sitemaps**
2. Ajouter : `https://www.reisetur237.com/sitemap.xml`
3. Cliquer **Envoyer**

---

## ✅ Checklist finale

- [ ] Supabase — projet créé, schema exécuté, bucket créé
- [ ] GitHub — code poussé sur Namelos2370/reisetur237-website
- [ ] Vercel — déployé, variables d'env configurées
- [ ] Hostinger — DNS configuré
- [ ] Domaine actif : `https://www.reisetur237.com`
- [ ] Compte Super Admin créé
- [ ] Google Analytics configuré
- [ ] Sitemap soumis dans Search Console
- [ ] Tester les 3 langues FR / DE / EN
- [ ] Tester l'inscription candidat
- [ ] Tester le panneau admin
- [ ] Tester sur mobile Android

---

## 🆘 Problèmes courants

| Problème | Solution |
|----------|----------|
| Page blanche au déploiement | Vérifier les variables d'env dans Vercel |
| Erreur Supabase | Vérifier `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` |
| DNS ne se propage pas | Attendre 24h, utiliser https://dnschecker.org |
| Admin inaccessible | Vérifier le rôle dans Supabase → Table `profiles` |
| Build échoue | `npm run build` en local d'abord pour voir l'erreur |
