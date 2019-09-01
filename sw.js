importScripts("precache-manifest.ee96acd68b103b16228faa94be580060.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Updating
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.addPlugins([
  new workbox.broadcastUpdate.Plugin('precache-channel')
]);
