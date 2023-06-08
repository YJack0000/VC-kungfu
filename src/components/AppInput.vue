<template>
    <input
        type="text"
        class="h-14 w-full rounded-full bg-[#F4EBE1] px-4 text-primary placeholder-primary border-r-2 border-primary tracking-widest"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>
<script setup lang="ts">
import type { PropType } from "vue";

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
