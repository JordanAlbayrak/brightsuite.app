// the interim "Forest Green Sunburst" icon family Jordan picked, redrawn as
// clean SVG from the reference raster (bright-discord/kit). Tile and mark colours are CSS variables
// (--tile, --mark) with forest fallbacks, so the tile can follow the site theme.

export const TILE = "#2e6d51";
export const MARK = "#fcf7ee";

// Measured from the 440 px reference tile, scaled to a 64 grid (x 0.14545).
const C = 32, DISC = 11.8, RAY_IN = 16.7, RAY_OUT = 21.4, RAY_W = 4.4, RX = 16;
const r = (n) => Math.round(n * 100) / 100;

function rays() {
  let s = "";
  for (let k = 0; k < 8; k++) {
    const a = (k * 45 * Math.PI) / 180;
    s += `<line x1="${r(C + RAY_IN * Math.cos(a))}" y1="${r(C + RAY_IN * Math.sin(a))}" x2="${r(C + RAY_OUT * Math.cos(a))}" y2="${r(C + RAY_OUT * Math.sin(a))}"/>`;
  }
  return s;
}

const centres = {
  suite: () => "",
  // two solid bars cut in tile colour, as in the reference (30 x 89 px, centres 55 px apart)
  pause: () => `<g class="bs-tile"><rect x="25.83" y="25.53" width="4.4" height="12.94" rx="2.2"/><rect x="33.77" y="25.53" width="4.4" height="12.94" rx="2.2"/></g>`,
  // an open book drawn in tile colour: two pages and a spine
  queue: () => `<g class="bs-tile-s" fill="none" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"><path d="M32 28.4 C29.6 26.9 26.8 26.7 24.6 27.4 V36 C26.8 35.3 29.6 35.5 32 37 C34.4 35.5 37.2 35.3 39.4 36 V27.4 C37.2 26.7 34.4 26.9 32 28.4 Z"/><path d="M32 28.4 V36.6"/></g>`,
};

// mode "file": a standalone SVG with its own <style> (fallback colours, works as <img> or favicon)
// mode "inline": classes only, styled by the page's stylesheet (the site CSP blocks inline <style>)
export function mark(app, mode = "file", attrs = "") {
  const style = mode === "file"
    ? `<style>.bs-tile{fill:var(--tile,${TILE})}.bs-mark{fill:var(--mark,${MARK})}.bs-mark-s{stroke:var(--mark,${MARK})}.bs-tile-s{stroke:var(--tile,${TILE})}</style>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${attrs}>${style}<rect class="bs-tile" width="64" height="64" rx="${RX}"/><g class="bs-mark-s sun-rays" stroke-width="${RAY_W}" stroke-linecap="round">${rays()}</g><circle class="bs-mark sun-core" cx="${C}" cy="${C}" r="${DISC}"/>${centres[app]()}</svg>`;
}

export const pageCss = `.bs-tile{fill:var(--tile,${TILE})}.bs-mark{fill:var(--mark,${MARK})}.bs-mark-s{stroke:var(--mark,${MARK})}.bs-tile-s{stroke:var(--tile,${TILE})}`;
