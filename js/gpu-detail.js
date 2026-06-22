// GPU Detail Modal Functionality

// Store ratings in JSON file via server
async function getGPURatings() {
  try {
    const response = await fetch('/data/gpu-ratings.json');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Fehler beim Laden der Bewertungen:', error);
  }
  // Fallback zu localStorage wenn Server nicht erreichbar
  const localRatings = localStorage.getItem('gpuRatings');
  return localRatings ? JSON.parse(localRatings) : {};
}

async function saveGPURating(gpuName, rating, comment) {
  try {
    const response = await fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gpuName: gpuName,
        rating: rating,
        comment: comment
      })
    });
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log('Fehler beim Speichern der Bewertung:', error);
  }
  // Fallback zu localStorage wenn Server nicht erreichbar
  const ratings = await getGPURatings();
  if (!ratings[gpuName]) {
    ratings[gpuName] = [];
  }
  ratings[gpuName].push({
    rating: rating,
    comment: comment,
    date: new Date().toISOString()
  });
  localStorage.setItem('gpuRatings', JSON.stringify(ratings));
  return false;
}

async function getGPURatingAverage(gpuName) {
  const ratings = await getGPURatings();
  if (!ratings[gpuName] || ratings[gpuName].length === 0) {
    return 0;
  }
  const sum = ratings[gpuName].reduce((acc, r) => acc + r.rating, 0);
  return (sum / ratings[gpuName].length).toFixed(1);
}

// Estimate release year based on GPU name
function estimateReleaseYear(gpuName) {
  const name = gpuName.toLowerCase();
  
  // AMD GPUs
  if (name.includes('rx 90')) return '2025';
  if (name.includes('rx 79')) return '2022-2023';
  if (name.includes('rx 78') || name.includes('rx 77') || name.includes('rx 76')) return '2023';
  if (name.includes('rx 69')) return '2020-2021';
  if (name.includes('rx 68') || name.includes('rx 67') || name.includes('rx 66')) return '2020-2021';
  if (name.includes('rx 57') || name.includes('rx 56') || name.includes('rx 55')) return '2019-2020';
  if (name.includes('rx 5') && !name.includes('rx 50')) return '2017-2019';
  if (name.includes('rx 4')) return '2016-2017';
  if (name.includes('vega')) return '2017';
  
  // NVIDIA GPUs
  if (name.includes('rtx 50')) return '2025';
  if (name.includes('rtx 40')) return '2022-2024';
  if (name.includes('rtx 30')) return '2020-2022';
  if (name.includes('rtx 20')) return '2018-2020';
  if (name.includes('gtx 16')) return '2019';
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

// Show GPU detail modal
async function showGPUDetail(gpu) {
  const modal = document.getElementById('gpu-modal');
  const modalBody = document.getElementById('gpu-modal-body');
  const releaseYear = estimateReleaseYear(gpu.name);
  const architecture = getArchitecture(gpu.name);
  const avgRating = await getGPURatingAverage(gpu.name);
  const ratings = await getGPURatings();
  const gpuRatings = ratings[gpu.name] || [];
  
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
        <div class="gpu-detail-value">${gpu.ram} GB</div>
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
        <div class="gpu-detail-label">Durchschnittsbewertung</div>
        <div class="gpu-detail-value">${avgRating > 0 ? avgRating + ' / 5' : 'Noch keine Bewertungen'}</div>
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
    
    <div class="gpu-rating-section">
      <h4>Diese GPU bewerten</h4>
      <div class="rating-stars" id="rating-stars">
        <span class="star" data-rating="1">★</span>
        <span class="star" data-rating="2">★</span>
        <span class="star" data-rating="3">★</span>
        <span class="star" data-rating="4">★</span>
        <span class="star" data-rating="5">★</span>
      </div>
      <textarea class="rating-input" id="rating-comment" placeholder="Schreibe eine Bewertung... (optional)"></textarea>
      <button class="rating-submit" onclick="submitRating('${gpu.name.replace(/'/g, "\\'")}')">Bewertung absenden</button>
    </div>
    
    ${gpuRatings.length > 0 ? `
    <div class="user-reviews">
      <h4>Bewertungen (${gpuRatings.length})</h4>
      ${gpuRatings.slice().reverse().map(r => `
        <div class="review-item">
          <div class="review-header">
            <span class="review-author">Anonym</span>
            <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
          </div>
          <div class="review-text">${r.comment || 'Kein Kommentar'}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
  `;
  
  // Setup star rating interaction
  const stars = modalBody.querySelectorAll('.star');
  let selectedRating = 0;
  
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.rating);
      stars.forEach((s, index) => {
        s.classList.toggle('active', index < selectedRating);
      });
    });
    
    star.addEventListener('mouseenter', () => {
      const rating = parseInt(star.dataset.rating);
      stars.forEach((s, index) => {
        s.style.color = index < rating ? '#00ffd5' : '#0f4c50';
      });
    });
  });
  
  document.getElementById('rating-stars').addEventListener('mouseleave', () => {
    stars.forEach((s, index) => {
      s.style.color = index < selectedRating ? '#00ffd5' : '#0f4c50';
    });
  });
  
  modal.style.display = 'block';
}

async function submitRating(gpuName) {
  const stars = document.querySelectorAll('#rating-stars .star');
  let selectedRating = 0;
  stars.forEach(star => {
    if (star.classList.contains('active')) {
      selectedRating = parseInt(star.dataset.rating);
    }
  });
  
  if (selectedRating === 0) {
    alert('Bitte wähle eine Bewertung (1-5 Sterne)');
    return;
  }
  
  const comment = document.getElementById('rating-comment').value;
  await saveGPURating(gpuName, selectedRating, comment);
  
  // Refresh modal
  const gpu = gpus.find(g => g.name === gpuName);
  if (gpu) {
    await showGPUDetail(gpu);
  }
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
