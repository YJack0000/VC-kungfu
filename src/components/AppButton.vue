<template>
    <button
        class="drop-shadow-[2px_3px_3px_rgba(0,0,0,0.25)] mb-16 w-44 rounded-full bg-primary p-2 pl-8 pr-8 text-3xl text-white transition duration-300 ease-in-out hover:scale-110"
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
