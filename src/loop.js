/* =========================================================================
   NAJAH.ma — La Boucle Najah
   Réponse → certitude → correction → distracteurs → confusion probable →
   source → remédiation → question miroir → rappel différé → progression.

   Deux principes gouvernent tout ce fichier :
     1. Une seule bonne réponse ne prouve jamais une maîtrise.
     2. Une cause d'erreur est une hypothèse, jamais un diagnostic.
   ========================================================================= */

/* ---------------- Certitude déclarée ---------------- */
const CERTITUDES = [
  { id: 'sur',      label: 'Sûr',        icon: 'shield', weight: 1.0 },
  { id: 'hesitant', label: 'Hésitant',   icon: 'bulb',   weight: 0.5 },
  { id: 'hasard',   label: 'Au hasard',  icon: 'refresh', weight: 0.15 }
];
const certOf = id => CERTITUDES.find(c => c.id === id) || CERTITUDES[1];

/* Lecture croisée réponse × certitude — matrice du document fonctionnel (F02) */
function readCertitude(correct, cert) {
  if (correct && cert === 'sur')       return { key: 'solide',       label: 'Maîtrise probablement solide', prio: 3, kind: 'good' };
  if (correct && cert !== 'sur')       return { key: 'fragile',      label: 'Bonne réponse, mais peu assurée', prio: 2, kind: 'warn' };
  if (!correct && cert !== 'sur')      return { key: 'lacune',       label: 'Lacune consciente', prio: 1, kind: 'warn' };
  return { key: 'fausse_croyance',     label: 'Fausse croyance — priorité haute', prio: 0, kind: 'crit' };
}

/* ---------------- États de maîtrise ----------------
   Une maîtrise se construit sur des preuves : plusieurs réponses, dans le
   temps, avec une certitude cohérente. Jamais sur une seule réponse.
   ------------------------------------------------------------------- */
function masteryOfSub(subId) {
  const s = st();
  const m = s.mastery[subId];
  if (!m || !m.seen) return { state: 'non_evaluee', seen: 0, correct: 0, evidence: 0, ratio: 0, sureWrong: 0, spaced: 0 };
  return m;
}

function recomputeMastery(subId) {
  const s = st();
  const rel = s.attempts.filter(a => a.sub === subId);
  if (!rel.length) { delete s.mastery[subId]; storeSave(); return masteryOfSub(subId); }

  const seen = rel.length;
  const correct = rel.filter(a => a.correct).length;
  const ratio = correct / seen;
  const sureWrong = rel.filter(a => !a.correct && a.certitude === 'sur').length;
  // Poids de preuve : une réponse au hasard vaut peu, une réponse sûre vaut plein
  const evidence = rel.reduce((acc, a) => acc + certOf(a.certitude).weight, 0);
  // Réussites espacées : bonnes réponses séparées d'au moins un jour
  const goods = rel.filter(a => a.correct).map(a => a.ts).sort((x, y) => x - y);
  let spaced = goods.length ? 1 : 0;
  for (let i = 1; i < goods.length; i++) if (goods[i] - goods[i - 1] >= dayMs()) spaced++;
  // Le miroir compte comme preuve de transfert
  const mirrorOk = Object.entries(s.mirrorsDone)
    .filter(([qid, r]) => r.sub === subId && r.correct).length;

  let state;
  if (seen < 2 || evidence < 1.5)                       state = 'en_cours';
  if (seen >= 2 && ratio < 0.5)                         state = 'fragile';
  else if (sureWrong > 0 && ratio < 0.75)               state = 'fragile';
  else if (seen >= 2 && ratio >= 0.5 && ratio < 0.8)    state = 'en_cours';
  else if (ratio >= 0.8 && (spaced < 2 || mirrorOk < 1)) state = 'a_consolider';
  else if (ratio >= 0.8 && spaced >= 2 && mirrorOk >= 1) state = 'consolidee';
  if (seen < 2) state = 'en_cours';                     // jamais consolidé sur une seule réponse

  const m = { state, seen, correct, ratio: +ratio.toFixed(2), evidence: +evidence.toFixed(2), sureWrong, spaced, mirrorOk, lastTs: Math.max(...rel.map(a => a.ts)) };
  s.mastery[subId] = m;
  storeSave();
  return m;
}

function masteryLabel(stateId) {
  const s = DATA.crmef.masteryStates.find(x => x.id === stateId);
  return s || DATA.crmef.masteryStates[0];
}

/* ---------------- Confusion probable ----------------
   Présentée comme hypothèse. Le candidat peut la corriger ou l'ignorer.
   ------------------------------------------------------------------- */
function probableConfusion(q, answer) {
  if (!q || answer === q.correct) return null;
  return {
    hypothese: q.trap || null,
    distracteur: answer,
    texte: q.choices.find(c => c.k === answer) ? q.choices.find(c => c.k === answer).t : '',
    justification: q.rationales ? q.rationales[answer] : '',
    // formulation volontairement prudente
    formule: "Hypothèse, à confirmer par vous"
  };
}

/* ---------------- Question miroir ----------------
   Même sous-domaine, question différente, de préférence d'un autre niveau
   cognitif : on vérifie un transfert, pas une mémorisation.
   ------------------------------------------------------------------- */
function pickMirror(q) {
  if (!q || !q.sub) return null;
  const pool = subQuestions(q.sub).filter(x => x.id !== q.id);
  if (!pool.length) return null;
  const other = pool.filter(x => x.cog !== q.cog);
  return (other.length ? other : pool)[0];
}

function recordMirror(originQid, mirrorQid, correct, sub) {
  const s = st();
  s.mirrorsDone[originQid] = { mirror: mirrorQid, correct: !!correct, sub, ts: nowTs() };
  // Une réussite au miroir ne clôt pas la fragilité : elle avance le rappel, sans plus
  const e = s.errors[originQid];
  if (e) { e.mirror = correct ? 'réussie' : 'échouée'; e.ts = nowTs(); }
  storeSave();
  recomputeMastery(sub);
}

/* ---------------- Rappel différé ----------------
   J+1, J+3, J+7, J+15. Un échec rapproche l'échéance.
   La vérification utilise une AUTRE question que celle d'origine.
   ------------------------------------------------------------------- */
const RECALL_STEPS = [1, 3, 7, 15];

function scheduleRecall(qid, sub, failed) {
  const s = st();
  let r = s.recalls.find(x => x.qid === qid);
  if (!r) { r = { qid, sub, step: 0, tries: 0, done: false, due: 0 }; s.recalls.push(r); }
  if (failed) r.step = Math.max(0, r.step - 1);
  const days = RECALL_STEPS[Math.min(r.step, RECALL_STEPS.length - 1)];
  r.due = nowTs() + days * dayMs();
  r.dueDays = days;
  storeSave();
  return r;
}
function advanceRecall(qid, ok) {
  const s = st();
  const r = s.recalls.find(x => x.qid === qid);
  if (!r) return null;
  r.tries++;
  if (ok) { r.step++; if (r.step >= RECALL_STEPS.length) { r.done = true; } }
  else r.step = Math.max(0, r.step - 1);
  const days = RECALL_STEPS[Math.min(r.step, RECALL_STEPS.length - 1)];
  r.due = nowTs() + days * dayMs();
  r.dueDays = days;
  storeSave();
  return r;
}
function dueRecalls() {
  const s = st();
  const now = nowTs();
  return s.recalls.filter(r => !r.done && r.due <= now);
}
/* Pour le rappel, on prend une question DIFFÉRENTE du même sous-domaine */
function recallQuestion(r) {
  const pool = subQuestions(r.sub).filter(q => q.id !== r.qid);
  return pool.length ? pool[0] : DATA.questions.find(q => q.id === r.qid);
}

/* ---------------- Carnet d'erreurs ---------------- */
function upsertError(q, answer, certitude) {
  const s = st();
  const conf = probableConfusion(q, answer);
  const prev = s.errors[q.id];
  s.errors[q.id] = {
    qid: q.id, ep: q.ep, sub: q.sub,
    answer, expected: q.correct, certitude,
    lecture: readCertitude(false, certitude).key,
    confusion: conf ? conf.hypothese : null,
    mirror: prev ? prev.mirror : null,
    remediation: prev ? prev.remediation : 'proposée',
    ts: nowTs(), count: prev ? prev.count + 1 : 1
  };
  storeSave();
  return s.errors[q.id];
}
function errorList(filter) {
  const s = st();
  let list = Object.values(s.errors);
  if (!filter) return list;
  if (filter.ep) list = list.filter(e => e.ep === filter.ep);
  if (filter.sub) list = list.filter(e => e.sub === filter.sub);
  if (filter.remed) list = list.filter(e => e.remediation === filter.remed);
  if (filter.due) {
    const due = dueRecalls().map(r => r.qid);
    list = list.filter(e => due.includes(e.qid));
  }
  return list;
}

/* ---------------- Traitement complet d'une réponse ----------------
   Point d'entrée unique de la boucle : tout passe par ici.
   ------------------------------------------------------------------- */
function submitAnswer(o) {
  const q = DATA.questions.find(x => x.id === o.qid);
  if (!q) return null;
  const correct = o.answer === q.correct;
  const res = recordAttempt({
    qid: q.id, ep: q.ep, sub: q.sub, answer: o.answer, correct,
    certitude: o.certitude, mode: o.mode, session: o.session
  });
  if (q.sub) recomputeMastery(q.sub);
  if (!correct) { upsertError(q, o.answer, o.certitude); if (q.sub) scheduleRecall(q.id, q.sub, true); }
  else if (o.certitude !== 'sur' && q.sub) scheduleRecall(q.id, q.sub, false);
  return {
    created: res.created, correct,
    lecture: readCertitude(correct, o.certitude),
    confusion: probableConfusion(q, o.answer),
    mirror: correct && o.certitude === 'sur' ? null : pickMirror(q)
  };
}

/* ---------------- Prochaine mission ----------------
   Une seule activité prioritaire, avec sa raison affichable.
   ------------------------------------------------------------------- */
function nextMission() {
  const s = st();
  if (!s.parcours) return { type: 'config', title: 'Configurer votre parcours', why: "Aucun parcours n'est encore enregistré : le concours, le cycle et la langue déterminent tout le reste.", route: '#/app/parcours/crmef' };

  const due = dueRecalls();
  if (due.length) {
    const r = due[0]; const sub = SUB(r.sub);
    return { type: 'recall', title: `Rappel différé — ${sub ? sub.name : r.sub}`,
      why: `Vous aviez travaillé ce point il y a ${Math.max(1, Math.round((nowTs() - (r.due - (r.dueDays || 1) * dayMs())) / dayMs()))} jour(s). La vérification utilise une autre question, pour mesurer un souvenir et non une reconnaissance.`,
      route: '#/app/parcours/crmef/entrainement?mode=rappels' };
  }
  if (!s.diagnostic || !s.diagnostic.done) {
    const started = s.diagnostic && s.diagnostic.i > 0;
    return { type: 'diagnostic', title: started ? 'Reprendre le diagnostic' : 'Commencer le diagnostic',
      why: started ? `Vous étiez à la question ${s.diagnostic.i + 1}. Vos réponses sont conservées.` : "Sans diagnostic, toute recommandation serait une supposition. Il couvre les trois épreuves selon leurs poids officiels.",
      route: '#/app/parcours/crmef/diagnostic' };
  }
  // Fragilité la plus lourde au regard du poids officiel
  const weak = ALL_SUBS()
    .map(sub => ({ sub, m: masteryOfSub(sub.id) }))
    .filter(x => ['fragile', 'en_cours'].includes(x.m.state) && subQuestions(x.sub.id).length)
    .sort((a, b) => (b.sub.weight - a.sub.weight) || (a.m.ratio - b.m.ratio))[0];
  if (weak) {
    return { type: 'remediation', title: `Corriger : ${weak.sub.name}`,
      why: `État « ${masteryLabel(weak.m.state).label} » sur ${weak.m.seen} réponse(s). Ce sous-domaine pèse ${weak.sub.weight} % de l'épreuve ${EP(weak.sub.ep).name} — c'est là que l'effort rapporte le plus.`,
      route: '#/app/parcours/crmef/apprendre/' + weak.sub.id, sub: weak.sub.id };
  }
  // Sinon : couvrir un sous-domaine jamais évalué
  const never = ALL_SUBS().filter(sub => masteryOfSub(sub.id).state === 'non_evaluee' && subQuestions(sub.id).length)
    .sort((a, b) => b.weight - a.weight)[0];
  if (never) {
    return { type: 'couverture', title: `Découvrir : ${never.name}`,
      why: `Ce sous-domaine n'a jamais été évalué et pèse ${never.weight} % de l'épreuve ${EP(never.ep).name}.`,
      route: '#/app/parcours/crmef/apprendre/' + never.id, sub: never.id };
  }
  return { type: 'simulation', title: 'Passer une simulation par épreuve',
    why: "Vos sous-domaines couverts sont au moins en cours d'acquisition. Une simulation par épreuve mesure l'endurance et la gestion du temps.",
    route: '#/app/parcours/crmef/simulations' };
}

/* ---------------- Frise du parcours ---------------- */
function parcoursStages() {
  const s = st();
  const diagDone = s.diagnostic && s.diagnostic.done;
  const evaluated = ALL_SUBS().filter(x => masteryOfSub(x.id).state !== 'non_evaluee').length;
  const remediated = Object.keys(s.remediations).length;
  const trained = s.attempts.filter(a => a.mode === 'entrainement').length;
  const simulated = Object.values(s.sims).filter(x => x.submitted).length;
  const consolidated = ALL_SUBS().filter(x => masteryOfSub(x.id).state === 'consolidee').length;
  return [
    { id: 'decouverte', name: 'Découverte', done: !!s.parcours },
    { id: 'diagnostic', name: 'Diagnostic', done: !!diagDone, partial: !!(s.diagnostic && !diagDone) },
    { id: 'fondations', name: 'Fondations', done: evaluated >= 6, partial: evaluated > 0 },
    { id: 'remediation', name: 'Remédiation', done: remediated >= 3, partial: remediated > 0 },
    { id: 'entrainement', name: 'Entraînement', done: trained >= 20, partial: trained > 0 },
    { id: 'simulations', name: 'Simulations', done: simulated >= 3, partial: simulated > 0 },
    { id: 'consolidation', name: 'Consolidation', done: consolidated >= 8, partial: consolidated > 0 }
  ];
}
