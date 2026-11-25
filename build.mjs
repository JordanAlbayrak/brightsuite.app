// Builds the static site from src/ into docs/ (served by GitHub Pages). No dependencies.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pages, QUEUE_PRIVACY_PUBLIC } from "./src/pages.mjs";
import { brandCss } from "./src/brand.mjs";
import { mark } from "./src/sunburst.mjs";

const OUT = "docs";
const SITE = "https://brightsuite.app";

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync("src/assets", path.join(OUT, "assets"), { recursive: true });
fs.appendFileSync(path.join(OUT, "assets/site.css"), brandCss());
for (const [app, file] of [["suite", "brightsuite"], ["pause", "brightpause"], ["queue", "brightqueue"]])
  fs.writeFileSync(path.join(OUT, "assets/logo", file + ".svg"), mark(app));
fs.writeFileSync(path.join(OUT, "favicon.svg"), mark("suite"));
fs.writeFileSync(path.join(OUT, "CNAME"), "brightsuite.app");
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

const themeScript = `(function(){var d=document.documentElement;var t;try{t=localStorage.getItem("theme");}catch(e){}d.setAttribute("data-theme",t==="light"?"light":"dark");var e;try{e=localStorage.getItem("el")}catch(x){}if(/^(forest|ocean|sky|space|cave)$/.test(e))d.setAttribute("data-el",e);if(window.matchMedia&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("tw-wait")})();`;
const themeHash = crypto.createHash("sha256").update(themeScript).digest("base64");
const csp = [
  "default-src 'none'",
  "img-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  `script-src 'self' 'sha256-${themeHash}'`,
  "base-uri 'none'",
  "form-action 'none'",
].join("; ");

// French typography (Quebec): no-break space before : and inside « », no space before ; ? !
const frType = (t) => t.replace(/ :/g, " :").replace(/ ([;?!])/g, "$1").replace(/« /g, "« ").replace(/ »/g, " »");
const frText = (html) => html.replace(/>([^<]+)</g, (_, t) => ">" + frType(t) + "<");

const ui = {
  en: { skip: "Skip to content", apps: "Apps", theme: "Switch light or dark theme", other: "Français", otherShort: "FR", home: "BrightSuite home" },
  fr: { skip: "Aller au contenu", apps: "Apps", theme: "Basculer le thème clair ou sombre", other: "English", otherShort: "EN", home: "Accueil BrightSuite" },
};

const foot = {
  en: `<footer class="foot"><div class="wrap">
  <div><p><strong>BrightSuite</strong></p><p>Free apps for body and mind. This site sets no cookies and loads nothing from other sites.</p><p>&copy; 2026 BrightSuite</p></div>
  <div><h2>Apps</h2><ul><li><a href="/#brightpause">BrightPause</a></li><li><a href="/#brightqueue">BrightQueue</a></li></ul></div>
  <div><h2>Privacy</h2><ul><li><a href="/pause/privacy/">BrightPause privacy</a></li>${QUEUE_PRIVACY_PUBLIC ? `<li><a href="/queue/privacy/">BrightQueue privacy</a></li>` : ""}</ul></div>
</div></footer>`,
  fr: `<footer class="foot"><div class="wrap">
  <div><p><strong>BrightSuite</strong></p><p>Des apps gratuites pour le corps et l'esprit. Ce site ne dépose aucun cookie et ne charge rien depuis d'autres sites.</p><p>&copy; 2026 BrightSuite</p></div>
  <div><h2>Apps</h2><ul><li><a href="/fr/#brightpause">BrightPause</a></li><li><a href="/fr/#brightqueue">BrightQueue</a></li></ul></div>
  <div><h2>Confidentialité</h2><ul><li><a href="/fr/pause/privacy/">Confidentialité de BrightPause</a></li>${QUEUE_PRIVACY_PUBLIC ? `<li><a href="/fr/queue/privacy/">Confidentialité de BrightQueue</a></li>` : ""}</ul></div>
</div></footer>`,
};

const sun = `<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg>`;
const moon = `<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>`;

const brandSun = mark("suite", "inline", ' class="brand-sun" width="28" height="28" aria-hidden="true"');

function layout(p) {
  const t = ui[p.lang];
  const home = p.lang === "fr" ? "/fr/" : "/";
  const body = p.lang === "fr" ? frText(p.body) : p.body;
  const enPath = p.lang === "en" ? p.path : p.alt;
  const frPath = p.lang === "fr" ? p.path : p.alt;
  return `<!doctype html>
<html lang="${p.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="no-referrer">
<title>${p.lang === "fr" ? frType(p.title) : p.title}</title>
<meta name="description" content="${p.lang === "fr" ? frType(p.description) : p.description}">
${p.head ?? ""}${p.noindex ? '<meta name="robots" content="noindex">\n' : ""}<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#0f1513">
<link rel="canonical" href="${SITE}${p.path}">
<link rel="alternate" hreflang="en" href="${SITE}${enPath}">
<link rel="alternate" hreflang="fr" href="${SITE}${frPath}">
<link rel="alternate" hreflang="x-default" href="${SITE}${enPath}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
<script>${themeScript}</script>
<script src="/assets/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
<header class="top"><div class="wrap">
  <a class="brand" href="${home}" aria-label="${t.home}">${brandSun}BrightSuite</a>
  <nav class="nav" aria-label="Main">
    <a class="hide-xs" href="${home}#apps">${t.apps}</a>
    <a href="${p.alt}" hreflang="${p.lang === "en" ? "fr" : "en"}" lang="${p.lang === "en" ? "fr" : "en"}"><span aria-hidden="true">${t.otherShort}</span><span class="sr">${t.other}</span></a>
    <button class="theme" type="button" aria-label="${t.theme}">${sun}${moon}</button>
  </nav>
</div></header>
<main id="main">
${body}
</main>
${foot[p.lang]}
</body>
</html>
`;
}

for (const p of pages) {
  const file = path.join(OUT, p.file ?? path.join(p.path, "index.html"));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, layout(p));
}

const listed = pages.filter((p) => !p.noindex && !p.file);
fs.writeFileSync(
  path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${listed.map((p) => `  <url><loc>${SITE}${p.path}</loc></url>`).join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`built ${pages.length} pages into ${OUT}/`);
