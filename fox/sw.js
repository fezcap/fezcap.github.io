self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/',
      'index.html?v=1',
      'index.js?v=1',
      'style.css?v=1',
      'images/fox1.jpg',
      'images/fox2.jpg',
      'images/fox3.jpg',
      'images/fox4.jpg',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
