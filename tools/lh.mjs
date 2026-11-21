// Lighthouse (mobile and desktop) on the local build. Usage: node tools/lh.mjs <lighthouse module dir>
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { serve } from "./shots.mjs";
const dir = process.argv[2];
const req = createRequire(path.join(dir, "x.js"));
const lighthouse = (await import(pathToFileURL(req.resolve("lighthouse")))).default;
const chromeLauncher = await import(pathToFileURL(req.resolve("chrome-launcher")));
const server = await serve(4322);
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new"] });
const urls = ["/", "/fr/", "/pause/privacy/"];
for (const preset of ["mobile", "desktop"]) {
  for (const u of urls) {
    const cfg = preset === "desktop" ? (await import(pathToFileURL(path.join(path.dirname(req.resolve("lighthouse")), "../core/config/desktop-config.js")))).default : undefined;
    const r = await lighthouse(`http://127.0.0.1:4322${u}`, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] }, cfg);
    const c = r.lhr.categories;
    const fails = Object.values(r.lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode === "binary").map((a) => a.id);
    console.log(preset.padEnd(8), u.padEnd(18), ["performance", "accessibility", "best-practices", "seo"].map((k) => `${k}=${Math.round(c[k].score * 100)}`).join(" "), fails.length ? "fails: " + fails.join(",") : "");
  }
}
await chrome.kill();
server.close();
