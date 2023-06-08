<template>
    <div class="fade-in flex">
        <AppContainer>
            <img src="/images/game/animation.gif" alt="logo" class="fade-in mx-auto mb-4 w-48 -rotate-2" />
            <h1 class="mx-4 mb-4 text-xl">
                啊！↑～！＼↖～<br>一起成為武林大師吧！
            </h1>
            <div class="mx-auto mb-4 h-2.5 w-11/12 rounded-full bg-gray-200">
                <div class="h-2.5 rounded-full bg-primary" :style="{ width: progressBarWidth }"></div>
            </div>
            <div class="mb-48">{{ encouragements[count] }}</div>
        </AppContainer>
        <BottomImage />
    </div>
</template>
<script setup lang="ts">
import AppContainer from "@/layout/AppContainer.vue"
import BottomImage from "@/components/BottomImage.vue"
import { ref, computed, watch, onMounted } from "vue"
import router from "@/router"
import { useGame } from "@/composables/useGame"
import { log } from "@/firebase"

const encouragements = [
    "氣息的每一分延續，都是武功的累積",
    "即將習得第一式武功，再堅持一下下！",
    "只要五秒真氣，即將掌握第二式!",
    "再五秒，解鎖新武功！",
    "太厲害了，再五秒到達至尊高手境界",
    "佩服佩服，可謂一代宗師了！",
]

let count = ref(0)
const level = [5000, 10000, 15000, 20000, 30000, 9999999]
const { duration, inGame } = useGame()
const progressBarWidth = computed(() => {
    const p = (duration.value / level[count.value]) * 100
    if (p > 100) {
        count.value++
    }
    if (count.value > 5) count.value = 5
    return `${p}%`
})

watch(inGame, (val) => {
    if (!val) {
        log("leave_game")
        router.push("/calc")
    }
})
onMounted(() => {
    // console.log("enter_game")
    log("enter_game")
    if (!inGame.value) {
        router.push("/ready")
    }
})
</script>
