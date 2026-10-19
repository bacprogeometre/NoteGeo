// Notes Géo — service worker : rend l'appli installable et la page disponible hors connexion.
// Les données (Supabase) ne sont jamais mises en cache ici.
const CACHE = 'notesgeo-v11';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192-v3.png', './icon-512-v3.png', './icon-maskable-512-v3.png', './apple-touch-icon-v3.png'];
const LIBS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('supabase.co')) return;           // données : toujours en direct

  if (url.origin === location.origin) {
    // La page : d'abord le réseau (pour recevoir les mises à jour), sinon la copie gardée.
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  if (LIBS.includes(url.hostname)) {
    // Bibliothèques et polices : la copie gardée d'abord (versions figées).
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
