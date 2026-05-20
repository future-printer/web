/* ════════════════════════════════════════════════════════
   Future PRINTer — Website Script
   ════════════════════════════════════════════════════════ */

/* ── Outcomes Data ──────────────────────────────────────
   Add new items at the top of this array as outcomes are
   completed. Each item:
   {
     tag:   short category label (e.g. "Digital Twin"),
     title: outcome title,
     body:  one or two sentence description,
     icon:  Bootstrap Icon name (without "bi-"), optional
   }
──────────────────────────────────────────────────────── */
const OUTCOMES = [
  /* Example — uncomment and edit when ready:
  {
    tag:   "Architecture",
    title: "System Architecture Report",
    body:  "Documented system architecture covering all integration points between the Digital Twin platform and the XR application.",
    icon:  "diagram-3-fill",
  },
  */
];

function buildOutcomes() {
  const grid = document.getElementById("outcomesGrid");
  if (!grid) return;

  if (OUTCOMES.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-muted reveal">
        <i class="bi bi-hourglass-split fs-1 d-block mb-3 opacity-25"></i>
        <p>Outcomes will be published here as the project progresses.</p>
      </div>`;
    return;
  }

  grid.innerHTML = OUTCOMES.map((item, i) => `
    <div class="col-md-6 reveal" style="transition-delay:${(i % 2) * 80}ms">
      <div class="fp-wp-card">
        <div class="fp-wp-num fp-wp-${i % 2 === 0 ? 'cyan' : 'purple'}">
          <i class="bi bi-${item.icon || 'check2-circle'}"></i>
        </div>
        <div class="fp-wp-body">
          <span class="fp-wp-period">${item.tag}</span>
          <h3 class="fp-wp-title">${item.title}</h3>
          <p class="fp-wp-desc">${item.body}</p>
        </div>
      </div>
    </div>`).join("");
}

/* ── News Data ──────────────────────────────────────────
   Add new items at the top of this array. Each item:
   {
     date:    "Month YYYY",
     tag:     short label shown as a pill (e.g. "Milestone"),
     title:   headline,
     body:    one or two sentence summary,
     icon:    Bootstrap Icon name (without "bi-"), optional
   }
──────────────────────────────────────────────────────── */
const NEWS = [
  {
    date:  "February 2026",
    tag:   "Kick-off",
    title: "Project officially launched",
    body:  "Future PRINTer held its kick-off meeting, aligning both partner organisations on objectives, timelines, and responsibilities for the 24-month project.",
    icon:  "flag-fill",
  },
];

function buildNews() {
  const grid = document.getElementById("newsGrid");
  if (!grid) return;

  if (NEWS.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-muted reveal">
        <i class="bi bi-newspaper fs-1 d-block mb-3 opacity-25"></i>
        <p>No news yet — check back soon.</p>
      </div>`;
    return;
  }

  grid.innerHTML = NEWS.map((item, i) => `
    <div class="col-md-6 col-xl-4 reveal" style="transition-delay:${(i % 3) * 60}ms">
      <div class="fp-news-card">
        <div class="fp-news-meta">
          <span class="fp-news-tag">${item.tag}</span>
          <span class="fp-news-date">${item.date}</span>
        </div>
        <div class="fp-news-icon"><i class="bi bi-${item.icon || 'newspaper'}"></i></div>
        <h4 class="fp-news-title">${item.title}</h4>
        <p class="fp-news-body">${item.body}</p>
      </div>
    </div>`).join("");
}



/* ── Scroll Reveal ─────────────────────────────────────── */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

/* ── Navbar: scroll state & active link ─────────────────── */
function initNavbar() {
  const nav     = document.getElementById("mainNav");
  const links   = document.querySelectorAll(".fp-navbar .nav-link");
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    /* Scrolled class */
    nav.classList.toggle("scrolled", window.scrollY > 20);

    /* Active link highlight */
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── Smooth scroll for all anchor links ────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      /* Close mobile menu if open */
      const menu = document.getElementById("navMenu");
      if (menu && menu.classList.contains("show")) {
        bootstrap.Collapse.getInstance(menu)?.hide();
      }

      const navH = document.getElementById("mainNav")?.offsetHeight || 70;
      window.scrollTo({ top: target.offsetTop - navH, behavior: "smooth" });
    });
  });
}

/* ── Data-delay stagger for reveal items ───────────────── */
function applyDelays() {
  document.querySelectorAll("[data-delay]").forEach(el => {
    el.style.transitionDelay = el.dataset.delay + "ms";
  });
}

/* ── Animate stat numbers on scroll into view ──────────── */
function initCounters() {
  const counters = document.querySelectorAll(".fp-stat-n");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.textContent, 10);
      if (isNaN(end)) return;

      let start     = 0;
      const step    = Math.ceil(end / 24);
      const ticker  = setInterval(() => {
        start += step;
        if (start >= end) { el.textContent = end; clearInterval(ticker); return; }
        el.textContent = start;
      }, 40);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ── Init ──────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  buildOutcomes();
  buildNews();
  applyDelays();
  observeReveal();
  initNavbar();
  initSmoothScroll();
  initCounters();
});
