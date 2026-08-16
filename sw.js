// FarmAddress Service Worker
// Provides offline functionality and caching strategies

const CACHE_NAME = 'farmaddress-v1';
const RUNTIME_CACHE = 'farmaddress-runtime-v1';
const IMAGE_CACHE = 'farmaddress-images-v1';

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/detail.html',
  '/product.html',
  '/cart.html',
  '/checkout.html',
  '/orders.html',
  '/farmer.html',
  '/login.html',
  '/settings.html',
  '/test-language.html',
  '/style.css',
  '/detail.css',
  '/product.css',
  '/cart.css',
  '/checkout.css',
  '/farmer.css',
  '/login.css',
  '/settings.css',
  '/orders.css',
  '/i18n.css',
  '/firebase-config.js',
  '/db.js',
  '/i18n.js',
  '/script.js',
  '/detail.js',
  '/product.js',
  '/cart.js',
  '/checkout.js',
  '/farmer.js',
  '/login.js',
  '/settings.js',
  '/orders.js',
  '/manifest.json'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[Service Worker] Failed to cache some assets:', err);
        // Don't fail install if some assets fail
        return Promise.resolve();
      });
    })
  );
  
  // Skip waiting - activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE && cacheName !== IMAGE_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Claim all clients
  self.clients.claim();
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy for HTML files: Network first, fallback to cache
  if (request.destination === 'document' || request.url.includes('.html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            // Cache the response
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(request, response.clone()));
            return response;
          }
          return caches.match(request) || response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request);
        })
    );
    return;
  }

  // Strategy for CSS and JS files: Cache first, network fallback
  if (request.url.includes('.css') || request.url.includes('.js')) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) return response;
        
        return fetch(request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
            });
          }
          return response;
        }).catch(() => {
          // Return a basic offline response
          return new Response('Offline', { status: 503 });
        });
      })
    );
    return;
  }

  // Strategy for images: Cache first, network fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) return response;
        
        return fetch(request).then((response) => {
          if (response.ok) {
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, response.clone());
            });
          }
          return response;
        }).catch(() => {
          // Return placeholder image
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50" y="50" text-anchor="middle">Offline</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        });
      })
    );
    return;
  }

  // Default strategy: Network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, response.clone());
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
