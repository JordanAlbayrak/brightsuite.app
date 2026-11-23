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
