/* =========================================================================
   NAJAH.ma — Données simulées
   Contenu CRMEF réaliste. Aucune donnée réelle de candidat.
   Tout passe par services.js : aucun écran n'accède directement à DATA.
   ========================================================================= */

const DATA = {};

/* ------------------------------------------------------------------ */
/* Catalogue de concours                                              */
/* ------------------------------------------------------------------ */
DATA.families = [
  {
    id: 'crmef', group: 'education', live: true,
    name: "CRMEF — Cycle de préparation à l'agrégation et à l'enseignement",
    short: 'CRMEF',
    tagline: "Centres régionaux des métiers de l'éducation et de la formation",
    desc: "Concours d'accès aux CRMEF pour la formation des enseignants du primaire, du collège et du qualifiant. Épreuves écrites de sciences de l'éducation, de didactique et de spécialité, puis épreuve orale.",
    places: '19 000 places annoncées en 2025 (source ministérielle secondaire)',
    icon: 'cap',
    specialties: [
      { id: 'fr-sq', name: 'Français — secondaire qualifiant', live: true, candidates: '≈ 8 400 candidats/session', items: 412 },
      { id: 'math-sq', name: 'Mathématiques — secondaire qualifiant', live: true, candidates: '≈ 6 900 candidats/session', items: 388 },
      { id: 'ar-sc', name: 'Arabe — secondaire collégial', live: false },
      { id: 'svt-sq', name: 'SVT — secondaire qualifiant', live: false },
      { id: 'prim', name: 'Enseignement primaire — polyvalent', live: false },
      { id: 'angl-sq', name: 'Anglais — secondaire qualifiant', live: false }
    ]
  },
  {
    id: 'inspection', group: 'education', live: false,
    name: "Inspection de l'enseignement", short: 'Inspection', icon: 'compass',
    tagline: 'Concours de recrutement des inspecteurs pédagogiques',
    desc: "Accès au cycle de formation des inspecteurs. Épreuves d'expertise pédagogique, d'encadrement et de législation scolaire.",
    specialties: [{ id: 'insp-peda', name: 'Inspection pédagogique', live: false }, { id: 'insp-plan', name: 'Planification et orientation', live: false }]
  },
  {
    id: 'agregation', group: 'education', live: false,
    name: "Agrégation", short: 'Agrégation', icon: 'book',
    tagline: 'Concours national d\'agrégation',
    desc: "Concours de haut niveau disciplinaire ouvrant l'accès aux classes préparatoires et au qualifiant.",
    specialties: [{ id: 'agr-fr', name: 'Agrégation de français', live: false }, { id: 'agr-math', name: 'Agrégation de mathématiques', live: false }]
  },
  {
    id: 'medecine', group: 'postbac', live: false,
    name: 'Concours de médecine et pharmacie', short: 'Médecine', icon: 'stethoscope',
    tagline: 'FMP Rabat, Casablanca, Marrakech, Fès, Oujda, Agadir',
    desc: "Concours national d'accès aux facultés de médecine et de pharmacie. Épreuves de sciences fondamentales et de raisonnement.",
    specialties: [{ id: 'med-nat', name: 'Concours national de médecine', live: false }]
  },
  {
    id: 'ingenieur', group: 'postbac', live: false,
    name: "Écoles d'ingénieurs", short: 'Ingénieur', icon: 'gear',
    tagline: 'ENSA, ENSAM, EMI, INPT, EHTP',
    desc: "Concours communs d'accès aux écoles nationales d'ingénieurs après baccalauréat ou classes préparatoires.",
    specialties: [{ id: 'ensa', name: 'Concours ENSA', live: false }, { id: 'cnc', name: 'CNC — filière MP/PSI', live: false }]
  },
  {
    id: 'commerce', group: 'postbac', live: false,
    name: 'Écoles de commerce et de gestion', short: 'Commerce', icon: 'chart',
    tagline: 'ENCG, ISCAE',
    desc: "Concours d'accès aux écoles nationales de commerce et de gestion.",
    specialties: [{ id: 'tafem', name: 'TAFEM — ENCG', live: false }, { id: 'iscae', name: 'ISCAE', live: false }]
  },
  {
    id: 'administration', group: 'pro', live: false,
    name: 'Concours administratifs', short: 'Administration', icon: 'columns',
    tagline: 'Administrateurs, rédacteurs, techniciens',
    desc: "Concours de recrutement dans la fonction publique : culture générale, droit administratif, note de synthèse.",
    specialties: [{ id: 'admin-2', name: 'Administrateur 2ᵉ grade', live: false }]
  },
  {
    id: 'sante', group: 'pro', live: false,
    name: 'Professions de santé — ISPITS', short: 'ISPITS', icon: 'shield',
    tagline: 'Instituts supérieurs des professions infirmières',
    desc: "Concours d'accès aux filières infirmières et techniques de santé.",
    specialties: [{ id: 'ispits-inf', name: 'Soins infirmiers', live: false }]
  }
];

DATA.groups = {
  education: { label: "Métiers de l'éducation", desc: 'Enseignement, inspection, agrégation' },
  postbac: { label: 'Concours post-bac', desc: 'Médecine, ingénieur, commerce' },
  pro: { label: 'Concours professionnels', desc: 'Administration, santé, technique' }
};

/* ------------------------------------------------------------------ */
/* Taxonomie de compétences — 3 piliers                               */
/* ------------------------------------------------------------------ */
DATA.pillars = [
  { id: 'SE', name: "Sciences de l'éducation", serie: 1, desc: "Psychologie du développement, pédagogie, évaluation, planification, législation." },
  { id: 'DI', name: 'Didactique de la discipline', serie: 2, desc: "Transposition didactique, obstacles d'apprentissage, situations et évaluation disciplinaires." },
  { id: 'SP', name: 'Spécialité disciplinaire', serie: 3, desc: 'Maîtrise académique de la matière enseignée.' }
];

DATA.competencies = [
  { id: 'SE1', pillar: 'SE', name: "Psychologie du développement et de l'apprentissage", short: 'Psychologie' },
  { id: 'SE2', pillar: 'SE', name: 'Courants et démarches pédagogiques', short: 'Démarches pédagogiques' },
  { id: 'SE3', pillar: 'SE', name: "Évaluation des apprentissages", short: 'Évaluation' },
  { id: 'SE4', pillar: 'SE', name: 'Planification et gestion de classe', short: 'Planification' },
  { id: 'SE5', pillar: 'SE', name: 'Législation et système éducatif marocain', short: 'Législation' },
  { id: 'DI1', pillar: 'DI', name: 'Transposition didactique et progression', short: 'Transposition' },
  { id: 'DI2', pillar: 'DI', name: "Obstacles d'apprentissage et erreurs des élèves", short: 'Obstacles' },
  { id: 'DI3', pillar: 'DI', name: "Conception de situations d'apprentissage", short: 'Situations' },
  { id: 'DI4', pillar: 'DI', name: 'Didactique de la lecture et de la compréhension', short: 'Lecture' },
  { id: 'DI5', pillar: 'DI', name: "Didactique de la production écrite et de l'oral", short: 'Production' },
  { id: 'SP1', pillar: 'SP', name: 'Grammaire et système de la langue', short: 'Grammaire' },
  { id: 'SP2', pillar: 'SP', name: 'Analyse littéraire et stylistique', short: 'Analyse littéraire' },
  { id: 'SP3', pillar: 'SP', name: 'Histoire littéraire et courants', short: 'Histoire littéraire' },
  { id: 'SP4', pillar: 'SP', name: 'Lexique, orthographe et normes', short: 'Lexique et normes' }
];

const C = id => DATA.competencies.find(c => c.id === id);

/* ------------------------------------------------------------------ */
/* Banque de questions — rationales complètes obligatoires            */
/* ------------------------------------------------------------------ */
/* Chaque question : stem, ctx?, choices[{k,t}], correct, rationales{k:txt},
   trap, source, comp, cog (Restituer|Comprendre|Appliquer|Analyser),
   diff (1..4), time (sec), stats{seen,correct,distractors{}}                */

DATA.questions = [
  {
    id: 'Q001', comp: 'SE1', cog: 'Comprendre', diff: 2, time: 75,
    stem: "Selon Piaget, un élève de 13 ans qui parvient à raisonner sur des hypothèses sans support concret manifeste une capacité caractéristique de quel stade ?",
    choices: [
      { k: 'A', t: 'Stade sensori-moteur' },
      { k: 'B', t: 'Stade préopératoire' },
      { k: 'C', t: 'Stade des opérations concrètes' },
      { k: 'D', t: 'Stade des opérations formelles' }
    ],
    correct: 'D',
    rationales: {
      A: "Le stade sensori-moteur (0-2 ans) concerne la construction de la permanence de l'objet par l'action et la perception. Aucun raisonnement hypothétique n'y est possible.",
      B: "Le stade préopératoire (2-7 ans) est marqué par la pensée symbolique, l'égocentrisme intellectuel et l'absence de réversibilité. L'enfant ne peut pas encore manipuler des opérations logiques.",
      C: "Au stade des opérations concrètes (7-11 ans), l'élève raisonne logiquement mais **uniquement sur des objets ou situations tangibles**. C'est précisément le support concret que l'énoncé exclut.",
      D: "Exact. Le stade des opérations formelles (à partir de 11-12 ans) se définit par le raisonnement hypothético-déductif : l'élève opère sur des propositions et envisage le possible indépendamment du réel."
    },
    trap: "La confusion la plus fréquente porte sur C : on retient l'âge approximatif sans retenir le critère discriminant, qui est la présence ou l'absence de support concret.",
    source: { ref: 'Piaget, La psychologie de l\'intelligence', loc: 'Théorie des stades', date: 'Référentiel SE, module 1' },
    stats: { seen: 3120, correct: 0.61, distractors: { A: 0.03, B: 0.06, C: 0.30, D: 0.61 } }
  },
  {
    id: 'Q002', comp: 'SE1', cog: 'Analyser', diff: 3, time: 95,
    stem: "Un enseignant propose systématiquement à ses élèves des tâches légèrement au-dessus de ce qu'ils réussissent seuls, avec un étayage qu'il retire progressivement. Quel concept théorique cette pratique mobilise-t-elle le plus directement ?",
    choices: [
      { k: 'A', t: "L'assimilation piagétienne" },
      { k: 'B', t: "La zone proximale de développement de Vygotski" },
      { k: 'C', t: "Le conditionnement opérant de Skinner" },
      { k: 'D', t: "L'apprentissage par découverte de Bruner" }
    ],
    correct: 'B',
    rationales: {
      A: "L'assimilation désigne l'intégration d'une information nouvelle dans un schème existant. Elle décrit un mécanisme interne du sujet, pas une organisation de l'intervention de l'enseignant.",
      B: "Exact. La ZPD est l'écart entre ce que l'élève réussit seul et ce qu'il réussit avec l'aide d'autrui. L'étayage retiré progressivement en est l'application pédagogique canonique.",
      C: "Le conditionnement opérant repose sur le renforcement de comportements observables par leurs conséquences. L'énoncé ne mentionne aucun système de récompense ou de sanction.",
      D: "L'apprentissage par découverte insiste sur la construction autonome du savoir par l'élève. Le retrait progressif d'un étayage relève de la médiation, ce qui rattache la situation à Bruner par l'étayage mais à Vygotski par le concept fondateur, plus directement visé ici."
    },
    trap: "D est un distracteur fort : Bruner a effectivement forgé le terme d'étayage. Mais la question demande le concept que la pratique mobilise **le plus directement**, et l'étayage brunérien est lui-même une opérationnalisation de la ZPD.",
    source: { ref: 'Vygotski, Pensée et langage', loc: 'Chapitre 6', date: 'Référentiel SE, module 1' },
    stats: { seen: 2840, correct: 0.48, distractors: { A: 0.07, B: 0.48, C: 0.04, D: 0.41 } }
  },
  {
    id: 'Q003', comp: 'SE3', cog: 'Comprendre', diff: 2, time: 70,
    stem: "Une enseignante fait passer un test en milieu de séquence, ne note pas les copies, et s'en sert pour réorganiser ses groupes de travail. De quelle fonction d'évaluation s'agit-il ?",
    choices: [
      { k: 'A', t: 'Évaluation diagnostique' },
      { k: 'B', t: 'Évaluation formative' },
      { k: 'C', t: 'Évaluation sommative' },
      { k: 'D', t: 'Évaluation certificative' }
    ],
    correct: 'B',
    rationales: {
      A: "L'évaluation diagnostique intervient **en amont** d'une séquence pour identifier les acquis préalables. L'énoncé situe explicitement le test en milieu de séquence.",
      B: "Exact. L'évaluation formative se situe pendant l'apprentissage, ne vise pas la notation, et sert à réguler l'enseignement — ici par une réorganisation des groupes.",
      C: "L'évaluation sommative dresse un bilan à l'issue d'une séquence et donne généralement lieu à une note. Les deux critères sont contredits par l'énoncé.",
      D: "L'évaluation certificative sanctionne officiellement un niveau atteint et engage une décision institutionnelle. Rien de tel ici."
    },
    trap: "L'absence de note ne suffit pas à qualifier une évaluation de formative : c'est la **fonction de régulation** qui la définit. Un test diagnostique peut aussi ne pas être noté.",
    source: { ref: 'De Ketele, Évaluation et régulation', loc: 'Typologie des fonctions', date: 'Référentiel SE, module 3' },
    stats: { seen: 3410, correct: 0.72, distractors: { A: 0.18, B: 0.72, C: 0.07, D: 0.03 } }
  },
  {
    id: 'Q004', comp: 'SE3', cog: 'Analyser', diff: 3, time: 100,
    stem: "Un enseignant construit une grille d'évaluation d'un exposé oral avec quatre critères, chacun décliné en quatre niveaux décrits. Quel avantage principal cette grille apporte-t-elle ?",
    choices: [
      { k: 'A', t: "Elle augmente la moyenne de la classe" },
      { k: 'B', t: "Elle réduit la variabilité inter-correcteurs et rend le jugement explicite" },
      { k: 'C', t: "Elle supprime la nécessité de définir des objectifs d'apprentissage" },
      { k: 'D', t: "Elle garantit l'objectivité complète de la notation" }
    ],
    correct: 'B',
    rationales: {
      A: "Une grille descriptive ne modifie pas mécaniquement le niveau des performances. Elle peut même faire baisser une moyenne en explicitant des exigences jusque-là implicites.",
      B: "Exact. La descriptivité des niveaux réduit la part d'appréciation intuitive, améliore la fidélité entre correcteurs et rend le jugement communicable à l'élève.",
      C: "C'est l'inverse : une grille se construit **à partir** des objectifs et des critères de réussite. Sans objectifs, les niveaux décrits n'ont aucun référent.",
      D: "Aucun instrument ne garantit une objectivité complète en évaluation de performance. La grille réduit la subjectivité ; elle ne l'annule pas. Cette formulation absolue est le marqueur du distracteur."
    },
    trap: "D attire parce qu'il énonce le bénéfice attendu de façon flatteuse. En évaluation, tout énoncé contenant « garantit », « supprime totalement » ou « objectivité complète » doit déclencher la méfiance.",
    source: { ref: 'Scallon, L\'évaluation des apprentissages dans une approche par compétences', loc: 'Chap. 5', date: 'Référentiel SE, module 3' },
    stats: { seen: 2210, correct: 0.66, distractors: { A: 0.02, B: 0.66, C: 0.04, D: 0.28 } }
  },
  {
    id: 'Q005', comp: 'SE2', cog: 'Appliquer', diff: 2, time: 80,
    stem: "Dans une pédagogie de projet, quel élément constitue le critère distinctif par rapport à une simple séquence d'exercices ?",
    choices: [
      { k: 'A', t: "La durée plus longue de la séquence" },
      { k: 'B', t: "Le travail en groupe des élèves" },
      { k: 'C', t: "La production d'un objet socialisé qui donne sens aux apprentissages" },
      { k: 'D', t: "L'utilisation de supports numériques" }
    ],
    correct: 'C',
    rationales: {
      A: "La durée est une conséquence fréquente, pas un critère. Un projet peut être court, une séquence d'exercices peut s'étaler sur plusieurs semaines.",
      B: "Le travail de groupe est un dispositif possible dans un projet, mais il caractérise aussi la pédagogie coopérative et l'apprentissage par les pairs. Il n'est ni nécessaire ni suffisant.",
      C: "Exact. Le projet se définit par une production finale destinée à un destinataire réel, qui donne aux apprentissages une finalité sociale et mobilise les savoirs en situation.",
      D: "Le numérique est un outil, jamais un critère pédagogique. Cette confusion outil/démarche est très fréquente et se retrouve dans plusieurs sessions."
    },
    trap: "B est le distracteur dominant : la mémoire associative relie « projet » et « groupe », alors que le critère fondateur est la production socialisée.",
    source: { ref: 'Référentiel des compétences professionnelles', loc: 'Démarches actives', date: 'Référentiel SE, module 2' },
    stats: { seen: 2960, correct: 0.58, distractors: { A: 0.05, B: 0.31, C: 0.58, D: 0.06 } }
  },
  {
    id: 'Q006', comp: 'SE4', cog: 'Appliquer', diff: 2, time: 85,
    stem: "Un professeur stagiaire constate que ses consignes orales déclenchent systématiquement du bruit et des demandes de répétition. Quelle action de gestion de classe est la plus pertinente en priorité ?",
    choices: [
      { k: 'A', t: "Hausser la voix pour couvrir le bruit" },
      { k: 'B', t: "Établir un signal d'attention préalable et donner la consigne en une seule phrase, puis la faire reformuler" },
      { k: 'C', t: "Sanctionner les élèves qui demandent une répétition" },
      { k: 'D', t: "Distribuer systématiquement les consignes par écrit et ne plus les énoncer" }
    ],
    correct: 'B',
    rationales: {
      A: "Hausser la voix élève le niveau sonore de référence de la classe et produit une escalade. C'est une réponse au symptôme, pas à la cause.",
      B: "Exact. La séquence signal d'attention → consigne courte → reformulation par un élève agit sur les trois causes réelles : attention non captée, charge cognitive de la consigne, absence de vérification de compréhension.",
      C: "Sanctionner une demande de clarification décourage précisément le comportement qui permet de réguler. Cela dégrade le climat sans traiter la cause.",
      D: "L'écrit est un appui utile, mais renoncer entièrement à l'oral prive les élèves d'un apprentissage de l'écoute et exclut les élèves faibles lecteurs. Un appui ne remplace pas une compétence à construire."
    },
    trap: "D semble raisonnable et professionnel. Le mot qui le disqualifie est « ne plus » : la substitution totale transforme un étayage en évitement.",
    source: { ref: 'Guide du professeur stagiaire', loc: 'Gestion de classe', date: 'Référentiel SE, module 4' },
    stats: { seen: 2530, correct: 0.79, distractors: { A: 0.03, B: 0.79, C: 0.01, D: 0.17 } }
  },
  {
    id: 'Q007', comp: 'SE5', cog: 'Restituer', diff: 2, time: 60,
    stem: "Quel texte fixe les orientations stratégiques de la réforme du système éducatif marocain pour la période 2015-2030 ?",
    choices: [
      { k: 'A', t: "La Charte nationale d'éducation et de formation" },
      { k: 'B', t: "La Vision stratégique de la réforme 2015-2030" },
      { k: 'C', t: "Le Programme d'urgence" },
      { k: 'D', t: "La loi-cadre 51.17" }
    ],
    correct: 'B',
    rationales: {
      A: "La Charte nationale d'éducation et de formation, adoptée en 1999, constitue le texte fondateur de la réforme précédente. Elle précède la période visée.",
      B: "Exact. La Vision stratégique 2015-2030, élaborée par le Conseil supérieur de l'éducation, de la formation et de la recherche scientifique, structure les orientations de la période.",
      C: "Le Programme d'urgence (2009-2012) est un plan d'accélération opérationnel de la Charte, limité dans le temps et de portée exécutive.",
      D: "La loi-cadre 51.17 **traduit juridiquement** la Vision stratégique. Elle en est l'instrument législatif, pas le texte qui fixe les orientations."
    },
    trap: "D est le distracteur le plus sélectionné parce que la loi-cadre est plus récente et plus citée. La distinction demandée est celle entre orientation stratégique et transcription législative.",
    source: { ref: 'CSEFRS, Vision stratégique 2015-2030', loc: 'Document cadre', date: 'Référentiel SE, module 5' },
    stats: { seen: 3680, correct: 0.55, distractors: { A: 0.12, B: 0.55, C: 0.03, D: 0.30 } }
  },
  {
    id: 'Q008', comp: 'SE5', cog: 'Comprendre', diff: 3, time: 90,
    stem: "Dans l'organisation du système éducatif marocain, quel est le rôle principal d'une Académie régionale d'éducation et de formation (AREF) ?",
    choices: [
      { k: 'A', t: "Élaborer les programmes nationaux d'enseignement" },
      { k: 'B', t: "Décliner et mettre en œuvre la politique éducative à l'échelle régionale" },
      { k: 'C', t: "Délivrer les diplômes universitaires" },
      { k: 'D', t: "Fixer le statut des fonctionnaires de l'éducation" }
    ],
    correct: 'B',
    rationales: {
      A: "L'élaboration des programmes nationaux relève de l'échelon central du ministère, afin de garantir l'unité du curriculum sur l'ensemble du territoire.",
      B: "Exact. L'AREF est un établissement public doté de la personnalité morale, chargé de la déclinaison régionale de la politique éducative, de la carte scolaire et de la gestion des ressources.",
      C: "La délivrance des diplômes universitaires relève des universités, sous la tutelle de l'enseignement supérieur, hors du périmètre des AREF.",
      D: "Le statut des fonctionnaires est fixé par voie réglementaire nationale. L'AREF gère des personnels ; elle ne définit pas leur statut."
    },
    trap: "La confusion fréquente porte sur le couple national/régional : ce qui garantit l'égalité est central, ce qui adapte au territoire est régional.",
    source: { ref: 'Loi 07.00 portant création des AREF', loc: 'Articles 2 et 3', date: 'Référentiel SE, module 5' },
    stats: { seen: 2190, correct: 0.68, distractors: { A: 0.19, B: 0.68, C: 0.02, D: 0.11 } }
  },
  {
    id: 'Q009', comp: 'DI1', cog: 'Analyser', diff: 3, time: 100,
    stem: "Le passage du savoir savant au savoir enseigné, avec les transformations qu'il implique, est désigné par quelle notion ?",
    choices: [
      { k: 'A', t: 'Le contrat didactique' },
      { k: 'B', t: 'La transposition didactique' },
      { k: 'C', t: 'La situation-problème' },
      { k: 'D', t: 'Le triangle pédagogique' }
    ],
    correct: 'B',
    rationales: {
      A: "Le contrat didactique désigne l'ensemble des attentes réciproques, souvent implicites, entre enseignant et élèves quant à leurs rôles face au savoir. Il concerne la relation, pas la transformation du savoir.",
      B: "Exact. La transposition didactique, formalisée par Chevallard, décrit le passage du savoir savant au savoir à enseigner puis au savoir enseigné, avec les décontextualisations et recontextualisations successives.",
      C: "La situation-problème est un dispositif d'apprentissage organisé autour d'un obstacle à franchir. C'est un outil de mise en œuvre, pas un processus de transformation du savoir.",
      D: "Le triangle pédagogique de Houssaye modélise les relations entre enseignant, élève et savoir. Il donne un cadre d'analyse, mais ne nomme pas la transformation du savoir elle-même."
    },
    trap: "D attire car il contient le mot « savoir » et évoque un schéma connu. La question porte sur un **processus**, pas sur une modélisation des relations.",
    source: { ref: 'Chevallard, La transposition didactique', loc: 'Introduction', date: 'Référentiel DI, module 1' },
    stats: { seen: 2740, correct: 0.63, distractors: { A: 0.14, B: 0.63, C: 0.06, D: 0.17 } }
  },
  {
    id: 'Q010', comp: 'DI2', cog: 'Analyser', diff: 4, time: 120,
    stem: "Un élève écrit systématiquement « ils ont pris leurs livres et les ont ouverts » mais aussi « les élèves les ont ouvert ». Quelle est l'analyse didactique la plus juste de cette erreur ?",
    choices: [
      { k: 'A', t: "Un simple manque d'attention à corriger par la répétition d'exercices" },
      { k: 'B', t: "Une erreur de compétence lexicale" },
      { k: 'C', t: "Un obstacle lié à la position du complément d'objet direct et à la règle d'accord du participe passé avec l'auxiliaire avoir" },
      { k: 'D', t: "Une confusion entre le passé composé et le plus-que-parfait" }
    ],
    correct: 'C',
    rationales: {
      A: "L'alternance réussite/échec sur la même règle signale un savoir partiellement construit, pas une inattention. Répéter des exercices sans traiter la règle sous-jacente ne fera pas évoluer la représentation.",
      B: "Le lexique n'est pas en cause : l'élève emploie correctement les mots. L'erreur porte sur une relation grammaticale entre constituants.",
      C: "Exact. L'élève applique l'accord quand le lien est saillant et l'omet quand la reprise pronominale rend le complément moins identifiable. L'obstacle porte sur l'identification du COD antéposé, cœur de la règle.",
      D: "Les deux formes citées sont au passé composé. Aucun élément de l'énoncé ne met en jeu une opposition entre temps composés."
    },
    trap: "A est le réflexe le plus répandu chez les candidats et le plus pénalisé : qualifier d'inattention une erreur récurrente et systématique revient à renoncer à l'analyse didactique.",
    source: { ref: 'Grammaire méthodique du français', loc: 'Accord du participe passé', date: 'Référentiel DI, module 2' },
    stats: { seen: 1980, correct: 0.44, distractors: { A: 0.34, B: 0.05, C: 0.44, D: 0.17 } }
  },
  {
    id: 'Q011', comp: 'DI3', cog: 'Appliquer', diff: 3, time: 105,
    stem: "Quel élément est indispensable pour qu'une tâche mérite le nom de situation-problème ?",
    choices: [
      { k: 'A', t: "Un énoncé long et contextualisé" },
      { k: 'B', t: "Un obstacle que les procédures actuelles de l'élève ne permettent pas de franchir" },
      { k: 'C', t: "Un travail obligatoirement individuel" },
      { k: 'D', t: "Une évaluation notée en fin de tâche" }
    ],
    correct: 'B',
    rationales: {
      A: "La longueur et l'habillage contextuel ne créent pas d'obstacle cognitif. Une tâche peut être richement contextualisée et rester une simple application.",
      B: "Exact. La situation-problème se définit par un obstacle franchissable mais non franchi avec les procédures disponibles, ce qui rend le nouvel apprentissage nécessaire.",
      C: "Le format de travail est un choix pédagogique. Beaucoup de situations-problèmes s'appuient au contraire sur le conflit sociocognitif entre pairs.",
      D: "La notation relève de l'évaluation sommative. Une situation-problème est un dispositif d'apprentissage : la noter contredit souvent sa fonction."
    },
    trap: "A traduit une conception fréquente qui confond habillage et obstacle. Un contexte réaliste n'est pas un problème.",
    source: { ref: 'Astolfi, L\'erreur, un outil pour enseigner', loc: 'Situations-problèmes', date: 'Référentiel DI, module 3' },
    stats: { seen: 2410, correct: 0.71, distractors: { A: 0.20, B: 0.71, C: 0.03, D: 0.06 } }
  },
  {
    id: 'Q012', comp: 'DI4', cog: 'Comprendre', diff: 2, time: 80,
    stem: "En didactique de la lecture, que désigne la lecture méthodique appliquée à un texte littéraire ?",
    choices: [
      { k: 'A', t: "La lecture à voix haute avec correction de la prononciation" },
      { k: 'B', t: "Une lecture guidée par des hypothèses de sens vérifiées par des observations formelles du texte" },
      { k: 'C', t: "Le résumé successif de chaque paragraphe" },
      { k: 'D', t: "La recherche du vocabulaire inconnu dans le dictionnaire" }
    ],
    correct: 'B',
    rationales: {
      A: "La lecture oralisée travaille la fluence et la diction. Elle ne construit pas l'interprétation du texte.",
      B: "Exact. La lecture méthodique articule des hypothèses de lecture et leur validation par des relevés formels : lexique, syntaxe, énonciation, figures, structure.",
      C: "Le résumé paragraphe par paragraphe reste au niveau du contenu et ne mobilise pas les indices formels qui fondent l'interprétation.",
      D: "L'élucidation lexicale est une étape préparatoire nécessaire, mais elle ne constitue pas une démarche d'interprétation."
    },
    trap: "C séduit parce qu'il paraît « méthodique » au sens courant. Le mot ne renvoie pas à un ordre de lecture mais à une méthode d'interprétation validée.",
    source: { ref: 'Orientations pédagogiques, cycle qualifiant', loc: 'Lecture méthodique', date: 'Référentiel DI, module 4' },
    stats: { seen: 2620, correct: 0.74, distractors: { A: 0.04, B: 0.74, C: 0.16, D: 0.06 } }
  },
  {
    id: 'Q013', comp: 'DI5', cog: 'Appliquer', diff: 3, time: 95,
    stem: "Pour faire progresser des élèves en production écrite, quelle démarche est la plus efficace selon les travaux de didactique de l'écriture ?",
    choices: [
      { k: 'A', t: "Multiplier les rédactions notées sans retour intermédiaire" },
      { k: 'B', t: "Faire recopier des modèles de textes réussis" },
      { k: 'C', t: "Organiser des réécritures successives guidées par des critères explicites" },
      { k: 'D', t: "Corriger exhaustivement toutes les erreurs de chaque copie" }
    ],
    correct: 'C',
    rationales: {
      A: "Écrire beaucoup sans retour ne fait que consolider les procédures existantes, y compris erronées. La quantité sans régulation ne produit pas de progrès mesurable.",
      B: "La copie de modèles peut nourrir un imaginaire textuel mais ne développe pas les opérations de planification, mise en texte et révision propres à l'écriture.",
      C: "Exact. L'écriture est un processus récursif : les réécritures guidées par des critères connus des élèves agissent directement sur les opérations de révision, là où se joue le progrès.",
      D: "La correction exhaustive sature la charge cognitive de l'élève, disperse l'attention et se révèle peu suivie d'effet. Un ciblage sur deux ou trois critères est plus efficace."
    },
    trap: "D correspond à une pratique très répandue et coûteuse en temps pour l'enseignant. Le volume de correction n'est pas corrélé au progrès de l'élève.",
    source: { ref: 'Groupe EVA, Évaluer les écrits à l\'école', loc: 'Réécriture', date: 'Référentiel DI, module 5' },
    stats: { seen: 2080, correct: 0.69, distractors: { A: 0.04, B: 0.05, C: 0.69, D: 0.22 } }
  },
  {
    id: 'Q014', comp: 'SP1', cog: 'Appliquer', diff: 3, time: 90,
    ctx: "« Les décisions qu'a prises le conseil ont surpris tout le monde. »",
    stem: "Dans la phrase ci-dessus, quelle est la fonction de la proposition subordonnée et quelle règle justifie l'accord de « prises » ?",
    choices: [
      { k: 'A', t: "Subordonnée complétive ; accord avec le sujet « conseil »" },
      { k: 'B', t: "Subordonnée relative ; accord avec l'antécédent « décisions », COD antéposé" },
      { k: 'C', t: "Subordonnée circonstancielle ; participe invariable" },
      { k: 'D', t: "Subordonnée relative ; accord avec le sujet « conseil »" }
    ],
    correct: 'B',
    rationales: {
      A: "La complétive est introduite par « que » conjonction et occupe une fonction d'objet du verbe principal. Ici « qu' » est un pronom relatif qui reprend un antécédent : le test est qu'il a une fonction dans sa propre proposition.",
      B: "Exact. « qu' » est pronom relatif, COD de « a prises », antécédent « les décisions ». Le COD étant placé avant l'auxiliaire avoir, le participe s'accorde : féminin pluriel.",
      C: "Aucune circonstance de temps, de cause, de but ou de condition n'est exprimée. La subordonnée détermine un nom, ce qui est le propre de la relative.",
      D: "L'identification de la relative est correcte, mais l'accord du participe employé avec avoir ne se fait jamais avec le sujet. C'est précisément le piège de cette question."
    },
    trap: "D isole la moitié juste de la réponse. Sur les questions à double détermination, vérifier les deux composantes avant de valider.",
    source: { ref: 'Grevisse, Le Bon Usage', loc: '§ Accord du participe passé', date: 'Référentiel SP, module 1' },
    stats: { seen: 2340, correct: 0.57, distractors: { A: 0.09, B: 0.57, C: 0.02, D: 0.32 } }
  },
  {
    id: 'Q015', comp: 'SP1', cog: 'Analyser', diff: 3, time: 85,
    ctx: "« À peine était-il entré que le silence se fit. »",
    stem: "Quel phénomène syntaxique explique l'ordre « était-il » dans cette phrase ?",
    choices: [
      { k: 'A', t: "Une interrogation directe" },
      { k: 'B', t: "L'inversion du sujet imposée par un adverbe en tête de phrase" },
      { k: 'C', t: "Une mise en relief par extraction" },
      { k: 'D', t: "Une tournure impersonnelle" }
    ],
    correct: 'B',
    rationales: {
      A: "Aucune valeur interrogative n'est présente : la phrase est assertive et se termine par un point. L'inversion n'est pas exclusive de l'interrogation.",
      B: "Exact. Certains adverbes ou locutions en tête de phrase — « à peine », « peut-être », « aussi », « sans doute » — déclenchent l'inversion du sujet clitique.",
      C: "L'extraction correspond au tour « c'est… que » ou « ce qui… c'est ». Aucun présentatif n'est employé ici.",
      D: "Une tournure impersonnelle suppose un sujet grammatical « il » sans référent. Ici « il » renvoie à une personne déterminée par le contexte."
    },
    trap: "A est choisi par réflexe : l'inversion sujet-verbe est fortement associée à l'interrogation dans la mémoire scolaire.",
    source: { ref: 'Riegel, Pellat, Rioul, Grammaire méthodique', loc: 'Ordre des constituants', date: 'Référentiel SP, module 1' },
    stats: { seen: 1870, correct: 0.64, distractors: { A: 0.24, B: 0.64, C: 0.07, D: 0.05 } }
  },
  {
    id: 'Q016', comp: 'SP2', cog: 'Analyser', diff: 3, time: 100,
    ctx: "« Ce toit tranquille, où marchent des colombes, / Entre les pins palpite, entre les tombes »",
    stem: "Dans ces vers de Valéry, quelle figure structure principalement l'image du « toit tranquille » ?",
    choices: [
      { k: 'A', t: 'Une comparaison' },
      { k: 'B', t: 'Une métaphore in absentia désignant la mer' },
      { k: 'C', t: 'Une hyperbole' },
      { k: 'D', t: 'Une personnification du toit' }
    ],
    correct: 'B',
    rationales: {
      A: "La comparaison suppose un outil comparatif explicite — « comme », « tel », « semblable à ». Aucun n'apparaît dans ces vers.",
      B: "Exact. Le comparé, la mer, n'est jamais nommé : seul le comparant « toit » est présent, ce qui définit la métaphore in absentia. Les colombes figurent les voiles.",
      C: "L'hyperbole procède par exagération. Rien dans le passage ne relève de l'amplification.",
      D: "« Palpite » attribue effectivement une propriété du vivant, mais cet effet est second : il s'inscrit **à l'intérieur** de la métaphore filée. La question porte sur la figure structurante."
    },
    trap: "D repère un phénomène réel mais secondaire. Distinguer la figure qui organise l'image de celle qui l'orne est l'attendu récurrent des sujets d'analyse.",
    source: { ref: 'Valéry, Le Cimetière marin', loc: 'Strophe 1', date: 'Référentiel SP, module 2' },
    stats: { seen: 1640, correct: 0.52, distractors: { A: 0.06, B: 0.52, C: 0.03, D: 0.39 } }
  },
  {
    id: 'Q017', comp: 'SP2', cog: 'Comprendre', diff: 2, time: 75,
    stem: "Un récit dans lequel le narrateur en sait moins que le personnage et se contente de rapporter comportements et paroles relève de quelle focalisation ?",
    choices: [
      { k: 'A', t: 'Focalisation zéro' },
      { k: 'B', t: 'Focalisation interne' },
      { k: 'C', t: 'Focalisation externe' },
      { k: 'D', t: 'Focalisation omnisciente' }
    ],
    correct: 'C',
    rationales: {
      A: "La focalisation zéro correspond au narrateur omniscient, qui en sait davantage que tous les personnages. C'est l'exact opposé de la situation décrite.",
      B: "En focalisation interne, le récit épouse la conscience d'un personnage : le narrateur en sait autant que lui, ni plus ni moins.",
      C: "Exact. En focalisation externe le narrateur reste à l'extérieur des consciences et n'accède qu'aux comportements observables. Il en sait donc moins que le personnage.",
      D: "« Omniscient » est un synonyme courant de la focalisation zéro. Le proposer comme option distincte de A est une redondance : deux options équivalentes ne peuvent pas être toutes deux correctes."
    },
    trap: "Repérer les options synonymes est une stratégie utile : lorsque deux propositions signifient la même chose, aucune des deux n'est généralement la réponse.",
    source: { ref: 'Genette, Figures III', loc: 'Le mode narratif', date: 'Référentiel SP, module 2' },
    stats: { seen: 2870, correct: 0.70, distractors: { A: 0.09, B: 0.16, C: 0.70, D: 0.05 } }
  },
  {
    id: 'Q018', comp: 'SP3', cog: 'Restituer', diff: 2, time: 65,
    stem: "Quel mouvement littéraire, en réaction au romantisme, revendique l'impersonnalité de l'auteur et la primauté de l'observation documentée ?",
    choices: [
      { k: 'A', t: 'Le symbolisme' },
      { k: 'B', t: 'Le réalisme' },
      { k: 'C', t: 'Le surréalisme' },
      { k: 'D', t: 'Le classicisme' }
    ],
    correct: 'B',
    rationales: {
      A: "Le symbolisme, postérieur, privilégie la suggestion, la correspondance et la musicalité contre la description objective. Il s'oppose au réalisme, non au romantisme.",
      B: "Exact. Le réalisme, à partir des années 1850, revendique l'observation méthodique de la société et le retrait de la subjectivité de l'auteur.",
      C: "Le surréalisme, mouvement du XXᵉ siècle, explore l'inconscient, l'écriture automatique et le rêve. Il est postérieur de près d'un siècle.",
      D: "Le classicisme précède le romantisme et se fonde sur l'imitation des Anciens et le respect des règles. Il ne peut pas réagir à un mouvement qui lui succède."
    },
    trap: "L'ordre chronologique est un outil de vérification puissant : un mouvement ne peut pas réagir à un mouvement qui lui est postérieur.",
    source: { ref: 'Histoire littéraire, programme du qualifiant', loc: 'XIXᵉ siècle', date: 'Référentiel SP, module 3' },
    stats: { seen: 3040, correct: 0.83, distractors: { A: 0.06, B: 0.83, C: 0.03, D: 0.08 } }
  },
  {
    id: 'Q019', comp: 'SP4', cog: 'Appliquer', diff: 2, time: 70,
    stem: "Parmi ces phrases, laquelle est correctement orthographiée ?",
    choices: [
      { k: 'A', t: "Quelque soient les résultats, il persévèrera." },
      { k: 'B', t: "Quels que soient les résultats, il persévérera." },
      { k: 'C', t: "Quelques soient les résultats, il persévererra." },
      { k: 'D', t: "Quel que soient les résultats, il persèvèrera." }
    ],
    correct: 'B',
    rationales: {
      A: "Deux erreurs : « quelque » soudé est incorrect devant le verbe être suivi du sujet, et « persévèrera » porte un accent grave fautif au futur.",
      B: "Exact. « Quels que » s'écrit en deux mots et s'accorde avec le sujet « les résultats ». Le futur de persévérer est « persévérera », sans modification de l'accent aigu.",
      C: "« Quelques » accordé au pluriel est fautif dans cette construction, et « persévererra » présente un doublement du r qui n'existe pas.",
      D: "L'accord de « quel » avec le sujet pluriel n'est pas réalisé, et « persèvèrera » accumule deux accents graves fautifs."
    },
    trap: "Les questions d'orthographe à quatre variantes proches exigent de vérifier chaque segment séparément, l'accord d'abord puis la conjugaison.",
    source: { ref: 'Normes orthographiques du français', loc: 'Locutions concessives', date: 'Référentiel SP, module 4' },
    stats: { seen: 3320, correct: 0.66, distractors: { A: 0.21, B: 0.66, C: 0.04, D: 0.09 } }
  },
  {
    id: 'Q020', comp: 'SE2', cog: 'Analyser', diff: 4, time: 115,
    stem: "Un enseignant applique strictement une progression identique pour toute la classe et déclare que « différencier reviendrait à baisser le niveau ». Quelle réponse professionnelle est la plus fondée ?",
    choices: [
      { k: 'A', t: "Il a raison : la différenciation nuit à l'exigence" },
      { k: 'B', t: "La différenciation fait varier les chemins et les étayages, pas les objectifs visés" },
      { k: 'C', t: "Il faut différencier les objectifs pour chaque élève" },
      { k: 'D', t: "La différenciation ne concerne que les élèves en difficulté" }
    ],
    correct: 'B',
    rationales: {
      A: "Cette position confond exigence et uniformité. Maintenir un traitement identique face à des besoins différents ne relève pas de l'exigence mais de l'indifférence aux écarts.",
      B: "Exact. La différenciation pédagogique fait varier les supports, les démarches, le temps et l'étayage tout en maintenant des objectifs communs. C'est ce qui la distingue de la baisse d'exigence.",
      C: "Différencier les objectifs eux-mêmes revient à installer des parcours inégaux et à renoncer à la visée commune. C'est précisément la dérive que la définition rigoureuse écarte.",
      D: "Restreindre la différenciation aux élèves en difficulté oublie les élèves avancés, pour qui l'absence de défi produit aussi du décrochage."
    },
    trap: "C est le distracteur dominant chez les candidats favorables à la différenciation : ils défendent le bon principe avec la mauvaise définition, ce qui est sanctionné.",
    source: { ref: 'Perrenoud, Pédagogie différenciée', loc: 'Chap. 2', date: 'Référentiel SE, module 2' },
    stats: { seen: 1920, correct: 0.51, distractors: { A: 0.03, B: 0.51, C: 0.38, D: 0.08 } }
  },
  {
    id: 'Q021', comp: 'DI2', cog: 'Comprendre', diff: 3, time: 90,
    stem: "Selon Astolfi, quel changement de posture l'enseignant doit-il opérer face à l'erreur de l'élève ?",
    choices: [
      { k: 'A', t: "La considérer comme une faute à sanctionner" },
      { k: 'B', t: "L'ignorer pour préserver la confiance de l'élève" },
      { k: 'C', t: "La traiter comme un indicateur du fonctionnement intellectuel de l'élève" },
      { k: 'D', t: "La corriger immédiatement en donnant la bonne réponse" }
    ],
    correct: 'C',
    rationales: {
      A: "La faute engage une dimension morale et appelle une sanction. L'erreur relève du processus d'apprentissage et appelle une analyse. C'est la distinction fondatrice de l'ouvrage.",
      B: "Ignorer l'erreur laisse la représentation erronée intacte. La confiance se construit par la compréhension de ce qui a échoué, pas par l'évitement.",
      C: "Exact. L'erreur est un révélateur des représentations et des procédures de l'élève. Elle devient un outil d'enseignement dès lors qu'on l'analyse au lieu de la sanctionner.",
      D: "Donner immédiatement la réponse court-circuite le travail cognitif de l'élève et empêche l'identification de l'obstacle. La correction devient alors une information sans effet durable."
    },
    trap: "D paraît efficace et bienveillant. Il supprime pourtant l'étape où se produit l'apprentissage : la prise de conscience du raisonnement erroné.",
    source: { ref: 'Astolfi, L\'erreur, un outil pour enseigner', loc: 'Chap. 1', date: 'Référentiel DI, module 2' },
    stats: { seen: 2510, correct: 0.81, distractors: { A: 0.04, B: 0.02, C: 0.81, D: 0.13 } }
  },
  {
    id: 'Q022', comp: 'SE4', cog: 'Appliquer', diff: 3, time: 95,
    stem: "Dans une fiche de préparation de séance, quel élément permet de vérifier que l'objectif est correctement formulé ?",
    choices: [
      { k: 'A', t: "Il décrit ce que fait l'enseignant pendant la séance" },
      { k: 'B', t: "Il décrit un comportement observable de l'élève en fin de séance" },
      { k: 'C', t: "Il indique le titre de la leçon" },
      { k: 'D', t: "Il précise la durée prévue de chaque activité" }
    ],
    correct: 'B',
    rationales: {
      A: "Décrire l'activité de l'enseignant relève du déroulement, pas de l'objectif. « Expliquer la métaphore » dit ce que fait le professeur, pas ce que l'élève saura faire.",
      B: "Exact. Un objectif opérationnel s'énonce du point de vue de l'élève, avec un verbe d'action observable, et se vérifie par un critère de réussite.",
      C: "Le titre nomme le contenu traité. « La phrase complexe » n'indique ni ce que l'élève doit faire, ni à quel niveau de maîtrise.",
      D: "La durée relève de l'organisation temporelle. Elle est utile à la conduite de la séance mais ne dit rien de l'apprentissage visé."
    },
    trap: "A est l'erreur la plus fréquente dans les fiches de stagiaires : l'objectif y est rédigé du point de vue de l'enseignant.",
    source: { ref: 'Guide de préparation pédagogique', loc: 'Formulation des objectifs', date: 'Référentiel SE, module 4' },
    stats: { seen: 2260, correct: 0.76, distractors: { A: 0.16, B: 0.76, C: 0.05, D: 0.03 } }
  },
  {
    id: 'Q023', comp: 'DI4', cog: 'Analyser', diff: 4, time: 110,
    stem: "Un élève déchiffre correctement un texte à voix haute mais est incapable d'en restituer le sens. Quelle hypothèse didactique est la plus pertinente ?",
    choices: [
      { k: 'A', t: "Un déficit de décodage graphophonologique" },
      { k: 'B', t: "Un déficit des processus de compréhension : traitement lexical, inférences et cohérence textuelle" },
      { k: 'C', t: "Un manque de motivation pour la lecture" },
      { k: 'D', t: "Un trouble de la vision" }
    ],
    correct: 'B',
    rationales: {
      A: "L'énoncé précise que le déchiffrage est correct. Le décodage est donc l'opération qui fonctionne, ce qui exclut cette hypothèse.",
      B: "Exact. Le modèle simple de la lecture distingue identification des mots et compréhension. Un décodage réussi avec compréhension défaillante oriente vers le lexique, les inférences et la construction de la cohérence.",
      C: "La motivation peut moduler l'engagement, mais elle n'explique pas une dissociation aussi nette entre deux composantes cognitives. C'est une hypothèse non spécifique.",
      D: "Un trouble visuel affecterait d'abord le déchiffrage lui-même, qui est ici préservé. L'hypothèse est incompatible avec les données de l'énoncé."
    },
    trap: "C est une explication passe-partout. En analyse didactique, une hypothèse qui expliquerait n'importe quelle difficulté n'explique en réalité aucune.",
    source: { ref: 'Gough & Tunmer, Simple View of Reading', loc: 'Modèle à deux composantes', date: 'Référentiel DI, module 4' },
    stats: { seen: 1760, correct: 0.73, distractors: { A: 0.10, B: 0.73, C: 0.13, D: 0.04 } }
  },
  {
    id: 'Q024', comp: 'SP3', cog: 'Comprendre', diff: 3, time: 85,
    stem: "Quelle caractéristique distingue le mieux la littérature marocaine d'expression française des années 1970 ?",
    choices: [
      { k: 'A', t: "Le refus systématique de la langue française" },
      { k: 'B', t: "Une écriture de la contestation et de la rupture formelle, portée notamment par la revue Souffles" },
      { k: 'C', t: "Le retour au récit historique classique" },
      { k: 'D', t: "L'exclusivité de la poésie versifiée" }
    ],
    correct: 'B',
    rationales: {
      A: "Ces auteurs écrivent en français tout en interrogeant ce choix. Le refus systématique de la langue est contredit par l'existence même de leur œuvre.",
      B: "Exact. La période est marquée par la contestation politique et culturelle et par une recherche formelle assumée, dont la revue Souffles est le foyer emblématique.",
      C: "Le récit historique classique correspond à une esthétique antérieure et à une posture de continuité, à l'opposé de la rupture revendiquée alors.",
      D: "La production de la période est au contraire marquée par l'hybridation des genres : poésie, essai, récit fragmentaire coexistent."
    },
    trap: "A repose sur une lecture idéologique séduisante mais autocontradictoire, ce qui suffit à l'écarter.",
    source: { ref: 'Littérature maghrébine d\'expression française', loc: 'Période 1966-1972', date: 'Référentiel SP, module 3' },
    stats: { seen: 1420, correct: 0.61, distractors: { A: 0.14, B: 0.61, C: 0.16, D: 0.09 } }
  },
  {
    id: 'Q025', comp: 'SE3', cog: 'Appliquer', diff: 3, time: 90,
    stem: "Une épreuve mesure fidèlement mais évalue en réalité la capacité de lecture plutôt que la compétence mathématique visée. Quelle qualité docimologique fait défaut ?",
    choices: [
      { k: 'A', t: 'La fidélité' },
      { k: 'B', t: 'La validité' },
      { k: 'C', t: 'La sensibilité' },
      { k: 'D', t: "L'objectivité" }
    ],
    correct: 'B',
    rationales: {
      A: "La fidélité désigne la stabilité de la mesure d'une passation à l'autre. L'énoncé indique explicitement que l'épreuve mesure « fidèlement ».",
      B: "Exact. La validité est l'adéquation entre ce que l'épreuve mesure réellement et ce qu'elle prétend mesurer. Mesurer la lecture en croyant mesurer les mathématiques est un défaut de validité.",
      C: "La sensibilité est la capacité de l'instrument à discriminer des niveaux voisins. Rien dans l'énoncé ne concerne le pouvoir discriminant.",
      D: "L'objectivité concerne l'indépendance du résultat vis-à-vis du correcteur. Ce n'est pas la dimension en cause."
    },
    trap: "Un instrument peut être parfaitement fidèle et totalement invalide. Les deux qualités sont indépendantes, ce que la question vérifie directement.",
    source: { ref: 'Docimologie, notions fondamentales', loc: 'Qualités métriques', date: 'Référentiel SE, module 3' },
    stats: { seen: 1980, correct: 0.59, distractors: { A: 0.24, B: 0.59, C: 0.07, D: 0.10 } }
  },
  {
    id: 'Q026', comp: 'DI3', cog: 'Analyser', diff: 4, time: 120,
    stem: "Dans une séquence sur l'argumentation, l'enseignant veut évaluer une compétence et non une somme de connaissances. Quelle tâche est la plus adaptée ?",
    choices: [
      { k: 'A', t: "Un questionnaire sur les figures de rhétorique et leurs définitions" },
      { k: 'B', t: "Une tâche complexe : rédiger une lettre ouverte argumentée à un destinataire réel, avec critères connus" },
      { k: 'C', t: "Un exercice d'appariement entre auteurs et thèses" },
      { k: 'D', t: "Une dictée d'un texte argumentatif" }
    ],
    correct: 'B',
    rationales: {
      A: "Restituer des définitions relève de la connaissance déclarative. La compétence suppose la mobilisation de ressources dans une situation nouvelle.",
      B: "Exact. La tâche complexe réunit les trois conditions : situation inédite, mobilisation combinée de ressources, critères de réussite explicites permettant l'évaluation.",
      C: "L'appariement vérifie une mémorisation associative. Il ne demande aucune production ni aucun choix stratégique de la part de l'élève.",
      D: "La dictée évalue l'orthographe et l'écoute. Elle n'engage ni construction d'argument ni prise en compte d'un destinataire."
    },
    trap: "A et C sont des tâches légitimes mais évaluent des ressources isolées. La compétence ne se déduit pas de la somme de ses composantes.",
    source: { ref: 'Roegiers, Approche par compétences', loc: 'Situations d\'intégration', date: 'Référentiel DI, module 3' },
    stats: { seen: 1650, correct: 0.68, distractors: { A: 0.15, B: 0.68, C: 0.11, D: 0.06 } }
  }
];

/* Traductions arabes pour la démonstration du RTL */
DATA.questionsAr = {
  Q003: {
    stem: "تُجري أستاذة اختبارًا في منتصف الوحدة، دون تنقيط الأوراق، وتستعمل نتائجه لإعادة تنظيم مجموعات العمل. ما نوع التقويم؟",
    choices: { A: 'تقويم تشخيصي', B: 'تقويم تكويني', C: 'تقويم إجمالي', D: 'تقويم إشهادي' },
    rationales: {
      A: 'التقويم التشخيصي يأتي قبل بداية الوحدة لتحديد المكتسبات القبلية. والنص يحدد بوضوح أن الاختبار في منتصف الوحدة.',
      B: 'صحيح. التقويم التكويني يتم أثناء التعلم، ولا يهدف إلى التنقيط، ويخدم تعديل الفعل التعليمي — هنا عبر إعادة تنظيم المجموعات.',
      C: 'التقويم الإجمالي يقدم حصيلة في نهاية الوحدة ويُترجم عادة إلى نقطة. والشرطان معًا يناقضان ما ورد في النص.',
      D: 'التقويم الإشهادي يصادق رسميًا على مستوى محقق ويترتب عنه قرار مؤسسي. ولا وجود لذلك هنا.'
    },
    trap: 'غياب النقطة لا يكفي لوصف التقويم بالتكويني: ما يحدده هو وظيفة التعديل. فالاختبار التشخيصي قد لا يُنقّط أيضًا.'
  },
  Q021: {
    stem: 'حسب أستولفي، ما تغيير الموقف الذي ينبغي للمدرس اعتماده تجاه خطأ المتعلم؟',
    choices: { A: 'اعتباره ذنبًا يستوجب العقاب', B: 'تجاهله حفاظًا على ثقة المتعلم', C: 'التعامل معه كمؤشر على اشتغال ذهن المتعلم', D: 'تصحيحه فورًا بإعطاء الجواب الصحيح' },
    rationales: {
      A: 'الذنب يحمل بعدًا أخلاقيًا ويستدعي عقابًا. أما الخطأ فينتمي إلى سيرورة التعلم ويستدعي تحليلًا. هذا هو التمييز المؤسس للكتاب.',
      B: 'تجاهل الخطأ يُبقي التمثل الخاطئ على حاله. والثقة تُبنى بفهم ما أخفق، لا بتفاديه.',
      C: 'صحيح. الخطأ كاشف عن تمثلات المتعلم وإجراءاته. ويصير أداة للتدريس حين نحلله بدل معاقبته.',
      D: 'إعطاء الجواب فورًا يختصر العمل الذهني للمتعلم ويمنع تحديد العائق. فيصبح التصحيح معلومة بلا أثر دائم.'
    },
    trap: 'يبدو الخيار د فعالًا ولطيفًا. غير أنه يلغي المرحلة التي يحدث فيها التعلم: وعي المتعلم بخطأ استدلاله.'
  }
};

/* ------------------------------------------------------------------ */
/* Questions ouvertes évaluées par grille                             */
/* ------------------------------------------------------------------ */
DATA.openQuestions = [
  {
    id: 'OQ01', comp: 'DI2', diff: 3, minutes: 25, words: [180, 320],
    title: "Analyser une production d'élève",
    prompt: "Un élève de tronc commun écrit : « Le personnage principal il est très courageux parce que dans le texte on voit qu'il a pas peur quand les autres ils partent. »\n\nAnalysez cette production en identifiant deux obstacles d'apprentissage distincts, puis proposez pour chacun une intervention didactique précise et justifiée.",
    rubric: [
      { id: 'r1', name: "Identification des obstacles", max: 6, desc: "Deux obstacles distincts, nommés avec le vocabulaire didactique adéquat (redondance du sujet, négation orale, absence d'ancrage textuel)." },
      { id: 'r2', name: 'Analyse didactique', max: 6, desc: "L'analyse dépasse le constat d'erreur et remonte à la représentation ou à la procédure de l'élève." },
      { id: 'r3', name: 'Pertinence des interventions', max: 5, desc: "Chaque intervention est opérationnelle, ciblée sur l'obstacle identifié, et réalisable en classe." },
      { id: 'r4', name: 'Qualité de la langue et structuration', max: 3, desc: 'Organisation claire, langue correcte, vocabulaire professionnel.' }
    ],
    reference: "Une copie de niveau attendu identifie d'une part la redondance pronominale (« le personnage il ») relevant du transfert de l'oral à l'écrit, d'autre part la négation incomplète (« il a pas peur ») relevant du même registre — mais distingue ces deux faits de langue du troisième obstacle, méthodologique : la citation du texte est paraphrasée et non prélevée. Les interventions proposées portent alors sur un travail explicite de comparaison oral/écrit à partir de la copie elle-même, et sur un atelier de prélèvement de citations avec grille de vérification.",
    sample: "L'élève commet plusieurs erreurs. D'abord il répète le sujet avec « le personnage il », ce qui vient de l'oral. Ensuite il oublie le « ne » de la négation, c'est aussi un problème de l'oral qui passe à l'écrit. Pour l'aider je ferais un exercice sur la différence entre l'oral et l'écrit avec sa propre phrase au tableau, et je lui demanderais de réécrire. On peut aussi travailler sur la citation parce qu'il dit « dans le texte on voit » sans citer vraiment.",
    scored: [
      { id: 'r1', score: 5, comment: "Les deux obstacles de langue sont correctement identifiés et rattachés au transfert oral/écrit. Le troisième obstacle, l'absence de prélèvement, est mentionné en fin de copie mais n'est pas nommé comme obstacle méthodologique distinct." },
      { id: 'r2', score: 3.5, comment: "L'analyse reste descriptive : « ça vient de l'oral » constate sans expliquer pourquoi l'élève ne mobilise pas la norme écrite en situation. La représentation sous-jacente n'est pas explicitée." },
      { id: 'r3', score: 4, comment: "L'intervention à partir de la copie de l'élève est pertinente et opérationnelle. La seconde piste sur la citation est juste mais reste à l'état d'intention, sans dispositif décrit." },
      { id: 'r4', score: 2, comment: "Propos clair et compréhensible. La structuration reste linéaire et le vocabulaire professionnel est peu présent : « exercice » plutôt que « situation », absence des termes de didactique attendus." }
    ]
  },
  {
    id: 'OQ02', comp: 'SE3', diff: 3, minutes: 20, words: [150, 280],
    title: "Justifier un choix d'évaluation",
    prompt: "Vous préparez une séquence de six séances sur l'argumentation en tronc commun. Décrivez le dispositif d'évaluation que vous mettriez en place sur l'ensemble de la séquence, en précisant les fonctions d'évaluation mobilisées et en justifiant chaque choix.",
    rubric: [
      { id: 'r1', name: 'Cohérence du dispositif', max: 6, desc: 'Le dispositif couvre la séquence, articule plusieurs moments et reste réaliste en durée.' },
      { id: 'r2', name: 'Maîtrise des fonctions', max: 6, desc: "Diagnostique, formative et sommative sont mobilisées à bon escient et correctement nommées." },
      { id: 'r3', name: 'Justification', max: 5, desc: 'Chaque choix est argumenté par un effet attendu sur les apprentissages, non par la seule tradition scolaire.' },
      { id: 'r4', name: 'Langue et structuration', max: 3, desc: 'Organisation claire, langue correcte, vocabulaire professionnel.' }
    ],
    reference: "Une réponse attendue ouvre par un diagnostic court en séance 1, insère au moins deux temps formatifs non notés avec critères communiqués aux élèves, prévoit une réécriture guidée, et clôt par une tâche complexe sommative alignée sur l'objectif de la séquence. Chaque moment est justifié par la décision qu'il permet de prendre.",
    sample: null,
    scored: null
  }
];

/* ------------------------------------------------------------------ */
/* Blueprints et examens blancs                                       */
/* ------------------------------------------------------------------ */
DATA.blueprints = [
  {
    id: 'BP-CRMEF-FR-01', version: 'v3 — publiée le 12/06/2026',
    name: 'Examen blanc n°1 — Épreuve écrite CRMEF Français',
    duration: 90, questionCount: 20, pass: 10,
    navigation: 'Retour aux questions précédentes autorisé. Ordre fixe. Validation finale explicite.',
    scoring: 'Une bonne réponse : 1 point. Réponse fausse ou absence de réponse : 0. Pas de points négatifs.',
    sections: [
      { name: "Sciences de l'éducation", comps: ['SE1', 'SE2', 'SE3', 'SE4', 'SE5'], count: 8 },
      { name: 'Didactique du français', comps: ['DI1', 'DI2', 'DI3', 'DI4', 'DI5'], count: 7 },
      { name: 'Spécialité — langue et littérature', comps: ['SP1', 'SP2', 'SP3', 'SP4'], count: 5 }
    ]
  },
  {
    id: 'BP-CRMEF-FR-02', version: 'v1 — publiée le 03/07/2026',
    name: 'Examen blanc n°2 — Format renforcé',
    duration: 120, questionCount: 26, pass: 12,
    navigation: 'Retour autorisé. Ordre aléatoire par section. Verrouillage après soumission.',
    scoring: 'Une bonne réponse : 1 point. Pas de points négatifs.',
    sections: [
      { name: "Sciences de l'éducation", comps: ['SE1', 'SE2', 'SE3', 'SE4', 'SE5'], count: 10 },
      { name: 'Didactique du français', comps: ['DI1', 'DI2', 'DI3', 'DI4', 'DI5'], count: 9 },
      { name: 'Spécialité — langue et littérature', comps: ['SP1', 'SP2', 'SP3', 'SP4'], count: 7 }
    ]
  }
];

/* ------------------------------------------------------------------ */
/* Annales, ressources, calendrier                                    */
/* ------------------------------------------------------------------ */
DATA.annales = [
  { id: 'A1', year: 2025, exam: 'CRMEF', spec: 'Français — SQ', type: 'Épreuve écrite', pages: 6, corrected: true, source: 'Session de juillet 2025', free: true },
  { id: 'A2', year: 2025, exam: 'CRMEF', spec: 'Français — SQ', type: 'Épreuve orale — grille', pages: 3, corrected: true, source: 'Session de juillet 2025', free: true },
  { id: 'A3', year: 2024, exam: 'CRMEF', spec: 'Français — SQ', type: 'Épreuve écrite', pages: 6, corrected: true, source: 'Session de juin 2024', free: true },
  { id: 'A4', year: 2024, exam: 'CRMEF', spec: 'Mathématiques — SQ', type: 'Épreuve écrite', pages: 8, corrected: true, source: 'Session de juin 2024', free: false },
  { id: 'A5', year: 2023, exam: 'CRMEF', spec: 'Français — SQ', type: 'Épreuve écrite', pages: 5, corrected: true, source: 'Session de juillet 2023', free: false },
  { id: 'A6', year: 2023, exam: 'CRMEF', spec: 'Français — SQ', type: 'Sciences de l\'éducation', pages: 4, corrected: true, source: 'Session de juillet 2023', free: false },
  { id: 'A7', year: 2022, exam: 'CRMEF', spec: 'Français — SQ', type: 'Épreuve écrite', pages: 5, corrected: false, source: 'Session de juin 2022', free: false },
  { id: 'A8', year: 2022, exam: 'CRMEF', spec: 'Mathématiques — SQ', type: 'Épreuve écrite', pages: 7, corrected: true, source: 'Session de juin 2022', free: false }
];

DATA.articles = [
  { slug: 'programme-crmef-francais', title: 'Programme du concours CRMEF Français : ce qui est réellement évalué', cat: 'Méthode', min: 9, excerpt: "Décomposition des trois piliers, pondération observée sur les cinq dernières sessions et pièges récurrents de l'épreuve écrite." },
  { slug: 'erreur-outil-enseigner', title: "Analyser une erreur d'élève : la méthode en quatre temps", cat: 'Didactique', min: 7, excerpt: "Une grille reproductible pour passer du constat d'erreur à l'hypothèse didactique, avec trois exemples corrigés." },
  { slug: 'planning-revision-90-jours', title: 'Construire son planning de révision sur 90 jours', cat: 'Organisation', min: 6, excerpt: "Répartition par pilier, gestion des révisions espacées et arbitrage entre couverture et approfondissement." },
  { slug: 'oral-crmef', title: "Réussir l'épreuve orale : structure attendue et critères du jury", cat: 'Méthode', min: 8, excerpt: "Ce que la grille officielle valorise, et les cinq erreurs qui coûtent le plus de points en situation d'exposé." },
  { slug: 'legislation-essentiel', title: "Législation scolaire : les dix textes à connaître absolument", cat: 'Fiches', min: 11, excerpt: "De la Charte nationale à la loi-cadre 51.17, avec pour chaque texte sa portée et les confusions à éviter." },
  { slug: 'vision-strategique-fiche', title: 'La Vision stratégique 2015-2030 en une fiche', cat: 'Fiches', min: 5, excerpt: "Les quatre leviers, les mesures phares et les questions de concours les plus fréquentes sur ce texte." }
];

DATA.calendar = [
  { exam: 'CRMEF', label: 'Ouverture des candidatures — session 2027', date: '2026-09-14', status: 'à venir' },
  { exam: 'CRMEF', label: 'Clôture des inscriptions', date: '2026-10-05', status: 'à venir' },
  { exam: 'CRMEF', label: 'Épreuve écrite', date: '2026-11-22', status: 'à venir' },
  { exam: 'CRMEF', label: 'Publication des résultats de l\'écrit', date: '2026-12-18', status: 'à venir' },
  { exam: 'CRMEF', label: 'Épreuves orales', date: '2027-01-19', status: 'à venir' },
  { exam: 'Inspection', label: 'Ouverture des candidatures', date: '2026-10-02', status: 'à venir' }
];

/* ------------------------------------------------------------------ */
/* Profil candidat simulé                                             */
/* ------------------------------------------------------------------ */
DATA.profile = {
  name: 'Salma Bennani',
  initials: 'SB',
  exam: 'crmef', specialty: 'fr-sq', session: 'Session 2027', cycle: 'Secondaire qualifiant',
  targetDate: '2026-11-22',
  plan: 'premium',
  joined: '2026-06-18',
  streak: 12,
  quotaUsed: 7, quotaTotal: 10,
  mastery: [
    { comp: 'SE1', score: 74, trend: +6, evidence: 4, answers: 48, updated: 'il y a 2 heures' },
    { comp: 'SE2', score: 52, trend: -3, evidence: 3, answers: 31, updated: 'hier' },
    { comp: 'SE3', score: 81, trend: +11, evidence: 4, answers: 55, updated: 'il y a 2 heures' },
    { comp: 'SE4', score: 68, trend: +2, evidence: 3, answers: 27, updated: 'il y a 3 jours' },
    { comp: 'SE5', score: 39, trend: +4, evidence: 2, answers: 18, updated: 'il y a 5 jours' },
    { comp: 'DI1', score: 61, trend: 0, evidence: 3, answers: 29, updated: 'il y a 2 jours' },
    { comp: 'DI2', score: 44, trend: -6, evidence: 3, answers: 33, updated: 'hier' },
    { comp: 'DI3', score: 57, trend: +5, evidence: 2, answers: 21, updated: 'il y a 4 jours' },
    { comp: 'DI4', score: 70, trend: +8, evidence: 3, answers: 26, updated: 'hier' },
    { comp: 'DI5', score: 48, trend: +1, evidence: 2, answers: 16, updated: 'il y a 6 jours' },
    { comp: 'SP1', score: 66, trend: +3, evidence: 4, answers: 52, updated: 'il y a 2 heures' },
    { comp: 'SP2', score: 55, trend: -2, evidence: 3, answers: 30, updated: 'il y a 2 jours' },
    { comp: 'SP3', score: 78, trend: +9, evidence: 3, answers: 24, updated: 'il y a 3 jours' },
    { comp: 'SP4', score: 63, trend: +4, evidence: 3, answers: 28, updated: 'hier' }
  ],
  history: [
    { d: 'S-8', SE: 41, DI: 38, SP: 44 },
    { d: 'S-7', SE: 46, DI: 40, SP: 47 },
    { d: 'S-6', SE: 49, DI: 43, SP: 51 },
    { d: 'S-5', SE: 55, DI: 45, SP: 55 },
    { d: 'S-4', SE: 58, DI: 49, SP: 58 },
    { d: 'S-3', SE: 61, DI: 51, SP: 61 },
    { d: 'S-2', SE: 63, DI: 54, SP: 63 },
    { d: 'S-1', SE: 63, DI: 56, SP: 65 }
  ],
  activity: [2, 0, 3, 1, 4, 2, 0, 1, 3, 3, 2, 4, 1, 0, 2, 3, 4, 4, 2, 1, 3, 2, 4, 3, 1, 2, 3, 4],
  errorBook: [
    { qid: 'Q010', note: "Je confonds encore l'accord quand le COD est un pronom. Revoir la manipulation : remplacer par un nom.", added: 'il y a 2 jours', mastered: false },
    { qid: 'Q007', note: 'Vision stratégique ≠ loi-cadre. Vision = orientations, loi-cadre = traduction juridique.', added: 'il y a 4 jours', mastered: true },
    { qid: 'Q020', note: 'Différencier = varier les chemins, PAS les objectifs. Erreur classique de ma part.', added: 'il y a 5 jours', mastered: false },
    { qid: 'Q016', note: 'Chercher la figure structurante avant la figure ornementale.', added: 'il y a 1 semaine', mastered: false }
  ],
  exams: [
    { bp: 'BP-CRMEF-FR-01', date: '25 juillet 2026', score: 13, total: 20, duration: '1h12', sections: [{ n: "Sciences de l'éducation", s: 6, t: 8 }, { n: 'Didactique', s: 4, t: 7 }, { n: 'Spécialité', s: 3, t: 5 }] }
  ]
};

/* Profils d'accès pour tester chaque écran */
DATA.personas = {
  visitor:  { label: 'Visiteur non connecté', plan: 'none' },
  free:     { label: 'Compte gratuit', plan: 'free' },
  premium:  { label: 'Abonné premium', plan: 'premium' },
  admin:    { label: 'Formateur / administrateur', plan: 'admin' }
};

/* ------------------------------------------------------------------ */
/* Offres                                                             */
/* ------------------------------------------------------------------ */
DATA.plans = [
  {
    id: 'free', name: 'Gratuit', price: 0, period: '', cta: 'Créer un compte',
    tag: null,
    features: [
      { t: 'Diagnostic initial complet', ok: true },
      { t: '10 questions par jour', ok: true },
      { t: 'Profil de maîtrise (aperçu)', ok: true },
      { t: 'Mini-simulateur de 10 questions', ok: true },
      { t: 'Corrections complètes avec justification de chaque option', ok: false },
      { t: 'Séries ciblées et carnet d\'erreurs', ok: false },
      { t: 'Coach et certification', ok: false }
    ]
  },
  {
    id: 'premium', name: 'Premium', price: 149, period: '/ mois', cta: 'Choisir Premium',
    tag: 'Le plus choisi',
    features: [
      { t: 'Banque de questions complète', ok: true },
      { t: 'Corrections intégrales, chaque distracteur justifié', ok: true },
      { t: 'Séries ciblées par compétence et par erreur', ok: true },
      { t: 'Simulateurs complets et rapport détaillé', ok: true },
      { t: 'Questions ouvertes évaluées par grille', ok: true },
      { t: 'Coach de préparation disponible en continu', ok: true },
      { t: 'Certification des acquis', ok: true }
    ]
  },
  {
    id: 'annual', name: 'Premium annuel', price: 1190, period: '/ an', cta: 'Choisir l\'annuel',
    tag: 'Deux mois offerts',
    features: [
      { t: 'Tout le contenu Premium', ok: true },
      { t: 'Accès garanti jusqu\'après la session', ok: true },
      { t: 'Deux mois offerts sur l\'année', ok: true },
      { t: 'Priorité sur les nouvelles spécialités', ok: true },
      { t: 'Export de la progression en PDF', ok: true },
      { t: 'Certification incluse', ok: true },
      { t: 'Tarif bloqué au renouvellement', ok: true }
    ]
  }
];

/* ------------------------------------------------------------------ */
/* Certification                                                      */
/* ------------------------------------------------------------------ */
DATA.certifications = [
  {
    id: 'CERT-SE', pillar: 'SE', name: "Fondamentaux des sciences de l'éducation",
    desc: "Atteste la maîtrise des cadres théoriques de l'apprentissage, de l'évaluation et du système éducatif marocain.",
    requirements: [
      { t: 'Score de maîtrise ≥ 70 sur les 5 compétences du pilier', done: true, detail: '5 compétences sur 5' },
      { t: 'Au moins 150 questions traitées sur le pilier', done: true, detail: '179 questions' },
      { t: 'Un examen blanc terminé au cours des 60 derniers jours', done: true, detail: 'le 25 juillet 2026' },
      { t: 'Épreuve certifiante réussie (≥ 75 %)', done: true, detail: '82 % le 12 juillet 2026' }
    ],
    duration: 45, questions: 30, threshold: 75, attempts: 2
  },
  {
    id: 'CERT-DI', pillar: 'DI', name: 'Didactique du français',
    desc: "Atteste la capacité à analyser une production d'élève, identifier un obstacle et concevoir une remédiation.",
    requirements: [
      { t: 'Score de maîtrise ≥ 70 sur les 5 compétences du pilier', done: false, detail: '1 compétence sur 5 atteinte' },
      { t: 'Au moins 150 questions traitées sur le pilier', done: false, detail: '125 questions' },
      { t: 'Deux questions ouvertes évaluées ≥ 70 %', done: false, detail: '1 sur 2' },
      { t: 'Épreuve certifiante réussie (≥ 75 %)', done: false, detail: 'non tentée' }
    ],
    duration: 60, questions: 24, threshold: 75, attempts: 2
  },
  {
    id: 'CERT-SP', pillar: 'SP', name: 'Langue et littérature françaises',
    desc: "Atteste la maîtrise disciplinaire : système de la langue, analyse littéraire, histoire des courants.",
    requirements: [
      { t: 'Score de maîtrise ≥ 70 sur les 4 compétences du pilier', done: false, detail: '2 compétences sur 4 atteintes' },
      { t: 'Au moins 120 questions traitées sur le pilier', done: true, detail: '134 questions' },
      { t: 'Un examen blanc terminé au cours des 60 derniers jours', done: true, detail: 'le 25 juillet 2026' },
      { t: 'Épreuve certifiante réussie (≥ 75 %)', done: false, detail: 'non tentée' }
    ],
    duration: 45, questions: 28, threshold: 75, attempts: 2
  }
];

DATA.issuedCert = {
  code: 'NJH-SE-2026-4K7P2',
  cert: 'CERT-SE',
  name: "Fondamentaux des sciences de l'éducation",
  holder: 'Salma Bennani',
  issued: '12 juillet 2026',
  expires: '12 juillet 2028',
  score: 82,
  level: 'Maîtrise confirmée',
  breakdown: [
    { comp: 'SE1', score: 86 }, { comp: 'SE2', score: 74 }, { comp: 'SE3', score: 91 },
    { comp: 'SE4', score: 80 }, { comp: 'SE5', score: 78 }
  ]
};

/* ------------------------------------------------------------------ */
/* Coach — scénarios de réponse simulés                               */
/* ------------------------------------------------------------------ */
DATA.coachSuggestions = [
  "Par quoi je commence aujourd'hui ?",
  "Pourquoi tu me recommandes la didactique ?",
  "Explique-moi l'accord du participe passé avec avoir",
  "Construis-moi un plan pour les 6 prochaines semaines",
  "Je n'ai que 20 minutes, que faire ?"
];

DATA.coachScripts = [
  {
    match: ['commence', 'aujourd', 'quoi faire', 'démarrer'],
    text: "Aujourd'hui, je te propose de commencer par **DI2 — Obstacles d'apprentissage**, ta compétence la plus faible parmi celles qui pèsent le plus dans l'épreuve.\n\nConcrètement, sur 25 minutes :\n\n1. **8 questions ciblées** sur l'analyse d'erreurs d'élèves\n2. **Relire 2 fiches** de ton carnet d'erreurs, dont celle sur l'accord du participe passé\n3. **1 question ouverte** pour t'entraîner à rédiger l'analyse\n\nPourquoi cet ordre : le QCM réactive la notion, le carnet consolide ce que tu as déjà identifié comme fragile, et la rédaction transforme la reconnaissance en production — c'est là que se joue l'écart entre 44 et 65 sur cette compétence.",
    actions: [{ label: 'Lancer la série de 8 questions', route: '#/app/entrainement' }, { label: 'Ouvrir mon carnet', route: '#/app/carnet' }]
  },
  {
    match: ['pourquoi', 'recommand', 'didactique'],
    text: "Trois éléments de tes données, dans cet ordre :\n\n**1. Ton score est bas là où le poids est élevé.** DI2 est à 44 sur 100, et la didactique représente 7 questions sur 20 dans le blueprint de l'épreuve écrite.\n\n**2. Ta tendance est négative.** Tu as perdu 6 points sur cette compétence en deux semaines : sur tes 12 dernières réponses en analyse d'erreur, 5 étaient justes contre 8 sur les 12 précédentes.\n\n**3. Tes erreurs se ressemblent.** Trois fois sur quatre, tu as choisi l'option qui qualifie l'erreur d'élève de « manque d'attention ». C'est un schéma, pas un hasard — et c'est exactement ce que les correcteurs sanctionnent.\n\nJe ne te recommande donc pas la didactique parce qu'elle est difficile en général, mais parce que **ton profil d'erreur y est identifiable et corrigeable**.",
    actions: [{ label: 'Voir le détail de DI2', route: '#/app/progression' }]
  },
  {
    match: ['participe', 'accord', 'avoir', 'cod'],
    text: "Voici la règle, puis le test qui te débloquera.\n\n**La règle.** Le participe passé employé avec *avoir* s'accorde avec le complément d'objet direct **seulement si ce COD est placé avant** le verbe.\n\n**Le test en trois temps :**\n1. Je repère le participe : *« Les décisions qu'a **prises** le conseil »*\n2. Je pose la question « quoi ? » après le verbe : *a pris **quoi** ?* → *qu'*, mis pour *les décisions*\n3. Ce COD est-il avant le verbe ? Oui → j'accorde. Non → j'invariabilise.\n\n**Ton point de blocage précis.** Tu réussis quand le COD est un nom visible, tu échoues quand c'est un pronom relatif ou personnel. Le pronom masque le genre et le nombre, donc ton automatisme ne se déclenche pas.\n\n**Le réflexe à installer :** dès que tu vois *que*, *l'*, *les* devant un participe avec *avoir*, remplace mentalement le pronom par le nom qu'il reprend. *« Les décisions qu'a prises »* → *« a pris les décisions »* → féminin pluriel → **prises**.",
    actions: [{ label: "S'entraîner sur 6 questions d'accord", route: '#/app/entrainement' }]
  },
  {
    match: ['plan', 'semaine', 'planning', 'programme', 'organis'],
    text: "Il te reste **110 jours** avant l'écrit du 22 novembre. Voici un plan en trois blocs, calé sur ton profil réel.\n\n**Semaines 1-2 — Colmater**\nPriorité à SE5 (39) et DI2 (44). 30 minutes par jour, dont 20 de QCM ciblé et 10 de carnet d'erreurs. Objectif : franchir 55 sur les deux.\n\n**Semaines 3-4 — Consolider**\nDI5 (48) et SE2 (52), plus une question ouverte par semaine. Un examen blanc en fin de semaine 4 pour mesurer le transfert.\n\n**Semaines 5-6 — Couvrir et certifier**\nRévision espacée sur tout ce qui est au-dessus de 70, pour éviter l'érosion. Tentative de certification sur le pilier Sciences de l'éducation, où tu es le plus proche du seuil.\n\n**Un avertissement.** Ce plan suppose une régularité de cinq jours sur sept. Ta série actuelle est de 12 jours, ce qui est bon signe. Si tu descends sous trois séances par semaine, je réviserai les objectifs à la baisse plutôt que de te laisser accumuler du retard invisible.",
    actions: [{ label: 'Régler ma routine quotidienne', route: '#/app/parametres' }]
  },
  {
    match: ['20 minutes', '20min', 'peu de temps', 'pas le temps', 'court'],
    text: "Vingt minutes bien employées, sur ton profil, cela donne :\n\n**0 → 5 min** — Les 3 fiches non maîtrisées de ton carnet d'erreurs. Lecture seule, sans exercice.\n\n**5 → 17 min** — 6 questions ciblées sur DI2. C'est court, donc je réduis la variété : une seule compétence, pour éviter le coût de changement de contexte.\n\n**17 → 20 min** — Tu relis les justifications des questions ratées. Pas les bonnes réponses : **les justifications des options que tu as choisies à tort**. C'est là que se trouve l'information utile.\n\nCe format court est efficace s'il est régulier. Un créneau de vingt minutes cinq fois par semaine produit davantage qu'une session de deux heures le dimanche.",
    actions: [{ label: 'Lancer la série de 6 questions', route: '#/app/entrainement' }]
  }
];

DATA.coachFallback = {
  text: "Je n'ai pas de réponse préparée pour cette formulation dans le prototype.\n\nDans la version réelle, cette question serait traitée par un modèle de langage connecté à ton profil de maîtrise, à ton historique de réponses et au référentiel de compétences — avec une contrainte stricte : ne jamais inventer de contenu de concours, et toujours citer la source du référentiel utilisée.\n\nEssaie l'une des suggestions ci-dessous pour voir une réponse complète.",
  actions: []
};

/* ------------------------------------------------------------------ */
/* Traductions de l'interface                                         */
/* ------------------------------------------------------------------ */
DATA.i18n = {
  fr: {
    nav_concours: 'Concours', nav_annales: 'Annales', nav_ressources: 'Ressources', nav_calendrier: 'Calendrier',
    nav_tarifs: 'Tarifs', nav_login: 'Se connecter', nav_start: 'Commencer gratuitement',
    side_home: 'Aujourd\'hui', side_diag: 'Diagnostic', side_train: 'Entraînement', side_open: 'Questions ouvertes',
    side_sim: 'Simulateur', side_coach: 'Coach', side_book: 'Carnet d\'erreurs', side_prog: 'Progression',
    side_cert: 'Certification', side_sub: 'Abonnement', side_set: 'Paramètres',
    g_prepare: 'Préparer', g_verify: 'Vérifier ses acquis', g_account: 'Mon compte',
    next: 'Suivant', prev: 'Précédent', validate: 'Valider', submit: 'Soumettre', finish: 'Terminer',
    correct: 'Correcte', wrong: 'Incorrecte', yourAnswer: 'Votre réponse', saved: 'Enregistré', saving: 'Enregistrement',
    why: 'Pourquoi cette recommandation ?', source: 'Source', competency: 'Compétence', cognitive: 'Niveau cognitif',
    difficulty: 'Difficulté', mastery: 'Maîtrise', evidence: 'Évidence', premium: 'Premium',
    rat_header: 'Justification de chaque option', rat_partial: 'Correction partielle',
    rat_ok: 'Réponse correcte', rat_no: 'Option incorrecte', rat_yours: 'votre choix',
    rat_trap: 'Piège fréquent.', rat_loc: 'Localisation', rat_version: 'Version',
    act_book: 'Ajouter au carnet', act_report: 'Signaler', act_distrib: 'Distribution des réponses des candidats',
    lbl_serie: 'Série ciblée', lbl_quit: 'Quitter', lbl_overview: 'Aperçu', lbl_goal: 'Objectif',
    lbl_before: "avant l'écrit", lbl_streak: 'Série de {n} jours', lbl_answered: 'répondues',
    lbl_rate: '{p} % de réussite sur {n} passages', lbl_of: 'sur'
  },
  ar: {
    nav_concours: 'المباريات', nav_annales: 'الامتحانات السابقة', nav_ressources: 'الموارد', nav_calendrier: 'الرزنامة',
    nav_tarifs: 'الأسعار', nav_login: 'تسجيل الدخول', nav_start: 'ابدأ مجانًا',
    side_home: 'اليوم', side_diag: 'التشخيص', side_train: 'التدريب', side_open: 'الأسئلة المفتوحة',
    side_sim: 'المحاكي', side_coach: 'المرافق', side_book: 'دفتر الأخطاء', side_prog: 'التقدم',
    side_cert: 'الإشهاد', side_sub: 'الاشتراك', side_set: 'الإعدادات',
    g_prepare: 'الاستعداد', g_verify: 'التحقق من المكتسبات', g_account: 'حسابي',
    next: 'التالي', prev: 'السابق', validate: 'تأكيد', submit: 'إرسال', finish: 'إنهاء',
    correct: 'صحيحة', wrong: 'خاطئة', yourAnswer: 'جوابك', saved: 'تم الحفظ', saving: 'جارٍ الحفظ',
    why: 'لماذا هذه التوصية؟', source: 'المصدر', competency: 'الكفاية', cognitive: 'المستوى المعرفي',
    difficulty: 'الصعوبة', mastery: 'التمكن', evidence: 'الأدلة', premium: 'مدفوع',
    rat_header: 'تعليل كل خيار', rat_partial: 'تصحيح جزئي',
    rat_ok: 'الجواب الصحيح', rat_no: 'خيار خاطئ', rat_yours: 'اختيارك',
    rat_trap: 'مَزلق شائع.', rat_loc: 'الموضع', rat_version: 'النسخة',
    act_book: 'أضف إلى الدفتر', act_report: 'إبلاغ', act_distrib: 'توزيع أجوبة المترشحين',
    lbl_serie: 'سلسلة موجهة', lbl_quit: 'خروج', lbl_overview: 'نظرة عامة', lbl_goal: 'الهدف',
    lbl_before: 'قبل الاختبار الكتابي', lbl_streak: 'مواظبة {n} يومًا', lbl_answered: 'مُجابة',
    lbl_rate: 'نسبة النجاح {p} % على {n} محاولة', lbl_of: 'من'
  }
};

/* ------------------------------------------------------------------ */
/* Portails — trois portes d'entrée                                   */
/* ------------------------------------------------------------------ */
DATA.portals = [
  {
    id: 'education', icon: 'cap', live: true,
    name: "Métiers de l'éducation",
    door: "Devenir enseignant, inspecteur ou agrégé",
    examples: 'CRMEF · Inspection · Agrégation',
    lede: "Préparez le concours d'accès aux CRMEF avec des corrections qui expliquent chacune de vos erreurs, un suivi par compétence et des examens blancs conformes au format réel.",
    audience: "Pour les licenciés et les enseignants qui préparent un concours de l'Éducation nationale.",
    families: ['crmef', 'inspection', 'agregation'],
    stats: [
      { k: 'Questions publiées', v: '800' },
      { k: 'Annales corrigées', v: '8' },
      { k: 'Compétences suivies', v: '14' },
      { k: 'Spécialités ouvertes', v: '2' }
    ],
    free: [
      { icon: 'target', t: 'Testez votre niveau en 10 questions', d: "Sans compte, sans carte bancaire. Vous obtenez un résultat par compétence, pas seulement un score.", cta: 'Commencer le test', route: '#/essai/education', primary: true },
      { icon: 'file', t: 'Annales corrigées', d: "Les sujets des sessions passées, avec corrigé, source identifiée et année.", cta: 'Consulter les annales', route: '#/annales' },
      { icon: 'book', t: 'Fiches et méthodes', d: "Législation, didactique, méthodologie de l'oral. Rédigées par des formateurs, sourcées.", cta: 'Lire les fiches', route: '#/ressources' },
      { icon: 'calendar', t: 'Calendrier des concours', d: "Dates d'inscription, épreuves et résultats, avec la source de chaque annonce.", cta: 'Voir le calendrier', route: '#/calendrier' }
    ],
    proof: 'Q007',
    planWords: {
      free: ['Test de niveau complet', '10 questions par jour', 'Aperçu de votre profil de compétences', 'Mini-simulateur', 'Annales sélectionnées'],
      premium: ['800 questions CRMEF avec chaque distracteur justifié', 'Annales corrigées intégrales', 'Séries ciblées sur vos points faibles', 'Examens blancs conformes au blueprint', "Carnet d'erreurs et suivi par compétence"],
      annual: ['Tout le contenu Premium', "Accès garanti jusqu'après la session", 'Deux mois offerts', 'Priorité sur les nouvelles spécialités']
    },
    faq: [
      ["Quelles spécialités sont ouvertes ?", "Français et Mathématiques du secondaire qualifiant. Nous n'ouvrons une spécialité qu'après une double révision de son contenu par des formateurs. Les autres arrivent progressivement."],
      ["Le contenu est-il à jour de la session en cours ?", "Chaque question porte une version, une source et une date d'entrée en vigueur. Quand un texte de référence change, la question est révisée et une nouvelle version publiée."],
      ["Puis-je travailler en arabe ?", "L'interface est intégralement bilingue avec un rendu de droite à gauche. La traduction du contenu progresse question par question, après relecture linguistique."],
      ["Que se passe-t-il si une correction me semble fausse ?", "Un bouton de signalement figure sur chaque question. Il ouvre un ticket éditorial suivi ; si l'erreur est confirmée, la question est corrigée et republiée."]
    ]
  },
  {
    id: 'postbac', icon: 'stethoscope', live: false,
    name: 'Concours post-bac',
    door: 'Médecine, ingénieur, commerce',
    examples: 'Médecine · ENSA · ENCG · ISCAE',
    lede: "Préparation aux concours d'accès aux facultés de médecine, aux écoles d'ingénieurs et aux écoles de commerce.",
    audience: "Pour les bacheliers et les étudiants en classes préparatoires.",
    families: ['medecine', 'ingenieur', 'commerce'],
    stats: [
      { k: 'Ouverture prévue', v: '2027' },
      { k: 'Concours visés', v: '5' },
      { k: 'Questions en préparation', v: '1 200' },
      { k: "Sur liste d'attente", v: '340' }
    ],
    free: [
      { icon: 'calendar', t: 'Calendrier des concours', d: "Dates des concours post-bac déjà annoncées, mises à jour à chaque publication officielle.", cta: 'Voir le calendrier', route: '#/calendrier' },
      { icon: 'book', t: 'Fiches méthodologiques', d: "Organisation des révisions, gestion du temps en épreuve, choix de filière.", cta: 'Lire les fiches', route: '#/ressources' }
    ],
    proof: null,
    planWords: {
      free: ['Test de niveau complet', '10 questions par jour', 'Aperçu de votre profil', 'Mini-simulateur', 'Annales sélectionnées'],
      premium: ['Banque complète de sciences fondamentales', 'Chaque distracteur justifié', 'Séries ciblées', 'Concours blancs chronométrés', "Carnet d'erreurs"],
      annual: ['Tout le contenu Premium', "Accès garanti jusqu'aux concours", 'Deux mois offerts', 'Priorité sur les nouvelles filières']
    },
    faq: [
      ["Quand ouvrez-vous cette filière ?", "Nous ouvrons un concours seulement lorsque son contenu atteint notre seuil de qualité éditoriale : chaque question relue deux fois, chaque distracteur justifié, chaque source vérifiée. L'inscription à la liste d'attente vous prévient dès l'ouverture."],
      ["Puis-je déjà utiliser la plateforme ?", "Le calendrier et les fiches méthodologiques sont accessibles. Les banques de questions post-bac sont en cours de constitution."]
    ]
  },
  {
    id: 'pro', icon: 'columns', live: false,
    name: 'Concours professionnels',
    door: 'Fonction publique, santé, technique',
    examples: 'Administration · ISPITS · Douane',
    lede: "Préparation aux concours de recrutement de la fonction publique et des professions de santé.",
    audience: "Pour les candidats aux concours administratifs et techniques.",
    families: ['administration', 'sante'],
    stats: [
      { k: 'Ouverture prévue', v: '2027' },
      { k: 'Concours visés', v: '4' },
      { k: 'Questions en préparation', v: '600' },
      { k: "Sur liste d'attente", v: '120' }
    ],
    free: [
      { icon: 'calendar', t: 'Calendrier des concours', d: "Avis de concours et échéances de candidature, avec la source officielle de chaque annonce.", cta: 'Voir le calendrier', route: '#/calendrier' },
      { icon: 'book', t: 'Fiches de culture administrative', d: "Repères sur le droit administratif, la note de synthèse et la culture générale.", cta: 'Lire les fiches', route: '#/ressources' }
    ],
    proof: null,
    planWords: {
      free: ['Test de niveau complet', '10 questions par jour', 'Aperçu de votre profil', 'Mini-simulateur', 'Ressources sélectionnées'],
      premium: ['Banque complète par concours', 'Chaque distracteur justifié', 'Séries ciblées', 'Épreuves blanches chronométrées', "Carnet d'erreurs"],
      annual: ['Tout le contenu Premium', "Accès garanti jusqu'aux épreuves", 'Deux mois offerts', 'Priorité sur les nouveaux concours']
    },
    faq: [
      ["Quels concours seront couverts en premier ?", "Administrateur 2ᵉ grade et soins infirmiers, où la demande est la plus régulière et le programme le plus stable."],
      ["Comment être prévenu de l'ouverture ?", "Inscrivez-vous à la liste d'attente. Nous n'envoyons qu'un message à l'ouverture de votre concours, rien d'autre."]
    ]
  }
];
