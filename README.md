# Najah.ma — Prototype frontend

Portail d'orientation, contenu gratuit par filière, test de niveau sans compte, espace candidat complet.

**Démo :** https://optimgov.github.io/Najah.ma/

## Ouvrir en local
Ouvrez `index.html`. Aucune installation.

## Publier une mise à jour
Remplacez `index.html` et le dossier `src/`, puis :
```bash
git add -A && git commit -m "Mise à jour" && git push
```

## Reconstruire après modification des sources
```bash
node build.js
cp dist/najah-prototype.html index.html
```

Sources dans `src/` : `styles.css`, `icons.js`, `data.js`, `core.js`, `views_home.js`, `views_public.js`, `views_app_a.js`, `views_app_b.js`.

Contenu simulé, aucune donnée réelle de candidat.
