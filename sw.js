const CACHE_NAME = 'hinario-v1';
const assets = [
  './',
  './index.html',
  './hinos.json',
  './hinosportugues.json',
  './CBA.JPEG'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});