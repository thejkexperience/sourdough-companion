// Sourdough Companion — service worker
// Caches the app shell (HTML/CSS/JS/icons) so the app opens instantly and
// works offline. Your bake/recipe data lives in Supabase, not here — API
// calls to Supabase (and the supabase-js CDN script) always go straight to
// the network so you never see stale data.

const CACHE_VERSION = 'sourdough-companion-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first (with background refresh) — but ONLY for our own same-origin
// app shell files. Cross-origin requests (Supabase REST/Storage/Auth calls,
// the supabase-js CDN script) are left completely untouched so data is
// always live and auth/session calls are never served from a stale cache.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
