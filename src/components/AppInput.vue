<template>
    <input
        type="text"
        class="text-primary placeholder-primary border-primary h-14 w-full rounded-full border-r-2 bg-[#F4EBE1] px-4 tracking-widest"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>
<script setup lang="ts">
import type { PropType } from "vue"

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
})
</script>
