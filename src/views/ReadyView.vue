<template>
    <div class="fade-in flex">
        <audio ref="audio">
            <source src="@/assets/audio/countdown.mp3" type="audio/mpeg" />
        </audio>
        <AppContainer>
            <img src="/images/logo.png" alt="logo" class="mx-auto mb-16 w-32 -rotate-2" />
            <h1 v-if="!isClicked" class="mx-8 mb-10 text-2xl">先深吸一口氣</h1>
            <h1 v-else class="fade-in mx-8 mb-10 text-2xl">準備好了嗎<br />對準麥克風出聲以開始</h1>
            <button
                class="mb-16 w-28 rounded-full bg-primary p-2 pl-8 pr-8 text-center text-2xl text-white drop-shadow-[2px_3px_3px_rgba(0,0,0,0.25)] transition duration-300 ease-in-out hover:scale-110"
                @click="handleClick"
            >
                {{ buttonStr }}
            </button>
        </AppContainer>
        <BottomImage />
    </div>
</template>
<script setup lang="ts">
import AppContainer from "@/layout/AppContainer.vue"
import AppButton from "@/components/AppButton.vue"
import BottomImage from "@/components/BottomImage.vue"
import { ref, watch, onMounted } from "vue"
import router from "@/router"
import { useRouter } from "vue-router"
import { useGame } from "@/composables/useGame"
import { name, age } from "@/stores"
import { log } from "@/firebase"

const buttonStr = ref<string>("✔")
const { startGame, initGame, inGame, ensurePermissions } = useGame()

const isClicked = ref<boolean>(false) // prevent apple two click
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const handleClick = async () => {
    isClicked.value = true
    log("click_ready")
    // buttonStr.value = "載入中"
    try {
        await initGame()
    } catch (e) {
        return
    }

    if (!(await ensurePermissions())) {
        alert("無法開啟麥克風，請確認是否已開啟權限並使用瀏覽器開啟。")
        return
    }
    audioEffect()
    buttonStr.value = "3"
    await delay(1000)
    audioEffect()
    buttonStr.value = "2"
    await delay(1000)
    audioEffect()
    buttonStr.value = "1"
    await delay(1000)
    buttonStr.value = "啊～"
    try {
        await startGame()
    } catch (e) {
        return
    }
}

watch(inGame, (val) => {
    if (val) router.push("/game")
})

const audio = ref<HTMLAudioElement>()
const audioEffect = () => {
    audio.value?.play()
}

onMounted(() => {
    if (!name.value || !age.value) router.push("/form")
})
</script>
