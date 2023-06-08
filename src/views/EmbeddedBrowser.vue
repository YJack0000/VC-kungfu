<template>
    <div class="wrap flex h-full w-full">
        <div class="absolute top-0 right-0 flex animate-bounce">
            <span class="pt-3 pr-0 text-sm">FB、IG 用戶按這邊用系統預設瀏覽器開啟！</span>
            <img src="/images/arrow.png" alt="arrow" class="inline-block h-8 w-8 p-1 pt-3" />
        </div>
        <div class="absolute bottom-0 right-0 flex animate-bounce">
            <span class="pt-3 pr-0 text-sm">LINE 用戶按這邊用系統預設瀏覽器開啟！</span>
            <img src="/images/arrow.png" alt="arrow" class="inline-block h-8 w-8 rotate-180 p-1" />
        </div>
        <div class="m-auto p-6 text-center">
            無法使用嵌入式瀏覽器開啟<br />
            請<span class="cursor-pointer rounded-lg bg-primary p-0.5 text-lg text-white" @click="click"
                >點擊複製網址</span
            >後在瀏覽器開啟
        </div>
    </div>
</template>
<script setup lang="ts">
const click = () => navigator.clipboard.writeText("https://vc-kungfu.web.app/")
</script>
