const CACHE_NAME = 'axtor-pos-cloud-static-demo-v5-tax-product-fix';
const ASSETS = [
  './',
  'index.html',
  'login.html',
  'terminal.html',
  'shifts.html',
  'sales.html',
  'customer.html',
  'salesmen.html',
  'products.html',
  'inventory.html',
  'barcode-labels.html',
  'purchase.html',
  'branches.html',
  'promotions.html',
  'loyalty.html',
  'approvals.html',
  'reports.html',
  'accounts.html',
  'expenses.html',
  'setup.html',
  'notifications.html',
  'settings.html',
  'invoice-designer.html',
  'invoice-view.html',
  'quotations.html',
  'delivery.html',
  'communications.html',
  'css/style.css',
  'js/main.js',
  'js/app-data.js',
  'js/retail-advanced.js',
  'js/charts.js',
  'js/invoice-templates.js',
  'manifest.webmanifest',
  'assets/images/logo.svg',
  'assets/images/icon-192.png',
  'assets/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(ASSETS.map(asset => cache.add(asset).catch(err => {
        // Keep install resilient for GitHub Pages/CDN timing, but do not hide runtime script/css failures.
        console.warn('[Axtor SW] Cache skipped:', asset, err && err.message);
        return null;
      }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // CDN assets are intentionally fetched live in this static demo.
        // Local assets listed above are cached during install for basic offline refresh support.
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('index.html');
        if (event.request.destination === 'image') return caches.match('assets/images/logo.svg');
        return new Response('Offline asset unavailable. Check network/CDN or reload when online.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});
