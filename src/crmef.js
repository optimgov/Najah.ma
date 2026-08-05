/* =========================================================================
   NAJAH.ma — Référentiel officiel du concours CRMEF
   Source : descriptifs du Centre national des examens, session de novembre 2025.
   مباريات ولوج سلك تأهيل أطر التدريس بالمراكز الجهوية لمهن التربية والتكوين

   RÈGLE DE CE FICHIER : rien n'est écrit ici qui ne figure pas dans le
   descriptif officiel. Les informations non communiquées — nombre de
   questions, barème détaillé, règles de navigation, seuil d'admission —
   sont explicitement marquées NON_COMMUNIQUE et jamais devinées.
   ========================================================================= */

const NC = 'NON_COMMUNIQUE';

DATA.crmef = {
  concours: {
    id: 'crmef',
    titleOfficial: "Concours d'accès au cycle de qualification des cadres enseignants des CRMEF",
    titleShort: 'Concours CRMEF',
    titleAr: 'مباريات ولوج سلك تأهيل أطر التدريس بالمراكز الجهوية لمهن التربية والتكوين',
    session: 'Session de novembre 2025',
    sourceRef: 'Centre national des examens — descriptifs des épreuves',
    sourceVersion: 'Novembre 2025',
    notThis: [
      "l'accès aux Licences d'Éducation, qui se prépare juste après le baccalauréat",
      "l'agrégation, qui relève d'un concours distinct",
      "un concours générique d'accès à l'université",
      "un programme de formation continue"
    ],
    // Informations volontairement absentes du descriptif
    unknown: {
      questionCount: NC,
      bareme: NC,
      navigation: NC,
      admissionThreshold: NC
    }
  },

  /* ---------------- Les trois épreuves du parcours Français ---------------- */
  epreuves: [
    {
      id: 'SE', serie: 1,
      name: "Sciences de l'éducation",
      coef: 8, minutes: 120, format: 'QCM',
      langue: 'Arabe ou français, au choix du candidat',
      langueChoice: true,
      domains: [
        {
          id: 'SE-D1', name: "Psychologie de l'éducation", weight: 40,
          sub: [
            { id: 'SE-D1-1', name: 'Psychologie du développement', weight: 20 },
            { id: 'SE-D1-2', name: "Psychologie de l'apprentissage", weight: 20 }
          ]
        },
        {
          id: 'SE-D2', name: "Approches pédagogiques et méthodes d'enseignement", weight: 30,
          sub: [
            { id: 'SE-D2-1', name: "De la pédagogie par objectifs à l'approche par compétences", weight: 15 },
            { id: 'SE-D2-2', name: "Méthodes d'enseignement et stratégies d'apprentissage", weight: 15 }
          ]
        },
        {
          id: 'SE-D3', name: "Sociologie de l'éducation", weight: 30,
          sub: [
            { id: 'SE-D3-1', name: "Sociologie de l'éducation", weight: 15 },
            { id: 'SE-D3-2', name: 'Dynamique des groupes', weight: 15 }
          ]
        }
      ]
    },
    {
      id: 'DID', serie: 2,
      name: 'Didactique de la langue française',
      coef: 12, minutes: 120, format: 'QCM',
      langue: 'Français',
      langueChoice: false,
      domains: [
        {
          id: 'DID-D1', name: 'Didactique, curriculum et ressources', weight: 60,
          sub: [
            { id: 'DID-D1-1', name: 'Champ de la didactique', weight: 10 },
            { id: 'DID-D1-2', name: 'Concepts fondamentaux de la didactique', weight: 20 },
            { id: 'DID-D1-3', name: 'Curriculum', weight: 10 },
            { id: 'DID-D1-4', name: 'Ressources didactiques et usages pédagogiques', weight: 20 }
          ]
        },
        {
          id: 'DID-D2', name: 'Approches et démarches', weight: 40,
          sub: [
            { id: 'DID-D2-1', name: 'Concepts clés de la pédagogie par objectifs', weight: 5 },
            { id: 'DID-D2-2', name: 'Fondements et mise en œuvre de la PPO', weight: 10 },
            { id: 'DID-D2-3', name: "Concepts clés de l'approche par compétences", weight: 5 },
            { id: 'DID-D2-4', name: "Fondements et mise en œuvre de l'APC", weight: 10 },
            { id: 'DID-D2-5', name: 'Apprentissage actif', weight: 10 }
          ]
        }
      ]
    },
    {
      id: 'SPE', serie: 3,
      name: 'Spécialité — Langue française',
      coef: 20, minutes: 240, format: 'QCM',
      langue: 'Français',
      langueChoice: false,
      domains: [
        {
          id: 'SPE-D1', name: 'Langue', weight: 50,
          sub: [
            { id: 'SPE-D1-1', name: 'Linguistique, phonétique, lexicographie et lexicologie', weight: 15 },
            { id: 'SPE-D1-2', name: 'Grammaire', weight: 15 },
            { id: 'SPE-D1-3', name: 'Stylistique', weight: 10 },
            { id: 'SPE-D1-4', name: 'Analyse du discours et énonciation', weight: 10 }
          ]
        },
        {
          id: 'SPE-D2', name: 'Littérature et culture françaises', weight: 50,
          sub: [
            { id: 'SPE-D2-1', name: 'Histoire des idées, histoire littéraire et mythes', weight: 5 },
            { id: 'SPE-D2-2', name: 'Roman et genres du récit', weight: 10 },
            { id: 'SPE-D2-3', name: 'Analyse du texte narratif', weight: 10 },
            { id: 'SPE-D2-4', name: 'Théâtre', weight: 10 },
            { id: 'SPE-D2-5', name: 'Poésie et versification', weight: 10 },
            { id: 'SPE-D2-6', name: "Littérature maghrébine d'expression française", weight: 5 }
          ]
        }
      ]
    }
  ],

  /* ---------------- Cycles couverts par le descriptif Français ---------------- */
  cycles: [
    { id: 'college', name: 'Secondaire collégial' },
    { id: 'qualifiant', name: 'Secondaire qualifiant' }
  ],

  /* ---------------- Sources officielles versionnées ---------------- */
  sources: [
    { id: 'SRC-SEC-25', ref: 'Descriptifs des épreuves — enseignement secondaire', org: 'Centre national des examens',
      version: 'Session de novembre 2025', file: 'Wolouj_Descriptifs_Secondaire_25', status: 'officielle', checked: '5 août 2026' },
    { id: 'SRC-PRIM-BIL-25', ref: 'Descriptifs des épreuves — primaire bilingue', org: 'Centre national des examens',
      version: 'Session de novembre 2025', file: 'Wolouj_Descriptifs_Primaire_Bilingue_25', status: 'officielle', checked: '5 août 2026' },
    { id: 'SRC-PRIM-AMZ-25', ref: 'Descriptifs des épreuves — primaire amazighe', org: 'Centre national des examens',
      version: 'Session de novembre 2025', file: 'Wolouj_Descriptifs_Primaire_Amazighe_25', status: 'officielle', checked: '5 août 2026' }
  ],

  /* ---------------- Statuts éditoriaux ---------------- */
  editStatus: {
    brouillon:    { label: 'Brouillon', kind: 'outline', usable: false },
    a_verifier:   { label: 'À vérifier', kind: 'warn', usable: true, demoOnly: true },
    valide:       { label: 'Validé pédagogiquement', kind: 'good', usable: true },
    publie:       { label: 'Publié', kind: 'good', usable: true },
    retire:       { label: 'Retiré', kind: 'crit', usable: false },
    complementaire: { label: 'Contenu complémentaire', kind: 'terra', usable: true, offBlueprint: true }
  },

  /* ---------------- États de maîtrise ---------------- */
  masteryStates: [
    { id: 'non_evaluee', label: 'Non évaluée', color: 'var(--ink-3)', order: 0 },
    { id: 'fragile', label: 'Fragile', color: 'var(--critical)', order: 1 },
    { id: 'en_cours', label: "En cours d'acquisition", color: 'var(--sem-trap)', order: 2 },
    { id: 'a_consolider', label: 'À consolider', color: 'var(--warn)', order: 3 },
    { id: 'consolidee', label: 'Consolidée', color: 'var(--good)', order: 4 }
  ]
};

/* =========================================================================
   AUDIT DES 26 QUESTIONS EXISTANTES
   Chaque question est rattachée au descriptif officiel lorsque le
   rattachement est justifiable. Les identifiants sont préservés.
   Quatre issues possibles :
     - rattachement direct à un sous-domaine officiel
     - rattachement prudent, signalé par `prudence`
     - contenu complémentaire, hors descriptif 2025
     - non rattachable
   Aucune question n'est supprimée.
   ========================================================================= */
DATA.crmefAudit = {
  /* --- Sciences de l'éducation --- */
  Q001: { ep: 'SE', sub: 'SE-D1-1', edit: 'a_verifier', note: "Stades de Piaget — psychologie du développement, rattachement direct." },
  Q002: { ep: 'SE', sub: 'SE-D1-2', edit: 'a_verifier', note: "Zone proximale de développement — psychologie de l'apprentissage, rattachement direct." },
  Q003: { ep: 'SE', sub: 'SE-D2-1', edit: 'a_verifier', prudence: true,
          note: "Fonctions de l'évaluation. Le descriptif 2025 ne mentionne pas la docimologie comme sous-domaine autonome ; rattachement prudent au passage PPO → APC, où l'évaluation formative est centrale." },
  Q004: { ep: 'SE', sub: 'SE-D2-1', edit: 'a_verifier', prudence: true,
          note: "Grille critériée. Même réserve que Q003 : rattaché à la PPO/APC faute de sous-domaine évaluation." },
  Q005: { ep: 'SE', sub: 'SE-D2-2', edit: 'a_verifier', note: "Pédagogie de projet — méthodes d'enseignement, rattachement direct." },
  Q006: { ep: 'SE', sub: 'SE-D3-2', edit: 'a_verifier', prudence: true,
          note: "Gestion de classe et consignes. Rattaché à la dynamique des groupes, le descriptif ne prévoyant pas de sous-domaine « gestion de classe »." },
  Q007: { ep: null, sub: null, edit: 'complementaire',
          note: "Vision stratégique 2015-2030. La législation et l'organisation du système ne figurent PAS dans le descriptif 2025 de sciences de l'éducation. Conservée comme contenu complémentaire, exclue des simulations." },
  Q008: { ep: null, sub: null, edit: 'complementaire',
          note: "Rôle des AREF. Même motif que Q007 : organisation administrative absente du descriptif 2025." },
  Q020: { ep: 'SE', sub: 'SE-D2-2', edit: 'a_verifier', note: "Pédagogie différenciée — méthodes d'enseignement et stratégies d'apprentissage." },
  Q022: { ep: 'SE', sub: 'SE-D2-1', edit: 'a_verifier', prudence: true,
          note: "Formulation d'objectifs opérationnels — cœur de la pédagogie par objectifs, rattachement justifié." },
  Q025: { ep: 'SE', sub: 'SE-D2-1', edit: 'a_verifier', prudence: true,
          note: "Validité docimologique. Même réserve que Q003." },

  /* --- Didactique --- */
  Q009: { ep: 'DID', sub: 'DID-D1-2', edit: 'a_verifier', note: "Transposition didactique — concept fondamental de la didactique, rattachement direct." },
  Q010: { ep: 'DID', sub: 'DID-D1-2', edit: 'a_verifier', prudence: true,
          note: "Analyse d'erreur d'élève. Le descriptif ne prévoit pas de sous-domaine « obstacles » ; rattaché aux concepts fondamentaux, où figure le statut de l'erreur." },
  Q011: { ep: 'DID', sub: 'DID-D2-4', edit: 'a_verifier', note: "Situation-problème — mise en œuvre de l'APC." },
  Q012: { ep: 'DID', sub: 'DID-D1-4', edit: 'a_verifier', prudence: true,
          note: "Lecture méthodique. Rattaché aux ressources didactiques et usages pédagogiques ; le descriptif 2025 ne découpe pas la didactique par activité langagière." },
  Q013: { ep: 'DID', sub: 'DID-D2-5', edit: 'a_verifier', prudence: true,
          note: "Réécritures guidées en production écrite. Rattaché à l'apprentissage actif." },
  Q021: { ep: 'DID', sub: 'DID-D1-2', edit: 'a_verifier', note: "Statut de l'erreur selon Astolfi — concept fondamental de la didactique." },
  Q023: { ep: 'DID', sub: 'DID-D1-4', edit: 'a_verifier', prudence: true,
          note: "Compréhension en lecture. Même réserve que Q012." },
  Q026: { ep: 'DID', sub: 'DID-D2-4', edit: 'a_verifier', note: "Tâche complexe et situation d'intégration — mise en œuvre de l'APC." },

  /* --- Spécialité --- */
  Q014: { ep: 'SPE', sub: 'SPE-D1-2', edit: 'a_verifier', note: "Subordonnée relative et accord du participe — grammaire, rattachement direct." },
  Q015: { ep: 'SPE', sub: 'SPE-D1-2', edit: 'a_verifier', note: "Inversion du sujet — grammaire, rattachement direct." },
  Q016: { ep: 'SPE', sub: 'SPE-D2-5', edit: 'a_verifier', note: "Métaphore chez Valéry — poésie et versification." },
  Q017: { ep: 'SPE', sub: 'SPE-D2-3', edit: 'a_verifier', note: "Focalisation narrative — analyse du texte narratif, rattachement direct." },
  Q018: { ep: 'SPE', sub: 'SPE-D2-1', edit: 'a_verifier', note: "Mouvements littéraires — histoire des idées et histoire littéraire." },
  Q019: { ep: 'SPE', sub: 'SPE-D1-2', edit: 'a_verifier', prudence: true,
          note: "Orthographe et conjugaison. Le descriptif ne prévoit pas de sous-domaine orthographe ; rattaché à la grammaire." },
  Q024: { ep: 'SPE', sub: 'SPE-D2-6', edit: 'a_verifier', note: "Littérature marocaine d'expression française — rattachement direct au sous-domaine officiel." }
};

/* ---------------- Application de l'audit aux questions ---------------- */
(function applyAudit() {
  Object.entries(DATA.crmefAudit).forEach(([qid, a]) => {
    const q = DATA.questions.find(x => x.id === qid);
    if (!q) return;
    q.ep = a.ep; q.sub = a.sub; q.edit = a.edit;
    q.prudence = !!a.prudence; q.auditNote = a.note;
    q.srcId = 'SRC-SEC-25';
  });
  // Toute question CRMEF non auditée reste identifiable
  DATA.questions.filter(q => q.prog === 'crmef' && !q.edit)
    .forEach(q => { q.edit = 'brouillon'; q.auditNote = 'Non auditée.'; });
})();

/* ---------------- Aides de navigation dans le référentiel ---------------- */
const EP = id => DATA.crmef.epreuves.find(e => e.id === id);
const ALL_SUBS = () => DATA.crmef.epreuves.flatMap(e =>
  e.domains.flatMap(d => d.sub.map(s => ({ ...s, ep: e.id, epName: e.name, dom: d.id, domName: d.name, domWeight: d.weight, serie: e.serie }))));
const SUB = id => ALL_SUBS().find(s => s.id === id);
const DOM = id => DATA.crmef.epreuves.flatMap(e => e.domains).find(d => d.id === id);

/* Questions réellement utilisables pour une évaluation rattachée au blueprint */
function subQuestions(subId, opts) {
  opts = opts || {};
  return DATA.questions.filter(q => q.sub === subId
    && (opts.includeUnverified !== false)
    && DATA.crmef.editStatus[q.edit] && DATA.crmef.editStatus[q.edit].usable
    && !DATA.crmef.editStatus[q.edit].offBlueprint);
}
function epQuestions(epId) {
  return DATA.questions.filter(q => q.ep === epId
    && DATA.crmef.editStatus[q.edit] && DATA.crmef.editStatus[q.edit].usable
    && !DATA.crmef.editStatus[q.edit].offBlueprint);
}
/* Couverture réelle : part des sous-domaines disposant d'au moins une question */
function epCoverage(epId) {
  const subs = ALL_SUBS().filter(s => s.ep === epId);
  const covered = subs.filter(s => subQuestions(s.id).length > 0);
  const weightCovered = covered.reduce((a, s) => a + s.weight, 0);
  return {
    subs: subs.length, covered: covered.length,
    questions: epQuestions(epId).length,
    weightPct: weightCovered,                       // % du programme officiel couvert en poids
    missing: subs.filter(s => subQuestions(s.id).length === 0)
  };
}
function crmefCoverage() {
  return DATA.crmef.epreuves.map(e => ({ ep: e, ...epCoverage(e.id) }));
}

/* =========================================================================
   QUESTIONS DE DÉMONSTRATION — sous-domaines officiels sans contenu
   Neuf questions, une par sous-domaine parmi les plus lourds, pour que la
   Boucle Najah soit démontrable sur les trois épreuves.
   Toutes en statut « à vérifier » : elles n'ont PAS été validées par un
   expert et ne peuvent pas être présentées comme du contenu certifié.
   Deux sous-domaines restent volontairement vides — les combler
   artificiellement masquerait une lacune réelle.
   ========================================================================= */
DATA.questions.push(
  { id: 'C101', prog: 'crmef', ep: 'SE', sub: 'SE-D3-1', comp: 'SE2', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Comprendre', diff: 3, time: 85,
    stem: "En sociologie de l'éducation, que désigne la notion de « reproduction sociale » appliquée à l'école ?",
    choices: [
      { k: 'A', t: "La transmission des programmes d'une génération d'enseignants à l'autre" },
      { k: 'B', t: "Le mécanisme par lequel l'école tend à reconduire les positions sociales d'origine des élèves" },
      { k: 'C', t: "Le redoublement d'une classe par un élève en difficulté" },
      { k: 'D', t: "L'augmentation du nombre d'élèves scolarisés d'une année sur l'autre" }
    ],
    correct: 'B',
    rationales: {
      A: "La transmission professionnelle entre enseignants relève de la formation et de la culture de métier, pas de l'analyse sociologique des inégalités.",
      B: "Exact. La notion désigne le fait que l'école, en valorisant des codes culturels inégalement répartis, tend à confirmer les hiérarchies sociales plutôt qu'à les corriger.",
      C: "Le redoublement est une décision pédagogique individuelle. Il peut être un effet du mécanisme décrit, il n'en est pas la définition.",
      D: "La croissance des effectifs relève de la démographie scolaire. Elle ne dit rien de la transmission des positions sociales."
    },
    trap: "C attire parce que le mot « reproduction » évoque « redoubler ». Le terme sociologique désigne un mécanisme collectif, pas un parcours individuel.",
    source: { ref: 'Descriptif officiel — Sciences de l\'éducation, domaine 3', loc: "Sociologie de l'éducation", date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.5, distractors: { A: 0.1, B: 0.5, C: 0.3, D: 0.1 } } },

  { id: 'C102', prog: 'crmef', ep: 'DID', sub: 'DID-D1-1', comp: 'DI1', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Comprendre', diff: 2, time: 75,
    stem: "Qu'est-ce qui distingue le champ de la didactique de celui de la pédagogie ?",
    choices: [
      { k: 'A', t: "La didactique s'intéresse aux savoirs à enseigner, la pédagogie à la relation et à la conduite de la classe" },
      { k: 'B', t: "La didactique concerne le secondaire, la pédagogie le primaire" },
      { k: 'C', t: "La didactique est théorique, la pédagogie est pratique" },
      { k: 'D', t: "Ce sont deux mots pour désigner la même discipline" }
    ],
    correct: 'A',
    rationales: {
      A: "Exact. La didactique prend pour objet le savoir et sa transformation en objet enseignable ; la pédagogie prend pour objet la relation éducative et l'organisation de la classe.",
      B: "Aucune des deux disciplines n'est indexée sur un cycle. Les deux concernent tous les niveaux d'enseignement.",
      C: "Les deux comportent une dimension théorique et une dimension pratique. L'opposition théorie/pratique ne recoupe pas la distinction entre les deux champs.",
      D: "Les deux champs se recoupent mais ne se confondent pas : c'est précisément l'objet — le savoir ou la relation — qui les sépare."
    },
    trap: "C est le distracteur dominant : l'opposition théorie/pratique est un réflexe de pensée qui masque la vraie ligne de partage, celle de l'objet d'étude.",
    source: { ref: 'Descriptif officiel — Didactique, domaine 1', loc: 'Champ de la didactique', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.55, distractors: { A: 0.55, B: 0.05, C: 0.3, D: 0.1 } } },

  { id: 'C103', prog: 'crmef', ep: 'DID', sub: 'DID-D1-3', comp: 'DI1', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Analyser', diff: 3, time: 90,
    stem: "Quelle distinction sépare le curriculum prescrit du curriculum réel ?",
    choices: [
      { k: 'A', t: "Le prescrit est officiel, le réel est ce qui est effectivement enseigné et appris en classe" },
      { k: 'B', t: "Le prescrit concerne les matières, le réel concerne les horaires" },
      { k: 'C', t: "Le prescrit est écrit en arabe, le réel en français" },
      { k: 'D', t: "Le prescrit est annuel, le réel est trimestriel" }
    ],
    correct: 'A',
    rationales: {
      A: "Exact. Le curriculum prescrit est le texte officiel ; le curriculum réel est ce qui se déroule effectivement, filtré par l'enseignant, le temps disponible et le contexte de classe.",
      B: "Matières et horaires figurent tous deux dans le curriculum prescrit. La distinction porte sur le prescrit et le vécu, pas sur la nature des contenus.",
      C: "La langue d'un texte curriculaire ne définit aucun niveau de curriculum.",
      D: "Le découpage temporel relève de la planification, qui appartient au curriculum prescrit."
    },
    trap: "L'écart entre prescrit et réel est la notion évaluée. Les distracteurs proposent des découpages plausibles mais étrangers à cette distinction.",
    source: { ref: 'Descriptif officiel — Didactique, domaine 1', loc: 'Curriculum', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.6, distractors: { A: 0.6, B: 0.22, C: 0.06, D: 0.12 } } },

  { id: 'C104', prog: 'crmef', ep: 'DID', sub: 'DID-D2-2', comp: 'DI1', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Appliquer', diff: 3, time: 90,
    stem: "Dans la mise en œuvre de la pédagogie par objectifs, quelle critique majeure a conduit à son dépassement par l'approche par compétences ?",
    choices: [
      { k: 'A', t: "Elle exigeait trop de matériel pédagogique" },
      { k: 'B', t: "Le découpage en objectifs élémentaires fragmente l'apprentissage et néglige la mobilisation en situation" },
      { k: 'C', t: "Elle ne permettait pas d'évaluer les élèves" },
      { k: 'D', t: "Elle était réservée à l'enseignement technique" }
    ],
    correct: 'B',
    rationales: {
      A: "Le coût matériel n'a jamais constitué l'argument théorique du dépassement. La PPO est au contraire peu exigeante en ressources.",
      B: "Exact. La taxonomie d'objectifs découpe si finement les apprentissages que l'élève peut réussir chaque micro-objectif sans savoir mobiliser l'ensemble face à une situation nouvelle.",
      C: "C'est l'inverse : la PPO a précisément apporté une évaluation très outillée, objectif par objectif. C'est même ce qui a fait son succès initial.",
      D: "La PPO a été appliquée à l'ensemble des disciplines et des cycles, bien au-delà de l'enseignement technique."
    },
    trap: "C est choisi par confusion : on retient que l'APC a renouvelé l'évaluation, et on en déduit à tort que la PPO n'en avait pas.",
    source: { ref: 'Descriptif officiel — Didactique, domaine 2', loc: 'Fondements et mise en œuvre de la PPO', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.52, distractors: { A: 0.07, B: 0.52, C: 0.31, D: 0.1 } } },

  { id: 'C105', prog: 'crmef', ep: 'SPE', sub: 'SPE-D1-1', comp: 'SP1', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Comprendre', diff: 3, time: 85,
    stem: "En phonétique, qu'est-ce qui distingue un phonème d'un allophone ?",
    choices: [
      { k: 'A', t: "Le phonème est une unité distinctive, l'allophone une réalisation qui ne change pas le sens" },
      { k: 'B', t: "Le phonème s'écrit, l'allophone se prononce" },
      { k: 'C', t: "Le phonème appartient au français, l'allophone aux langues étrangères" },
      { k: 'D', t: "Le phonème est une consonne, l'allophone une voyelle" }
    ],
    correct: 'A',
    rationales: {
      A: "Exact. Le phonème est la plus petite unité capable de changer le sens d'un mot ; l'allophone est une variante de réalisation d'un même phonème, sans effet distinctif.",
      B: "La distinction est phonologique, non graphique. Le graphème relève de l'écriture, il n'entre pas dans cette opposition.",
      C: "La distinction phonème/allophone s'applique à toutes les langues, y compris au français.",
      D: "La nature consonantique ou vocalique est indépendante de cette opposition : consonnes et voyelles ont chacune leurs phonèmes et leurs allophones."
    },
    trap: "B repose sur la confusion la plus répandue en linguistique : celle du son et de la lettre, du phonème et du graphème.",
    source: { ref: 'Descriptif officiel — Spécialité, domaine 1', loc: 'Linguistique, phonétique, lexicographie et lexicologie', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.58, distractors: { A: 0.58, B: 0.27, C: 0.05, D: 0.1 } } },

  { id: 'C106', prog: 'crmef', ep: 'SPE', sub: 'SPE-D1-3', comp: 'SP2', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Analyser', diff: 3, time: 90,
    ctx: "« Le vent se lève… il faut tenter de vivre ! »",
    stem: "Quel procédé stylistique domine dans ce vers ?",
    choices: [
      { k: 'A', t: "Une anaphore" },
      { k: 'B', t: "Une antithèse" },
      { k: 'C', t: "Une progression de l'observation vers l'injonction, marquée par le passage à l'exclamative" },
      { k: 'D', t: "Une prétérition" }
    ],
    correct: 'C',
    rationales: {
      A: "L'anaphore répète un même terme en tête de segments successifs. Aucune répétition initiale n'apparaît ici.",
      B: "L'antithèse oppose deux termes contraires. « Se lève » et « vivre » vont dans le même sens, celui de l'élan.",
      C: "Exact. Le vers passe d'un constat au présent d'observation à une injonction impersonnelle, et la ponctuation exclamative marque ce basculement modal.",
      D: "La prétérition consiste à annoncer que l'on tait ce que l'on énonce malgré tout. Rien de tel ici."
    },
    trap: "En stylistique, les candidats cherchent une figure nommable et passent à côté des mouvements d'ensemble — modalité, rythme, ponctuation — qui sont pourtant l'essentiel de l'analyse attendue.",
    source: { ref: 'Descriptif officiel — Spécialité, domaine 1', loc: 'Stylistique', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.45, distractors: { A: 0.12, B: 0.28, C: 0.45, D: 0.15 } } },

  { id: 'C107', prog: 'crmef', ep: 'SPE', sub: 'SPE-D1-4', comp: 'SP2', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Analyser', diff: 3, time: 95,
    stem: "En théorie de l'énonciation, que désignent les « embrayeurs » ou déictiques ?",
    choices: [
      { k: 'A', t: "Les connecteurs logiques qui articulent le raisonnement" },
      { k: 'B', t: "Les éléments dont le référent ne se détermine que par la situation d'énonciation, comme « je », « ici », « maintenant »" },
      { k: 'C', t: "Les figures de style qui relancent l'attention du lecteur" },
      { k: 'D', t: "Les marques de ponctuation expressive" }
    ],
    correct: 'B',
    rationales: {
      A: "Les connecteurs organisent la logique du discours. Leur sens ne dépend pas de la situation d'énonciation, mais de la relation entre propositions.",
      B: "Exact. Un déictique n'a de référent qu'ancré dans la situation : « je » désigne celui qui parle, « ici » le lieu où il parle, « maintenant » l'instant de sa parole.",
      C: "Les figures relèvent de la rhétorique. Elles ne se définissent pas par leur dépendance à la situation d'énonciation.",
      D: "La ponctuation peut marquer une expressivité, mais elle ne constitue pas une catégorie énonciative au sens des embrayeurs."
    },
    trap: "A attire par la proximité du mot « embrayeur », qui évoque une articulation. Le critère décisif est la dépendance au contexte d'énonciation, non la fonction de liaison.",
    source: { ref: 'Descriptif officiel — Spécialité, domaine 1', loc: "Analyse du discours et énonciation", date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.5, distractors: { A: 0.3, B: 0.5, C: 0.12, D: 0.08 } } },

  { id: 'C108', prog: 'crmef', ep: 'SPE', sub: 'SPE-D2-2', comp: 'SP3', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Comprendre', diff: 2, time: 80,
    stem: "Quelle caractéristique définit le roman d'apprentissage ?",
    choices: [
      { k: 'A', t: "Il se déroule obligatoirement en milieu scolaire" },
      { k: 'B', t: "Il retrace la formation progressive d'un personnage jeune au contact du monde" },
      { k: 'C', t: "Il est toujours écrit à la première personne" },
      { k: 'D', t: "Il comporte une morale explicite en conclusion" }
    ],
    correct: 'B',
    rationales: {
      A: "Le cadre scolaire est anecdotique. L'apprentissage dont il s'agit est celui de la vie sociale et sentimentale, pas celui de l'école.",
      B: "Exact. Le genre suit la trajectoire d'un personnage jeune dont les épreuves successives transforment le rapport au monde et à soi.",
      C: "Le récit peut être à la première comme à la troisième personne. Le choix énonciatif ne définit pas le genre.",
      D: "La morale explicite caractérise l'apologue ou la fable. Le roman d'apprentissage laisse le plus souvent le lecteur tirer ses conclusions."
    },
    trap: "A est choisi par littéralité : le mot « apprentissage » évoque l'école, alors qu'il désigne ici une formation existentielle.",
    source: { ref: 'Descriptif officiel — Spécialité, domaine 2', loc: 'Roman et genres du récit', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.68, distractors: { A: 0.18, B: 0.68, C: 0.08, D: 0.06 } } },

  { id: 'C109', prog: 'crmef', ep: 'SPE', sub: 'SPE-D2-4', comp: 'SP2', edit: 'a_verifier', srcId: 'SRC-SEC-25',
    cog: 'Comprendre', diff: 2, time: 80,
    stem: "Au théâtre, que désigne la « double énonciation » ?",
    choices: [
      { k: 'A', t: "Le fait qu'un personnage parle à la fois à un autre personnage et au public" },
      { k: 'B', t: "La présence de deux personnages sur scène" },
      { k: 'C', t: "La reprise d'une même réplique à deux moments de la pièce" },
      { k: 'D', t: "L'alternance entre vers et prose" }
    ],
    correct: 'A',
    rationales: {
      A: "Exact. Toute réplique s'adresse simultanément au destinataire interne — le personnage — et au destinataire externe — le spectateur, qui reçoit une information que le personnage ignore parfois.",
      B: "Le nombre de personnages en scène relève de la composition dramatique, pas du régime énonciatif.",
      C: "La reprise d'une réplique est un procédé de composition, un écho ou un leitmotiv, sans rapport avec la double destination de la parole.",
      D: "L'alternance des formes versifiée et prosaïque est un choix stylistique, indépendant de l'énonciation théâtrale."
    },
    trap: "B est choisi par lecture littérale du mot « double », qu'on rapporte au nombre de locuteurs plutôt qu'au nombre de destinataires.",
    source: { ref: 'Descriptif officiel — Spécialité, domaine 2', loc: 'Théâtre', date: 'Session de novembre 2025' },
    stats: { seen: 0, correct: 0.62, distractors: { A: 0.62, B: 0.24, C: 0.08, D: 0.06 } } }
);

/* Les deux sous-domaines encore vides sont assumés : DID-D2-1 et DID-D2-3.
   Les combler par des questions non validées reviendrait à masquer une lacune. */
DATA.crmefGapsAccepted = ['DID-D2-1', 'DID-D2-3'];
