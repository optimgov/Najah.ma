/* =========================================================================
   NAJAH.ma — Portail d'orientation, pages de porte, essai gratuit
   ========================================================================= */

const portal = id => DATA.portals.find(p => p.id === id);

/* ---------------- Accueil : on n'argumente pas, on oriente ---------------- */
route('/', () => shellPublic(`
  <section class="portal"><div class="wrap">
    <div class="kicker">Plateforme marocaine de préparation aux concours</div>
    <h1>Préparez votre concours en sachant exactement quoi travailler.</h1>
    <p class="lede">Najah.ma ne se contente pas de vous dire que vous vous êtes trompé. Elle vous explique <b>pourquoi</b>, ce qu'il faut corriger, et vérifie quelques jours plus tard que l'erreur a disparu.</p>

    <div class="ask">Quel concours préparez-vous ?</div>

    <div class="doors">
      ${DATA.portals.map(p => `
        <a class="door ${p.live ? 'on' : 'soon'}" href="#/p/${p.id}">
          <div class="dbadge">${p.live ? badge('Ouvert', 'good') : badge('Bientôt', 'outline')}</div>
          <div class="dico">${p.icon}</div>
          <h3>${esc(p.name)}</h3>
          <div class="dsub">${esc(p.door)}</div>
          <div class="dex">${esc(p.examples)}</div>
          <div class="dgo">${p.live ? 'Entrer' : "Voir l'avancement"} <span class="arw">→</span></div>
        </a>`).join('')}
    </div>

    <div class="trust">
      <div><b>Chaque erreur est expliquée</b><span>La bonne réponse, mais aussi pourquoi chacune des autres est fausse — avec sa source.</span></div>
      <div><b>Un suivi par compétence</b><span>Pas un score global, mais une carte de ce que vous maîtrisez vraiment.</span></div>
      <div><b>Français et arabe</b><span>Interface intégralement bilingue, pensée d'abord pour le téléphone.</span></div>
    </div>
  </div></section>

  <section class="wrap" style="padding:56px 20px 0">
    <div class="grid" style="grid-template-columns:.95fr 1.05fr;gap:38px;align-items:center">
      <div>
        <h2>Voici à quoi ressemble une correction</h2>
        <p class="dim" style="margin-top:12px">Sur la plupart des plateformes, l'écran s'arrête à « mauvaise réponse ». C'est là que le nôtre commence : chaque option fausse est justifiée, le piège fréquent est nommé, la source est citée.</p>
        <p class="dim">C'est notre critère de publication, pas une option. Aucune question n'entre dans la banque sans cela.</p>
        <a class="btn btn-primary" href="#/p/education">Essayer sur 10 questions</a>
      </div>
      <div>${proofCard('Q007')}</div>
    </div>
  </section>

  <section class="wrap" style="padding:56px 20px 20px">
    <div class="card center" style="background:linear-gradient(135deg,var(--brand-800),var(--brand-600));color:#fff;border:0;padding:42px 26px">
      <h2 style="color:#fff">Commencez par savoir où vous en êtes</h2>
      <p style="opacity:.92;max-width:52ch;margin:12px auto 0">Dix questions, aucun compte, aucune carte bancaire. Vous obtenez un résultat par compétence — pas seulement une note.</p>
      <a class="btn btn-lg mt24" style="background:#fff;color:var(--brand-800)" href="#/essai/education">Tester mon niveau</a>
    </div>
  </section>`, 'home'));

/* Carte de preuve : une correction réelle, en miniature */
function proofCard(qid) {
  const q = DATA.questions.find(x => x.id === qid);
  return `<div class="card" style="padding:0;overflow:hidden">
    <div style="padding:15px 20px;border-block-end:1px solid var(--line);background:var(--surface)">
      <div class="row-between"><b style="font-size:.9rem">Exemple de correction</b>${badge(comp(q.comp).short, 'brand')}</div>
    </div>
    <div style="padding:18px 20px">
      <div class="small dim" style="margin-bottom:11px">${esc(q.stem)}</div>
      <div class="choices">
        <div class="choice wrong"><span class="k">D</span><span class="t small">${esc(q.choices[3].t)}</span><span class="tagend">Votre réponse</span></div>
        <div class="choice correct"><span class="k">B</span><span class="t small">${esc(q.choices[1].t)}</span><span class="tagend">Correcte</span></div>
      </div>
      <div class="rationale" style="margin-top:14px">
        <header>✓ Pourquoi D est faux</header>
        <div class="body"><div class="rat-item"><p>${md(q.rationales.D)}</p></div></div>
      </div>
    </div>
  </div>`;
}

/* ---------------- Page de porte ---------------- */
route('/p/:id', r => {
  const p = portal(r.parts[1]);
  if (!p) return notFound();
  const fams = p.families.map(f => DATA.families.find(x => x.id === f)).filter(Boolean);

  return shellPublic(`
  <section class="dhero"><div class="wrap">
    <div class="crumb"><a href="#/">Accueil</a> › ${esc(p.name)}</div>
    <div class="row" style="gap:14px;align-items:flex-start">
      <div class="dico" style="margin:0">${p.icon}</div>
      <div style="flex:1;min-width:260px">
        <div class="row" style="gap:9px"><h1 style="font-size:clamp(1.7rem,3.6vw,2.6rem)">${esc(p.name)}</h1>
          ${p.live ? badge('Contenu ouvert', 'good') : badge('Ouverture prochaine', 'outline')}</div>
        <p class="lede" style="margin-top:12px">${esc(p.lede)}</p>
        <div class="small muted">${esc(p.audience)}</div>
        ${p.live ? `<div class="row row-wrap mt24">
          <a class="btn btn-primary btn-lg" href="#/essai/${p.id}">Tester mon niveau — 10 questions</a>
          <a class="btn btn-ghost btn-lg" href="#free">Voir le contenu gratuit</a>
        </div>
        <div class="row row-wrap mt16 small muted" style="gap:20px"><span>✓ Sans compte</span><span>✓ Sans carte bancaire</span><span>✓ 4 minutes</span></div>`
        : `<div class="row row-wrap mt24"><a class="btn btn-primary btn-lg" href="#waitlist">Être prévenu de l'ouverture</a>
           <a class="btn btn-ghost btn-lg" href="#free">Ce qui est déjà disponible</a></div>`}
      </div>
    </div>
    <div class="statline">
      ${p.stats.map(s => `<div><span>${esc(s.k)}</span><b>${esc(s.v)}</b></div>`).join('')}
    </div>
  </div></section>

  <div class="wrap">
    <section class="section">
      <div class="shead"><h2>Les concours de cette filière</h2>
        <div class="ssub">Nous n'ouvrons un concours qu'une fois son contenu validé par une double révision. Le reste est annoncé sans être promis.</div></div>
      <div class="grid g3">
        ${fams.map(f => f.live
          ? `<a class="card card-hover card-link" href="#/concours/${f.id}">
              <div class="row-between"><span style="font-size:1.4rem">${f.icon}</span>${badge('Ouvert', 'good')}</div>
              <h3 style="margin-top:11px">${esc(f.short)}</h3>
              <p class="small dim" style="margin:5px 0 10px">${esc(f.tagline)}</p>
              <div class="xsmall muted">${f.specialties.filter(s => s.live).length} spécialité(s) ouverte(s) sur ${f.specialties.length}</div>
              <div class="dgo" style="margin-top:12px">Découvrir <span class="arw">→</span></div></a>`
          : `<div class="card card-flat" style="opacity:.68">
              <div class="row-between"><span style="font-size:1.4rem">${f.icon}</span>${badge('Bientôt', 'outline')}</div>
              <h3 style="margin-top:11px">${esc(f.short)}</h3>
              <p class="small dim" style="margin:5px 0 0">${esc(f.tagline)}</p></div>`).join('')}
      </div>
    </section>

    <section class="section" id="free">
      <div class="shead"><h2>Ce qui est gratuit, tout de suite</h2>
        <div class="ssub">Sans compte et sans paiement. Ce n'est pas un extrait bridé : c'est du contenu réellement utilisable, qui sert à juger notre travail avant de payer quoi que ce soit.</div></div>
      <div class="grid ${p.free.length > 2 ? 'g2' : 'g2'}">
        ${p.free.map(f => `<div class="freecard ${f.primary ? 'hot' : ''}">
          <div class="fico">${f.icon}</div>
          <div style="flex:1">
            <h4>${esc(f.t)}</h4><p>${esc(f.d)}</p>
            <a class="btn btn-sm ${f.primary ? 'btn-primary' : 'btn-ghost'}" href="${f.route}">${esc(f.cta)}</a>
          </div></div>`).join('')}
      </div>
    </section>

    ${p.proof ? `<section class="section">
      <div class="grid" style="grid-template-columns:.95fr 1.05fr;gap:36px;align-items:center">
        <div>
          <h2>Une correction qui sert à quelque chose</h2>
          <p class="dim" style="margin-top:12px">Chaque question explique la bonne réponse <b>et chacune des mauvaises</b>. Vous voyez le piège fréquent, la compétence évaluée, la source officielle et sa date de validité.</p>
          <p class="dim">C'est la différence entre savoir qu'on s'est trompé et comprendre pourquoi.</p>
          <a class="btn btn-primary" href="#/essai/${p.id}">Essayer sur 10 questions</a>
        </div>
        <div>${proofCard(p.proof)}</div>
      </div></section>` : ''}

    ${p.live ? `<section class="section" id="tarifs">
      <div class="shead center"><h2>Passer au niveau supérieur</h2>
        <div class="ssub" style="margin-inline:auto">Le gratuit vous montre où vous en êtes. Le premium vous donne de quoi progresser : la banque complète, les corrections intégrales et les examens blancs.</div></div>
      <div class="grid g3 mt24">
        ${DATA.plans.map(pl => {
          const words = p.planWords[pl.id === 'free' ? 'free' : pl.id === 'premium' ? 'premium' : 'annual'];
          return `<div class="card" style="${pl.tag ? 'border-color:var(--brand-600);box-shadow:var(--shadow-2)' : ''};display:flex;flex-direction:column">
            ${pl.tag ? `<div style="margin-bottom:10px">${badge(pl.tag, 'brand')}</div>` : '<div style="height:30px"></div>'}
            <h3 style="font-size:1.15rem">${esc(pl.name)}</h3>
            <div style="margin:8px 0 16px"><span style="font-size:2.1rem;font-weight:750;letter-spacing:-.03em">${pl.price === 0 ? '0' : pl.price} DH</span>
              <span class="muted small">${esc(pl.price === 0 ? 'sans carte bancaire' : pl.period)}</span></div>
            <div class="col" style="gap:8px;flex:1">
              ${words.map(w => `<div class="row small" style="gap:9px;align-items:flex-start">
                <span style="color:var(--good-ink);flex:none;font-weight:700">✓</span><span style="flex:1;min-width:0">${esc(w)}</span></div>`).join('')}
            </div>
            <a class="btn ${pl.tag ? 'btn-primary' : 'btn-ghost'} btn-block mt16" href="${pl.id === 'free' ? '#/app/onboarding' : '#/app/abonnement'}">${esc(pl.cta)}</a>
          </div>`;
        }).join('')}
      </div>
      <p class="xsmall muted center mt16">Paiement mensuel sans engagement, résiliable à tout moment. Les droits d'accès sont vérifiés côté serveur.</p>
    </section>` : `
    <section class="section" id="waitlist">
      <div class="waitlist">
        <h2 style="font-size:1.35rem">Être prévenu de l'ouverture</h2>
        <p class="dim" style="max-width:58ch;margin-top:8px">Nous vous enverrons un seul message, à l'ouverture de votre concours. Pas de lettre d'information, pas de relance commerciale.</p>
        <div class="row mt16">
          <input class="input" placeholder="votre@email.ma" aria-label="Adresse e-mail">
          <select class="select" style="max-width:220px" aria-label="Concours visé">
            ${fams.map(f => `<option>${esc(f.short)}</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="toast('Inscription enregistrée — vous serez prévenu à l\\'ouverture')">M'inscrire</button>
        </div>
        <div class="hint mt8">${esc(p.stats[3] ? p.stats[3].v + ' personnes déjà inscrites.' : '')}</div>
      </div>
    </section>`}

    <section class="section" style="padding-bottom:20px">
      <div class="shead"><h2>Questions fréquentes</h2></div>
      <div class="grid g2">
        ${p.faq.map(([q, a]) => `<details class="card card-pad-sm">
          <summary style="cursor:pointer;font-weight:650;font-size:.94rem">${esc(q)}</summary>
          <p class="small dim" style="margin:10px 0 0">${esc(a)}</p></details>`).join('')}
      </div>
    </section>
  </div>`, 'home');
});

/* ---------------- Essai gratuit sans compte ---------------- */
function startEssai(pid) {
  // Couverture des trois piliers : le résultat doit être lisible par pilier
  const byPillar = { SE: [], DI: [], SP: [] };
  DATA.questions.forEach(q => byPillar[comp(q.comp).pillar].push(q.id));
  const take = (arr, n) => arr.filter((_, i) => i % Math.max(1, Math.floor(arr.length / n)) === 0).slice(0, n);
  const ids = [...take(byPillar.SE, 4), ...take(byPillar.DI, 3), ...take(byPillar.SP, 3)];
  S.essai = { pid, ids, i: 0, answers: {}, done: false };
  navigate('#/essai/' + pid);
}

route('/essai/:id', r => {
  const p = portal(r.parts[1]);
  if (!p) return notFound();
  if (!p.live) return notFound();
  const e = S.essai;

  if (!e || e.pid !== p.id) {
    return shellPublic(`<div class="wrap-narrow" style="padding:46px 20px 0">
      <div class="crumb"><a href="#/">Accueil</a> › <a href="#/p/${p.id}">${esc(p.name)}</a> › Test de niveau</div>
      <h1 style="font-size:clamp(1.7rem,3.4vw,2.4rem)">Test de niveau — ${esc(p.name)}</h1>
      <p class="lede">Dix questions issues de la banque réelle, réparties sur les trois piliers de l'épreuve. Aucun compte, aucune carte bancaire.</p>
      <div class="grid g3 mt24">
        ${[['⏱', '4 minutes', 'Dix questions, sans chronomètre contraignant'],
           ['▤', 'Résultat par compétence', 'Pas une note, une carte de vos points forts et faibles'],
           ['🔓', 'Rien à installer', 'Vous pouvez arrêter et reprendre à tout moment']
        ].map(([i, t, d]) => `<div class="card card-pad-sm"><div style="font-size:1.3rem">${i}</div>
          <b class="small" style="display:block;margin-top:7px">${t}</b><span class="xsmall muted">${d}</span></div>`).join('')}
      </div>
      <div class="card card-flat mt24">
        <b class="small">Ce que nous ne faisons pas</b>
        <p class="small dim" style="margin:6px 0 0">Nous ne vous donnerons pas de probabilité de réussite au concours. Dix questions ne permettent pas de la calculer honnêtement, et une prédiction mal calibrée décourage ou rassure à tort.</p>
      </div>
      <div class="row row-wrap mt24"><button class="btn btn-primary btn-lg" onclick="startEssai('${p.id}')">Commencer le test</button>
        <a class="btn btn-quiet" href="#/p/${p.id}">Retour</a></div>
    </div>`, 'home');
  }

  if (e.done) return essaiResult(p);

  const q = DATA.questions.find(x => x.id === e.ids[e.i]);
  const ans = e.answers[q.id];
  return shellPublic(`
    <div class="essai-top"><div class="wrap-narrow">
      <div class="row-between" style="margin-bottom:9px">
        <b class="small">Test de niveau — ${esc(p.name)}</b>
        <span class="small muted mono">Question ${e.i + 1} / ${e.ids.length}</span>
      </div>
      <div class="bar bar-thin"><span style="width:${(e.i / e.ids.length) * 100}%"></span></div>
    </div></div>
    <div class="wrap-narrow" style="padding:26px 20px 0">
      ${questionBlock(q, { answer: ans, onPick: `essaiPick('${q.id}',` })}
      <div class="row-between mt24">
        <button class="btn btn-ghost" ${e.i === 0 ? 'disabled' : ''} onclick="S.essai.i--;render()">Précédent</button>
        <button class="btn btn-primary" ${ans === undefined ? 'disabled' : ''} onclick="essaiNext()">
          ${e.i + 1 === e.ids.length ? 'Voir mon résultat' : 'Suivant'}</button>
      </div>
      <p class="xsmall muted center mt16">Les corrections ne sont pas affichées pendant le test : elles fausseraient la mesure. Vous les verrez à la fin.</p>
    </div>`, 'home');
});

function essaiPick(qid, k) { S.essai.answers[qid] = k; render(); }
function essaiNext() {
  if (S.essai.i + 1 >= S.essai.ids.length) S.essai.done = true; else S.essai.i++;
  render();
}

function essaiResult(p) {
  const e = S.essai;
  const ok = e.ids.filter(id => e.answers[id] === DATA.questions.find(q => q.id === id).correct);
  const score = Math.round((ok.length / e.ids.length) * 100);
  const byC = {};
  e.ids.forEach(id => {
    const q = DATA.questions.find(x => x.id === id);
    byC[q.comp] = byC[q.comp] || { ok: 0, n: 0 };
    byC[q.comp].n++; if (ok.includes(id)) byC[q.comp].ok++;
  });
  const rows = Object.entries(byC).map(([c, v]) => ({ c, pct: Math.round(v.ok / v.n * 100), n: v.n })).sort((a, b) => a.pct - b.pct);
  const weakest = rows[0];
  const firstWrong = e.ids.find(id => !ok.includes(id)) || e.ids[0];

  const R = 58, circ = 2 * Math.PI * R;
  return shellPublic(`<div class="wrap-narrow" style="padding:34px 20px 0">
    <div class="scorehero">
      <div class="ring">
        <svg viewBox="0 0 132 132" width="132" height="132" role="img" aria-label="Score ${score} %">
          <circle cx="66" cy="66" r="${R}" fill="none" stroke="var(--surface-3)" stroke-width="11"/>
          <circle cx="66" cy="66" r="${R}" fill="none" stroke="${score >= 70 ? 'var(--good)' : score >= 50 ? 'var(--warn)' : 'var(--critical)'}"
            stroke-width="11" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - score / 100)}"
            transform="rotate(-90 66 66)"/>
          <text x="66" y="72" text-anchor="middle" font-size="30" font-weight="750" fill="var(--ink)">${score}%</text>
        </svg>
      </div>
      <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${ok.length} bonnes réponses sur ${e.ids.length}</h1>
      <p class="muted" style="max-width:50ch;margin:10px auto 0">Dix questions ne suffisent pas à établir un profil fiable. Ce résultat indique une tendance, pas un niveau définitif — et nous préférons vous le dire.</p>
    </div>

    <div class="card">
      <h3 style="font-size:1rem">Vos compétences sur ce test</h3>
      <div class="vsub small muted" style="margin-bottom:14px">Classées de la plus fragile à la plus solide</div>
      ${barsChart(rows.map(x => ({ label: comp(x.c).short, value: x.pct, color: `var(--series-${pillarOf(x.c).serie})`, tip: `${x.pct} % sur ${x.n} question(s)` })), { labelW: 190, unit: ' %' })}
      <div class="legend">${DATA.pillars.map(pl => `<span><i style="background:var(--series-${pl.serie})"></i>${esc(pl.name)}</span>`).join('')}</div>
    </div>

    <div class="reco mt24">
      <div class="icon">◎</div>
      <div style="flex:1">
        <h4>Votre point le plus faible : ${esc(comp(weakest.c).name)}</h4>
        <p class="small dim" style="margin:0">${weakest.pct} % de réussite sur ce test. C'est là qu'un effort produirait le gain le plus rapide.</p>
        <div class="why"><b>Pourquoi cette recommandation ?</b> Elle applique une règle simple et vérifiable : le score le plus bas parmi les compétences ayant le plus de poids dans l'épreuve. Aucun modèle opaque n'intervient.</div>
      </div>
    </div>

    <h2 style="font-size:1.2rem;margin:36px 0 8px">Une de vos erreurs, corrigée</h2>
    <p class="small muted" style="margin-bottom:14px">Voici ce que vous obtenez sur chaque question. Pas seulement la bonne réponse : la raison pour laquelle chacune des autres est fausse.</p>
    ${questionBlock(DATA.questions.find(q => q.id === firstWrong), { answer: e.answers[firstWrong], reveal: true })}

    <div class="gate mt32">
      <h3 style="font-size:1.2rem">Conservez ce résultat</h3>
      <p class="dim" style="max-width:52ch;margin:10px auto 18px">Le compte gratuit garde votre profil, ouvre le test de niveau complet et vous donne dix questions par jour avec leurs corrections. Sans carte bancaire.</p>
      <div class="row" style="justify-content:center">
        <a class="btn btn-primary btn-lg" href="#/app/onboarding">Créer mon compte gratuit</a>
        <a class="btn btn-ghost btn-lg" href="#/p/${p.id}#tarifs">Voir les offres</a>
      </div>
      <div class="xsmall muted mt16">Déjà inscrit ? <a href="#/app" style="color:var(--brand-700)">Se connecter</a></div>
    </div>

    <div class="row center mt24" style="justify-content:center;padding-bottom:10px">
      <button class="btn btn-quiet btn-sm" onclick="S.essai=null;render()">Refaire le test</button>
    </div>
  </div>`, 'home');
}
