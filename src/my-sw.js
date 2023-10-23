import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

cleanupOutdatedCaches()


console.log("hola")
precacheAndRoute(self.__WB_MANIFEST)