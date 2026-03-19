const CACHE_NAME = 'hinario-v1.2'; // Mudei a versão para forçar o update
const assets = [
  './',
  './index.html',
  './manifest.json',
  './CBA.JPEG',
  './hinos.json',
  './hinosportugues.json'
];

// Instalação e Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Instalando cache...');
      // Usamos o map para que, se um ficheiro falhar, os outros continuem
      return Promise.all(
        assets.map(url => {
          return cache.add(url).catch(err => console.log('Erro ao carregar:', url, err));
        })
      );
    })
  );
  self.skipWaiting();
});

// Ativação (Limpa caches antigos)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Resposta às requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
