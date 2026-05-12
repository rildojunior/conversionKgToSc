const CACHE_NAME = 'kg-para-sc-v1';
const ASSETS = [
  '/conversionKgToSc/',
  '/conversionKgToSc/index.html',
  '/conversionKgToSc/style.css',
  '/conversionKgToSc/scripts.js',
  '/conversionKgToSc/manifest.json',
  '/conversionKgToSc/assets/favicon.ico',
  '/conversionKgToSc/assets/icon-192x192.png',
  '/conversionKgToSc/assets/icon-512x512.png',
  '/conversionKgToSc/assets/apple-touch-icon.png',
  '/conversionKgToSc/assets/github.svg',
  '/conversionKgToSc/assets/instagram.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
