# Najah.ma — Prototype frontend

Portail à trois portes. Deux concours ouverts dans la filière Métiers de l'éducation :
Licences d'Éducation (après le bac) et **Concours CRMEF** (après la licence).

**Démo :** https://optimgov.github.io/Najah.ma/
**Parcours CRMEF :** https://optimgov.github.io/Najah.ma/#/concours/crmef

## Ouvrir en local
Ouvrez `index.html`. Aucune installation.

## Publier
```bash
git add -A && git commit -m "Mise à jour" && git push origin main
```

## Reconstruire
```bash
node build.js && cp dist/najah-prototype.html index.html
```

## Sources (`src/`)
`styles.css` · `tokens.css` · `motion.css` · `icons.js` · `data.js` ·
**`crmef.js`** (référentiel officiel + audit) · **`store.js`** (persistance) · **`loop.js`** (Boucle Najah) ·
`core.js` · `views_home.js` · `views_public.js` · `views_app_a.js` · `views_app_b.js` ·
**`views_crmef.js`** · **`views_crmef_b.js`**

Contenu simulé. Les descriptifs officiels de novembre 2025 sont enregistrés comme sources versionnées.
