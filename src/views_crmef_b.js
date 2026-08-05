/* =========================================================================
   NAJAH.ma — Parcours CRMEF (2/2)
   Apprentissage · entraînement · carnet d'erreurs · simulations · rapport
   ========================================================================= */

/* =========================================================================
   APPRENDRE UN SOUS-DOMAINE — #/app/parcours/crmef/apprendre/:id
   ========================================================================= */
route('/app/parcours/crmef/apprendre/:id', r => {
  const subId = r.parts[4];
  const sub = SUB(subId);
  if (!sub) return notFound();
  const qs = subQuestions(subId);
  const m = masteryOfSub(subId);
  const s = st();

  if (S.loopQid && qs.some(q => q.id === S.loopQid)) {
    return loopScreen({
      mode: 'apprentissage', session: 'apprendre-' + subId,
      qid: S.loopQid, title: 'Apprendre — ' + sub.name,
      onNext: `S.loopQid=null;S.loop=null;render()`,
      onQuit: `S.loopQid=null;S.loop=null;navigate('#/app/parcours/crmef')`
    });
  }

  const done = s.attempts.filter(a => a.sub === subId).map(a => a.qid);
  return shellApp(`
    ${pagehead(sub.name, `${sub.epName} · ${sub.domName} · ${sub.weight} % de l'épreuve`)}
    <div class="grid" style="grid-template-columns:1.5fr 1fr;gap:20px">
      <div>
        <div class="zone">
          <div class="zhead"><span class="zic">${icon('layers', 17)}</span>
            <div><b>Questions disponibles</b><span>${qs.length} question(s) rattachée(s) à ce sous-domaine officiel</span></div></div>
          ${qs.length ? `<div class="col" style="gap:9px">
            ${qs.map(q => `<div class="card card-pad-sm row-between">
              <div style="flex:1;min-width:0">
                <div class="row row-wrap" style="gap:6px;margin-bottom:5px">${editBadge(q)}${badge(q.cog)}${diffDots(q.diff)}
                  ${done.includes(q.id) ? badge('Déjà traitée', 'good') : ''}</div>
                <div class="small">${esc(q.stem.slice(0, 96))}${q.stem.length > 96 ? '…' : ''}</div>
              </div>
              <button class="btn btn-sm btn-primary" onclick="S.loopQid='${q.id}';S.loop=null;render()">${done.includes(q.id) ? 'Refaire' : 'Traiter'}</button>
            </div>`).join('')}</div>`
          : `<div class="empty"><div class="e-ico">${icon('file', 30)}</div>
              <p class="small">Aucune question n'est encore rattachée à ce sous-domaine officiel.</p>
              <p class="xsmall muted">Il apparaîtra comme « non évalué » tant qu'un expert n'aura pas produit et validé son contenu.</p></div>`}
        </div>
      </div>
      <div>
        <div class="card">
          <h3 style="font-size:.95rem">État de maîtrise</h3>
          <div class="mt16">${masteryPill(m.state)}</div>
          <table class="table mt16">
            <tr><td class="muted small">Réponses</td><td class="num strong">${m.seen || 0}</td></tr>
            <tr><td class="muted small">Justes</td><td class="num strong">${m.correct || 0}</td></tr>
            <tr><td class="muted small">Poids de preuve</td><td class="num strong">${m.evidence || 0}</td></tr>
            <tr><td class="muted small">Réussites espacées</td><td class="num strong">${m.spaced || 0}</td></tr>
            <tr><td class="muted small">Miroir réussi</td><td class="num strong">${m.mirrorOk || 0}</td></tr>
            <tr><td class="muted small">Erreurs sûres</td><td class="num strong" style="color:${m.sureWrong ? 'var(--critical)' : 'inherit'}">${m.sureWrong || 0}</td></tr>
          </table>
          <p class="xsmall muted mt16">« Consolidée » exige au moins deux réussites espacées d'un jour et une question miroir réussie. Une bonne réponse isolée ne suffit jamais.</p>
        </div>
        ${s.remediations[subId] ? `<div class="card card-flat mt16"><b class="small">${icon('check', 15)} Remédiation effectuée</b>
          <div class="xsmall muted">${new Date(s.remediations[subId].ts).toLocaleDateString('fr-FR')}</div></div>` : ''}
      </div>
    </div>`, 'parcours');
});

/* =========================================================================
   ENTRAÎNEMENT — #/app/parcours/crmef/entrainement
   ========================================================================= */
function trainPool(mode, arg) {
  const s = st();
  switch (mode) {
    case 'rappels': return dueRecalls().map(r => recallQuestion(r)).filter(Boolean);
    case 'erreurs': return Object.keys(s.errors).map(id => DATA.questions.find(q => q.id === id)).filter(Boolean);
    case 'fragiles': {
      const weak = ALL_SUBS().filter(x => ['fragile', 'en_cours'].includes(masteryOfSub(x.id).state)).map(x => x.id);
      return DATA.questions.filter(q => weak.includes(q.sub));
    }
    case 'ep': return epQuestions(arg);
    case 'dom': return DATA.questions.filter(q => q.sub && SUB(q.sub) && SUB(q.sub).dom === arg);
    case 'sub': return subQuestions(arg);
    default: return DATA.crmef.epreuves.flatMap(e => epQuestions(e.id));
  }
}

route('/app/parcours/crmef/entrainement', r => {
  const s = st();
  const mode = r.q.get('mode') || (r.q.get('ep') ? 'ep' : 'mixte');
  const arg = r.q.get('ep') || r.q.get('dom') || r.q.get('sub');
  const pool = trainPool(mode, arg);

  if (S.loopQid) {
    return loopScreen({
      mode: 'entrainement', session: 'train-' + mode,
      qid: S.loopQid, title: 'Entraînement',
      onNext: `trainNext(${JSON.stringify(pool.map(q => q.id))})`,
      onQuit: `S.loopQid=null;S.loop=null;navigate('#/app/parcours/crmef/entrainement')`
    });
  }

  const due = dueRecalls();
  const modes = [
    ['mixte', 'Série mixte', 'Toutes épreuves confondues', trainPool('mixte').length],
    ['rappels', 'Rappels à échéance', 'Questions dont la vérification différée est due', due.length],
    ['erreurs', "Carnet d'erreurs", 'Uniquement ce que vous avez raté', Object.keys(s.errors).length],
    ['fragiles', 'Compétences fragiles', "Sous-domaines fragiles ou en cours d'acquisition", trainPool('fragiles').length]
  ];

  return shellApp(`
    ${pagehead('Entraînement', "Chaque activité indique son épreuve, son domaine officiel, son niveau cognitif, sa source et son statut éditorial.")}
    <div class="grid g2" style="margin-bottom:22px">
      ${modes.map(([k, t, d, n]) => `<div class="card ${mode === k ? '' : 'card-flat'}" style="${mode === k ? 'border-color:var(--brand-600)' : ''}">
        <div class="row-between"><b class="small">${t}</b><b class="mono">${n}</b></div>
        <div class="xsmall muted" style="margin-top:4px">${d}</div>
        <button class="btn btn-sm ${mode === k ? 'btn-primary' : 'btn-ghost'} mt16" ${n ? '' : 'disabled'}
          onclick="navigate('#/app/parcours/crmef/entrainement?mode=${k}')">${n ? 'Choisir' : 'Rien à traiter'}</button>
      </div>`).join('')}
    </div>

    <h3 style="font-size:1rem;margin-bottom:10px">Par épreuve et par domaine officiel</h3>
    <div class="col" style="gap:12px;margin-bottom:22px">
      ${DATA.crmef.epreuves.map(e => `<div class="zone">
        <div class="zhead"><span class="zic" style="background:var(--series-${e.serie});color:#fff">${e.coef}</span>
          <div><b>${esc(e.name)}</b><span>${epQuestions(e.id).length} question(s) disponibles</span></div>
          <span class="spacer" style="flex:1"></span>
          <a class="btn btn-sm btn-ghost" href="#/app/parcours/crmef/entrainement?ep=${e.id}">Toute l'épreuve</a></div>
        <div class="row row-wrap" style="gap:7px">
          ${e.domains.flatMap(d => d.sub).map(sb => {
            const n = subQuestions(sb.id).length;
            return `<a class="chip ${n ? '' : 'muted'}" ${n ? `href="#/app/parcours/crmef/entrainement?mode=sub&sub=${sb.id}"` : 'style="opacity:.45;pointer-events:none"'}>
              ${esc(sb.name)} <span style="opacity:.7;margin-inline-start:5px">${n}</span></a>`;
          }).join('')}
        </div>
      </div>`).join('')}
    </div>

    ${pool.length ? `<div class="card">
      <div class="row-between"><div><b>Série prête — ${pool.length} question(s)</b>
        <div class="xsmall muted">Mode : ${esc(mode)}${arg ? ' · ' + esc(arg) : ''}</div></div>
        <button class="btn btn-primary" onclick="S.loopQid='${pool[0].id}';S.loop=null;render()">${icon('play', 17)} Démarrer</button></div>
    </div>` : `<div class="empty"><div class="e-ico">${icon('check', 30)}</div><p class="small">Rien à traiter dans ce mode pour l'instant.</p></div>`}`, 'parcours');
});

function trainNext(ids) {
  const cur = ids.indexOf(S.loopQid);
  const nxt = ids[cur + 1];
  S.loop = null;
  if (nxt) { S.loopQid = nxt; render(); }
  else { S.loopQid = null; toast('Série terminée'); navigate('#/app/parcours/crmef'); }
}

/* =========================================================================
   CARNET D'ERREURS — #/app/parcours/crmef/erreurs
   ========================================================================= */
route('/app/parcours/crmef/erreurs', r => {
  const f = { ep: r.q.get('ep') || null, remed: r.q.get('remed') || null, due: r.q.get('due') === '1' };
  const list = errorList(f).sort((a, b) => b.ts - a.ts);
  const dueIds = dueRecalls().map(x => x.qid);
  const s = st();

  return shellApp(`
    ${pagehead("Carnet d'erreurs", "Chaque entrée conserve votre réponse, la réponse attendue, la confusion probable, la source, la remédiation et l'état du rappel différé.")}
    <div class="row row-wrap" style="gap:8px;margin-bottom:18px">
      <a class="chip ${!f.ep && !f.due ? 'on' : ''}" href="#/app/parcours/crmef/erreurs">Toutes (${Object.keys(s.errors).length})</a>
      ${DATA.crmef.epreuves.map(e => `<a class="chip ${f.ep === e.id ? 'on' : ''}" href="#/app/parcours/crmef/erreurs?ep=${e.id}">${esc(e.name)} (${errorList({ ep: e.id }).length})</a>`).join('')}
      <a class="chip ${f.due ? 'on' : ''}" href="#/app/parcours/crmef/erreurs?due=1">Rappel à effectuer (${dueIds.length})</a>
    </div>

    ${list.length ? `<div class="col" style="gap:14px">${list.map(e => {
      const q = DATA.questions.find(x => x.id === e.qid);
      const sub = e.sub ? SUB(e.sub) : null;
      const rec = s.recalls.find(x => x.qid === e.qid);
      const isDue = dueIds.includes(e.qid);
      return `<div class="card">
        <div class="row-between" style="margin-bottom:10px">
          <div class="row row-wrap" style="gap:6px">
            ${sub ? badge(sub.epName, 'brand') : badge('Hors descriptif', 'terra')}
            ${sub ? badge(sub.name) : ''}
            ${badge(readCertitude(false, e.certitude).label, e.lecture === 'fausse_croyance' ? 'crit' : 'warn')}
          </div>
          <span class="xsmall muted">${new Date(e.ts).toLocaleDateString('fr-FR')}${e.count > 1 ? ` · ${e.count} fois` : ''}</span>
        </div>
        <div class="small strong" style="margin-bottom:10px">${esc(q ? q.stem : e.qid)}</div>
        <div class="grid g2" style="gap:10px">
          <div class="card card-flat card-pad-sm"><div class="xsmall muted">Votre réponse</div>
            <b class="small" style="color:var(--critical)">${e.answer} — ${esc(q ? (q.choices.find(c => c.k === e.answer) || {}).t || '' : '')}</b></div>
          <div class="card card-flat card-pad-sm"><div class="xsmall muted">Réponse attendue</div>
            <b class="small" style="color:var(--good-ink)">${e.expected} — ${esc(q ? (q.choices.find(c => c.k === e.expected) || {}).t || '' : '')}</b></div>
        </div>
        ${e.confusion ? `<div class="rat-trap" style="margin-top:12px"><span>${icon('bulb', 16)}</span>
          <div><b>Confusion probable.</b> ${md(e.confusion)}</div></div>` : ''}
        <div class="row row-wrap mt16" style="gap:8px 18px">
          <span class="xsmall"><b>Remédiation :</b> ${esc(e.remediation)}</span>
          <span class="xsmall"><b>Miroir :</b> ${esc(e.mirror || 'non tentée')}</span>
          <span class="xsmall"><b>Rappel :</b> ${isDue ? '<b style="color:var(--sem-remedy)">à effectuer</b>' : rec ? 'prévu le ' + new Date(rec.due).toLocaleDateString('fr-FR') : '—'}</span>
        </div>
        <div class="row row-wrap mt16" style="gap:8px">
          <button class="btn btn-sm btn-primary" onclick="S.loopQid='${e.qid}';S.loop=null;navigate('#/app/parcours/crmef/entrainement?mode=erreurs')">Retravailler</button>
          ${sub ? `<a class="btn btn-sm btn-ghost" href="#/app/parcours/crmef/apprendre/${sub.id}">Voir le sous-domaine</a>` : ''}
        </div>
      </div>`;
    }).join('')}</div>`
    : `<div class="empty"><div class="e-ico">${icon('bookmark', 32)}</div><h3>Carnet vide</h3>
        <p class="small">Les questions ratées y sont ajoutées automatiquement, avec la confusion probable et le rappel différé.</p></div>`}`, 'parcours');
});

/* =========================================================================
   SIMULATIONS — #/app/parcours/crmef/simulations
   ========================================================================= */
route('/app/parcours/crmef/simulations', () => {
  const s = st();
  return shellApp(`
    ${pagehead('Simulations par épreuve', "Trois familles distinctes. Les trois épreuves ne sont jamais mélangées dans une même simulation.")}
    <div class="disclaimer" style="margin-bottom:22px"><span>${icon('flag', 17)}</span><div>
      <b>Ce ne sont pas des reproductions officielles.</b> Le descriptif ne communique ni le nombre de questions, ni le barème, ni les règles de navigation, ni le seuil d'admission. Seuls la durée, le coefficient, la langue et les poids des domaines sont officiels et repris ici.</div></div>
    <div class="col" style="gap:16px">
      ${DATA.crmef.epreuves.map(e => {
        const c = epCoverage(e.id);
        const past = s.sims[e.id];
        const partial = c.weightPct < 100;
        return `<div class="card">
          <div class="row-between" style="margin-bottom:12px">
            <div class="row" style="gap:11px"><span style="width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:var(--series-${e.serie});color:#fff;font-weight:800">${e.coef}</span>
              <div><h3 style="font-size:1.02rem">Simulation — ${esc(e.name)}</h3>
                <div class="xsmall muted">Coefficient ${e.coef} · ${e.minutes / 60} h · ${esc(e.format)} · ${esc(e.langue)}</div></div></div>
            ${partial ? badge('Couverture partielle', 'warn') : badge('Couverture complète', 'good')}
          </div>
          <div class="grid g4" style="gap:10px;margin-bottom:14px">
            <div class="stat card-pad-sm"><div class="k">Durée officielle</div><div class="v mono" style="font-size:1.25rem">${e.minutes / 60} h</div></div>
            <div class="stat card-pad-sm"><div class="k">Coefficient</div><div class="v mono" style="font-size:1.25rem">${e.coef}</div></div>
            <div class="stat card-pad-sm"><div class="k">Questions disponibles</div><div class="v mono" style="font-size:1.25rem">${c.questions}</div></div>
            <div class="stat card-pad-sm"><div class="k">Nombre officiel</div><div class="v" style="font-size:.82rem;line-height:1.3;padding-top:8px;color:var(--ink-3)">${NCLABEL}</div></div>
          </div>
          ${partial ? `<div class="card card-flat card-pad-sm" style="border-inline-start:3px solid var(--warn)">
            <b class="xsmall">Simulation d'entraînement — couverture partielle du programme officiel</b>
            <div class="xsmall muted" style="margin-top:4px">${c.covered} sous-domaines sur ${c.subs} disposent de contenu, soit ${c.weightPct} % du poids officiel. Les domaines absents ne seront pas évalués.</div></div>` : ''}
          <div class="mt16">${coverageBar(c)}</div>
          <div class="row row-wrap mt16" style="gap:8px">
            <button class="btn btn-primary" ${c.questions ? '' : 'disabled'} onclick="startSim('${e.id}')">${icon('timer', 17)} ${past && past.submitted ? 'Repasser' : 'Démarrer'}</button>
            ${past && past.submitted ? `<a class="btn btn-ghost" href="#/app/parcours/crmef/rapport/${e.id}">Voir le rapport</a>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`, 'parcours');
});

/* ---------------- Passation d'une simulation ---------------- */
function startSim(epId) {
  const s = st();
  const ids = epQuestions(epId).map(q => q.id);
  const e = EP(epId);
  s.sims[epId] = { key: 'sim-' + epId + '-' + nowTs(), ids, i: 0, answers: {}, certitudes: {},
    left: e.minutes * 60, started: nowTs(), submitted: false };
  storeSave(); S.simRun = epId; startSimTimer(); navigate('#/app/parcours/crmef/simulation/' + epId);
}
let SIM_TIMER = null;
function startSimTimer() {
  clearInterval(SIM_TIMER);
  SIM_TIMER = setInterval(() => {
    const s = st(); const sim = S.simRun && s.sims[S.simRun];
    if (!sim || sim.submitted) { clearInterval(SIM_TIMER); return; }
    sim.left--;
    const el = document.getElementById('simtimer');
    if (el) { const t = el.querySelector('.tv'); if (t) t.textContent = mmss(sim.left); el.className = 'timer' + (sim.left < 300 ? ' low' : ''); }
    if (sim.left % 10 === 0) storeSave();
    if (sim.left <= 0) { clearInterval(SIM_TIMER); submitSim(S.simRun, true); }
  }, 1000);
}

route('/app/parcours/crmef/simulation/:ep', r => {
  const epId = r.parts[4];
  const e = EP(epId);
  if (!e) return notFound();
  const s = st();
  const sim = s.sims[epId];
  if (!sim) { return shellApp(`${pagehead('Simulation')}<div class="empty"><p>Aucune simulation en cours pour cette épreuve.</p>
    <a class="btn btn-primary mt16" href="#/app/parcours/crmef/simulations">Retour aux simulations</a></div>`, 'parcours'); }
  if (sim.submitted) return simReport(epId);
  S.simRun = epId;
  if (!SIM_TIMER) startSimTimer();

  const q = DATA.questions.find(x => x.id === sim.ids[sim.i]);
  const answered = Object.keys(sim.answers).length;
  const c = epCoverage(epId);

  return shellApp(`
    <div class="exambar">
      <button class="btn btn-sm btn-quiet exitfocus" onclick="quitSim()">${icon('arrow', 15, 'ic-flip')} Quitter</button>
      <b class="small">${esc(e.name)}</b>
      <span id="simtimer" class="timer ${sim.left < 300 ? 'low' : ''}">${icon('timer', 16)}<span class="tv">${mmss(sim.left)}</span></span>
      <span class="saveind"><span class="dot"></span>Enregistré</span>
      <span class="spacer" style="flex:1"></span>
      ${c.weightPct < 100 ? badge('Couverture partielle', 'warn') : ''}
      <span class="small muted mono"><bdi>${answered} / ${sim.ids.length}</bdi></span>
      <button class="btn btn-sm btn-primary" onclick="confirmSubmitSim('${epId}')">Soumettre</button>
    </div>
    <div class="grid" style="grid-template-columns:1fr 200px;gap:20px">
      <div>
        ${questionBlock(q, { answer: sim.answers[q.id], onPick: `simPick('${epId}','${q.id}',`, index: sim.i + 1, total: sim.ids.length })}
        <div class="card card-flat card-pad-sm mt16">
          <b class="xsmall">Certitude</b>
          <div class="row row-wrap mt8" style="gap:8px">
            ${CERTITUDES.map(ct => `<button class="btn btn-sm ${sim.certitudes[q.id] === ct.id ? 'btn-primary' : 'btn-ghost'}"
              onclick="simCert('${epId}','${q.id}','${ct.id}')">${ct.label}</button>`).join('')}
          </div>
        </div>
        <div class="row-between mt24">
          <button class="btn btn-ghost" ${sim.i === 0 ? 'disabled' : ''} onclick="simNav('${epId}',-1)">Précédent</button>
          <button class="btn btn-primary" ${sim.i + 1 >= sim.ids.length ? 'disabled' : ''} onclick="simNav('${epId}',1)">Suivant</button>
        </div>
      </div>
      <div><div class="card card-pad-sm" style="position:sticky;top:132px">
        <h3 style="font-size:.86rem;margin-bottom:10px">Navigation</h3>
        <div class="qnav">${sim.ids.map((id, i) => `<button class="${sim.answers[id] ? 'answered' : ''} ${i === sim.i ? 'cur' : ''}"
          onclick="simGo('${epId}',${i})">${i + 1}</button>`).join('')}</div>
        <div class="divider" style="margin:12px 0"></div>
        <div class="xsmall muted">Règles de navigation officielles : ${NCLABEL.toLowerCase()}.</div>
      </div></div>
    </div>`, 'parcours');
});

function simPick(ep, qid, k) { const s = st(); s.sims[ep].answers[qid] = k; storeSave(); render(); }
function simCert(ep, qid, c) { const s = st(); s.sims[ep].certitudes[qid] = c; storeSave(); render(); }
function simNav(ep, d) { const s = st(); s.sims[ep].i = clamp(s.sims[ep].i + d, 0, s.sims[ep].ids.length - 1); storeSave(); render(); }
function simGo(ep, i) { const s = st(); s.sims[ep].i = i; storeSave(); render(); }
function quitSim() { S.simRun = null; clearInterval(SIM_TIMER); SIM_TIMER = null; navigate('#/app/parcours/crmef'); }
function confirmSubmitSim(ep) {
  const s = st(); const sim = s.sims[ep];
  const left = sim.ids.length - Object.keys(sim.answers).length;
  modal(`<h3>Soumettre la simulation ?</h3>
    <p class="small dim">${left ? `<b>${left} question(s) sans réponse</b> — elles seront comptées comme non répondues.` : 'Toutes les questions ont une réponse.'}</p>
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Continuer</button>
    <button class="btn btn-primary" onclick="closeModal();submitSim('${ep}')">Soumettre</button></div>`);
}
function submitSim(ep, auto) {
  const s = st(); const sim = s.sims[ep];
  if (!sim || sim.submitted) return;                 // idempotence : une seule soumission
  clearInterval(SIM_TIMER); SIM_TIMER = null;
  sim.submitted = nowTs();
  sim.duration = Math.round((sim.submitted - sim.started) / 1000);
  // Les réponses de simulation alimentent la progression, sans doublon
  sim.ids.forEach(qid => {
    if (sim.answers[qid] === undefined) return;
    submitAnswer({ qid, answer: sim.answers[qid], certitude: sim.certitudes[qid] || 'hesitant', mode: 'simulation', session: sim.key });
  });
  storeSave(); S.simRun = null;
  if (auto) toast('Temps écoulé — simulation soumise');
  navigate('#/app/parcours/crmef/rapport/' + ep);
}

/* =========================================================================
   RAPPORT — #/app/parcours/crmef/rapport/:tentative
   ========================================================================= */
route('/app/parcours/crmef/rapport/:id', r => simReport(r.parts[4]));

function simReport(epId) {
  const e = EP(epId);
  const s = st();
  const sim = s.sims[epId];
  if (!e || !sim || !sim.submitted) return notFound();
  const c = epCoverage(epId);

  const rows = sim.ids.map(qid => {
    const q = DATA.questions.find(x => x.id === qid);
    const a = sim.answers[qid];
    return { q, a, answered: a !== undefined, correct: a === q.correct, cert: sim.certitudes[qid] || null };
  });
  const right = rows.filter(x => x.correct).length;
  const wrong = rows.filter(x => x.answered && !x.correct).length;
  const none = rows.filter(x => !x.answered).length;

  const byDom = e.domains.map(d => {
    const subIds = d.sub.map(x => x.id);
    const rs = rows.filter(x => subIds.includes(x.q.sub));
    return { d, n: rs.length, ok: rs.filter(x => x.correct).length,
      pct: rs.length ? Math.round(rs.filter(x => x.correct).length / rs.length * 100) : null };
  });
  const evaluated = [...new Set(rows.map(x => x.q.sub))];
  const notCovered = ALL_SUBS().filter(x => x.ep === epId && !evaluated.includes(x.id));
  const weak = ALL_SUBS().filter(x => x.ep === epId && ['fragile', 'en_cours'].includes(masteryOfSub(x.id).state));
  const sureWrong = rows.filter(x => x.answered && !x.correct && x.cert === 'sur');

  return shellApp(`
    ${pagehead(`Rapport — ${e.name}`, `Simulation soumise le ${new Date(sim.submitted).toLocaleDateString('fr-FR')} · durée ${Math.round(sim.duration / 60)} min sur ${e.minutes} min autorisées`)}

    ${c.weightPct < 100 ? `<div class="disclaimer" style="margin-bottom:20px"><span>${icon('flag', 17)}</span><div>
      <b>Simulation d'entraînement — couverture partielle du programme officiel.</b> ${c.covered} sous-domaines sur ${c.subs} disposaient de contenu, soit ${c.weightPct} % du poids officiel. Ce rapport ne mesure pas ce qui n'a pas été évalué.</div></div>` : ''}

    <div class="grid g4" style="margin-bottom:22px">
      <div class="stat"><div class="k">Réponses justes</div><div class="v mono">${right}</div><div class="s">sur ${rows.length} posées</div></div>
      <div class="stat"><div class="k">Incorrectes</div><div class="v mono">${wrong}</div></div>
      <div class="stat"><div class="k">Non répondues</div><div class="v mono">${none}</div></div>
      <div class="stat"><div class="k">Erreurs sûres</div><div class="v mono" style="color:${sureWrong.length ? 'var(--critical)' : 'inherit'}">${sureWrong.length}</div><div class="s">fausses croyances</div></div>
    </div>

    <div class="disclaimer info" style="margin-bottom:22px"><span>${icon('bulb', 17)}</span><div>
      <b>Aucun score sur 20, aucun seuil, aucune probabilité.</b> Le descriptif ne communique ni barème ni seuil d'admission. Ce rapport mesure votre couverture et vos fragilités, pas une note.</div></div>

    <div class="grid g2" style="margin-bottom:22px">
      <div class="viz"><h3>Résultat par domaine officiel</h3><div class="vsub">Poids officiels rappelés</div>
        ${barsChart(byDom.filter(x => x.pct !== null).map(x => ({ label: x.d.name, value: x.pct, color: `var(--series-${e.serie})`, tip: `${x.ok}/${x.n} · poids officiel ${x.d.weight} %` })), { labelW: 200, unit: ' %' })}
        <div class="col mt16" style="gap:5px">${byDom.map(x => `<div class="row-between xsmall">
          <span class="muted">${esc(x.d.name)} — poids ${x.d.weight} %</span>
          <b>${x.pct === null ? 'non évalué' : x.ok + '/' + x.n}</b></div>`).join('')}</div>
      </div>
      <div class="card"><h3 style="font-size:1rem">Couverture de cette simulation</h3>
        <div class="mt16">${coverageBar(c)}</div>
        <div class="divider"></div>
        <b class="small">Sous-domaines évalués</b>
        <div class="row row-wrap mt8" style="gap:6px">${evaluated.map(id => badge(SUB(id) ? SUB(id).name : id, 'good')).join('')}</div>
        ${notCovered.length ? `<b class="small" style="display:block;margin-top:14px">Non couverts par cette simulation</b>
          <div class="row row-wrap mt8" style="gap:6px">${notCovered.map(x => badge(x.name, 'outline')).join('')}</div>` : ''}
      </div>
    </div>

    ${weak.length ? `<h3 style="font-size:1rem;margin-bottom:10px">Fragilités détectées et remédiations</h3>
      <div class="col" style="gap:10px;margin-bottom:22px">${weak.slice(0, 5).map(x => {
        const m = masteryOfSub(x.id);
        return `<div class="reco"><div class="icon">${icon('route', 19)}</div>
          <div style="flex:1"><h4>${esc(x.name)}</h4>
            <p class="small dim" style="margin:0">${masteryLabel(m.state).label} · ${m.correct}/${m.seen} juste(s) · ce sous-domaine pèse ${x.weight} % de l'épreuve.</p>
            <div class="row mt16"><a class="btn btn-sm btn-primary" href="#/app/parcours/crmef/apprendre/${x.id}">Remédier</a></div></div></div>`;
      }).join('')}</div>` : ''}

    <h3 style="font-size:1rem;margin-bottom:10px">Détail question par question</h3>
    <div class="card" style="padding:0;overflow-x:auto"><table class="table">
      <thead><tr><th>#</th><th>Sous-domaine officiel</th><th>Niveau</th><th class="num">Votre réponse</th><th class="num">Attendue</th><th class="num">Certitude</th><th></th></tr></thead>
      <tbody>${rows.map((x, i) => `<tr>
        <td class="mono small">${i + 1}</td>
        <td class="small">${esc(x.q.sub && SUB(x.q.sub) ? SUB(x.q.sub).name : '—')}</td>
        <td class="small muted">${esc(x.q.cog)}</td>
        <td class="num"><span class="badge ${x.correct ? 'badge-good' : x.answered ? 'badge-crit' : 'badge-outline'}">${x.a || '—'}</span></td>
        <td class="num"><span class="badge badge-good">${x.q.correct}</span></td>
        <td class="num small muted">${x.cert ? esc(certOf(x.cert).label) : '—'}</td>
        <td class="num"><button class="btn btn-sm btn-quiet" onclick="showQuestion('${x.q.id}')">Voir</button></td></tr>`).join('')}</tbody>
    </table></div>

    <div class="row row-wrap mt24"><a class="btn btn-primary" href="#/app/parcours/crmef">Retour au parcours</a>
      <a class="btn btn-ghost" href="#/app/parcours/crmef/simulations">Autres simulations</a></div>`, 'parcours');
}
