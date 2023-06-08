<template>
    <div class="mx-auto w-52 rounded-full border border-primary px-2 py-0.5 text-xs">
        肺活量等級：
        <img
            v-for="_ in level+1"
            :key="'s' + _"
            src="/images/result/cloud-solid.png"
            alt="cloud"
            class="mr-0.5 inline-block w-5"
        />
        <img
            v-for="_ in 5 - level-1"
            :key="'b' + _"
            src="/images/result/cloud-border.png"
            alt="cloud"
            class="mr-0.5 inline-block w-5"
        />
    </div>
</template>
<script setup lang="ts">
defineProps<{
    level: number
}>()
</script>
