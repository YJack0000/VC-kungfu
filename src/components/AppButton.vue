<template>
    <button
        class="bg-primary mb-16 w-44 rounded-full p-2 pr-8 pl-8 text-3xl text-white drop-shadow-[2px_3px_3px_rgba(0,0,0,0.25)] transition duration-300 ease-in-out hover:scale-110"
        @click="to ? router.push(to) : $emit('click')"
    >
        <slot></slot>
    </button>
</template>
<script setup lang="ts">
import router from "@/router"

defineProps({
    to: {
        type: String,
        required: false,
    },
})
</script>
