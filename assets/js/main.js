/* =========================================================================
   Site behaviour — progressive enhancement, no dependencies.
   ========================================================================= */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Theme -------------------------------------------------------------- */
  var STORAGE_KEY = "mkhm-theme";
  function applyTheme(mode) {
    if (mode === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    var btn = document.querySelector(".theme-toggle");
    if (btn) btn.setAttribute("aria-label", mode === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  try { var saved = localStorage.getItem(STORAGE_KEY); if (saved) applyTheme(saved); } catch (e) {}

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".theme-toggle");
    if (!btn) return;
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (err) {}
  });

  /* 2. Mobile navigation -------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("primary-nav");
  function closeNav() {
    if (!navList || !toggle) return;
    navList.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      var open = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navList.addEventListener("click", function (e) { if (e.target.tagName === "A") closeNav(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navList.classList.contains("is-open")) { closeNav(); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!navList.classList.contains("is-open")) return;
      if (navList.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) closeNav(); });
  }

  /* 3. Header shadow ------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 4. Reveal on scroll --------------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      revealables.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms";
        io.observe(el);
      });
    }
  }

  /* 5. Simulation gallery filters ----------------------------------------- */
  var filterBar = document.querySelector("[data-filter-bar]");
  if (filterBar) {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-tags]"));
    var countEl = document.querySelector("[data-filter-count]");
    function setCount(n) { if (countEl) countEl.textContent = n + (n === 1 ? " study" : " studies"); }
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      var key = btn.getAttribute("data-filter");
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var shown = 0;
      items.forEach(function (item) {
        var tags = (item.getAttribute("data-tags") || "").split(/\s+/);
        var match = key === "all" || tags.indexOf(key) !== -1;
        item.hidden = !match;
        if (match) shown++;
      });
      setCount(shown);
    });
    setCount(items.length);
  }

  /* 6. Contact form (mailto — no backend on Pages) ------------------------ */
  var form = document.querySelector("[data-mailto-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var to = form.getAttribute("data-mailto-form");
      var get = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ""; };
      var subject = encodeURIComponent(get("subject") || "Website enquiry");
      var body = encodeURIComponent(
        "Name: " + get("name") + "\nEmail: " + get("email") + "\n\n" + get("message"));
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      var note = form.querySelector("[data-form-note]");
      if (note) { note.hidden = false; note.textContent = "Your email app should now open with the message ready to send."; }
    });
  }

  /* 7. Current year ------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* 8. Hero canvas — plasmonic near-field motif (decorative) -------------- */
  var canvas = document.querySelector(".hero-canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, particles = [], t = 0, raf = null, running = false;

    function build() {
      var rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width); H = Math.max(1, rect.height);
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = [];
      var spacing = W < 640 ? 62 : 78;
      var cols = Math.ceil(W / spacing) + 2, rows = Math.ceil(H / spacing) + 2;
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
        var jx = (Math.sin(r * 12.9898 + c * 78.233) * 43758.5453) % 1;
        var jy = (Math.sin(c * 39.3468 + r * 11.135) * 24634.6345) % 1;
        particles.push({ x: c * spacing + jx * 16 - 8, y: r * spacing + jy * 16 - 8,
                         r: 1.1 + Math.abs(jx) * 1.9, ph: Math.abs(jy) * Math.PI * 2 });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      t += 0.0075;
      var k = 0.0135;
      for (var w = 0; w < 3; w++) {
        var phase = t * (0.9 + w * 0.22) + w * 2.1;
        ctx.beginPath();
        for (var x = 0; x <= W; x += 6) {
          var y = H * (0.34 + w * 0.17) + Math.sin(x * k + phase) * (13 + w * 5);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        var grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, "rgba(6,182,212,0)");
        grad.addColorStop(0.45, w === 1 ? "rgba(124,58,237,.32)" : "rgba(6,182,212,.30)");
        grad.addColorStop(1, "rgba(6,182,212,0)");
        ctx.strokeStyle = grad; ctx.lineWidth = 1.15; ctx.stroke();
      }
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var excite = 0.5 + 0.5 * Math.sin(p.x * k - t * 2.1 + p.ph);
        var glow = Math.pow(excite, 3), rad = p.r * (1 + glow * 0.85);
        if (glow > 0.32) {
          var halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 7);
          halo.addColorStop(0, "rgba(103,232,249," + (glow * 0.30).toFixed(3) + ")");
          halo.addColorStop(1, "rgba(103,232,249,0)");
          ctx.fillStyle = halo;
          ctx.beginPath(); ctx.arc(p.x, p.y, rad * 7, 0, Math.PI * 2); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(190,225,255," + (0.14 + glow * 0.55).toFixed(3) + ")";
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running || reduceMotion) return; running = true; frame(); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    build();
    if (reduceMotion) {
      var realRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = function () { return 0; };
      t = 1.4; frame();
      window.requestAnimationFrame = realRaf;
    } else start();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 180);
    });
    if ("IntersectionObserver" in window && !reduceMotion) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
      }, { threshold: 0.01 }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  }
})();
