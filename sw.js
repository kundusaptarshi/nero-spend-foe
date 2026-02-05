const CACHE_NAME = 'nero-sync-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Gemini_Generated_Image_kggd5tkggd5tkggd.png',
  '/Gemini_Generated_Image_jy5o2ejy5o2ejy5o.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
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