(function () {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const base = mount.dataset.base || "";

  const inPages = base === "../";
  const homeHref = inPages ? "../index.html" : "index.html";

  const footerLinks = [
    { href: inPages ? "agb.html" : "pages/agb.html", label: "AGB" },
    { href: inPages ? "datenschutz.html" : "pages/datenschutz.html", label: "Datenschutz" },
    { href: inPages ? "impressum.html" : "pages/impressum.html", label: "Impressum" }
  ];

  const linksHtml = footerLinks.map(link => 
    `<a class="footer-link" href="${link.href}">${link.label}</a>`
  ).join('<span class="footer-separator">·</span>');

  mount.outerHTML = `
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-links">
      ${linksHtml}
    </div>
    <div class="footer-copyright">
      © 2026 FrameBench. Alle Rechte vorbehalten.
    </div>
  </div>
</footer>`;
})();
