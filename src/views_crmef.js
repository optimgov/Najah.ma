/* =========================================================================
   NAJAH.ma — Parcours CRMEF
   Page publique · configuration · épreuves · diagnostic · tableau de bord ·
   Boucle Najah · entraînement · carnet d'erreurs · simulations · rapport
   ========================================================================= */

const CR = () => DATA.crmef.concours;
const NCLABEL = 'Non communiqué par le descriptif';

/* ---------------- Primitives d'affichage ---------------- */
function editBadge(q) {
  const e = DATA.crmef.editStatus[q.edit] || DATA.crmef.editStatus.brouillon;
  return badge(e.label, e.kind);
}
function masteryPill(stateId, small) {
  const s = masteryLabel(stateId);
  return `<span class="mpill ${small ? 'sm' : ''}" style="--mc:${s.color}">${esc(s.label)}</span>`;
}
function coverageBar(c) {
  const depth = c.subs ? Math.round((c.covered / c.subs) * 100) : 0;
  return `<div>
    <div class="row-between xsmall"><span class="muted">Couverture du programme officiel</span>
      <b class="mono">${c.weightPct} %</b></div>
    <div class="bar bar-thin" style="margin-top:5px"><span style="width:${c.weightPct}%;background:${c.weightPct >= 90 ? 'var(--good)' : c.weightPct >= 60 ? 'var(--warn)' : 'var(--critical)'}"></span></div>
    <div class="xsmall muted" style="margin-top:5px">${c.covered} sous-domaines sur ${c.subs} disposent d'au moins une question · ${c.questions} questions au total</div>
  </div>`;
}
function thinWarning(subId) {
  const n = subQuestions(subId).length;
  if (n === 0) return badge('Aucune question', 'crit');
  if (n === 1) return badge('Couverture minimale — 1 question', 'warn');
  return badge(n + ' questions', 'outline');
}

/* =========================================================================
   PAGE PUBLIQUE — #/concours/crmef
   ========================================================================= */
route('/concours/crmef', () => {
  const cov = crmefCoverage();
  const fam = DATA.families.find(f => f.id === 'crmef');
  return shellPublic(`
  <section class="dhero3 zel-host">${zellige('zcr', .04)}<div class="wrap" style="position:relative">
    <div class="crumb"><a href="#/">Accueil</a> › <a href="#/p/education">Métiers de l'éducation</a> › ${esc(CR().titleShort)}</div>
    <div class="eyebrow" style="margin-bottom:14px">${khatam(12)} ${esc(CR().session)}</div>
    <h1 style="font-size:clamp(1.6rem,3.2vw,2.4rem);max-width:24ch">${esc(CR().titleOfficial)}</h1>
    <div class="small muted mono" dir="rtl" style="margin-top:8px">${esc(CR().titleAr)}</div>
    <p class="lede" style="margin-top:14px">Trois épreuves, trois coefficients, trois programmes distincts. Najah.ma les traite séparément et affiche pour chacune la part du programme officiel réellement couverte par son contenu.</p>
    <div class="row row-wrap mt24">
      <a class="btn btn-primary btn-lg" href="#/concours/crmef/francais-secondaire">${icon('route', 19)} Découvrir mon parcours CRMEF</a>
      <a class="btn btn-ghost btn-lg" href="#/app/parcours/crmef/diagnostic">${icon('target', 19)} Commencer le diagnostic</a>
    </div>
    <div class="stat3">
      <div><span>Épreuves</span><b>3</b></div>
      <div><span>Coefficient total</span><b>40</b></div>
      <div><span>Durée cumulée</span><b>8 h</b></div>
      <div><span>Spécialité ouverte</span><b>1</b></div>
    </div>
  </div></section>

  <div class="wrap">
    <section class="section">
      <div class="shead"><div class="snum"><i>01</i><span></span></div>
        <h2>À qui s'adresse ce concours</h2>
        <div class="ssub">Aux titulaires d'une licence qui visent le cycle de qualification des cadres enseignants, dans les Centres régionaux des métiers de l'éducation et de la formation.</div></div>
      <div class="grid g2">
        <div class="card"><h3 style="font-size:1rem">Cycles concernés</h3>
          <p class="small dim" style="margin:8px 0 0">Le descriptif officiel de la langue française couvre <b>les deux cycles</b> : secondaire collégial et secondaire qualifiant. Le programme est commun aux deux.</p>
          <div class="row row-wrap mt16" style="gap:8px">${DATA.crmef.cycles.map(c => `<span class="dtag">${esc(c.name)}</span>`).join('')}</div>
        </div>
        <div class="card" style="border-color:var(--sem-trap)"><h3 style="font-size:1rem">Ce concours n'est pas…</h3>
          <ul class="small dim" style="margin:8px 0 0">${CR().notThis.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <p class="xsmall muted" style="margin:10px 0 0">La confusion est fréquente et coûteuse : chaque voie a son calendrier, ses épreuves et son public.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shead"><div class="snum"><i>02</i><span></span></div>
        <h2>Les trois épreuves du parcours Français</h2>
        <div class="ssub">Coefficients, durées et répartitions issus du descriptif officiel. Ce qui n'y figure pas n'est pas affiché.</div></div>
      <div class="col" style="gap:16px">
        ${DATA.crmef.epreuves.map((e, i) => {
          const c = cov[i];
          return `<div class="card">
            <div class="row-between" style="margin-bottom:12px">
              <div class="row" style="gap:11px">
                <span style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--series-${e.serie});color:#fff;font-weight:800">${e.coef}</span>
                <div><h3 style="font-size:1.05rem">${esc(e.name)}</h3>
                  <div class="xsmall muted">Coefficient ${e.coef} · ${e.minutes / 60} h · ${esc(e.format)} · ${esc(e.langue)}</div></div>
              </div>
              ${badge('Source officielle', 'good')}
            </div>
            <div class="scroll-x"><table class="table" style="min-width:560px">
              <thead><tr><th>Domaine officiel</th><th>Sous-domaine</th><th class="num">Poids</th><th class="num">Contenu Najah</th></tr></thead>
              <tbody>${e.domains.map(d => d.sub.map((sb, k) => `<tr>
                ${k === 0 ? `<td rowspan="${d.sub.length}"><b class="small">${esc(d.name)}</b><div class="xsmall muted">${d.weight} %</div></td>` : ''}
                <td class="small">${esc(sb.name)}</td>
                <td class="num mono small">${sb.weight} %</td>
                <td class="num">${thinWarning(sb.id)}</td></tr>`).join('')).join('')}</tbody>
            </table></div>
            <div class="mt16">${coverageBar(c)}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="disclaimer mt24"><span>${icon('flag', 17)}</span><div>
        <b>Ce que le descriptif ne dit pas.</b> Le nombre de questions par épreuve, le barème détaillé, les règles de navigation et le seuil d'admission ne figurent pas dans les documents officiels dont nous disposons. Najah.ma ne les invente pas et ne les affiche nulle part.</div></div>
    </section>

    <section class="section" style="padding-bottom:24px">
      <div class="shead"><div class="snum"><i>03</i><span></span></div>
        <h2>Spécialités du concours</h2>
        <div class="ssub">Une seule spécialité est ouverte : elle dispose de sa taxonomie officielle, de sa banque, de ses corrections et de ses sources. Les autres sont annoncées sans être promises.</div></div>
      <div class="grid g3">
        ${fam.specialties.map(sp => sp.live
          ? `<a class="card card-hover card-link" href="#/concours/crmef/francais-secondaire">
              <div class="row-between">${badge('Parcours ouvert', 'good')}</div>
              <h3 style="margin-top:11px;font-size:1rem">${esc(sp.name)}</h3>
              <div class="xsmall muted" style="margin-top:6px">Descriptif couvrant le collégial et le qualifiant</div>
              <div class="dgo3" style="margin-top:12px">Découvrir ${icon('arrow', 16, 'ic-flip')}</div></a>`
          : `<div class="card card-flat" style="opacity:.72">
              ${badge(sp.prep || 'Contenu en préparation', 'outline')}
              <h3 style="margin-top:11px;font-size:1rem">${esc(sp.name)}</h3>
              <div class="xsmall muted" style="margin-top:6px">Taxonomie, banque de questions et validation pédagogique à produire</div></div>`).join('')}
      </div>
    </section>
  </div>`, 'education');
});

/* =========================================================================
   PAGE SPÉCIALITÉ — #/concours/crmef/francais-secondaire
   ========================================================================= */
route('/concours/crmef/francais-secondaire', () => {
  const cov = crmefCoverage();
  return shellPublic(`
  <section class="dhero3 zel-host">${zellige('zcs', .04)}<div class="wrap" style="position:relative">
    <div class="crumb"><a href="#/">Accueil</a> › <a href="#/concours/crmef">${esc(CR().titleShort)}</a> › Langue française</div>
    <h1 style="font-size:clamp(1.6rem,3.2vw,2.3rem)">CRMEF — Langue française</h1>
    <div class="row row-wrap mt8" style="gap:8px">${DATA.crmef.cycles.map(c => badge(c.name, 'brand')).join('')}${badge(CR().session)}</div>
    <p class="lede" style="margin-top:14px">Le seul parcours réellement exploitable de la plateforme aujourd'hui. Le descriptif officiel de français couvre les deux cycles du secondaire : le programme y est commun.</p>
    <div class="row row-wrap mt24">
      <a class="btn btn-primary btn-lg" href="#/app/parcours/crmef">${icon('route', 19)} Découvrir mon parcours CRMEF</a>
      <a class="btn btn-ghost btn-lg" href="#/app/parcours/crmef/diagnostic">${icon('target', 19)} Commencer le diagnostic</a>
    </div>
  </div></section>
  <div class="wrap">
    <section class="section">
      <div class="grid g3">
        ${DATA.crmef.epreuves.map((e, i) => `<div class="card">
          <div class="row" style="gap:10px"><span style="width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--series-${e.serie});color:#fff;font-weight:800;font-size:.9rem">${e.coef}</span>
            <div><b class="small" style="display:block">${esc(e.name)}</b><span class="xsmall muted">${e.minutes / 60} h · ${esc(e.format)}</span></div></div>
          <div class="xsmall muted" style="margin-top:10px">${esc(e.langue)}</div>
          <div class="mt16">${coverageBar(cov[i])}</div>
        </div>`).join('')}
      </div>
    </section>
    <section class="section" style="padding-bottom:24px">
      <div class="card card-flat">
        <h3 style="font-size:1rem">Sources</h3>
        <table class="table mt8">
          <thead><tr><th>Document</th><th>Organisme</th><th>Version</th><th class="num">Statut</th></tr></thead>
          <tbody>${DATA.crmef.sources.map(s => `<tr><td class="small">${esc(s.ref)}</td><td class="small muted">${esc(s.org)}</td>
            <td class="small mono">${esc(s.version)}</td><td class="num">${badge('Officielle', 'good')}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </section>
  </div>`, 'education');
});

/* =========================================================================
   CONFIGURATION DU PARCOURS
   ========================================================================= */
function parcoursForm() {
  const s = st();
  const p = s.parcours || {};
  return `<div class="card" style="max-width:640px">
    <h3 style="font-size:1.05rem">Configurer mon parcours</h3>
    <p class="small dim">Ces informations déterminent le diagnostic, les recommandations et les simulations. Elles ne vous seront pas redemandées.</p>
    <div class="field mt16"><label>Concours</label>
      <input class="input" value="${esc(CR().titleShort)} — Langue française" disabled></div>
    <div class="field"><label>Cycle visé</label>
      <div class="row row-wrap" style="gap:8px">
        ${DATA.crmef.cycles.map(c => `<span class="chip ${p.cycle === c.id ? 'on' : ''}" onclick="setParcours('cycle','${c.id}')">${esc(c.name)}</span>`).join('')}
      </div>
      <div class="hint">Le descriptif de français est commun aux deux cycles ; votre choix sert au vocabulaire des exemples.</div></div>
    <div class="field"><label>Session préparée</label>
      <select class="select" onchange="setParcours('session',this.value)">
        <option ${p.session === 'nov-2026' ? 'selected' : ''} value="nov-2026">Session de novembre 2026</option>
        <option ${p.session === 'nov-2025' ? 'selected' : ''} value="nov-2025">Session de novembre 2025 (référence)</option>
      </select></div>
    <div class="field"><label>Langue de l'épreuve de sciences de l'éducation</label>
      <div class="row row-wrap" style="gap:8px">
        <span class="chip ${p.langueSE === 'fr' ? 'on' : ''}" onclick="setParcours('langueSE','fr')">Français</span>
        <span class="chip ${p.langueSE === 'ar' ? 'on' : ''}" onclick="setParcours('langueSE','ar')">العربية</span>
      </div>
      <div class="hint">Le descriptif autorise ce choix pour cette épreuve uniquement. Les deux autres se déroulent en français.</div></div>
    <div class="field"><label>Temps de préparation disponible par semaine</label>
      <div class="row row-wrap" style="gap:8px">
        ${[['2', 'Moins de 3 h'], ['5', '3 à 6 h'], ['9', '7 à 12 h'], ['15', 'Plus de 12 h']].map(([v, l]) =>
          `<span class="chip ${p.tempsParSemaine === v ? 'on' : ''}" onclick="setParcours('tempsParSemaine','${v}')">${l}</span>`).join('')}
      </div></div>
    <div class="row row-wrap mt16">
      <button class="btn btn-primary" ${p.cycle && p.langueSE ? '' : 'disabled'} onclick="saveParcours()">Enregistrer mon parcours</button>
      ${s.parcours ? `<button class="btn btn-quiet" onclick="navigate('#/app/parcours/crmef')">Annuler</button>` : ''}
    </div>
    ${p.cycle && p.langueSE ? '' : '<div class="hint mt8">Le cycle et la langue sont nécessaires pour continuer.</div>'}
  </div>`;
}
function setParcours(k, v) {
  const s = st();
  s.parcours = s.parcours || { concours: 'crmef', specialite: 'fr-sq', session: 'nov-2026' };
  s.parcours[k] = v; storeSave(); render();
}
function saveParcours() {
  const s = st();
  s.parcours.concours = 'crmef'; s.parcours.specialite = 'fr-sq';
  s.parcours.session = s.parcours.session || 'nov-2026';
  s.parcours.savedAt = nowTs(); storeSave();
  toast('Parcours enregistré — il sera restauré à chaque visite');
  navigate('#/app/parcours/crmef');
}

/* =========================================================================
   TABLEAU DE BORD — #/app/parcours/crmef
   ========================================================================= */
route('/app/parcours/crmef', () => {
  const s = st();
  if (!s.parcours || !s.parcours.savedAt) {
    return shellApp(`${pagehead('Mon parcours CRMEF', "Première étape : indiquer ce que vous préparez.")}${parcoursForm()}`, 'parcours');
  }
  const p = s.parcours;
  const cov = crmefCoverage();
  const mission = nextMission();
  const cycle = DATA.crmef.cycles.find(c => c.id === p.cycle);
  const due = dueRecalls().length;

  return shellApp(`
    ${pagehead('Mon parcours CRMEF', null, `<button class="btn btn-ghost btn-sm" onclick="navigate('#/app/parcours/crmef?edit=1')">${icon('gear', 16)} Modifier</button>`)}

    <div class="missionrail">
      <span class="mric">${icon('route', 18)}</span>
      <div style="flex:1;min-width:200px">
        <b>${esc(CR().titleShort)} — Langue française</b>
        <span>${esc(cycle ? cycle.name : '')} · ${p.session === 'nov-2026' ? 'Session de novembre 2026' : 'Session de novembre 2025'} · Sciences de l'éducation en ${p.langueSE === 'ar' ? 'arabe' : 'français'}</span>
      </div>
      ${due ? badge(due + ' rappel(s) à effectuer', 'warn') : ''}
    </div>

    <div class="card" style="border-color:var(--sem-remedy);border-inline-start:3px solid var(--sem-remedy);margin-bottom:22px">
      <div class="row-between" style="margin-bottom:8px">
        <div class="row" style="gap:10px"><span style="width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--sem-remedy-wash);color:var(--sem-remedy)">${icon('target', 18)}</span>
          <b>Ma prochaine mission</b></div>
        ${badge(mission.type, 'outline')}
      </div>
      <h3 style="font-size:1.15rem">${esc(mission.title)}</h3>
      <details style="margin-top:10px"><summary class="small" style="cursor:pointer;color:var(--brand-700);font-weight:650">Pourquoi cette activité ?</summary>
        <p class="small dim" style="margin:9px 0 0">${esc(mission.why)}</p></details>
      <div class="row mt16"><a class="btn btn-primary" href="${mission.route}">Commencer</a></div>
    </div>

    <h2 style="font-size:1.15rem;margin-bottom:12px">Les trois épreuves</h2>
    <div class="grid g3" style="margin-bottom:26px">
      ${DATA.crmef.epreuves.map((e, i) => {
        const c = cov[i];
        const subs = ALL_SUBS().filter(x => x.ep === e.id);
        const evaluated = subs.filter(x => masteryOfSub(x.id).state !== 'non_evaluee');
        const weak = subs.filter(x => ['fragile', 'en_cours'].includes(masteryOfSub(x.id).state));
        const last = s.attempts.filter(a => a.ep === e.id).sort((a, b) => b.ts - a.ts)[0];
        const status = !evaluated.length ? 'Non commencée' : evaluated.length < subs.length ? 'En cours' : 'Parcourue';
        return `<div class="card">
          <div class="row-between"><span style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--series-${e.serie});color:#fff;font-weight:800;font-size:.85rem">${e.coef}</span>
            ${badge(status, status === 'Non commencée' ? 'outline' : status === 'En cours' ? 'warn' : 'good')}</div>
          <h3 style="font-size:1rem;margin-top:10px">${esc(e.name)}</h3>
          <div class="xsmall muted">Coef ${e.coef} · ${e.minutes / 60} h · ${esc(e.langue.split(',')[0])}</div>
          <div class="mt16">${coverageBar(c)}</div>
          <div class="col mt16" style="gap:5px">
            <div class="row-between xsmall"><span class="muted">Domaines travaillés</span><b>${evaluated.length} / ${subs.length}</b></div>
            <div class="row-between xsmall"><span class="muted">Fragilités identifiées</span><b style="color:${weak.length ? 'var(--critical)' : 'var(--ink-2)'}">${weak.length}</b></div>
            <div class="row-between xsmall"><span class="muted">Dernière activité</span><b>${last ? new Date(last.ts).toLocaleDateString('fr-FR') : '—'}</b></div>
          </div>
          <div class="row row-wrap mt16" style="gap:6px">
            <a class="btn btn-sm btn-ghost" href="#/app/parcours/crmef/entrainement?ep=${e.id}">Entraînement</a>
            <a class="btn btn-sm btn-quiet" href="#/app/parcours/crmef/simulation/${e.id}">Simulation</a>
          </div>
        </div>`;
      }).join('')}
    </div>

    <h2 style="font-size:1.15rem;margin-bottom:12px">Avancement du parcours</h2>
    <div class="card" style="margin-bottom:26px">
      <div class="frise">${parcoursStages().map(x => `
        <div class="fstep ${x.done ? 'done' : x.partial ? 'partial' : ''}">
          <span class="fdot">${x.done ? icon('check', 13) : ''}</span>
          <span class="flab">${esc(x.name)}</span></div>`).join('')}</div>
      <p class="xsmall muted" style="margin:14px 0 0">Cette frise indique où vous en êtes dans le parcours de préparation. Elle ne préjuge en rien du résultat au concours.</p>
    </div>

    <div class="grid g4">
      <a class="card lift card-link" href="#/app/parcours/crmef/diagnostic"><div style="color:var(--brand-700)">${icon('target', 22)}</div>
        <b class="small" style="display:block;margin-top:8px">Diagnostic</b><span class="xsmall muted">${s.diagnostic ? (s.diagnostic.done ? 'Terminé' : 'À reprendre') : 'Non commencé'}</span></a>
      <a class="card lift card-link" href="#/app/parcours/crmef/entrainement"><div style="color:var(--brand-700)">${icon('pen', 22)}</div>
        <b class="small" style="display:block;margin-top:8px">Entraînement</b><span class="xsmall muted">${s.attempts.filter(a => a.mode === 'entrainement').length} réponses</span></a>
      <a class="card lift card-link" href="#/app/parcours/crmef/erreurs"><div style="color:var(--sem-trap)">${icon('bookmark', 22)}</div>
        <b class="small" style="display:block;margin-top:8px">Carnet d'erreurs</b><span class="xsmall muted">${Object.keys(s.errors).length} entrée(s)</span></a>
      <a class="card lift card-link" href="#/app/parcours/crmef/simulations"><div style="color:var(--brand-700)">${icon('timer', 22)}</div>
        <b class="small" style="display:block;margin-top:8px">Simulations</b><span class="xsmall muted">${Object.values(s.sims).filter(x => x.submitted).length} passée(s)</span></a>
    </div>`, 'parcours');
});

/* Édition du parcours via ?edit=1 */
route('/app/parcours/crmef?edit', () => {});

/* =========================================================================
   DIAGNOSTIC — #/app/parcours/crmef/diagnostic
   ========================================================================= */
function buildDiagPlan() {
  // Respecte autant que possible les poids officiels, sans jamais inventer de question
  const plan = [];
  DATA.crmef.epreuves.forEach(e => {
    ALL_SUBS().filter(s => s.ep === e.id).forEach(sub => {
      const qs = subQuestions(sub.id);
      if (qs.length) plan.push({ ep: e.id, sub: sub.id, qid: qs[0].id, weight: sub.weight });
    });
  });
  return plan.sort((a, b) => a.ep.localeCompare(b.ep) || b.weight - a.weight);
}

route('/app/parcours/crmef/diagnostic', () => {
  const s = st();
  if (!s.parcours || !s.parcours.savedAt) return shellApp(`${pagehead('Diagnostic')}${parcoursForm()}`, 'parcours');
  const d = s.diagnostic;

  if (!d) {
    const plan = buildDiagPlan();
    const gaps = ALL_SUBS().filter(x => !subQuestions(x.id).length);
    return shellApp(`
      ${pagehead('Diagnostic initial', "Structuré par épreuve et par domaine officiel. Vous pouvez l'interrompre et le reprendre : vos réponses sont conservées.")}
      <div class="grid g3" style="margin-bottom:22px">
        ${DATA.crmef.epreuves.map(e => {
          const n = plan.filter(x => x.ep === e.id).length;
          return `<div class="card card-pad-sm"><b class="small">${esc(e.name)}</b>
            <div class="v mono" style="font-size:1.6rem;font-weight:800">${n}</div>
            <span class="xsmall muted">question(s) de diagnostic</span></div>`;
        }).join('')}
      </div>
      ${gaps.length ? `<div class="disclaimer" style="margin-bottom:20px"><span>${icon('flag', 17)}</span><div>
        <b>${gaps.length} sous-domaine(s) officiel(s) ne peuvent pas être évalués</b> faute de question disponible : ${gaps.map(g => esc(g.name)).join(', ')}. Ils apparaîtront comme « non évalués » dans votre carte de compétences, jamais comme acquis.</div></div>` : ''}
      <div class="card card-flat" style="margin-bottom:20px">
        <b class="small">Ce que ce diagnostic ne fera pas</b>
        <p class="small dim" style="margin:6px 0 0">Aucune probabilité de réussite, aucun seuil d'admission, aucun classement, aucun nombre de questions présenté comme officiel. Le descriptif ne communique aucune de ces informations.</p>
      </div>
      <button class="btn btn-primary btn-lg" onclick="startDiag2()">${icon('target', 19)} Commencer le diagnostic</button>`, 'parcours');
  }

  if (d.done) return diagReport();
  return loopScreen({
    mode: 'diagnostic', session: 'diag',
    qid: d.plan[d.i].qid, index: d.i + 1, total: d.plan.length,
    title: 'Diagnostic initial',
    onNext: 'diagNext2()', onQuit: "navigate('#/app/parcours/crmef')"
  });
});

function startDiag2() {
  const s = st();
  s.diagnostic = { started: nowTs(), plan: buildDiagPlan(), i: 0, done: false };
  storeSave(); S.loop = null; render();
}
function diagNext2() {
  const s = st();
  if (s.diagnostic.i + 1 >= s.diagnostic.plan.length) { s.diagnostic.done = true; s.diagnostic.finished = nowTs(); }
  else s.diagnostic.i++;
  storeSave(); S.loop = null; render();
}

function diagReport() {
  const s = st();
  const byEp = DATA.crmef.epreuves.map(e => {
    const subs = ALL_SUBS().filter(x => x.ep === e.id);
    return { e, subs: subs.map(sub => ({ sub, m: masteryOfSub(sub.id) })) };
  });
  return shellApp(`
    ${pagehead('Carte de compétences', "Établie sur vos réponses et votre niveau de certitude. Un sous-domaine sans preuve suffisante n'est jamais déclaré acquis.",
      `<button class="btn btn-ghost btn-sm" onclick="restartDiag()">${icon('refresh', 16)} Refaire</button>`)}
    <div class="disclaimer info" style="margin-bottom:22px"><span>${icon('bulb', 17)}</span><div>
      <b>Lecture.</b> « Consolidée » exige plusieurs réussites espacées dans le temps et une question miroir réussie. Une bonne réponse isolée, même sûre, laisse le sous-domaine « en cours d'acquisition ».</div></div>
    ${byEp.map(({ e, subs }) => `
      <div class="zone">
        <div class="zhead"><span class="zic" style="background:var(--series-${e.serie});color:#fff">${e.coef}</span>
          <div><b>${esc(e.name)}</b><span>Coefficient ${e.coef} · ${subs.filter(x => x.m.state !== 'non_evaluee').length} sous-domaine(s) évalué(s) sur ${subs.length}</span></div></div>
        <div class="col" style="gap:0">
          ${subs.map(({ sub, m }) => `<div class="mastery">
            <div class="name"><b>${esc(sub.name)}</b><span>${esc(sub.domName)} · ${sub.weight} % de l'épreuve · ${m.seen || 0} réponse(s)</span></div>
            <div class="gauge">${masteryPill(m.state)}
              <div class="xsmall muted" style="margin-top:5px">${m.seen ? `preuve ${m.evidence} · ${m.correct}/${m.seen} juste(s)` : thinWarning(sub.id) && subQuestions(sub.id).length ? 'jamais répondu' : 'aucune question disponible'}</div></div>
            <div style="width:auto">${subQuestions(sub.id).length ? `<a class="btn btn-sm btn-quiet" href="#/app/parcours/crmef/apprendre/${sub.id}">Travailler</a>` : badge('Sans contenu', 'crit')}</div>
          </div>`).join('')}
        </div>
      </div>`).join('')}
    <div class="row row-wrap mt24"><a class="btn btn-primary" href="#/app/parcours/crmef">Voir ma prochaine mission</a>
      <a class="btn btn-ghost" href="#/app/parcours/crmef/entrainement">S'entraîner</a></div>`, 'parcours');
}
function restartDiag() {
  modal(`<h3>Refaire le diagnostic ?</h3><p class="small dim">Vos réponses passées sont conservées comme preuves : elles continueront d'alimenter votre carte de compétences.</p>
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Annuler</button>
    <button class="btn btn-primary" onclick="closeModal();startDiag2()">Refaire</button></div>`);
}

/* =========================================================================
   LA BOUCLE NAJAH — écran unique réutilisé par le diagnostic,
   l'apprentissage, l'entraînement et les rappels
   ========================================================================= */
function loopScreen(o) {
  const q = DATA.questions.find(x => x.id === o.qid);
  if (!q) return shellApp(`<div class="empty">${icon('compass', 34)}<p>Question introuvable.</p></div>`, 'parcours');
  const L = S.loop = S.loop || { step: 'answer', answer: null, cert: null, res: null, mirrorQ: null, mirrorAns: null };
  const sub = q.sub ? SUB(q.sub) : null;

  /* --- en-tête commun --- */
  const head = `<div class="exambar">
    <button class="btn btn-sm btn-quiet exitfocus" onclick="${o.onQuit}">${icon('arrow', 15, 'ic-flip')} Quitter</button>
    <b class="small">${esc(o.title)}</b>
    ${sub ? badge(sub.name, 'brand') : ''}
    <span class="spacer" style="flex:1"></span>
    <span class="saveind"><span class="dot"></span>Enregistré</span>
    ${o.total ? `<span class="small muted mono"><bdi>${o.index} / ${o.total}</bdi></span>` : ''}
  </div>
  ${o.total ? `<div class="bar bar-thin" style="margin-bottom:18px"><span style="width:${((o.index - 1) / o.total) * 100}%"></span></div>` : ''}`;

  /* --- étape 1 : répondre --- */
  if (L.step === 'answer') {
    return shellApp(`${head}
      ${questionBlock(q, { answer: L.answer, onPick: `loopPick(` })}
      ${loopMeta(q)}
      <div class="row-between mt24">
        <span class="small muted">Choisissez une réponse, puis indiquez votre degré de certitude.</span>
        <button class="btn btn-primary" ${L.answer ? '' : 'disabled'} onclick="S.loop.step='cert';render()">Continuer</button>
      </div>`, 'parcours');
  }

  /* --- étape 2 : certitude --- */
  if (L.step === 'cert') {
    return shellApp(`${head}
      ${questionBlock(q, { answer: L.answer, onPick: `loopPick(` })}
      <div class="card" style="margin-top:18px;border-color:var(--brand-600)">
        <b>À quel point êtes-vous sûr de votre réponse ?</b>
        <p class="small dim" style="margin:6px 0 14px">Cette information distingue une connaissance solide d'une bonne réponse obtenue par élimination. Elle change la suite du parcours.</p>
        <div class="row row-wrap" style="gap:10px">
          ${CERTITUDES.map(c => `<button class="btn ${L.cert === c.id ? 'btn-primary' : 'btn-ghost'}" onclick="loopCert('${c.id}','${o.mode}','${o.session}')">${icon(c.icon, 17)} ${c.label}</button>`).join('')}
        </div>
      </div>`, 'parcours');
  }

  /* --- étape 3 : correction complète --- */
  if (L.step === 'reveal') {
    const r = L.res || {};
    const conf = r.confusion;
    const lect = r.lecture || {};
    const remed = sub ? `#/app/parcours/crmef/apprendre/${sub.id}` : null;
    return shellApp(`${head}
      <div class="row row-wrap" style="gap:8px;margin-bottom:14px">
        <span class="badge badge-${lect.kind === 'crit' ? 'crit' : lect.kind === 'good' ? 'good' : 'warn'}">${esc(lect.label || '')}</span>
        ${editBadge(q)}
        ${q.prudence ? badge('Rattachement prudent', 'terra') : ''}
      </div>
      ${questionBlock(q, { answer: L.answer, reveal: true })}

      ${conf ? `<div class="card" style="margin-top:18px;border-inline-start:3px solid var(--sem-trap)">
        <div class="row" style="gap:9px;margin-bottom:8px"><span style="color:var(--sem-trap)">${icon('bulb', 18)}</span>
          <b>Confusion probable</b>${badge(conf.formule, 'terra')}</div>
        <p class="small dim" style="margin:0">${md(conf.hypothese || "Aucune confusion type n'est documentée pour cette question.")}</p>
        <div class="row row-wrap mt16" style="gap:8px">
          <button class="btn btn-sm btn-ghost" onclick="toast('Merci — votre confirmation affinera les prochaines recommandations')">C'est bien mon erreur</button>
          <button class="btn btn-sm btn-quiet" onclick="toast('Noté — cette hypothèse ne sera pas retenue')">Ce n'est pas ça</button>
        </div>
      </div>` : ''}

      ${loopMeta(q, true)}

      ${remed ? `<div class="reco" style="margin-top:18px">
        <div class="icon">${icon('route', 20)}</div>
        <div style="flex:1"><h4>Remédiation courte</h4>
          <p class="small dim" style="margin:0">Reprendre le point ${esc(sub.name)} — quelques minutes, ciblées sur la cause de l'erreur plutôt que sur le thème entier.</p>
          <div class="row row-wrap mt16" style="gap:8px">
            <a class="btn btn-sm btn-primary" href="${remed}">Suivre la remédiation</a>
            <button class="btn btn-sm btn-quiet" onclick="markRemed('${sub.id}')">Marquer comme faite</button></div>
        </div></div>` : ''}

      <div class="row-between mt24">
        ${r.mirror ? `<span class="small muted">Une question miroir vérifie le transfert dans un autre contexte.</span>
          <button class="btn btn-primary" onclick="loopMirror('${r.mirror.id}')">${icon('refresh', 17)} Question miroir</button>`
        : `<span class="small muted">Réponse juste et assurée : aucune vérification immédiate n'est nécessaire.</span>
          <button class="btn btn-primary" onclick="${o.onNext}">Continuer</button>`}
      </div>`, 'parcours');
  }

  /* --- étape 4 : question miroir --- */
  if (L.step === 'mirror') {
    const mq = L.mirrorQ;
    return shellApp(`${head}
      <div class="card card-flat" style="margin-bottom:14px"><b class="small">${icon('refresh', 15)} Question miroir</b>
        <p class="small dim" style="margin:5px 0 0">Même sous-domaine, question différente${mq.cog !== q.cog ? `, autre niveau cognitif (${esc(mq.cog)})` : ''}. On vérifie un transfert, pas une mémorisation.</p></div>
      ${questionBlock(mq, { answer: L.mirrorAns, reveal: !!L.mirrorDone, onPick: `loopMirrorPick(` })}
      <div class="row-between mt24">
        <span class="small muted">${L.mirrorDone ? "Une réussite au miroir ne clôt pas la fragilité : un rappel différé est programmé." : ''}</span>
        ${L.mirrorDone
          ? `<button class="btn btn-primary" onclick="${o.onNext}">Continuer</button>`
          : `<button class="btn btn-primary" ${L.mirrorAns ? '' : 'disabled'} onclick="loopMirrorValidate('${q.id}','${q.sub}')">Valider</button>`}
      </div>`, 'parcours');
  }

  return shellApp('', 'parcours');
}

/* Métadonnées officielles d'une question */
function loopMeta(q, full) {
  const sub = q.sub ? SUB(q.sub) : null;
  const src = DATA.crmef.sources.find(s => s.id === q.srcId);
  return `<div class="card card-flat card-pad-sm" style="margin-top:14px">
    <div class="row row-wrap xsmall" style="gap:8px 20px">
      ${sub ? `<span><b>Épreuve :</b> ${esc(sub.epName)}</span><span><b>Domaine :</b> ${esc(sub.domName)}</span><span><b>Sous-domaine :</b> ${esc(sub.name)} (${sub.weight} %)</span>` :
        `<span>${badge('Hors descriptif 2025', 'terra')} contenu complémentaire</span>`}
      <span><b>Niveau cognitif :</b> ${esc(q.cog)}</span>
      <span><b>Difficulté :</b> ${q.diff}/4</span>
      ${full && src ? `<span><b>Source :</b> ${esc(src.ref)} — ${esc(src.version)}</span>` : ''}
      <span>${editBadge(q)}</span>
    </div>
    ${full && q.auditNote ? `<div class="xsmall muted" style="margin-top:8px"><b>Note d'audit :</b> ${esc(q.auditNote)}</div>` : ''}
  </div>`;
}

/* --- actions de la boucle --- */
function loopPick(k) { if (S.loop.step === 'reveal' || S.loop.step === 'mirror') return; S.loop.answer = k; render(); }
function loopCert(c, mode, session) {
  const L = S.loop; L.cert = c;
  const qid = currentLoopQid();
  L.res = submitAnswer({ qid, answer: L.answer, certitude: c, mode, session });
  L.step = 'reveal'; render();
}
function currentLoopQid() {
  const s = st();
  if (S.loopQid) return S.loopQid;
  if (s.diagnostic && !s.diagnostic.done) return s.diagnostic.plan[s.diagnostic.i].qid;
  return null;
}
function loopMirror(mid) { S.loop.mirrorQ = DATA.questions.find(q => q.id === mid); S.loop.step = 'mirror'; S.loop.mirrorAns = null; render(); }
function loopMirrorPick(k) { if (S.loop.mirrorDone) return; S.loop.mirrorAns = k; render(); }
function loopMirrorValidate(originQid, sub) {
  const L = S.loop;
  const ok = L.mirrorAns === L.mirrorQ.correct;
  recordMirror(originQid, L.mirrorQ.id, ok, sub);
  scheduleRecall(originQid, sub, !ok);
  L.mirrorDone = true; render();
}
function markRemed(subId) {
  const s = st(); s.remediations[subId] = { status: 'faite', ts: nowTs() }; storeSave();
  toast('Remédiation enregistrée');
}
