window.gpus = [
  ...(window.amdGPUs || []),
  ...(window.nvidiaGPUs || [])
];

window.cpus = [
  ...(window.amdCPUs || []),
  ...(window.intelCPUs || [])
];