<template>
    <div v-if="show" class="absolute right-0 bottom-12 z-50 flex w-screen justify-end sm:right-4 animate-bounce">
        <div
            id="toast-default"
            class="slide-in float-right flex w-[32px] max-w-sm items-center bg-primary p-0.5 shadow"
            role="alert"
        >
            <a class="rounded-lg p-1.5 text-sm font-medium text-white hover:bg-orange-100" href="#" @click="again">
                再來一局
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import router from "@/router"
import { log } from "@/firebase"

const show = ref<Boolean>(true)
const again = () => {
    log("click_again")
    router.push("/ready")
}
</script>
<style scoped>
.slide-in {
    animation: slideInAnimation 5s ease-in-out;
}

@keyframes slideInAnimation {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
