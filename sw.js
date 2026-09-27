const CACHE = 'aif-c01-reviewer-v17';
const ASSETS = ['./', './index.html', './styles.css?v=15', './assets/reviewer-mark.svg', './exams/domain-1.js', './exams/domain-2.js', './exams/domain-3.js', './exams/domain-4.js', './exams/domain-5.js', './exams/mock-exam-1.js', './exams/mock-exam-2.js', './exams/mock-exam-3.js', './exams/mock-exam-4.js', './exams/mock-exam-5.js', './manifest.webmanifest'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) {
        event.waitUntil(caches.open(CACHE).then(cache => cache.put('./index.html', response.clone())));
      }
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }

  event.respondWith(caches.match(event.request).then(cached => cached ||
    fetch(event.request).then(response => {
      if (response.ok) {
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, response.clone())));
      }
      return response;
    })
  ));
});
