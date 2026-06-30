function switchTab(type) {
  const gpuSearch = document.getElementById("gpu-search");
  const cpuSearch = document.getElementById("cpu-search");
  const out = document.getElementById("out");
  const buttons = document.querySelectorAll(".tab-btn");
  
  buttons.forEach(btn => btn.classList.remove("active"));
  
  if (type === "gpu") {
    gpuSearch.style.display = "block";
    cpuSearch.style.display = "none";
    buttons[0].classList.add("active");
    out.innerHTML = "";
  } else {
    gpuSearch.style.display = "none";
    cpuSearch.style.display = "block";
    buttons[1].classList.add("active");
    out.innerHTML = "";
  }
}

function findGPU() {
  let budget = Number(document.getElementById("budget").value);
  let out = document.getElementById("out");
  if (!budget || budget <= 0) {
    out.innerHTML = `<div class="card"><p>Bitte ein gültiges Budget eingeben.</p></div>`;
    return;
  }

  let matches = gpus
    .filter(g => {
      if (typeof g.price === 'string') {
        const [min, max] = g.price.split('-').map(p => parseInt(p.trim()));
        return budget >= min && budget <= max;
      }
      return g.price <= budget;
    })
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
      <div class="rank-item clickable" onclick="showGPUDetail(gpus.find(gpu => gpu.name === '${g.name.replace(/'/g, "\\'")}'))">
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

function findCPU() {
  let budget = Number(document.getElementById("cpu-budget").value);
  let out = document.getElementById("out");
  if (!budget || budget <= 0) {
    out.innerHTML = `<div class="card"><p>Bitte ein gültiges Budget eingeben.</p></div>`;
    return;
  }

  let matches = cpus
    .filter(c => {
      if (typeof c.price === 'string') {
        const [min, max] = c.price.split('-').map(p => parseInt(p.trim()));
        return budget >= min && budget <= max;
      }
      return c.price <= budget;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (!matches.length) {
    out.innerHTML = `<div class="card"><h3>Keine CPU gefunden</h3><p class="small">Erhöhe dein Budget oder passe die Suche an.</p></div>`;
    return;
  }

  out.innerHTML = `
<div class="card">
  <h3>Top ${matches.length} CPUs bis ${budget}€</h3>
  <div class="rank-list">
    ${matches.map((c, i) => `
      <div class="rank-item clickable" onclick="showCPUDetail(cpus.find(cpu => cpu.name === '${c.name.replace(/'/g, "\\'")}'))">
        <span class="rank-num">#${i + 1}</span>
        <div class="rank-info">
          <strong>${c.name}</strong>
          <span class="small">Score ${c.score} · ${c.cores}C/${c.threads}T · ${c.tdp}W · ${c.price}€</span>
        </div>
        <span class="rank-score">${c.score}</span>
      </div>
    `).join("")}
  </div>
</div>`;
}

document.addEventListener("DOMContentLoaded", findGPU);
