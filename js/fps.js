function initFPSPage() {
  const gpuList = document.getElementById("gpuList");
  const cpuList = document.getElementById("cpuList");
  if (!gpuList || !cpuList || typeof gpus === "undefined") return;

  gpus.forEach(g => {
    let opt = document.createElement("option");
    opt.value = g.name;
    gpuList.appendChild(opt);
  });

  cpus.forEach(c => {
    let opt = document.createElement("option");
    opt.value = c.name;
    cpuList.appendChild(opt);
  });
}

function calcFPS() {
  let g = findHardware(gpus, document.getElementById("gpuInput").value);
  let c = findHardware(cpus, document.getElementById("cpuInput").value);
  let out = document.getElementById("out");

  if (!g || !c) {
    out.innerHTML = `<div class="card"><h2>Hardware nicht gefunden</h2><p class="small">Bitte GPU und CPU aus der Liste wählen.</p></div>`;
    return;
  }

  let game = document.getElementById("game").value;
  let resolution = document.getElementById("resolution").value;
  let quality = document.getElementById("quality").value;
  let raytracing = document.getElementById("raytracing").value;
  let ramType = document.getElementById("ramType").value;
  let ramSize = parseInt(document.getElementById("ramSize").value);

  let base =
    game === "cyberpunk" ? g.fps.cyberpunk :
    game === "warzone" ? g.fps.warzone :
    g.fps.fortnite;

  let resFactor = resolution === "1080" ? 1 : resolution === "1440" ? 0.78 : 0.55;
  let qualFactor =
    quality === "low" ? 1.25 :
    quality === "medium" ? 1 :
    quality === "high" ? 0.72 : 0.5;
  let rtFactor = raytracing === "on" ? (game === "cyberpunk" ? 0.55 : 0.7) : 1;
  let cpuFactor = Math.pow(c.score / 8, 1.15);
  let ramFactor = ramType === "DDR5" ? 1.1 : 1;
  let ramSizeFactor = ramSize >= 32 ? 1.1 : ramSize >= 16 ? 1 : 0.85;

  let fps = Math.max(5, Math.round(
    base * resFactor * qualFactor * rtFactor * cpuFactor * ramFactor * ramSizeFactor
  ));

  let psu = recommendPSU(g.tdp, c.tdp);

  // Calculate FPS for different aspect ratios at selected resolution
  let fpsNormal = Math.max(5, Math.round(base * resFactor * qualFactor * rtFactor * cpuFactor * ramFactor * ramSizeFactor));
  let fpsWide = Math.max(5, Math.round(base * resFactor * 0.85 * qualFactor * rtFactor * cpuFactor * ramFactor * ramSizeFactor));
  let fpsUltrawide = Math.max(5, Math.round(base * resFactor * 0.7 * qualFactor * rtFactor * cpuFactor * ramFactor * ramSizeFactor));

  out.innerHTML = `
<div class="card">
  <h2>${fps} FPS</h2>
  <p class="small">${g.name} + ${c.name} @ ${resolution === "1080" ? "1080p" : resolution === "1440" ? "1440p" : "4K"}</p>
  <p><b>${psu}</b></p>
  <canvas id="fpsChart"></canvas>
</div>`;

  new Chart(document.getElementById("fpsChart"), {
    type: "bar",
    data: {
      labels: ["Normal (16:9)", "Wide (21:9)", "Ultrawide (32:9)"],
      datasets: [{
        label: "FPS",
        data: [fpsNormal, fpsWide, fpsUltrawide],
        backgroundColor: [
          getColor(fpsNormal),
          getColor(fpsWide),
          getColor(fpsUltrawide)
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

document.addEventListener("DOMContentLoaded", initFPSPage);
