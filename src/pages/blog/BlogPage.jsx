import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import SEOHead from '../../components/seo/SEOHead'
import { Search, Calendar, ChevronRight, BookOpen } from 'lucide-react'

const NAVY = '#1A1A1A', RED = '#C0392B', GOLD = '#C8A84B'

export const ALL_ARTICLES = [
  {
    id:'1', image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80',
    slug:'ausbildung-pflege-cameroun-guide',
    title_fr:'Guide complet : Partir en Ausbildung Pflege depuis le Cameroun',
    title_de:'Vollständiger Leitfaden: Ausbildung Pflege aus Kamerun',
    title_en:'Complete Guide: Ausbildung Pflege from Cameroon',
    excerpt_fr:"Tout ce que vous devez savoir pour intégrer un programme de formation en soins infirmiers en Allemagne depuis le Cameroun : conditions, étapes, visa.",
    excerpt_en:"Everything you need to know to start a nursing training program in Germany from Cameroon.",
    category:'Formation', created_at:'2026-05-15T10:00:00Z', read_time:8,
    content_fr:`## Qu'est-ce que l'Ausbildung Pflege ?

L'**Ausbildung Pflege** est un programme de formation professionnelle en soins infirmiers en Allemagne, d'une durée de **3 ans**. Il permet d'obtenir un diplôme reconnu dans toute l'Union Européenne et d'accéder à un emploi stable, bien rémunéré et en forte demande.

L'Allemagne compte aujourd'hui plus de **300 000 postes non pourvus** dans le secteur médical.

## Conditions d'accès depuis le Cameroun

- **Niveau de langue** : Minimum B2 en allemand (certifié)
- **Diplôme** : Baccalauréat ou équivalent reconnu
- **Âge** : Généralement entre 18 et 35 ans
- **Bonne condition physique** : Les soins infirmiers sont exigeants physiquement et mentalement

## Les étapes du processus avec Reisetür 237

### 1. Formation linguistique
Commencez au niveau A1 chez Reisetür 237. Progressez jusqu'au B2 en 8 mois avec nos formateurs certifiés.

### 2. Constitution du dossier
- CV en allemand (Lebenslauf)
- Lettre de motivation (Motivationsschreiben)
- Diplômes traduits et apostillés
- Casier judiciaire vierge

### 3. Candidature auprès des établissements
Reisetür 237 vous met en relation avec nos institutions partenaires en Allemagne.

### 4. Obtention du visa national (Visa D)
Une fois votre contrat d'Ausbildung signé, nous vous accompagnons pour le visa.

### 5. Départ et intégration
Orientation pour le logement, l'assurance santé et les premières démarches administratives.

## Avantages de l'Ausbildung Pflege

- **Rémunération dès le premier jour** : entre 800 et 1 200 euros/mois
- **Logement** : souvent pris en charge par l'établissement
- **Titre de séjour** : renouvelable, évolutif vers une résidence permanente
- **Famille** : regroupement familial possible après 2 ans
- **Diplôme européen** : reconnu dans toute l'UE

## Témoignage

*"J'ai commencé les cours d'allemand chez Reisetür 237 en ne connaissant pas un seul mot. 14 mois plus tard, j'étais à Berlin avec mon contrat d'Ausbildung en main."*
— **Marie-Noëlle F.**, infirmière en formation, Berlin

---

Vous souhaitez démarrer votre parcours Ausbildung ? Contactez Reisetür 237 dès aujourd'hui.`,
  },
  {
    id:'2', image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=80',
    slug:'visa-etudiant-allemagne-documents',
    title_fr:'Visa etudiant Allemagne : la liste complete des documents',
    title_de:'Studentenvisum Deutschland: die vollstandige Dokumentenliste',
    title_en:'Germany Student Visa: the complete document checklist',
    excerpt_fr:"Dossier complet, delais, rendez-vous consulaire — tout ce qu'il faut preparer pour votre visa etudiant vers l'Allemagne.",
    excerpt_en:"Complete file, deadlines, consulate appointment — everything to prepare for your student visa.",
    category:'Visa', created_at:'2026-05-10T10:00:00Z', read_time:6,
    content_fr:`## Le visa national allemand (Type D)

Pour étudier en Allemagne, les ressortissants camerounais ont besoin d'un **visa national de long séjour (Type D)**, délivré par l'Ambassade d'Allemagne à Yaoundé.

## Documents requis

### Documents personnels
- Passeport valide (min. 6 mois après la fin du séjour)
- 2 photos biométriques (35x45mm, fond blanc)
- Acte de naissance + traduction officielle en allemand
- Casier judiciaire n°3 (moins de 3 mois)

### Documents académiques
- Diplômes originaux + traductions assermentées
- Relevés de notes des 3 dernières années

### Documents financiers
- **10 332 euros** sur un Sperrkonto (Fintiba, Expatrio, Deutsche Bank) OU
- Verpflichtungserklärung d'un répondant en Allemagne OU
- Contrat d'Ausbildung mentionnant la rémunération

### Documents d'admission
- Lettre d'admission de l'université ou contrat d'Ausbildung signé
- Assurance santé valable en Allemagne

## Délais à prévoir

| Étape | Délai estimé |
|-------|-------------|
| Prise de rendez-vous consulaire | 4 à 8 semaines |
| Traitement du dossier | 6 à 12 semaines |
| Total | 3 à 5 mois avant le départ |

---

Reisetür 237 vérifie et constitue votre dossier complet pour maximiser vos chances.`,
  },
  {
    id:'3', image:'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=700&q=80',
    slug:'temoignage-marie-infirmiere-berlin',
    title_fr:'Temoignage : Marie-Noelle, infirmiere a Berlin grace a Reisetur 237',
    title_de:'Erfahrungsbericht: Marie-Noelle, Krankenschwester in Berlin',
    title_en:'Testimonial: Marie-Noelle, nurse in Berlin thanks to Reisetur 237',
    excerpt_fr:"Je suis partie de Yaoundé avec zéro expérience en allemand. Aujourd'hui je travaille dans une clinique à Berlin.",
    excerpt_en:"I left Yaounde with zero German experience. Today I work in a Berlin clinic.",
    category:'Témoignages', created_at:'2026-05-05T10:00:00Z', read_time:4,
    content_fr:`## Une aventure qui a commencé ici, à Yaoundé

Marie-Noëlle F., 26 ans, est aujourd'hui en 2ème année d'Ausbildung Pflege dans une clinique berlinoise.

---

**Comment avez-vous connu Reisetür 237 ?**

Je n'avais aucune base en allemand et ça me semblait impossible. En venant ici, on m'a expliqué le parcours étape par étape. Ça m'a donné confiance.

**Comment s'est passée la formation linguistique ?**

J'ai suivi les cours du A1 au B2 chez Reisetür 237. Les formateurs sont très bons. Le niveau B2, je l'ai obtenu du premier coup.

**Et la constitution du dossier ?**

Mon CV en allemand, ma lettre de motivation, les traductions — tout a été fait avec eux. Ils ont même préparé mon entretien simulé pour l'ambassade.

**Votre message pour ceux qui hésitent ?**

Ne dites pas que c'est impossible. Moi j'ai commencé à zéro. Si vous êtes prêt à travailler, Reisetür 237 vous donne tous les outils.

---

Marie-Noëlle est l'une des candidates dont Reisetür 237 a accompagné le dossier de A à Z.`,
  },
  {
    id:'4', image:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
    slug:'temoignages-groupe-formation-allemagne',
    title_fr:'Ils sont partis ensemble : 3 candidats, une meme ecole a Berlin',
    title_de:'Sie gingen zusammen: 3 Kandidaten, eine Schule in Berlin',
    title_en:'They left together: 3 candidates, one school in Berlin',
    excerpt_fr:"Jean-Paul, Honorine et Leslie ont suivi le même parcours chez Reisetür 237 et se retrouvent aujourd'hui dans la même école à Berlin.",
    excerpt_en:"Jean-Paul, Honorine and Leslie followed the same path at Reisetur 237.",
    category:'Témoignages', created_at:'2026-04-25T10:00:00Z', read_time:5,
    content_fr:`## Trois amis, un même rêve, un même départ

### Jean-Paul, 27 ans
Le fait de se retrouver à plusieurs ça aide vraiment. On se motivait mutuellement pendant les cours. Maintenant à Berlin dans la même structure, c'est un confort énorme.

### Honorine, 24 ans
Reisetür 237 nous a préparés à la réalité, pas à une image idéalisée. On nous a dit que les premiers mois seraient difficiles. Parce qu'on était préparés, on n'a pas paniqué.

### Leslie, 25 ans
Reisetür 237 suivait les dossiers jusqu'au bout. Ils ont géré mon dossier consulaire, mon assurance, mon contrat. Aujourd'hui j'ai un salaire, un logement, et une perspective d'avenir en Europe.

---

Jean-Paul, Honorine et Leslie font partie de la même promotion Reisetür 237.`,
  },
  {
    id:'5', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80',
    slug:'temoignages-formations-differentes',
    title_fr:'Deux parcours differents, deux reussites : Yvan et Valerie',
    title_de:'Zwei verschiedene Wege, zwei Erfolge: Yvan und Valerie',
    title_en:'Two different paths, two successes: Yvan and Valerie',
    excerpt_fr:"Yvan est en Ausbildung à Hambourg. Valerie suit une formation en hôtellerie à Malte. Deux profils, une même agence.",
    excerpt_en:"Yvan is in Hamburg. Valerie is studying hospitality in Malta. Two profiles, one agency.",
    category:'Témoignages', created_at:'2026-04-15T10:00:00Z', read_time:5,
    content_fr:`## Deux chemins, une même confiance

### Yvan, Hambourg — Ausbildung Pflege
Ce qui m'a décidé c'est la clarté du parcours. Pas de promesses vagues. Je gagne environ 1 050 euros par mois en formation. Dans 2 ans j'aurai un diplôme reconnu partout en Europe.

---

### Valerie, Malte — Formation en Hôtellerie
Reisetür 237 m'a orientée vers Domain Academy. Ils ont tout géré : l'admission, le visa, le logement. Après cette formation je veux travailler dans l'hôtellerie de luxe en Europe.

---

Yvan et Valerie illustrent la diversité des destinations que Reisetür 237 accompagne.`,
  },
  {
    id:'6', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
    slug:'malte-etudes-anglophones',
    title_fr:"Etudier a Malte : l'option anglophone abordable en Europe",
    title_de:"Studieren auf Malta: die erschwingliche englischsprachige Option",
    title_en:"Study in Malta: the affordable English-language option in Europe",
    excerpt_fr:"Malte attire de plus en plus d'étudiants africains grâce à ses programmes anglophones et son coût de vie modéré.",
    excerpt_en:"Malta is attracting more African students thanks to its English programs.",
    category:'Migration', created_at:'2026-04-08T10:00:00Z', read_time:5,
    content_fr:`## Pourquoi Malte ?

Malte est membre de l'UE, pays anglophone, avec des programmes universitaires reconnus à coût modéré.

## Les avantages

- **Langue anglaise** : tous les programmes en anglais
- **Coût modéré** : loyers entre 400 et 700 euros/mois
- **Diplôme européen** reconnu dans toute l'UE
- **Cadre de vie** méditerranéen exceptionnel

## Notre partenaire : Domain Academy

Reisetür 237 travaille avec **Domain Academy** à Mosta : gestion hôtelière, Business Administration, IT.

## Conditions

- Anglais B2 minimum
- Baccalauréat ou équivalent
- Durée : 1 à 3 ans selon le programme

---

Intéressé par Malte ? Contactez Reisetür 237 pour une évaluation gratuite.`,
  },
  {
    id:'7', image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80',
    slug:'visa-etudiant-allemagne-complet',
    title_fr:"Visa Etudiant Allemagne : Guide complet pour les Camerounais",
    title_en:"Germany Student Visa: Complete Guide for Cameroonians",
    excerpt_fr:"Tout savoir sur le visa étudiant allemand : conditions, documents, Sperrkonto, délais et erreurs à éviter.",
    excerpt_en:"Everything about the German student visa: conditions, documents, deadlines and mistakes to avoid.",
    category:'Visa', created_at:'2026-06-01T10:00:00Z', read_time:7,
    content_fr:`## Qu'est-ce que le Visa Étudiant Allemagne ?

Le visa étudiant allemand, aussi appelé **Visa National Type D**, est indispensable pour tout Camerounais souhaitant poursuivre des études supérieures en Allemagne.

## Qui est concerné ?

- Intégrer une université publique ou privée en Allemagne
- Suivre une formation préparatoire (Studienkolleg)
- Effectuer un stage longue durée dans le cadre d'études

## Conditions d'éligibilité

### Académiques
- Baccalauréat reconnu par les autorités allemandes (via anabin)
- Lettre d'admission officielle d'une université allemande
- Relevés de notes des 3 dernières années

### Linguistiques
- Allemand **B2 minimum** pour les programmes en allemand
- Anglais **B2** pour les programmes anglophones
- Certificat reconnu : Goethe-Institut, telc, ÖSD ou ECL

### Financières

**Option 1 — Sperrkonto**
Bloquer **10 332 euros** sur un compte allemand agréé (Fintiba, Expatrio, Deutsche Bank). Déblocage progressif : **861 euros/mois**.

**Option 2 — Verpflichtungserklarung**
Un répondant en Allemagne s'engage à couvrir vos frais. Document notarié obligatoire.

## Documents à fournir

### Personnels
- Passeport biométrique valide (min. 6 mois après le séjour)
- 2 photos biométriques (35x45mm, fond blanc)
- Acte de naissance + traduction certifiée en allemand
- Casier judiciaire n°3 de moins de 3 mois

### Académiques
- Lettre d'admission originale
- Baccalauréat + traduction assermentée
- Relevés de notes + traductions

### Financiers
- Attestation Sperrkonto OU Verpflichtungserklarung
- Attestation d'assurance santé valable en Allemagne

### Complémentaires
- Justificatif de logement (si disponible)
- Formulaire de visa rempli en ligne
- Reçu de paiement des frais consulaires (75 euros)

## Délais à prévoir

| Étape | Durée estimée |
|-------|--------------|
| Obtenir l'admission | 2 à 4 mois |
| Ouvrir le Sperrkonto | 1 à 2 semaines |
| Rendez-vous consulaire | 4 à 10 semaines |
| Traitement du visa | 6 à 12 semaines |
| Total | 5 à 7 mois avant le départ |

## Erreurs fréquentes à éviter

- Traductions non certifiées par un traducteur assermenté
- Passeport avec moins de 6 mois de validité résiduelle
- Sperrkonto insuffisant ou ouvert trop tard
- Dossier incomplet au rendez-vous consulaire

## Après l'obtention du visa

- Inscription à la mairie (Anmeldung) dans les 14 jours
- Ouvrir un compte bancaire local
- S'inscrire à l'assurance maladie étudiante
- Confirmer votre inscription à l'université

---

De la préparation linguistique à la constitution du dossier, Reisetür 237 vous guide à chaque étape.`,
  },
  {
    id:'8', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
    slug:'visa-etudiant-malte-complet',
    title_fr:"Visa Etudiant Malte : Tout savoir pour etudier en anglais dans l'UE",
    title_en:"Malta Student Visa: Everything to Study in English in the EU",
    excerpt_fr:"Malte, pays anglophone de l'UE, attire des milliers d'étudiants africains. Voici comment obtenir votre visa étudiant maltais depuis le Cameroun.",
    excerpt_en:"Malta attracts thousands of African students. Here's how to get your student visa from Cameroon.",
    category:'Visa', created_at:'2026-05-28T10:00:00Z', read_time:6,
    content_fr:`## Pourquoi choisir Malte pour ses études ?

Malte est membre de l'UE, anglophone, avec des programmes universitaires reconnus à coût modéré.

## Le Visa Étudiant Maltais (Single Permit)

Les Camerounais doivent obtenir un **permis unique (Single Permit)** combinant autorisation de séjour et de formation, délivré par Identity Malta Agency.

## Conditions d'éligibilité

- Baccalauréat ou équivalent reconnu
- Lettre d'admission d'un établissement agréé (notre partenaire : **Domain Academy**, Mosta)
- Anglais **B2 minimum**
- Ressources : minimum **500 euros/mois** de séjour

## Documents requis

### Personnels
- Passeport biométrique valide
- 2 photos biométriques
- Acte de naissance traduit en anglais
- Casier judiciaire vierge traduit en anglais

### Académiques
- Lettre d'admission officielle de Domain Academy
- Baccalauréat + traduction en anglais
- Relevés de notes + traduction

### Financiers
- Relevé bancaire des 3 derniers mois
- Ou lettre de prise en charge

### Médicaux
- Bilan médical de moins de 3 mois
- Vaccinations à jour

## Délais et coûts

| Étape | Détail |
|-------|--------|
| Frais de dossier | 280,50 euros (Single Permit) |
| Traitement | 6 à 10 semaines |

## Avantages du visa maltais

- Programme en **anglais** — pas d'allemand requis
- Coût de vie **abordable** (loyers 350 à 600 euros/mois)
- **Diplôme européen** reconnu dans toute l'UE
- Possibilité de travailler **20h/semaine** pendant les études
- Accès à l'espace Schengen

---

Reisetür 237 est en partenariat direct avec Domain Academy à Malte. Nous gérons votre admission, votre dossier visa et votre logement.`,
  },
  {
    id:'9', image:'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=80',
    slug:'visa-ausbildung-formation-professionnelle',
    title_fr:"Visa Ausbildung : Comment obtenir votre visa de formation professionnelle en Allemagne",
    title_en:"Ausbildung Visa: How to Get Your Vocational Training Visa for Germany",
    excerpt_fr:"Le visa Ausbildung est différent du visa étudiant. Découvrez ses spécificités et pourquoi c'est la voie royale vers l'emploi en Allemagne.",
    excerpt_en:"The Ausbildung visa differs from the student visa. Learn why it is the best path to employment in Germany.",
    category:'Visa', created_at:'2026-05-25T10:00:00Z', read_time:7,
    content_fr:`## Qu'est-ce que le Visa Ausbildung ?

Le **Visa Ausbildung** est un visa national Type D lié à un **contrat de formation signé avec un employeur allemand**. Vous êtes à la fois en formation et salarié dès le premier jour.

## Pourquoi c'est avantageux ?

- **Rémunération immédiate** : 800 à 1 500 euros/mois selon la filière
- **Pas de Sperrkonto** : votre salaire justifie vos ressources
- **Emploi garanti** à l'issue de la formation
- **Titre de séjour** évolutif vers une résidence permanente
- **Regroupement familial** possible après 2 ans

## Filières disponibles via Reisetür 237

| Filière | Niveau langue | Salaire formation |
|---------|--------------|------------------|
| Pflegefachfrau/mann (Soins) | B2 | 1 200 à 1 500 euros/mois |
| Elektriker/in (Electricien) | B1 | 800 à 1 200 euros/mois |
| Hotelkaufmann/-frau | B2 | 942 à 1 176 euros/mois |
| Koch/Kochin (Cuisinier) | B1 | 800 à 1 100 euros/mois |
| Kfz-Mechatroniker/in | B1 | 1 066 à 1 279 euros/mois |

## Conditions d'éligibilité

- Contrat d'Ausbildung signé avec un employeur allemand
- Niveau de langue certifié (B1 ou B2 selon la filière)
- Baccalauréat ou équivalent reconnu
- Age : 18 à 35 ans généralement

## Documents à fournir

### Personnels
- Passeport biométrique valide
- 2 photos biométriques
- Acte de naissance + traduction certifiée en allemand
- Casier judiciaire n°3 (moins de 3 mois)

### De formation
- **Contrat d'Ausbildung original** signé
- Attestation de l'employeur confirmant le poste
- Description de la formation

### Académiques
- Baccalauréat + traduction assermentée
- Relevés de notes + traductions

### Linguistiques
- Certificat B1 ou B2 (telc, Goethe, OSD, ECL)

## Le processus avec Reisetür 237

### Etape 1 — Formation linguistique
A1 vers B2 en 8 mois chez Reisetür 237 Language Center.

### Etape 2 — Recherche d'employeur
Reisetür 237 prospecte ses partenaires allemands pour vous trouver un contrat adapté.

### Etape 3 — Constitution du dossier
CV Lebenslauf, Motivationsschreiben, traductions officielles.

### Etape 4 — Visa et départ
Accompagnement pour le dépôt à l'ambassade et la préparation de l'entretien consulaire.

## Délais à prévoir

| Étape | Durée estimée |
|-------|--------------|
| Formation A1 vers B2 | 8 mois |
| Recherche du contrat | 1 à 3 mois |
| Traitement du visa | 2 à 4 mois |
| Total | 11 à 15 mois |

---

Chaque mois de retard est un mois de moins vers votre avenir en Allemagne. Les cours commencent maintenant chez Reisetür 237.`,
  },
  {
    id:'10', image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80',
    slug:'visa-travail-qualifie-fachkrafte',
    title_fr:"Visa Travail Qualifie : La voie directe vers l'emploi en Allemagne",
    title_en:"Skilled Worker Visa: The Direct Path to Employment in Germany",
    excerpt_fr:"Vous avez un diplôme reconnu et une expérience professionnelle ? Le visa travail qualifié vous permet d'accéder directement au marché de l'emploi européen.",
    excerpt_en:"Have a recognized degree and work experience? The skilled worker visa gives you direct access to the European job market.",
    category:'Visa', created_at:'2026-05-20T10:00:00Z', read_time:6,
    content_fr:`## Le Visa Fachkrafte : c'est quoi ?

La **Fachkrafteeinwanderung** permet aux professionnels qualifiés hors UE de travailler en Allemagne, avec un diplôme reconnu et une offre d'emploi d'un employeur allemand.

## Qui peut en bénéficier ?

- Diplôme universitaire ou professionnel **reconnu en Allemagne**
- **Offre d'emploi concrète** d'un employeur allemand
- Niveau de langue **B1 à B2** selon le poste
- Expérience professionnelle dans le domaine

## Secteurs en forte demande

| Secteur | Postes disponibles | Langue requise |
|---------|-------------------|----------------|
| Soins infirmiers | 300 000+ | B2 |
| Ingénierie et BTP | 150 000+ | B1 |
| Technologies de l'information | 130 000+ | B1 |
| Hotellerie et restauration | 90 000+ | B1 |

## Etape clé : la reconnaissance du diplôme (Anerkennung)

Votre diplôme camerounais doit être reconnu via anabin, KMK ou la chambre professionnelle compétente.

## Documents requis

### Personnels
- Passeport valide
- Photos biométriques
- Acte de naissance + traduction assermentée
- Casier judiciaire vierge

### Professionnels
- Diplôme(s) + traductions assermentées
- **Attestation d'Anerkennung**
- Contrat de travail allemand signé
- CV Lebenslauf en allemand
- Motivationsschreiben

### Linguistiques
- Certificat B1 ou B2 (telc, Goethe, OSD, ECL)

## Salaires indicatifs en Allemagne

| Poste | Salaire brut mensuel |
|-------|---------------------|
| Infirmier/ere diplome(e) | 2 800 à 3 800 euros |
| Ingenieur(e) BTP | 3 500 à 5 000 euros |
| Developpeur/se IT | 4 000 à 6 000 euros |
| Cuisinier(e) qualifie(e) | 2 200 à 3 000 euros |

## Délais à prévoir

| Étape | Durée estimée |
|-------|--------------|
| Reconnaissance du diplôme | 2 à 6 mois |
| Recherche d'employeur | 1 à 4 mois |
| Traitement du visa | 6 à 12 semaines |
| Total | 5 à 12 mois |

---

Les opportunités d'emploi qualifié en Allemagne ne manquent pas. Commencez dès aujourd'hui votre formation linguistique chez Reisetür 237.`,
  },
  {
    id:'11', image:'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=80',
    slug:'visa-vacances-travail-allemagne',
    title_fr:"Visa Vacances-Travail Allemagne : Mode d'emploi pour les Camerounais",
    title_en:"Germany Working Holiday Visa: How It Works for Cameroonians",
    excerpt_fr:"Le visa vacances-travail permet de vivre et travailler en Allemagne jusqu'à 12 mois. Conditions, limites et alternatives pour les Camerounais.",
    excerpt_en:"The working holiday visa lets you live and work in Germany for up to 12 months.",
    category:'Visa', created_at:'2026-05-18T10:00:00Z', read_time:5,
    content_fr:`## Qu'est-ce que le Visa Vacances-Travail ?

Le visa vacances-travail permet aux jeunes de séjourner en Allemagne jusqu'à **12 mois**, en combinant voyage et activité professionnelle.

**Important** : Le Cameroun ne fait pas partie des pays avec un accord bilatéral de vacances-travail avec l'Allemagne. Mais des **alternatives légales** existent.

## Les alternatives disponibles pour les Camerounais

### 1. Visa de recherche d'emploi (Jobsuchevisum)
Séjourner **6 mois** en Allemagne pour chercher un emploi qualifié. Conditions :
- Diplôme universitaire reconnu
- Ressources suffisantes (environ 1 000 euros/mois)
- Allemand B1 minimum

### 2. Visa FSJ / BFD (Service volontaire)
Le **Freiwilliges Soziales Jahr** permet un service volontaire rémunéré pendant **6 à 18 mois** :
- Hébergement souvent fourni
- Indemnité : 200 à 700 euros/mois
- Apprentissage intensif de l'allemand

### 3. Stage longue durée (Praktikum)
Travailler dans une entreprise allemande jusqu'à **12 mois** dans le cadre d'une convention de stage.

## Ce que vous pouvez faire pendant ces séjours

- Travailler légalement dans des emplois non qualifiés
- Améliorer votre allemand en immersion
- Etablir un réseau professionnel en Allemagne
- Préparer une candidature Ausbildung ou emploi qualifié

## Conditions générales

| Critère | Détail |
|---------|--------|
| Age | 18 à 35 ans |
| Niveau allemand | A2 minimum (B1 recommandé) |
| Ressources | 500 à 1 000 euros/mois |
| Casier judiciaire | Vierge obligatoire |

---

Chaque situation est unique. Reisetür 237 évalue votre profil et vous oriente vers la meilleure option légale.`,
  },
  {
    id:'12', image:'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=700&q=80',
    slug:'visa-regroupement-familial-allemagne',
    title_fr:"Visa Regroupement Familial en Allemagne : Rejoindre un proche installe en Europe",
    title_en:"Family Reunification Visa Germany: Joining a Relative Settled in Europe",
    excerpt_fr:"Votre conjoint ou un parent est en Allemagne ? Le regroupement familial vous permet de les rejoindre légalement depuis le Cameroun.",
    excerpt_en:"Your spouse or parent is in Germany? Family reunification lets you join them legally from Cameroon.",
    category:'Visa', created_at:'2026-05-15T10:00:00Z', read_time:6,
    content_fr:`## Qu'est-ce que le Visa de Regroupement Familial ?

Le **visa de regroupement familial** (Familienzusammenfuhrung) permet aux membres de la famille d'une personne légalement installée en Allemagne de la rejoindre pour s'y établir durablement.

## Qui peut demander ce visa ?

### Cas 1 — Conjoint(e) d'un résident en Allemagne
- Mariage légalement reconnu
- Le répondant dispose d'un logement suffisant
- Le répondant peut subvenir aux besoins du foyer
- Niveau d'allemand **A1 minimum** du demandeur

### Cas 2 — Enfant mineur
Un enfant mineur peut rejoindre ses parents légalement établis en Allemagne.

### Cas 3 — Conjoint d'un titulaire de Blue Card EU
Si votre conjoint est titulaire d'une **Blue Card EU**, le regroupement est facilité et accéléré.

## Conditions générales

| Condition | Détail |
|-----------|--------|
| Titre de séjour du répondant | Valide depuis au moins 1 an |
| Logement | Surface minimale selon la famille |
| Ressources | Revenus suffisants sans aide sociale |
| Langue | A1 en allemand pour le conjoint |
| Assurance santé | Obligatoire pour toute la famille |

## Documents requis

### Du demandeur (au Cameroun)
- Passeport biométrique valide
- 2 photos biométriques
- Acte de naissance + traduction en allemand
- Acte de mariage + traduction (pour le conjoint)
- Casier judiciaire vierge
- Certificat de langue A1 en allemand
- Formulaire de visa rempli

### Du répondant (en Allemagne)
- Titre de séjour valide
- Justificatif de domicile
- Fiches de paie ou preuves de ressources
- Attestation d'assurance santé couvrant la famille

## Délais et coûts

| Étape | Durée estimée |
|-------|--------------|
| Apprentissage A1 | 2 mois chez Reisetür 237 |
| Constitution du dossier | 4 à 6 semaines |
| Rendez-vous consulaire | 4 à 8 semaines |
| Traitement du visa | 6 à 12 semaines |
| Total | 4 à 6 mois |

Frais consulaires : 75 euros par adulte / gratuit pour les enfants de moins de 6 ans.

## Cas particulier : Ausbildung et regroupement familial

En Ausbildung depuis **2 ans** en Allemagne ? Vous avez le droit de demander le regroupement familial pour votre conjoint et vos enfants mineurs.

---

Que vous soyez le demandeur au Cameroun ou le répondant en Allemagne, Reisetür 237 vous aide à préparer votre niveau A1, constituer un dossier complet et maximiser vos chances d'obtenir le visa rapidement.`,
  },
]

const CATS = { fr: ['Tous','Formation','Visa','Témoignages','Migration'], de: ['Alle','Ausbildung','Visum','Erfahrungsberichte','Migration'], en: ['All','Training','Visa','Testimonials','Migration'] }
const ICONS = { 'Formation':'🎓','Visa':'📋','Témoignages':'💬','Migration':'✈️','Actualités':'📰','Ausbildung':'🎓','Erfahrungsberichte':'💬','Training':'🎓','Testimonials':'💬','News':'📰' }
const CAT_COLORS = { 'Formation':{ bg:'#D1FAE5',c:'#059669' },'Visa':{ bg:'#FEE2E2',c:'#DC2626' },'Témoignages':{ bg:'#FEF3C7',c:'#D97706' },'Migration':{ bg:'#DBEAFE',c:'#1D4ED8' } }

export default function BlogPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0,2) || 'fr'
  const [articles, setArticles] = useState(ALL_ARTICLES)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tous')

  useEffect(() => {
    supabase.from('articles').select('*').eq('published',true).order('created_at',{ascending:false})
      .then(({ data }) => {
        if (data?.length > 0) {
          const supabaseIds = data.map(a => a.slug)
          const staticFiltered = ALL_ARTICLES.filter(a => !supabaseIds.includes(a.slug))
          setArticles([...data, ...staticFiltered])
        }
      })
  }, [])

  const getTitle   = a => a[`title_${lang}`]   || a.title_fr   || ''
  const getExcerpt = a => a[`excerpt_${lang}`] || a.excerpt_fr || ''
  const cats = CATS[lang] || CATS.fr

  const filtered = articles.filter(a => {
    const matchCat = cat === 'Tous' || cat === 'Alle' || cat === 'All' || a.category === cat
    const matchS = getTitle(a).toLowerCase().includes(search.toLowerCase())
    return matchCat && matchS
  })

  const L = {
    fr: { badge:'Blog', title:'Blog & Actualités', sub:'Informations, guides et témoignages', search:'Rechercher...', readMore:'Lire la suite', readTime:'min de lecture', none:'Aucun article trouvé.' },
    de: { badge:'Blog', title:'Blog & Neuigkeiten', sub:'Informationen, Ratgeber und Erfahrungsberichte', search:'Suchen...', readMore:'Weiterlesen', readTime:'Min. Lesezeit', none:'Keine Artikel gefunden.' },
    en: { badge:'Blog', title:'Blog & News', sub:'Information, guides and testimonials', search:'Search...', readMore:'Read more', readTime:'min read', none:'No articles found.' },
  }[lang] || { badge:'Blog', title:'Blog & Actualités', sub:'', search:'Rechercher...', readMore:'Lire la suite', readTime:'min', none:'Aucun article.' }

  return (
    <>
      <SEOHead />
      <div style={{ paddingTop:62, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ background:`linear-gradient(135deg,${NAVY},#1B3E6F)`, padding:'64px 32px 56px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:'linear-gradient(rgba(255,255,255,.6)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6)1px,transparent 1px)', backgroundSize:'50px 50px' }}/>
          <p style={{ color:GOLD, fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'.18em', marginBottom:12 }}>{L.badge}</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,5vw,46px)', fontWeight:700, color:'#fff', marginBottom:14 }}>{L.title}</h1>
          <div style={{ width:48, height:4, background:GOLD, borderRadius:2, margin:'0 auto 18px' }}/>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:17 }}>{L.sub}</p>
        </div>

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 28px' }}>
          <div style={{ display:'flex', gap:12, marginBottom:28, flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', border:'1.5px solid #E2E8F0', borderRadius:12, padding:'9px 16px', flex:1, minWidth:200 }}>
              <Search size={14} color="#94A3B8" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L.search} style={{ border:'none', outline:'none', fontSize:14, flex:1 }} />
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {cats.map(c => (
                <button key={c} onClick={()=>setCat(c)} style={{ background:cat===c?NAVY:'#fff', color:cat===c?'#fff':'#64748B', border:'1.5px solid #E2E8F0', borderRadius:9, padding:'8px 14px', fontSize:12.5, fontWeight:600, cursor:'pointer' }}>{c}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0
            ? <div style={{ textAlign:'center', padding:'64px 0', color:'#94A3B8' }}><BookOpen size={40} style={{ marginBottom:12, opacity:.4 }}/><p>{L.none}</p></div>
            : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:22 }}>
                {filtered.map((a,i) => {
                  return (
                    <Link key={a.id} to={`/blog/${a.slug||a.id}`} style={{ textDecoration:'none' }}>
                      <div style={{ background:'#fff', borderRadius:18, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1.5px solid #F1F5FB', height:'100%', display:'flex', flexDirection:'column' }}>
                        <div style={{ position:'relative', height:180, overflow:'hidden' }}>
                          {a.image ? <img src={a.image} alt={getTitle(a)} style={{ width:'100%', height:'100%', objectFit:'cover' }} loading='lazy'/> : <div style={{ height:'100%', background:i%3===0?`linear-gradient(135deg,${NAVY},#2a0707)`:i%3===1?`linear-gradient(135deg,#1B3E6F,#2563A8)`:`linear-gradient(135deg,${NAVY},${RED})` }}/>}
                          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))' }}/>
                          <span style={{ position:'absolute', top:12, left:12, background:'rgba(255,255,255,0.15)', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999 }}>{a.category}</span>
                          <span style={{ position:'absolute', bottom:12, left:12, fontSize:22 }}>{ICONS[a.category]||'📰'}</span>
                        </div>
                        <div style={{ padding:"18px 20px", flex:1, display:"flex", flexDirection:"column" }}>
                          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15.5, fontWeight:700, color:NAVY, lineHeight:1.4, marginBottom:10, flex:1 }}>{getTitle(a)}</h3>
                          <p style={{ color:'#64748B', fontSize:13, lineHeight:1.65, marginBottom:14 }}>{(getExcerpt(a)||'').slice(0,110)}...</p>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #F1F5FB', paddingTop:10 }}>
                            <span style={{ display:'flex', alignItems:'center', gap:5, color:'#94A3B8', fontSize:11.5 }}>
                              <Calendar size={11} />{new Date(a.created_at).toLocaleDateString(lang==='fr'?'fr-FR':lang==='de'?'de-DE':'en-GB')}
                              {a.read_time && <span style={{ marginLeft:6 }}>· {a.read_time} {L.readTime}</span>}
                            </span>
                            <span style={{ color:RED, fontSize:12.5, fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>{L.readMore} <ChevronRight size={12}/></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
          }
        </div>
      </div>
    </>
  )
}
