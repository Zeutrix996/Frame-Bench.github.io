function compareCPU() {
  let a = cpus.find(x => x.name === c1.value);
  let b = cpus.find(x => x.name === c2.value);
  if (!a || !b) return;

  let winner = a.score >= b.score ? a.name : b.name;
  let diff = Math.abs(a.score - b.score).toFixed(1);

  out.innerHTML = `
<div class="card">
  <h2>CPU Vergleich</h2>
  <p class="small">Vorteil: <b>${winner}</b> (+${diff} Punkte)</p>
  <canvas id="cpuChart"></canvas>
  <div class="stats-grid">
    <div><span>Kerne</span><b>${a.cores}</b> vs <b>${b.cores}</b></div>
    <div><span>Threads</span><b>${a.threads}</b> vs <b>${b.threads}</b></div>
    <div><span>TDP</span><b>${a.tdp}W</b> vs <b>${b.tdp}W</b></div>
  </div>
</div>`;

  new Chart(document.getElementById("cpuChart"), {
    type: "bar",
    data: {
      labels: ["Score", "Kerne", "Threads", "TDP"],
      datasets: [
        {
          label: a.name,
          data: [a.score, a.cores, a.threads, a.tdp],
          backgroundColor: "#00ffd5"
        },
        {
          label: b.name,
          data: [b.score, b.cores, b.threads, b.tdp],
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
