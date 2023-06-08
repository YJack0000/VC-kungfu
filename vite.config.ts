import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import { VitePWA } from "vite-plugin-pwa"
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            injectRegister: "auto",
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
            includeAssets: ["logo.png", "masked-logo.png", "apple-touch-icon.png"],
            manifest: {
                name: "VC kungfu",
                short_name: "VC kungfu",
                description: "呼吸呼吸",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
        viteCompression({
            verbose: true,
            filter: /\.(png|ttc|js|mjs|json|css|html|ttf)$/i,
            disable: false,
            threshold: 1024,
            algorithm: 'gzip',
            ext: '.gz'
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
