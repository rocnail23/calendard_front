import {cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import {clientsClaim} from "workbox-core"
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';
import {BackgroundSyncPlugin} from 'workbox-background-sync';

// Precache the manifest
cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST);



let allowlist;
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist }
))


const bgSyncPlugin = new BackgroundSyncPlugin('events', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
 new RegExp("http://localhost:4000/app/v1/events"),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);


registerRoute(new RegExp("http://localhost:4000/app/v1/auth/renew"),
new NetworkFirst())

registerRoute(new RegExp("http://localhost:4000/app/v1/events"),
new NetworkFirst())

self.addEventListener("fetch", (event) => {

  const assets = ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"]

  if(!assets.includes(event.request.url)) return

  
  fetch(event.request)
  .then(res =>  caches.open("dynamic").then(cache => cache.put(event.request, res)))
  .catch(err => console.log(err))
  
  


  event.respondWith(caches.match(event.request) || fetch(event.request))
  
})



// Register the navigation route
self.skipWaiting()
clientsClaim()

// Create a route for image, script, or style requests that use a
// stale-while-revalidate strategy. This route will be unaffected
// by navigation preload.


// Register the route handling static assets
