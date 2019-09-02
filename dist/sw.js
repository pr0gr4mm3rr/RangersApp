importScripts("precache-manifest.0cb6d5b904d4809f04606e25b3c52766.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Updating
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.addPlugins([
  new workbox.broadcastUpdate.Plugin('precache-channel')
]);
