const CACHE_NAME = 'hinario-v1';
// Lista apenas o essencial para a App abrir
const assets = [
  '/hinario-Digital/',
  '/hinario-Digital/index.html',
  '/hinario-Digital/manifest.json',
  '/hinario-Digital/CBA.JPEG'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Fazendo cache dos arquivos...');
        return cache.addAll(assets);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
