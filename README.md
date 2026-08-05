# Najah.ma — Prototype frontend

Portail d'orientation à trois portes, deux concours ouverts (CRMEF et Licences d'Éducation),
test de niveau sans compte, espace candidat complet, trois univers visuels.

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
`styles.css` · `tokens.css` · `motion.css` · `icons.js` · `data.js` · `core.js` ·
`views_home.js` · `views_public.js` · `views_app_a.js` · `views_app_b.js`

Contenu simulé, aucune donnée réelle de candidat.
