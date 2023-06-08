<template>
    <img src="/images/frame.png" alt="frame" class="absolute w-screen" :style="{ bottom: offset }" />
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useWindowSize } from "@vueuse/core"
const { width } = useWindowSize()

const offset = computed(() => {
    if (width.value < 468) return "0px"
    return (468 - width.value) / 2 + "px"
})
</script>
