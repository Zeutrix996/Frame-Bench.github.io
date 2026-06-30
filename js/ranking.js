function renderRanking(type) {
  const rank = document.getElementById("rank");
  const list = type === "gpu" ? gpus : cpus;

  rank.innerHTML = list
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((item, i) => {
      const detail = type === "gpu"
        ? `${item.ram} GB VRAM · ${item.tdp}W · ${item.price}€`
        : `${item.cores}C/${item.threads}T · ${item.tdp}W`;
      const isClickable = 'clickable';
      const onClick = type === "gpu" 
        ? `onclick="showGPUDetail(gpus.find(g => g.name === '${item.name.replace(/'/g, "\\'")}'))"`
        : `onclick="showCPUDetail(cpus.find(c => c.name === '${item.name.replace(/'/g, "\\'")}'))"`;
      return `
<div class="rank-item ${isClickable}" ${onClick}>
  <span class="rank-num">#${i + 1}</span>
  <div class="rank-info">
    <strong>${item.name}</strong>
    <span class="small">${detail}</span>
  </div>
  <span class="rank-score">${item.score}</span>
</div>`;
    }).join("");
}

function setRankingTab(type) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === type);
  });
  renderRanking(type);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => setRankingTab(btn.dataset.tab));
  });
  renderRanking("gpu");
});
