import * as navigationPreload from 'workbox-navigation-preload';
import {NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {registerRoute, NavigationRoute, Route} from 'workbox-routing';
import {precacheAndRoute} from 'workbox-precaching';

// Precache the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Enable navigation preload


// Create a new navigation route that uses the Network-first, falling back to
// cache strategy for navigation requests with its own cache. This route will be
// handled by navigation preload. The NetworkOnly strategy will work as well.


// Register the navigation route


// Create a route for image, script, or style requests that use a
// stale-while-revalidate strategy. This route will be unaffected
// by navigation preload.


// Register the route handling static assets
