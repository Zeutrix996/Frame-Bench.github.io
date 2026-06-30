const CACHE_NAME = 'framebench-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/header.js',
  '/js/amd-gpu.js',
  '/js/nvidia-gpu.js',
  '/js/amd-cpu.js',
  '/js/intel-cpu.js',
  '/js/data.js',
  '/js/gpu-detail.js',
  '/js/ranking.js',
  '/js/finder.js',
  '/pages/fps.html',
  '/pages/gpu-compare.html',
  '/pages/cpu-compare.html',
  '/pages/compare.html',
  '/pages/finder.html',
  '/pages/ranking.html',
  '/pages/live-monitoring.html',
  '/pages/agb.html',
  '/pages/datenschutz.html',
  '/pages/impressum.html',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Clone response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});
