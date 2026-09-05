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

- **Rémunération dès le premier jour** : entre 800 et 1 200 €/mois
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
    title_fr:'Visa étudiant Allemagne : la liste complète des documents',
    title_de:'Studentenvisum Deutschland: die vollständige Dokumentenliste',
    title_en:'Germany Student Visa: the complete document checklist',
    excerpt_fr:'Dossier complet, délais, rendez-vous consulaire — tout ce qu'il faut préparer pour votre visa étudiant vers l'Allemagne.',
    excerpt_en:'Complete file, deadlines, consulate appointment — everything to prepare for your student visa.',
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
- **10 332 €** sur un Sperrkonto (Fintiba, Expatrio, Deutsche Bank) OU
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
| **Total** | **3 à 5 mois avant le départ** |

---

Reisetür 237 vérifie et constitue votre dossier complet pour maximiser vos chances.`,
  },
  {
    id:'3', image:'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=700&q=80',
    slug:'temoignage-marie-infirmiere-berlin',
    title_fr:'Témoignage : Marie-Noëlle, infirmière à Berlin grâce à Reisetür 237',
    title_de:'Erfahrungsbericht: Marie-Noëlle, Krankenschwester in Berlin',
    title_en:'Testimonial: Marie-Noëlle, nurse in Berlin thanks to Reisetür 237',
    excerpt_fr:"\"Je suis partie de Yaoundé avec zéro expérience en allemand. Aujourd'hui je travaille dans une clinique à Berlin.\"",
    excerpt_en:"\"I left Yaoundé with zero German experience. Today I work in a Berlin clinic.\"",
    category:'Témoignages', created_at:'2026-05-05T10:00:00Z', read_time:4,
    content_fr:`## Une aventure qui a commencé ici, à Yaoundé

*Marie-Noëlle F., 26 ans, est aujourd'hui en 2ème année d'Ausbildung Pflege dans une clinique berlinoise.*

---

**Comment avez-vous connu Reisetür 237 ?**

"Je n'avais aucune base en allemand et ça me semblait impossible. En venant ici, on m'a expliqué le parcours étape par étape. Ça m'a donné confiance."

**Comment s'est passée la formation linguistique ?**

"J'ai suivi les cours du A1 au B2 chez Reisetür 237. Les formateurs sont très bons. Le niveau B2, je l'ai obtenu du premier coup."

**Et la constitution du dossier ?**

"Mon CV en allemand, ma lettre de motivation, les traductions — tout a été fait avec eux. Ils ont même préparé mon entretien simulé pour l'ambassade."

**Votre message pour ceux qui hésitent ?**

"Ne dites pas que c'est impossible. Moi j'ai commencé à zéro. Si vous êtes prêt à travailler, Reisetür 237 vous donne tous les outils."

---

*Marie-Noëlle est l'une des candidates dont Reisetür 237 a accompagné le dossier de A à Z.*`,
  },
  {
    id:'4', image:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
    slug:'temoignages-groupe-formation-allemagne',
    title_fr:'Ils sont partis ensemble : 3 candidats, une même école à Berlin',
    title_de:'Sie gingen zusammen: 3 Kandidaten, eine Schule in Berlin',
    title_en:'They left together: 3 candidates, one school in Berlin',
    excerpt_fr:'Jean-Paul, Honorine et Leslie ont suivi le même parcours chez Reisetür 237 et se retrouvent aujourd'hui dans la même école à Berlin.',
    excerpt_en:"Jean-Paul, Honorine and Leslie followed the same path at Reisetür 237.",
    category:'Témoignages', created_at:'2026-04-25T10:00:00Z', read_time:5,
    content_fr:`## Trois amis, un même rêve, un même départ

### Jean-Paul, 27 ans
"Le fait de se retrouver à plusieurs ça aide vraiment. On se motivait mutuellement pendant les cours. Maintenant à Berlin dans la même structure, c'est un confort énorme."

### Honorine, 24 ans
"Reisetür 237 nous a préparés à la réalité, pas à une image idéalisée. On nous a dit que les premiers mois seraient difficiles. Parce qu'on était préparés, on n'a pas paniqué."

### Leslie, 25 ans
"Reisetür 237 suivait les dossiers jusqu'au bout. Ils ont géré mon dossier consulaire, mon assurance, mon contrat. Aujourd'hui j'ai un salaire, un logement, et une perspective d'avenir en Europe."

---

*Jean-Paul, Honorine et Leslie font partie de la même promotion Reisetür 237.*`,
  },
  {
    id:'5', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80',
    slug:'temoignages-formations-differentes',
    title_fr:'Deux parcours différents, deux réussites : Yvan et Valerie',
    title_de:'Zwei verschiedene Wege, zwei Erfolge: Yvan und Valerie',
    title_en:'Two different paths, two successes: Yvan and Valerie',
    excerpt_fr:"Yvan est en Ausbildung à Hambourg. Valerie suit une formation en hôtellerie à Malte. Deux profils, une même agence.",
    excerpt_en:"Yvan is in Hamburg. Valerie is studying hospitality in Malta. Two profiles, one agency.",
    category:'Témoignages', created_at:'2026-04-15T10:00:00Z', read_time:5,
    content_fr:`## Deux chemins, une même confiance

### Yvan, Hambourg — Ausbildung Pflege
"Ce qui m'a décidé c'est la clarté du parcours. Pas de promesses vagues. Je gagne environ 1 050 €/mois en formation. Dans 2 ans j'aurai un diplôme reconnu partout en Europe."

---

### Valerie, Malte — Formation en Hôtellerie
"Reisetür 237 m'a orientée vers Domain Academy. Ils ont tout géré : l'admission, le visa, le logement. Après cette formation je veux travailler dans l'hôtellerie de luxe en Europe."

---

*Yvan et Valerie illustrent la diversité des destinations que Reisetür 237 accompagne.*`,
  },
  {
    id:'6', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
    slug:'malte-etudes-anglophones',
    title_fr:"Étudier à Malte : l'option anglophone abordable en Europe",
    title_de:"Studieren auf Malta: die erschwingliche englischsprachige Option",
    title_en:"Study in Malta: the affordable English-language option in Europe",
    excerpt_fr:"Malte attire de plus en plus d'étudiants africains grâce à ses programmes anglophones et son coût de vie modéré.",
    excerpt_en:"Malta is attracting more African students thanks to its English programs.",
    category:'Migration', created_at:'2026-04-08T10:00:00Z', read_time:5,
    content_fr:`## Pourquoi Malte ?

Malte est membre de l'UE, pays anglophone, avec des programmes universitaires reconnus à coût modéré.

## Les avantages

- **Langue anglaise** : tous les programmes en anglais
- **Coût modéré** : loyers entre 400 et 700 €/mois
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
    title_fr:"Visa Étudiant Allemagne : Guide complet pour les Camerounais",
    title_en:"Germany Student Visa: Complete Guide for Cameroonians",
    excerpt_fr:"Tout savoir sur le visa étudiant allemand : conditions, documents, Sperrkonto, délais et erreurs à éviter — expliqué étape par étape.",
    excerpt_en:"Everything about the German student visa: conditions, documents, deadlines and mistakes to avoid.",
    category:'Visa', created_at:'2026-06-01T10:00:00Z', read_time:7,
    content_fr:`## Qu'est-ce que le Visa Étudiant Allemagne ?

Le visa étudiant allemand, aussi appelé **Visa National Type D**, est indispensable pour tout Camerounais souhaitant poursuivre des études supérieures en Allemagne. Il est délivré par l'Ambassade d'Allemagne à Yaoundé.

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
Bloquer **10 332 €** sur un compte allemand agréé (Fintiba, Expatrio, Deutsche Bank). Déblocage progressif : **861 €/mois**.

**Option 2 — Verpflichtungserklärung**
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
- Attestation Sperrkonto OU Verpflichtungserklärung
- Attestation d'assurance santé valable en Allemagne

### Complémentaires
- Justificatif de logement (si disponible)
- Formulaire de visa rempli en ligne
- Reçu de paiement des frais consulaires (75 €)

## Délais à prévoir

| Étape | Durée estimée |
|-------|--------------|
| Obtenir l'admission | 2 à 4 mois |
| Ouvrir le Sperrkonto | 1 à 2 semaines |
| Rendez-vous consulaire | 4 à 10 semaines |
| Traitement du visa | 6 à 12 semaines |
| **Total** | **5 à 7 mois avant le départ** |

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

De la préparation linguistique à la constitution du dossier, Reisetür 237 vous guide à chaque étape pour maximiser vos chances d'obtenir votre visa étudiant allemand.`,
  },
  {
    id:'8', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
    slug:'visa-etudiant-malte-complet',
    title_fr:"Visa Étudiant Malte : Tout savoir pour étudier en anglais dans l'UE",
    title_en:"Malta Student Visa: Everything to Study in English in the EU",
    excerpt_fr:"Malte, pays anglophone de l'UE, attire des milliers d'étudiants africains. Voici comment obtenir votre visa étudiant maltais depuis le Cameroun.",
    excerpt_en:"Malta attracts thousands of African students. Here's how to get your student visa from Cameroon.",
    category:'Visa', created_at:'2026-05-28T10:00:00Z', read_time:6,
    content_fr:`## Pourquoi choisir Malte pour ses études ?

Malte est membre de l'UE, anglophone, avec des programmes universitaires reconnus à coût modéré. Une porte d'entrée stratégique pour les étudiants africains.

## Le Visa Étudiant Maltais (Single Permit)

Les Camerounais doivent obtenir un **permis unique (Single Permit)** combinant autorisation de séjour et de formation, délivré par Identity Malta Agency.

## Conditions d'éligibilité

- Baccalauréat ou équivalent reconnu
- Lettre d'admission d'un établissement agréé (notre partenaire : **Domain Academy**, Mosta)
- Anglais **B2 minimum**
- Ressources : minimum **500 €/mois** de séjour

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
| Frais de dossier | 280,50 € (Single Permit) |
| Traitement | 6 à 10 semaines |

## Avantages du visa maltais

- Programme en **anglais** — pas d'allemand requis
- Coût de vie **abordable** (loyers 350–600 €/mois)
- **Diplôme européen** reconnu dans toute l'UE
- Possibilité de travailler **20h/semaine** pendant les études
- Accès à l'espace Schengen

---

Reisetür 237 est en partenariat direct avec Domain Academy à Malte. Nous gérons votre admission, votre dossier visa et votre logement — de Yaoundé jusqu'à La Valette.`,
  },
  {
    id:'9', image:'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=80',
    slug:'visa-ausbildung-formation-professionnelle',
    title_fr:"Visa Ausbildung : Comment obtenir votre visa de formation professionnelle en Allemagne",
    title_en:"Ausbildung Visa: How to Get Your Vocational Training Visa for Germany",
    excerpt_fr:"Le visa Ausbildung est différent du visa étudiant. Découvrez ses spécificités, les documents requis et pourquoi c'est la voie royale vers l'emploi en Allemagne.",
    excerpt_en:"The Ausbildung visa differs from the student visa. Learn why it's the best path to employment in Germany.",
    category:'Visa', created_at:'2026-05-25T10:00:00Z', read_time:7,
    content_fr:`## Qu'est-ce que le Visa Ausbildung ?

Le **Visa Ausbildung** est un visa national Type D lié à un **contrat de formation signé avec un employeur allemand**. Vous êtes à la fois en formation et salarié dès le premier jour.

## Pourquoi c'est avantageux ?

- **Rémunération immédiate** : 800 à 1 500 €/mois selon la filière
- **Pas de Sperrkonto** : votre salaire justifie vos ressources
- **Emploi garanti** à l'issue de la formation
- **Titre de séjour** évolutif vers une résidence permanente
- **Regroupement familial** possible après 2 ans

## Filières disponibles via Reisetür 237

| Filière | Niveau langue | Salaire formation |
|---------|--------------|------------------|
| Pflegefachfrau/mann (Soins) | B2 | 1 200 – 1 500 €/mois |
| Elektriker/in (Électricien) | B1 | 800 – 1 200 €/mois |
| Hotelkaufmann/-frau | B2 | 942 – 1 176 €/mois |
| Koch/Köchin (Cuisinier) | B1 | 800 – 1 100 €/mois |
| Kfz-Mechatroniker/in | B1 | 1 066 – 1 279 €/mois |

## Conditions d'éligibilité

- Contrat d'Ausbildung signé avec un employeur allemand
- Niveau de langue certifié (B1 ou B2 selon la filière)
- Baccalauréat ou équivalent reconnu
- Âge : 18 à 35 ans généralement

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
- Certificat B1 ou B2 (telc, Goethe, ÖSD, ECL)

## Le processus avec Reisetür 237

### Étape 1 — Formation linguistique
A1 → B2 en 8 mois chez Reisetür 237 Language Center.

### Étape 2 — Recherche d'employeur
Reisetür 237 prospecte ses partenaires allemands pour vous trouver un contrat adapté.

### Étape 3 — Constitution du dossier
CV Lebenslauf, Motivationsschreiben, traductions officielles.

### Étape 4 — Visa et départ
Accompagnement pour le dépôt à l'ambassade et la préparation de l'entretien consulaire.

## Délais à prévoir

| Étape | Durée estimée |
|-------|--------------|
| Formation A1 → B2 | 8 mois |
| Recherche du contrat | 1 à 3 mois |
| Traitement du visa | 2 à 4 mois |
| **Total** | **11 à 15 mois** |

---

Chaque mois de retard est un mois de moins vers votre avenir en Allemagne. La première étape c'est la langue — et les cours commencent maintenant chez Reisetür 237.`,
  },
  {
    id:'10', image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80',
    slug:'visa-travail-qualifie-fachkrafte',
    title_fr:"Visa Travail Qualifié (Fachkräfteeinwanderung) : La voie directe vers l'emploi en Allemagne",
    title_en:'Skilled Worker Visa: The Direct Path to Employment in Germany',
