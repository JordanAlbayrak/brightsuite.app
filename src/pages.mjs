import { pausePrivacy } from "./privacy-pause.mjs";
import { queuePrivacy } from "./privacy-queue.mjs";
import { mark } from "./sunburst.mjs";

// The BrightQueue privacy page stays out of the public build until it has a contact address and BrightQ T3 lands.
export const QUEUE_PRIVACY_PUBLIC = false;

// Flip to true once the Microsoft Store listing has passed certification and is live.
const STORE_LIVE = true;
const STORE = "https://apps.microsoft.com/detail/9N9B4C21TLDL";
const PAUSE_GH = "https://github.com/JordanAlbayrak/BrightPause";
const QUEUE_WEB = "https://brightqueue.vercel.app";
const PAUSE_GET = STORE_LIVE ? STORE : PAUSE_GH;

const icons = {
  light: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/></svg>`,
  calm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M10 9.5v5M14 9.5v5"/></svg>`,
  plain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>`,
};

const t = {
  en: {
    title: "BrightSuite: free apps for body and mind",
    description: "Free apps for body and mind: BrightPause and BrightQueue.",
    h1: "Log off better than you logged on.",
    lead: "Free apps that make screen time lighter on your body and mind.",
    seeApps: "See the apps",
    get: STORE_LIVE ? "Get it from Microsoft Store" : "Coming to the Microsoft Store",
    stageAlt: "BrightPause settings on a Windows desktop, its heads-up notice in the corner with Snooze and Skip, and a BrightQueue lesson on a phone.",
    appsH: "The apps",
    appsLead: "Two so far.",
    more: "How it works",
    privacy: "Privacy",
    pause: {
      tag: "Windows",
      version: "Version 1.0.0",
      pitch: "A calm break reminder for Windows.",
      source: "Source code",
      tryIt: "Try a 20-second break",
      dlgKicker: "Eye break · 20 seconds",
      dlgTitle: "Look far away",
      dlgText: "Find something about 6 metres away and rest your eyes on it until the timer ends. Blink a few times.",
      dlgDone: "Nice. Your eyes say thank you.",
      dlgClose: "Back to the page",
      features: [
        ["headsup", "A heads-up, never a surprise", "Ten seconds before a break (thirty before a movement break), a small notice appears in the corner with Snooze and Skip. It never interrupts your typing, so you can finish your sentence.", "The BrightPause heads-up notice: \"Short break in 9 seconds\", with Snooze 2 min and Skip buttons."],
        ["break", "Rest your eyes, then move", "Every 20 minutes a calm 20-second break covers your screens: look far away, blink, roll your shoulders. Every third break is a 5-minute movement break. Each one shows a short message, a tip with its source, or a small challenge.", "A BrightPause eye break: \"Look far away\", with a 20-second countdown, a source link, and Postpone and Skip buttons."],
        ["settings", "Stays out of your way", "Breaks wait while another app uses your microphone for a call, or while a game, a video or another app is full screen. Five minutes away from the keyboard counts as a break. No account, no network, and your settings stay on your PC.", "BrightPause settings: breaks taken today, a week of counts, pause buttons and the break timing options."],
      ],
    },
    queue: {
      tag: "Web, Android in progress",
      pitch: "Short lessons and quizzes, one topic at a time.",
      open: "Open the web app",
      privacy: "Privacy (draft)",
      factLabel: "Fun fact",
      factNext: "Another one",
      facts: ["Octopuses have three hearts.", "A day on Venus is longer than its year.", "Botanically, bananas are berries and strawberries are not.", "Honey can stay edible for thousands of years."],
      features: [
        ["home", "Pick a topic", "Math, science, history, space, philosophy and more. Pick one and get a short lesson, with no feed to scroll and no ads.", "BrightQueue's home page: \"What do you want to learn today?\" above a grid of topics."],
        ["lesson", "One short lesson at a time", "Each lesson ends with a fun fact. Signing in is optional and adds read-aloud.", "A BrightQueue lesson titled \"Why the sky is blue\", with a Listen button."],
        ["quiz", "Then check what stuck", "A short quiz on the lesson you just read, in normal or hard mode, with an explanation for each answer. Send a friend a challenge link to compare scores.", "A BrightQueue quiz on the sky lesson, with four answers per question."],
      ],
      note: "Screenshots use demo lessons.",
    },
    prinH: "Made the same way",
    prinLead: "A few rules every Bright app follows.",
    prin: [
      ["light", "Light", "Small and quick. Nothing heavy to install, nothing running for no reason."],
      ["calm", "Calm", "No pop-ups that grab your keyboard, no ads, nothing that asks for more of your time than the task needs."],
      ["plain", "Plain about data", "No ad trackers, and each app tells you in plain words what it does with your data."],
    ],
  },
  fr: {
    title: "BrightSuite : des apps gratuites pour le corps et l'esprit",
    description: "Des apps gratuites pour le corps et l'esprit : BrightPause et BrightQueue.",
    h1: "Quittez l'écran en meilleure forme qu'en arrivant.",
    lead: "Des apps gratuites qui allègent le temps d'écran pour le corps et l'esprit.",
    seeApps: "Voir les apps",
    get: STORE_LIVE ? "Obtenir du Microsoft Store" : "Bientôt sur Microsoft Store",
    stageAlt: "Les réglages de BrightPause sur un bureau Windows, son avis dans le coin avec les boutons Reporter et Ignorer, et une leçon de BrightQueue sur un téléphone.",
    appsH: "Les apps",
    appsLead: "Deux pour l'instant.",
    more: "Comment ça marche",
    privacy: "Confidentialité",
    pause: {
      tag: "Windows",
      version: "Version 1.0.0",
      pitch: "Un rappel de pause tout en douceur pour Windows.",
      source: "Code source",
      tryIt: "Essayer une pause de 20 secondes",
      dlgKicker: "Pause visuelle · 20 secondes",
      dlgTitle: "Regardez au loin",
      dlgText: "Trouvez un objet à environ 6 mètres et posez les yeux dessus jusqu'à la fin du minuteur. Clignez des yeux quelques fois.",
      dlgDone: "Bravo. Vos yeux vous disent merci.",
      dlgClose: "Retour à la page",
      features: [
        ["headsup", "Un avis, jamais une surprise", "Dix secondes avant une pause (trente avant une pause active), un petit avis apparaît dans le coin avec Reporter et Ignorer. Il n'interrompt jamais votre frappe : vous pouvez finir votre phrase.", "L'avis de BrightPause avant une pause, avec les boutons Reporter et Ignorer (capture en anglais)."],
        ["break", "Reposer les yeux, puis bouger", "Toutes les 20 minutes, une pause calme de 20 secondes couvre vos écrans : regarder au loin, cligner des yeux, rouler les épaules. Une pause sur trois est une pause active de 5 minutes. Chacune affiche un court message, un conseil avec sa source ou un petit défi.", "Une pause visuelle de BrightPause : « Regardez au loin », avec un compte à rebours de 20 secondes, un lien vers la source, et les boutons Reporter et Ignorer."],
        ["settings", "Reste discret", "Les pauses attendent quand une autre app utilise votre micro pour un appel, ou quand un jeu, une vidéo ou une autre app est en plein écran. Cinq minutes loin du clavier comptent comme une pause. Pas de compte, aucun accès réseau, et vos réglages restent sur votre PC.", "Les réglages de BrightPause : les pauses prises aujourd'hui, le compte de la semaine, les boutons de mise en pause et le rythme des pauses."],
      ],
    },
    queue: {
      tag: "Web, Android en préparation",
      pitch: "De courtes leçons et des quiz, un sujet à la fois.",
      open: "Ouvrir l'app web",
      privacy: "Confidentialité (brouillon)",
      factLabel: "Fait amusant",
      factNext: "Un autre",
      facts: ["Les pieuvres ont trois cœurs.", "Sur Vénus, un jour dure plus longtemps qu'une année.", "En botanique, la banane est une baie, mais pas la fraise.", "Le miel peut rester comestible pendant des milliers d'années."],
      features: [
        ["home", "Choisir un sujet", "Maths, sciences, histoire, espace, philosophie et plus encore. Choisissez-en un et recevez une courte leçon, sans fil d'actualité ni pub.", "L'accueil de BrightQueue : « What do you want to learn today? » au-dessus d'une grille de sujets."],
        ["lesson", "Une courte leçon à la fois", "Chaque leçon se termine par un fait amusant. La connexion est facultative et ajoute la lecture à voix haute.", "Une leçon de BrightQueue intitulée « Why the sky is blue », avec un bouton Listen."],
        ["quiz", "Puis vérifier ce qui est resté", "Un court quiz sur la leçon que vous venez de lire, en mode normal ou difficile, avec une explication pour chaque réponse. Envoyez un lien de défi à un ami pour comparer vos scores.", "Un quiz de BrightQueue sur la leçon du ciel, avec quatre réponses par question."],
      ],
      note: "Captures avec des leçons de démonstration. L'app est en anglais pour l'instant.",
    },
    prinH: "Conçues de la même façon",
    prinLead: "Quelques règles que suit chaque app Bright.",
    prin: [
      ["light", "Légères", "Petites et rapides. Rien de lourd à installer, rien qui tourne pour rien."],
      ["calm", "Tranquilles", "Pas de fenêtre qui vole le clavier, pas de pub, rien qui demande plus de temps que la tâche n'en a besoin."],
      ["plain", "Claires sur les données", "Aucun traqueur publicitaire, et chaque app dit en mots simples ce qu'elle fait de vos données."],
    ],
  },
};


const lazy = ' loading="lazy" decoding="async"';
const pair = (base, alt, sizes, eager) =>
  `<img src="/assets/img/${base}-720.webp" srcset="/assets/img/${base}-480.webp 480w, /assets/img/${base}-720.webp 720w" sizes="${sizes}" width="720" height="960" alt="${alt}"${eager ? "" : lazy}>`;
const themed = (kind, alt, sizes) =>
  pair(`queue-${kind}-light`, alt, sizes).replace("<img ", '<img class="day-only" ') +
  pair(`queue-${kind}-dark`, alt, sizes).replace("<img ", '<img class="night-only" ');
const FEAT_SIZES = "(min-width: 900px) 380px, min(380px, calc(100vw - 32px))";

function pauseMedia(kind, lang, alt) {
  if (kind === "headsup")
    return `<div class="corner"><div class="corner-win" aria-hidden="true"></div><img class="corner-note" src="/assets/img/pause-headsup.webp" width="360" height="138" alt="${alt}"${lazy}><div class="corner-bar" aria-hidden="true"></div></div>`;
  if (kind === "break")
    return `<div class="frame wide"><img src="/assets/img/pause-break-eye-${lang}-1280.webp" srcset="/assets/img/pause-break-eye-${lang}-720.webp 720w, /assets/img/pause-break-eye-${lang}-1280.webp 1280w" sizes="(min-width: 900px) 640px, calc(100vw - 32px)" width="1280" height="720" alt="${alt}"${lazy}></div>`;
  return `<div class="frame tall">${pair(`pause-settings-${lang}`, alt, FEAT_SIZES)}</div>`;
}

const feature = (i, h, p, media) => `
    <div class="feature${i % 2 ? " flip" : ""}">
      <div class="feature-text"><h3>${h}</h3><p>${p}</p></div>
      <div class="feature-media">${media}</div>
    </div>`;

function home(lang) {
  const s = t[lang];
  const pre = lang === "fr" ? "/fr" : "";
  return `
<section class="hero"><div class="sky" aria-hidden="true"><canvas class="stars"></canvas><i class="shoot s1"></i><i class="shoot s2"></i><i class="shoot s3"></i></div><div class="wrap">
  ${mark("suite", "inline", ' class="hero-sun hero-day" aria-hidden="true"')}<svg class="hero-sun hero-moon" viewBox="0 0 64 64" aria-hidden="true"><rect class="bs-tile" width="64" height="64" rx="16"/><circle class="bs-mark" cx="30" cy="34" r="17"/><circle class="bs-tile" cx="39" cy="27" r="14"/><circle class="bs-mark" cx="46" cy="15" r="2"/><circle class="bs-mark" cx="52" cy="26" r="1.4"/></svg>
  <h1 class="tw">${s.h1}</h1>
  <p class="lead">${s.lead}</p>
  <div class="actions">
    <a class="btn btn-primary" href="#apps">${s.seeApps}</a>
  </div>
  <div class="stage" role="img" aria-label="${s.stageAlt}">
    <div class="desk">
      <div class="desk-win">${pair(`pause-settings-${lang}`, "", "(min-width: 1104px) 400px, 36vw", true)}</div>
      <img class="desk-note" src="/assets/img/pause-headsup.webp" width="360" height="138" alt="">
      <div class="desk-bar"></div>
    </div>
    <div class="phone"><img class="day-only" src="/assets/img/queue-phone-light.webp" width="480" height="1039" alt="" loading="lazy"><img class="night-only" src="/assets/img/queue-phone-dark.webp" width="480" height="1039" alt="" loading="lazy"></div>
  </div>
</div></section>

<section class="section" id="apps" aria-labelledby="apps-h"><div class="wrap">
  <div class="section-head"><h2 id="apps-h">${s.appsH}</h2><p>${s.appsLead}</p></div>
  <div class="apps">
    <article class="app">
      <div class="app-title">${mark("pause", "inline", ' width="48" height="48" aria-hidden="true"')}<div><h3>BrightPause</h3><p class="tag">${s.pause.tag} <span class="ver">${s.pause.version}</span></p></div></div>
      <p class="pitch">${s.pause.pitch}</p>
      <div class="links">
        <a class="btn btn-primary" href="${PAUSE_GET}">${s.get}</a>
        <a class="btn btn-ghost" href="${PAUSE_GH}">${s.pause.source}</a>
        <a class="btn btn-ghost" href="#bp-privacy">${s.privacy}</a>
      </div>
      <a class="more" href="#brightpause">${s.more}</a>
    </article>
    <article class="app">
      <div class="app-title">${mark("queue", "inline", ' width="48" height="48" aria-hidden="true"')}<div><h3>BrightQueue</h3><p class="tag">${s.queue.tag}</p></div></div>
      <p class="pitch">${s.queue.pitch}</p>
      <div class="links">
        <a class="btn btn-primary" href="${QUEUE_WEB}">${s.queue.open}</a>
        ${QUEUE_PRIVACY_PUBLIC ? `<a class="btn btn-ghost" href="${pre}/queue/privacy/">${s.queue.privacy}</a>` : ""}
      </div>
      <a class="more" href="#brightqueue">${s.more}</a>
    </article>
  </div>
</div></section>

<section class="section app-section" id="brightpause" aria-labelledby="bp-h"><div class="wrap">
  <div class="section-head">${mark("pause", "inline", ' width="64" height="64" aria-hidden="true"')}<h2 id="bp-h">BrightPause</h2>
    <button class="btn btn-ghost try" type="button" data-break hidden>${s.pause.tryIt}</button></div>
  <dialog class="breakdlg" aria-labelledby="dlg-h">
    <p class="dlg-kicker">${s.pause.dlgKicker}</p>
    <h3 id="dlg-h">${s.pause.dlgTitle}</h3>
    <p class="dlg-text" data-text="${s.pause.dlgText}" data-done="${s.pause.dlgDone}">${s.pause.dlgText}</p>
    <div class="ring" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="ring-bg"/><circle cx="60" cy="60" r="52" class="ring-fg"/></svg><span class="ring-n">20</span></div>
    <form method="dialog"><button class="btn btn-primary" type="submit">${s.pause.dlgClose}</button></form>
  </dialog>
  ${s.pause.features.map(([k, h, p, alt], i) => feature(i, h, p, pauseMedia(k, lang, alt))).join("")}
  ${pausePrivacy[lang]}
</div></section>

<section class="section app-section band" id="brightqueue" aria-labelledby="bq-h"><div class="wrap">
  <div class="section-head">${mark("queue", "inline", ' width="64" height="64" aria-hidden="true"')}<h2 id="bq-h">BrightQueue</h2>
    <div class="fact" data-facts="${s.queue.facts.join("|")}"><span class="fact-label">${s.queue.factLabel}</span><p class="fact-text" aria-live="polite">${s.queue.facts[0]}</p><button class="fact-next" type="button" hidden>${s.queue.factNext}</button></div></div>
  ${s.queue.features.map(([k, h, p, alt], i) => feature(i, h, p, `<div class="frame tall">${themed(k, alt, FEAT_SIZES)}</div>`)).join("")}
  <p class="caption">${s.queue.note}</p>
</div></section>

<section class="section" aria-labelledby="prin-h"><div class="wrap">
  <div class="section-head"><h2 id="prin-h">${s.prinH}</h2><p>${s.prinLead}</p></div>
  <div class="principles">
    ${s.prin.map(([i, h, d]) => `<div><div class="icon-dot">${icons[i]}</div><h3>${h}</h3><p>${d}</p></div>`).join("\n    ")}
  </div>
</div></section>`;
}

const notFound = `
<section class="notfound"><div class="wrap">
  <h1>Page not found</h1>
  <p><a href="/">Go to the home page</a></p>
  <h1 lang="fr">Page introuvable</h1>
  <p lang="fr"><a href="/fr/">Aller à l'accueil</a></p>
</div></section>`;

export const pages = [
  ...(QUEUE_PRIVACY_PUBLIC ? [
    { lang: "en", path: "/queue/privacy/", alt: "/fr/queue/privacy/", noindex: true, ...queuePrivacy.en },
    { lang: "fr", path: "/fr/queue/privacy/", alt: "/queue/privacy/", noindex: true, ...queuePrivacy.fr },
  ] : []),
  { lang: "en", path: "/", alt: "/fr/", title: t.en.title, description: t.en.description, body: home("en") },
  { lang: "fr", path: "/fr/", alt: "/", title: t.fr.title, description: t.fr.description, body: home("fr") },
  ...[["en", "/pause/", "/fr/pause/", "/#brightpause", "BrightPause", "Go to BrightPause"], ["fr", "/fr/pause/", "/pause/", "/fr/#brightpause", "BrightPause", "Aller à BrightPause"],
       ["en", "/pause/privacy/", "/fr/pause/privacy/", "/#bp-privacy", "BrightPause privacy", "Go to the BrightPause privacy policy"], ["fr", "/fr/pause/privacy/", "/pause/privacy/", "/fr/#bp-privacy", "Confidentialité de BrightPause", "Aller à la politique de confidentialité de BrightPause"],
       ["en", "/queue/", "/fr/queue/", "/#brightqueue", "BrightQueue", "Go to BrightQueue"], ["fr", "/fr/queue/", "/queue/", "/fr/#brightqueue", "BrightQueue", "Aller à BrightQueue"]]
    .map(([lang, path, alt, to, name, go]) => ({ lang, path, alt, noindex: true, title: `${name}: BrightSuite`, description: name,
      head: `<meta http-equiv="refresh" content="0; url=${to}">
`, body: `<section class="notfound"><div class="wrap"><p><a href="${to}">${go}</a></p></div></section>` })),
  { lang: "en", path: "/404.html", file: "404.html", alt: "/fr/", noindex: true, title: "Page not found: BrightSuite", description: "Page not found.", body: notFound },
];
