import {cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import {clientsClaim} from "workbox-core"
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';
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
  maxRetentionTime: 24 * 60, 
 // Retry for max of 24 Hours (specified in minutes)
});

const bgSyncPlugin1 = new BackgroundSyncPlugin('putevents', {
  maxRetentionTime: 24 * 60, 
 // Retry for max of 24 Hours (specified in minutes)
});

const bgSyncPlugin2 = new BackgroundSyncPlugin('deleteevents', {
  maxRetentionTime: 24 * 60, 
 // Retry for max of 24 Hours (specified in minutes)
});


self.addEventListener('sync', function(event) {
 console.log(event)
});

const statusPlugin = {
  fetchDidSucceed: ({response}) => {
    if (response.status == 400) {
      // Throwing anything here will trigger fetchDidFail.
      console.log("this is response")
      throw response;
    }
    // If it's not 5xx, use the response as-is.
    return response;
  },
};


registerRoute(
 new RegExp("http://localhost:4000/app/v1/events"),
  
  new NetworkOnly({
    plugins: [bgSyncPlugin,statusPlugin],
  }),
  'POST'

);

registerRoute(
  new RegExp("http://localhost:4000/app/v1/events"),
   
   new NetworkOnly({
     plugins: [bgSyncPlugin2],
   }),
   'DELETE'
 );

 registerRoute(
  new RegExp("http://localhost:4000/app/v1/events"),
   
   new NetworkOnly({
     plugins: [bgSyncPlugin1],
   }),
   'PUT'
 );

registerRoute(new RegExp("http://localhost:4000/app/v1/auth/renew"),
new NetworkFirst())

registerRoute(new RegExp("http://localhost:4000/app/v1/events"),
new NetworkFirst())



 

registerRoute(new RegExp("https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"),
new CacheFirst())

registerRoute(new RegExp("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"),
new CacheFirst())

// Register the navigation route
self.skipWaiting()
clientsClaim()

// Create a route for image, script, or style requests that use a
// stale-while-revalidate strategy. This route will be unaffected
// by navigation preload.


// Register the route handling static assets
