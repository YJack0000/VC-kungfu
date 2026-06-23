import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

import { VitePWA } from "vite-plugin-pwa"
import { compression } from "vite-plugin-compression2"

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        VitePWA({
            injectRegister: "auto",
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
            includeAssets: ["logo.png", "mask-logo.png", "apple-touch-icon.png"],
            manifest: {
                name: "VC kungfu",
                short_name: "VC kungfu",
                description: "呼吸呼吸",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                start_url: "/",
                display: "standalone",
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
                    {
                        src: "pwa-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
        compression({
            include: /\.(png|ttc|js|mjs|json|css|html|ttf)$/i,
            threshold: 1024,
            algorithms: ["gzip", "brotliCompress"],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
