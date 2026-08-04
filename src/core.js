/* =========================================================================
   NAJAH.ma — Noyau : couche services, état, routeur, primitives d'interface
   ========================================================================= */

/* ---------------- Couche services : SEUL point d'accès aux données -------
   En production, chaque méthode devient un appel HTTP vers l'API Laravel.
   Aucune vue n'accède à DATA directement.
   ------------------------------------------------------------------------ */
const API = {
  base: null,                 // null = adaptateur simulé ; sinon URL de l'API
  _delay: (v, ms = 0) => new Promise(r => setTimeout(() => r(v), ms)),

  catalog: {
    families: () => API._delay(DATA.families),
    family: id => API._delay(DATA.families.find(f => f.id === id)),
    groups: () => API._delay(DATA.groups),
    calendar: () => API._delay(DATA.calendar),
    annales: () => API._delay(DATA.annales),
    articles: () => API._delay(DATA.articles)
  },
  content: {
    competencies: () => API._delay(DATA.competencies),
    competency: id => API._delay(DATA.competencies.find(c => c.id === id)),
    pillars: () => API._delay(DATA.pillars),
    question: id => API._delay(DATA.questions.find(q => q.id === id)),
    questionsBy: filter => API._delay(DATA.questions.filter(filter || (() => true))),
    openQuestions: () => API._delay(DATA.openQuestions),
    openQuestion: id => API._delay(DATA.openQuestions.find(o => o.id === id))
  },
  exam: {
    blueprints: () => API._delay(DATA.blueprints),
    blueprint: id => API._delay(DATA.blueprints.find(b => b.id === id))
  },
  mastery: {
    profile: () => API._delay(DATA.profile),
    of: comp => API._delay(DATA.profile.mastery.find(m => m.comp === comp))
  },
  coach: {
    reply: text => {
      const t = (text || '').toLowerCase();
      const hit = DATA.coachScripts.find(s => s.match.some(m => t.includes(m)));
      return API._delay(hit || DATA.coachFallback, 900);
    },
    suggestions: () => API._delay(DATA.coachSuggestions)
  },
  certification: {
    all: () => API._delay(DATA.certifications),
    one: id => API._delay(DATA.certifications.find(c => c.id === id)),
    issued: () => API._delay(DATA.issuedCert),
    verify: code => API._delay(code === DATA.issuedCert.code ? DATA.issuedCert : null, 500)
  },
  billing: { plans: () => API._delay(DATA.plans) }
};

/* ---------------- État applicatif ---------------- */
const S = {
  lang: 'fr',
  theme: 'light',
  persona: 'premium',
  sidebarOpen: false,
  // sessions en cours
  diag: null,
  serie: null,
  exam: null,
  cert: null,
  coach: [],
  openAnswer: {},
  filters: {},
  toast: null
};

const T = k => (DATA.i18n[S.lang] && DATA.i18n[S.lang][k]) || DATA.i18n.fr[k] || k;
const isRTL = () => S.lang === 'ar';
const plan = () => DATA.personas[S.persona].plan;
const isPremium = () => plan() === 'premium' || plan() === 'admin';
const isLogged = () => plan() !== 'none';

/* ---------------- Utilitaires ---------------- */
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Rend **gras** et les sauts de ligne, en échappant tout le reste */
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');

const comp = id => DATA.competencies.find(c => c.id === id) || { id, name: id, short: id, pillar: 'SE' };
const pillarOf = id => DATA.pillars.find(p => p.id === comp(id).pillar) || DATA.pillars[0];
const serieVar = id => `var(--series-${pillarOf(id).serie})`;
const masteryOf = id => DATA.profile.mastery.find(m => m.comp === id) || { score: 0, trend: 0, evidence: 0, answers: 0 };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pct = n => Math.round(n) + ' %';
const lvl = s => s >= 70 ? 'high' : s >= 50 ? 'mid' : 'low';
const lvlLabel = s => s >= 80 ? 'Maîtrisée' : s >= 70 ? 'Acquise' : s >= 50 ? 'Fragile' : s >= 30 ? 'À travailler' : 'Prioritaire';
const fmtDate = iso => {
  const M = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const d = new Date(iso + 'T00:00:00');
  return d.getDate() + ' ' + M[d.getMonth()] + ' ' + d.getFullYear();
};
const daysUntil = iso => Math.round((new Date(iso + 'T00:00:00') - new Date('2026-08-04T00:00:00')) / 864e5);
const mmss = s => Math.floor(s / 60).toString().padStart(2, '0') + ':' + (s % 60).toString().padStart(2, '0');
const shuffleSeeded = (arr, seed) => {
  const a = arr.slice(); let s = seed;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

/* ---------------- Primitives d'interface ---------------- */
function badge(txt, kind) { return `<span class="badge ${kind ? 'badge-' + kind : ''}">${esc(txt)}</span>`; }

function evidence(n, label) {
  const pips = [1, 2, 3, 4].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('');
  const words = ['très faible', 'faible', 'correcte', 'solide'];
  return `<span class="evidence" title="Volume de réponses sur lequel repose le score">
    <span class="pips">${pips}</span> ${label !== false ? 'évidence ' + (words[n - 1] || 'nulle') : ''}</span>`;
}

function diffDots(d) {
  return `<span class="badge badge-outline" title="Difficulté éditoriale ${d}/4">${'●'.repeat(d)}${'○'.repeat(4 - d)}</span>`;
}

function masteryRow(m) {
  const c = comp(m.comp);
  const tr = m.trend > 0 ? `<span class="delta-up">▲ ${m.trend}</span>` : m.trend < 0 ? `<span class="delta-down">▼ ${Math.abs(m.trend)}</span>` : '<span class="muted">—</span>';
  return `<div class="mastery">
    <div class="name"><b>${esc(c.name)}</b><span>${esc(pillarOf(m.comp).name)} · ${m.answers} réponses · mis à jour ${esc(m.updated || '')}</span></div>
    <div class="gauge"><div class="bar is-${lvl(m.score)}"><span style="width:${m.score}%"></span></div>
      <div class="xsmall muted" style="margin-top:4px">${lvlLabel(m.score)} · ${evidence(m.evidence)}</div></div>
    <div class="score mono">${m.score}</div>
    <div style="width:44px;text-align:end" class="small">${tr}</div>
  </div>`;
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'tip on';
  el.style.cssText = 'inset-block-end:24px;inset-inline-start:50%;transform:translateX(-50%);inset-block-start:auto;padding:11px 18px;font-size:.9rem;z-index:300';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.classList.remove('on'); setTimeout(() => el.remove(), 200); }, 2400);
}

function modal(html) {
  const o = document.createElement('div');
  o.className = 'overlay';
  o.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  o.addEventListener('click', e => { if (e.target === o) o.remove(); });
  document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { o.remove(); document.removeEventListener('keydown', k); } });
  document.body.appendChild(o);
  return o;
}
function closeModal() { document.querySelectorAll('.overlay').forEach(o => o.remove()); }

/* ---------------- Graphiques (SVG, sans dépendance) ----------------
   Règles appliquées : une seule échelle par axe, marques fines, grille
   discrète, étiquettes directes, légende dès deux séries, survol partout.
   ------------------------------------------------------------------ */

let TIP;
function tipInit() {
  if (TIP) return;
  TIP = document.createElement('div'); TIP.className = 'tip'; document.body.appendChild(TIP);
  document.addEventListener('mousemove', e => {
    if (!TIP.classList.contains('on')) return;
    const x = e.clientX + 14, y = e.clientY - 10;
    TIP.style.insetInlineStart = 'auto'; TIP.style.left = Math.min(x, innerWidth - 240) + 'px'; TIP.style.top = y + 'px';
  });
}
function tipOn(html) { tipInit(); TIP.innerHTML = html; TIP.classList.add('on'); }
function tipOff() { if (TIP) TIP.classList.remove('on'); }

/* Radar des piliers — 3 axes agrégés, ou radar de compétences */
function radarChart(items, opts) {
  opts = opts || {};
  const size = opts.size || 300, cx = size / 2, cy = size / 2, R = size / 2 - 42;
  const n = items.length, step = (Math.PI * 2) / n;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + i * step;
    return [cx + Math.cos(a) * r * R / 100, cy + Math.sin(a) * r * R / 100];
  };
  let rings = '';
  [25, 50, 75, 100].forEach(r => {
    const p = items.map((_, i) => pt(i, r).join(',')).join(' ');
    rings += `<polygon points="${p}" fill="none" stroke="var(--viz-grid)" stroke-width="1"/>`;
  });
  let spokes = items.map((_, i) => {
    const [x, y] = pt(i, 100);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--viz-grid)" stroke-width="1"/>`;
  }).join('');
  const poly = items.map((it, i) => pt(i, it.score).join(',')).join(' ');
  const dots = items.map((it, i) => {
    const [x, y] = pt(i, it.score);
    return `<circle cx="${x}" cy="${y}" r="4.5" fill="${it.color || 'var(--series-1)'}" stroke="var(--surface-2)" stroke-width="2"
      data-tip="${esc(it.label)} — ${it.score}/100" class="vz"/>`;
  }).join('');
  const labels = items.map((it, i) => {
    const [x, y] = pt(i, 122);
    const anchor = Math.abs(x - cx) < 6 ? 'middle' : (x > cx ? 'start' : 'end');
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle"
      font-size="11" font-weight="600" fill="var(--ink-2)">${esc(it.short || it.label)}</text>
      <text x="${x}" y="${y + 13}" text-anchor="${anchor}" dominant-baseline="middle"
      font-size="10.5" fill="var(--ink-3)">${it.score}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="${size}" role="img" aria-label="Radar de maîtrise">
    ${rings}${spokes}
    <polygon points="${poly}" fill="var(--series-1)" fill-opacity=".14" stroke="var(--series-1)" stroke-width="2" stroke-linejoin="round"/>
    ${dots}${labels}</svg>`;
}

/* Courbe multi-séries */
function lineChart(rows, series, opts) {
  opts = opts || {};
  const W = 560, H = opts.height || 210, P = { t: 14, r: 16, b: 26, l: 30 };
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const max = 100, x = i => P.l + (iw * i) / (rows.length - 1), y = v => P.t + ih - (v / max) * ih;
  let grid = '';
  [0, 25, 50, 75, 100].forEach(v => {
    grid += `<line x1="${P.l}" y1="${y(v)}" x2="${W - P.r}" y2="${y(v)}" stroke="var(--viz-grid)" stroke-width="1"/>
             <text x="${P.l - 7}" y="${y(v) + 3.5}" text-anchor="end" font-size="10" fill="var(--ink-3)">${v}</text>`;
  });
  let xl = rows.map((r, i) => `<text x="${x(i)}" y="${H - 7}" text-anchor="middle" font-size="10" fill="var(--ink-3)">${esc(r.d)}</text>`).join('');
  let paths = series.map(s => {
    const d = rows.map((r, i) => (i ? 'L' : 'M') + x(i) + ' ' + y(r[s.key])).join(' ');
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  // Étiquettes de fin décalées verticalement pour éviter les collisions
  const li = rows.length - 1;
  const ranked = series.map(s => ({ s, v: rows[li][s.key] })).sort((a, b) => b.v - a.v);
  let prevY = -Infinity;
  ranked.forEach(r => { let ly = y(r.v) + 4; if (ly - prevY < 14) ly = prevY + 14; r.ly = ly; prevY = ly; });
  let ends = ranked.map(r => `
    <circle cx="${x(li)}" cy="${y(r.v)}" r="4" fill="${r.s.color}" stroke="var(--surface-2)" stroke-width="2"/>
    <text x="${x(li) - 9}" y="${r.ly}" text-anchor="end" font-size="11" font-weight="700" fill="${r.s.color}">${r.v}</text>`).join('');
  let hot = rows.map((r, i) => {
    const t = series.map(s => `${esc(s.label)} : ${r[s.key]}`).join('<br>');
    return `<rect x="${x(i) - iw / (rows.length * 2)}" y="${P.t}" width="${iw / rows.length}" height="${ih}" fill="transparent"
      class="vz" data-tip="<b>${esc(r.d)}</b><br>${t}"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Évolution de la maîtrise">
    ${grid}${xl}${paths}${ends}${hot}</svg>`;
}

/* Barres horizontales */
function barsChart(items, opts) {
  opts = opts || {};
  const bh = 26, gap = 9, W = 560, labelW = opts.labelW || 168;
  const H = items.length * (bh + gap);
  const iw = W - labelW - 46;
  const maxChars = Math.floor((labelW - 8) / 5.7);
  const cut = s => s.length > maxChars ? s.slice(0, maxChars - 1).trimEnd() + '…' : s;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="${esc(opts.aria || 'Barres')}">
    ${items.map((it, i) => {
      const yy = i * (bh + gap);
      const w = Math.max(2, (it.value / (opts.max || 100)) * iw);
      return `<text x="0" y="${yy + bh / 2 + 4}" font-size="11.5" fill="var(--ink-2)"><title>${esc(it.label)}</title>${esc(cut(it.label))}</text>
        <rect x="${labelW}" y="${yy}" width="${iw}" height="${bh}" rx="6" fill="var(--surface-3)"/>
        <rect x="${labelW}" y="${yy}" width="${w}" height="${bh}" rx="6" fill="${it.color || 'var(--series-1)'}" class="vz"
          data-tip="${esc(it.label)} — ${esc(it.tip || it.value)}"/>
        <text x="${labelW + iw + 8}" y="${yy + bh / 2 + 4}" font-size="11.5" font-weight="700" fill="var(--ink-2)">${esc(it.value + (opts.unit || ''))}</text>`;
    }).join('')}</svg>`;
}

/* Calendrier d'activité */
function activityChart(days) {
  const cell = 15, gap = 4, cols = Math.ceil(days.length / 7);
  const W = cols * (cell + gap), H = 7 * (cell + gap);
  const shade = v => v === 0 ? 'var(--surface-3)' : v === 1 ? 'var(--brand-100)' : v === 2 ? 'var(--brand-300)' : v === 3 ? 'var(--brand-600)' : 'var(--brand-800)';
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Activité des 4 dernières semaines">
    ${days.map((v, i) => {
      const c = Math.floor(i / 7), r = i % 7;
      return `<rect x="${c * (cell + gap)}" y="${r * (cell + gap)}" width="${cell}" height="${cell}" rx="3.5" fill="${shade(v)}"
        class="vz" data-tip="Jour ${i + 1} — ${v} série${v > 1 ? 's' : ''}"/>`;
    }).join('')}</svg>`;
}

/* Distribution des distracteurs */
function distractorBars(q) {
  const keys = q.choices.map(c => c.k);
  return `<div class="col" style="gap:7px">${keys.map(k => {
    const v = Math.round((q.stats.distractors[k] || 0) * 100);
    const ok = k === q.correct;
    return `<div class="row" style="gap:10px">
      <span class="rat-key ${ok ? 'ok' : 'no'}" style="width:20px;height:20px">${k}</span>
      <div class="bar" style="flex:1"><span style="width:${v}%;background:${ok ? 'var(--good)' : 'var(--line-strong)'}"></span></div>
      <span class="mono xsmall" style="width:34px;text-align:end">${v} %</span></div>`;
  }).join('')}</div>`;
}

function bindViz(root) {
  (root || document).querySelectorAll('.vz').forEach(el => {
    el.style.cursor = 'default';
    el.addEventListener('mouseenter', () => tipOn(el.dataset.tip));
    el.addEventListener('mouseleave', tipOff);
  });
}

/* ---------------- Routeur ---------------- */
const ROUTES = {};
function route(path, fn) { ROUTES[path] = fn; }

function navigate(hash) {
  // Une ancre identique ne déclenche pas hashchange : on rend explicitement.
  if (location.hash === hash) render(); else location.hash = hash;
}

function currentRoute() {
  const h = (location.hash || '#/').replace(/^#/, '');
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  return { path, parts, q: new URLSearchParams(qs || '') };
}

function render() {
  const r = currentRoute();
  const key = '/' + r.parts.join('/');
  let fn = ROUTES[key];
  if (!fn) {
    for (const p in ROUTES) {
      const a = p.split('/').filter(Boolean), b = r.parts;
      if (a.length !== b.length) continue;
      if (a.every((seg, i) => seg.startsWith(':') || seg === b[i])) { fn = ROUTES[p]; break; }
    }
  }
  const root = document.getElementById('root');
  root.innerHTML = fn ? fn(r) : notFound();
  bindViz(root);
  window.scrollTo(0, 0);
  document.querySelectorAll('[data-autofocus]').forEach(e => e.focus());
  S.sidebarOpen = false;
}

function notFound() {
  return shellPublic(`<div class="wrap" style="padding:80px 20px"><div class="empty">
    <div class="e-ico">🧭</div><h2>Page introuvable</h2>
    <p class="muted">Cet écran n'existe pas dans le prototype.</p>
    <a class="btn btn-primary mt16" href="#/">Retour à l'accueil</a></div></div>`);
}

/* ---------------- Enveloppes ---------------- */
function demobar() {
  return `<div class="demobar">
    <span>🧪 Prototype de démonstration — données simulées</span>
    <label>Rôle
      <select onchange="setPersona(this.value)">
        ${Object.entries(DATA.personas).map(([k, v]) => `<option value="${k}" ${S.persona === k ? 'selected' : ''}>${esc(v.label)}</option>`).join('')}
      </select>
    </label>
    <span class="only-mobile-hide">·</span>
    <a href="#/verifier" style="color:inherit">Vérifier une attestation</a>
  </div>`;
}

function topbar(active) {
  const links = [
    ['#/p/education', 'Éducation', 'education'],
    ['#/p/postbac', 'Post-bac', 'postbac'],
    ['#/p/pro', 'Professionnels', 'pro'],
    ['#/annales', T('nav_annales'), 'annales'],
    ['#/ressources', T('nav_ressources'), 'ressources'],
    ['#/calendrier', T('nav_calendrier'), 'calendrier']
  ];
  return `${demobar()}<header class="topbar"><div class="inner">
    <a class="logo" href="#/" dir="ltr"><span class="logo-mark">ن</span> Najah<em>.ma</em></a>
    <nav class="navlinks">${links.map(([h, t, k]) => `<a href="${h}" class="${active === k ? 'on' : ''}">${esc(t)}</a>`).join('')}</nav>
    <span class="spacer"></span>
    <button class="iconbtn" onclick="toggleLang()" title="Français / العربية" aria-label="Changer de langue">${S.lang === 'fr' ? 'ع' : 'FR'}</button>
    <button class="iconbtn" onclick="toggleTheme()" title="Thème clair / sombre" aria-label="Changer de thème">${S.theme === 'light' ? '◐' : '◑'}</button>
    ${isLogged()
      ? `<a class="btn btn-primary btn-sm" href="#/app">Mon espace</a>`
      : `<a class="btn btn-quiet btn-sm" href="#/app">${esc(T('nav_login'))}</a>
         <a class="btn btn-primary btn-sm" href="#/app/onboarding">${esc(T('nav_start'))}</a>`}
  </div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap">
    <div class="grid g4">
      <div>
        <a class="logo" href="#/" dir="ltr" style="margin-bottom:10px"><span class="logo-mark">ن</span> Najah<em>.ma</em></a>
        <p class="small muted" style="max-width:30ch">Plateforme marocaine de préparation aux concours. Comprendre ses erreurs, mesurer ses acquis, savoir quoi travailler ensuite.</p>
      </div>
      <div><h5>Filières</h5>
        <a href="#/p/education">Métiers de l'éducation</a><a href="#/p/postbac">Concours post-bac</a>
        <a href="#/p/pro">Concours professionnels</a><a href="#/concours">Tous les concours</a></div>
      <div><h5>Ressources</h5>
        <a href="#/annales">Annales corrigées</a><a href="#/ressources">Fiches et articles</a>
        <a href="#/calendrier">Calendrier des concours</a><a href="#/demo">QCM de démonstration</a></div>
      <div><h5>Plateforme</h5>
        <a href="#/tarifs">Tarifs</a><a href="#/certification">Certification</a>
        <a href="#/verifier">Vérifier une attestation</a><a href="#/app">Mon espace</a></div>
    </div>
    <div class="divider"></div>
    <div class="row-between small muted">
      <span>© 2026 Najah.ma — prototype de démonstration, contenu simulé.</span>
      <span>Conditions · Confidentialité · Contact</span>
    </div>
  </div></footer>`;
}

function shellPublic(html, active) { return topbar(active) + `<main>${html}</main>` + footer(); }

function sidebar(active) {
  const items = [
    ['g', T('g_prepare')],
    ['#/app', '◉', T('side_home'), 'home'],
    ['#/app/diagnostic', '◎', T('side_diag'), 'diag'],
    ['#/app/entrainement', '✎', T('side_train'), 'train'],
    ['#/app/coach', '☰', T('side_coach'), 'coach'],
    ['#/app/carnet', '✦', T('side_book'), 'book'],
    ['g', T('g_verify')],
    ['#/app/redaction', '✍', T('side_open'), 'open'],
    ['#/app/simulateur', '⏱', T('side_sim'), 'sim'],
    ['#/app/progression', '▤', T('side_prog'), 'prog'],
    ['#/app/certification', '✓', T('side_cert'), 'cert'],
    ['g', T('g_account')],
    ['#/app/abonnement', '◈', T('side_sub'), 'sub'],
    ['#/app/parametres', '⚙', T('side_set'), 'set']
  ];
  return `<aside class="sidebar ${S.sidebarOpen ? 'open' : ''}" id="sidebar">
    ${items.map(it => it[0] === 'g'
      ? `<div class="group">${esc(it[1])}</div>`
      : `<a href="${it[0]}" class="${active === it[3] ? 'on' : ''}"><span class="ico">${it[1]}</span>${esc(it[2])}</a>`).join('')}
    <div class="group">${esc(T('lbl_overview'))}</div>
    <div style="padding:0 11px">
      <div class="small dim">${esc(T('lbl_goal'))} — <bdi>${esc(DATA.profile.session)}</bdi></div>
      <div class="strong" style="font-size:.9rem"><bdi>J−${daysUntil(DATA.profile.targetDate)}</bdi> ${esc(T('lbl_before'))}</div>
      <div class="bar bar-thin mt8"><span style="width:${Math.round((1 - daysUntil(DATA.profile.targetDate) / 157) * 100)}%"></span></div>
      <div class="xsmall muted mt8">${esc(T('lbl_streak').replace('{n}', DATA.profile.streak))} 🔥</div>
    </div>
  </aside>`;
}

function shellApp(html, active) {
  return topbar() + `<div class="applayout">${sidebar(active)}
    <main class="appmain">${html}</main></div>
    <button class="btn btn-primary fab only-mobile" onclick="toggleSidebar()" aria-label="Ouvrir le menu">☰ Menu</button>`;
}

function pagehead(title, sub, right) {
  return `<div class="pagehead row-between">
    <div><h1>${esc(title)}</h1>${sub ? `<div class="sub">${md(sub)}</div>` : ''}</div>
    ${right || ''}</div>`;
}

function paywall(what) {
  return `<div class="paywall">
    <div class="lockicon">🔒</div>
    <h3>${esc(what)} fait partie de l'offre Premium</h3>
    <p class="muted" style="max-width:46ch;margin:8px auto 0">Les droits sont vérifiés côté serveur : masquer un bouton ne suffit jamais. Cet écran illustre le mur payant tel qu'il apparaîtra au candidat.</p>
    <div class="row" style="justify-content:center;margin-top:18px">
      <a class="btn btn-primary" href="#/tarifs">Voir les offres</a>
      <button class="btn btn-ghost" onclick="setPersona('premium')">Basculer en Premium (démo)</button>
    </div></div>`;
}

/* ---------------- Actions globales ---------------- */
function setPersona(p) { S.persona = p; render(); }
function toggleLang() {
  S.lang = S.lang === 'fr' ? 'ar' : 'fr';
  document.documentElement.lang = S.lang;
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  render();
}
function toggleTheme() {
  S.theme = S.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = S.theme;
  render();
}
function toggleSidebar() {
  S.sidebarOpen = !S.sidebarOpen;
  document.getElementById('sidebar').classList.toggle('open', S.sidebarOpen);
}
