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
