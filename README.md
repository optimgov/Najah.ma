# Najah.ma — Prototype frontend

Portail d'orientation, contenu gratuit par filière, test de niveau sans compte, espace candidat complet.
Trois univers visuels : acquisition, apprentissage, examen.

**Démo :** https://optimgov.github.io/Najah.ma/

## Ouvrir en local
Ouvrez `index.html`. Aucune installation.

## Publier une mise à jour
```bash
git add -A && git commit -m "Mise à jour" && git push origin main
```

## Reconstruire après modification des sources
```bash
node build.js
cp dist/najah-prototype.html index.html
```

Sources dans `src/` :
`styles.css` (base) · `tokens.css` (jetons et univers) · `motion.css` (mouvement) ·
`icons.js` · `data.js` · `core.js` · `views_home.js` · `views_public.js` · `views_app_a.js` · `views_app_b.js`

Contenu simulé, aucune donnée réelle de candidat.
