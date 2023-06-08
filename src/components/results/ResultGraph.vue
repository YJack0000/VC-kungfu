<template>
    <div class="mt-2 h-full max-h-[250px] min-h-[170px] w-full">
        <canvas id="myChart" class="m-auto"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue"
import { Chart } from "chart.js/auto"
import type { ChartConfiguration, ChartDataCustomTypesPerDataset } from "chart.js"
import { useGame } from "@/composables/useGame"

const { pitchRecord, volumeRecord, duration } = useGame()

onMounted(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement
    new Chart(ctx, config)
})

const data: ChartDataCustomTypesPerDataset = {
    labels: Array.from({ length: pitchRecord.value.length }, (_, i) => (i * 100) / 1000),
    datasets: [
        {
            label: "音高 (Hz)",
            type: "line",
            data: pitchRecord.value.map((val) => Number(val.toFixed(2))),
            borderColor: "#cd5035",
            backgroundColor: "#cd5035",
            yAxisID: "pitch",
        },
        {
            label: "音量 (dB)",
            type: "line",
            // fill: true,
            data: volumeRecord.value,
            borderColor: "#393b42",
            backgroundColor: "#393b42",
            yAxisID: "volume",
        },
    ],
}

const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                // display: false,
                labels: {
                    font: {
                        family: "GenWanMinM",
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 0,
            },
            line: {
                borderWidth: 2,
            },
        },
        scales: {
            x: {
                // 只顯示 0.5 的倍數
                ticks: {
                    // autoSkip: false,
                    // autoSkipPadding: 0.,
                    font: {
                        size: 10,
                    },
                    callback: function (val, index) {
                        // console.log(index, pitchRecord.value.length)
                        if (typeof val !== "number") return ""
                        const label: number = parseFloat(this.getLabelForValue(val))
                        // if (Math.abs(duration.value / 1000 - label) < 1) return ""
                        // console.log(Number.isInteger(label / 0.5), label / 0.5, label, index)
                        return Number.isInteger(label / 1) ? label + "s" : ""
                    },
                    maxRotation: 0,
                    minRotation: 0,
                },
                grid: {
                    display: false,
                },
                // title: {
                //     display: true,
                //     text: "秒數",
                //     font: {
                //         size: 14,
                //         family: "GenWanMinM",
                //     },
                // },
            },
            pitch: {
                type: "linear",
                display: true,
                position: "left",
                min: 50,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    color: "#cd5035",
                },
                // title: {
                //     display: true,
                //     text: "頻率(Hz)",
                //     font: {
                //         size: 14,
                //         family: "GenWanMinM",
                //     },
                // },
            },
            volume: {
                type: "linear",
                display: true,
                position: "right",
                min: 0,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    color: "#393b42",
                },
                // title: {
                //     display: true,
                //     text: "音量(dB)",
                //     font: {
                //         size: 14,
                //         family: "GenWanMinM",
                //     },
                // },
            },
        },
    },
}
</script>
