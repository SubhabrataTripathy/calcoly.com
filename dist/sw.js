/* Calcoly Service Worker — Offline Utility Support */

const CACHE_NAME = 'calcoly-vmtct8mnb';
const ASSETS_TO_CACHE = [
  '/',
  '/assets/styles.css',
  '/assets/app.js',
  '/assets/widgets.js',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/all-tools/',
  '/calculators/',
  '/converters/',
  '/baking/',
  '/money/',
  '/date/',
  '/everyday/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
      if (cachedResponse) {
        // Fetch background update
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback offline page
      return caches.match('/');
    })
  );
});
