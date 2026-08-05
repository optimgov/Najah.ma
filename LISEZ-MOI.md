# Najah.ma — Prototype frontend

**Version 6 · 5 août 2026 · Aucune installation requise**

---

## Ouvrir le prototype

Double-cliquez sur `najah-prototype.html`. C'est tout — un seul fichier, aucun serveur, aucune dépendance. Il fonctionne hors connexion (seules les polices web sont téléchargées ; sans réseau, des polices système équivalentes prennent le relais).

## Le partager avec votre équipe

Trois options, de la plus rapide à la plus propre :

1. **Par e-mail ou messagerie** — envoyez le fichier tel quel. Chacun l'ouvre dans son navigateur.
2. **URL publique en deux minutes** — allez sur [app.netlify.com/drop](https://app.netlify.com/drop) et déposez le fichier. Vous obtenez une adresse partageable immédiatement, sans compte.
3. **Hébergement durable** — GitHub Pages, Vercel ou tout hébergeur statique.

## L'entrée publique : un portail, pas une page de vente

L'accueil ne cherche plus à convaincre : il oriente. Une phrase, une question — « Quel concours préparez-vous ? » — et trois portes.

| Porte | Contenu |
|---|---|
| **Métiers de l'éducation** | Ouverte. **Licences d'Éducation** et **CRMEF** actifs ; Inspection et Agrégation annoncés. |
| **Concours post-bac** | Annoncée. Médecine, ENSA, ENCG, IAV. Liste d'attente. |
| **Concours professionnels** | Annoncée. Administration, ISPITS. Liste d'attente. |

### Deux programmes, deux référentiels

Le concours commun des Licences d'Éducation n'a rien de commun avec le CRMEF : ni les épreuves, ni les compétences. Il dispose donc de son propre référentiel, et les deux ne se mélangent jamais.

| Programme | Piliers | Compétences | Questions |
|---|---|---|---|
| CRMEF | Sciences de l'éducation · Didactique · Spécialité | 14 | 26 |
| Licences d'Éducation | Culture éducative · Langues et communication · Raisonnement logique et numérique | 9 | 12 |

Les deux concours cohabitent dans la filière **Métiers de l'éducation**, ordonnés par étape de carrière : Licence d'Éducation après le bac, CRMEF après la licence, puis Inspection et Agrégation. Chaque carte affiche son niveau d'entrée.

Le test de niveau est rattaché à un **concours**, pas à une filière : la porte Éducation en proposant deux, l'écran d'entrée du test demande lequel préparer. Le référentiel, les graphiques et les légendes suivent automatiquement.

Chaque porte est un mini-site autonome : accroche du segment, concours de la filière, contenu gratuit immédiatement actionnable, exemple de correction, tarifs contextualisés et FAQ. Les prix sont les mêmes partout ; seuls les avantages sont réécrits avec le vocabulaire du segment.

**Le test de niveau gratuit** se lance sans compte depuis n'importe quelle porte : dix questions réparties sur les trois piliers, un résultat par compétence, une de vos erreurs entièrement corrigée en guise de preuve, puis l'invitation à créer un compte pour conserver le résultat.

Le contenu affiché reste illustratif. Les volumes annoncés dans les portes non ouvertes sont des repères de démonstration.

## Ce qui change en version 3 : l'interface

La direction retenue est **éditoriale premium à identité marocaine**, plutôt que l'esthétique générique des plateformes du benchmark.

- **Plus aucun emoji.** Un jeu de 38 icônes vectorielles dessinées sur une grille commune remplace tous les pictogrammes. C'était le signal « prototype bricolé » le plus visible.
- **Un motif zellige génératif** en filigrane sur le héros, les portes et les bandeaux d'appel. Discret par construction — il signe sans décorer.
- **De la profondeur.** Ombres en trois couches, bordures dégradées au survol, surfaces vitrées : les cartes se lisent comme des objets, plus comme des aplats.
- **Une maquette produit vivante** dans le héros — trois vrais fragments d'interface qui flottent, pas une image.
- **La méthode N.A.J.A.H.** rendue visible en cinq étapes, reprise du document fonctionnel.
- **Preuve sociale** : compteurs, témoignages, marqueurs de crédibilité.
- **Animations d'apparition** au défilement, désactivées automatiquement si le système demande de réduire les animations. L'état masqué n'est appliqué que si le script confirme pouvoir le lever : sans JavaScript, tout reste visible.

## Ce qui change en version 4 : trois univers visuels

Le défaut de la v3 n'était pas la palette, c'était l'uniformité : le même système appliqué à 36 écrans très différents. L'interface distingue désormais trois intentions.

| Univers | Écrans | Traitement |
|---|---|---|
| **Acquisition** | Portail, portes, catalogue, essai | Éditorial et chaleureux. Motif, profondeur, mouvement — c'est le seul endroit où l'on a le droit de séduire. |
| **Apprentissage** | Espace candidat, entraînement, coach, progression | Ivoire chaud, bordures effacées au profit du contraste de surface. La lecture prime sur la densité. |
| **Examen** | Simulateur en cours, épreuve certifiante | Neutre et silencieux. Navigation latérale masquée, barre supérieure réduite, aucun ornement, aucune animation. L'interface disparaît. |

L'univers est déduit automatiquement de la route et de l'état : entrer en épreuve bascule toute l'interface.

**Sémantique de couleur.** Un rôle par couleur, jamais porté seul : bonne réponse, réponse fausse, piège pédagogique, action de remédiation, avertissement système. Deux corrections mesurées par rapport à la proposition initiale — le safran a été assombri pour atteindre 3,10:1 sur l'ivoire, et la distinction piège/erreur passe par l'icône et le libellé, la mesure ayant montré qu'aucune teinte de terre cuite ne peut s'éloigner suffisamment du rouge.

**Deux nouveaux fichiers source.** `tokens.css` rassemble toutes les valeurs de conception et les trois univers ; `motion.css` définit les durées autorisées et supprime toute animation en mode examen. Plus aucune couleur n'est écrite en dur ailleurs.

## La barre de démonstration

Le bandeau noir en haut de l'écran n'existera pas en production. Il sert à explorer le prototype :

- **Rôle** — bascule entre visiteur, compte gratuit, abonné premium et administrateur. Les écrans changent réellement : les murs payants apparaissent et disparaissent selon le rôle choisi.
- Les deux boutons ronds à droite de la navigation basculent **la langue** (français ↔ arabe, avec passage complet en lecture de droite à gauche) et **le thème** (clair ↔ sombre).

## Ce qu'il faut regarder en priorité

| Écran | Pourquoi il compte |
|---|---|
| **Entraînement → correction** | L'écran signature. Chaque option fausse est justifiée, avec le piège fréquent, la source, la compétence et la distribution des réponses. C'est la promesse produit rendue visible. |
| **Diagnostic → résultat** | Le profil de maîtrise avec son **volume d'évidence** affiché, et la première recommandation accompagnée de son « pourquoi ». |
| **Questions ouvertes → évaluation** | La correction par grille de critères, avec l'avertissement explicite que la copie a été évaluée par une machine et un bouton de contestation par critère. |
| **Coach** | Réponses construites à partir des données du candidat. Le panneau latéral énumère exactement ce que le coach voit — et ce qu'il refuse de faire. |
| **Certification** | L'attestation, et surtout l'avertissement de portée : document privé, sans valeur officielle. |
| **Vérifier une attestation** | La page publique consultable par un employeur, sans compte. |
| **Langue arabe** | Bascule le RTL sur toute l'interface. Deux questions sont traduites intégralement (justifications comprises) pour montrer le rendu réel du contenu. |

## Ce qui est simulé

Tout le contenu est fictif mais réaliste : 26 questions CRMEF avec justifications complètes, 2 questions ouvertes avec grilles, 14 compétences, 2 blueprints d'examen, un profil candidat avec 8 semaines d'historique.

**Les mécaniques suivantes sont réellement fonctionnelles** : passation de QCM, chronomètre d'examen avec soumission automatique, navigation par grille de questions, marquage, calcul de score, génération de séries selon les règles de composition, conversation du coach, filtres, bascules langue/thème/rôle.

**Les mécaniques suivantes sont volontairement absentes** : back-office éditorial, paiement réel, export PDF, génération de contenu par IA, persistance entre deux ouvertures.

## Sous le capot

Le prototype est écrit avec une couche de services isolée (`API.*`) : aucun écran n'accède directement aux données. Le jour du branchement sur le backend Laravel, il suffit d'implémenter l'adaptateur HTTP — les écrans ne changent pas. Cette discipline est conservée dans le prototype pour que le travail ne soit pas à refaire.

Les couleurs de graphiques ont été validées pour le daltonisme et le contraste, en mode clair comme en mode sombre.

## Fichiers

- `najah-prototype.html` — le prototype complet, à ouvrir
- `LISEZ-MOI.md` — ce document
- `src/` — les sources séparées (styles, données, noyau, vues) et le script d'assemblage

---

*Prototype de démonstration. Contenu simulé, aucune donnée réelle de candidat.*
