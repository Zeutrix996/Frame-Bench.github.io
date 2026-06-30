// PC Build Recommendations

// Component database for builds
const components = {
  motherboards: {
    am4: [
      { name: "MSI B450M PRO-VDH", price: "60-80", socket: "AM4" },
      { name: "ASUS B550M-A", price: "80-110", socket: "AM4" },
      { name: "ASUS B550-F Gaming", price: "130-170", socket: "AM4" },
      { name: "MSI X570-A PRO", price: "150-200", socket: "AM4" }
    ],
    am5: [
      { name: "ASUS A620M-K", price: "100-130", socket: "AM5" },
      { name: "MSI B650M-A", price: "130-160", socket: "AM5" },
      { name: "ASUS B650-F Gaming", price: "180-230", socket: "AM5" },
      { name: "MSI X670E-A", price: "250-320", socket: "AM5" }
    ],
    lga1700: [
      { name: "ASUS B660M-K", price: "90-120", socket: "LGA 1700" },
      { name: "MSI B660M-A", price: "110-140", socket: "LGA 1700" },
      { name: "ASUS Z790-P", price: "180-230", socket: "LGA 1700" },
      { name: "MSI Z790-A", price: "220-280", socket: "LGA 1700" }
    ]
  },
  ram: [
    { name: "8GB DDR4-3200", price: "25-35", type: "DDR4" },
    { name: "16GB DDR4-3200", price: "40-55", type: "DDR4" },
    { name: "16GB DDR4-3600", price: "50-65", type: "DDR4" },
    { name: "32GB DDR4-3600", price: "80-110", type: "DDR4" },
    { name: "16GB DDR5-5200", price: "60-80", type: "DDR5" },
    { name: "32GB DDR5-6000", price: "100-130", type: "DDR5" },
    { name: "32GB DDR5-6400", price: "120-160", type: "DDR5" }
  ],
  storage: [
    { name: "500GB NVMe SSD", price: "40-55", capacity: "500GB" },
    { name: "1TB NVMe SSD", price: "70-95", capacity: "1TB" },
    { name: "2TB NVMe SSD", price: "130-170", capacity: "2TB" },
    { name: "1TB SATA SSD", price: "60-80", capacity: "1TB" }
  ],
  psu: [
    { name: "450W 80+ Bronze", price: "35-50", wattage: 450 },
    { name: "550W 80+ Bronze", price: "45-65", wattage: 550 },
    { name: "650W 80+ Gold", price: "70-95", wattage: 650 },
    { name: "750W 80+ Gold", price: "90-120", wattage: 750 },
    { name: "850W 80+ Gold", price: "110-150", wattage: 850 },
    { name: "1000W 80+ Gold", price: "140-180", wattage: 1000 }
  ],
  cases: [
    { name: "Micro-ATX Case", price: "40-60", size: "mATX" },
    { name: "Mid-Tower ATX", price: "60-90", size: "ATX" },
    { name: "Mid-Tower RGB", price: "80-120", size: "ATX" },
    { name: "Full-Tower Premium", price: "120-180", size: "ATX" }
  ]
};

// Build configurations by budget
const buildConfigs = {
  500: [
    {
      name: "Budget Gaming Build",
      type: "gaming",
      cpu: "AMD Ryzen 5 5600",
      gpu: "NVIDIA GeForce GTX 1660 Super",
      motherboard: "MSI B450M PRO-VDH",
      ram: "16GB DDR4-3200",
      storage: "500GB NVMe SSD",
      psu: "550W 80+ Bronze",
      case: "Micro-ATX Case",
      totalPrice: "480-520",
      performance: "1080p Gaming",
      description: "Solider Einstiegs-Gaming-PC für 1080p"
    },
    {
      name: "Office Build",
      type: "office",
      cpu: "Intel Core i3-12100F",
      gpu: "Integrated Graphics",
      motherboard: "ASUS B660M-K",
      ram: "16GB DDR4-3200",
      storage: "500GB NVMe SSD",
      psu: "450W 80+ Bronze",
      case: "Micro-ATX Case",
      totalPrice: "350-420",
      performance: "Office & Multimedia",
      description: "Effizienter Büro-PC für tägliche Aufgaben"
    }
  ],
  1000: [
    {
      name: "Mid-Range Gaming Build",
      type: "gaming",
      cpu: "AMD Ryzen 5 7600",
      gpu: "NVIDIA GeForce RTX 4060",
      motherboard: "ASUS A620M-K",
      ram: "16GB DDR5-5200",
      storage: "1TB NVMe SSD",
      psu: "650W 80+ Gold",
      case: "Mid-Tower ATX",
      totalPrice: "950-1100",
      performance: "1080p High Settings",
      description: "Ausgewogener Gaming-PC für moderne Titel"
    },
    {
      name: "Content Creator Build",
      type: "creator",
      cpu: "Intel Core i5-13600K",
      gpu: "NVIDIA GeForce RTX 3060",
      motherboard: "MSI B660M-A",
      ram: "32GB DDR4-3600",
      storage: "1TB NVMe SSD",
      psu: "750W 80+ Gold",
      case: "Mid-Tower ATX",
      totalPrice: "980-1150",
      performance: "Video Editing & Rendering",
      description: "Leistungsstarker PC für Content Creation"
    }
  ],
  1500: [
    {
      name: "High-End Gaming Build",
      type: "gaming",
      cpu: "AMD Ryzen 7 7700X",
      gpu: "NVIDIA GeForce RTX 4070 Super",
      motherboard: "ASUS B650-F Gaming",
      ram: "32GB DDR5-6000",
      storage: "1TB NVMe SSD",
      psu: "750W 80+ Gold",
      case: "Mid-Tower RGB",
      totalPrice: "1450-1650",
      performance: "1440p High Settings",
      description: "High-End Gaming für 1440p mit hohen Settings"
    },
    {
      name: "Streaming Build",
      type: "streaming",
      cpu: "Intel Core i7-13700K",
      gpu: "NVIDIA GeForce RTX 4060 Ti",
      motherboard: "ASUS Z790-P",
      ram: "32GB DDR5-6000",
      storage: "2TB NVMe SSD",
      psu: "850W 80+ Gold",
      case: "Mid-Tower RGB",
      totalPrice: "1500-1750",
      performance: "Gaming + Streaming",
      description: "Optimiert für Gaming und Streaming"
    }
  ],
  2000: [
    {
      name: "Ultra Gaming Build",
      type: "gaming",
      cpu: "AMD Ryzen 9 7900X",
      gpu: "NVIDIA GeForce RTX 4080 Super",
      motherboard: "MSI X670E-A",
      ram: "32GB DDR5-6400",
      storage: "2TB NVMe SSD",
      psu: "1000W 80+ Gold",
      case: "Full-Tower Premium",
      totalPrice: "2200-2600",
      performance: "4K Gaming",
      description: "Ultimative Gaming-Experience in 4K"
    },
    {
      name: "Professional Creator Build",
      type: "creator",
      cpu: "Intel Core i9-14900K",
      gpu: "NVIDIA GeForce RTX 4090",
      motherboard: "MSI Z790-A",
      ram: "64GB DDR5-6400",
      storage: "2TB NVMe SSD",
      psu: "1000W 80+ Gold",
      case: "Full-Tower Premium",
      totalPrice: "2800-3400",
      performance: "Professional Workstation",
      description: "Workstation-Klasse für professionelle Anwendungen"
    }
  ]
};

// Get CPU socket
function getCPUSocket(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AMD
  if (name.includes('ryzen 9 99') || name.includes('ryzen 7 97') || name.includes('ryzen 5 96')) return 'am5';
  if (name.includes('ryzen 7 77') || name.includes('ryzen 7 76') || name.includes('ryzen 5 75')) return 'am5';
  if (name.includes('ryzen 5 56') || name.includes('ryzen 5 55') || name.includes('ryzen 7 57')) return 'am4';
  if (name.includes('ryzen 5 36') || name.includes('ryzen 7 37')) return 'am4';
  
  // Intel
  if (name.includes('i9-14') || name.includes('i7-14') || name.includes('i5-14')) return 'lga1700';
  if (name.includes('i9-13') || name.includes('i7-13') || name.includes('i5-13')) return 'lga1700';
  if (name.includes('i9-12') || name.includes('i7-12') || name.includes('i5-12')) return 'lga1700';
  
  return 'unknown';
}

// Get RAM type based on CPU
function getRAMType(cpuName) {
  const name = cpuName.toLowerCase();
  
  // AM5 and Intel 12th+ use DDR5
  if (name.includes('ryzen 7 77') || name.includes('ryzen 7 76') || name.includes('ryzen 5 75')) return 'DDR5';
  if (name.includes('ryzen 9 99') || name.includes('ryzen 7 97') || name.includes('ryzen 5 96')) return 'DDR5';
  if (name.includes('i9-14') || name.includes('i7-14') || name.includes('i5-14')) return 'DDR5';
  if (name.includes('i9-13') || name.includes('i7-13') || name.includes('i5-13')) return 'DDR5';
  if (name.includes('i9-12') || name.includes('i7-12') || name.includes('i5-12')) return 'DDR5';
  
  return 'DDR4';
}

// Calculate total power consumption
function calculatePower(build) {
  let total = 0;
  
  // CPU power
  const cpu = cpus.find(c => c.name === build.cpu);
  if (cpu) total += cpu.tdp;
  
  // GPU power
  const gpu = gpus.find(g => g.name === build.gpu);
  if (gpu) total += gpu.tdp;
  
  // Add overhead for other components
  total += 100;
  
  return Math.ceil(total * 1.2); // 20% headroom
}

// Render build card
function renderBuildCard(build) {
  const power = calculatePower(build);
  
  return `
<div class="card build-card">
  <div class="build-header">
    <h3>${build.name}</h3>
    <span class="build-price">${build.totalPrice}€</span>
  </div>
  <p class="build-description">${build.description}</p>
  <div class="build-performance">${build.performance}</div>
  
  <div class="build-components">
    <div class="component-item">
      <span class="component-label">CPU</span>
      <span class="component-value">${build.cpu}</span>
    </div>
    <div class="component-item">
      <span class="component-label">GPU</span>
      <span class="component-value">${build.gpu}</span>
    </div>
    <div class="component-item">
      <span class="component-label">Mainboard</span>
      <span class="component-value">${build.motherboard}</span>
    </div>
    <div class="component-item">
      <span class="component-label">RAM</span>
      <span class="component-value">${build.ram}</span>
    </div>
    <div class="component-item">
      <span class="component-label">Storage</span>
      <span class="component-value">${build.storage}</span>
    </div>
    <div class="component-item">
      <span class="component-label">Netzteil</span>
      <span class="component-value">${build.psu}</span>
    </div>
    <div class="component-item">
      <span class="component-label">Gehäuse</span>
      <span class="component-value">${build.case}</span>
    </div>
  </div>
  
  <div class="build-footer">
    <span class="build-power">Empfohlen: ~${power}W</span>
    <span class="build-type">${build.type}</span>
  </div>
</div>`;
}

// Render builds for selected budget
function renderBuilds(budget) {
  const container = document.getElementById('builds-container');
  const builds = buildConfigs[budget] || [];
  
  if (builds.length === 0) {
    container.innerHTML = `<div class="card"><p>Keine Builds für dieses Budget verfügbar.</p></div>`;
    return;
  }
  
  container.innerHTML = builds.map(build => renderBuildCard(build)).join('');
}

// Tab switching
function switchBudgetTab(budget) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.budget === budget) {
      btn.classList.add('active');
    }
  });
  
  renderBuilds(budget);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchBudgetTab(btn.dataset.budget);
    });
  });
  
  renderBuilds('500');
});
