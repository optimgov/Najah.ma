/* =========================================================================
   NAJAH.ma — Persistance
   Tout ce que le candidat produit survit au rechargement.
   Écriture versionnée, migration sûre, tentatives idempotentes.
   ========================================================================= */

const STORE_KEY = 'najah.state';
const STORE_VERSION = 3;

const BLANK = () => ({
  v: STORE_VERSION,
  parcours: null,          // { concours, specialite, cycle, session, langueSE, tempsParSemaine }
  attempts: [],            // { key, qid, ep, sub, answer, correct, certitude, ts, mode }
  diagnostic: null,        // { started, plan:[{ep,sub,qid}], i, done, ts }
  mastery: {},             // subId -> { state, evidence, correct, seen, lastTs, sureWrong }
  errors: {},              // qid -> entrée de carnet
  recalls: [],             // { qid, sub, due, interval, tries, done }
  mirrorsDone: {},         // qid -> résultat de la question miroir
  remediations: {},        // subId -> { status, ts }
  sims: {},                // epId -> { key, ids, answers, certitudes, left, started, submitted, report }
  seenMissions: []
});

let ST = null;

function storeLoad() {
  if (ST) return ST;
  let raw = null;
  try { raw = localStorage.getItem(STORE_KEY); } catch (e) { raw = null; }
  if (!raw) { ST = BLANK(); return ST; }
  let data;
  try { data = JSON.parse(raw); } catch (e) { data = null; }
  if (!data || typeof data !== 'object') { ST = BLANK(); return ST; }
  ST = storeMigrate(data);
  return ST;
}

/* Migration : un état ancien ne doit jamais faire planter l'application.
   On complète les champs manquants au lieu de tout effacer. */
function storeMigrate(data) {
  const fresh = BLANK();
  if (typeof data.v !== 'number' || data.v > STORE_VERSION) {
    // Version inconnue ou future : on repart d'un état propre en conservant une copie
    try { localStorage.setItem(STORE_KEY + '.backup', JSON.stringify(data)); } catch (e) {}
    return fresh;
  }
  Object.keys(fresh).forEach(k => {
    if (data[k] === undefined || data[k] === null) return;
    if (Array.isArray(fresh[k]) && !Array.isArray(data[k])) return;
    if (!Array.isArray(fresh[k]) && typeof fresh[k] === 'object' && typeof data[k] !== 'object') return;
    fresh[k] = data[k];
  });
  fresh.v = STORE_VERSION;
  return fresh;
}

function storeSave() {
  if (!ST) return;
  try { localStorage.setItem(STORE_KEY, JSON.stringify(ST)); }
  catch (e) { /* quota ou mode privé : l'application continue de fonctionner en mémoire */ }
}

function storeReset() {
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  ST = BLANK();
}

/* Accès unique à l'état persistant */
function st() { return storeLoad(); }

/* -------------------------------------------------------------------------
   Tentatives idempotentes
   La clé est déterministe : même question, même mode, même session de travail
   → une seule tentative, quel que soit le nombre de clics ou de rechargements.
   ------------------------------------------------------------------------- */
function attemptKey(qid, mode, session) { return [mode || 'libre', session || 'x', qid].join('|'); }

function recordAttempt(o) {
  const s = st();
  const key = attemptKey(o.qid, o.mode, o.session);
  const existing = s.attempts.find(a => a.key === key);
  if (existing) {                       // double soumission : on met à jour, on ne duplique pas
    existing.answer = o.answer;
    existing.correct = o.correct;
    existing.certitude = o.certitude;
    existing.ts = o.ts || existing.ts;
    storeSave();
    return { attempt: existing, created: false };
  }
  const a = {
    key, qid: o.qid, ep: o.ep || null, sub: o.sub || null,
    answer: o.answer, correct: !!o.correct, certitude: o.certitude || null,
    ts: o.ts || nowTs(), mode: o.mode || 'libre'
  };
  s.attempts.push(a);
  storeSave();
  return { attempt: a, created: true };
}

/* Horodatage : une seule source, pour rester testable */
function nowTs() { return Date.now(); }
function dayMs() { return 86400000; }
