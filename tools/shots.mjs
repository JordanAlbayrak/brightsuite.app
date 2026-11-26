// Serves docs/ locally, screenshots every page at phone and 2560x1440 in light and dark,
// and fails on horizontal scroll, cookies, or any request that leaves the local server.
// Usage: node tools/shots.mjs <playwright module dir> <outdir>
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
const [pwDir, shotDir] = process.argv.slice(2);
const ROOT = path.resolve("docs");
const PORT = 4321;

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
export function serve(port = PORT) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const f = path.join(ROOT, p);
    if (f.startsWith(ROOT) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream", "cache-control": "max-age=600" });
      return fs.createReadStream(f).pipe(res);
    }
    res.writeHead(404, { "content-type": types[".html"] });
    fs.createReadStream(path.join(ROOT, "404.html")).pipe(res);
  });
  return new Promise((r) => server.listen(port, "127.0.0.1", () => r(server)));
}

if (isMain) {
  const { chromium } = createRequire(path.join(pwDir, "x.js"))("playwright");
  fs.mkdirSync(shotDir, { recursive: true });
  const server = await serve();
  const pages = [["home-en", "/"], ["home-fr", "/fr/"], ["404", "/nope/"]];
  const views = [["phone", { width: 390, height: 844 }, 2], ["1440p", { width: 2560, height: 1440 }, 1]];
  const problems = [];
  const browser = await chromium.launch();
  for (const [vname, viewport, dpr] of views) {
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport, deviceScaleFactor: dpr, colorScheme: scheme });
      const page = await ctx.newPage();
      page.on("request", (r) => { const u = new URL(r.url()); if (u.host !== `127.0.0.1:${PORT}`) problems.push(`external request ${r.url()}`); });
      page.on("console", (m) => { if (m.type() === "error" && !(page.url().includes("/nope/") && m.text().includes("404"))) problems.push(`console error on ${page.url()}: ${m.text()}`); });
      for (const [name, url] of pages) {
        await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: "networkidle" });
        await page.evaluate(() => new Promise((done) => { const t = () => { const o = document.querySelector(".tw-off"); if (!o || o.textContent === "") setTimeout(done, 1900); else setTimeout(t, 50); }; t(); }));
        await page.evaluate(async () => { for (const img of document.images) { img.loading = "eager"; await img.decode().catch(() => {}); } await document.fonts.ready; await Promise.all(document.getAnimations().filter((x) => x.effect.getTiming().iterations !== Infinity).map((x) => x.finished)); });
        const sw = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
        if (sw[0] > sw[1]) problems.push(`horizontal scroll on ${name} ${vname}: ${sw[0]} > ${sw[1]}`);
        await page.screenshot({ path: path.join(shotDir, `${name}-${vname}-${scheme}.png`), fullPage: true });
      }
      // playful bits: the 20-second break dialog and the fun-fact button
      for (const [name, url] of [["dialog-en", "/"], ["dialog-fr", "/fr/"]]) {
        await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: "networkidle" });
        await page.click(".fact-next");
        const fact = await page.textContent(".fact-text");
        await page.click("[data-break]");
        await page.waitForTimeout(3200);
        const n = await page.textContent(".ring-n");
        if (!(Number(n) <= 18)) problems.push(`break countdown stuck at ${n}`);
        await page.screenshot({ path: path.join(shotDir, `${name}-${vname}-${scheme}.png`) });
        await page.keyboard.press("Escape");
        if (await page.evaluate(() => document.querySelector(".breakdlg").open)) problems.push("Esc did not close the break dialog");
        if (!fact) problems.push("fun fact empty");
      }
      // toggle check: clicking the theme button flips the theme and stores it locally
      await page.goto(`http://127.0.0.1:${PORT}/`);
      await page.click(".theme");
      const theme = await page.evaluate(() => [document.documentElement.dataset.theme, localStorage.getItem("theme")]);
      if (theme[0] !== "light" || theme[1] !== theme[0]) problems.push(`theme toggle wrong in ${scheme}: ${theme}`);
      const cookies = await ctx.cookies();
      if (cookies.length) problems.push(`cookies set: ${cookies.map((c) => c.name).join(", ")}`);
      await ctx.close();
    }
  }
  const rm = await browser.newContext({ reducedMotion: "reduce" });
  const rp = await rm.newPage();
  await rp.goto(`http://127.0.0.1:${PORT}/`);
  const anim = await rp.evaluate(() => [".hero-sun .sun-rays", ".phone", ".desk-note"].map((q) => getComputedStyle(document.querySelector(q)).animationName));
  if (anim.some((a) => a !== "none")) problems.push(`animations run with reduced motion: ${anim}`);
  await rm.close();
  await browser.close();
  server.close();
  console.log(problems.length ? "PROBLEMS:\n" + [...new Set(problems)].join("\n") : "OK: no horizontal scroll, no cookies, no external requests, no console errors, theme toggle works");
}
