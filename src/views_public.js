/* =========================================================================
   NAJAH.ma — Zone publique : catalogue, annales, ressources, tarifs
   ========================================================================= */

route('/concours', () => {
  const byGroup = {};
  DATA.families.forEach(f => { (byGroup[f.group] = byGroup[f.group] || []).push(f); });
  return shellPublic(`<div class="wrap" style="padding:40px 20px 0">
    ${pagehead('Catalogue des concours', "Najah.ma structure sa couverture par famille de concours. Le contenu ouvre spécialité par spécialité, après validation éditoriale.")}
    ${Object.entries(byGroup).map(([g, fams]) => `
      <section style="margin-bottom:38px">
        <div class="row-between" style="margin-bottom:14px">
          <div><h2 style="font-size:1.25rem">${esc(DATA.groups[g].label)}</h2>
          <div class="small muted">${esc(DATA.groups[g].desc)}</div></div>
        </div>
        <div class="grid g3">${fams.map(f => `
          <a class="card card-hover card-link" href="#/concours/${f.id}">
            <div class="row-between"><span style="font-size:1.5rem">${f.icon}</span>${f.live ? badge('Ouvert', 'good') : badge('Bientôt', 'outline')}</div>
            <h3 style="margin-top:11px">${esc(f.short)}</h3>
            <p class="small dim" style="margin:5px 0 10px">${esc(f.tagline)}</p>
            <div class="xsmall muted">${f.specialties.length} spécialité${f.specialties.length > 1 ? 's' : ''} · ${f.specialties.filter(s => s.live).length} ouverte${f.specialties.filter(s => s.live).length > 1 ? 's' : ''}</div>
          </a>`).join('')}</div>
      </section>`).join('')}
  </div>`, 'concours');
});

/* ---------------- Fiche d'une famille ---------------- */
route('/concours/:id', r => {
  const f = DATA.families.find(x => x.id === r.parts[1]);
  if (!f) return notFound();
  const dates = DATA.calendar.filter(c => c.exam === f.short);
  return shellPublic(`<div class="wrap" style="padding:40px 20px 0">
    <div class="small muted" style="margin-bottom:12px"><a href="#/concours" style="text-decoration:none">Concours</a> › ${esc(f.short)}</div>
    ${pagehead(f.name, f.desc, f.live ? badge('Contenu ouvert', 'good') : badge('Ouverture prochaine', 'outline'))}
    ${f.places ? `<div class="quota" style="margin-bottom:24px">📊 ${esc(f.places)}</div>` : ''}
    <div class="grid" style="grid-template-columns:1.6fr 1fr;gap:26px">
      <div>
        <h2 style="font-size:1.2rem;margin-bottom:12px">Spécialités</h2>
        <div class="col" style="gap:10px">
          ${f.specialties.map(s => s.live
            ? `<a class="card card-hover card-link card-pad-sm" href="#/concours/${f.id}/${s.id}">
                <div class="row-between"><div><b>${esc(s.name)}</b>
                <div class="xsmall muted">${esc(s.candidates || '')} · ${s.items} questions publiées</div></div>
                ${badge('Ouvert', 'good')}</div></a>`
            : `<div class="card card-flat card-pad-sm" style="opacity:.62">
                <div class="row-between"><b>${esc(s.name)}</b>${badge('Bientôt', 'outline')}</div></div>`).join('')}
        </div>
      </div>
      <div>
        ${dates.length ? `<div class="card card-pad-sm">
          <h3 style="font-size:.95rem;margin-bottom:10px">Calendrier</h3>
          ${dates.map(d => `<div class="row-between small" style="padding:7px 0;border-block-end:1px solid var(--line)">
            <span>${esc(d.label)}</span><b class="mono">${fmtDate(d.date)}</b></div>`).join('')}
          <a class="btn btn-ghost btn-sm btn-block mt16" href="#/calendrier">Calendrier complet</a>
        </div>` : ''}
        <div class="card card-pad-sm mt16">
          <h3 style="font-size:.95rem;margin-bottom:8px">Commencer</h3>
          <p class="small dim">Le diagnostic identifie vos points faibles par compétence en vingt minutes.</p>
          <a class="btn btn-primary btn-block" href="#/app/onboarding">Faire le diagnostic</a>
        </div>
      </div>
    </div>
  </div>`, 'concours');
});

/* ---------------- Landing par spécialité (moteur SEO) ---------------- */
route('/concours/:fam/:spec', r => {
  const f = DATA.families.find(x => x.id === r.parts[1]);
  if (!f) return notFound();
  const s = f.specialties.find(x => x.id === r.parts[2]);
  if (!s) return notFound();
  const ann = DATA.annales.filter(a => a.spec.startsWith(s.name.split(' ')[0])).slice(0, 4);
  return shellPublic(`
  <section class="hero" style="padding:44px 0 34px"><div class="wrap">
    <div class="small muted" style="margin-bottom:10px"><a href="#/concours" style="text-decoration:none">Concours</a> › <a href="#/concours/${f.id}" style="text-decoration:none">${esc(f.short)}</a> › ${esc(s.name)}</div>
    <h1 style="font-size:clamp(1.7rem,3.4vw,2.5rem);max-width:22ch">${esc(f.short)} ${esc(s.name)} : préparation complète</h1>
    <p class="lede">${s.items} questions publiées avec justification de chaque option, ${ann.length} annales corrigées, deux simulateurs conformes au blueprint de l'épreuve et un suivi de maîtrise par compétence.</p>
    <div class="row mt24"><a class="btn btn-primary btn-lg" href="#/app/onboarding">Commencer gratuitement</a>
    <a class="btn btn-ghost btn-lg" href="#/demo">Voir 5 questions</a></div>
  </div></section>

  <div class="wrap" style="padding:44px 20px 0">
    <div class="grid" style="grid-template-columns:1.6fr 1fr;gap:30px">
      <div>
        <h2 style="font-size:1.3rem">Ce qui est évalué</h2>
        <p class="small dim">L'épreuve écrite repose sur trois piliers. Notre couverture suit exactement cette structure.</p>
        <div class="col mt16" style="gap:12px">
          ${DATA.pillars.map(p => {
            const cs = DATA.competencies.filter(c => c.pillar === p.id);
            return `<div class="card">
              <div class="row" style="gap:10px;margin-bottom:6px">
                <i style="width:11px;height:11px;border-radius:3px;background:var(--series-${p.serie});display:inline-block"></i>
                <b>${esc(p.name)}</b></div>
              <p class="small dim" style="margin:0 0 10px">${esc(p.desc)}</p>
              <div class="row" style="flex-wrap:wrap;gap:6px">${cs.map(c => badge(c.short)).join('')}</div>
            </div>`;
          }).join('')}
        </div>

        <h2 style="font-size:1.3rem;margin-top:32px">Annales corrigées</h2>
        <div class="col mt16" style="gap:9px">
          ${ann.map(a => `<div class="card card-pad-sm row-between">
            <div><b class="small">${esc(a.exam)} ${a.year} — ${esc(a.type)}</b>
            <div class="xsmall muted">${esc(a.source)} · ${a.pages} pages${a.corrected ? ' · corrigé inclus' : ''}</div></div>
            ${a.free ? `<a class="btn btn-sm btn-ghost" href="#/annales">Consulter</a>` : badge('Premium', 'brand')}
          </div>`).join('')}
        </div>

        <h2 style="font-size:1.3rem;margin-top:32px">Questions fréquentes</h2>
        <div class="col mt16" style="gap:9px">
          ${[
            ["Le contenu est-il conforme à la session en cours ?", "Chaque question porte une version, une source et une date d'entrée en vigueur. Lorsqu'un texte de référence change, la question est révisée et une nouvelle version est publiée : les anciennes tentatives conservent la version passée."],
            ["Puis-je m'entraîner en arabe ?", "L'interface est intégralement bilingue avec un rendu de droite à gauche natif. La traduction du contenu progresse question par question et n'est publiée qu'après relecture linguistique."],
            ["Que se passe-t-il si une correction me semble fausse ?", "Chaque question porte un bouton de signalement. Le signalement ouvre un ticket éditorial suivi ; si l'erreur est confirmée, la question est corrigée et une nouvelle version publiée."]
          ].map(([q, a]) => `<details class="card card-pad-sm"><summary style="cursor:pointer;font-weight:650;font-size:.94rem">${q}</summary>
            <p class="small dim" style="margin:10px 0 0">${a}</p></details>`).join('')}
        </div>
      </div>

      <div>
        <div class="card" style="position:sticky;top:86px">
          <h3 style="font-size:1rem">En bref</h3>
          <table class="table" style="margin-top:10px">
            <tr><td class="muted small">Questions</td><td class="num strong">${s.items}</td></tr>
            <tr><td class="muted small">Annales</td><td class="num strong">${ann.length}</td></tr>
            <tr><td class="muted small">Simulateurs</td><td class="num strong">2</td></tr>
            <tr><td class="muted small">Compétences suivies</td><td class="num strong">14</td></tr>
            <tr><td class="muted small">Candidats/session</td><td class="num strong">${esc((s.candidates || '').replace('≈ ', '').replace(' candidats/session', ''))}</td></tr>
          </table>
          <a class="btn btn-primary btn-block mt16" href="#/app/onboarding">Diagnostic gratuit</a>
          <a class="btn btn-ghost btn-block" style="margin-top:8px" href="#/tarifs">Voir les tarifs</a>
        </div>
      </div>
    </div>
  </div>`, 'concours');
});

/* ---------------- Annales ---------------- */
route('/annales', () => {
  const fy = S.filters.annYear || 'all', ft = S.filters.annSpec || 'all';
  const years = [...new Set(DATA.annales.map(a => a.year))].sort((a, b) => b - a);
  const specs = [...new Set(DATA.annales.map(a => a.spec))];
  const list = DATA.annales.filter(a => (fy === 'all' || a.year == fy) && (ft === 'all' || a.spec === ft));
  return shellPublic(`<div class="wrap" style="padding:40px 20px 0">
    ${pagehead('Annales corrigées', "Sujets des sessions passées, avec corrigé, source identifiée et année de session. Les filtres sont conservés dans l'adresse de la page, ce qui rend le lien partageable.")}
    <div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:18px">
      <span class="chip ${fy === 'all' ? 'on' : ''}" onclick="setFilter('annYear','all')">Toutes les années</span>
      ${years.map(y => `<span class="chip ${fy == y ? 'on' : ''}" onclick="setFilter('annYear','${y}')">${y}</span>`).join('')}
    </div>
    <div class="row" style="flex-wrap:wrap;gap:8px;margin-bottom:24px">
      <span class="chip ${ft === 'all' ? 'on' : ''}" onclick="setFilter('annSpec','all')">Toutes spécialités</span>
      ${specs.map(sp => `<span class="chip ${ft === sp ? 'on' : ''}" onclick="setFilter('annSpec','${esc(sp)}')">${esc(sp)}</span>`).join('')}
    </div>
    ${list.length ? `<div class="grid g2">${list.map(a => `
      <div class="card card-hover">
        <div class="row-between"><div class="row" style="gap:8px">${badge(a.year + '', 'brand')}${a.corrected ? badge('Corrigé', 'good') : badge('Sujet seul', 'outline')}</div>
        ${a.free ? badge('Gratuit', 'safran') : badge('Premium', 'brand')}</div>
        <h3 style="margin-top:11px;font-size:1rem">${esc(a.exam)} — ${esc(a.type)}</h3>
        <div class="small dim">${esc(a.spec)} · ${a.pages} pages</div>
        <div class="xsmall muted" style="margin-top:8px">Source : ${esc(a.source)}</div>
        <div class="row mt16">${a.free
          ? `<button class="btn btn-sm btn-primary" onclick="toast('Aperçu du PDF — non inclus dans le prototype')">Consulter</button>`
          : `<a class="btn btn-sm btn-ghost" href="#/tarifs">Débloquer avec Premium</a>`}</div>
      </div>`).join('')}</div>`
      : `<div class="empty"><div class="e-ico">📄</div><p>Aucune annale ne correspond à ces filtres.</p></div>`}
  </div>`, 'annales');
});

/* ---------------- Ressources ---------------- */
route('/ressources', () => shellPublic(`<div class="wrap" style="padding:40px 20px 0">
  ${pagehead('Fiches et articles', "Contenu librement accessible. Il sert d'abord à démontrer la qualité de notre travail éditorial — pas à constituer un stock de PDF.")}
  <div class="grid g3">
    ${DATA.articles.map(a => `<a class="card card-hover card-link" href="#/ressources/${a.slug}">
      ${badge(a.cat, 'terra')}
      <h3 style="margin-top:11px;font-size:1.02rem">${esc(a.title)}</h3>
      <p class="small dim" style="margin:7px 0 12px">${esc(a.excerpt)}</p>
      <div class="xsmall muted">${a.min} min de lecture</div></a>`).join('')}
  </div></div>`, 'ressources'));

route('/ressources/:slug', r => {
  const a = DATA.articles.find(x => x.slug === r.parts[1]);
  if (!a) return notFound();
  return shellPublic(`<div class="wrap-narrow" style="padding:40px 20px 0">
    <div class="small muted" style="margin-bottom:12px"><a href="#/ressources" style="text-decoration:none">Ressources</a> › ${esc(a.cat)}</div>
    <h1 style="font-size:clamp(1.6rem,3.2vw,2.3rem)">${esc(a.title)}</h1>
    <div class="row small muted mt8" style="gap:14px">${badge(a.cat, 'terra')}<span>${a.min} min de lecture</span><span>Mis à jour le 28 juillet 2026</span></div>
    <div class="divider"></div>
    <p class="dim" style="font-size:1.05rem">${esc(a.excerpt)}</p>
    <div class="card card-flat" style="margin:24px 0">
      <b class="small">Contenu de démonstration</b>
      <p class="small dim" style="margin:6px 0 0">Le corps de l'article n'est pas rédigé dans ce prototype. Cet écran sert à valider la mise en page de lecture longue, la hiérarchie typographique et le passage à l'action en fin d'article.</p>
    </div>
    <div class="card" style="background:var(--brand-50);border-color:var(--brand-300)">
      <h3>Passez de la lecture à l'entraînement</h3>
      <p class="small dim" style="margin:7px 0 12px">Cet article couvre une compétence que vous pouvez tester immédiatement.</p>
      <a class="btn btn-primary" href="#/demo">Tester 5 questions</a>
    </div>
  </div>`, 'ressources');
});

/* ---------------- Calendrier ---------------- */
route('/calendrier', () => shellPublic(`<div class="wrap" style="padding:40px 20px 0">
  ${pagehead('Calendrier des concours', 'Dates officielles annoncées et échéances de préparation. Chaque date affiche sa source et sa date de dernière vérification.')}
  <div class="card" style="padding:0">
    <table class="table">
      <thead><tr><th>Concours</th><th>Échéance</th><th>Date</th><th class="num">Dans</th></tr></thead>
      <tbody>${DATA.calendar.map(c => {
        const d = daysUntil(c.date);
        return `<tr><td>${badge(c.exam, 'brand')}</td><td><b>${esc(c.label)}</b></td>
          <td class="mono small">${fmtDate(c.date)}</td>
          <td class="num"><span class="badge ${d < 40 ? 'badge-warn' : 'badge-outline'}">J−${d}</span></td></tr>`;
      }).join('')}</tbody>
    </table>
  </div>
  <div class="disclaimer mt24"><span>⚠️</span><div><b>Vérifiez toujours la source officielle.</b> Les dates affichées reprennent les annonces publiques disponibles. Elles ne se substituent pas aux publications du ministère et des académies régionales.</div></div>
</div>`, 'calendrier'));

/* ---------------- QCM de démonstration (sans compte) ---------------- */
route('/demo', () => {
  if (!S.demo) S.demo = { i: 0, answers: {}, ids: ['Q003', 'Q018', 'Q021', 'Q012', 'Q007'] };
  const d = S.demo;
  if (d.i >= d.ids.length) {
    const score = d.ids.filter(id => d.answers[id] === DATA.questions.find(q => q.id === id).correct).length;
    return shellPublic(`<div class="wrap-narrow" style="padding:44px 20px 0">
      <div class="center">
        <div style="font-size:2.6rem">${score >= 4 ? '🎯' : score >= 3 ? '👍' : '📘'}</div>
        <h1 style="font-size:1.9rem;margin-top:8px">${score} bonnes réponses sur ${d.ids.length}</h1>
        <p class="muted">Cinq questions ne suffisent pas à établir un profil. Le diagnostic complet couvre chaque macro-compétence et prend vingt minutes.</p>
      </div>
      <div class="card mt24">
        <h3>Ce que vous n'avez pas encore vu</h3>
        <ul class="small dim mt8">
          <li>La justification de <b>chaque option fausse</b>, pas seulement de la bonne réponse</li>
          <li>Le rattachement de chaque question à une compétence du référentiel</li>
          <li>Votre profil de maîtrise et la première recommandation expliquée</li>
        </ul>
        <div class="row mt16"><a class="btn btn-primary" href="#/app/onboarding">Faire le diagnostic gratuit</a>
        <button class="btn btn-ghost" onclick="S.demo=null;render()">Recommencer</button></div>
      </div>
    </div>`);
  }
  const q = DATA.questions.find(x => x.id === d.ids[d.i]);
  const ans = d.answers[q.id];
  const done = ans !== undefined;
  return shellPublic(`<div class="wrap-narrow" style="padding:36px 20px 0">
    <div class="row-between" style="margin-bottom:16px">
      <div><b class="small">Démonstration — question ${d.i + 1} sur ${d.ids.length}</b>
      <div class="xsmall muted">Aucun compte requis</div></div>
      <a class="btn btn-sm btn-quiet" href="#/">Quitter</a>
    </div>
    <div class="bar bar-thin" style="margin-bottom:22px"><span style="width:${(d.i / d.ids.length) * 100}%"></span></div>
    ${questionBlock(q, { answer: ans, reveal: done, limited: true })}
    <div class="row mt24" style="justify-content:flex-end">
      ${done ? `<button class="btn btn-primary" onclick="S.demo.i++;render()">${d.i + 1 === d.ids.length ? 'Voir mon score' : 'Question suivante'}</button>`
        : `<span class="small muted">Choisissez une réponse pour voir la correction</span>`}
    </div>
  </div>`);
});
function demoAnswer(qid, k) { S.demo.answers[qid] = k; render(); }

/* ---------------- Tarifs ---------------- */
route('/tarifs', () => shellPublic(`<div class="wrap" style="padding:40px 20px 0">
  <div class="center" style="max-width:60ch;margin-inline:auto">
    ${pagehead('Trois niveaux d\'accès', "Le contenu public reste ouvert. Le compte gratuit sert à prouver la valeur avant tout paiement. Le premium ouvre les corrections intégrales et la certification.")}
  </div>
  <div class="grid g3 mt24">
    ${DATA.plans.map(p => `<div class="card" style="${p.tag ? 'border-color:var(--brand-600);box-shadow:var(--shadow-2)' : ''};display:flex;flex-direction:column">
      ${p.tag ? `<div style="margin-bottom:10px">${badge(p.tag, 'brand')}</div>` : '<div style="height:30px"></div>'}
      <h3 style="font-size:1.15rem">${esc(p.name)}</h3>
      <div style="margin:8px 0 16px"><span style="font-size:2.1rem;font-weight:750;letter-spacing:-.03em">${p.price === 0 ? 'Gratuit' : p.price + ' DH'}</span>
      <span class="muted small">${esc(p.period)}</span></div>
      <div class="col" style="gap:8px;flex:1">
        ${p.features.map(f => `<div class="row small" style="gap:9px;align-items:flex-start">
          <span style="color:${f.ok ? 'var(--good-ink)' : 'var(--ink-3)'};flex:none;font-weight:700">${f.ok ? '✓' : '—'}</span>
          <span style="${f.ok ? '' : 'color:var(--ink-3)'}">${esc(f.t)}</span></div>`).join('')}
      </div>
      <a class="btn ${p.tag ? 'btn-primary' : 'btn-ghost'} btn-block mt16" href="#/app/abonnement">${esc(p.cta)}</a>
    </div>`).join('')}
  </div>
  <div class="card card-flat mt32">
    <h3>Sur le contrôle des droits</h3>
    <p class="small dim" style="margin:7px 0 0">Tout accès premium est vérifié côté serveur. Masquer un bouton dans l'interface ne protège rien : c'est l'API qui refuse la ressource si l'abonnement n'est pas actif. Ce principe est inscrit dans le cadrage et se traduit ici par un composant unique de contrôle d'accès, réutilisé sur chaque écran protégé.</p>
  </div>
</div>`, 'tarifs'));

/* ---------------- Certification (page publique) ---------------- */
route('/certification', () => shellPublic(`<div class="wrap" style="padding:40px 20px 0">
  ${pagehead('Certification des acquis', "Une attestation de niveau délivrée par Najah.ma, vérifiable par un lien public. Elle mesure votre maîtrise sur un pilier du référentiel.")}
  <div class="disclaimer" style="margin-bottom:26px"><span>⚠️</span><div>
    <b>Portée de l'attestation.</b> L'attestation Najah.ma est un document privé. Elle n'a aucune valeur officielle au regard des concours publics, ne remplace aucun diplôme et n'engage ni le ministère de l'Éducation nationale ni les académies régionales. Elle atteste uniquement d'un niveau mesuré sur notre référentiel, à une date donnée.
  </div></div>
  <div class="grid g3">
    ${DATA.certifications.map(c => `<div class="card">
      <div class="row" style="gap:9px"><i style="width:11px;height:11px;border-radius:3px;background:var(--series-${DATA.pillars.find(p => p.id === c.pillar).serie});display:inline-block"></i>
      ${badge(DATA.pillars.find(p => p.id === c.pillar).name)}</div>
      <h3 style="margin-top:11px;font-size:1.02rem">${esc(c.name)}</h3>
      <p class="small dim" style="margin:7px 0 12px">${esc(c.desc)}</p>
      <table class="table xsmall">
        <tr><td class="muted">Durée</td><td class="num">${c.duration} min</td></tr>
        <tr><td class="muted">Questions</td><td class="num">${c.questions}</td></tr>
        <tr><td class="muted">Seuil de réussite</td><td class="num">${c.threshold} %</td></tr>
        <tr><td class="muted">Tentatives</td><td class="num">${c.attempts} par an</td></tr>
      </table>
    </div>`).join('')}
  </div>
  <div class="grid g2 mt32">
    <div class="card card-flat"><h3>Comment elle est obtenue</h3>
      <ol class="small dim mt8">
        <li>Atteindre le seuil de maîtrise sur les compétences du pilier</li>
        <li>Avoir traité un volume minimal de questions, pour que le score repose sur une évidence suffisante</li>
        <li>Réussir une épreuve certifiante en conditions renforcées</li>
      </ol></div>
    <div class="card card-flat"><h3>Comment elle est vérifiée</h3>
      <p class="small dim" style="margin:8px 0 12px">Chaque attestation porte un code unique. N'importe qui — un employeur, un centre de formation — peut saisir ce code sur une page publique et voir le niveau, la date et le détail par compétence, sans créer de compte.</p>
      <a class="btn btn-ghost btn-sm" href="#/verifier">Essayer la vérification</a></div>
  </div>
</div>`));

/* ---------------- Vérification publique d'une attestation ---------------- */
route('/verifier', () => shellPublic(`<div class="wrap-narrow" style="padding:44px 20px 0">
  ${pagehead("Vérifier une attestation", "Saisissez le code figurant sur l'attestation. Aucun compte n'est nécessaire.")}
  <div class="card">
    <div class="field"><label for="vcode">Code de l'attestation</label>
      <input class="input mono" id="vcode" data-autofocus placeholder="NJH-XX-AAAA-XXXXX" value="${esc(DATA.issuedCert.code)}"></div>
    <button class="btn btn-primary" onclick="doVerify()">Vérifier</button>
    <div class="hint mt8">Code de démonstration pré-rempli. Modifiez-le pour voir le cas d'un code invalide.</div>
  </div>
  <div id="vres" class="mt24"></div>
</div>`));

route('/verifier/:code', r => {
  const c = r.parts[1] === DATA.issuedCert.code ? DATA.issuedCert : null;
  return shellPublic(`<div class="wrap-narrow" style="padding:44px 20px 0">
    ${pagehead('Vérification d\'attestation')}
    ${c ? certVerified(c) : certInvalid(r.parts[1])}
    <a class="btn btn-ghost mt24" href="#/verifier">Vérifier un autre code</a>
  </div>`);
});

function doVerify() {
  const v = document.getElementById('vcode').value.trim().toUpperCase();
  const box = document.getElementById('vres');
  box.innerHTML = '<div class="card center"><span class="typing"><i></i><i></i><i></i></span></div>';
  API.certification.verify(v).then(c => {
    box.innerHTML = c ? certVerified(c) : certInvalid(v);
    bindViz(box);
  });
}

function certVerified(c) {
  return `<div class="card" style="border-color:var(--good)">
    <div class="row" style="gap:10px;margin-bottom:14px">
      <span style="width:34px;height:34px;border-radius:10px;background:var(--good-bg);display:grid;place-items:center;color:var(--good-ink);font-weight:800">✓</span>
      <div><b>Attestation valide</b><div class="xsmall muted">Vérifiée le 4 août 2026</div></div>
    </div>
    <table class="table">
      <tr><td class="muted small">Titulaire</td><td class="strong">${esc(c.holder)}</td></tr>
      <tr><td class="muted small">Attestation</td><td class="strong">${esc(c.name)}</td></tr>
      <tr><td class="muted small">Niveau</td><td>${badge(c.level, 'good')} <b class="mono">${c.score} / 100</b></td></tr>
      <tr><td class="muted small">Délivrée le</td><td class="mono">${esc(c.issued)}</td></tr>
      <tr><td class="muted small">Valable jusqu'au</td><td class="mono">${esc(c.expires)}</td></tr>
      <tr><td class="muted small">Code</td><td class="mono">${esc(c.code)}</td></tr>
    </table>
    <div class="divider"></div>
    <h3 style="font-size:.95rem;margin-bottom:10px">Détail par compétence</h3>
    ${barsChart(c.breakdown.map(b => ({ label: comp(b.comp).short, value: b.score, color: 'var(--series-1)', tip: b.score + '/100' })), { labelW: 140, aria: 'Scores par compétence' })}
    <div class="disclaimer mt24"><span>⚠️</span><div><b>Portée.</b> Document privé délivré par Najah.ma. Sans valeur officielle au regard des concours publics, ne remplaçant aucun diplôme.</div></div>
  </div>`;
}

function certInvalid(code) {
  return `<div class="card" style="border-color:var(--critical)">
    <div class="row" style="gap:10px">
      <span style="width:34px;height:34px;border-radius:10px;background:var(--crit-bg);display:grid;place-items:center;color:var(--critical);font-weight:800">✕</span>
      <div><b>Aucune attestation ne correspond à ce code</b>
      <div class="small muted">Code saisi : <span class="mono">${esc(code || '—')}</span></div></div>
    </div>
    <p class="small dim mt16" style="margin-bottom:0">Vérifiez la saisie. Si le code figure bien sur un document présenté comme délivré par Najah.ma et qu'il n'est pas reconnu ici, ce document n'a pas été émis par la plateforme.</p>
  </div>`;
}

function setFilter(k, v) { S.filters[k] = v; render(); }
