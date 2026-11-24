(function () {
  var root = document.documentElement;

  var btn = document.querySelector(".theme");
  if (btn) {
    var current = function () {
      var t = root.getAttribute("data-theme");
      if (t) return t;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };
    var label = function () { btn.setAttribute("aria-pressed", current() === "dark" ? "true" : "false"); };
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
    label();
  }

  // Theme picker: five element themes, separate from light and dark. Kept in localStorage.
  var toggle = document.querySelector(".theme");
  if (toggle) {
    var fr = root.lang === "fr";
    var els = [["forest", "Forest", "Forêt"], ["ocean", "Ocean", "Océan"], ["sky", "Sky", "Ciel"], ["space", "Space", "Espace"], ["cave", "Cave", "Caverne"]];
    var cur = root.getAttribute("data-el") || "forest";
    var pick = document.createElement("details");
    pick.className = "el-pick";
    pick.innerHTML = '<summary aria-label="' + (fr ? "Thème" : "Theme") + '"><span class="el-dot"></span></summary><div class="el-menu" role="menu"></div>';
    toggle.parentNode.insertBefore(pick, toggle);
    var dot = pick.querySelector(".el-dot"), menu = pick.querySelector(".el-menu");
    var sync = function () {
      dot.setAttribute("data-k", cur);
      menu.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-checked", b.dataset.el === cur ? "true" : "false"); });
    };
    els.forEach(function (e) {
      var b = document.createElement("button");
      b.type = "button"; b.dataset.el = e[0]; b.setAttribute("role", "menuitemradio");
      b.innerHTML = '<span class="el-dot" data-k="' + e[0] + '"></span>' + (fr ? e[2] : e[1]);
      b.addEventListener("click", function () {
        cur = e[0];
        root.setAttribute("data-el", cur);
        try { localStorage.setItem("el", cur); } catch (x) {}
        sync();
        pick.open = false;
      });
      menu.appendChild(b);
    });
    document.addEventListener("click", function (ev) { if (pick.open && !pick.contains(ev.target)) pick.open = false; });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && pick.open) { pick.open = false; pick.querySelector("summary").focus(); } });
    sync();
  }

  // Hero headline types itself once. The full text stays in the heading's aria-label,
  // and the untyped part is only hidden, so the layout never moves.
  var h1 = document.querySelector(".hero h1.tw");
  if (h1 && root.classList.contains("tw-wait")) {
    var full = h1.textContent;
    h1.setAttribute("aria-label", full);
    var on = document.createElement("span");
    var off = document.createElement("span");
    on.className = "tw-on"; off.className = "tw-off";
    on.setAttribute("aria-hidden", "true"); off.setAttribute("aria-hidden", "true");
    off.textContent = full;
    h1.textContent = "";
    h1.appendChild(on); h1.appendChild(off);
    root.classList.remove("tw-wait");
    var i = 0, step = Math.max(20, Math.round(1500 / full.length));
    var tick = function () {
      i += 1;
      on.textContent = full.slice(0, i);
      off.textContent = full.slice(i);
      if (i < full.length) setTimeout(tick, step);
      else root.classList.add("tw-done");
    };
    setTimeout(tick, 250);
  } else {
    root.classList.remove("tw-wait");
  }

  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");

  // Real constellations in the hero sky, drawn at their true shapes from star positions
  // (right ascension in hours, declination in degrees). Stars near the pointer drift in slowly
  // and get gathered, then fade back. The loop only runs while something moves.
  var cv = document.querySelector(".sky canvas.stars");
  if (cv && cv.getContext) {
    var SKY = [
      { at: [0.13, 0.17],
        s: [[11.06, 61.75], [11.03, 56.38], [11.90, 53.69], [12.26, 57.03], [12.90, 55.96], [13.40, 54.93], [13.79, 49.31]],
        l: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]] },
      { at: [0.79, 0.13],
        s: [[0.15, 59.15], [0.68, 56.54], [0.95, 60.72], [1.43, 60.24], [1.91, 63.67]],
        l: [[0, 1], [1, 2], [2, 3], [3, 4]] },
      { at: [0.09, 0.6],
        s: [[5.92, 7.41], [5.42, 6.35], [5.68, -1.94], [5.60, -1.20], [5.53, -0.30], [5.80, -9.67], [5.24, -8.20], [5.59, 9.93]],
        l: [[7, 0], [7, 1], [0, 2], [1, 4], [4, 3], [3, 2], [2, 5], [4, 6]] },
      { at: [0.9, 0.45],
        s: [[20.69, 45.28], [20.37, 40.26], [19.51, 27.96], [19.75, 45.13], [20.77, 33.97]],
        l: [[0, 1], [1, 2], [3, 1], [1, 4]] },
      { at: [0.73, 0.38],
        s: [[18.62, 38.78], [18.74, 39.67], [18.75, 37.61], [18.83, 33.36], [18.98, 32.69], [18.91, 36.90]],
        l: [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 2]] },
      { at: [0.24, 0.42],
        s: [[10.14, 11.97], [10.12, 16.76], [10.33, 19.84], [10.28, 23.42], [9.88, 26.01], [9.76, 23.77], [11.24, 20.52], [11.82, 14.57], [11.24, 15.43]],
        l: [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0], [2, 6], [6, 7], [7, 8], [8, 0]] },
      { at: [0.86, 0.78],
        s: [[16.09, -19.81], [16.01, -22.62], [15.98, -26.11], [16.35, -25.59], [16.49, -26.43], [16.60, -28.22], [16.84, -34.29], [16.86, -38.05], [16.91, -42.36], [17.20, -43.24], [17.62, -43.0], [17.79, -40.13], [17.71, -39.03], [17.56, -37.10]],
        l: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13]] },
    ];
    // The one invented constellation: the BrightSuite sun, a ring of eight around a bright centre.
    var sunRing = [[0, 0]];
    for (var q = 0; q < 8; q++) sunRing.push([Math.cos(q * Math.PI / 4) * 3, Math.sin(q * Math.PI / 4) * 3]);
    SKY.push({ at: [0.6, 0.12],
      flat: sunRing, l: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]] });

    var BACK = [20000, 10000], FADE = 2500;
    var ctx = cv.getContext("2d");
    var W = 0, H = 0, dpr = 1, stars = [], links = [], sparks = [], dust = [];
    var ink = "#fff", lineA = 0.18, starA = 0.8, running = false, onScreen = true, ptr = null, ptrT = 0, nextBack = 0;
    var seed = 20261123;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (var m = 0; m < 55; m++) dust.push([rnd(), rnd() * 0.95, 0.5 + rnd() * 0.7]);

    // Project each constellation flat around its own centre, north up, east to the left,
    // with one shared scale so their sizes stay true to each other.
    var layout = function () {
      stars = []; links = [];
      var k = Math.min(W, 1500) * 0.0085;
      SKY.forEach(function (c) {
        var pts = c.flat ? c.flat.map(function (p) { return [p[0] * 5, p[1] * 5]; }) : null;
        if (!pts) {
          var ra0 = 0, de0 = 0;
          c.s.forEach(function (p) { ra0 += p[0]; de0 += p[1]; });
          ra0 /= c.s.length; de0 /= c.s.length;
          var cosd = Math.cos(de0 * Math.PI / 180);
          pts = c.s.map(function (p) { return [-(p[0] - ra0) * 15 * cosd, -(p[1] - de0)]; });
        }
        c.stars = pts.map(function (p, i) {
          var st = { x: c.at[0] * W + p[0] * k, y: c.at[1] * H + p[1] * k, r: c.flat && i === 0 ? 2.4 : 1.6, ox: 0, oy: 0, a: 1, gone: false, back: 0, c: c };
          stars.push(st); return st;
        });
        c.box = c.stars.reduce(function (b, s) { return { l: Math.min(b.l, s.x), r: Math.max(b.r, s.x), t: Math.min(b.t, s.y), b: Math.max(b.b, s.y) }; }, { l: 1e9, r: -1e9, t: 1e9, b: -1e9 });
        c.links = c.l.map(function (p) { var ln = [c.stars[p[0]], c.stars[p[1]], c]; links.push(ln); return ln; });
        
      });
      dust.forEach(function (d) { stars.push({ x: d[0] * W, y: d[1] * H, r: d[2], ox: 0, oy: 0, a: 1, gone: false, back: 0, c: null }); });
    };

    var zone = null;
    var findZone = function () {
      var r = cv.getBoundingClientRect(), box = null;
      document.querySelectorAll(".hero h1, .hero .lead, .hero .actions").forEach(function (el) {
        var b = el.getBoundingClientRect();
        if (!box) box = { l: b.left, t: b.top, r: b.right, b: b.bottom };
        else { box.l = Math.min(box.l, b.left); box.t = Math.min(box.t, b.top); box.r = Math.max(box.r, b.right); box.b = Math.max(box.b, b.bottom); }
      });
      zone = box && { x: (box.l + box.r) / 2 - r.left, y: (box.t + box.b) / 2 - r.top, rx: (box.r - box.l) / 2 + 70, ry: (box.b - box.t) / 2 + 50 };
    };
    var clear = function (x, y) {
      if (!zone) return 1;
      var dx = (x - zone.x) / zone.rx, dy = (y - zone.y) / zone.ry, d = Math.sqrt(dx * dx + dy * dy);
      return d <= 0.85 ? 0 : d >= 1.2 ? 1 : (d - 0.85) / 0.35;
    };
    var colours = function () {
      var cs = getComputedStyle(root);
      var dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
      ink = (dark ? cs.getPropertyValue("--ink") : cs.getPropertyValue("--accent")).trim() || "#888";
      starA = dark ? 0.85 : 0.55; lineA = dark ? 0.2 : 0.16;
    };
    var size = function () {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };
    var X = function (s) { return s.x + s.ox; };
    var Y = function (s) { return s.y + s.oy; };
    var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };

    var draw = function (now) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.lineWidth = 1;
      SKY.forEach(function (c) {
        var n = c.links.length, done = n;
        for (var i = 0; i < n && i < done; i++) {
          var a = c.links[i][0], b = c.links[i][1], f = Math.min(1, done - i);
          var ax = X(a), ay = Y(a), bx = ax + (X(b) - ax) * f, by = ay + (Y(b) - ay) * f, z = 1;
          for (var k = 0; k <= 4; k++) z = Math.min(z, clear(ax + (bx - ax) * k / 4, ay + (by - ay) * k / 4));
          ctx.globalAlpha = lineA * Math.min(a.a, b.a) * z;
          if (ctx.globalAlpha < 0.01) continue;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
      });
      for (var j = 0; j < stars.length; j++) {
        var s = stars[j];
        if (s.a < 0.01) continue;
        ctx.globalAlpha = starA * s.a * clear(X(s), Y(s));
        if (ctx.globalAlpha < 0.01) continue;
        ctx.beginPath(); ctx.arc(X(s), Y(s), s.r * (0.4 + 0.6 * s.a), 0, 6.283); ctx.fill();
      }
      for (var p = sparks.length - 1; p >= 0; p--) {
        var t = (now - sparks[p].t) / 600;
        if (t >= 1) { sparks.splice(p, 1); continue; }
        ctx.globalAlpha = 0.5 * (1 - t);
        ctx.beginPath(); ctx.arc(sparks[p].x, sparks[p].y, 3 + 12 * t, 0, 6.283); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    var last = 0;
    var step = function (now) {
      var dt = last ? Math.min(64, now - last) : 16; last = now;
      // A resting mouse keeps pulling; a tap pulls for a few seconds.
      var hunting = ptr && (!ptr.touch || now - ptrT < 7000), busy = sparks.length > 0;
      var R = ptr && ptr.touch ? 190 : 170;
      nextBack = 0;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (s.gone) {
          if (now > s.back) { s.a = Math.min(1, s.a + dt / FADE); if (s.a >= 1) s.gone = false; busy = true; }
          else if (!nextBack || s.back < nextBack) nextBack = s.back;
          continue;
        }
        if (hunting) {
          var dx = ptr.x - X(s), dy = ptr.y - Y(s), d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) {
            // Steady drift that builds up over about a second: roughly 30 px/s far out, 55 px/s close in.
            s.v = Math.min(0.03 + 0.025 * ease(1 - d / R), (s.v || 0) + 0.00003 * dt);
            var mv = Math.min(d, s.v * dt) / (d || 1);
            s.ox += dx * mv; s.oy += dy * mv;
            busy = true;
            if (d < 6) { s.gone = true; s.a = 0; s.ox = 0; s.oy = 0; s.v = 0; s.back = now + BACK[0] + Math.random() * BACK[1]; sparks.push({ x: ptr.x, y: ptr.y, t: now }); }
            continue;
          }
        }
        s.v = 0;
        if (Math.abs(s.ox) + Math.abs(s.oy) > 0.3) { var back = Math.pow(0.975, dt / 16); s.ox *= back; s.oy *= back; busy = true; } else { s.ox = 0; s.oy = 0; }
      }
      return busy;
    };
    var frame = function (now) {
      var more = step(now);
      draw(now);
      if (more && onScreen && !document.hidden) requestAnimationFrame(frame);
      else { running = false; last = 0; if (nextBack) setTimeout(wake, Math.max(0, nextBack - performance.now())); }
    };
    var wake = function () {
      if (running || (still && still.matches)) return;
      running = true; requestAnimationFrame(frame);
    };
    var aim = function (e, touch) {
      var r = cv.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) { if (ptr && !ptr.touch) { ptr = null; wake(); } return; }
      ptr = { x: x, y: y, touch: touch }; ptrT = performance.now(); wake();
    };
    window.addEventListener("pointermove", function (e) { if (e.pointerType !== "touch") aim(e, false); }, { passive: true });
    document.addEventListener("pointerout", function (e) { if (!e.relatedTarget && ptr && !ptr.touch) { ptr = null; wake(); } }, { passive: true });
    window.addEventListener("pointerdown", function (e) { if (e.pointerType === "touch") aim(e, true); }, { passive: true });
    var redraw = function () { colours(); draw(performance.now()); };
    if (window.ResizeObserver) new ResizeObserver(function () { size(); findZone(); redraw(); }).observe(cv);
    if (window.IntersectionObserver) new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; if (onScreen) wake(); }).observe(cv);
    new MutationObserver(redraw).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-el"] });
    if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) wake(); });
    size(); findZone(); redraw();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { findZone(); redraw(); });
  }

  // The header sun turns a little as the page scrolls.
  var brandSun = document.querySelector(".brand-sun");
  if (brandSun && !(still && still.matches)) {
    var queued = false;
    window.addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { brandSun.style.setProperty("--sr", (window.scrollY * 0.25) % 360 + "deg"); queued = false; });
    }, { passive: true });
  }

  // Pause every animation while the tab is hidden.
  document.addEventListener("visibilitychange", function () {
    root.classList.toggle("paused", document.hidden);
  });

  // BrightPause: a 20-second break, right here on the page.
  var tryBtn = document.querySelector("[data-break]");
  var dlg = document.querySelector(".breakdlg");
  if (tryBtn && dlg && typeof dlg.showModal === "function") {
    tryBtn.hidden = false;
    var n = dlg.querySelector(".ring-n");
    var text = dlg.querySelector(".dlg-text");
    var timer = null;
    var stop = function () { if (timer) clearInterval(timer); timer = null; };
    tryBtn.addEventListener("click", function () {
      var left = 20;
      n.textContent = left;
      text.textContent = text.dataset.text;
      dlg.classList.remove("done");
      dlg.style.setProperty("--p", "0");
      dlg.showModal();
      requestAnimationFrame(function () { dlg.style.setProperty("--p", "1"); });
      stop();
      timer = setInterval(function () {
        left -= 1;
        n.textContent = left;
        if (left <= 0) {
          stop();
          dlg.classList.add("done");
          text.textContent = text.dataset.done;
        }
      }, 1000);
    });
    dlg.addEventListener("close", function () { stop(); tryBtn.focus(); });
  }

  // BrightQueue: one more fun fact.
  var fact = document.querySelector(".fact");
  if (fact) {
    var facts = fact.dataset.facts.split("|");
    var i = 0;
    var next = fact.querySelector(".fact-next");
    var out = fact.querySelector(".fact-text");
    next.hidden = false;
    next.addEventListener("click", function () {
      i = (i + 1) % facts.length;
      fact.classList.remove("pop");
      void fact.offsetWidth;
      fact.classList.add("pop");
      out.textContent = facts[i];
    });
  }
})();
