/**
 * Service Worker for Playbook Solutions
 * Handles caching, offline functionality, and resource management
 * @version 1.0.0
 */

const CACHE_NAME = 'playbook-cache-v1';
const OFFLINE_PAGE = '/pwa/offline.html';

// Static assets to pre-cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/modules/website/index.html',
  '/modules/website/assets/styles/variables.css',
  '/modules/website/assets/styles/animations.css',
  '/modules/website/assets/styles/ambient.css',
  '/modules/website/assets/styles/main.css',
  '/modules/website/assets/scripts/main.js',
  '/modules/website/assets/scripts/ambient.js',
  '/components/mobile-hamburger-nav.js',
  '/components/mobile-bottom-nav.js',
  '/components/mobile-tap-targets.css',
  OFFLINE_PAGE
];

// Install event - Pre-cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete, skipping waiting');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Pre-cache failed:', err);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - Intercept network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests except for CDN resources
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('cdnjs.cloudflare.com') &&
      !url.hostname.includes('fonts.googleapis.com')) {
    return;
  }
  
  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }
  
  // Handle static assets (CSS, JS, images)
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }
  
  // Default: network first with cache fallback
  event.respondWith(handleDefaultRequest(request));
});

/**
 * Handle navigation requests with network-first strategy
 * Falls back to cached page or offline page on failure
 */
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      // Cache successful response
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not OK');
  } catch (err) {
    console.log('[SW] Navigation failed, trying cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page if available
    const offlineResponse = await caches.match(OFFLINE_PAGE);
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Last resort: redirect to root
    const rootResponse = await caches.match('/index.html');
    if (rootResponse) {
      return rootResponse;
    }
    
    throw new Error('No cached response available');
  }
}

/**
 * Handle static assets with cache-first strategy
 */
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Refresh cache in background
    updateCacheInBackground(request);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request, {
      cache: 'no-store'
    });
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (err) {
    console.error('[SW] Failed to fetch asset:', err);
    throw err;
  }
}

/**
 * Handle default requests with network-first strategy
 */
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request, {
      cache: 'no-store'
    });
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not OK');
  } catch (err) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw err;
  }
}

/**
 * Check if URL is a static asset
 */
function isStaticAsset(url) {
  const staticExtensions = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', 
    '.svg', '.webp', '.woff', '.woff2', '.ttf'
  ];
  const path = url.pathname.toLowerCase();
  return staticExtensions.some(ext => path.endsWith(ext));
}

/**
 * Update cache in background (stale-while-revalidate pattern)
 */
async function updateCacheInBackground(request) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response);
    }
  } catch (err) {
    // Silently fail background update
  }
}

// Push notification support (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title || 'Meshy AI', {
        body: data.body || 'New update available',
        icon: '/pwa/icons/icon-192.png',
        badge: '/pwa/icons/icon-64.png',
        data: data.url || '/'
      })
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data || '/');
      }
    })
  );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker registered');
