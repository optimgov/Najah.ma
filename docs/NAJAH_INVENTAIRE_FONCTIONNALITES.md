# Najah.ma — Inventaire des fonctionnalités

**Identifiant :** `NAJAH-INV-001`
**Version :** 1.0 — 4 août 2026
**Objet :** état vérifié de ce qui existe, de ce qui est spécifié, et de ce qui manque.
**Dépôt :** `optimgov/Najah.ma` · **Démo :** https://optimgov.github.io/Najah.ma/

---

## 0. Instructions pour l'agent chargé d'enrichir ce document

1. **Ne supprimez aucune ligne existante.** Ajoutez, précisez, complétez. Toute suppression ou fusion doit être proposée séparément et justifiée.
2. **Conservez les identifiants** `E01…`, `C01…`, `R01…`, `F01…`, `D01…`. Ils servent de référence croisée avec le code et les autres documents. Un ajout reçoit le prochain identifiant libre de sa famille.
3. **Distinguez les trois statuts** et ne les modifiez pas sans vérification dans le code : `IMPLÉMENTÉ` (existe et fonctionne dans le prototype), `MAQUETTÉ` (l'écran existe, la mécanique est simulée), `SPÉCIFIÉ` (décrit, non codé).
4. **Ce document décrit un prototype HTML**, pas le produit final. Une remarque du type « il faut une vraie API » est déjà connue et sans valeur ajoutée. Ce qui est utile : des fonctionnalités manquantes, des règles métier absentes, des cas limites non traités, des parcours candidats oubliés.
5. **N'inventez aucune valeur numérique.** Les seuils manquants sont listés en §9 : proposez-les comme questions, pas comme décisions.
6. **Deux documents font autorité** et ne sont pas reproduits ici :
   - `NAJAH-FONC-ORIG-001` — source de vérité fonctionnelle (fonctions F01 à F14, règles métier, priorités).
   - Le cadrage produit du 4 août 2026 — benchmark, architecture, modèle de données, plan à 90 jours.
   En cas de contradiction avec le présent inventaire, **signalez l'écart, n'arbitrez pas**.
7. **Rendez un document, pas un commentaire.** Le résultat attendu est ce fichier enrichi, dans la même structure.

---

## 1. Le produit en dix lignes

Plateforme marocaine de préparation aux concours. Phase 1 : métiers de l'éducation, concours CRMEF, deux spécialités pilotes (Français et Mathématiques du secondaire qualifiant). Extensions annoncées : post-bac (médecine, ingénieur, commerce) et concours professionnels (administration, santé).

La proposition de valeur n'est pas le volume de QCM. C'est la chaîne : mesurer le niveau réel par compétence → identifier la cause de l'erreur → l'expliquer en citant la source officielle → prescrire une remédiation courte → vérifier quelques jours plus tard que l'erreur a disparu.

Modèle d'accès freemium à trois niveaux : public sans compte, compte gratuit, abonné premium. Interface bilingue français/arabe avec lecture de droite à gauche. Conçue pour le téléphone d'abord.

Trois interdits structurants : aucune publication de contenu par IA sans validation humaine ; aucun score prédictif de réussite au concours ; aucun résultat affiché sans explication.

---

## 2. Architecture de l'entrée publique

L'accueil n'argumente pas, il oriente. Une question — « Quel concours préparez-vous ? » — et trois **portes**. Chaque porte est un mini-site autonome : accroche du segment, concours de la filière, contenu gratuit immédiatement actionnable, exemple de correction, tarifs contextualisés, FAQ.

| Porte | Route | Statut contenu | Concours |
|---|---|---|---|
| Métiers de l'éducation | `#/p/education` | Ouverte | CRMEF, Inspection, Agrégation |
| Concours post-bac | `#/p/postbac` | Liste d'attente | Médecine, ENSA, ENCG, ISCAE |
| Concours professionnels | `#/p/pro` | Liste d'attente | Administration, ISPITS |

Les prix sont identiques dans toutes les portes ; seuls les libellés d'avantages sont réécrits avec le vocabulaire du segment.

---

## 3. Inventaire des écrans

### 3.1 Zone publique — accessible sans compte

| ID | Écran | Route | Statut | Description |
|---|---|---|---|---|
| E01 | Portail d'accueil | `#/` | IMPLÉMENTÉ | Orientation vers les trois portes, preuve par une correction, méthode N.A.J.A.H., témoignages |
| E02 | Page de porte | `#/p/:id` | IMPLÉMENTÉ | Segment complet : concours, contenu gratuit, preuve, tarifs, FAQ, liste d'attente si non ouvert |
| E03 | Catalogue des concours | `#/concours` | IMPLÉMENTÉ | Toutes les familles groupées par filière |
| E04 | Fiche famille de concours | `#/concours/:id` | IMPLÉMENTÉ | Description, spécialités, calendrier de la famille |
| E05 | Landing par spécialité | `#/concours/:fam/:spec` | IMPLÉMENTÉ | Page d'acquisition principale : piliers, annales, FAQ, chiffres |
| E06 | Test de niveau gratuit | `#/essai/:id` | IMPLÉMENTÉ | 10 questions sans compte, réparties sur les 3 piliers |
| E07 | Résultat du test gratuit | `#/essai/:id` (état) | IMPLÉMENTÉ | Score, barres par compétence, une erreur corrigée en preuve, mur d'inscription |
| E08 | Annales | `#/annales` | MAQUETTÉ | Liste filtrable par année et spécialité ; aucun document réel |
| E09 | Ressources | `#/ressources` | MAQUETTÉ | Liste de fiches et articles ; corps des articles non rédigé |
| E10 | Article | `#/ressources/:slug` | MAQUETTÉ | Gabarit de lecture longue, contenu absent |
| E11 | Calendrier des concours | `#/calendrier` | MAQUETTÉ | Dates avec compte à rebours et avertissement de source |
| E12 | QCM de démonstration | `#/demo` | IMPLÉMENTÉ | 5 questions avec correction partielle |
| E13 | Tarifs (page globale) | `#/tarifs` | IMPLÉMENTÉ | Grille des trois offres, hors contexte de porte |
| E14 | Certification (page publique) | `#/certification` | IMPLÉMENTÉ | Explication, conditions, avertissement de portée juridique |
| E15 | Vérification d'attestation | `#/verifier` · `#/verifier/:code` | IMPLÉMENTÉ | Saisie d'un code, vérification publique sans compte |

### 3.2 Espace candidat — authentifié

| ID | Écran | Route | Statut | Description |
|---|---|---|---|---|
| E16 | Onboarding | `#/app/onboarding` | IMPLÉMENTÉ | 4 étapes : concours, spécialité, objectif, rythme |
| E17 | Accueil de l'espace | `#/app` | IMPLÉMENTÉ | Routine du jour, 4 indicateurs, courbe par pilier, recommandations, régularité |
| E18 | Diagnostic — passation | `#/app/diagnostic` | IMPLÉMENTÉ | 12 questions, sans correction en cours de passation |
| E19 | Diagnostic — résultat | `#/app/diagnostic` (état) | IMPLÉMENTÉ | Radar par pilier, barres par compétence, première recommandation expliquée |
| E20 | Configurateur de série | `#/app/entrainement` | IMPLÉMENTÉ | 4 modes, taille, difficulté, chronomètre, composition annoncée |
| E21 | Série — passation | idem (état) | IMPLÉMENTÉ | QCM, validation question par question |
| E22 | Série — correction | idem (état) | IMPLÉMENTÉ | **Écran signature.** Justification de chaque option, piège, source, distribution |
| E23 | Série — bilan | idem (état) | IMPLÉMENTÉ | Score, temps, résultat par compétence, action recommandée |
| E24 | Carnet d'erreurs | `#/app/carnet` | MAQUETTÉ | Fiches avec notes personnelles, filtres ; pas d'ajout réel |
| E25 | Questions ouvertes — liste | `#/app/redaction` | IMPLÉMENTÉ | Sujets, grilles, durées |
| E26 | Questions ouvertes — rédaction | `#/app/redaction/:id` | IMPLÉMENTÉ | Zone de saisie, compteur de mots, grille visible |
| E27 | Questions ouvertes — évaluation | idem (état) | MAQUETTÉ | Notation par critère **figée** ; avertissement « corrigé par une machine » |
| E28 | Simulateur — liste | `#/app/simulateur` | IMPLÉMENTÉ | Blueprints, sections, règles de navigation et de barème |
| E29 | Simulateur — passation | idem (état) | IMPLÉMENTÉ | Chronomètre réel, navigation par grille, marquage, autosauvegarde simulée |
| E30 | Simulateur — rapport | idem (état) | IMPLÉMENTÉ | Score par section et compétence, plan de révision, détail question par question |
| E31 | Coach | `#/app/coach` | MAQUETTÉ | Conversation par **scénarios prédéfinis** ; panneau de transparence des données |
| E32 | Progression | `#/app/progression` | IMPLÉMENTÉ | Radar, évolution 8 semaines, 3 onglets, schémas d'erreur détectés |
| E33 | Certification — parcours | `#/app/certification` | MAQUETTÉ | Conditions d'éligibilité, attestation délivrée, QR |
| E34 | Certification — épreuve | idem (état) | MAQUETTÉ | Conditions renforcées ; **chronomètre non fonctionnel** |
| E35 | Abonnement | `#/app/abonnement` | MAQUETTÉ | Formule, droits, historique de facturation fictif |
| E36 | Paramètres | `#/app/parametres` | MAQUETTÉ | Langue, thème, routine, compte, données |

### 3.3 Écrans absents

| ID | Écran manquant | Criticité |
|---|---|---|
| E37 | Inscription / connexion / mot de passe oublié | Bloquante |
| E38 | Back-office éditorial (création, révision, publication, versionnement) | Bloquante |
| E39 | Import CSV/JSON de questions | Haute |
| E40 | Tableau de bord centre partenaire (B2B) | Différée |
| E41 | Préparation à l'épreuve orale | Différée |

---

## 4. Composants d'interface réutilisables

| ID | Composant | Rôle |
|---|---|---|
| C01 | `questionBlock` | Bloc question complet : énoncé, options, états, correction. Utilisé par 6 écrans |
| C02 | `rationale` | Panneau de justification de chaque option, piège, source, distribution |
| C03 | `masteryRow` | Ligne de maîtrise : score, tendance, niveau, **volume d'évidence** |
| C04 | `reco` | Carte de recommandation avec bloc « pourquoi » obligatoire |
| C05 | `paywall` | Mur payant contextuel, rappelant que les droits sont vérifiés côté serveur |
| C06 | `exambar` + `qnav` | Barre d'examen (chronomètre, sauvegarde) et grille de navigation |
| C07 | `rubric` | Grille d'évaluation critère par critère, avec contestation |
| C08 | `cert` + `qrSvg` | Attestation visuelle et code de vérification |
| C09 | `radarChart` · `lineChart` · `barsChart` · `activityChart` | Graphiques SVG sans dépendance, palette validée daltonisme |
| C10 | `icon` (38 icônes) · `zellige` · `khatam` | Système d'icônes vectorielles et motifs identitaires |
| C11 | `door3` | Carte de porte du portail |
| C12 | `evidence` | Indicateur de volume de preuve, jamais dissocié d'un score |

---

## 5. Modèle de données actuel

| Domaine | Entités | Volume dans le prototype |
|---|---|---|
| Catalogue | `portals`, `families`, `specialties`, `calendar` | 3 portails, 8 familles, 6 dates |
| Pédagogie | `pillars`, `competencies` | 3 piliers, 14 compétences |
| Questions | `questions` (énoncé, options, `correct`, `rationales`, `trap`, `source`, `comp`, `cog`, `diff`, `stats`) | 26 questions, toutes avec justification de chaque distracteur |
| Questions ouvertes | `openQuestions` (sujet, `rubric`, `reference`, `scored`) | 2 sujets, 4 critères chacun |
| Examens | `blueprints` (sections, quotas, durée, navigation, barème) | 2 blueprints |
| Profil | `profile` (mastery, history, activity, errorBook, exams) | 1 profil, 8 semaines d'historique |
| Commercial | `plans`, `personas` | 3 offres, 4 rôles |
| Certification | `certifications`, `issuedCert` | 3 parcours, 1 attestation émise |
| Contenu | `annales`, `articles`, `coachScripts` | 8 · 6 · 5 |

**Niveaux de taxonomie actuels :** Pilier → Compétence. Le document fonctionnel en demande quatre : Pilier → Domaine → Compétence → Microcompétence. Écart non résolu, voir D02.

---

## 6. Règles métier implémentées

| ID | Règle | Statut |
|---|---|---|
| R01 | Aucune question publiée sans justification de **chaque** distracteur | IMPLÉMENTÉ — vérifié sur 26/26 |
| R02 | Chaque question porte compétence, niveau cognitif, difficulté, source, version | IMPLÉMENTÉ |
| R03 | Aucune probabilité de réussite au concours n'est affichée nulle part | IMPLÉMENTÉ |
| R04 | Tout score de maîtrise est accompagné de son volume d'évidence | IMPLÉMENTÉ |
| R05 | Toute recommandation affiche sa raison en langage clair | IMPLÉMENTÉ |
| R06 | Aucune correction n'est affichée pendant un diagnostic ou un examen | IMPLÉMENTÉ |
| R07 | Une évaluation produite par une machine est signalée comme telle et contestable | IMPLÉMENTÉ |
| R08 | L'attestation porte un avertissement de portée juridique sur chaque écran | IMPLÉMENTÉ |
| R09 | Le chronomètre d'examen soumet automatiquement à l'expiration | IMPLÉMENTÉ |
| R10 | Le simulateur respecte les quotas par section du blueprint | **NON RESPECTÉ** — voir X01 |
| R11 | Le diagnostic couvre chaque macro-compétence | **NON RESPECTÉ** — voir X02 |
| R12 | La série ciblée applique 40 / 25 / 20 / 15 et journalise la raison de chaque question | **NON RESPECTÉ** — voir X03 |
| R13 | Les limites affichées correspondent exactement aux règles appliquées | **NON RESPECTÉ** — voir X04 |
| R14 | Une tentative met à jour la maîtrise, le quota, le carnet et le dashboard | **NON IMPLÉMENTÉ** — voir X05 |

---

## 7. Matrice des droits

| Fonction | Public | Gratuit | Premium |
|---|---|---|---|
| Pages concours, calendrier, articles | ✓ | ✓ | ✓ |
| Annales sélectionnées | ✓ | ✓ | ✓ |
| Test de niveau 10 questions | ✓ | ✓ | ✓ |
| Diagnostic complet | — | ✓ *(contesté, voir D05)* | ✓ |
| Quota quotidien de questions | — | ✓ *(valeur non fixée)* | illimité |
| Correction complète de chaque distracteur | partielle | partielle | ✓ |
| Séries ciblées | — | — | ✓ |
| Mini-simulateur | — | ✓ *(non implémenté)* | — |
| Simulateurs complets | — | — | ✓ |
| Questions ouvertes évaluées | — | — | ✓ |
| Coach | — | — | ✓ |
| Carnet d'erreurs | — | — | ✓ |
| Progression détaillée | — | aperçu | ✓ |
| Certification | — | — | ✓ |

**Règle transversale :** tout droit premium doit être vérifié côté serveur. L'interface ne fait qu'afficher un état.

---

## 8. Noyau fonctionnel spécifié, non implémenté

Source : `NAJAH-FONC-ORIG-001`. Résumé d'une ligne par fonction ; les règles métier complètes figurent dans le document source.

### Priorité P1 — après les fondations

| ID | Fonction | Une ligne | Dépendances |
|---|---|---|---|
| F01 | Najah Map | Carte de maîtrise du pilier à la microcompétence, avec niveau de preuve | Taxonomie à 4 niveaux (D02) |
| F02 | Certitude+ | Le candidat déclare sûr / hésitant / hasard ; détecte les fausses croyances | Déclencheur à définir (D06) |
| F03 | Autopsie de l'erreur | Identifie la cause probable parmi 8 codes, présentée comme hypothèse | Distracteurs étiquetés par cause |
| F04 | « Pourquoi pas B ? » | Correction active par élimination ; correction progressive en 5 niveaux | Déclencheur à définir (D06) |
| F05 | Question miroir | Vérifie le transfert dans un autre contexte, par familles éditoriales | Familles à créer (D07) |
| F06 | Ordonnance Najah | Remédiation courte calibrée sur 3, 10 ou 20 minutes, avec statut | F03 |
| F07 | Rendez-vous Mémoire | Rappels espacés J+1 / J+3 / J+7 / J+15, cadence adaptative | Persistance |
| F08 | Indice de préparation | Synthèse en 5 dimensions, jamais nommée « probabilité de réussite » | Seuils à fixer (D08) |
| F09 | Mission du jour | Trois actions prioritaires maximum, chacune avec sa raison | F01, F07 |
| F11a | Passeport de source | Traçabilité complète de chaque contenu et statut de validité | Back-office |
| F14 | Copilote qualité éditorial | Alerte l'équipe éditoriale, ne publie jamais | Back-office |

### Priorité P2 — après collecte de données réelles

| ID | Fonction | Une ligne |
|---|---|---|
| F10 | Atlas des pièges | Base éditoriale des confusions réelles des candidats, partiellement publique |
| F11b | Radar Réformes | Veille sur les changements de textes et de programmes, impact sur les questions |
| F13 | Lexique bilingue | Terminologie pédagogique français/arabe et usages institutionnels marocains |
| F12 | SimuClasse | Simulateur de décisions pédagogiques en graphe à branches |
| F15 | Préparation à l'oral | À spécifier entièrement |

### Fonctions prototypées, à ne pas supprimer

| Fonction | Décision en vigueur |
|---|---|
| Coach | Conservé au backlog et au prototype ; ne doit pas être le différenciateur principal |
| Questions ouvertes | Conservées ; grille et validation pédagogique requises avant toute notation déterminante |
| Certification, QR, vérification publique | Conservées ; industrialisation après clarification de la valeur et de la portée juridique |

---

## 9. Écarts vérifiés dans le code

Constats mesurés, pas des impressions. Chaque écart a été confirmé par comptage.

| ID | Écart | Mesure |
|---|---|---|
| X01 | Le simulateur ignore les quotas de section du blueprint | Blueprint n°1 attend 8 / 7 / 5 (SE/DI/SP) ; le code génère 11 / 5 / 4 |
| X02 | Le diagnostic ne couvre pas les trois piliers | 8 SE / 4 DI / **0 SP** ; 9 compétences sur 14 |
| X03 | La série « adaptative » n'applique pas la composition annoncée | Tri par score croissant, sans les proportions 40/25/20/15, sans journal |
| X04 | Les limites du compte gratuit ne correspondent pas à l'offre affichée | Annoncé 10 questions/jour et mini-simulateur ; réellement blocage à 3 questions et simulateur fermé |
| X05 | Aucune boucle de mise à jour | Répondre ne modifie ni maîtrise, ni quota, ni carnet, ni dashboard |
| X06 | Banque insuffisante pour le blueprint n°2 | Exige 9 questions de didactique ; la banque en contient 8 |
| X07 | Spécialités non isolées | Français et Mathématiques annoncés ouverts ; toute la banque est de français |
| X08 | Routes privées non protégées | Un visiteur atteint directement le dashboard, les paramètres et les factures |
| X09 | Évaluation des questions ouvertes figée | Le même score est rendu quel que soit le texte soumis |
| X10 | Chronomètre de certification inactif | Affiché, jamais décrémenté |
| X11 | Coach par scénarios | 5 réponses prédéfinies, réponse générique hors correspondance |
| X12 | URL en `#/` non indexables | Contrainte du fichier unique ; relève du produit final, pas du prototype |

---

## 10. Décisions ouvertes

| ID | Décision requise | Bloque |
|---|---|---|
| D01 | Portée du document fonctionnel : prototype seul, ou produit final ? | Tout arbitrage de priorité |
| D02 | Introduit-on les niveaux Domaine et Microcompétence ? Qui rédige la taxonomie ? | F01, F03, F05, F07 |
| D03 | Le pilier Sciences de l'éducation est-il mutualisé entre spécialités ou dupliqué ? | Coût éditorial, X07 |
| D04 | Position du back-office dans l'ordre de développement | Séquencement global |
| D05 | Le diagnostic gratuit est-il complet ou partiel ? *(contradiction entre documents)* | Taux d'activation |
| D06 | Sur quelles questions déclenche-t-on Certitude+ et « Pourquoi pas B ? » | F02, F04 |
| D07 | La famille miroir est-elle bloquante à la publication d'une question ? | Coût unitaire par question |
| D08 | Quatre seuils numériques absents : quota gratuit, seuils de preuve F01, seuil d'affichage F08, nombre de réussites espacées F07 | F01, F07, F08 |
| D09 | Le Coach doit-il être rétrogradé dans la navigation ? | Positionnement |
| D10 | Identité visuelle : la direction actuelle (vert profond, terre cuite, safran, zellige) est-elle validée ? | Charte |

---

## 11. Ce qu'un enrichissement utile apporterait

Par ordre de valeur décroissante, de l'avis de l'auteur de ce document :

1. **Les parcours candidats oubliés.** Que se passe-t-il si le candidat change de spécialité en cours de préparation ? S'il rate son concours et recommence l'année suivante ? S'il partage son compte ? S'il conteste une correction et obtient raison ?
2. **Les cas limites des mécaniques existantes.** Coupure réseau pendant un examen, double soumission, question retirée du catalogue alors qu'elle figure dans une tentative en cours, blueprint modifié entre l'inscription et l'épreuve.
3. **Les règles métier absentes** des fonctions F01 à F14 : ce que le document source laisse implicite.
4. **Les besoins de l'équipe éditoriale**, largement sous-spécifiés : workflow, rôles, mesure de qualité, traitement des signalements.
5. **La conformité** : traitement des données personnelles au Maroc, droits de reproduction des annales, mentions obligatoires.

Ce qui n'apporterait rien : rappeler qu'il faut une API, une base de données, de l'authentification ou des tests de charge. C'est acquis et déjà planifié.

---

*Document produit à partir d'une lecture du code source, pas d'une description. Les volumes et les écarts de la §9 ont été mesurés le 4 août 2026.*
