import type AppSpinnerVue from '@/components/AppSpinner.vue';

<template>
    <AppSpinner> {{ context }} </AppSpinner>
</template>
<script setup lang="ts">
import AppSpinner from "@/components/AppSpinner.vue"
import router from "@/router";
import { ref, onMounted } from "vue"

const context = ref("")

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
onMounted(async () => {
    context.value = "載入中..."
    await delay(Math.random() * 1000)
    context.value = "計算結果..."
    await delay(Math.random() * 2000)
    router.push('/result')
})
</script>
