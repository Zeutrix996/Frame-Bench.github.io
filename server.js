const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const RATINGS_FILE = path.join(__dirname, 'data', 'gpu-ratings.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Statische Dateien servieren
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Bewertungen abrufen
app.get('/data/gpu-ratings.json', (req, res) => {
  try {
    if (fs.existsSync(RATINGS_FILE)) {
      const data = fs.readFileSync(RATINGS_FILE, 'utf8');
      res.json(JSON.parse(data));
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('Fehler beim Lesen der Bewertungen:', error);
    res.json({});
  }
});

// Bewertung speichern
app.post('/api/ratings', (req, res) => {
  try {
    const { gpuName, rating, comment } = req.body;
    
    if (!gpuName || !rating) {
      return res.status(400).json({ error: 'Fehlende Parameter' });
    }
    
    // Aktuelle Bewertungen laden
    let ratings = {};
    if (fs.existsSync(RATINGS_FILE)) {
      const data = fs.readFileSync(RATINGS_FILE, 'utf8');
      ratings = JSON.parse(data);
    }
    
    // Neue Bewertung hinzufügen
    if (!ratings[gpuName]) {
      ratings[gpuName] = [];
    }
    
    ratings[gpuName].push({
      rating: rating,
      comment: comment || '',
      date: new Date().toISOString()
    });
    
    // Speichern
    fs.writeFileSync(RATINGS_FILE, JSON.stringify(ratings, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Speichern der Bewertung:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
  console.log(`Bewertungen werden in ${RATINGS_FILE} gespeichert`);
});
