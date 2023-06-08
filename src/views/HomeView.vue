<template>
    <div class="fade-in flex">
        <img
            src="/images/home/splash.png"
            class="absolute z-0 h-screen"
            fit="contain"
            :style="{
                left: offset,
            }"
        />
        <audio ref="audio">
            <source src="@/assets/audio/splash.mp3" type="audio/mpeg" />
        </audio>
        <img
            v-if="showSplash"
            src="/images/home/splash-1.png"
            alt="splash"
            class="zoom-in absolute top-12 right-4 z-10"
        />
        <img
            v-if="showSplash"
            src="/images/home/splash-2.png"
            alt="splash"
            class="zoom-in absolute bottom-12 left-4 z-10"
        />
        <AppContainer>
            <img src="/images/logo.png" alt="logo" class="mx-auto mb-16 w-32 -rotate-2" />
            <AppButton @click="handleStart"> 開&nbsp;&nbsp;&nbsp;始 </AppButton>
            <img src="/images/home/hero.png" alt="hero" class="w-60" />
        </AppContainer>
    </div>
</template>
<script setup lang="ts">
import AppContainer from "@/layout/AppContainer.vue"
import AppButton from "@/components/AppButton.vue"
import { ref, computed, onMounted } from "vue"
import { useWindowSize } from "@vueuse/core"
import router from "@/router"
import { log } from "@/firebase"

const { width } = useWindowSize()

const offset = computed(() => {
    if (width.value > 450) return "0px"
    return width.value - 450 + "px"
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const showSplash = ref(false)
const audio = ref<HTMLAudioElement>()
const startEffect = async () => {
    showSplash.value = true
    audio.value?.play()
    await delay(1500)
    router.push("/form")
}

const handleStart = () => {
    log("start_game")
    startEffect()
}
</script>
