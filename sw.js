// Polyfill for Chrome caching
importScripts('js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open('v1').then(function(cache) {

      // Define what we want to cache
      return cache.addAll([
        '/',
        'index.html',
        'sw.js',
        'js/index.js',
        'css/styles.css',,
        'manifest.json',
        'img/launcher-icon-48.png',
        'img/launcher-icon-96.png',
        'img/launcher-icon-144.png',
        'img/launcher-icon-192.png',
        'img/launcher-icon-256.png',
        'img/launcher-icon-512.png',
      ]);
    })
  );
});

// Use ServiceWorker (or not) to fetch data
self.addEventListener('fetch', function(event) {

  event.respondWith(

    // Look for something in the cache that matches the request
    caches.match(event.request).then(function(response) {

      // If we find something, return it
      // Otherwise, use the network instead
      return response || fetch(event.request);
    })
  );
});
