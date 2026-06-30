function initBottleneckPage() {
  const gpuSelect = document.getElementById("gpu");
  const cpuSelect = document.getElementById("cpu");
  if (!gpuSelect || !cpuSelect || typeof gpus === "undefined") return;

  gpus.forEach(g => gpuSelect.add(new Option(g.name)));
  cpus.forEach(c => cpuSelect.add(new Option(c.name)));
}

function calcBottleneck() {
  const gpuSelect = document.getElementById("gpu");
  const cpuSelect = document.getElementById("cpu");
  const out = document.getElementById("out");
  if (!gpuSelect || !cpuSelect || !out) return;

  let g = gpus.find(x => x.name === gpuSelect.value);
  let c = cpus.find(x => x.name === cpuSelect.value);
  if (!g || !c) return;

  let gpuScore = g.score;
  let cpuScore = c.score;
  let diff = gpuScore - cpuScore;
  let absDiff = Math.abs(diff);

  let type, explanation, culprit, recommendation;

  if (diff >= 0.6) {
    type = "CPU Bottleneck (CPU limitiert)";
    explanation = `Deine GPU (${g.name}) ist deutlich stärker als deine CPU (${c.name}). Die CPU kann nicht schnell genug Daten an die GPU liefern, wodurch die GPU unter ihren Möglichkeiten arbeitet. Besonders bei 1080p und hohen FPS-Zielen fällt das stark auf.`;
    culprit = "CPU ist der Flaschenhals";
    recommendation = getCPURecommendation(c.score, g.score);
  } else if (diff <= -0.6) {
    type = "GPU Bottleneck (GPU limitiert)";
    explanation = `Deine CPU (${c.name}) ist deutlich stärker als deine GPU (${g.name}). Die GPU kann die mögliche Leistung der CPU nicht ausnutzen. Besonders bei 1440p, 4K und hohen Grafiksettings fällt das stark auf.`;
    culprit = "GPU ist der Flaschenhals";
    recommendation = getGPURecommendation(g.score, c.score);
  } else {
    type = "Balanced System";
    explanation = `Deine CPU (${c.name}) und GPU (${g.name}) sind gut aufeinander abgestimmt. Kleinere Unterschiede sind normal und hängen stark von Spiel, Auflösung und Settings ab.`;
    culprit = "Kein deutlicher Flaschenhals";
    recommendation = "Dein System ist gut balanciert. Für maximale Leistung kannst du beide Komponenten gleichzeitig upgraden.";
  }

  let strength = Math.min(100, Math.round((absDiff / 3.5) * 100));
  if (absDiff < 0.6) strength = Math.min(strength, 14);

  let b1080, b1440, b4k;
  if (diff >= 0.6) {
    b1080 = Math.min(100, Math.round(strength * 1.25));
    b1440 = Math.min(100, Math.round(strength));
    b4k = Math.min(100, Math.round(strength * 0.7));
  } else if (diff <= -0.6) {
    b1080 = Math.min(100, Math.round(strength * 0.75));
    b1440 = Math.min(100, Math.round(strength));
    b4k = Math.min(100, Math.round(strength * 1.2));
  } else {
    b1080 = Math.min(100, Math.round(strength * 1.1));
    b1440 = Math.min(100, Math.round(strength));
    b4k = Math.min(100, Math.round(strength * 0.9));
  }

  let avg = (gpuScore + cpuScore) / 2;
  let perf =
    avg < 6.2 ? { t30: 40, t60: 10, t120: 0 } :
    avg < 7.5 ? { t30: 75, t60: 40, t120: 10 } :
    avg < 8.8 ? { t30: 95, t60: 75, t120: 30 } :
    { t30: 100, t60: 95, t120: 80 };

  let psu = recommendPSU(g.tdp, c.tdp);

  out.innerHTML = `
<div class="card">
  <h2>${type}</h2>
  <p class="small">${g.name} + ${c.name}</p>
  <p>Stärke: <b>${strength}%</b></p>
  <p><strong>Flaschenhals:</strong> ${culprit}</p>
  <p><strong>Erklärung:</strong> ${explanation}</p>
  <p><strong>Empfehlung:</strong> ${recommendation}</p>
  <p>${psu}</p>
  <canvas id="bottleneckChart"></canvas>
  <h3>Spielbarkeit</h3>
  <p>≥30 FPS: <b>${perf.t30}%</b></p>
  <p>≥60 FPS: <b>${perf.t60}%</b></p>
  <p>≥120 FPS: <b>${perf.t120}%</b></p>
</div>`;

  new Chart(document.getElementById("bottleneckChart"), {
    type: "bar",
    data: {
      labels: ["1080p", "1440p", "4K", "30 FPS", "60 FPS", "120 FPS"],
      datasets: [{
        label: "Performance",
        data: [b1080, b1440, b4k, perf.t30, perf.t60, perf.t120],
        backgroundColor: [
          getColor(100 - b1080),
          getColor(100 - b1440),
          getColor(100 - b4k),
          "#00ffd5",
          "#4aa3ff",
          "#ff4d4d"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

function getCPURecommendation(cpuScore, gpuScore) {
  const targetScore = Math.max(cpuScore + 0.4, gpuScore - 0.3);
  const recommendations = [];
  
  // AMD CPUs
  const amdUpgrade = amdCPUs.filter(c => c.score >= targetScore && c.score > cpuScore)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  
  if (amdUpgrade.length > 0) {
    recommendations.push(`AMD: ${amdUpgrade.map(c => c.name).join(', ')}`);
  }
  
  // Intel CPUs
  const intelUpgrade = intelCPUs.filter(c => c.score >= targetScore && c.score > cpuScore)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  
  if (intelUpgrade.length > 0) {
    recommendations.push(`Intel: ${intelUpgrade.map(c => c.name).join(', ')}`);
  }
  
  if (recommendations.length === 0) {
    return "Deine CPU ist bereits sehr gut. Für maximale Leistung kannst du eine CPU mit mehr Kernen oder höherem Takt in Betracht ziehen.";
  }
  
  return `Upgrade auf eine stärkere CPU empfohlen: ${recommendations.join(' | ')}`;
}

function getGPURecommendation(gpuScore, cpuScore) {
  const targetScore = Math.max(gpuScore + 0.4, cpuScore - 0.3);
  const recommendations = [];
  
  // AMD GPUs
  const amdUpgrade = amdGPUs.filter(g => g.score >= targetScore && g.score > gpuScore)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  
  if (amdUpgrade.length > 0) {
    recommendations.push(`AMD: ${amdUpgrade.map(g => g.name).join(', ')}`);
  }
  
  // NVIDIA GPUs
  const nvidiaUpgrade = nvidiaGPUs.filter(g => g.score >= targetScore && g.score > gpuScore)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  
  if (nvidiaUpgrade.length > 0) {
    recommendations.push(`NVIDIA: ${nvidiaUpgrade.map(g => g.name).join(', ')}`);
  }
  
  if (recommendations.length === 0) {
    return "Deine GPU ist bereits sehr gut. Für maximale Leistung kannst du eine GPU mit mehr VRAM oder höherem Takt in Betracht ziehen.";
  }
  
  return `Upgrade auf eine stärkere GPU empfohlen: ${recommendations.join(' | ')}`;
}

document.addEventListener("DOMContentLoaded", initBottleneckPage);
