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
    title_de:'Vollstandiger Leitfaden: Ausbildung Pflege aus Kamerun',
    title_en:'Complete Guide: Ausbildung Pflege from Cameroon',
    excerpt_fr:"Tout ce que vous devez savoir pour integrer un programme de formation en soins infirmiers en Allemagne depuis le Cameroun : conditions, etapes, visa.",
    excerpt_en:"Everything you need to know to start a nursing training program in Germany from Cameroon.",
    category:'Formation', created_at:'2026-05-15T10:00:00Z', read_time:8,
    content_fr:`## Qu'est-ce que l'Ausbildung Pflege ?

L'**Ausbildung Pflege** est un programme de formation professionnelle en soins infirmiers en Allemagne, d'une duree de **3 ans**. Il permet d'obtenir un diplome reconnu dans toute l'Union Europeenne et d'acceder a un emploi stable, bien remunere et en forte demande.

L'Allemagne compte aujourd'hui plus de **300 000 postes non pourvus** dans le secteur medical.

## Conditions d'acces depuis le Cameroun

- **Niveau de langue** : Minimum B2 en allemand (certifie)
- **Diplome** : Baccalaureat ou equivalent reconnu
- **Age** : Generalement entre 18 et 35 ans
- **Bonne condition physique** : Les soins infirmiers sont exigeants physiquement et mentalement

## Les etapes du processus avec Reisetür 237

### 1. Formation linguistique
Commencez au niveau A1 chez Reisetur 237. Progressez jusqu'au B2 en 8 mois avec nos formateurs certifies.

### 2. Constitution du dossier
- CV en allemand (Lebenslauf)
- Lettre de motivation (Motivationsschreiben)
- Diplomes traduits et apostilles
- Casier judiciaire vierge

### 3. Candidature aupres des etablissements
Reisetur 237 vous met en relation avec nos institutions partenaires en Allemagne.

### 4. Obtention du visa national (Visa D)
Une fois votre contrat d'Ausbildung signe, nous vous accompagnons pour le visa.

### 5. Depart et integration
Orientation pour le logement, l'assurance sante et les premieres demarches administratives.

## Avantages de l'Ausbildung Pflege

- **Remuneration des le premier jour** : entre 800 et 1 200 euros par mois
- **Logement** : souvent pris en charge par l'etablissement
- **Titre de sejour** : renouvelable, evolutif vers une residence permanente
- **Famille** : regroupement familial possible apres 2 ans
- **Diplome europeen** : reconnu dans toute l'UE

---

Vous souhaitez demarrer votre parcours Ausbildung ? Contactez Reisetur 237 des aujourd'hui.`,
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

Pour etudier en Allemagne, les ressortissants camerounais ont besoin d'un **visa national de long sejour (Type D)**, delivre par l'Ambassade d'Allemagne a Yaounde.

## Documents requis

### Documents personnels
- Passeport valide (min. 6 mois apres la fin du sejour)
- 2 photos biometriques (35x45mm, fond blanc)
- Acte de naissance + traduction officielle en allemand
- Casier judiciaire n3 (moins de 3 mois)

### Documents academiques
- Diplomes originaux + traductions assermentees
- Releves de notes des 3 dernieres annees

### Documents financiers
- 10 332 euros sur un Sperrkonto (Fintiba, Expatrio, Deutsche Bank) OU
- Verpflichtungserklaerung d'un repondant en Allemagne OU
- Contrat d'Ausbildung mentionnant la remuneration

### Documents d'admission
- Lettre d'admission de l'universite ou contrat d'Ausbildung signe
- Assurance sante valable en Allemagne

## Delais a prevoir

| Etape | Delai estime |
|-------|-------------|
| Prise de rendez-vous consulaire | 4 a 8 semaines |
| Traitement du dossier | 6 a 12 semaines |
| Total | 3 a 5 mois avant le depart |

---

Reisetur 237 verifie et constitue votre dossier complet pour maximiser vos chances.`,
  },
  {
    id:'3', image:'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=700&q=80',
    slug:'temoignage-marie-infirmiere-berlin',
    title_fr:'Temoignage : Marie-Noelle, infirmiere a Berlin grace a Reisetur 237',
    title_de:'Erfahrungsbericht: Marie-Noelle, Krankenschwester in Berlin',
    title_en:'Testimonial: Marie-Noelle, nurse in Berlin thanks to Reisetur 237',
    excerpt_fr:"Je suis partie de Yaounde avec zero experience en allemand. Aujourd'hui je travaille dans une clinique a Berlin.",
    excerpt_en:"I left Yaounde with zero German experience. Today I work in a Berlin clinic.",
    category:'Temoignages', created_at:'2026-05-05T10:00:00Z', read_time:4,
    content_fr:`## Une aventure qui a commence ici, a Yaounde

Marie-Noelle F., 26 ans, est aujourd'hui en 2eme annee d'Ausbildung Pflege dans une clinique berlinoise.

---

**Comment avez-vous connu Reisetur 237 ?**

Je n'avais aucune base en allemand et ca me semblait impossible. En venant ici, on m'a explique le parcours etape par etape. Ca m'a donne confiance.

**Comment s'est passee la formation linguistique ?**

J'ai suivi les cours du A1 au B2 chez Reisetur 237. Les formateurs sont tres bons. Le niveau B2, je l'ai obtenu du premier coup.

**Et la constitution du dossier ?**

Mon CV en allemand, ma lettre de motivation, les traductions — tout a ete fait avec eux. Ils ont meme prepare mon entretien simule pour l'ambassade.

**Votre message pour ceux qui hesitent ?**

Ne dites pas que c'est impossible. Moi j'ai commence a zero. Si vous etes pret a travailler, Reisetur 237 vous donne tous les outils.

---

Marie-Noelle est l'une des candidates dont Reisetur 237 a accompagne le dossier de A a Z.`,
  },
  {
    id:'4', image:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
    slug:'temoignages-groupe-formation-allemagne',
    title_fr:'Ils sont partis ensemble : 3 candidats, une meme ecole a Berlin',
    title_de:'Sie gingen zusammen: 3 Kandidaten, eine Schule in Berlin',
    title_en:'They left together: 3 candidates, one school in Berlin',
    excerpt_fr:"Jean-Paul, Honorine et Leslie ont suivi le meme parcours chez Reisetur 237 et se retrouvent aujourd'hui dans la meme ecole a Berlin.",
    excerpt_en:"Jean-Paul, Honorine and Leslie followed the same path at Reisetur 237.",
    category:'Temoignages', created_at:'2026-04-25T10:00:00Z', read_time:5,
    content_fr:`## Trois amis, un meme reve, un meme depart

### Jean-Paul, 27 ans
Le fait de se retrouver a plusieurs ca aide vraiment. On se motivait mutuellement pendant les cours. Maintenant a Berlin dans la meme structure, c'est un confort enorme.

### Honorine, 24 ans
Reisetur 237 nous a prepares a la realite, pas a une image idealisee. On nous a dit que les premiers mois seraient difficiles. Parce qu'on etait prepares, on n'a pas panique.

### Leslie, 25 ans
Reisetur 237 suivait les dossiers jusqu'au bout. Ils ont gere mon dossier consulaire, mon assurance, mon contrat. Aujourd'hui j'ai un salaire, un logement, et une perspective d'avenir en Europe.

---

Jean-Paul, Honorine et Leslie font partie de la meme promotion Reisetur 237.`,
  },
  {
    id:'5', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80',
    slug:'temoignages-formations-differentes',
    title_fr:'Deux parcours differents, deux reussites : Yvan et Valerie',
    title_de:'Zwei verschiedene Wege, zwei Erfolge: Yvan und Valerie',
    title_en:'Two different paths, two successes: Yvan and Valerie',
    excerpt_fr:"Yvan est en Ausbildung a Hambourg. Valerie suit une formation en hotellerie a Malte. Deux profils, une meme agence.",
    excerpt_en:"Yvan is in Hamburg. Valerie is studying hospitality in Malta. Two profiles, one agency.",
    category:'Temoignages', created_at:'2026-04-15T10:00:00Z', read_time:5,
    content_fr:`## Deux chemins, une meme confiance

### Yvan, Hambourg — Ausbildung Pflege
Ce qui m'a decide c'est la clarte du parcours. Pas de promesses vagues. Je gagne environ 1 050 euros par mois en formation. Dans 2 ans j'aurai un diplome reconnu partout en Europe.

---

### Valerie, Malte — Formation en Hotellerie
Reisetur 237 m'a orientee vers Domain Academy. Ils ont tout gere : l'admission, le visa, le logement. Apres cette formation je veux travailler dans l'hotellerie de luxe en Europe.

---

Yvan et Valerie illustrent la diversite des destinations que Reisetur 237 accompagne.`,
  },
  {
    id:'6', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
    slug:'malte-etudes-anglophones',
    title_fr:"Etudier a Malte : l'option anglophone abordable en Europe",
    title_de:"Studieren auf Malta: die erschwingliche englischsprachige Option",
    title_en:"Study in Malta: the affordable English-language option in Europe",
    excerpt_fr:"Malte attire de plus en plus d'etudiants africains grace a ses programmes anglophones et son cout de vie modere.",
    excerpt_en:"Malta is attracting more African students thanks to its English programs.",
    category:'Migration', created_at:'2026-04-08T10:00:00Z', read_time:5,
    content_fr:`## Pourquoi Malte ?

Malte est membre de l'UE, pays anglophone, avec des programmes universitaires reconnus a cout modere.

## Les avantages

- **Langue anglaise** : tous les programmes en anglais
- **Cout modere** : loyers entre 400 et 700 euros par mois
- **Diplome europeen** reconnu dans toute l'UE
- **Cadre de vie** mediterraneen exceptionnel

## Notre partenaire : Domain Academy

Reisetur 237 travaille avec **Domain Academy** a Mosta : gestion hoteliere, Business Administration, IT.

## Conditions

- Anglais B2 minimum
- Baccalaureat ou equivalent
- Duree : 1 a 3 ans selon le programme

---

Interesse par Malte ? Contactez Reisetur 237 pour une evaluation gratuite.`,
  },
  {
    id:'13', image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80',
    slug:'apprendre-allemand-yaounde-reisetur',
    title_fr:"Apprendre l'allemand a Yaounde : pourquoi choisir Reisetur 237 Language Center",
    title_en:"Learn German in Yaounde: why choose Reisetur 237 Language Center",
    excerpt_fr:"Cours intensifs, formateurs certifies, materiel offert — Reisetur 237 Language Center est le meilleur endroit pour apprendre l'allemand a Yaounde avant votre depart en Europe.",
    excerpt_en:"Intensive courses, certified trainers, materials included — Reisetur 237 is the best place to learn German in Yaounde.",
    category:'Formation', created_at:'2026-06-05T10:00:00Z', read_time:5,
    content_fr:`## Pourquoi l'allemand est indispensable pour l'Europe ?

L'allemand est la langue la plus parlee en Europe par nombre de locuteurs natifs. Pour un Camerounais souhaitant partir en Ausbildung, travailler ou etudier en Allemagne, la maitrise de la langue n'est pas une option — c'est une condition obligatoire.

## Reisetur 237 Language Center : ce que nous offrons

### Des cours pour tous les niveaux
Du total debutant (A1) au niveau professionnel (C1), nos cours sont structures pour progresser rapidement et efficacement, avec des examens blancs reguliers.

### Des formateurs certifies
Tous nos enseignants sont certifies et formes aux exigences des examens officiels : telc, Goethe-Zertifikat, OSD et ECL.

### Du materiel pedagogique offert
Chaque eleve recoit ses manuels de cours inclus dans les frais de scolarite. Pas de depenses cachees.

### Un environnement d'apprentissage optimal
Salles modernes, wi-fi haut debit, evaluations chaque samedi pour suivre votre progression semaine par semaine.

## Nos tarifs et horaires

| Niveau | Duree | Prix |
|--------|-------|------|
| A1 | 2 mois | 115 000 FCFA |
| A2 | 1,5 mois | 115 000 FCFA |
| B1 | 1,5 mois | 120 000 FCFA |
| B2 | 1,5 mois | 125 000 FCFA |
| C1 | 1,5 mois | 130 000 FCFA |

Frais d'inscription : 5 000 FCFA (promotionnels jusqu'a fin septembre 2026).

## Preparation aux examens officiels

En plus des cours reguliers, Reisetur 237 propose des sessions de preparation intensive aux examens officiels B1 et B2 (telc, Goethe, OSD, ECL) a 45 000 FCFA par mois.

## Nos horaires

Cours du matin : 8h a 12h (lundi au vendredi)
Cours de l'apres-midi : 11h30 a 15h ou 15h a 17h30
Evaluations : samedi 8h a 16h

---

Inscrivez-vous des maintenant et commencez votre parcours vers l'Europe. Les cours demarrent en juillet 2026.`,
  },
  {
    id:'14', image:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80',
    slug:'ausbildung-non-medical-cameroun',
    title_fr:"Ausbildung au-dela du medical : electricien, cuisinier, hotellerie — les filieres disponibles",
    title_en:"Ausbildung beyond nursing: electrician, cook, hospitality — available fields",
    excerpt_fr:"L'Ausbildung en Allemagne ne se limite pas aux soins infirmiers. Decouvrez toutes les filieres accessibles depuis le Cameroun avec un niveau B1 ou B2.",
    excerpt_en:"Ausbildung in Germany goes beyond nursing. Discover all fields accessible from Cameroon with B1 or B2 German.",
    category:'Formation', created_at:'2026-05-30T10:00:00Z', read_time:6,
    content_fr:`## L'Ausbildung : bien plus que les soins infirmiers

Beaucoup de Camerounais associent l'Ausbildung uniquement a la filiere Pflege (soins infirmiers). Or, l'Allemagne offre des centaines de formations duales dans des secteurs tres varies — et toutes permettent d'obtenir un diplome europeen reconnu avec un salaire des le premier jour.

## Les filieres disponibles via Reisetur 237

### Electricien (Elektriker/in)
- Niveau allemand requis : B1
- Duree de formation : 3 ans et demi
- Salaire pendant la formation : 800 a 1 200 euros par mois
- Salaire apres : 2 500 a 3 500 euros par mois
- Debouches : BTP, industrie, energie, domotique, telecoms

### Cuisinier (Koch/Kochin)
- Niveau allemand requis : B1
- Duree : 3 ans
- Salaire pendant la formation : 800 a 1 100 euros par mois
- Salaire apres : 2 200 a 3 000 euros par mois
- Debouches : restaurants, hotels, industrie alimentaire

### Hotellerie (Hotelkaufmann/-frau)
- Niveau allemand requis : B2
- Duree : 3 ans
- Salaire pendant la formation : 942 a 1 176 euros par mois
- Salaire apres : 2 500 a 3 500 euros par mois
- Debouches : hotels, tourisme, event management

### Mecatronique automobile (Kfz-Mechatroniker/in)
- Niveau allemand requis : B1
- Duree : 3 ans et demi
- Salaire pendant la formation : 1 066 a 1 279 euros par mois
- Salaire apres : 3 300 a 3 750 euros par mois
- Debouches : garages, concessions, industrie automobile

### Boulanger (Baker/in)
- Niveau allemand requis : B1
- Duree : 3 ans
- Salaire pendant la formation : 700 a 1 085 euros par mois
- Salaire apres : 2 300 a 3 200 euros par mois
- Debouches : boulangeries, patisseries, grandes surfaces

### Restauration (Restaurantfachmann/-frau)
- Niveau allemand requis : B1 a B2
- Duree : 3 ans
- Salaire pendant la formation : 800 a 1 374 euros par mois selon l'annee
- Salaire apres : 2 600 a 3 500 euros par mois

## Comment choisir sa filiere ?

Votre choix depend de :
- Votre niveau d'allemand actuel (B1 ou B2)
- Vos formations et experiences precedentes
- Vos ambitions de carriere a long terme
- La disponibilite des postes chez nos partenaires

Reisetur 237 evalue votre profil et vous oriente vers la filiere la plus adaptee.

---

Vous voulez savoir quelle filiere Ausbildung vous correspond ? Contactez-nous pour un bilan de profil gratuit.`,
  },
  {
    id:'15', image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    slug:'vivre-travailler-allemagne-guide-pratique',
    title_fr:"Vivre et travailler en Allemagne : guide pratique pour les nouveaux arrives camerounais",
    title_en:"Living and working in Germany: practical guide for newly arrived Cameroonians",
    excerpt_fr:"Logement, assurance sante, compte bancaire, transport, culture de travail — tout ce qu'il faut savoir pour bien s'installer en Allemagne apres votre arrivee.",
    excerpt_en:"Housing, health insurance, bank account, transport, work culture — everything to settle well in Germany.",
    category:'Migration', created_at:'2026-04-20T10:00:00Z', read_time:7,
    content_fr:`## Les premieres 72 heures en Allemagne

Votre avion vient d'atterrir. Voici ce que vous devez faire en priorite.

### 1. L'Anmeldung (inscription a la mairie)
Dans les 14 jours suivant votre arrivee, vous devez vous inscrire a la mairie (Einwohnermeldeamt) de votre commune. C'est obligatoire et necessaire pour ouvrir un compte bancaire, recevoir votre carte d'assurance sante et bien d'autres demarches.

Documents necessaires :
- Passeport avec visa valide
- Contrat de bail ou attestation de logement de votre employeur

### 2. L'assurance sante (Krankenversicherung)
En Allemagne, l'assurance sante est obligatoire. Pour les apprenants en Ausbildung, elle est souvent prise en charge par l'employeur. Les principales caisses : Techniker Krankenkasse (TK), AOK, Barmer.

### 3. Le compte bancaire
Ouvrez un compte bancaire allemand des que possible. Les banques les plus accessibles pour les etrangers : Deutsche Bank, Commerzbank, N26 (100% en ligne), DKB.

## Le logement en Allemagne

### Logement fourni par l'employeur
Beaucoup d'etablissements de soins proposent un **Wohnheim** (foyer) pour leurs apprenants. C'est l'option la plus simple et souvent la moins chere pour commencer.

### Chercher un appartement
Si vous cherchez par vous-meme, les plateformes les plus utilisees sont ImmobilienScout24, WG-Gesucht (pour les colocations) et eBay Kleinanzeigen.

Budget logement indicatif :
- Studio a Munich ou Hambourg : 800 a 1 200 euros par mois
- Studio a Berlin : 700 a 1 000 euros par mois
- Chambre en colocation : 400 a 700 euros par mois

## La culture de travail allemande

### La ponctualite
En Allemagne, la ponctualite n'est pas une option. Arriver 5 minutes en avance est la norme. Un retard sans prevenir est tres mal percu.

### La communication directe
Les Allemands communiquent de facon directe et precise. Une critique professionnelle n'est pas une attaque personnelle — c'est une facon de vous aider a progresser.

### Le travail en equipe
La hierarchie existe mais elle est moins rigide qu'en Afrique. N'hesitez pas a poser des questions a vos superieurs — c'est encourage.

## Les transports

### Les transports en commun
L'Allemagne dispose d'un reseau de transports en commun exceptionnel : U-Bahn (metro), S-Bahn (RER), bus et trams. Le **Deutschlandticket** (49 euros par mois) permet de prendre tous les transports en commun dans tout le pays.

### Le velo
Le velo est tres utilise en Allemagne. Investir dans un bon velo des le debut est souvent la meilleure decision.

## Quelques mots utiles au quotidien

- Bitte : s'il vous plait
- Danke : merci
- Entschuldigung : excusez-moi
- Ich verstehe nicht : je ne comprends pas
- Wo ist... ? : Ou est... ?
- Wie viel kostet das ? : Combien ca coute ?

---

Reisetur 237 vous prepare non seulement pour le visa, mais aussi pour bien vivre en Allemagne. Nos formations incluent des modules sur la culture et la vie quotidienne allemande.`,
  },
  {
    id:'16', image:'https://images.unsplash.com/photo-1527015175922-36a306cf0e20?w=700&q=80',
    slug:'temoignage-ausbildung-electricien-cologne',
    title_fr:"Temoignage : Patrick, electricien en Ausbildung a Cologne apres 10 mois de preparation",
    title_en:"Testimonial: Patrick, electrician in Ausbildung in Cologne after 10 months of preparation",
    excerpt_fr:"Patrick n'avait aucune base en allemand. 10 mois apres son arrivee chez Reisetur 237, il signe son contrat d'Ausbildung en electricite a Cologne.",
    excerpt_en:"Patrick had no German base. 10 months after joining Reisetur 237, he signed his electrician Ausbildung contract in Cologne.",
    category:'Temoignages', created_at:'2026-04-02T10:00:00Z', read_time:4,
    content_fr:`## De zero a Cologne en 10 mois

Patrick N., 24 ans, originaire de Bafoussam, est aujourd'hui en 1ere annee d'Ausbildung Elektriker dans une entreprise de BTP a Cologne.

---

**Pourquoi l'electricite et pas les soins infirmiers ?**

Tout le monde me parlait de Pflege. Mais moi j'avais deja travaille sur des chantiers ici au Cameroun, j'aimais l'electricite. Reisetur 237 m'a confirme que c'etait possible — niveau B1 suffit pour l'electricite, pas besoin de B2. Ca m'a motive a commencer les cours immediatement.

**Comment s'est passee la formation linguistique ?**

J'ai fait A1, A2 et B1 en 5 mois. C'est intense mais les formateurs poussent vraiment. On faisait des examens blancs toutes les semaines. Quand j'ai passe le telc B1, j'etais pret.

**Et la recherche du contrat ?**

C'est Reisetur 237 qui a contacte les entreprises partenaires. Deux semaines apres mon B1, ils m'ont presente un employeur a Cologne. J'ai passe un entretien en video, ca s'est tres bien passe. Mon dossier etait parfait — CV en allemand, lettre de motivation, tout.

**Votre message ?**

Ne vous limitez pas a Pflege si ce n'est pas votre passion. Il y a plein de filieres possibles. L'important c'est de commencer l'allemand maintenant. Chaque mois compte.

---

Patrick fait partie de la promotion mixte Reisetur 237 — premiere cohorte a inclure des profils non-medicaux places avec succes en Allemagne.`,
  },
  {
    id:'7', image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80',
    slug:'visa-etudiant-allemagne-complet',
    title_fr:"Visa Etudiant Allemagne : Guide complet pour les Camerounais",
    title_en:"Germany Student Visa: Complete Guide for Cameroonians",
    excerpt_fr:"Tout savoir sur le visa etudiant allemand : conditions, documents, Sperrkonto, delais et erreurs a eviter.",
    excerpt_en:"Everything about the German student visa: conditions, documents, deadlines and mistakes to avoid.",
    category:'Visa', created_at:'2026-06-01T10:00:00Z', read_time:7,
    content_fr:`## Qu'est-ce que le Visa Etudiant Allemagne ?

Le visa etudiant allemand, aussi appele **Visa National Type D**, est indispensable pour tout Camerounais souhaitant poursuivre des etudes superieures en Allemagne.

## Conditions d'eligibilite

### Academiques
- Baccalaureat reconnu par les autorites allemandes (via anabin)
- Lettre d'admission officielle d'une universite allemande
- Releves de notes des 3 dernieres annees

### Linguistiques
- Allemand **B2 minimum** pour les programmes en allemand
- Anglais **B2** pour les programmes anglophones
- Certificat reconnu : Goethe-Institut, telc, OSD ou ECL

### Financieres

**Option 1 — Sperrkonto**
Bloquer **10 332 euros** sur un compte allemand agree (Fintiba, Expatrio, Deutsche Bank). Deblocage progressif : **861 euros par mois**.

**Option 2 — Verpflichtungserklaerung**
Un repondant en Allemagne s'engage a couvrir vos frais. Document notarie obligatoire.

## Documents a fournir

### Personnels
- Passeport biometrique valide (min. 6 mois apres le sejour)
- 2 photos biometriques (35x45mm, fond blanc)
- Acte de naissance + traduction certifiee en allemand
- Casier judiciaire n3 de moins de 3 mois

### Academiques
- Lettre d'admission originale
- Baccalaureat + traduction assermentee
- Releves de notes + traductions

### Financiers
- Attestation Sperrkonto OU Verpflichtungserklaerung
- Attestation d'assurance sante valable en Allemagne

## Delais a prevoir

| Etape | Duree estimee |
|-------|--------------|
| Obtenir l'admission | 2 a 4 mois |
| Ouvrir le Sperrkonto | 1 a 2 semaines |
| Rendez-vous consulaire | 4 a 10 semaines |
| Traitement du visa | 6 a 12 semaines |
| Total | 5 a 7 mois avant le depart |

## Erreurs frequentes a eviter

- Traductions non certifiees par un traducteur assermante
- Passeport avec moins de 6 mois de validite residuelle
- Sperrkonto insuffisant ou ouvert trop tard
- Dossier incomplet au rendez-vous consulaire

---

De la preparation linguistique a la constitution du dossier, Reisetur 237 vous guide a chaque etape.`,
  },
  {
    id:'8', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
    slug:'visa-etudiant-malte-complet',
    title_fr:"Visa Etudiant Malte : Tout savoir pour etudier en anglais dans l'UE",
    title_en:"Malta Student Visa: Everything to Study in English in the EU",
    excerpt_fr:"Malte, pays anglophone de l'UE, attire des milliers d'etudiants africains. Voici comment obtenir votre visa depuis le Cameroun.",
    excerpt_en:"Malta attracts thousands of African students. Here's how to get your student visa from Cameroon.",
    category:'Visa', created_at:'2026-05-28T10:00:00Z', read_time:6,
    content_fr:`## Pourquoi choisir Malte pour ses etudes ?

Malte est membre de l'UE, anglophone, avec des programmes universitaires reconnus a cout modere.

## Le Visa Etudiant Maltais (Single Permit)

Les Camerounais doivent obtenir un **permis unique (Single Permit)** combinant autorisation de sejour et de formation, delivre par Identity Malta Agency.

## Conditions d'eligibilite

- Baccalaureat ou equivalent reconnu
- Lettre d'admission (notre partenaire : **Domain Academy**, Mosta)
- Anglais **B2 minimum**
- Ressources : minimum **500 euros par mois** de sejour

## Documents requis

### Personnels
- Passeport biometrique valide
- 2 photos biometriques
- Acte de naissance traduit en anglais
- Casier judiciaire vierge traduit en anglais

### Academiques
- Lettre d'admission officielle de Domain Academy
- Baccalaureat + traduction en anglais

### Financiers
- Releve bancaire des 3 derniers mois

### Medicaux
- Bilan medical de moins de 3 mois
- Vaccinations a jour

## Delais et couts

| Etape | Detail |
|-------|--------|
| Frais de dossier | 280,50 euros (Single Permit) |
| Traitement | 6 a 10 semaines |

## Avantages du visa maltais

- Programme en **anglais** — pas d'allemand requis
- Cout de vie **abordable** (loyers 350 a 600 euros par mois)
- **Diplome europeen** reconnu dans toute l'UE
- Possibilite de travailler **20h par semaine** pendant les etudes
- Acces a l'espace Schengen

---

Reisetur 237 est en partenariat direct avec Domain Academy a Malte. Nous gerons votre admission, votre dossier visa et votre logement.`,
  },
  {
    id:'9', image:'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=80',
    slug:'visa-ausbildung-formation-professionnelle',
    title_fr:"Visa Ausbildung : Comment obtenir votre visa de formation professionnelle en Allemagne",
    title_en:"Ausbildung Visa: How to Get Your Vocational Training Visa for Germany",
    excerpt_fr:"Le visa Ausbildung est different du visa etudiant. Decouvrez ses specificites et pourquoi c'est la voie royale vers l'emploi en Allemagne.",
    excerpt_en:"The Ausbildung visa differs from the student visa. Learn why it is the best path to employment in Germany.",
    category:'Visa', created_at:'2026-05-25T10:00:00Z', read_time:7,
    content_fr:`## Qu'est-ce que le Visa Ausbildung ?

Le **Visa Ausbildung** est un visa national Type D lie a un **contrat de formation signe avec un employeur allemand**. Vous etes a la fois en formation et salarie des le premier jour.

## Pourquoi c'est avantageux ?

- **Remuneration immediate** : 800 a 1 500 euros par mois selon la filiere
- **Pas de Sperrkonto** : votre salaire justifie vos ressources
- **Emploi garanti** a l'issue de la formation
- **Titre de sejour** evolutif vers une residence permanente
- **Regroupement familial** possible apres 2 ans

## Filieres disponibles via Reisetur 237

| Filiere | Niveau langue | Salaire formation |
|---------|--------------|------------------|
| Pflegefachfrau/mann (Soins) | B2 | 1 200 a 1 500 euros par mois |
| Elektriker/in (Electricien) | B1 | 800 a 1 200 euros par mois |
| Hotelkaufmann/-frau | B2 | 942 a 1 176 euros par mois |
| Koch/Kochin (Cuisinier) | B1 | 800 a 1 100 euros par mois |
| Kfz-Mechatroniker/in | B1 | 1 066 a 1 279 euros par mois |

## Documents a fournir

### Personnels
- Passeport biometrique valide
- 2 photos biometriques
- Acte de naissance + traduction certifiee en allemand
- Casier judiciaire n3 (moins de 3 mois)

### De formation
- **Contrat d'Ausbildung original** signe
- Attestation de l'employeur confirmant le poste

### Linguistiques
- Certificat B1 ou B2 (telc, Goethe, OSD, ECL)

## Delais a prevoir

| Etape | Duree estimee |
|-------|--------------|
| Formation A1 vers B2 | 8 mois |
| Recherche du contrat | 1 a 3 mois |
| Traitement du visa | 2 a 4 mois |
| Total | 11 a 15 mois |

---

Chaque mois de retard est un mois de moins vers votre avenir en Allemagne. Les cours commencent maintenant chez Reisetur 237.`,
  },
  {
    id:'10', image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80',
    slug:'visa-travail-qualifie-fachkrafte',
    title_fr:"Visa Travail Qualifie : La voie directe vers l'emploi en Allemagne",
    title_en:"Skilled Worker Visa: The Direct Path to Employment in Germany",
    excerpt_fr:"Vous avez un diplome reconnu et une experience professionnelle ? Le visa travail qualifie vous permet d'acceder directement au marche de l'emploi europeen.",
    excerpt_en:"Have a recognized degree and work experience? The skilled worker visa gives you direct access to the European job market.",
    category:'Visa', created_at:'2026-05-20T10:00:00Z', read_time:6,
    content_fr:`## Le Visa Fachkrafte : c'est quoi ?

La **Fachkraefteeinwanderung** permet aux professionnels qualifies hors UE de travailler en Allemagne, avec un diplome reconnu et une offre d'emploi d'un employeur allemand.

## Secteurs en forte demande

| Secteur | Postes disponibles | Langue requise |
|---------|-------------------|----------------|
| Soins infirmiers | 300 000+ | B2 |
| Ingenierie et BTP | 150 000+ | B1 |
| Technologies de l'information | 130 000+ | B1 |
| Hotellerie et restauration | 90 000+ | B1 |

## Etape cle : la reconnaissance du diplome (Anerkennung)

Votre diplome camerounais doit etre reconnu via anabin, KMK ou la chambre professionnelle competente.

## Salaires indicatifs en Allemagne

| Poste | Salaire brut mensuel |
|-------|---------------------|
| Infirmier/ere diplome(e) | 2 800 a 3 800 euros |
| Ingenieur(e) BTP | 3 500 a 5 000 euros |
| Developpeur/se IT | 4 000 a 6 000 euros |
| Cuisinier(e) qualifie(e) | 2 200 a 3 000 euros |

## Delais a prevoir

| Etape | Duree estimee |
|-------|--------------|
| Reconnaissance du diplome | 2 a 6 mois |
| Recherche d'employeur | 1 a 4 mois |
| Traitement du visa | 6 a 12 semaines |
| Total | 5 a 12 mois |

---

Les opportunites d'emploi qualifie en Allemagne ne manquent pas. Commencez des aujourd'hui votre formation linguistique chez Reisetur 237.`,
  },
  {
    id:'11', image:'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=80',
    slug:'visa-vacances-travail-allemagne',
    title_fr:"Visa Vacances-Travail Allemagne : Mode d'emploi pour les Camerounais",
    title_en:"Germany Working Holiday Visa: How It Works for Cameroonians",
    excerpt_fr:"Le visa vacances-travail permet de vivre et travailler en Allemagne jusqu'a 12 mois. Conditions, limites et alternatives pour les Camerounais.",
    excerpt_en:"The working holiday visa lets you live and work in Germany for up to 12 months.",
    category:'Visa', created_at:'2026-05-18T10:00:00Z', read_time:5,
    content_fr:`## Qu'est-ce que le Visa Vacances-Travail ?

Le visa vacances-travail permet aux jeunes de sejourner en Allemagne jusqu'a **12 mois**, en combinant voyage et activite professionnelle.

**Important** : Le Cameroun ne fait pas partie des pays avec un accord bilateral de vacances-travail avec l'Allemagne. Mais des **alternatives legales** existent.

## Les alternatives disponibles pour les Camerounais

### 1. Visa de recherche d'emploi (Jobsuchevisum)
Sejourner **6 mois** en Allemagne pour chercher un emploi qualifie. Conditions :
- Diplome universitaire reconnu
- Ressources suffisantes (environ 1 000 euros par mois)
- Allemand B1 minimum

### 2. Visa FSJ / BFD (Service volontaire)
Le **Freiwilliges Soziales Jahr** permet un service volontaire remunere pendant **6 a 18 mois** :
- Hebergement souvent fourni
- Indemnite : 200 a 700 euros par mois
- Apprentissage intensif de l'allemand

### 3. Stage longue duree (Praktikum)
Travailler dans une entreprise allemande jusqu'a **12 mois** dans le cadre d'une convention de stage.

## Conditions generales

| Critere | Detail |
|---------|--------|
| Age | 18 a 35 ans |
| Niveau allemand | A2 minimum (B1 recommande) |
| Ressources | 500 a 1 000 euros par mois |
| Casier judiciaire | Vierge obligatoire |

---

Chaque situation est unique. Reisetur 237 evalue votre profil et vous oriente vers la meilleure option legale.`,
  },
  {
    id:'12', image:'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=700&q=80',
    slug:'visa-regroupement-familial-allemagne',
    title_fr:"Visa Regroupement Familial en Allemagne : Rejoindre un proche installe en Europe",
    title_en:"Family Reunification Visa Germany: Joining a Relative Settled in Europe",
    excerpt_fr:"Votre conjoint ou un parent est en Allemagne ? Le regroupement familial vous permet de les rejoindre legalement depuis le Cameroun.",
    excerpt_en:"Your spouse or parent is in Germany? Family reunification lets you join them legally from Cameroon.",
    category:'Visa', created_at:'2026-05-15T10:00:00Z', read_time:6,
    content_fr:`## Qu'est-ce que le Visa de Regroupement Familial ?

Le **visa de regroupement familial** (Familienzusammenfuehrung) permet aux membres de la famille d'une personne legalement installee en Allemagne de la rejoindre pour s'y etablir durablement.

## Qui peut demander ce visa ?

### Cas 1 — Conjoint(e) d'un resident en Allemagne
- Mariage legalement reconnu
- Le repondant dispose d'un logement suffisant
- Niveau d'allemand **A1 minimum** du demandeur

### Cas 2 — Enfant mineur
Un enfant mineur peut rejoindre ses parents legalement etablis en Allemagne.

### Cas 3 — Conjoint d'un titulaire de Blue Card EU
Si votre conjoint est titulaire d'une **Blue Card EU**, le regroupement est facilite et accelere.

## Conditions generales

| Condition | Detail |
|-----------|--------|
| Titre de sejour du repondant | Valide depuis au moins 1 an |
| Logement | Surface minimale selon la famille |
| Ressources | Revenus suffisants sans aide sociale |
| Langue | A1 en allemand pour le conjoint |
| Assurance sante | Obligatoire pour toute la famille |

## Documents requis

### Du demandeur (au Cameroun)
- Passeport biometrique valide
- 2 photos biometriques
- Acte de naissance + traduction en allemand
- Acte de mariage + traduction (pour le conjoint)
- Casier judiciaire vierge
- Certificat de langue A1 en allemand

### Du repondant (en Allemagne)
- Titre de sejour valide
- Justificatif de domicile
- Fiches de paie ou preuves de ressources
- Attestation d'assurance sante

## Delais et couts

| Etape | Duree estimee |
|-------|--------------|
| Apprentissage A1 | 2 mois chez Reisetur 237 |
| Constitution du dossier | 4 a 6 semaines |
| Rendez-vous consulaire | 4 a 8 semaines |
| Traitement du visa | 6 a 12 semaines |
| Total | 4 a 6 mois |

Frais consulaires : 75 euros par adulte.

## Cas particulier : Ausbildung et regroupement familial

En Ausbildung depuis **2 ans** en Allemagne ? Vous avez le droit de demander le regroupement familial pour votre conjoint et vos enfants mineurs.

---

Reisetur 237 vous aide a preparer votre niveau A1, constituer un dossier complet et maximiser vos chances d'obtenir le visa rapidement.`,
  },
]

const CATS = { fr: ['Tous','Formation','Visa','Temoignages','Migration'], de: ['Alle','Ausbildung','Visum','Erfahrungsberichte','Migration'], en: ['All','Training','Visa','Testimonials','Migration'] }
const ICONS = { 'Formation':'🎓','Visa':'📋','Temoignages':'💬','Migration':'✈️','Actualites':'📰','Ausbildung':'🎓','Erfahrungsberichte':'💬','Training':'🎓','Testimonials':'💬','News':'📰' }
const CAT_COLORS = { 'Formation':{ bg:'#D1FAE5',c:'#059669' },'Visa':{ bg:'#FEE2E2',c:'#DC2626' },'Temoignages':{ bg:'#FEF3C7',c:'#D97706' },'Migration':{ bg:'#DBEAFE',c:'#1D4ED8' } }

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
    fr: { badge:'Blog', title:'Blog & Actualites', sub:'Informations, guides et temoignages', search:'Rechercher...', readMore:'Lire la suite', readTime:'min de lecture', none:'Aucun article trouve.' },
    de: { badge:'Blog', title:'Blog & Neuigkeiten', sub:'Informationen, Ratgeber und Erfahrungsberichte', search:'Suchen...', readMore:'Weiterlesen', readTime:'Min. Lesezeit', none:'Keine Artikel gefunden.' },
    en: { badge:'Blog', title:'Blog & News', sub:'Information, guides and testimonials', search:'Search...', readMore:'Read more', readTime:'min read', none:'No articles found.' },
  }[lang] || { badge:'Blog', title:'Blog & Actualites', sub:'', search:'Rechercher...', readMore:'Lire la suite', readTime:'min', none:'Aucun article.' }

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
                {filtered.map((a,i) => (
                  <Link key={a.id} to={`/blog/${a.slug||a.id}`} style={{ textDecoration:'none' }}>
                    <div style={{ background:'#fff', borderRadius:18, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1.5px solid #F1F5FB', height:'100%', display:'flex', flexDirection:'column' }}>
                      <div style={{ position:'relative', height:180, overflow:'hidden' }}>
                        {a.image
                          ? <img src={a.image} alt={getTitle(a)} style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy"/>
                          : <div style={{ height:'100%', background:i%3===0?`linear-gradient(135deg,${NAVY},#2a0707)`:i%3===1?`linear-gradient(135deg,#1B3E6F,#2563A8)`:`linear-gradient(135deg,${NAVY},${RED})` }}/>
                        }
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
                ))}
              </div>
          }
        </div>
      </div>
    </>
  )
}
