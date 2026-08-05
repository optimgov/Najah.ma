/* =========================================================================
   NAJAH.ma — Espace candidat (2/2)
   Simulateur · questions ouvertes · coach · progression · certification
   ========================================================================= */

/* ---------------- Simulateur : liste ---------------- */
route('/app/simulateur', () => {
  if (S.exam && !S.exam.submitted) return examRun();
  if (S.exam && S.exam.submitted) return examReport();
  return shellApp(`
    ${pagehead('Simulateur de concours', "Examens blancs conformes à un blueprint publié : sections, durée, barème et règles de navigation versionnés.")}
    <div class="col" style="gap:14px">
      ${DATA.blueprints.map(b => `<div class="card">
        <div class="row-between" style="margin-bottom:10px">
          <div><h3 style="font-size:1.05rem">${esc(b.name)}</h3>
            <div class="xsmall muted">Blueprint <span class="mono">${esc(b.id)}</span> · ${esc(b.version)}</div></div>
          ${isPremium() ? badge('Disponible', 'good') : badge('Premium', 'brand')}
        </div>
        <div class="grid g4" style="gap:10px;margin:14px 0">
          <div class="stat card-pad-sm"><div class="k">Durée</div><div class="v mono" style="font-size:1.3rem">${b.duration}<span style="font-size:.8rem"> min</span></div></div>
          <div class="stat card-pad-sm"><div class="k">Questions</div><div class="v mono" style="font-size:1.3rem">${b.questionCount}</div></div>
          <div class="stat card-pad-sm"><div class="k">Sections</div><div class="v mono" style="font-size:1.3rem">${b.sections.length}</div></div>
          <div class="stat card-pad-sm"><div class="k">Seuil indicatif</div><div class="v mono" style="font-size:1.3rem">${b.pass}/${b.questionCount > 20 ? 26 : 20}</div></div>
        </div>
        <table class="table">
          <thead><tr><th>Section</th><th>Compétences couvertes</th><th class="num">Questions</th></tr></thead>
          <tbody>${b.sections.map(s => `<tr><td><b class="small">${esc(s.name)}</b></td>
            <td>${s.comps.map(c => badge(comp(c).short)).join(' ')}</td><td class="num strong">${s.count}</td></tr>`).join('')}</tbody>
        </table>
        <div class="card card-flat card-pad-sm mt16">
          <div class="xsmall"><b>Navigation.</b> ${esc(b.navigation)}</div>
          <div class="xsmall" style="margin-top:4px"><b>Barème.</b> ${esc(b.scoring)}</div>
        </div>
        <div class="row mt16">
          ${isPremium()
            ? `<button class="btn btn-primary" onclick="startExam('${b.id}')">Démarrer l'examen blanc</button>`
            : `<a class="btn btn-primary" href="#/tarifs">Débloquer avec Premium</a>`}
          <button class="btn btn-quiet" onclick="toast('Aperçu du blueprint — écran back-office non inclus')">Voir le blueprint complet</button>
        </div>
      </div>`).join('')}
    </div>

    ${DATA.profile.exams.length ? `<h2 style="font-size:1.15rem;margin:32px 0 12px">Vos tentatives</h2>
      <div class="card" style="padding:0"><table class="table">
        <thead><tr><th>Examen</th><th>Date</th><th class="num">Score</th><th class="num">Durée</th><th></th></tr></thead>
        <tbody>${DATA.profile.exams.map(e => `<tr>
          <td><b class="small">${esc(DATA.blueprints.find(b => b.id === e.bp).name)}</b></td>
          <td class="small mono">${esc(e.date)}</td>
          <td class="num"><b>${e.score}</b><span class="muted">/${e.total}</span></td>
          <td class="num mono small">${esc(e.duration)}</td>
          <td class="num"><button class="btn btn-sm btn-quiet" onclick="toast('Rapport archivé — passez un nouvel examen pour voir le rapport complet')">Rapport</button></td>
        </tr>`).join('')}</tbody></table></div>` : ''}
  `, 'sim');
});

/* ---------------- Simulateur : passation ---------------- */
function startExam(bpId) {
  const bp = DATA.blueprints.find(b => b.id === bpId);
  const ids = shuffleSeeded(DATA.questions.map(q => q.id), 42).slice(0, Math.min(bp.questionCount, DATA.questions.length));
  S.exam = { bp: bpId, ids, i: 0, answers: {}, flags: {}, left: bp.duration * 60, submitted: false, t0: Date.now(), saving: false };
  startTimer();
  render();
}

let EXAM_TIMER = null;
function startTimer() {
  clearInterval(EXAM_TIMER);
  EXAM_TIMER = setInterval(() => {
    if (!S.exam || S.exam.submitted) { clearInterval(EXAM_TIMER); return; }
    S.exam.left--;
    const el = document.getElementById('timer');
    if (el) {
      const t = el.querySelector('.tv'); if (t) t.textContent = mmss(S.exam.left);
      el.className = 'timer' + (S.exam.left < 300 ? ' low' : '');
    }
    if (S.exam.left <= 0) { clearInterval(EXAM_TIMER); submitExam(true); }
  }, 1000);
}

function examRun() {
  const e = S.exam, bp = DATA.blueprints.find(b => b.id === e.bp);
  const q = DATA.questions.find(x => x.id === e.ids[e.i]);
  const answered = Object.keys(e.answers).length;
  return shellApp(`
    <div class="exambar">
      <button class="btn btn-sm btn-quiet exitfocus" onclick="confirmQuitExam()">${icon('arrow', 15, 'ic-flip')} Quitter</button>
      <b class="small">${esc(bp.name)}</b>
      <span id="timer" class="timer ${e.left < 300 ? 'low' : ''}">${icon('timer',16)}<span class="tv">${mmss(e.left)}</span></span>
      <span class="saveind ${e.saving ? 'saving' : ''}"><span class="dot"></span>${esc(e.saving ? T('saving') : T('saved'))}</span>
      <span class="spacer" style="flex:1"></span>
      <span class="small muted mono"><bdi>${answered} / ${e.ids.length}</bdi> ${esc(T("lbl_answered"))}</span>
      <button class="btn btn-sm btn-primary" onclick="confirmSubmit()">${esc(T('submit'))}</button>
    </div>

    <div class="grid" style="grid-template-columns:1fr 210px;gap:20px">
      <div>
        ${questionBlock(q, {
          answer: e.answers[q.id], onPick: `examPick('${q.id}',`,
          index: e.i + 1, total: e.ids.length,
          onFlag: `examFlag('${q.id}')`, flagged: e.flags[q.id]
        })}
        <div class="row-between mt24">
          <button class="btn btn-ghost" ${e.i === 0 ? 'disabled' : ''} onclick="S.exam.i--;render()">${esc(T('prev'))}</button>
          <div class="row">
            <button class="btn btn-quiet" onclick="examFlag('${q.id}')">${icon('star', 16)} ${e.flags[q.id] ? 'Marquée' : 'Marquer'}</button>
            <button class="btn btn-primary" ${e.i + 1 >= e.ids.length ? 'disabled' : ''} onclick="S.exam.i++;render()">${esc(T('next'))}</button>
          </div>
        </div>
        <p class="xsmall muted center mt16">Aucune correction n'est affichée pendant l'épreuve. Vos réponses sont enregistrées à chaque clic et survivent à une coupure réseau.</p>
      </div>

      <div>
        <div class="card card-pad-sm" style="position:sticky;top:132px">
          <h3 style="font-size:.88rem;margin-bottom:10px">Navigation</h3>
          <div class="qnav">${e.ids.map((id, i) => `<button class="${e.answers[id] ? 'answered' : ''} ${e.flags[id] ? 'flagged' : ''} ${i === e.i ? 'cur' : ''}"
            onclick="S.exam.i=${i};render()" aria-label="Question ${i + 1}">${i + 1}</button>`).join('')}</div>
          <div class="divider" style="margin:14px 0"></div>
          <div class="col xsmall muted" style="gap:5px">
            <span><i style="display:inline-block;width:11px;height:11px;border-radius:3px;background:var(--brand-100);border:1px solid var(--brand-300);vertical-align:-1px"></i> répondue</span>
            <span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--safran-600);vertical-align:0"></i> marquée</span>
          </div>
        </div>
      </div>
    </div>`, 'sim');
}

function confirmQuitExam() {
  modal(`<h3>Quitter l'épreuve ?</h3>
    <p class="small dim">Le chronomètre continue de tourner. Vos réponses sont conservées et vous pourrez reprendre là où vous vous êtes arrêté.</p>
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Rester</button>
    <button class="btn btn-primary" onclick="closeModal();navigate('#/app')">Quitter</button></div>`);
}

function examPick(qid, k) {
  S.exam.answers[qid] = k; S.exam.saving = true; render();
  setTimeout(() => { if (S.exam) { S.exam.saving = false; const el = document.querySelector('.saveind'); if (el) { el.classList.remove('saving'); el.lastChild.textContent = T('saved'); } } }, 550);
}
function examFlag(qid) { S.exam.flags[qid] = !S.exam.flags[qid]; render(); }

function confirmSubmit() {
  const e = S.exam, left = e.ids.length - Object.keys(e.answers).length;
  modal(`<h3>Soumettre l'examen ?</h3>
    <p class="small dim">Après soumission, l'épreuve est verrouillée et le score calculé. ${left ? `<b>${left} question${left > 1 ? 's' : ''} sans réponse</b> — elles compteront pour zéro.` : 'Toutes les questions ont une réponse.'}</p>
    <div class="card card-flat card-pad-sm"><div class="xsmall"><b>Temps restant :</b> ${mmss(e.left)}</div>
      <div class="xsmall"><b>Questions marquées :</b> ${Object.values(e.flags).filter(Boolean).length}</div></div>
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Continuer l'épreuve</button>
    <button class="btn btn-primary" onclick="closeModal();submitExam()">Soumettre définitivement</button></div>`);
}

function submitExam(auto) {
  clearInterval(EXAM_TIMER);
  S.exam.submitted = true;
  S.exam.duration = Math.round((Date.now() - S.exam.t0) / 1000);
  render();
  if (auto) toast('Temps écoulé — épreuve soumise automatiquement');
}

/* ---------------- Simulateur : rapport ---------------- */
function examReport() {
  const e = S.exam, bp = DATA.blueprints.find(b => b.id === e.bp);
  const ok = e.ids.filter(id => e.answers[id] === DATA.questions.find(q => q.id === id).correct);
  const score = ok.length;
  const bySec = bp.sections.map(s => {
    const ids = e.ids.filter(id => s.comps.includes(DATA.questions.find(q => q.id === id).comp));
    const good = ids.filter(id => ok.includes(id)).length;
    return { name: s.name, n: ids.length, ok: good, pct: ids.length ? Math.round(good / ids.length * 100) : 0 };
  }).filter(s => s.n);
  const byComp = {};
  e.ids.forEach(id => { const q = DATA.questions.find(x => x.id === id); byComp[q.comp] = byComp[q.comp] || { ok: 0, n: 0 }; byComp[q.comp].n++; if (ok.includes(id)) byComp[q.comp].ok++; });
  const weak = Object.entries(byComp).map(([c, v]) => ({ c, pct: Math.round(v.ok / v.n * 100), n: v.n })).sort((a, b) => a.pct - b.pct);

  return shellApp(`
    ${pagehead("Rapport d'examen", `${esc(bp.name)} — soumis le 4 août 2026`)}
    <div class="grid g4" style="margin-bottom:24px">
      <div class="stat"><div class="k">Score</div><div class="v mono">${score}<span style="font-size:1rem;color:var(--ink-3)">/${e.ids.length}</span></div>
        <div class="s">${score >= bp.pass ? `<span class="delta-up">au-dessus du seuil indicatif</span>` : `<span class="delta-down">sous le seuil indicatif (${bp.pass})</span>`}</div></div>
      <div class="stat"><div class="k">Temps utilisé</div><div class="v mono">${Math.floor(e.duration / 60)}<span style="font-size:1rem"> min</span></div><div class="s">sur ${bp.duration} min autorisées</div></div>
      <div class="stat"><div class="k">Sans réponse</div><div class="v mono">${e.ids.length - Object.keys(e.answers).length}</div></div>
      <div class="stat"><div class="k">Marquées</div><div class="v mono">${Object.values(e.flags).filter(Boolean).length}</div><div class="s">à revoir en priorité</div></div>
    </div>

    <div class="disclaimer info" style="margin-bottom:24px"><span>${icon('bulb', 17)}</span><div>
      <b>Ce rapport ne prédit rien.</b> Le seuil indiqué est un repère interne, pas un seuil officiel du concours. Nous n'affichons aucune probabilité de réussite : elle serait mal calibrée tant que nous n'avons pas relié nos résultats à ceux des sessions réelles.</div></div>

    <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
      <div class="viz"><h3>Résultat par section</h3><div class="vsub">Structure définie par le blueprint ${esc(bp.version)}</div>
        ${barsChart(bySec.map((s, i) => ({ label: s.name, value: s.pct, color: `var(--series-${i + 1})`, tip: `${s.ok}/${s.n} questions` })), { labelW: 160, unit: ' %' })}
        <div class="legend">${bySec.map((s, i) => `<span><i style="background:var(--series-${i + 1})"></i>${esc(s.name)} — ${s.ok}/${s.n}</span>`).join('')}</div></div>
      <div class="viz"><h3>Compétences les plus fragiles</h3><div class="vsub">Sur cet examen uniquement</div>
        ${barsChart(weak.slice(0, 6).map(w => ({ label: comp(w.c).short, value: w.pct, color: `var(--series-${pillarOf(w.c).serie})`, tip: `${w.pct} % sur ${w.n} questions` })), { labelW: 150, unit: ' %' })}
        <p class="xsmall muted mt16">Une compétence évaluée sur moins de trois questions est signalée comme peu fiable et n'entraîne pas de recommandation.</p></div>
    </div>

    <h2 style="font-size:1.2rem;margin-bottom:12px">Votre plan de révision</h2>
    <div class="col" style="gap:12px;margin-bottom:28px">
      ${weak.slice(0, 3).map((w, i) => `<div class="reco">
        <div class="icon">${i + 1}</div>
        <div style="flex:1">
          <h4>${esc(comp(w.c).name)}</h4>
          <p class="small dim" style="margin:0">${w.pct} % de réussite sur cet examen. Série ciblée de 10 questions, puis relecture des justifications de vos choix erronés.</p>
          <div class="why"><b>${esc(T('why'))}</b> Cette compétence combine le score le plus bas de votre examen et une présence de ${w.n} question${w.n > 1 ? 's' : ''} dans le blueprint. La règle appliquée classe par score croissant, à poids égal dans l'épreuve.</div>
          <div class="row mt16"><a class="btn btn-sm btn-primary" href="#/app/entrainement">Lancer la série</a></div>
        </div></div>`).join('')}
    </div>

    <h2 style="font-size:1.2rem;margin-bottom:12px">Détail question par question</h2>
    <div class="card" style="padding:0;overflow-x:auto">
      <table class="table">
        <thead><tr><th>#</th><th>Compétence</th><th>Niveau cognitif</th><th class="num">Votre réponse</th><th class="num">Attendue</th><th></th></tr></thead>
        <tbody>${e.ids.map((id, i) => {
          const q = DATA.questions.find(x => x.id === id);
          const good = ok.includes(id);
          const a = e.answers[id];
          return `<tr><td class="mono small">${i + 1}</td>
            <td class="small">${esc(comp(q.comp).short)}</td>
            <td class="small muted">${esc(q.cog)}</td>
            <td class="num"><span class="badge ${good ? 'badge-good' : a ? 'badge-crit' : 'badge-outline'}">${a || '—'}</span></td>
            <td class="num"><span class="badge badge-good">${q.correct}</span></td>
            <td class="num"><button class="btn btn-sm btn-quiet" onclick="showQuestion('${id}')">Voir</button></td></tr>`;
        }).join('')}</tbody>
      </table>
    </div>
    <div class="row mt24"><button class="btn btn-primary" onclick="S.exam=null;render()">Retour aux simulateurs</button>
      <button class="btn btn-ghost" onclick="toast('Export PDF — non inclus dans le prototype')">Exporter en PDF</button></div>`, 'sim');
}

/* ---------------- Questions ouvertes ---------------- */
route('/app/redaction', () => {
  if (!isPremium()) return shellApp(`${pagehead('Questions ouvertes')}${paywall("L'évaluation des questions rédigées")}`, 'open');
  return shellApp(`
    ${pagehead('Questions ouvertes', "Le QCM vérifie la reconnaissance. La rédaction vérifie la production — c'est ce que l'épreuve réelle demande.")}
    <div class="disclaimer info" style="margin-bottom:22px"><span>${icon('bulb', 17)}</span><div>
      <b>Correction automatique.</b> Ces copies sont évaluées par un modèle de langage contraint par une grille de critères, pas par un correcteur humain. L'évaluation est indicative : elle vous situe sur des critères explicites, elle ne remplace pas le jugement d'un jury.</div></div>
    <div class="col" style="gap:14px">
      ${DATA.openQuestions.map(o => `<div class="card">
        <div class="row-between" style="margin-bottom:8px">
          <div class="row" style="gap:7px">${badge(comp(o.comp).short, 'brand')}${diffDots(o.diff)}</div>
          ${o.scored ? badge('Évaluée', 'good') : badge('Non tentée', 'outline')}</div>
        <h3 style="font-size:1.05rem">${esc(o.title)}</h3>
        <p class="small dim" style="margin:8px 0 12px;white-space:pre-line">${esc(o.prompt.split('\n')[0])}</p>
        <div class="row small muted" style="gap:18px;margin-bottom:14px">
          <span>${icon('clock',15)} ${o.minutes} min conseillées</span><span>${icon('pen',15)} ${o.words[0]}–${o.words[1]} mots</span>
          <span>${icon('chart',15)} ${o.rubric.length} critères · ${o.rubric.reduce((a, b) => a + b.max, 0)} points</span></div>
        <div class="row">
          <a class="btn btn-primary btn-sm" href="#/app/redaction/${o.id}">${o.scored ? "Revoir l'évaluation" : 'Composer'}</a>
          <button class="btn btn-quiet btn-sm" onclick="showRubric('${o.id}')">Voir la grille</button></div>
      </div>`).join('')}
    </div>`, 'open');
});

function showRubric(id) {
  const o = DATA.openQuestions.find(x => x.id === id);
  const box = modal(`<h3>Grille d'évaluation</h3>
    <p class="small dim">${esc(o.title)} — ${o.rubric.reduce((a, b) => a + b.max, 0)} points</p>
    <div class="rubric mt16">${o.rubric.map(r => `<div class="r-row">
      <div class="r-top"><b>${esc(r.name)}</b><span class="r-score muted">/ ${r.max}</span></div>
      <div class="r-comment">${esc(r.desc)}</div></div>`).join('')}</div>
    <p class="xsmall muted mt16">La grille est communiquée avant la rédaction. Une évaluation dont les critères restent cachés n'apprend rien au candidat.</p>
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-primary" onclick="closeModal()">Fermer</button></div>`);
  box.querySelector('.modal').style.maxWidth = '560px';
}

route('/app/redaction/:id', r => {
  const o = DATA.openQuestions.find(x => x.id === r.parts[2]);
  if (!o) return notFound();
  const st = S.openAnswer[o.id] || (S.openAnswer[o.id] = { text: o.sample || '', submitted: !!o.scored });

  if (st.submitted && o.scored) return openResult(o);

  return shellApp(`
    <div class="row-between" style="margin-bottom:16px">
      <div><b>${esc(o.title)}</b><div class="xsmall muted">${esc(comp(o.comp).name)} · ${o.minutes} minutes conseillées</div></div>
      <div class="row"><button class="btn btn-sm btn-quiet" onclick="showRubric('${o.id}')">Grille</button>
        <a class="btn btn-sm btn-quiet" href="#/app/redaction">Quitter</a></div>
    </div>
    <div class="card" style="margin-bottom:18px;background:var(--surface-3);border:0">
      <div class="xsmall strong" style="margin-bottom:6px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3)">Sujet</div>
      <div style="white-space:pre-line;font-size:.97rem;line-height:1.7">${esc(o.prompt)}</div>
    </div>
    <div class="grid" style="grid-template-columns:1.6fr 1fr;gap:20px">
      <div>
        <div class="field">
          <label>Votre réponse</label>
          <textarea class="textarea" id="oa" style="min-height:300px" oninput="onOpenInput('${o.id}')" placeholder="Rédigez votre analyse…">${esc(st.text)}</textarea>
          <div class="row-between"><span class="hint" id="wc">${st.text.trim() ? st.text.trim().split(/\s+/).length : 0} mots · attendu ${o.words[0]}–${o.words[1]}</span>
            <span class="saveind"><span class="dot"></span>Brouillon enregistré</span></div>
        </div>
        <div class="row"><button class="btn btn-primary" onclick="submitOpen('${o.id}')">Soumettre pour évaluation</button>
          <button class="btn btn-quiet" onclick="document.getElementById('oa').value=DATA.openQuestions.find(x=>x.id==='${o.id}').sample||'';onOpenInput('${o.id}')">Insérer une copie d'exemple</button></div>
      </div>
      <div>
        <div class="card card-pad-sm">
          <h3 style="font-size:.9rem;margin-bottom:10px">Critères d'évaluation</h3>
          ${o.rubric.map(c => `<div style="padding:9px 0;border-block-end:1px solid var(--line)">
            <div class="row-between"><b class="xsmall">${esc(c.name)}</b><span class="xsmall mono muted">/ ${c.max}</span></div>
            <div class="xsmall muted" style="margin-top:3px">${esc(c.desc)}</div></div>`).join('')}
        </div>
      </div>
    </div>`, 'open');
});

function onOpenInput(id) {
  const v = document.getElementById('oa').value;
  S.openAnswer[id].text = v;
  const o = DATA.openQuestions.find(x => x.id === id);
  document.getElementById('wc').textContent = (v.trim() ? v.trim().split(/\s+/).length : 0) + ' mots · attendu ' + o.words[0] + '–' + o.words[1];
}

function submitOpen(id) {
  const o = DATA.openQuestions.find(x => x.id === id);
  if (!o.scored) { toast("Cette question n'a pas d'évaluation préparée dans le prototype — essayez la première"); return; }
  const box = modal(`<div class="center" style="padding:24px 0">
    <div class="typing" style="justify-content:center"><i></i><i></i><i></i></div>
    <p class="small dim mt16">Évaluation en cours selon la grille…</p></div>`);
  setTimeout(() => { closeModal(); S.openAnswer[id].submitted = true; render(); }, 1700);
}

function openResult(o) {
  const total = o.scored.reduce((a, b) => a + b.score, 0);
  const max = o.rubric.reduce((a, b) => a + b.max, 0);
  const p = Math.round(total / max * 100);
  return shellApp(`
    ${pagehead("Évaluation de votre copie", esc(o.title))}
    <div class="disclaimer" style="margin-bottom:22px"><span>${icon('bulb', 17)}</span><div>
      <b>Cette copie a été évaluée par une machine.</b> L'appréciation ci-dessous applique la grille critère par critère. Elle ne prétend pas reproduire le jugement d'un jury de concours, et vous pouvez la contester : chaque critère porte un bouton de signalement.</div></div>

    <div class="grid" style="grid-template-columns:1fr 1.6fr;gap:20px">
      <div>
        <div class="card center">
          <div class="k xsmall muted" style="text-transform:uppercase;letter-spacing:.05em;font-weight:700">Score global</div>
          <div style="font-size:3rem;font-weight:750;letter-spacing:-.04em;line-height:1.1;margin:6px 0">${total}<span style="font-size:1.3rem;color:var(--ink-3)">/${max}</span></div>
          <div class="bar" style="margin:10px 0"><span style="width:${p}%;background:${p >= 70 ? 'var(--good)' : p >= 50 ? 'var(--warn)' : 'var(--critical)'}"></span></div>
          <div class="small strong">${p >= 70 ? 'Niveau attendu atteint' : p >= 50 ? 'Proche du niveau attendu' : 'En deçà du niveau attendu'}</div>
          <div class="xsmall muted mt8">${p} % — seuil indicatif de validation : 70 %</div>
        </div>
        <div class="card mt16">
          <h3 style="font-size:.92rem;margin-bottom:10px">Répartition par critère</h3>
          ${barsChart(o.scored.map(s => {
            const r = o.rubric.find(x => x.id === s.id);
            return { label: r.name, value: Math.round(s.score / r.max * 100), color: 'var(--series-1)', tip: `${s.score} / ${r.max}` };
          }), { labelW: 200, unit: ' %' })}
        </div>
      </div>

      <div>
        <div class="card" style="margin-bottom:16px">
          <div class="row-between" style="margin-bottom:10px"><h3 style="font-size:.95rem">Votre copie</h3>
            <span class="xsmall muted">${S.openAnswer[o.id].text.trim().split(/\s+/).length} mots</span></div>
          <div class="card card-flat card-pad-sm" style="font-size:.92rem;line-height:1.75;white-space:pre-line">${esc(S.openAnswer[o.id].text)}</div>
        </div>

        <h3 style="font-size:1rem;margin-bottom:10px">Détail critère par critère</h3>
        <div class="rubric">
          ${o.scored.map(s => {
            const r = o.rubric.find(x => x.id === s.id);
            const ratio = s.score / r.max;
            return `<div class="r-row">
              <div class="r-top"><b>${esc(r.name)}</b>
                <span class="row" style="gap:10px"><span class="bar" style="width:80px"><span style="width:${ratio * 100}%;background:${ratio >= .7 ? 'var(--good)' : ratio >= .5 ? 'var(--warn)' : 'var(--critical)'}"></span></span>
                <span class="r-score">${s.score} / ${r.max}</span></span></div>
              <div class="r-comment">${esc(s.comment)}</div>
              <button class="btn btn-sm btn-quiet" style="margin-top:8px" onclick="toast('Contestation transmise à l\\'équipe pédagogique')">${icon('flag', 15)} Contester ce critère</button>
            </div>`;
          }).join('')}
        </div>

        <div class="card mt16" style="background:var(--brand-50);border-color:var(--brand-300)">
          <h3 style="font-size:.95rem">Ce qu'une copie de niveau attendu contient</h3>
          <p class="small dim" style="margin:8px 0 0">${esc(o.reference)}</p>
        </div>

        <div class="reco mt16">
          <div class="icon">${icon('arrow', 20, 'ic-flip')}</div><div style="flex:1">
            <h4>Prochaine étape</h4>
            <p class="small dim" style="margin:0">Réécrire le paragraphe d'analyse en explicitant la représentation de l'élève, puis resoumettre.</p>
            <div class="why"><b>${esc(T('why'))}</b> Votre note la plus basse porte sur le critère « Analyse didactique » (3,5/6), et c'est aussi celui qui pèse le plus dans l'épreuve réelle. Les trois autres critères sont au-dessus du seuil : reprendre toute la copie serait inefficace.</div>
            <div class="row mt16"><button class="btn btn-sm btn-primary" onclick="S.openAnswer['${o.id}'].submitted=false;render()">Réécrire</button></div>
          </div></div>
      </div>
    </div>`, 'open');
}

/* ---------------- Coach ---------------- */
route('/app/coach', () => {
  if (!isPremium()) return shellApp(`${pagehead('Coach de préparation')}${paywall('Le coach de préparation')}`, 'coach');
  if (!S.coach.length) {
    S.coach = [{ me: false, text: `Bonjour Salma. Il te reste **${daysUntil(DATA.profile.targetDate)} jours** avant l'écrit.\n\nJ'ai regardé tes données depuis notre dernier échange : ta maîtrise globale a gagné 4 points, mais **DI2 — Obstacles d'apprentissage** a perdu 6 points. C'est le seul recul de ton profil.\n\nDis-moi ce dont tu as besoin, ou choisis une suggestion ci-dessous.`, actions: [] }];
  }
  return shellApp(`
    ${pagehead('Coach de préparation', "Disponible en continu, sans intervention humaine. Il travaille à partir de votre profil de maîtrise et du référentiel — pas de vos impressions.")}
    <div class="grid" style="grid-template-columns:1.7fr 1fr;gap:20px">
      <div>
        <div class="card" style="display:flex;flex-direction:column">
          <div class="chat chat-scroll" id="chat">
            ${S.coach.map(m => `<div class="msg ${m.me ? 'me' : 'bot'}">
              <div class="av">${m.me ? 'SB' : 'ن'}</div>
              <div><div class="bubble">${md(m.text)}</div>
              ${m.actions && m.actions.length ? `<div class="coach-actions">${m.actions.map(a => `<a class="btn btn-sm btn-ghost" href="${a.route}">${esc(a.label)}</a>`).join('')}</div>` : ''}</div>
            </div>`).join('')}
            ${S.coachTyping ? `<div class="msg bot"><div class="av">ن</div><div class="bubble"><span class="typing"><i></i><i></i><i></i></span></div></div>` : ''}
          </div>
          <div class="composer">
            <textarea class="textarea" id="ci" placeholder="Posez votre question…" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendCoach()}"></textarea>
            <button class="btn btn-primary" onclick="sendCoach()">Envoyer</button>
          </div>
        </div>
        <div class="row mt16" style="flex-wrap:wrap;gap:7px">
          ${DATA.coachSuggestions.map(s => `<span class="chip" onclick="askCoach('${esc(s).replace(/'/g, "\\'")}')">${esc(s)}</span>`).join('')}
        </div>
      </div>

      <div>
        <div class="card card-pad-sm">
          <h3 style="font-size:.9rem;margin-bottom:10px">Ce que le coach voit de vous</h3>
          <p class="xsmall muted" style="margin-bottom:12px">Transparence complète sur les données mobilisées. Aucune autre information n'est utilisée.</p>
          ${[['Profil de maîtrise', '14 compétences, mis à jour il y a 2 h'],
             ['Historique de réponses', '438 réponses depuis le 18 juin'],
             ['Carnet d\'erreurs', '4 fiches, dont 3 non maîtrisées'],
             ['Examens blancs', '1 tentative, le 25 juillet'],
             ['Référentiel de compétences', 'CRMEF Français — version du 12 juin 2026']
          ].map(([t, d]) => `<div style="padding:8px 0;border-block-end:1px solid var(--line)">
            <b class="xsmall" style="display:block">${t}</b><span class="xsmall muted">${d}</span></div>`).join('')}
          <div class="xsmall muted mt16">Le coach n'a accès ni à votre identité civile, ni à vos coordonnées, ni à vos moyens de paiement.</div>
        </div>
        <div class="card card-pad-sm mt16" style="background:var(--warn-bg);border-color:var(--warn)">
          <b class="xsmall">Limite assumée</b>
          <p class="xsmall" style="margin:6px 0 0">Le coach ne prédit pas votre réussite au concours et refuse de le faire s'il lui est demandé. Il n'invente jamais de contenu d'épreuve : lorsqu'une information ne figure pas dans le référentiel, il le dit.</p>
        </div>
      </div>
    </div>`, 'coach');
});

function askCoach(t) { document.getElementById('ci').value = t; sendCoach(); }
function sendCoach() {
  const el = document.getElementById('ci');
  const t = el.value.trim(); if (!t) return;
  S.coach.push({ me: true, text: t }); el.value = '';
  S.coachTyping = true; render();
  const cc=document.getElementById('chat'); if(cc) cc.scrollTop=cc.scrollHeight;
  API.coach.reply(t).then(rep => {
    S.coachTyping = false;
    S.coach.push({ me: false, text: rep.text, actions: rep.actions || [] });
    render();
    const c = document.getElementById('chat'); if (c) c.scrollTop = c.scrollHeight;
  });
}

/* ---------------- Progression ---------------- */
route('/app/progression', () => {
  if (!isPremium()) return shellApp(`${pagehead('Progression')}${paywall('Le tableau de bord détaillé')}`, 'prog');
  const p = DATA.profile;
  const tab = S.filters.progTab || 'comp';
  const pillarAgg = DATA.pillars.map(pl => {
    const rs = p.mastery.filter(m => comp(m.comp).pillar === pl.id);
    return { label: pl.name, short: pl.name.split(' ')[0], score: Math.round(rs.reduce((a, b) => a + b.score, 0) / rs.length), color: `var(--series-${pl.serie})` };
  });
  const sorted = p.mastery.slice().sort((a, b) => a.score - b.score);

  return shellApp(`
    ${pagehead('Progression', "Votre maîtrise par compétence, avec le volume d'évidence sur lequel repose chaque score.",
      `<button class="btn btn-ghost btn-sm" onclick="toast('Export PDF — non inclus dans le prototype')">Exporter</button>`)}

    <div class="grid g4" style="margin-bottom:24px">
      <div class="stat"><div class="k">Maîtrise globale</div><div class="v mono">61</div><div class="s"><span class="delta-up">▲ 4</span> sur 14 jours</div></div>
      <div class="stat"><div class="k">Compétences acquises</div><div class="v mono">${p.mastery.filter(m => m.score >= 70).length}<span style="font-size:1rem;color:var(--ink-3)">/14</span></div><div class="s">score ≥ 70</div></div>
      <div class="stat"><div class="k">Prioritaires</div><div class="v mono">${p.mastery.filter(m => m.score < 50).length}</div><div class="s">score &lt; 50</div></div>
      <div class="stat"><div class="k">Réponses cumulées</div><div class="v mono">438</div><div class="s">évidence globale solide</div></div>
    </div>

    <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
      <div class="viz"><h3>Vue par pilier</h3><div class="vsub">Moyenne des compétences de chaque pilier</div>
        ${radarChart(pillarAgg, { size: 300 })}
        <div class="legend">${pillarAgg.map((a, i) => `<span><i style="background:var(--series-${i + 1})"></i>${esc(a.label)} — ${a.score}</span>`).join('')}</div></div>
      <div class="viz"><h3>Évolution sur 8 semaines</h3><div class="vsub">Score de maîtrise par pilier</div>
        ${lineChart(p.history, [
          { key: 'SE', label: "Sciences de l'éducation", color: 'var(--series-1)' },
          { key: 'DI', label: 'Didactique', color: 'var(--series-2)' },
          { key: 'SP', label: 'Spécialité', color: 'var(--series-3)' }])}
        <div class="legend"><span><i style="background:var(--series-1)"></i>Sciences de l'éducation</span>
          <span><i style="background:var(--series-2)"></i>Didactique</span><span><i style="background:var(--series-3)"></i>Spécialité</span></div>
        <p class="xsmall muted mt16">Le recul de la didactique en semaines 7 et 8 est réel et affiché tel quel : lisser une courbe de progression rendrait le tableau de bord inutilisable.</p></div>
    </div>

    <div class="tabs">
      ${[['comp', 'Par compétence'], ['time', 'Temps et précision'], ['err', 'Erreurs récurrentes']].map(([k, l]) =>
        `<button class="${tab === k ? 'on' : ''}" onclick="setFilter('progTab','${k}')">${l}</button>`).join('')}
    </div>

    ${tab === 'comp' ? `<div class="card">${sorted.map(masteryRow).join('')}
      <div class="xsmall muted mt16">Le niveau d'évidence indique le volume de réponses derrière chaque score. Une compétence à deux barres repose sur trop peu de données pour être considérée comme stable.</div></div>` : ''}

    ${tab === 'time' ? `<div class="grid g2">
      <div class="viz"><h3>Temps moyen par question</h3><div class="vsub">En secondes, par pilier</div>
        ${barsChart([{ label: "Sciences de l'éducation", value: 68, color: 'var(--series-1)', tip: '68 s — référence 75 s' },
          { label: 'Didactique', value: 94, color: 'var(--series-2)', tip: '94 s — référence 85 s' },
          { label: 'Spécialité', value: 71, color: 'var(--series-3)', tip: '71 s — référence 80 s' }], { max: 120, labelW: 160, unit: ' s' })}
        <p class="xsmall muted mt16">Vous dépassez la référence en didactique de 9 secondes en moyenne, ce qui est cohérent avec vos scores plus faibles sur ce pilier.</p></div>
      <div class="viz"><h3>Précision par niveau cognitif</h3><div class="vsub">Part de bonnes réponses</div>
        ${barsChart([{ label: 'Restituer', value: 84, color: 'var(--series-1)' }, { label: 'Comprendre', value: 71, color: 'var(--series-1)' },
          { label: 'Appliquer', value: 63, color: 'var(--series-1)' }, { label: 'Analyser', value: 48, color: 'var(--series-1)' }], { labelW: 140, unit: ' %' })}
        <p class="xsmall muted mt16">Votre profil est net : vous restituez bien et vous analysez mal. C'est le niveau cognitif le plus représenté dans l'épreuve réelle.</p></div>
    </div>` : ''}

    ${tab === 'err' ? `<div class="card">
      <h3 style="font-size:1rem;margin-bottom:6px">Schémas d'erreur détectés</h3>
      <p class="small muted">Détectés par règles explicites sur vos réponses, pas par un modèle prédictif.</p>
      <div class="col mt16" style="gap:12px">
        ${[
          ["Qualifier une erreur d'élève d'« inattention »", '3 occurrences sur 4 questions concernées', 'DI2', "Vous choisissez l'option qui attribue l'erreur à un manque d'attention. C'est précisément la réponse que les correcteurs sanctionnent : elle renonce à l'analyse didactique."],
          ['Accord du participe passé avec COD antéposé', '4 erreurs sur 7 questions', 'SP1', "Vous réussissez quand le COD est un nom, vous échouez quand c'est un pronom. Le pronom masque le genre et le nombre."],
          ['Confusion orientation stratégique / texte juridique', '2 erreurs sur 3 questions', 'SE5', 'Vision stratégique et loi-cadre 51.17 sont systématiquement interverties.']
        ].map(([t, n, c, d]) => `<div class="card card-flat card-pad-sm">
          <div class="row-between" style="margin-bottom:6px"><b class="small">${t}</b>${badge(comp(c).short, 'brand')}</div>
          <div class="xsmall muted" style="margin-bottom:7px">${n}</div>
          <div class="small dim">${d}</div>
          <button class="btn btn-sm btn-ghost mt8" onclick="navigate('#/app/entrainement')">S'entraîner sur ce point</button></div>`).join('')}
      </div></div>` : ''}
  `, 'prog');
});

/* ---------------- Certification ---------------- */
route('/app/certification', () => {
  if (!isPremium()) return shellApp(`${pagehead('Certification')}${paywall('La certification des acquis')}`, 'cert');
  if (S.cert && S.cert.running) return certExam();
  return shellApp(`
    ${pagehead('Certification des acquis', "Une attestation de niveau, vérifiable publiquement. Elle mesure votre maîtrise sur un pilier — elle ne vaut pas diplôme.")}
    <div class="disclaimer" style="margin-bottom:24px"><span>${icon('flag', 17)}</span><div>
      <b>Portée de l'attestation.</b> Document privé délivré par Najah.ma. Sans valeur officielle au regard des concours publics, ne remplaçant aucun diplôme, n'engageant ni le ministère ni les académies régionales. Elle atteste d'un niveau mesuré sur notre référentiel, à une date donnée.</div></div>

    <h2 style="font-size:1.15rem;margin-bottom:12px">Attestation obtenue</h2>
    <div class="cert" style="margin-bottom:12px">
      <div class="row-between" style="align-items:flex-start;position:relative">
        <div>
          <div class="lbl">Attestation de niveau — Najah.ma</div>
          <h3>${esc(DATA.issuedCert.name)}</h3>
          <div style="opacity:.9;font-size:.9rem">Délivrée à ${esc(DATA.issuedCert.holder)}</div>
          <div class="meta">
            <div><span>Score</span><b>${DATA.issuedCert.score} / 100</b></div>
            <div><span>Niveau</span><b>${esc(DATA.issuedCert.level)}</b></div>
            <div><span>Délivrée le</span><b>${esc(DATA.issuedCert.issued)}</b></div>
            <div><span>Valable jusqu'au</span><b>${esc(DATA.issuedCert.expires)}</b></div>
            <div><span>Code</span><b>${esc(DATA.issuedCert.code)}</b></div>
          </div>
        </div>
        <div class="qrbox">${qrSvg()}</div>
      </div>
    </div>
    <div class="row" style="margin-bottom:32px">
      <a class="btn btn-ghost btn-sm" href="#/verifier/${DATA.issuedCert.code}">Voir la page de vérification publique</a>
      <button class="btn btn-quiet btn-sm" onclick="toast('Lien copié dans le presse-papiers')">Copier le lien de partage</button>
      <button class="btn btn-quiet btn-sm" onclick="toast('Export PDF — non inclus dans le prototype')">Télécharger en PDF</button>
    </div>

    <h2 style="font-size:1.15rem;margin-bottom:12px">Parcours certifiants</h2>
    <div class="col" style="gap:14px">
      ${DATA.certifications.map(c => {
        const done = c.requirements.filter(r => r.done).length;
        const ready = done === c.requirements.length - 1 && !c.requirements[c.requirements.length - 1].done;
        const issued = c.id === DATA.issuedCert.cert;
        return `<div class="card">
          <div class="row-between" style="margin-bottom:10px">
            <div class="row" style="gap:9px"><i style="width:11px;height:11px;border-radius:3px;background:var(--series-${DATA.pillars.find(p => p.id === c.pillar).serie});display:inline-block"></i>
              <div><h3 style="font-size:1.02rem">${esc(c.name)}</h3>
                <div class="xsmall muted">${c.questions} questions · ${c.duration} min · seuil ${c.threshold} %</div></div></div>
            ${issued ? badge('Obtenue', 'good') : ready ? badge('Éligible', 'safran') : badge(`${done}/${c.requirements.length} conditions`, 'outline')}
          </div>
          <p class="small dim" style="margin:0 0 12px">${esc(c.desc)}</p>
          <div class="col" style="gap:7px">
            ${c.requirements.map(r => `<div class="row small" style="gap:9px;align-items:flex-start">
              <span style="flex:none;color:${r.done ? 'var(--good-ink)' : 'var(--ink-3)'}">${r.done ? icon('check',15) : '○'}</span>
              <span style="flex:1;${r.done ? '' : 'color:var(--ink-2)'}">${esc(r.t)}</span>
              <span class="xsmall muted">${esc(r.detail)}</span></div>`).join('')}
          </div>
          <div class="row mt16">
            ${issued ? `<button class="btn btn-ghost btn-sm" onclick="toast('Attestation déjà délivrée')">Attestation délivrée</button>`
              : `<button class="btn ${ready ? 'btn-primary' : 'btn-ghost'} btn-sm" ${ready ? `onclick="startCert('${c.id}')"` : 'disabled'}>
                  ${ready ? "Passer l'épreuve certifiante" : 'Conditions non remplies'}</button>`}
            <button class="btn btn-quiet btn-sm" onclick="navigate('#/app/entrainement')">Travailler ce pilier</button>
          </div>
        </div>`;
      }).join('')}
    </div>`, 'cert');
});

function qrSvg() {
  // Motif décoratif évoquant un QR — non fonctionnel dans le prototype
  const g = [];
  const seed = 7;
  let s = seed;
  for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) {
    s = (s * 9301 + 49297) % 233280;
    const corner = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
    const on = corner ? ((x === 0 || x === 2 || y === 0 || y === 2 || (x === 1 && y === 1)) ||
      (x > 7 && (x === 8 || x === 10 || y === 0 || y === 2 || (x === 9 && y === 1)))) : (s / 233280 > .5);
    if (on) g.push(`<rect x="${x * 7}" y="${y * 7}" width="7" height="7" fill="#14150f"/>`);
  }
  return `<svg viewBox="0 0 77 77" width="100%" height="100%" role="img" aria-label="Code de vérification">${g.join('')}</svg>`;
}

function startCert(id) {
  const c = DATA.certifications.find(x => x.id === id);
  modal(`<h3>Épreuve certifiante — ${esc(c.name)}</h3>
    <p class="small dim">Conditions renforcées. Lisez avant de commencer.</p>
    <div class="card card-flat card-pad-sm">
      <ul class="small dim" style="margin:0">
        <li>${c.questions} questions en ${c.duration} minutes, sans pause</li>
        <li>Aucun retour en arrière après validation d'une question</li>
        <li>Une seule tentative supplémentaire en cas d'échec, après 30 jours</li>
        <li>Toute sortie de la page est enregistrée et signalée sur l'attestation</li>
      </ul></div>
    <div class="disclaimer mt16"><span>${icon('flag', 17)}</span><div class="xsmall">L'attestation délivrée est un document privé, sans valeur officielle au regard des concours publics.</div></div>
    <div class="row mt16" style="justify-content:flex-end"><button class="btn btn-quiet" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="closeModal();S.cert={id:'${id}',running:true,i:0,answers:{},left:${c.duration * 60}};render()">Je commence</button></div>`);
}

function certExam() {
  const c = DATA.certifications.find(x => x.id === S.cert.id);
  const ids = DATA.questions.filter(q => comp(q.comp).pillar === c.pillar).map(q => q.id);
  const q = DATA.questions.find(x => x.id === ids[S.cert.i % ids.length]);
  const total = Math.min(c.questions, ids.length * 2);
  return shellApp(`
    <div class="exambar" style="border-color:var(--brand-600)">
      <b class="small">Épreuve certifiante</b>
      <span class="badge badge-brand">${esc(c.name)}</span>
      <span class="timer">${icon('timer',16)} ${mmss(S.cert.left)}</span>
      <span class="spacer" style="flex:1"></span>
      <span class="small mono muted">${S.cert.i + 1} / ${total}</span>
    </div>
    <div class="bar bar-thin" style="margin-bottom:20px"><span style="width:${S.cert.i / total * 100}%"></span></div>
    ${questionBlock(q, { answer: S.cert.answers[q.id], onPick: `certPick('${q.id}',`, index: S.cert.i + 1, total })}
    <div class="row-between mt24">
      <span class="small muted">Le retour en arrière est désactivé pendant l'épreuve certifiante.</span>
      <button class="btn btn-primary" ${S.cert.answers[q.id] === undefined ? 'disabled' : ''} onclick="certNext(${total})">
        ${S.cert.i + 1 >= total ? "Terminer l'épreuve" : esc(T('validate')) + ' et continuer'}</button>
    </div>`, 'cert');
}
function certPick(qid, k) { S.cert.answers[qid] = k; render(); }
function certNext(total) {
  if (S.cert.i + 1 >= total) {
    S.cert = null; toast('Épreuve terminée — résultat disponible sous 24 h dans la version réelle'); navigate('#/app/certification');
  } else { S.cert.i++; render(); }
}

/* ---------------- Abonnement ---------------- */
route('/app/abonnement', () => shellApp(`
  ${pagehead('Abonnement', "Votre formule, vos quotas et votre historique de facturation.")}
  <div class="grid" style="grid-template-columns:1.5fr 1fr;gap:20px">
    <div>
      <div class="card">
        <div class="row-between" style="margin-bottom:14px">
          <div><div class="xsmall muted" style="text-transform:uppercase;letter-spacing:.06em;font-weight:700">Formule active</div>
            <h3 style="font-size:1.25rem;margin-top:4px">${isPremium() ? 'Premium mensuel' : 'Compte gratuit'}</h3></div>
          ${isPremium() ? badge('Actif', 'good') : badge('Limité', 'warn')}</div>
        ${isPremium() ? `
          <table class="table">
            <tr><td class="muted small">Montant</td><td class="num strong">149 DH / mois</td></tr>
            <tr><td class="muted small">Prochain prélèvement</td><td class="num strong mono">1 septembre 2026</td></tr>
            <tr><td class="muted small">Moyen de paiement</td><td class="num small">Carte •••• 4417</td></tr>
            <tr><td class="muted small">Depuis le</td><td class="num small mono">18 juin 2026</td></tr>
          </table>
          <div class="row mt16"><button class="btn btn-ghost btn-sm" onclick="navigate('#/tarifs')">Passer à l'annuel</button>
            <button class="btn btn-quiet btn-sm" onclick="toast('Gestion de l\\'abonnement — hors périmètre du prototype')">Gérer</button></div>
        ` : `
          <div class="quota" style="margin-bottom:14px">${icon('clock', 16)} ${DATA.profile.quotaUsed} questions sur ${DATA.profile.quotaTotal} utilisées aujourd'hui</div>
          <p class="small dim">Le compte gratuit donne accès au diagnostic complet et à un volume quotidien limité. Les corrections intégrales, les séries ciblées, le simulateur complet, le coach et la certification relèvent du premium.</p>
          <a class="btn btn-primary" href="#/tarifs">Voir les offres</a>`}
      </div>

      <div class="card mt16">
        <h3 style="font-size:1rem;margin-bottom:10px">Historique de facturation</h3>
        <table class="table">
          <thead><tr><th>Date</th><th>Description</th><th class="num">Montant</th><th class="num">Facture</th></tr></thead>
          <tbody>${[['1 août 2026', 'Premium mensuel'], ['1 juillet 2026', 'Premium mensuel'], ['18 juin 2026', 'Premium mensuel — prorata']].map(([d, l], i) =>
            `<tr><td class="mono small">${d}</td><td class="small">${l}</td><td class="num strong">${i === 2 ? '62' : '149'} DH</td>
             <td class="num"><button class="btn btn-sm btn-quiet" onclick="toast('Facture PDF — hors périmètre')">PDF</button></td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>

    <div>
      <div class="card card-pad-sm">
        <h3 style="font-size:.92rem;margin-bottom:10px">Vos droits d'accès</h3>
        <p class="xsmall muted" style="margin-bottom:12px">Chaque droit est vérifié côté serveur à chaque requête. Cet écran ne fait qu'afficher un état.</p>
        ${[['Banque de questions complète', isPremium()], ['Corrections intégrales', isPremium()], ['Séries ciblées', isPremium()],
           ['Simulateurs complets', isPremium()], ['Questions ouvertes évaluées', isPremium()], ['Coach', isPremium()],
           ['Certification', isPremium()], ['Diagnostic', true], ['Contenu public', true]].map(([t, ok]) =>
          `<div class="row small" style="gap:8px;padding:6px 0"><span style="color:${ok ? 'var(--good-ink)' : 'var(--ink-3)'};font-weight:700">${ok ? icon('check',13) : icon('x',13)}</span>
           <span style="${ok ? '' : 'color:var(--ink-3)'}">${t}</span></div>`).join('')}
      </div>
    </div>
  </div>`, 'sub'));

/* ---------------- Paramètres ---------------- */
route('/app/parametres', () => shellApp(`
  ${pagehead('Paramètres')}
  <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px">
    <div class="card">
      <h3 style="font-size:1rem;margin-bottom:14px">Langue et affichage</h3>
      <div class="field"><label>Langue de l'interface</label>
        <div class="row" style="gap:8px">
          <span class="chip ${S.lang === 'fr' ? 'on' : ''}" onclick="if(S.lang!=='fr')toggleLang()">Français</span>
          <span class="chip ${S.lang === 'ar' ? 'on' : ''}" onclick="if(S.lang!=='ar')toggleLang()">العربية</span></div>
        <div class="hint">Le passage à l'arabe bascule toute l'interface en lecture de droite à gauche.</div></div>
      <div class="field"><label>Thème</label>
        <div class="row" style="gap:8px">
          <span class="chip ${S.theme === 'light' ? 'on' : ''}" onclick="if(S.theme!=='light')toggleTheme()">Clair</span>
          <span class="chip ${S.theme === 'dark' ? 'on' : ''}" onclick="if(S.theme!=='dark')toggleTheme()">Sombre</span></div></div>
      <label class="switch" style="margin-top:6px"><input type="checkbox" checked><span class="track"></span>
        <span class="small">Réduire les animations</span></label>
    </div>

    <div class="card">
      <h3 style="font-size:1rem;margin-bottom:14px">Routine quotidienne</h3>
      <div class="field"><label>Questions par jour</label>
        <div class="row" style="gap:7px">${[10, 15, 20, 30].map(n => `<span class="chip ${n === 20 ? 'on' : ''}">${n}</span>`).join('')}</div></div>
      <div class="field"><label>Jours d'entraînement</label>
        <div class="row" style="gap:6px;flex-wrap:wrap">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => `<span class="chip ${i < 5 ? 'on' : ''}" style="width:38px;justify-content:center">${d}</span>`).join('')}</div></div>
      <label class="switch"><input type="checkbox" checked><span class="track"></span><span class="small">Rappel quotidien à 19 h</span></label>
      <div class="hint mt8">Les rappels sont désactivés par défaut et ne s'activent qu'à votre demande explicite.</div>
    </div>

    <div class="card">
      <h3 style="font-size:1rem;margin-bottom:14px">Compte</h3>
      <div class="field"><label>Nom affiché</label><input class="input" value="${esc(DATA.profile.name)}"></div>
      <div class="field"><label>Adresse e-mail</label><input class="input" value="s.bennani@example.ma"></div>
      <div class="field"><label>Concours suivi</label>
        <select class="select"><option>CRMEF — Français, secondaire qualifiant</option><option>CRMEF — Mathématiques, secondaire qualifiant</option></select></div>
      <button class="btn btn-primary btn-sm" onclick="toast('Modifications enregistrées')">Enregistrer</button>
    </div>

    <div class="card">
      <h3 style="font-size:1rem;margin-bottom:8px">Vos données</h3>
      <p class="small dim">Nous ne collectons aucune donnée sans usage produit, légal ou de sécurité défini. Vous pouvez exporter ou supprimer votre compte à tout moment.</p>
      <div class="col mt16" style="gap:8px">
        <button class="btn btn-ghost btn-sm" onclick="toast('Export de données — hors périmètre du prototype')">Exporter mes données</button>
        <button class="btn btn-ghost btn-sm" onclick="toast('Appareils connectés : 2')">Appareils connectés</button>
        <button class="btn btn-quiet btn-sm" style="color:var(--critical)" onclick="toast('Suppression de compte — hors périmètre')">Supprimer mon compte</button>
      </div>
    </div>
  </div>`, 'set'));
