# Najah.ma — Prototype frontend

Portail à trois portes. Deux concours ouverts dans la filière Métiers de l'éducation :
Licences d'Éducation (après le bac) et CRMEF (après la licence).

**Démo :** https://optimgov.github.io/Najah.ma/

## Ouvrir en local
Ouvrez `index.html`. Aucune installation.

## Publier une mise à jour
```bash
git add -A && git commit -m "Mise à jour" && git push origin main
```

## Reconstruire après modification des sources
```bash
node build.js && cp dist/najah-prototype.html index.html
```

## Contenu
- `src/` — sources séparées : `styles.css` · `tokens.css` · `motion.css` · `icons.js` · `data.js` · `core.js` · `views_*.js`
- `docs/PROMPT_EXPERTS_LICENCE_EDUCATION.md` — prompt de production pour les experts pédagogiques
- `docs/NAJAH_INVENTAIRE_FONCTIONNALITES.md` — inventaire fonctionnel

Contenu simulé, aucune donnée réelle de candidat.
