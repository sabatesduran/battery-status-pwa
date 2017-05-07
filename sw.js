// Polyfill for Chrome caching
importScripts('js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open('bat').then(function(cache) {

      // Define what we want to cache
      return cache.addAll([
        '/',
        'index.html',
        'manifest.json',
        'js/index.js',
        'vendor/mdl/material.min.js',
        'css/styles.css',
        'vendor/mdl/material.min.css',
        'vendor/mdl/material-icons.css',
        'vendor/mdl/material-icons.woff2',
        'img/launcher-icon-48.webp',
        'img/launcher-icon-96.webp',
        'img/launcher-icon-128.webp',
        'img/launcher-icon-144.webp',
        'img/launcher-icon-192.webp',
        'img/launcher-icon-256.webp',
        'img/launcher-icon-512.webp'
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
