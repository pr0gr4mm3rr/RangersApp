workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Updating
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.addPlugins([
  new workbox.broadcastUpdate.Plugin('precache-channel')
]);