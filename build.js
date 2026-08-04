const fs = require('fs');
const p = f => fs.readFileSync(__dirname + '/src/' + f, 'utf8');

const html = `<!DOCTYPE html>
<html lang="fr" dir="ltr" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Najah.ma — Préparation aux concours | Prototype</title>
<meta name="description" content="Plateforme marocaine de préparation aux concours. Diagnostic par compétence, corrections où chaque distracteur est justifié, coaching et certification des acquis.">
<meta name="color-scheme" content="light dark">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='9' fill='%230b6b57'/><text x='16' y='23' font-size='18' text-anchor='middle' fill='white' font-family='sans-serif'>%D9%86</text></svg>">
<style>
${p('styles.css')}
</style>
</head>
<body>
<div id="root"></div>
<script>
${p('icons.js')}
${p('data.js')}
${p('core.js')}
${p('views_home.js')}
${p('views_public.js')}
${p('views_app_a.js')}
${p('views_app_b.js')}

/* ---------------- Démarrage ---------------- */
window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) location.hash = '#/';
  render();
});
if (document.readyState !== 'loading') { if (!location.hash) location.hash = '#/'; render(); }
</script>
</body>
</html>`;

fs.mkdirSync(__dirname + '/dist', { recursive: true });
fs.writeFileSync(__dirname + '/dist/najah-prototype.html', html);
console.log('OK', (html.length / 1024).toFixed(0) + ' Ko');
