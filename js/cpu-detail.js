// CPU Detail Modal Functionality

// Estimate release year based on CPU name
function estimateCPUReleaseYear(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD Ryzen 9000
  if (name.includes('ryzen 9 99')) return '2024 (August)';
  if (name.includes('ryzen 7 97') || name.includes('ryzen 7 98')) return '2024 (August)';
  if (name.includes('ryzen 5 96')) return '2024 (August)';
  
  // AMD Ryzen 7000
  if (name.includes('ryzen 9 7950x3d')) return '2023 (Januar)';
  if (name.includes('ryzen 9 7950x')) return '2022 (September)';
  if (name.includes('ryzen 9 79')) return '2022-2023';
  if (name.includes('ryzen 7 7800x3d')) return '2023 (Januar)';
  if (name.includes('ryzen 7 77') || name.includes('ryzen 7 76')) return '2022 (September)';
  if (name.includes('ryzen 5 7600x')) return '2022 (September)';
  if (name.includes('ryzen 5 75') || name.includes('ryzen 5 74')) return '2023 (Januar)';
  if (name.includes('ryzen 5 73')) return '2022-2023';
  
  // AMD Ryzen 5000
  if (name.includes('ryzen 9 5950x3d')) return '2022 (April)';
  if (name.includes('ryzen 9 5950x')) return '2020 (November)';
  if (name.includes('ryzen 9 59')) return '2020-2022';
  if (name.includes('ryzen 7 5800x3d')) return '2022 (April)';
  if (name.includes('ryzen 7 5800x')) return '2020 (November)';
  if (name.includes('ryzen 7 57') || name.includes('ryzen 7 58')) return '2020-2022';
  if (name.includes('ryzen 5 5600x3d')) return '2022 (April)';
  if (name.includes('ryzen 5 5600x')) return '2020 (November)';
  if (name.includes('ryzen 5 55') || name.includes('ryzen 5 56')) return '2020-2022';
  if (name.includes('ryzen 5 54') || name.includes('ryzen 5 53')) return '2020-2022';
  
  // Intel Core 15th Gen
  if (name.includes('i9-15900') || name.includes('i7-15700') || name.includes('i5-15600')) return '2024 (Q4)';
  
  // Intel Core 14th Gen
  if (name.includes('i9-14900')) return '2023 (Oktober)';
  if (name.includes('i7-14700')) return '2023 (Oktober)';
  if (name.includes('i5-14600')) return '2023 (Oktober)';
  if (name.includes('i5-14500')) return '2023-2024';
  
  // Intel Core 13th Gen
  if (name.includes('i9-13900')) return '2022 (Oktober)';
  if (name.includes('i7-13700')) return '2022 (Oktober)';
  if (name.includes('i5-13600')) return '2022 (Oktober)';
  if (name.includes('i5-13500')) return '2023 (Januar)';
  
  // Intel Core 12th Gen
  if (name.includes('i9-12900')) return '2021 (November)';
  if (name.includes('i7-12700')) return '2021 (November)';
  if (name.includes('i5-12600')) return '2021 (November)';
  if (name.includes('i5-12500')) return '2022 (Januar)';
  
  // Intel Core 11th Gen
  if (name.includes('i9-11900')) return '2021 (März)';
  if (name.includes('i7-11700')) return '2021 (März)';
  if (name.includes('i5-11600')) return '2021 (März)';
  if (name.includes('i5-11500')) return '2021 (Q2)';
  
  // Intel Core 10th Gen
  if (name.includes('i9-10900')) return '2020 (Mai)';
  if (name.includes('i7-10700')) return '2020 (Mai)';
  if (name.includes('i5-10600')) return '2020 (April)';
  if (name.includes('i5-10500')) return '2020 (Q2)';
  
  return 'Unbekannt';
}

// Get CPU architecture
function getCPUArchitecture(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD
  if (name.includes('ryzen 9 99') || name.includes('ryzen 7 97') || name.includes('ryzen 7 98') || name.includes('ryzen 5 96')) return 'Zen 5';
  if (name.includes('ryzen 9 79') || name.includes('ryzen 7 77') || name.includes('ryzen 7 76') || name.includes('ryzen 5 75') || name.includes('ryzen 5 74')) return 'Zen 4';
  if (name.includes('ryzen 5 73')) return 'Zen 4';
  if (name.includes('ryzen 9 59') || name.includes('ryzen 7 57') || name.includes('ryzen 7 58') || name.includes('ryzen 5 55') || name.includes('ryzen 5 56')) return 'Zen 3';
  if (name.includes('ryzen 5 54') || name.includes('ryzen 5 53')) return 'Zen 3';
  
  // Intel
  if (name.includes('i9-14900') || name.includes('i7-14700') || name.includes('i5-14600') || name.includes('i5-14500')) return 'Raptor Lake Refresh';
  if (name.includes('i9-13900') || name.includes('i7-13700') || name.includes('i5-13600') || name.includes('i5-13500')) return 'Raptor Lake';
  if (name.includes('i9-12900') || name.includes('i7-12700') || name.includes('i5-12600') || name.includes('i5-12500')) return 'Alder Lake';
  if (name.includes('i9-11900') || name.includes('i7-11700') || name.includes('i5-11600') || name.includes('i5-11500')) return 'Rocket Lake';
  if (name.includes('i9-10900') || name.includes('i7-10700') || name.includes('i5-10600') || name.includes('i5-10500')) return 'Comet Lake';
  
  return 'Unbekannt';
}

// Get CPU socket
function getCPUSocket(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD
  if (name.includes('ryzen 9 99') || name.includes('ryzen 7 97') || name.includes('ryzen 7 98') || name.includes('ryzen 5 96')) return 'AM5';
  if (name.includes('ryzen 9 79') || name.includes('ryzen 7 77') || name.includes('ryzen 7 76') || name.includes('ryzen 5 75') || name.includes('ryzen 5 74') || name.includes('ryzen 5 73')) return 'AM5';
  if (name.includes('ryzen 9 59') || name.includes('ryzen 7 57') || name.includes('ryzen 7 58') || name.includes('ryzen 5 55') || name.includes('ryzen 5 56') || name.includes('ryzen 5 54') || name.includes('ryzen 5 53')) return 'AM4';
  
  // Intel
  if (name.includes('i9-14900') || name.includes('i7-14700') || name.includes('i5-14600') || name.includes('i5-14500')) return 'LGA 1700';
  if (name.includes('i9-13900') || name.includes('i7-13700') || name.includes('i5-13600') || name.includes('i5-13500')) return 'LGA 1700';
  if (name.includes('i9-12900') || name.includes('i7-12700') || name.includes('i5-12600') || name.includes('i5-12500')) return 'LGA 1700';
  if (name.includes('i9-11900') || name.includes('i7-11700') || name.includes('i5-11600') || name.includes('i5-11500')) return 'LGA 1200';
  if (name.includes('i9-10900') || name.includes('i7-10700') || name.includes('i5-10600') || name.includes('i5-10500')) return 'LGA 1200';
  
  return 'Unbekannt';
}

// Get CPU clock speed (base/boost in MHz)
function getCPUClockSpeed(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD Ryzen 9000
  if (name.includes('ryzen 9 9950x')) return '4.3-5.7 GHz';
  if (name.includes('ryzen 9 9900x')) return '4.4-5.6 GHz';
  if (name.includes('ryzen 7 9700x')) return '3.8-5.5 GHz';
  if (name.includes('ryzen 7 9600x')) return '3.9-5.4 GHz';
  if (name.includes('ryzen 5 9600x')) return '3.9-5.4 GHz';
  
  // AMD Ryzen 7000
  if (name.includes('ryzen 9 7950x3d')) return '4.2-5.7 GHz';
  if (name.includes('ryzen 9 7950x')) return '4.5-5.7 GHz';
  if (name.includes('ryzen 9 7900x3d')) return '4.4-5.6 GHz';
  if (name.includes('ryzen 9 7900x')) return '4.7-5.4 GHz';
  if (name.includes('ryzen 7 7800x3d')) return '4.2-5.0 GHz';
  if (name.includes('ryzen 7 7800x')) return '4.5-5.4 GHz';
  if (name.includes('ryzen 7 7700x')) return '4.5-5.4 GHz';
  if (name.includes('ryzen 5 7600x')) return '3.8-5.1 GHz';
  if (name.includes('ryzen 5 7600')) return '3.8-5.1 GHz';
  if (name.includes('ryzen 5 7500f')) return '3.7-5.0 GHz';
  
  // AMD Ryzen 5000
  if (name.includes('ryzen 9 5950x3d')) return '3.5-4.7 GHz';
  if (name.includes('ryzen 9 5950x')) return '3.4-4.9 GHz';
  if (name.includes('ryzen 9 5900x')) return '3.7-4.8 GHz';
  if (name.includes('ryzen 7 5800x3d')) return '3.4-4.5 GHz';
  if (name.includes('ryzen 7 5800x')) return '3.8-4.7 GHz';
  if (name.includes('ryzen 7 5700x')) return '3.4-4.6 GHz';
  if (name.includes('ryzen 5 5600x')) return '3.5-4.6 GHz';
  if (name.includes('ryzen 5 5500')) return '3.6-4.2 GHz';
  if (name.includes('ryzen 5 5400')) return '2.7-4.4 GHz';
  
  // Intel 14th Gen
  if (name.includes('i9-14900k')) return '3.2-6.0 GHz';
  if (name.includes('i9-14900kf')) return '3.2-6.0 GHz';
  if (name.includes('i7-14700k')) return '3.4-5.6 GHz';
  if (name.includes('i7-14700kf')) return '3.4-5.6 GHz';
  if (name.includes('i5-14600k')) return '3.5-5.3 GHz';
  if (name.includes('i5-14600kf')) return '3.5-5.3 GHz';
  if (name.includes('i5-14500')) return '2.6-5.0 GHz';
  
  // Intel 13th Gen
  if (name.includes('i9-13900k')) return '3.0-5.8 GHz';
  if (name.includes('i9-13900kf')) return '3.0-5.8 GHz';
  if (name.includes('i7-13700k')) return '3.4-5.4 GHz';
  if (name.includes('i7-13700kf')) return '3.4-5.4 GHz';
  if (name.includes('i5-13600k')) return '3.5-5.1 GHz';
  if (name.includes('i5-13600kf')) return '3.5-5.1 GHz';
  if (name.includes('i5-13500')) return '2.5-4.8 GHz';
  
  // Intel 12th Gen
  if (name.includes('i9-12900k')) return '3.2-5.2 GHz';
  if (name.includes('i9-12900kf')) return '3.2-5.2 GHz';
  if (name.includes('i7-12700k')) return '3.6-5.0 GHz';
  if (name.includes('i7-12700kf')) return '3.6-5.0 GHz';
  if (name.includes('i5-12600k')) return '3.7-4.9 GHz';
  if (name.includes('i5-12600kf')) return '3.7-4.9 GHz';
  if (name.includes('i5-12500')) return '2.0-4.6 GHz';
  
  return '3.0-5.0 GHz';
}

// Get CPU cache
function getCPUCache(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD Ryzen 9000
  if (name.includes('ryzen 9 99')) return '64MB L3 + 16MB L2';
  if (name.includes('ryzen 7 97') || name.includes('ryzen 7 98')) return '32MB L3 + 16MB L2';
  if (name.includes('ryzen 5 96')) return '32MB L3 + 16MB L2';
  
  // AMD Ryzen 7000
  if (name.includes('ryzen 9 79')) return '64MB L3 + 16MB L2';
  if (name.includes('ryzen 7 77') || name.includes('ryzen 7 76')) return '32MB L3 + 16MB L2';
  if (name.includes('ryzen 5 75') || name.includes('ryzen 5 74') || name.includes('ryzen 5 73')) return '32MB L3 + 16MB L2';
  if (name.includes('ryzen 5 7600')) return '32MB L3 + 16MB L2';
  if (name.includes('ryzen 5 7500')) return '16MB L3 + 16MB L2';
  
  // AMD Ryzen 5000
  if (name.includes('ryzen 9 59')) return '64MB L3 + 16MB L2';
  if (name.includes('ryzen 7 57') || name.includes('ryzen 7 58')) return '32MB L3 + 16MB L2';
  if (name.includes('ryzen 5 55') || name.includes('ryzen 5 56')) return '32MB L3 + 16MB L2';
  if (name.includes('ryzen 5 54') || name.includes('ryzen 5 53')) return '16MB L3 + 16MB L2';
  
  // Intel 14th/13th Gen
  if (name.includes('i9-14900') || name.includes('i9-13900')) return '36MB L3 + 32MB L2';
  if (name.includes('i7-14700') || name.includes('i7-13700')) return '28MB L3 + 24MB L2';
  if (name.includes('i5-14600') || name.includes('i5-13600')) return '24MB L3 + 20MB L2';
  if (name.includes('i5-14500') || name.includes('i5-13500')) return '24MB L3 + 20MB L2';
  
  // Intel 12th Gen
  if (name.includes('i9-12900')) return '30MB L3 + 32MB L2';
  if (name.includes('i7-12700')) return '25MB L3 + 24MB L2';
  if (name.includes('i5-12600')) return '20MB L3 + 20MB L2';
  if (name.includes('i5-12500')) return '18MB L3 + 20MB L2';
  
  return 'Unbekannt';
}

// Get CPU lithography (nm)
function getCPULithography(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD
  if (name.includes('ryzen 9 99') || name.includes('ryzen 7 97') || name.includes('ryzen 7 98') || name.includes('ryzen 5 96')) return '4nm (TSMC N4)';
  if (name.includes('ryzen 9 79') || name.includes('ryzen 7 77') || name.includes('ryzen 7 76') || name.includes('ryzen 5 75') || name.includes('ryzen 5 74') || name.includes('ryzen 5 73')) return '5nm (TSMC N5)';
  if (name.includes('ryzen 9 59') || name.includes('ryzen 7 57') || name.includes('ryzen 7 58') || name.includes('ryzen 5 55') || name.includes('ryzen 5 56') || name.includes('ryzen 5 54') || name.includes('ryzen 5 53')) return '7nm (TSMC N7)';
  
  // Intel
  if (name.includes('i9-14900') || name.includes('i7-14700') || name.includes('i5-14600') || name.includes('i5-14500')) return 'Intel 7 (10nm ESF)';
  if (name.includes('i9-13900') || name.includes('i7-13700') || name.includes('i5-13600') || name.includes('i5-13500')) return 'Intel 7 (10nm ESF)';
  if (name.includes('i9-12900') || name.includes('i7-12700') || name.includes('i5-12600') || name.includes('i5-12500')) return 'Intel 7 (10nm ESF)';
  if (name.includes('i9-11900') || name.includes('i7-11700') || name.includes('i5-11600') || name.includes('i5-11500')) return '14nm';
  if (name.includes('i9-10900') || name.includes('i7-10700') || name.includes('i5-10600') || name.includes('i5-10500')) return '14nm';
  
  return 'Unbekannt';
}

// Show CPU detail modal
function showCPUDetail(cpu) {
  const modal = document.getElementById('cpu-modal');
  const modalBody = document.getElementById('cpu-modal-body');
  const releaseYear = estimateCPUReleaseYear(cpu.name);
  const architecture = getCPUArchitecture(cpu.name);
  const socket = getCPUSocket(cpu.name);
  const clockSpeed = getCPUClockSpeed(cpu.name);
  const cache = getCPUCache(cpu.name);
  const lithography = getCPULithography(cpu.name);
  
  modalBody.innerHTML = `
    <div class="gpu-detail-header">
      <h2 class="gpu-detail-title">${cpu.name}</h2>
      <span class="gpu-detail-score">Score: ${cpu.score}</span>
    </div>
    
    <div class="gpu-detail-grid">
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Release</div>
        <div class="gpu-detail-value">${releaseYear}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Architektur</div>
        <div class="gpu-detail-value">${architecture}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Socket</div>
        <div class="gpu-detail-value">${socket}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Kerne/Threads</div>
        <div class="gpu-detail-value">${cpu.cores}C / ${cpu.threads}T</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">TDP</div>
        <div class="gpu-detail-value">${cpu.tdp}W</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Preis</div>
        <div class="gpu-detail-value">${cpu.price}€</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Takt</div>
        <div class="gpu-detail-value">${clockSpeed}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Cache</div>
        <div class="gpu-detail-value">${cache}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Fertigung</div>
        <div class="gpu-detail-value">${lithography}</div>
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cpu-modal');
  const closeBtn = document.querySelector('#cpu-modal .modal-close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
