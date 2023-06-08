<template>
    <img :src="imgSrc" alt="logo" class="mx-auto" />
    <div>{{ levelName }}</div>
</template>
<script setup lang="ts">
const props = defineProps<{
    level: number, 
    levelName: string,
}>()

const imgSrc = `/images/result/type-${props.level}.png`
</script>