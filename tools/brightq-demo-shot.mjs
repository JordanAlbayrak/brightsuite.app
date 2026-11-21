// Renders a BrightQueue static export with demo data only.
// Build the export from a local clone (see README), never from the real repo or its .env.
// Every request that is not the local server is answered with demo data or aborted,
// so no real data is fetched and nothing reaches Supabase or Sentry.
// Usage: node tools/brightq-demo-shot.mjs <export dir> <playwright module dir> <outdir>
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const [outDir, pwDir, shotDir] = process.argv.slice(2);
const { chromium } = createRequire(path.join(pwDir, "x.js"))("playwright");
fs.mkdirSync(shotDir, { recursive: true });

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const ROOT = path.resolve(outDir);
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  for (const c of [p, p + ".html", path.join(p, "index.html")]) {
    const f = path.join(ROOT, c);
    if (f.startsWith(ROOT) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" });
      return fs.createReadStream(f).pipe(res);
    }
  }
  res.writeHead(404); res.end();
});
await new Promise((r) => server.listen(4123, "127.0.0.1", r));

const LESSON = {
  id: "demo-1", lesson_number: 12, topic: "science", format: "explainer", cached: true, source_url: null,
  title: "Why the sky is blue",
  body: "Sunlight looks white, but it is a mix of every colour. When it enters the air, it bumps into tiny gas molecules.\n\nShort blue waves scatter far more than long red ones, so blue light reaches your eyes from every part of the sky.\n\nAt sunset the light crosses much more air, most of the blue is scattered away, and the reds and oranges are what is left.",
  fun_fact: "On Mars the daytime sky looks butterscotch and the sunsets look blue.",
};
const QUIZ = {
  questions: [
    { question: "Why does the sky look blue?", options: ["A. The sea reflects onto it", "B. Air scatters blue light the most", "C. Ozone is blue", "D. Space is blue"], answer: "B", explanation: "Short blue waves scatter far more than red ones, so blue reaches you from every part of the sky." },
    { question: "Why are sunsets red and orange?", options: ["A. The sun cools down", "B. Light crosses more air", "C. Clouds turn red", "D. Dust burns"], answer: "B", explanation: "At sunset light crosses much more air, and most of the blue is scattered away." },
    { question: "What colour are sunsets on Mars?", options: ["A. Red", "B. Green", "C. Blue", "D. White"], answer: "C", explanation: "Fine Martian dust scatters blue light forward, around the sun." },
  ],
};

const blocked = new Set();
const browser = await chromium.launch();
const shot = async (page, name) => { await page.waitForTimeout(700); await page.screenshot({ path: path.join(shotDir, name) }); };
for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme });
  await ctx.route("**/*", (route) => {
    const u = new URL(route.request().url());
    if (u.pathname.includes("/api/lesson")) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(LESSON) });
    if (u.pathname.includes("/api/quiz")) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(QUIZ) });
    if (u.hostname === "127.0.0.1" && u.port === "4123") return route.continue();
    blocked.add(u.hostname);
    return route.abort();
  });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:4123/", { waitUntil: "networkidle" });
  await shot(page, `queue-home-${scheme}.png`);
  await page.goto("http://127.0.0.1:4123/learn/science", { waitUntil: "networkidle" });
  await page.getByText(LESSON.title).first().waitFor({ timeout: 15000 });
  await shot(page, `queue-lesson-${scheme}.png`);
  try {
    await page.getByRole("button", { name: /quiz me/i }).first().click();
    await page.waitForURL(/quiz/, { timeout: 10000 });
    await page.waitForTimeout(800);
    await shot(page, `queue-quiz-start-${scheme}.png`);
    const start = page.getByRole("button", { name: /normal|start|easy/i }).first();
    if (await start.count()) await start.click();
    await page.getByText(QUIZ.questions[0].question).waitFor({ timeout: 10000 });
    await page.getByText("Air scatters blue light the most").first().click();
    await shot(page, `queue-quiz-${scheme}.png`);
  } catch (e) { console.log("quiz flow:", e.message.split("\n")[0]); await shot(page, `queue-quiz-fail-${scheme}.png`); }
  await ctx.close();
}
await browser.close();
server.close();
console.log("blocked hosts:", [...blocked].join(", ") || "none");
