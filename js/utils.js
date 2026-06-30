function findHardware(list, input) {
  input = input.toLowerCase().trim();
  if (!input) return null;

  let exact = list.find(x => x.name.toLowerCase() === input);
  if (exact) return exact;

  let partial = list.find(x => x.name.toLowerCase().includes(input));
  if (partial) return partial;

  return list.find(x =>
    input.split(" ").every(w => x.name.toLowerCase().includes(w))
  ) || null;
}

function getColor(v) {
  if (v >= 80) return "#00ffd5";
  if (v >= 50) return "#4aa3ff";
  return "#ff4d4d";
}

function recommendPSU(gpuTdp, cpuTdp) {
  let watt = (gpuTdp + cpuTdp) * 1.25 + 100;
  if (watt < 400) return "600W PSU empfohlen";
  if (watt < 600) return "750W PSU empfohlen";
  if (watt < 800) return "1000W PSU empfohlen";
  return "850W+ PSU empfohlen";
}
