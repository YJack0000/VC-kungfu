<template>
    <div class="h-[calc(100%-2rem)]">
        <div class="z-10 h-8 w-screen bg-black text-center">
            <img src="/images/result/copyright.png" alt="logo" class="mx-auto w-44 pt-1" />
        </div>
        <div class="fade-in flex h-full">
            <img src="/images/result/bg1.png" alt="logo" class="absolute bottom-12 left-0 -z-10 w-full opacity-60" />
            <img src="/images/result/bg2.png" alt="logo" class="absolute bottom-36 left-20 -z-10 w-full opacity-60" />
            <img src="/images/result/bg-moon.png" alt="logo" class="absolute top-20 right-10 -z-10 w-32 opacity-90" />
            <ResultFrame>
                <!-- {{ height }} -->
                <h1 v-if="height >= 700" class="text-center">大俠檢測結果：</h1>
                <template #graph>
                    <ResultGraph />
                </template>
                <template #duration> {{ pitchRecord.length / 10 }} 秒 </template>
                <template #level>
                    <LevelBar :level="result.level" />
                </template>
                <template #levelString>
                    {{ result.levelString }}
                </template>
                <template #image>
                    <TypeImage :level="result.level" :levelName="result.levelName" />
                </template>
                <template #poem>
                    {{ result.description.slice(0, 9) }}
                    <br />
                    {{ result.description.slice(9) }}
                </template>
                <template #do>{{ result.suggestion.do }}</template>
                <template #dont>{{ result.suggestion.dont }}</template>
                <template #mood>
                    <MoodItem>{{ result.keys[0] }}</MoodItem>
                    <MoodItem>{{ result.keys[1] }}</MoodItem>
                    <MoodItem>{{ result.keys[2] }}</MoodItem>
                </template>
                <template #style>
                    {{ result.style }}
                </template>
                <template #luck> {{ result.luck }} </template>
            </ResultFrame>
            <!-- <AppContainer> -->
            <!-- <h1 class="mb-8 text-center font-[GenWanMinR] text-4xl font-bold text-primary">檢測結果</h1> -->
            <!-- <Type1 /> -->
            <!-- </AppContainer> -->
            <!-- <BottomImage class="" /> -->
            <!-- <div class="inset-x-0 bottom-0 z-50 flex w-screen h-12 w-screen bg-black">
            <img src="/images/result/copyright.png" alt="logo" class="m-auto w-64" />
        </div> -->
        </div>
        <AgainPrompt />
    </div>
</template>
<script setup lang="ts">
import ResultFrame from "@/components/results/ResultFrame.vue"
import ResultGraph from "@/components/results/ResultGraph.vue"
import TypeImage from "@/components/results/TypeImage.vue"
import BottomImage from "@/components/BottomImage.vue"
import MoodItem from "@/components/results/MoodItem.vue"
import LevelBar from "@/components/results/LevelBar.vue"
import { useWindowSize } from "@vueuse/core"
import { getResult } from "@/composables/result"
import { useGame } from "@/composables/useGame"
import { name, age } from "@/stores"
import AgainPrompt from "@/components/AgainPrompt.vue"
import { saveResult } from "@/firebase"
import router from "@/router"

const { height } = useWindowSize()
const { duration, pitchRecord, volumeRecord } = useGame()
const result = getResult(duration.value, pitchRecord.value, volumeRecord.value)

saveResult(name.value, age.value, result, pitchRecord.value, volumeRecord.value, duration.value)

if (pitchRecord.value.length === 0) router.push("/form")
</script>
