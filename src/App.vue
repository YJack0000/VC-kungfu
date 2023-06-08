<template>
    <!-- <EmbeddedBrowser /> -->
    <AppSpinner v-if="isLoading" />
    <EmbeddedBrowser v-if="isEmbeddedBrowser()" />
    <QRCode v-else-if="width > 450" />
    <router-view v-else />
    <!-- <div class="absolute top-10 right-10">pi: {{ pitch }}</div>
    <div class="absolute top-20 right-10">vo: {{ volume }}</div>
    <div class="absolute top-28 right-10">du: {{ duration }}</div> -->
    <!-- <canvas id="canvas" ref="canvas" class="absolute inset-0 top-32 right-10" /> -->
    <InstallPrompt />
</template>
<script setup lang="ts">
import EmbeddedBrowser from "./views/EmbeddedBrowser.vue"
import AppSpinner from "@/components/AppSpinner.vue"
import QRCode from "./views/QRCode.vue"
import InstallPrompt from "@/components/InstallPrompt.vue"
import { ref } from "vue"
import { useWindowSize } from "@vueuse/core"

const { width, height } = useWindowSize()

const isEmbeddedBrowser = () => {
    const ua = navigator.userAgent
    return ua.includes("FBAN") || ua.includes("FBAV") || ua.includes("Instagram")
}

const isLoading = ref(true)
setTimeout(() => {
    isLoading.value = false
}, 5000)
</script>
<style>
.fade-in {
    animation: fadeInAnimation ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.fade-out {
    animation: fadeOutAnimation ease 5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes fadeOutAnimation {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.zoom-in {
    animation: zoomInAnimation 0.3s ease;
}

@keyframes zoomInAnimation {
    0% {
        transform: scale(10, 10);
        opacity: 0;
    }
    100% {
        transform: scale(1, 1);
        opacity: 1;
    }
}
</style>
