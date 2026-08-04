/* =========================================================================
   NAJAH.ma — Espace candidat (1/2)
   Bloc question partagé · onboarding · diagnostic · entraînement · carnet
   ========================================================================= */

/* ---------------- Bloc question réutilisable ----------------
   opts : { answer, reveal, limited, onPick, flagged, index, total }
   ------------------------------------------------------------ */
function questionBlock(q, opts) {
  opts = opts || {};
  const ar = isRTL() && DATA.questionsAr[q.id];
  const tr = ar ? DATA.questionsAr[q.id] : null;
  const c = comp(q.comp);
  const pick = opts.onPick || `demoAnswer('${q.id}',`;
  const reveal = opts.reveal;

  const choices = q.choices.map(ch => {
    const label = tr ? tr.choices[ch.k] : ch.t;
    let cls = '', end = '';
    if (reveal) {
      if (ch.k === q.correct) { cls = 'correct'; end = `<span class="tagend">${esc(T('correct'))}</span>`; }
      else if (ch.k === opts.answer) { cls = 'wrong'; end = `<span class="tagend">${esc(T('yourAnswer'))}</span>`; }
      else cls = 'missed';
    } else if (opts.answer === ch.k) cls = 'sel';
    return `<button class="choice ${cls}" ${reveal ? 'disabled' : ''} onclick="${pick}'${ch.k}')">
      <span class="k">${ch.k}</span><span class="t">${esc(label)}</span>${end}</button>`;
  }).join('');

  const meta = `<div class="qmeta">
    ${badge(c.short, 'brand')}
    ${badge(q.cog)}
    ${diffDots(q.diff)}
    <span class="spacer" style="flex:1"></span>
    ${opts.index ? `<span class="xsmall muted mono"><bdi>${opts.index} / ${opts.total}</bdi></span>` : ''}
    ${opts.onFlag ? `<button class="iconbtn" style="width:30px;height:30px" onclick="${opts.onFlag}" title="Marquer pour y revenir">${opts.flagged ? '★' : '☆'}</button>` : ''}
  </div>`;

  let rationale = '';
  if (reveal) {
    if (opts.limited && !isPremium()) {
      rationale = `<div class="rationale">
        <header>◐ ${esc(T('rat_partial'))}</header>
        <div class="body">
          <div class="rat-item"><div class="rat-head"><span class="rat-key ok">${q.correct}</span> ${esc(T('rat_ok'))}</div>
            <p>${esc((tr ? tr.rationales : q.rationales)[q.correct])}</p></div>
          <div class="paywall" style="margin:14px 0 4px;padding:20px">
            <b>Il manque l'essentiel : pourquoi les autres options sont fausses.</b>
            <p class="small dim" style="margin:8px auto 14px;max-width:44ch">C'est là que se joue la différence entre reconnaître une bonne réponse et comprendre son erreur. Le premium débloque la justification de chaque distracteur, le piège fréquent et la source.</p>
            <a class="btn btn-primary btn-sm" href="#/tarifs">Voir les offres</a>
          </div>
        </div></div>`;
    } else {
      const rats = tr ? tr.rationales : q.rationales;
      rationale = `<div class="rationale">
        <header>✓ ${esc(T('rat_header'))}</header>
        <div class="body">
          ${q.choices.map(ch => `<div class="rat-item">
            <div class="rat-head"><span class="rat-key ${ch.k === q.correct ? 'ok' : 'no'}">${ch.k}</span>
              ${esc(ch.k === q.correct ? T('rat_ok') : T('rat_no'))}
              ${ch.k === opts.answer && ch.k !== q.correct ? badge(T('rat_yours'), 'crit') : ''}</div>
            <p>${md(rats[ch.k])}</p></div>`).join('')}
          <div class="rat-trap"><span>⚑</span><div><b>${esc(T('rat_trap'))}</b> ${md(tr ? tr.trap : q.trap)}</div></div>
          <div class="rat-source">
            <span><b>${esc(T('source'))} :</b> <bdi>${esc(q.source.ref)}</bdi></span>
            <span><b>${esc(T('rat_loc'))} :</b> <bdi>${esc(q.source.loc)}</bdi></span>
            <span><b>${esc(T('competency'))} :</b> ${esc(c.name)}</span>
            <span><b>${esc(T('cognitive'))} :</b> ${esc(q.cog)}</span>
            <span><b>${esc(T('rat_version'))} :</b> <bdi>${esc(q.source.date)}</bdi></span>
          </div>
          <div class="row-between mt16">
            <div class="small muted"><bdi>${esc(T('lbl_rate')
              .replace('{p}', Math.round(q.stats.correct * 100))
              .replace('{n}', q.stats.seen.toLocaleString(S.lang === 'ar' ? 'ar-MA' : 'fr-FR')))}</bdi></div>
            <div class="row" style="gap:6px">
              <button class="btn btn-sm btn-quiet" onclick="addToBook('${q.id}')">✦ ${esc(T('act_book'))}</button>
              <button class="btn btn-sm btn-quiet" onclick="reportItem('${q.id}')">⚑ ${esc(T('act_report'))}</button>
            </div>
          </div>
          <details style="margin-top:12px"><summary class="small muted" style="cursor:pointer">${esc(T('act_distrib'))}</summary>
            <div style="margin-top:11px">${distractorBars(q)}</div>
            <p class="xsmall muted" style="margin-top:9px">Un distracteur choisi par moins de 3 % des candidats est considéré comme non discriminant et signalé à l'équipe éditoriale.</p>
          </details>
        </div></div>`;
    }
  }

  return `<div class="qcard">
    ${meta}
    <div class="qstem">${q.ctx ? `<span class="ctx">${esc(q.ctx)}</span>` : ''}${esc(tr ? tr.stem : q.stem)}</div>
    <div class="choices">${choices}</div>
    ${rationale}
  </div>`;
}

function addToBook(qid) { toast('Question ajoutée à votre carnet d\'erreurs'); }
function reportItem(qid) {
  modal(`<h3>Signaler un problème</h3>
    <p class="small dim">Question <span class="mono">${esc(qid)}</span>. Le signalement ouvre un ticket éditorial suivi. Aucune information personnelle inutile n'est transmise.</p>
    <div class="field"><label>Nature du problème</label>
      <select class="select"><option>La bonne réponse me semble fausse</option><option>Plusieurs réponses paraissent correctes</option>
      <option>L'énoncé est ambigu</option><option>La justification est incomplète</option><option>Faute de langue</option><option>Autre</option></select></div>
    <div class="field"><label>Précisions</label><textarea class="textarea" style="min-height:90px"></textarea></div>
    <div class="row" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Annuler</button>
    <button class="btn btn-primary" onclick="closeModal();toast('Signalement envoyé — ticket éditorial créé')">Envoyer</button></div>`);
}

/* ---------------- Onboarding ---------------- */
route('/app/onboarding', () => {
  if (!S.onb) S.onb = { step: 0, fam: 'crmef', spec: 'fr-sq', session: 'Session 2027', level: null, hours: 5 };
  const o = S.onb;
  const steps = ['Concours', 'Spécialité', 'Objectif', 'Rythme'];
  const head = `<div class="steps">${steps.map((s, i) => `<div class="s ${i < o.step ? 'done' : ''} ${i === o.step ? 'cur' : ''}"><div class="b"></div><div class="l">${s}</div></div>`).join('')}</div>`;

  let body = '';
  if (o.step === 0) {
    body = `<h2>Quel concours préparez-vous ?</h2>
      <p class="muted small">Le catalogue est distinct de votre compte : changer de concours ne crée pas un nouveau profil.</p>
      <div class="grid g2 mt16">${DATA.families.map(f => `
        <button class="card card-hover" style="text-align:start;cursor:${f.live ? 'pointer' : 'not-allowed'};opacity:${f.live ? 1 : .5};border-color:${o.fam === f.id ? 'var(--brand-600)' : 'var(--line)'}"
          ${f.live ? `onclick="S.onb.fam='${f.id}';render()"` : 'disabled'}>
          <div class="row-between"><span style="font-size:1.3rem">${f.icon}</span>${f.live ? (o.fam === f.id ? badge('Sélectionné', 'brand') : '') : badge('Bientôt', 'outline')}</div>
          <b style="display:block;margin-top:9px">${esc(f.short)}</b>
          <span class="xsmall muted">${esc(f.tagline)}</span></button>`).join('')}</div>`;
  } else if (o.step === 1) {
    const f = DATA.families.find(x => x.id === o.fam);
    body = `<h2>Quelle spécialité ?</h2>
      <p class="muted small">Nous n'ouvrons une spécialité qu'une fois son contenu validé par une double révision.</p>
      <div class="col mt16" style="gap:9px">${f.specialties.map(s => `
        <button class="card card-pad-sm" style="text-align:start;cursor:${s.live ? 'pointer' : 'not-allowed'};opacity:${s.live ? 1 : .5};border-color:${o.spec === s.id ? 'var(--brand-600)' : 'var(--line)'}"
          ${s.live ? `onclick="S.onb.spec='${s.id}';render()"` : 'disabled'}>
          <div class="row-between"><div><b>${esc(s.name)}</b>${s.items ? `<div class="xsmall muted">${s.items} questions publiées</div>` : ''}</div>
          ${s.live ? (o.spec === s.id ? badge('Sélectionné', 'brand') : badge('Ouvert', 'good')) : badge('Bientôt', 'outline')}</div></button>`).join('')}</div>`;
  } else if (o.step === 2) {
    body = `<h2>Votre objectif</h2>
      <p class="muted small">Cela nous sert à calibrer le rythme, pas à prédire votre réussite.</p>
      <div class="field mt16"><label>Session visée</label>
        <select class="select" onchange="S.onb.session=this.value">
          <option>Session 2027 — écrit le 22 novembre 2026</option><option>Session 2028</option></select></div>
      <div class="field"><label>Où estimez-vous en être aujourd'hui ?</label>
        <div class="row" style="flex-wrap:wrap;gap:8px">
          ${['Je débute', 'J\'ai déjà révisé', 'Je repasse le concours'].map(l =>
            `<span class="chip ${o.level === l ? 'on' : ''}" onclick="S.onb.level='${l}';render()">${l}</span>`).join('')}
        </div><div class="hint">Cette déclaration n'influence pas votre score : seul le diagnostic le détermine.</div></div>`;
  } else {
    body = `<h2>Votre rythme</h2>
      <p class="muted small">Vous pourrez le modifier à tout moment. Une routine courte et régulière produit davantage qu'une longue session hebdomadaire.</p>
      <div class="field mt16"><label>Jours d'entraînement par semaine : <b class="mono">${o.hours}</b></label>
        <input type="range" min="1" max="7" value="${o.hours}" style="width:100%" oninput="S.onb.hours=+this.value;this.previousElementSibling.querySelector('b').textContent=this.value"></div>
      <div class="card card-flat mt16">
        <b class="small">Prochaine étape : le diagnostic</b>
        <p class="small dim" style="margin:6px 0 0">Vingt questions couvrant chaque macro-compétence, environ vingt minutes. Il est construit sur un blueprint fixe pour que votre profil reste comparable dans le temps.</p></div>`;
  }

  return shellApp(`<div style="max-width:720px">
    ${head}${body}
    <div class="row-between mt32">
      ${o.step > 0 ? `<button class="btn btn-ghost" onclick="S.onb.step--;render()">${esc(T('prev'))}</button>` : '<span></span>'}
      ${o.step < 3
        ? `<button class="btn btn-primary" onclick="S.onb.step++;render()">${esc(T('next'))}</button>`
        : `<button class="btn btn-primary btn-lg" onclick="startDiag()">Lancer le diagnostic</button>`}
    </div></div>`, 'diag');
});

/* ---------------- Diagnostic ---------------- */
function startDiag() {
  S.diag = { i: 0, answers: {}, ids: DATA.questions.map(q => q.id).slice(0, 12), started: true, done: false };
  navigate('#/app/diagnostic');
}

route('/app/diagnostic', () => {
  const d = S.diag;
  if (!d) return shellApp(`
    ${pagehead('Diagnostic initial', "Le point de départ : identifier précisément où vous en êtes, compétence par compétence.")}
    <div class="grid" style="grid-template-columns:1.5fr 1fr;gap:24px">
      <div class="card">
        <h3>Comment il fonctionne</h3>
        <ul class="small dim mt8">
          <li><b>Blueprint fixe</b> — les mêmes macro-compétences pour tous, afin que votre profil reste comparable d'une session à l'autre</li>
          <li><b>Sans chronomètre contraignant</b> — le temps par question est mesuré mais ne pénalise pas</li>
          <li><b>Aucune probabilité de réussite</b> — nous mesurons votre maîtrise actuelle, nous ne prédisons pas votre résultat au concours</li>
        </ul>
        <div class="row mt16"><button class="btn btn-primary" onclick="startDiag()">Commencer le diagnostic</button>
        <span class="small muted" style="align-self:center">12 questions · ~15 min</span></div>
      </div>
      <div class="card card-flat">
        <h3 style="font-size:.95rem">Vous l'avez déjà passé</h3>
        <p class="small dim">Dernier diagnostic : 18 juin 2026</p>
        <a class="btn btn-ghost btn-sm btn-block" href="#/app/progression">Voir mon profil actuel</a>
        <p class="xsmall muted" style="margin-top:12px">Repasser le diagnostic remplace le profil initial mais conserve tout l'historique de vos réponses.</p>
      </div>
    </div>`, 'diag');

  if (d.done) return diagResult();

  const q = DATA.questions.find(x => x.id === d.ids[d.i]);
  const ans = d.answers[q.id];
  const prog = (d.i / d.ids.length) * 100;
  return shellApp(`
    <div class="row-between" style="margin-bottom:12px">
      <div><b>Diagnostic initial</b><div class="xsmall muted">Question ${d.i + 1} sur ${d.ids.length} · ${esc(comp(q.comp).name)}</div></div>
      <div class="saveind"><span class="dot"></span> ${esc(T('saved'))}</div>
    </div>
    <div class="bar bar-thin" style="margin-bottom:22px"><span style="width:${prog}%"></span></div>
    ${questionBlock(q, { answer: ans, onPick: `diagPick('${q.id}',`, index: d.i + 1, total: d.ids.length })}
    <div class="row-between mt24">
      <button class="btn btn-ghost" ${d.i === 0 ? 'disabled' : ''} onclick="S.diag.i--;render()">${esc(T('prev'))}</button>
      <div class="row">
        <button class="btn btn-quiet" onclick="S.diag.i++;if(S.diag.i>=S.diag.ids.length){S.diag.i=S.diag.ids.length-1;}render()">Passer</button>
        <button class="btn btn-primary" ${ans === undefined ? 'disabled' : ''} onclick="diagNext()">
          ${d.i + 1 === d.ids.length ? 'Terminer le diagnostic' : esc(T('next'))}</button>
      </div>
    </div>
    <p class="xsmall muted center mt16">Les corrections ne sont pas affichées pendant le diagnostic : elles fausseraient la mesure. Vous les retrouverez toutes à la fin.</p>`, 'diag');
});

function diagPick(qid, k) { S.diag.answers[qid] = k; render(); }
function diagNext() {
  if (S.diag.i + 1 >= S.diag.ids.length) { S.diag.done = true; }
  else S.diag.i++;
  render();
}

function diagResult() {
  const d = S.diag;
  const byComp = {};
  d.ids.forEach(id => {
    const q = DATA.questions.find(x => x.id === id);
    const ok = d.answers[id] === q.correct;
    byComp[q.comp] = byComp[q.comp] || { ok: 0, n: 0 };
    byComp[q.comp].n++; if (ok) byComp[q.comp].ok++;
  });
  const rows = Object.entries(byComp).map(([c, v]) => ({
    comp: c, score: Math.round((v.ok / v.n) * 100), evidence: Math.min(4, Math.max(1, Math.round(v.n / 1.5))),
    answers: v.n, trend: 0, updated: "à l'instant"
  })).sort((a, b) => a.score - b.score);
  const total = d.ids.filter(id => d.answers[id] === DATA.questions.find(q => q.id === id).correct).length;
  const weakest = rows[0];
  const pillarAgg = DATA.pillars.map(p => {
    const rs = rows.filter(r => comp(r.comp).pillar === p.id);
    return { label: p.name, short: p.name.split(' ')[0], score: rs.length ? Math.round(rs.reduce((a, b) => a + b.score, 0) / rs.length) : 0, color: `var(--series-${p.serie})` };
  });

  return shellApp(`
    ${pagehead('Votre profil de maîtrise', `Établi sur ${d.ids.length} questions. Ce profil est un point de départ : il se précisera à mesure que vous vous entraînerez.`)}
    <div class="grid g4" style="margin-bottom:24px">
      <div class="stat"><div class="k">Réponses justes</div><div class="v mono">${total}<span style="font-size:1rem;color:var(--ink-3)">/${d.ids.length}</span></div></div>
      <div class="stat"><div class="k">Compétences évaluées</div><div class="v mono">${rows.length}</div></div>
      <div class="stat"><div class="k">Point le plus faible</div><div class="v" style="font-size:1.05rem;line-height:1.4;padding-top:6px">${esc(comp(weakest.comp).short)}</div><div class="s">${weakest.score}/100</div></div>
      <div class="stat"><div class="k">Niveau d'évidence</div><div class="v" style="font-size:1.05rem;line-height:1.4;padding-top:6px">Faible</div><div class="s">12 réponses seulement</div></div>
    </div>

    <div class="disclaimer" style="margin-bottom:24px"><span>ℹ️</span><div>
      <b>Ce que ce profil ne dit pas.</b> Il ne contient aucune probabilité de réussite au concours. Un score calculé sur douze réponses a une marge d'erreur importante, que nous affichons plutôt que de la masquer. Le niveau d'évidence augmentera avec votre entraînement.</div></div>

    <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px">
      <div class="viz"><h3>Vue par pilier</h3><div class="vsub">Moyenne des compétences évaluées dans chaque pilier</div>
        ${radarChart(pillarAgg, { size: 290 })}
        <div class="legend">${DATA.pillars.map(p => `<span><i style="background:var(--series-${p.serie})"></i>${esc(p.name)}</span>`).join('')}</div></div>
      <div class="viz"><h3>Détail par compétence</h3><div class="vsub">Classé du plus fragile au plus solide</div>
        ${barsChart(rows.map(r => ({ label: comp(r.comp).short, value: r.score, color: `var(--series-${pillarOf(r.comp).serie})`, tip: `${r.score}/100 sur ${r.answers} questions` })), { labelW: 150, aria: 'Score par compétence' })}
        <p class="xsmall muted mt16">Étiquettes de valeur affichées directement, la couleur ne portant jamais seule l'information.</p></div>
    </div>

    <h2 style="font-size:1.25rem;margin:32px 0 14px">Votre première recommandation</h2>
    <div class="reco">
      <div class="icon">◎</div>
      <div style="flex:1">
        <h4>Commencer par « ${esc(comp(weakest.comp).name)} »</h4>
        <p class="small dim" style="margin:0">Une série de 10 questions ciblées, puis une question ouverte pour vérifier que vous savez rédiger l'analyse et pas seulement la reconnaître.</p>
        <div class="why"><b>${esc(T('why'))}</b> Vous avez obtenu ${weakest.score}/100 sur cette compétence, votre score le plus bas. Elle représente par ailleurs une part importante du blueprint de l'épreuve écrite. C'est donc le point où un effort produit le gain le plus élevé. <span class="muted">Règle appliquée : priorité au couple score faible × poids élevé.</span></div>
        <div class="row mt16"><a class="btn btn-primary btn-sm" href="#/app/entrainement">Lancer la série ciblée</a>
        <a class="btn btn-ghost btn-sm" href="#/app/coach">En parler au coach</a></div>
      </div>
    </div>

    <h2 style="font-size:1.25rem;margin:32px 0 14px">Revoir vos réponses</h2>
    <div class="col" style="gap:12px">
      ${d.ids.map(id => {
        const q = DATA.questions.find(x => x.id === id);
        const ok = d.answers[id] === q.correct;
        return `<details class="card card-pad-sm">
          <summary style="cursor:pointer;display:flex;gap:10px;align-items:center">
            <span class="rat-key ${ok ? 'ok' : 'no'}" style="background:${ok ? 'var(--good)' : 'var(--critical)'};color:#fff">${ok ? '✓' : '✕'}</span>
            <span style="flex:1;font-size:.9rem;font-weight:600">${esc(q.stem.slice(0, 84))}…</span>
            ${badge(comp(q.comp).short)}</summary>
          <div style="margin-top:14px">${questionBlock(q, { answer: d.answers[id], reveal: true, limited: true })}</div>
        </details>`;
      }).join('')}
    </div>`, 'diag');
}

/* ---------------- Accueil de l'espace ---------------- */
route('/app', () => {
  const p = DATA.profile;
  const weak = p.mastery.slice().sort((a, b) => a.score - b.score).slice(0, 3);
  const j = daysUntil(p.targetDate);
  return shellApp(`
    ${pagehead(`Bonjour ${p.name.split(' ')[0]}`, `Écrit du CRMEF dans **${j} jours**. Votre série est de **${p.streak} jours**.`,
      `<a class="btn btn-primary" href="#/app/entrainement">Continuer l'entraînement</a>`)}

    <div class="card" style="background:linear-gradient(135deg,var(--brand-800),var(--brand-600));color:#fff;border:0;margin-bottom:24px">
      <div class="row-between">
        <div>
          <div class="xsmall" style="opacity:.82;text-transform:uppercase;letter-spacing:.1em;font-weight:700">Votre routine du jour</div>
          <h3 style="color:#fff;font-size:1.3rem;margin:6px 0 4px">25 minutes — Obstacles d'apprentissage</h3>
          <p class="small" style="opacity:.9;margin:0;max-width:52ch">8 questions ciblées, 2 fiches du carnet d'erreurs, 1 question ouverte. Le coach a construit cette séance à partir de votre baisse de 6 points sur DI2.</p>
        </div>
        <a class="btn btn-lg" style="background:#fff;color:var(--brand-800);flex:none" href="#/app/entrainement">Démarrer</a>
      </div>
    </div>

    <div class="grid g4" style="margin-bottom:24px">
      <div class="stat"><div class="k">Maîtrise globale</div><div class="v mono">61</div><div class="s"><span class="delta-up">▲ 4</span> sur 14 jours</div></div>
      <div class="stat"><div class="k">Questions traitées</div><div class="v mono">438</div><div class="s">dont 122 cette semaine</div></div>
      <div class="stat"><div class="k">Précision</div><div class="v mono">67 %</div><div class="s"><span class="delta-up">▲ 3 pts</span></div></div>
      <div class="stat"><div class="k">Carnet d'erreurs</div><div class="v mono">${p.errorBook.filter(e => !e.mastered).length}</div><div class="s">fiches à revoir</div></div>
    </div>

    <div class="grid" style="grid-template-columns:1.5fr 1fr;gap:20px">
      <div>
        <div class="viz"><h3>Progression par pilier</h3><div class="vsub">Score de maîtrise sur les 8 dernières semaines</div>
          ${lineChart(p.history, [
            { key: 'SE', label: "Sciences de l'éducation", color: 'var(--series-1)' },
            { key: 'DI', label: 'Didactique', color: 'var(--series-2)' },
            { key: 'SP', label: 'Spécialité', color: 'var(--series-3)' }
          ])}
          <div class="legend">
            <span><i style="background:var(--series-1)"></i>Sciences de l'éducation</span>
            <span><i style="background:var(--series-2)"></i>Didactique</span>
            <span><i style="background:var(--series-3)"></i>Spécialité</span></div>
        </div>

        <h2 style="font-size:1.1rem;margin:26px 0 12px">À travailler en priorité</h2>
        <div class="card">${weak.map(masteryRow).join('')}</div>
      </div>

      <div>
        <div class="card">
          <h3 style="font-size:.98rem">Recommandations</h3>
          <div class="col mt16" style="gap:12px">
            ${[
              ['✎', 'Série ciblée sur DI2', 'Votre score y a baissé de 6 points en deux semaines.', '#/app/entrainement'],
              ['✦', 'Revoir 3 fiches du carnet', 'Dont l\'accord du participe passé, revue une seule fois.', '#/app/carnet'],
              ['⏱', 'Examen blanc n°2', 'Le dernier date de 10 jours. Un point de mesure est utile.', '#/app/simulateur']
            ].map(([i, t, d, h]) => `<a class="card card-pad-sm card-link card-hover" href="${h}" style="display:flex;gap:11px;align-items:flex-start">
              <span style="width:30px;height:30px;border-radius:9px;background:var(--brand-100);display:grid;place-items:center;flex:none">${i}</span>
              <span><b class="small" style="display:block">${t}</b><span class="xsmall muted">${d}</span></span></a>`).join('')}
          </div>
        </div>
        <div class="card mt16">
          <h3 style="font-size:.98rem">Régularité</h3>
          <div class="vsub small muted" style="margin-bottom:12px">4 dernières semaines</div>
          ${activityChart(p.activity)}
          <div class="row mt16 xsmall muted" style="gap:6px;align-items:center">Moins
            ${[0, 1, 2, 3, 4].map(v => `<i style="width:11px;height:11px;border-radius:3px;display:inline-block;background:${v === 0 ? 'var(--surface-3)' : v === 1 ? 'var(--brand-100)' : v === 2 ? 'var(--brand-300)' : v === 3 ? 'var(--brand-600)' : 'var(--brand-800)'}"></i>`).join('')} Plus</div>
        </div>
      </div>
    </div>`, 'home');
});

/* ---------------- Configurateur de série ---------------- */
route('/app/entrainement', () => {
  if (S.serie && !S.serie.finished) return serieRun();
  if (S.serie && S.serie.finished) return serieReport();

  const cfg = S.serieCfg = S.serieCfg || { mode: 'reco', comps: ['DI2'], size: 8, timer: false, diff: 'all' };
  return shellApp(`
    ${pagehead('Entraînement ciblé', "Configurez la série, ou laissez la recommandation la construire à partir de vos données.")}
    <div class="grid" style="grid-template-columns:1.5fr 1fr;gap:22px">
      <div>
        <div class="card">
          <h3 style="font-size:1rem;margin-bottom:12px">Mode de sélection</h3>
          <div class="col" style="gap:9px">
            ${[
              ['reco', 'Série recommandée', 'Construite par les règles explicables : 40 % compétences faibles, 25 % erreurs récentes, 20 % révision espacée, 15 % exploration.'],
              ['comp', 'Par compétence', 'Vous choisissez les compétences à travailler.'],
              ['errors', 'Mes erreurs passées', 'Uniquement des questions déjà ratées, avec une variante différente lorsqu\'elle existe.'],
              ['exam', 'Format examen', 'Répartition identique au blueprint de l\'épreuve écrite.']
            ].map(([k, t, d]) => `<button class="card card-pad-sm" style="text-align:start;border-color:${cfg.mode === k ? 'var(--brand-600)' : 'var(--line)'};background:${cfg.mode === k ? 'var(--brand-50)' : 'var(--surface-2)'}"
              onclick="S.serieCfg.mode='${k}';render()">
              <div class="row-between"><b class="small">${t}</b>${cfg.mode === k ? badge('Choisi', 'brand') : ''}</div>
              <div class="xsmall muted" style="margin-top:4px">${d}</div></button>`).join('')}
          </div>

          ${cfg.mode === 'comp' ? `<div style="margin-top:18px">
            <h3 style="font-size:.92rem;margin-bottom:9px">Compétences</h3>
            <div class="row" style="flex-wrap:wrap;gap:7px">
              ${DATA.competencies.map(c => `<span class="chip ${cfg.comps.includes(c.id) ? 'on' : ''}" onclick="toggleComp('${c.id}')">${esc(c.short)}
                <span style="opacity:.7;font-size:.78em">${masteryOf(c.id).score}</span></span>`).join('')}
            </div></div>` : ''}

          <div class="divider"></div>
          <div class="grid g2">
            <div class="field"><label>Nombre de questions</label>
              <div class="row" style="gap:7px">${[5, 8, 12, 20, 30].map(n => `<span class="chip ${cfg.size === n ? 'on' : ''}" onclick="S.serieCfg.size=${n};render()">${n}</span>`).join('')}</div></div>
            <div class="field"><label>Difficulté</label>
              <div class="row" style="gap:7px">${[['all', 'Toutes'], ['prog', 'Progressive'], ['hard', 'Élevée']].map(([k, l]) => `<span class="chip ${cfg.diff === k ? 'on' : ''}" onclick="S.serieCfg.diff='${k}';render()">${l}</span>`).join('')}</div></div>
          </div>
          <label class="switch"><input type="checkbox" ${cfg.timer ? 'checked' : ''} onchange="S.serieCfg.timer=this.checked"><span class="track"></span>
            <span class="small">Chronomètre par question (indicatif, sans pénalité)</span></label>

          <div class="row mt24"><button class="btn btn-primary btn-lg" onclick="startSerie()">Lancer la série</button>
            <span class="small muted" style="align-self:center">≈ ${Math.round(cfg.size * 1.4)} minutes</span></div>
        </div>
      </div>

      <div>
        <div class="card">
          <h3 style="font-size:.98rem">Composition prévue</h3>
          <p class="xsmall muted">Chaque série est journalisée : vous pouvez vérifier a posteriori pourquoi telle question vous a été proposée.</p>
          <div class="col mt16" style="gap:10px">
            ${[['Compétences faibles', 40, 'var(--series-2)'], ['Erreurs récentes', 25, 'var(--series-1)'], ['Révision espacée', 20, 'var(--series-3)'], ['Exploration', 15, 'var(--line-strong)']].map(([l, v, c]) => `
              <div><div class="row-between xsmall"><span>${l}</span><b class="mono">${v} %</b></div>
              <div class="bar bar-thin" style="margin-top:4px"><span style="width:${v}%;background:${c}"></span></div></div>`).join('')}
          </div>
          <div class="divider"></div>
          <div class="xsmall muted">Ces pourcentages sont configurables par l'équipe pédagogique et journalisés à chaque génération. Aucun modèle prédictif n'intervient à ce stade.</div>
        </div>
        ${!isPremium() ? `<div class="quota mt16">⏳ Compte gratuit : ${DATA.profile.quotaUsed} questions sur ${DATA.profile.quotaTotal} utilisées aujourd'hui</div>` : ''}
      </div>
    </div>`, 'train');
});

function toggleComp(id) {
  const c = S.serieCfg.comps;
  const i = c.indexOf(id); i >= 0 ? c.splice(i, 1) : c.push(id);
  render();
}

function startSerie() {
  const cfg = S.serieCfg;
  let pool = DATA.questions.slice();
  if (cfg.mode === 'comp' && cfg.comps.length) pool = pool.filter(q => cfg.comps.includes(q.comp));
  if (cfg.mode === 'errors') pool = pool.filter(q => DATA.profile.errorBook.some(e => e.qid === q.id));
  if (cfg.mode === 'reco') pool = pool.slice().sort((a, b) => masteryOf(a.comp).score - masteryOf(b.comp).score);
  if (cfg.diff === 'hard') pool = pool.filter(q => q.diff >= 3);
  if (cfg.diff === 'prog') pool = pool.slice().sort((a, b) => a.diff - b.diff);
  if (!pool.length) pool = DATA.questions.slice();
  const ids = [];
  for (let i = 0; ids.length < Math.min(cfg.size, 26); i++) ids.push(pool[i % pool.length].id);
  S.serie = { ids: [...new Set(ids)], i: 0, answers: {}, revealed: {}, finished: false, t0: Date.now(), times: {} };
  render();
}

function serieRun() {
  const s = S.serie;
  const q = DATA.questions.find(x => x.id === s.ids[s.i]);
  const ans = s.answers[q.id];
  const rev = s.revealed[q.id];
  const locked = !isPremium() && s.i >= 3;

  if (locked) return shellApp(`
    ${pagehead('Entraînement ciblé')}
    ${paywall('La série ciblée complète')}
    <div class="card card-flat mt24"><b class="small">Où vous en étiez</b>
      <p class="small dim" style="margin:6px 0 0">Vous avez traité 3 questions sur ${s.ids.length}. Le compte gratuit permet de découvrir le format ; le premium ouvre la série entière, les justifications complètes et le carnet d'erreurs.</p></div>`, 'train');

  return shellApp(`
    <div class="exambar">
      <b class="small">${esc(T('lbl_serie'))}</b>
      <span class="badge badge-brand">${esc(comp(q.comp).short)}</span>
      <span class="spacer" style="flex:1"></span>
      <span class="saveind"><span class="dot"></span>${esc(T('saved'))}</span>
      <span class="small mono muted"><bdi>${s.i + 1} / ${s.ids.length}</bdi></span>
      <button class="btn btn-sm btn-quiet" onclick="quitSerie()">${esc(T('lbl_quit'))}</button>
    </div>
    <div class="bar bar-thin" style="margin-bottom:20px"><span style="width:${(s.i / s.ids.length) * 100}%"></span></div>

    ${questionBlock(q, { answer: ans, reveal: rev, onPick: `seriePick('${q.id}',`, index: s.i + 1, total: s.ids.length })}

    <div class="row-between mt24">
      <button class="btn btn-ghost" ${s.i === 0 ? 'disabled' : ''} onclick="S.serie.i--;render()">${esc(T('prev'))}</button>
      <div class="row">
        ${!rev
          ? `<button class="btn btn-primary" ${ans === undefined ? 'disabled' : ''} onclick="S.serie.revealed['${q.id}']=true;render()">${esc(T('validate'))}</button>`
          : `<button class="btn btn-primary" onclick="serieNext()">${s.i + 1 === s.ids.length ? 'Voir le bilan' : esc(T('next'))}</button>`}
      </div>
    </div>`, 'train');
}

function seriePick(qid, k) { if (S.serie.revealed[qid]) return; S.serie.answers[qid] = k; render(); }
function serieNext() { if (S.serie.i + 1 >= S.serie.ids.length) S.serie.finished = true; else S.serie.i++; render(); }
function quitSerie() {
  modal(`<h3>Quitter la série ?</h3><p class="small dim">Votre progression est enregistrée. Vous pourrez la reprendre depuis n'importe quel appareil.</p>
    <div class="row" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Continuer</button>
    <button class="btn btn-primary" onclick="S.serie=null;closeModal();render()">Quitter</button></div>`);
}

function serieReport() {
  const s = S.serie;
  const ok = s.ids.filter(id => s.answers[id] === DATA.questions.find(q => q.id === id).correct);
  const ko = s.ids.filter(id => !ok.includes(id));
  const byComp = {};
  s.ids.forEach(id => {
    const q = DATA.questions.find(x => x.id === id);
    byComp[q.comp] = byComp[q.comp] || { ok: 0, n: 0 };
    byComp[q.comp].n++; if (ok.includes(id)) byComp[q.comp].ok++;
  });
  return shellApp(`
    ${pagehead('Bilan de la série', `${ok.length} bonnes réponses sur ${s.ids.length}.`)}
    <div class="grid g4" style="margin-bottom:24px">
      <div class="stat"><div class="k">Score</div><div class="v mono">${ok.length}/${s.ids.length}</div><div class="s">${Math.round(ok.length / s.ids.length * 100)} % de réussite</div></div>
      <div class="stat"><div class="k">Temps total</div><div class="v mono">${Math.max(1, Math.round((Date.now() - s.t0) / 60000))} min</div><div class="s">≈ ${Math.round((Date.now() - s.t0) / 1000 / s.ids.length)} s par question</div></div>
      <div class="stat"><div class="k">Compétences touchées</div><div class="v mono">${Object.keys(byComp).length}</div></div>
      <div class="stat"><div class="k">À ajouter au carnet</div><div class="v mono">${ko.length}</div><div class="s">questions ratées</div></div>
    </div>

    ${ko.length ? `<div class="reco" style="margin-bottom:24px">
      <div class="icon">→</div><div style="flex:1">
        <h4>Prochaine action recommandée</h4>
        <p class="small dim" style="margin:0">Ajoutez les ${ko.length} questions ratées à votre carnet, puis relisez la justification de l'option que vous aviez choisie — pas seulement celle de la bonne réponse.</p>
        <div class="why"><b>${esc(T('why'))}</b> Sur vos erreurs de cette série, ${Math.max(1, Math.round(ko.length * 0.6))} portent sur des compétences déjà identifiées comme fragiles. Relire la justification de son propre choix est ce qui déplace une représentation erronée ; relire la bonne réponse seule ne le fait pas.</div>
        <div class="row mt16"><button class="btn btn-primary btn-sm" onclick="toast('${ko.length} questions ajoutées au carnet');navigate('#/app/carnet')">Ajouter au carnet</button></div>
      </div></div>` : ''}

    <div class="viz" style="margin-bottom:24px"><h3>Résultat par compétence</h3><div class="vsub">Sur cette série uniquement</div>
      ${barsChart(Object.entries(byComp).map(([c, v]) => ({ label: comp(c).short, value: Math.round(v.ok / v.n * 100), color: `var(--series-${pillarOf(c).serie})`, tip: `${v.ok}/${v.n} questions` })), { labelW: 150 })}</div>

    <h2 style="font-size:1.15rem;margin-bottom:12px">Revoir chaque question</h2>
    <div class="col" style="gap:12px">
      ${s.ids.map(id => {
        const q = DATA.questions.find(x => x.id === id);
        const good = ok.includes(id);
        return `<details class="card card-pad-sm" ${good ? '' : 'open'}>
          <summary style="cursor:pointer;display:flex;gap:10px;align-items:center">
            <span class="rat-key" style="background:${good ? 'var(--good)' : 'var(--critical)'};color:#fff">${good ? '✓' : '✕'}</span>
            <span style="flex:1;font-size:.9rem;font-weight:600">${esc(q.stem.slice(0, 80))}…</span>${badge(comp(q.comp).short)}</summary>
          <div style="margin-top:14px">${questionBlock(q, { answer: s.answers[id], reveal: true })}</div></details>`;
      }).join('')}
    </div>
    <div class="row mt32"><button class="btn btn-primary" onclick="S.serie=null;render()">Nouvelle série</button>
      <a class="btn btn-ghost" href="#/app/progression">Voir ma progression</a></div>`, 'train');
}

/* ---------------- Carnet d'erreurs ---------------- */
route('/app/carnet', () => {
  if (!isPremium()) return shellApp(`${pagehead("Carnet d'erreurs")}${paywall("Le carnet d'erreurs")}`, 'book');
  const f = S.filters.book || 'todo';
  const items = DATA.profile.errorBook.filter(e => f === 'all' || (f === 'todo' ? !e.mastered : e.mastered));
  return shellApp(`
    ${pagehead("Carnet d'erreurs", "Vos questions ratées, avec vos notes personnelles. Retrouvables par compétence et par date.")}
    <div class="row" style="gap:8px;margin-bottom:20px">
      ${[['todo', 'À revoir'], ['done', 'Maîtrisées'], ['all', 'Toutes']].map(([k, l]) =>
        `<span class="chip ${f === k ? 'on' : ''}" onclick="setFilter('book','${k}')">${l}</span>`).join('')}
      <span class="spacer" style="flex:1"></span>
      <button class="btn btn-sm btn-primary" onclick="navigate('#/app/entrainement')">Série sur mes erreurs</button>
    </div>
    ${items.length ? `<div class="col" style="gap:14px">${items.map(e => {
      const q = DATA.questions.find(x => x.id === e.qid);
      return `<div class="card">
        <div class="row-between" style="margin-bottom:11px">
          <div class="row" style="gap:7px">${badge(comp(q.comp).short, 'brand')}${diffDots(q.diff)}
            ${e.mastered ? badge('Maîtrisée', 'good') : badge('À revoir', 'warn')}</div>
          <span class="xsmall muted">Ajoutée ${esc(e.added)}</span>
        </div>
        <div class="small strong" style="margin-bottom:10px">${esc(q.stem)}</div>
        <div class="card card-flat card-pad-sm" style="background:var(--safran-100);border:0">
          <div class="xsmall strong" style="margin-bottom:3px">Votre note</div>
          <div class="small">${esc(e.note)}</div></div>
        <div class="row mt16">
          <button class="btn btn-sm btn-ghost" onclick="showQuestion('${q.id}')">Revoir la correction</button>
          <button class="btn btn-sm btn-quiet" onclick="toast('Statut mis à jour')">${e.mastered ? 'Remettre à revoir' : 'Marquer comme maîtrisée'}</button>
        </div></div>`;
    }).join('')}</div>`
      : `<div class="empty"><div class="e-ico">✦</div><h3>Aucune fiche dans cette vue</h3><p class="small">Les questions ratées y sont ajoutées d'un clic depuis l'écran de correction.</p></div>`}
  `, 'book');
});

function showQuestion(id) {
  const q = DATA.questions.find(x => x.id === id);
  const o = modal(`<div style="max-width:100%">${questionBlock(q, { answer: null, reveal: true })}
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-primary" onclick="closeModal()">Fermer</button></div></div>`);
  o.querySelector('.modal').style.maxWidth = '720px';
  bindViz(o);
}
