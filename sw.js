const CACHE_NAME = 'nero-sync-v1.0.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Gemini_Generated_Image_kggd5tkggd5tkggd.png',
  './Gemini_Generated_Image_jy5o2ejy5o2ejy5o.png'
];

// Installation: Caching the assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation: Cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});