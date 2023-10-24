import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
           strategies:"injectManifest",
           srcDir:"src",
           filename:"my-sw.js",
           injectManifest:{
            globPatterns:["**/*"]
           },
            manifest: {
                "theme_color": "#f69435",
                "background_color": "#f69435",
                "display": "standalone",
                "scope": "/",
                "start_url": "/",
                "short_name": "calendy",
                "description": "hey install calendy",
                "name": "may calendy today",
                "icons": [
                    {
                        "src": "/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
            },
           } ),
    ],
});