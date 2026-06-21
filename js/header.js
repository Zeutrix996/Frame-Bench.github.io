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
    { id: "datenschutz", root: "pages/datenschutz.html", page: "datenschutz.html", label: "Datenschutz" }
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
    <nav class="nav">${navLinks}</nav>
  </div>
</header>`;
})();
