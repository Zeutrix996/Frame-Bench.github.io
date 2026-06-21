function findGPU() {
  let budget = Number(document.getElementById("budget").value);
  let out = document.getElementById("out");
  if (!budget || budget <= 0) {
    out.innerHTML = `<div class="card"><p>Bitte ein gültiges Budget eingeben.</p></div>`;
    return;
  }

  let matches = gpus
    .filter(g => g.price <= budget)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (!matches.length) {
    out.innerHTML = `<div class="card"><h3>Keine GPU gefunden</h3><p class="small">Erhöhe dein Budget oder passe die Suche an.</p></div>`;
    return;
  }

  out.innerHTML = `
<div class="card">
  <h3>Top ${matches.length} GPUs bis ${budget}€</h3>
  <div class="rank-list">
    ${matches.map((g, i) => `
      <div class="rank-item">
        <span class="rank-num">#${i + 1}</span>
        <div class="rank-info">
          <strong>${g.name}</strong>
          <span class="small">Score ${g.score} · ${g.ram} GB VRAM · ${g.tdp}W · ${g.price}€</span>
        </div>
        <span class="rank-score">${g.fps.fortnite} FPS</span>
      </div>
    `).join("")}
  </div>
</div>`;
}

document.addEventListener("DOMContentLoaded", findGPU);
