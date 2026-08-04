# Najah.ma — Prototype frontend

Prototype navigable : portail d'orientation, contenu gratuit par filière, test de niveau sans compte, espace candidat complet.

**Démo :** https://optimgov.github.io/najah.ma/

## Ouvrir en local
Ouvrez `index.html` dans un navigateur. Aucune installation.

## Mettre à jour le site publié
Remplacez `index.html` à la racine du dépôt. GitHub Pages se met à jour seul en une minute.

## Reconstruire après modification des sources
```bash
node build.js
cp dist/najah-prototype.html index.html
```

Les sources séparées sont dans `src/` : `styles.css`, `data.js`, `core.js`, `views_home.js`, `views_public.js`, `views_app_a.js`, `views_app_b.js`.

Contenu simulé, aucune donnée réelle de candidat.
