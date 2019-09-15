importScripts("precache-manifest.ff4eaf04e60d72099bb5be26c201a84a.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Updating
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.addPlugins([
  new workbox.broadcastUpdate.Plugin('precache-channel')
]);
