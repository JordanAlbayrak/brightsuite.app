// Theme and icon CSS appended to site.css at build time: the five element palettes,
// a hero motif per theme, the theme picker, and the Sunburst icon colours.
import { themes, css, check } from "./themes.mjs";
import { pageCss } from "./sunburst.mjs";

export { themes };

export function brandCss() {
  const fails = check();
  if (fails.length) throw new Error("Theme contrast below WCAG AA:\n" + fails.join("\n"));
  const base = `:root { --tile: ${themes.forest.light.tile}; --mark: #fcf7ee; --desk-a: ${themes.forest.light["desk-a"]}; --desk-b: ${themes.forest.light["desk-b"]}; }\n`;
  const dots = Object.entries(themes).map(([k, t]) => `.el-dot[data-k="${k}"] { background: ${t.light.tile}; }`).join("\n");
  return `
/* ---- Element themes (src/themes.mjs) ---- */
${base}${css()}
.hero-sun .sun-rays, .hero-sun .sun-core, .brand-sun .sun-rays { transform-origin: 32px 32px; }
${pageCss}
.hero-sun { box-shadow: 0 10px 30px color-mix(in srgb, var(--tile) 30%, transparent); }
:root[data-el] .desk, :root[data-el] .corner, .desk, .corner { background:
  radial-gradient(120% 90% at 20% 10%, var(--desk-a) 0%, transparent 60%),
  radial-gradient(90% 80% at 90% 100%, var(--desk-b) 0%, transparent 60%),
  linear-gradient(160deg, var(--bg-2), var(--desk-b)); }

/* hero motif per theme, behind the hero content */
.hero::before { content: ""; position: absolute; inset: 0 0 auto 0; height: min(760px, 90vh); z-index: -1; pointer-events: none; }
:root[data-el="forest"] .hero::before, :root:not([data-el]) .hero::before { background:
  radial-gradient(38% 46% at 6% 18%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%),
  radial-gradient(30% 40% at 94% 30%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%); }
:root[data-el="ocean"] .hero::before { background:
  repeating-radial-gradient(120% 60% at 50% 125%, transparent 0 26px, color-mix(in srgb, var(--accent) 16%, transparent) 26px 28px),
  linear-gradient(transparent 50%, color-mix(in srgb, var(--accent) 9%, transparent)); }
:root[data-el="sky"] .hero::before { background:
  radial-gradient(16% 8% at 13% 22%, color-mix(in srgb, var(--card) 95%, transparent), transparent 70%),
  radial-gradient(12% 6% at 19% 27%, color-mix(in srgb, var(--card) 90%, transparent), transparent 70%),
  radial-gradient(18% 9% at 85% 15%, color-mix(in srgb, var(--card) 95%, transparent), transparent 70%),
  radial-gradient(12% 6% at 79% 19%, color-mix(in srgb, var(--card) 90%, transparent), transparent 70%),
  radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%); }
:root[data-el="space"] .hero::before { background:
  radial-gradient(2px 2px at 20px 30px, var(--muted), transparent),
  radial-gradient(1.5px 1.5px at 90px 120px, var(--muted), transparent),
  radial-gradient(2px 2px at 160px 60px, var(--accent), transparent),
  radial-gradient(1.5px 1.5px at 230px 170px, var(--muted), transparent),
  radial-gradient(55% 45% at 70% 20%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%);
  background-size: 260px 220px, 260px 220px, 260px 220px, 260px 220px, 100% 100%; }
:root[data-el="cave"] .hero::before { background:
  radial-gradient(48% 42% at 50% 0%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 70%),
  radial-gradient(120% 90% at 50% 40%, transparent 55%, color-mix(in srgb, var(--ink) 10%, transparent)); }

/* theme picker beside the light/dark toggle */
.el-pick { position: relative; }
.el-pick summary { list-style: none; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 10px; cursor: pointer; }
.el-pick summary::-webkit-details-marker { display: none; }
.el-pick summary:hover { background: var(--bg-2); }
.el-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--card); box-shadow: 0 0 0 1px var(--line); }
.el-menu { position: absolute; right: 0; top: 46px; background: var(--card); border: 1px solid var(--line); border-radius: 14px;
  box-shadow: var(--shadow); padding: 6px; display: grid; gap: 2px; min-width: 160px; z-index: 20; }
.el-menu button { display: flex; align-items: center; gap: 10px; font: inherit; font-size: .9375rem; color: var(--ink); background: none;
  border: 0; border-radius: 10px; padding: 8px 10px; cursor: pointer; text-align: left; min-height: 40px; }
.el-menu button:hover, .el-menu button[aria-checked="true"] { background: var(--accent-soft); }
${dots}
`;
}
