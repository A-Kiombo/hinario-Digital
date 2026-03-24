const CACHE_NAME = 'hinario-v1.2'; // Sempre que mudares um hino, sobe esta versão (ex: v1.3)
const assets = [
  './',
  './index.html',
  './hinos.json',
  './hinosportugues.json',
  './CBA.JPEG'
];

// 1. INSTALAÇÃO: Baixa os ficheiros novos
self.addEventListener('install', event => {
  self.skipWaiting(); // Força a nova versão a instalar imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Criando novo cache:', CACHE_NAME);
      return cache.addAll(assets);
    })
  );
});

// 2. ATIVAÇÃO: Apaga o cache antigo (v1.1, etc) para libertar espaço e atualizar hinos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Limpando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  ).then(() => self.clients.claim()); // Assume o controle da App na hora
});

// 3. BUSCA (FETCH): Tenta a Internet primeiro, se falhar, usa o Cache
// Esta é a melhor estratégia para hinos que mudam muito!
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
