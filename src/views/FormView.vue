import AppInput from '@/components/AppInput.vue';

<template>
    <div class="fade-in flex">
        <audio ref="audio">
            <source src="@/assets/audio/splash.mp3" type="audio/mpeg" />
        </audio>
        <img
            v-if="showSplash"
            src="/images/form/splash-4.png"
            alt="splash"
            class="zoom-in absolute top-1 right-1 z-10"
        />
        <img
            v-if="showSplash"
            src="/images/form/splash-3.png"
            alt="splash"
            class="zoom-in absolute bottom-12 left-4 z-10"
        />
        <AppContainer>
            <AppInput v-model="name" class="mb-6 w-3/4 max-w-sm" placeholder="大俠名諱?" />
            <AppInput v-model="age" class="mb-6 w-3/4 max-w-sm" placeholder="大俠貴庚?" />
            <ErrorMessage v-if="errorMsg.length">{{ errorMsg }}</ErrorMessage>
            <AppButton @click="handleSend" class="mt-16">繼&nbsp;&nbsp;&nbsp;續</AppButton>
        </AppContainer>
    </div>
</template>
<script setup lang="ts">
import AppContainer from "@/layout/AppContainer.vue"
import AppInput from "@/components/AppInput.vue"
import ErrorMessage from "@/components/ErrorMessage.vue"
import AppButton from "@/components/AppButton.vue"
import { ref } from "vue"
import router from "@/router"
import { name, age } from "@/stores"
import { log } from "@/firebase"

const showSplash = ref(false)
const audio = ref<HTMLAudioElement>()
const audioEffect = () => {
    showSplash.value = true
    audio.value?.play()
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const errorMsg = ref<String>("")
const handleSend = async () => {
    log("click_send")
    if (!name.value || !age.value) {
        errorMsg.value = "請輸入姓名與年齡"
        return
    }

    const ageNum = parseInt(age.value)
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
        errorMsg.value = "請輸入正確年齡"
    } else if (name.value.match(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@[\]^_`{|}~]/gi)) {
        // console.log(name.value.match(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@[\]^_`{|}~]/gi))
        errorMsg.value = "請輸入正確姓名：姓名不可包含文字以外資訊"
    } else if (name.value.length > 10) {
        errorMsg.value = "姓名長度不可大於10"
    } else {
        log("valid_send", { name: name.value, age: age.value })
        errorMsg.value = ""
        audioEffect()
        await delay(1500)
        router.push("/ready")
    }
    log("invalid_send", { name: name.value, age: age.value })
}
</script>
