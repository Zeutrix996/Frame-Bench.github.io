// GPU Detail Modal Functionality (ohne Bewertung)

// Estimate release year based on GPU name
function estimateReleaseYear(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD GPUs
  if (name.includes('rx 90')) return '2025 (Q1)';
  if (name.includes('rx 79')) return '2022 (Dezember)';
  if (name.includes('rx 78') || name.includes('rx 77') || name.includes('rx 76')) return '2023 (Juni)';
  if (name.includes('rx 69')) return '2020 (Oktober)';
  if (name.includes('rx 68') || name.includes('rx 67') || name.includes('rx 66')) return '2021 (März)';
  if (name.includes('rx 57') || name.includes('rx 56') || name.includes('rx 55')) return '2019 (Juli)';
  if (name.includes('rx 5') && !name.includes('rx 50')) return '2017-2019';
  if (name.includes('rx 4')) return '2016-2017';
  if (name.includes('vega')) return '2017 (August)';
  
  // NVIDIA GPUs
  if (name.includes('rtx 50')) return '2025 (Q1)';
  if (name.includes('rtx 4090')) return '2022 (Oktober)';
  if (name.includes('rtx 4080')) return '2022 (November)';
  if (name.includes('rtx 4070')) return '2023 (Januar)';
  if (name.includes('rtx 4060')) return '2023 (Juni)';
  if (name.includes('rtx 40')) return '2022-2024';
  if (name.includes('rtx 3090')) return '2020 (September)';
  if (name.includes('rtx 3080')) return '2020 (September)';
  if (name.includes('rtx 3070')) return '2020 (Oktober)';
  if (name.includes('rtx 3060')) return '2021 (Januar)';
  if (name.includes('rtx 3050')) return '2022 (Januar)';
  if (name.includes('rtx 30')) return '2020-2022';
  if (name.includes('rtx 2080')) return '2018 (September)';
  if (name.includes('rtx 2070')) return '2018 (Oktober)';
  if (name.includes('rtx 2060')) return '2019 (Januar)';
  if (name.includes('rtx 20')) return '2018-2020';
  if (name.includes('gtx 16')) return '2019 (April)';
  if (name.includes('gtx 1080')) return '2017 (März)';
  if (name.includes('gtx 1070')) return '2016 (Oktober)';
  if (name.includes('gtx 1060')) return '2016 (Juli)';
  if (name.includes('gtx 10')) return '2016-2018';
  if (name.includes('titan')) return '2017-2018';
  if (name.includes('rtx a') || name.includes('quadro')) return '2021-2023';
  
  return 'Unbekannt';
}

// Get GPU architecture
function getArchitecture(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD
  if (name.includes('rx 90')) return 'RDNA 4';
  if (name.includes('rx 79') || name.includes('rx 78') || name.includes('rx 77') || name.includes('rx 76')) return 'RDNA 3';
  if (name.includes('rx 69') || name.includes('rx 68') || name.includes('rx 67') || name.includes('rx 66')) return 'RDNA 2';
  if (name.includes('rx 57') || name.includes('rx 56') || name.includes('rx 55')) return 'RDNA 1';
  if (name.includes('rx 5') || name.includes('rx 4')) return 'GCN / Polaris';
  if (name.includes('vega')) return 'GCN / Vega';
  if (name.includes('radeon pro')) return 'RDNA / CDNA';
  
  // NVIDIA
  if (name.includes('rtx 50')) return 'Blackwell';
  if (name.includes('rtx 40')) return 'Ada Lovelace';
  if (name.includes('rtx 30')) return 'Ampere';
  if (name.includes('rtx 20')) return 'Turing';
  if (name.includes('gtx 16')) return 'Turing';
  if (name.includes('gtx 10')) return 'Pascal';
  if (name.includes('titan')) return 'Pascal / Volta';
  if (name.includes('rtx a') || name.includes('quadro')) return 'Ampere / Ada';
  
  return 'Unbekannt';
}

// Get VRAM type based on GPU
function getVRAMType(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD
  if (name.includes('rx 90') || name.includes('rx 79')) return 'GDDR6';
  if (name.includes('rx 78') || name.includes('rx 77') || name.includes('rx 76')) return 'GDDR6';
  if (name.includes('rx 69') || name.includes('rx 68') || name.includes('rx 67') || name.includes('rx 66')) return 'GDDR6';
  if (name.includes('rx 57') || name.includes('rx 56') || name.includes('rx 55')) return 'GDDR6';
  if (name.includes('rx 5') || name.includes('rx 4')) return 'GDDR5 / GDDR5X';
  if (name.includes('vega')) return 'HBM2';
  if (name.includes('radeon pro w7900')) return 'GDDR6';
  if (name.includes('radeon pro w6800')) return 'GDDR6';
  if (name.includes('radeon pro w6600')) return 'GDDR6';
  
  // NVIDIA
  if (name.includes('rtx 50')) return 'GDDR7';
  if (name.includes('rtx 40')) return 'GDDR6X';
  if (name.includes('rtx 30')) return 'GDDR6X / GDDR6';
  if (name.includes('rtx 20')) return 'GDDR6';
  if (name.includes('gtx 16')) return 'GDDR5 / GDDR6';
  if (name.includes('gtx 10')) return 'GDDR5 / GDDR5X';
  if (name.includes('titan')) return 'GDDR5X / HBM2';
  if (name.includes('rtx a6000') || name.includes('rtx 6000 ada')) return 'GDDR6';
  if (name.includes('rtx a5000')) return 'GDDR6';
  if (name.includes('rtx a4000')) return 'GDDR6';
  if (name.includes('rtx a2000')) return 'GDDR6';
  
  return 'GDDR6';
}

// Get GPU clock speed (base/boost in MHz)
function getClockSpeed(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD RX 9000
  if (name.includes('rx 9070 xt')) return '2500-3000 MHz';
  if (name.includes('rx 9070')) return '2300-2800 MHz';
  if (name.includes('rx 9060 xt')) return '2200-2700 MHz';
  if (name.includes('rx 9060')) return '2000-2500 MHz';
  
  // AMD RX 7000
  if (name.includes('rx 7900 xtx')) return '1900-2500 MHz';
  if (name.includes('rx 7900 xt')) return '1800-2400 MHz';
  if (name.includes('rx 7800 xt')) return '1800-2430 MHz';
  if (name.includes('rx 7700 xt')) return '1700-2544 MHz';
  if (name.includes('rx 7600')) return '1650-2655 MHz';
  
  // AMD RX 6000
  if (name.includes('rx 6950 xt')) return '1925-2310 MHz';
  if (name.includes('rx 6900 xt')) return '1825-2250 MHz';
  if (name.includes('rx 6800 xt')) return '1825-2250 MHz';
  if (name.includes('rx 6800')) return '1700-2105 MHz';
  if (name.includes('rx 6750 xt')) return '1700-2600 MHz';
  if (name.includes('rx 6700 xt')) return '1600-2581 MHz';
  if (name.includes('rx 6650 xt')) return '1700-2635 MHz';
  if (name.includes('rx 6600')) return '1600-2491 MHz';
  
  // NVIDIA RTX 50
  if (name.includes('rtx 5090')) return '2000-2800 MHz';
  if (name.includes('rtx 5080')) return '1900-2700 MHz';
  if (name.includes('rtx 5070 ti')) return '1800-2600 MHz';
  if (name.includes('rtx 5070')) return '1700-2500 MHz';
  if (name.includes('rtx 5060 ti')) return '1600-2400 MHz';
  if (name.includes('rtx 5060')) return '1500-2300 MHz';
  if (name.includes('rtx 5050')) return '1400-2200 MHz';
  
  // NVIDIA RTX 40
  if (name.includes('rtx 4090')) return '2235-2520 MHz';
  if (name.includes('rtx 4080 super')) return '2290-2550 MHz';
  if (name.includes('rtx 4080')) return '2205-2505 MHz';
  if (name.includes('rtx 4070 ti super')) return '2340-2610 MHz';
  if (name.includes('rtx 4070 ti')) return '2310-2610 MHz';
  if (name.includes('rtx 4070 super')) return '1980-2475 MHz';
  if (name.includes('rtx 4070')) return '1920-2475 MHz';
  if (name.includes('rtx 4060 ti 16gb')) return '2310-2535 MHz';
  if (name.includes('rtx 4060 ti')) return '2310-2535 MHz';
  if (name.includes('rtx 4060')) return '1830-2460 MHz';
  if (name.includes('rtx 4050')) return '1700-2400 MHz';
  
  // NVIDIA RTX 30
  if (name.includes('rtx 3090 ti')) return '1560-1860 MHz';
  if (name.includes('rtx 3090')) return '1400-1695 MHz';
  if (name.includes('rtx 3080 ti')) return '1370-1665 MHz';
  if (name.includes('rtx 3080 12gb')) return '1440-1710 MHz';
  if (name.includes('rtx 3080 10gb')) return '1440-1710 MHz';
  if (name.includes('rtx 3080')) return '1440-1710 MHz';
  if (name.includes('rtx 3070 ti')) return '1575-1770 MHz';
  if (name.includes('rtx 3070')) return '1500-1725 MHz';
  if (name.includes('rtx 3060 ti')) return '1410-1670 MHz';
  if (name.includes('rtx 3060 12gb')) return '1320-1777 MHz';
  if (name.includes('rtx 3060 8gb')) return '1320-1777 MHz';
  if (name.includes('rtx 3060')) return '1320-1777 MHz';
  if (name.includes('rtx 3050 6gb')) return '1470-1807 MHz';
  if (name.includes('rtx 3050')) return '1557-1777 MHz';
  
  // NVIDIA RTX 20
  if (name.includes('rtx 2080 ti')) return '1350-1545 MHz';
  if (name.includes('rtx 2080 super')) return '1650-1815 MHz';
  if (name.includes('rtx 2080')) return '1515-1710 MHz';
  if (name.includes('rtx 2070 super')) return '1605-1770 MHz';
  if (name.includes('rtx 2070')) return '1410-1620 MHz';
  if (name.includes('rtx 2060 super')) return '1470-1650 MHz';
  if (name.includes('rtx 2060')) return '1365-1680 MHz';
  if (name.includes('rtx 2050')) return '1155-1477 MHz';
  
  // NVIDIA GTX 16
  if (name.includes('gtx 1660 ti')) return '1500-1770 MHz';
  if (name.includes('gtx 1660 super')) return '1530-1785 MHz';
  if (name.includes('gtx 1660')) return '1530-1785 MHz';
  if (name.includes('gtx 1650 super')) return '1530-1725 MHz';
  if (name.includes('gtx 1650')) return '1485-1665 MHz';
  
  // NVIDIA GTX 10
  if (name.includes('gtx 1080 ti')) return '1480-1582 MHz';
  if (name.includes('gtx 1080')) return '1607-1733 MHz';
  if (name.includes('gtx 1070 ti')) return '1607-1683 MHz';
  if (name.includes('gtx 1070')) return '1506-1683 MHz';
  if (name.includes('gtx 1060')) return '1506-1708 MHz';
  
  // NVIDIA Titan
  if (name.includes('titan rtx')) return '1350-1770 MHz';
  if (name.includes('titan v')) return '1200-1455 MHz';
  
  // NVIDIA Workstation
  if (name.includes('rtx 6000 ada')) return '2325-2505 MHz';
  if (name.includes('rtx a6000')) return '1410-1860 MHz';
  if (name.includes('rtx a5000')) return '1170-1695 MHz';
  if (name.includes('rtx a4000')) return '1560-1860 MHz';
  if (name.includes('rtx a2000')) return '562-1620 MHz';
  
  return '1500-2000 MHz';
}

// Get memory clock speed
function getMemoryClock(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD
  if (name.includes('rx 90') || name.includes('rx 79') || name.includes('rx 78')) return '20 Gbps';
  if (name.includes('rx 69') || name.includes('rx 68')) return '16-18 Gbps';
  if (name.includes('rx 67') || name.includes('rx 66')) return '14-17 Gbps';
  if (name.includes('rx 57') || name.includes('rx 56')) return '14 Gbps';
  if (name.includes('rx 5') || name.includes('rx 4')) return '7-8 Gbps';
  if (name.includes('vega')) return '1.89-2.0 Gbps (HBM2)';
  
  // NVIDIA
  if (name.includes('rtx 50')) return '28-32 Gbps';
  if (name.includes('rtx 40')) return '21-23 Gbps';
  if (name.includes('rtx 30')) return '19-21 Gbps';
  if (name.includes('rtx 20')) return '14-16 Gbps';
  if (name.includes('gtx 16')) return '8-12 Gbps';
  if (name.includes('gtx 10')) return '8-10 Gbps';
  if (name.includes('titan')) return '11-14 Gbps';
  if (name.includes('rtx a') || name.includes('quadro')) return '16-20 Gbps';
  
  return '14-16 Gbps';
}

// Get CUDA cores / Stream processors
function getCoreCount(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD
  if (name.includes('rx 9070 xt')) return '6144 Stream Processors';
  if (name.includes('rx 9070')) return '5120 Stream Processors';
  if (name.includes('rx 9060 xt')) return '4096 Stream Processors';
  if (name.includes('rx 9060')) return '3584 Stream Processors';
  if (name.includes('rx 7900 xtx')) return '6144 Stream Processors';
  if (name.includes('rx 7900 xt')) return '5376 Stream Processors';
  if (name.includes('rx 7800 xt')) return '4608 Stream Processors';
  if (name.includes('rx 7700 xt')) return '3456 Stream Processors';
  if (name.includes('rx 7600')) return '2048 Stream Processors';
  if (name.includes('rx 6950 xt')) return '5120 Stream Processors';
  if (name.includes('rx 6900 xt')) return '5120 Stream Processors';
  if (name.includes('rx 6800 xt')) return '4608 Stream Processors';
  if (name.includes('rx 6800')) return '3840 Stream Processors';
  if (name.includes('rx 6700 xt')) return '2560 Stream Processors';
  if (name.includes('rx 6650 xt')) return '2048 Stream Processors';
  if (name.includes('rx 6600')) return '1792 Stream Processors';
  
  // NVIDIA
  if (name.includes('rtx 5090')) return '24576 CUDA Cores';
  if (name.includes('rtx 5080')) return '16384 CUDA Cores';
  if (name.includes('rtx 5070 ti')) return '12800 CUDA Cores';
  if (name.includes('rtx 5070')) return '10240 CUDA Cores';
  if (name.includes('rtx 5060 ti')) return '8960 CUDA Cores';
  if (name.includes('rtx 5060')) return '7680 CUDA Cores';
  if (name.includes('rtx 5050')) return '6144 CUDA Cores';
  if (name.includes('rtx 4090')) return '16384 CUDA Cores';
  if (name.includes('rtx 4080 super')) return '10240 CUDA Cores';
  if (name.includes('rtx 4080')) return '9728 CUDA Cores';
  if (name.includes('rtx 4070 ti super')) return '8448 CUDA Cores';
  if (name.includes('rtx 4070 ti')) return '7680 CUDA Cores';
  if (name.includes('rtx 4070 super')) return '7168 CUDA Cores';
  if (name.includes('rtx 4070')) return '5888 CUDA Cores';
  if (name.includes('rtx 4060 ti')) return '4352 CUDA Cores';
  if (name.includes('rtx 4060')) return '3072 CUDA Cores';
  if (name.includes('rtx 4050')) return '2560 CUDA Cores';
  if (name.includes('rtx 3090 ti')) return '10752 CUDA Cores';
  if (name.includes('rtx 3090')) return '10496 CUDA Cores';
  if (name.includes('rtx 3080 ti')) return '10240 CUDA Cores';
  if (name.includes('rtx 3080')) return '8704 CUDA Cores';
  if (name.includes('rtx 3070 ti')) return '6144 CUDA Cores';
  if (name.includes('rtx 3070')) return '5888 CUDA Cores';
  if (name.includes('rtx 3060 ti')) return '4864 CUDA Cores';
  if (name.includes('rtx 3060')) return '3584 CUDA Cores';
  if (name.includes('rtx 3050')) return '2560 CUDA Cores';
  if (name.includes('rtx 2080 ti')) return '4352 CUDA Cores';
  if (name.includes('rtx 2080')) return '2944 CUDA Cores';
  if (name.includes('rtx 2070')) return '2304 CUDA Cores';
  if (name.includes('rtx 2060')) return '1920 CUDA Cores';
  if (name.includes('gtx 1660 ti')) return '1536 CUDA Cores';
  if (name.includes('gtx 1660')) return '1408 CUDA Cores';
  if (name.includes('gtx 1650')) return '896 CUDA Cores';
  if (name.includes('gtx 1080 ti')) return '3584 CUDA Cores';
  if (name.includes('gtx 1080')) return '2560 CUDA Cores';
  if (name.includes('gtx 1070')) return '1920 CUDA Cores';
  if (name.includes('gtx 1060')) return '1280 CUDA Cores';
  
  return 'Unbekannt';
}

// Get memory bus width
function getMemoryBusWidth(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD
  if (name.includes('rx 9070 xt') || name.includes('rx 9070')) return '384-bit';
  if (name.includes('rx 9060 xt') || name.includes('rx 9060')) return '256-bit';
  if (name.includes('rx 7900 xtx') || name.includes('rx 7900 xt')) return '384-bit';
  if (name.includes('rx 7800 xt')) return '256-bit';
  if (name.includes('rx 7700 xt') || name.includes('rx 7600')) return '128-bit';
  if (name.includes('rx 6950 xt') || name.includes('rx 6900 xt') || name.includes('rx 6800 xt')) return '256-bit';
  if (name.includes('rx 6800')) return '256-bit';
  if (name.includes('rx 6700 xt') || name.includes('rx 6650 xt')) return '192-bit';
  if (name.includes('rx 6600')) return '128-bit';
  
  // NVIDIA
  if (name.includes('rtx 5090')) return '512-bit';
  if (name.includes('rtx 5080') || name.includes('rtx 5070 ti')) return '256-bit';
  if (name.includes('rtx 5070') || name.includes('rtx 5060 ti')) return '192-bit';
  if (name.includes('rtx 5060') || name.includes('rtx 5050')) return '128-bit';
  if (name.includes('rtx 4090')) return '384-bit';
  if (name.includes('rtx 4080 super') || name.includes('rtx 4080')) return '256-bit';
  if (name.includes('rtx 4070 ti super')) return '256-bit';
  if (name.includes('rtx 4070 ti') || name.includes('rtx 4070 super')) return '192-bit';
  if (name.includes('rtx 4070')) return '192-bit';
  if (name.includes('rtx 4060 ti 16gb')) return '128-bit';
  if (name.includes('rtx 4060 ti')) return '128-bit';
  if (name.includes('rtx 4060') || name.includes('rtx 4050')) return '128-bit';
  if (name.includes('rtx 3090 ti') || name.includes('rtx 3090')) return '384-bit';
  if (name.includes('rtx 3080 ti') || name.includes('rtx 3080')) return '320-bit';
  if (name.includes('rtx 3070 ti') || name.includes('rtx 3070')) return '256-bit';
  if (name.includes('rtx 3060 ti')) return '256-bit';
  if (name.includes('rtx 3060 12gb')) return '192-bit';
  if (name.includes('rtx 3060 8gb') || name.includes('rtx 3060')) return '128-bit';
  if (name.includes('rtx 3050')) return '128-bit';
  if (name.includes('rtx 2080 ti')) return '352-bit';
  if (name.includes('rtx 2080 super') || name.includes('rtx 2080')) return '256-bit';
  if (name.includes('rtx 2070 super') || name.includes('rtx 2070')) return '256-bit';
  if (name.includes('rtx 2060 super') || name.includes('rtx 2060')) return '192-bit';
  if (name.includes('gtx 1660 ti') || name.includes('gtx 1660 super') || name.includes('gtx 1660')) return '192-bit';
  if (name.includes('gtx 1650 super') || name.includes('gtx 1650')) return '128-bit';
  if (name.includes('gtx 1080 ti')) return '352-bit';
  if (name.includes('gtx 1080')) return '256-bit';
  if (name.includes('gtx 1070')) return '256-bit';
  if (name.includes('gtx 1060')) return '192-bit';
  
  return '256-bit';
}

// Get PCIe interface
function getPCIeInterface(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD
  if (name.includes('rx 90') || name.includes('rx 79') || name.includes('rx 78') || name.includes('rx 77') || name.includes('rx 76')) return 'PCIe 4.0 x16';
  if (name.includes('rx 69') || name.includes('rx 68') || name.includes('rx 67') || name.includes('rx 66')) return 'PCIe 4.0 x16';
  if (name.includes('rx 57') || name.includes('rx 56') || name.includes('rx 55')) return 'PCIe 4.0 x16';
  if (name.includes('rx 5') || name.includes('rx 4')) return 'PCIe 3.0 x16';
  
  // NVIDIA
  if (name.includes('rtx 50')) return 'PCIe 5.0 x16';
  if (name.includes('rtx 40') || name.includes('rtx 30')) return 'PCIe 4.0 x16';
  if (name.includes('rtx 20') || name.includes('gtx 16') || name.includes('gtx 10')) return 'PCIe 3.0 x16';
  
  return 'PCIe 4.0 x16';
}

// Get Ray Tracing and Tensor cores (NVIDIA only)
function getRTTensorCores(gpuName) {
  const name = gpuName.toLowerCase();
  
  if (!name.includes('rtx')) return 'N/A (AMD)';
  
  if (name.includes('rtx 5090')) return '192 RT / 768 Tensor Cores';
  if (name.includes('rtx 5080')) return '128 RT / 512 Tensor Cores';
  if (name.includes('rtx 5070 ti')) return '96 RT / 384 Tensor Cores';
  if (name.includes('rtx 5070')) return '80 RT / 320 Tensor Cores';
  if (name.includes('rtx 5060 ti')) return '64 RT / 256 Tensor Cores';
  if (name.includes('rtx 5060')) return '48 RT / 192 Tensor Cores';
  if (name.includes('rtx 5050')) return '32 RT / 128 Tensor Cores';
  if (name.includes('rtx 4090')) return '128 RT / 512 Tensor Cores';
  if (name.includes('rtx 4080 super')) return '96 RT / 384 Tensor Cores';
  if (name.includes('rtx 4080')) return '76 RT / 304 Tensor Cores';
  if (name.includes('rtx 4070 ti super')) return '80 RT / 320 Tensor Cores';
  if (name.includes('rtx 4070 ti')) return '64 RT / 256 Tensor Cores';
  if (name.includes('rtx 4070 super')) return '48 RT / 192 Tensor Cores';
  if (name.includes('rtx 4070')) return '36 RT / 144 Tensor Cores';
  if (name.includes('rtx 4060 ti')) return '32 RT / 128 Tensor Cores';
  if (name.includes('rtx 4060')) return '24 RT / 96 Tensor Cores';
  if (name.includes('rtx 4050')) return '20 RT / 80 Tensor Cores';
  if (name.includes('rtx 3090 ti')) return '84 RT / 336 Tensor Cores';
  if (name.includes('rtx 3090')) return '82 RT / 328 Tensor Cores';
  if (name.includes('rtx 3080 ti')) return '68 RT / 272 Tensor Cores';
  if (name.includes('rtx 3080')) return '68 RT / 272 Tensor Cores';
  if (name.includes('rtx 3070 ti')) return '46 RT / 184 Tensor Cores';
  if (name.includes('rtx 3070')) return '46 RT / 184 Tensor Cores';
  if (name.includes('rtx 3060 ti')) return '38 RT / 152 Tensor Cores';
  if (name.includes('rtx 3060')) return '28 RT / 112 Tensor Cores';
  if (name.includes('rtx 3050')) return '20 RT / 80 Tensor Cores';
  if (name.includes('rtx 2080 ti')) return '68 RT / 544 Tensor Cores';
  if (name.includes('rtx 2080 super')) return '54 RT / 432 Tensor Cores';
  if (name.includes('rtx 2080')) return '46 RT / 368 Tensor Cores';
  if (name.includes('rtx 2070 super')) return '40 RT / 320 Tensor Cores';
  if (name.includes('rtx 2070')) return '36 RT / 288 Tensor Cores';
  if (name.includes('rtx 2060 super')) return '30 RT / 240 Tensor Cores';
  if (name.includes('rtx 2060')) return '30 RT / 240 Tensor Cores';
  
  return 'Ray Tracing Cores';
}

// Get recommended PSU
function getRecommendedPSU(gpuName) {
  const name = gpuName.toLowerCase();
  
  if (name.includes('rtx 5090') || name.includes('rtx 4090')) return '850W+';
  if (name.includes('rtx 5080') || name.includes('rtx 4080')) return '750W+';
  if (name.includes('rtx 5070 ti') || name.includes('rtx 4070 ti super') || name.includes('rtx 3090 ti') || name.includes('rtx 3090')) return '750W+';
  if (name.includes('rtx 5070') || name.includes('rtx 4070 ti') || name.includes('rtx 3080 ti')) return '700W+';
  if (name.includes('rtx 5060 ti') || name.includes('rtx 4070 super') || name.includes('rtx 4070') || name.includes('rtx 3080')) return '650W+';
  if (name.includes('rtx 5060') || name.includes('rtx 4060 ti') || name.includes('rtx 3070 ti') || name.includes('rtx 3070')) return '600W+';
  if (name.includes('rtx 5050') || name.includes('rtx 4060') || name.includes('rtx 3060 ti') || name.includes('rtx 3060')) return '550W+';
  if (name.includes('rtx 4050') || name.includes('rtx 3050')) return '450W+';
  if (name.includes('rtx 2080 ti') || name.includes('rtx 2080')) return '650W+';
  if (name.includes('rtx 2070') || name.includes('rtx 2060')) return '550W+';
  
  // AMD
  if (name.includes('rx 7900 xtx') || name.includes('rx 7900 xt')) return '750W+';
  if (name.includes('rx 7800 xt') || name.includes('rx 7700 xt')) return '600W+';
  if (name.includes('rx 7600')) return '550W+';
  if (name.includes('rx 6950 xt') || name.includes('rx 6900 xt')) return '750W+';
  if (name.includes('rx 6800 xt')) return '650W+';
  if (name.includes('rx 6800') || name.includes('rx 6700 xt')) return '600W+';
  if (name.includes('rx 6650 xt') || name.includes('rx 6600')) return '500W+';
  
  return '500W+';
}

// Show GPU detail modal
function showGPUDetail(gpu) {
  const modal = document.getElementById('gpu-modal');
  const modalBody = document.getElementById('gpu-modal-body');
  const releaseYear = estimateReleaseYear(gpu.name);
  const architecture = getArchitecture(gpu.name);
  const vramType = getVRAMType(gpu.name);
  const clockSpeed = getClockSpeed(gpu.name);
  const memoryClock = getMemoryClock(gpu.name);
  const coreCount = getCoreCount(gpu.name);
  const busWidth = getMemoryBusWidth(gpu.name);
  const pcieInterface = getPCIeInterface(gpu.name);
  const rtTensorCores = getRTTensorCores(gpu.name);
  const recommendedPSU = getRecommendedPSU(gpu.name);
  
  modalBody.innerHTML = `
    <div class="gpu-detail-header">
      <h2 class="gpu-detail-title">${gpu.name}</h2>
      <span class="gpu-detail-score">Score: ${gpu.score}</span>
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
        <div class="gpu-detail-label">VRAM</div>
        <div class="gpu-detail-value">${gpu.ram} GB ${vramType}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">TDP</div>
        <div class="gpu-detail-value">${gpu.tdp}W</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Preis</div>
        <div class="gpu-detail-value">${gpu.price}€</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">GPU-Takt</div>
        <div class="gpu-detail-value">${clockSpeed}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Speichertakt</div>
        <div class="gpu-detail-value">${memoryClock}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Kerne</div>
        <div class="gpu-detail-value">${coreCount}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Speicher-Bus</div>
        <div class="gpu-detail-value">${busWidth}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">PCIe</div>
        <div class="gpu-detail-value">${pcieInterface}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">RT/Tensor Cores</div>
        <div class="gpu-detail-value">${rtTensorCores}</div>
      </div>
      <div class="gpu-detail-item">
        <div class="gpu-detail-label">Empf. Netzteil</div>
        <div class="gpu-detail-value">${recommendedPSU}</div>
      </div>
    </div>
    
    <div class="gpu-detail-fps">
      <h4>Performance in Spielen</h4>
      <div class="fps-grid">
        <div class="fps-item">
          <div class="fps-game">Cyberpunk 2077</div>
          <div class="fps-value">${gpu.fps.cyberpunk} FPS</div>
        </div>
        <div class="fps-item">
          <div class="fps-game">Warzone</div>
          <div class="fps-value">${gpu.fps.warzone} FPS</div>
        </div>
        <div class="fps-item">
          <div class="fps-game">Fortnite</div>
          <div class="fps-value">${gpu.fps.fortnite} FPS</div>
        </div>
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gpu-modal');
  const closeBtn = document.querySelector('.modal-close');
  
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
