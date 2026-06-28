function compareGPU() {
  let a = gpus.find(x => x.name === g1.value);
  let b = gpus.find(x => x.name === g2.value);
  if (!a || !b) return;

  let winner = a.score >= b.score ? a.name : b.name;
  let diff = Math.abs(a.score - b.score).toFixed(1);

  out.innerHTML = `
<div class="card">
  <h2>GPU Vergleich</h2>
  <p class="small">Vorteil: <b>${winner}</b> (+${diff} Punkte)</p>
  <canvas id="gpuChart"></canvas>
  <div class="stats-grid">
    <div><span>VRAM</span><b>${a.ram} GB</b> vs <b>${b.ram} GB</b></div>
    <div><span>TDP</span><b>${a.tdp}W</b> vs <b>${b.tdp}W</b></div>
    <div><span>Preis</span><b>${a.price}€</b> vs <b>${b.price}€</b></div>
  </div>
</div>`;

  new Chart(document.getElementById("gpuChart"), {
    type: "bar",
    data: {
      labels: ["Score", "Cyberpunk", "Warzone", "Fortnite"],
      datasets: [
        {
          label: a.name,
          data: [a.score, a.fps.cyberpunk, a.fps.warzone, a.fps.fortnite],
          backgroundColor: "#00ffd5"
        },
        {
          label: b.name,
          data: [b.score, b.fps.cyberpunk, b.fps.warzone, b.fps.fortnite],
          backgroundColor: "#4aa3ff"
        }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
