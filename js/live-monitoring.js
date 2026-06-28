(function () {
  let isRunning = false;
  let intervalId = null;
  let chart = null;
  let dataPoints = {
    fps: [],
    cpu: [],
    memory: []
  };
  const maxDataPoints = 60;
  let tooltip = null;

  // DOM Elements
  const fpsValue = document.getElementById('fps-value');
  const cpuValue = document.getElementById('cpu-value');
  const ramValue = document.getElementById('ram-value');
  const memoryValue = document.getElementById('memory-value');
  const batteryValue = document.getElementById('battery-value');
  const networkValue = document.getElementById('network-value');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const canvas = document.getElementById('monitoring-chart');

  if (!canvas) return;

  // Browser API Data
  const cpuCores = navigator.hardwareConcurrency || 'N/A';
  const deviceMemory = navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'N/A';

  // FPS Measurement
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let currentFPS = 0;

  function measureFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastFrameTime >= 1000) {
      currentFPS = frameCount;
      frameCount = 0;
      lastFrameTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  }

  // Get Memory Usage (Chrome only)
  function getMemoryUsage() {
    if (performance.memory) {
      const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
      const total = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
      return `${used} MB / ${total} MB`;
    }
    return 'N/A';
  }

  // Get Battery Info
  async function getBatteryInfo() {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        const level = Math.round(battery.level * 100);
        const charging = battery.charging ? 'Lädt' : 'Entlädt';
        return `${level}% (${charging})`;
      } catch (e) {
        return 'N/A';
      }
    }
    return 'N/A';
  }

  // Get Network Info
  function getNetworkInfo() {
    if (navigator.connection) {
      const conn = navigator.connection;
      const type = conn.effectiveType || 'N/A';
      const downlink = conn.downlink || 'N/A';
      return `${type} (${downlink} Mbps, Schätzung)`;
    }
    return 'N/A';
  }

  // Initialize Chart
  function initChart() {
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    chart = {
      ctx: ctx,
      width: canvas.offsetWidth,
      height: canvas.offsetHeight
    };
  }

  // Draw chart
  function drawChart() {
    const { ctx, width, height } = chart;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#0f4c50';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw FPS line (green)
    drawLine(dataPoints.fps, '#00ffd5', 200);
    
    // Draw Memory line (blue)
    drawLine(dataPoints.memory, '#00a8a0', 100);
  }

  // Show tooltip
  function showTooltip(x, y, data) {
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'chart-tooltip';
      document.body.appendChild(tooltip);
    }
    
    tooltip.innerHTML = `
      <strong>FPS:</strong> ${data.fps}<br>
      <strong>Speicher:</strong> ${data.memory}%
    `;
    
    tooltip.style.left = (x + 15) + 'px';
    tooltip.style.top = (y + 15) + 'px';
    tooltip.style.display = 'block';
  }

  // Hide tooltip
  function hideTooltip() {
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }

  // Handle mouse move on canvas
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const { width: chartWidth } = chart;
    const stepX = chartWidth / (maxDataPoints - 1);
    
    // Find closest data point
    const index = Math.round(x / stepX);
    
    if (index >= 0 && index < dataPoints.fps.length) {
      const fps = dataPoints.fps[index];
      const memory = dataPoints.memory[index];
      
      showTooltip(e.clientX, e.clientY, { fps, memory });
    }
  }

  function drawLine(data, color, maxValue) {
    const { ctx, width, height } = chart;
    if (data.length < 2) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const stepX = width / (maxDataPoints - 1);
    
    data.forEach((value, index) => {
      const x = index * stepX;
      const y = height - (value / maxValue) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }

  // Get real browser data
  async function getBrowserData() {
    const fps = currentFPS || 0;
    const memory = performance.memory ? 
      Math.round((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100) : 0;
    
    return { fps, memory };
  }

  // Update display
  async function updateDisplay() {
    const data = await getBrowserData();
    
    fpsValue.textContent = data.fps;
    cpuValue.textContent = cpuCores + ' Kerne (logisch)';
    ramValue.textContent = deviceMemory;
    memoryValue.textContent = getMemoryUsage();
    batteryValue.textContent = await getBatteryInfo();
    networkValue.textContent = getNetworkInfo();

    // Update chart data
    dataPoints.fps.push(data.fps);
    dataPoints.memory.push(data.memory);

    if (dataPoints.fps.length > maxDataPoints) {
      dataPoints.fps.shift();
      dataPoints.memory.shift();
    }

    drawChart();
  }

  // Start monitoring
  function startMonitoring() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    dataPoints = { fps: [], memory: [] };
    
    measureFPS();
    updateDisplay();
    
    intervalId = setInterval(() => {
      updateDisplay();
    }, 1000);
  }

  // Stop monitoring
  function stopMonitoring() {
    if (!isRunning) return;
    
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Event listeners
  startBtn.addEventListener('click', startMonitoring);
  stopBtn.addEventListener('click', stopMonitoring);
  
  // Canvas mouse events for tooltip
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', hideTooltip);

  // Initialize
  initChart();
  stopBtn.disabled = true;
  
  // Show static system info
  cpuValue.textContent = cpuCores + ' Kerne (logisch)';
  ramValue.textContent = deviceMemory;
  memoryValue.textContent = getMemoryUsage();
  getBatteryInfo().then(result => {
    batteryValue.textContent = result;
  });
  networkValue.textContent = getNetworkInfo();
  
  window.addEventListener('resize', () => {
    initChart();
    drawChart();
  });
})();
