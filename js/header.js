(function () {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const base = mount.dataset.base || "";
  const active = mount.dataset.page || "";

  const items = [
    { id: "home", root: "index.html", page: "../index.html", label: "Home" },
    { id: "fps", root: "pages/fps.html", page: "fps.html", label: "FPS" },
    { id: "gpu", root: "pages/gpu-compare.html", page: "gpu-compare.html", label: "GPU" },
    { id: "cpu", root: "pages/cpu-compare.html", page: "cpu-compare.html", label: "CPU" },
    { id: "bottleneck", root: "pages/compare.html", page: "compare.html", label: "Bottleneck" },
    { id: "finder", root: "pages/finder.html", page: "finder.html", label: "Finder" },
    { id: "ranking", root: "pages/ranking.html", page: "ranking.html", label: "Ranking" },
    { id: "live", root: "pages/live-monitoring.html", page: "live-monitoring.html", label: "Live" },
    { id: "agb", root: "pages/agb.html", page: "agb.html", label: "AGB" },
    { id: "datenschutz", root: "pages/datenschutz.html", page: "datenschutz.html", label: "Datenschutz" },
    { id: "impressum", root: "pages/impressum.html", page: "impressum.html", label: "Impressum" }
  ];

  const inPages = base === "../";
  const homeHref = inPages ? "../index.html" : "index.html";

  const navLinks = items.map(item => {
    const href = inPages ? item.page : item.root;
    const cls = item.id === active ? "nav-link active" : "nav-link";
    return `<a class="${cls}" href="${href}">${item.label}</a>`;
  }).join("");

  mount.outerHTML = `
<header class="topbar">
  <div class="header-inner">
    <a class="logo-area" href="${homeHref}">
      <div class="logo-icon">FB</div>
      <div class="logo-text">
        <div class="logo">FrameBench</div>
        <div class="slogan">Benchmark your system</div>
      </div>
    </a>
    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menü öffnen">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="nav" id="nav-menu">${navLinks}</nav>
  </div>
</header>`;

  // Mobile menu toggle functionality
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
})();
