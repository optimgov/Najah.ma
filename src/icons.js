/* =========================================================================
   NAJAH.ma — Système d'icônes
   Grille 24, trait 1.6, extrémités arrondies, aucune couleur codée en dur.
   Les emojis sont bannis de l'interface : ils changent d'un système à l'autre
   et trahissent immédiatement un prototype.
   ========================================================================= */

const ICONS = {
  /* --- Filières --- */
  cap: '<path d="M12 4 2.5 9 12 14l9.5-5L12 4Z"/><path d="M5.5 11v5.2c0 .5.3 1 .8 1.2 1.5.8 3.6 1.6 5.7 1.6s4.2-.8 5.7-1.6c.5-.2.8-.7.8-1.2V11"/><path d="M21.5 9v5.5"/>',
  stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M6 3H4.5M14 3h1.5"/><path d="M10 12v2.5a5.5 5.5 0 0 0 11 0V13"/><circle cx="20.5" cy="11" r="1.8"/>',
  columns: '<path d="M3 20h18M5 20V10M9.5 20V10M14.5 20V10M19 20V10"/><path d="M2.5 10 12 4l9.5 6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v14.5H5.5A1.5 1.5 0 0 0 4 20V5.5Z"/><path d="M4 20h15M8 4v14.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"/>',

  /* --- Fonctions --- */
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M3 20h18"/><rect x="5" y="11" width="3.5" height="6" rx="1"/><rect x="10.2" y="7" width="3.5" height="10" rx="1"/><rect x="15.5" y="13" width="3.5" height="4" rx="1"/>',
  pen: '<path d="M14.5 5.5 18.5 9.5"/><path d="M4 20l1.2-4.2L16.4 4.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8 4 20Z"/>',
  chat: '<path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.15-2.9-.42L4 20.5l1.6-4.1C4.6 15.2 3.5 13.7 3.5 12c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z"/><path d="M8.7 11.8h.01M12 11.8h.01M15.3 11.8h.01"/>',
  bookmark: '<path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4.2L5.5 20.5v-16a1 1 0 0 1 1-1Z"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 1.8M9.5 2.5h5M12 2.5v3.5M19.2 6.8l1.4-1.4"/>',
  shield: '<path d="M12 3 4.5 6v6c0 4.4 3.2 7.9 7.5 9 4.3-1.1 7.5-4.6 7.5-9V6L12 3Z"/><path d="m9 12 2.2 2.2L15.4 10"/>',
  badge: '<circle cx="12" cy="9.5" r="5.5"/><path d="m8.4 14 -1.2 6.5L12 18.4l4.8 2.1L15.6 14"/>',
  spark: '<path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z"/><path d="M19 3.5v3M20.5 5h-3"/>',
  layers: '<path d="m12 3.5 8.5 4.2L12 12 3.5 7.7 12 3.5Z"/><path d="m3.5 12.2 8.5 4.3 8.5-4.3"/><path d="m3.5 16.5 8.5 4.3 8.5-4.3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.8h17M8.2 3v4M15.8 3v4"/><path d="M7.5 13.4h2M11 13.4h2M14.5 13.4h2M7.5 16.8h2M11 16.8h2"/>',
  file: '<path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L14 3.5Z"/><path d="M13.7 3.6V8.7h5.1"/><path d="M8.5 13h7M8.5 16.4h4.5"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  arrow: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/><path d="M12 14.4v2.5"/>',
  eye: '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3.2"/>',
  bolt: '<path d="M13.5 2.5 4.8 13.4h6L10.5 21.5l8.7-10.9h-6l.3-8.1Z"/>',
  users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.8 20c0-3.4 2.8-5.8 6.2-5.8s6.2 2.4 6.2 5.8"/><path d="M16.2 5.4a3.5 3.5 0 0 1 0 6.6M17.5 14.6c2.2.7 3.7 2.7 3.7 5.4"/>',
  quote: '<path d="M9.5 6.5C6.6 7.4 4.5 10 4.5 13.2c0 2.4 1.6 4.3 3.8 4.3 1.9 0 3.4-1.4 3.4-3.3 0-1.8-1.3-3.2-3.1-3.2-.3 0-.6 0-.9.1.4-1.6 1.6-2.9 3.2-3.5l-1.4-1.1Z"/><path d="M18 6.5c-2.9.9-5 3.5-5 6.7 0 2.4 1.6 4.3 3.8 4.3 1.9 0 3.4-1.4 3.4-3.3 0-1.8-1.3-3.2-3.1-3.2-.3 0-.6 0-.9.1.4-1.6 1.6-2.9 3.2-3.5L18 6.5Z"/>',
  route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6h5.2a3.3 3.3 0 0 1 0 6.6h-3.4a3.3 3.3 0 0 0 0 6.6h5.2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3.2 9.5h17.6M3.2 14.5h17.6"/><path d="M12 3c-2.5 2.4-3.8 5.6-3.8 9s1.3 6.6 3.8 9c2.5-2.4 3.8-5.6 3.8-9S14.5 5.4 12 3Z"/>',
  mobile: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.4 5.4h3.2M12 18.2h.01"/>',
  flag: '<path d="M5.5 21V3.5M5.5 4.5h11l-2 3.5 2 3.5h-11"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10.2 8.6 15.5 12l-5.3 3.4V8.6Z"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.8h19M6 14.8h3.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.3M12 19.2v2.3M21.5 12h-2.3M4.8 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  star: '<path d="m12 3.5 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9L12 3.5Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2.2"/>',
  bulb: '<path d="M9 17.5h6M10 20.5h4"/><path d="M12 3.5a5.8 5.8 0 0 0-3.4 10.5c.5.4.9 1 .9 1.7v.3h5v-.3c0-.7.4-1.3.9-1.7A5.8 5.8 0 0 0 12 3.5Z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20.5 3.5v4.2h-4.2"/>',
  download: '<path d="M12 3.5v11M7.8 10.6 12 14.8l4.2-4.2"/><path d="M4.5 16.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2"/>'
};

/* icon('target', 22) → SVG dimensionné, hérite de currentColor */
function icon(name, size, cls) {
  const d = ICONS[name] || ICONS.spark;
  return `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" width="${size || 20}" height="${size || 20}"
    fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" focusable="false">${d}</svg>`;
}

/* Motif zellige génératif — filigrane identitaire, jamais décoratif au point de gêner */
function zellige(id, opacity) {
  return `<svg class="zel" aria-hidden="true" width="100%" height="100%" style="opacity:${opacity || .05}">
    <defs><pattern id="${id}" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="72" height="72" fill="none"/>
      <path d="M36 6 66 36 36 66 6 36Z" fill="none" stroke="currentColor" stroke-width="1.1"/>
      <path d="M36 20 52 36 36 52 20 36Z" fill="none" stroke="currentColor" stroke-width="1.1"/>
      <path d="M36 0v12M36 60v12M0 36h12M60 36h12" stroke="currentColor" stroke-width="1.1"/>
      <circle cx="36" cy="36" r="3.4" fill="none" stroke="currentColor" stroke-width="1.1"/>
      <path d="M6 6 20 20M66 6 52 20M6 66 20 52M66 66 52 52" stroke="currentColor" stroke-width="1.1"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#${id})"/>
  </svg>`;
}

/* Étoile marocaine à huit branches — marqueur de section */
function khatam(size) {
  const s = size || 18;
  return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor" aria-hidden="true" class="ic">
    <path d="M12 1.6 15 6.2 20.2 4.8 18.8 10 23.4 12 18.8 14 20.2 19.2 15 17.8 12 22.4 9 17.8 3.8 19.2 5.2 14 .6 12 5.2 10 3.8 4.8 9 6.2 12 1.6Z"/>
  </svg>`;
}
