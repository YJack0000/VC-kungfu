import { ref, computed } from "vue"
import { useDevicesList, useUserMedia } from "@vueuse/core"
import { log } from "@/firebase"
// Get the list of microphones
// Constrain the list to only audio devices
const { audioInputs: microphones, ensurePermissions } = useDevicesList({
    requestPermissions: true,
    constraints: { audio: true },
})

const currentMicrophone = computed(() => microphones.value[0]?.deviceId)

const { stream: _stream, start: _startStream, stop: _stopStream } = useUserMedia({
    // Don't let a devicechange (e.g. Bluetooth mic connecting mid-game) auto-restart
    // the stream — that would stop the track the analyser is connected to and end the
    // game. We pick the device once at initGame time.
    autoSwitch: false,
    constraints: computed(() => ({
        audio: currentMicrophone.value ? { deviceId: currentMicrophone.value } : true,
        video: false,
    })),
})

const pitch = ref(-1)
const volume = ref(-1)
const duration = ref(0)
const inGame = ref(false)

const audioContext = ref<null | AudioContext>(null)
const analyser = ref<null | AnalyserNode>(null)
const pitchRecord = ref([] as number[])
const volumeRecord = ref([] as number[])

let recordTimer: number | null = null
let rafId: number | null = null
let sourceNode: MediaStreamAudioSourceNode | null = null

// Reset all per-game state. Called when a new game starts so a replay
// never inherits the previous round's records/duration.
const resetState = () => {
    pitch.value = -1
    volume.value = -1
    duration.value = 0
    pitchRecord.value = []
    volumeRecord.value = []
}

// Stop the requestAnimationFrame analysis loop.
const stopParse = () => {
    if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
    }
}

// Release every audio resource: the rAF loop, the sampling interval, the
// microphone stream, the source node and the AudioContext. Idempotent, so it
// is safe to call from onUnmounted and on game end.
const teardown = () => {
    stopParse()
    if (recordTimer !== null) {
        window.clearInterval(recordTimer)
        recordTimer = null
    }
    try {
        sourceNode?.disconnect()
    } catch {
        // already disconnected
    }
    sourceNode = null
    _stopStream()
    if (audioContext.value && audioContext.value.state !== "closed") {
        audioContext.value.close()
    }
    audioContext.value = null
    analyser.value = null
}

export const useGame = () => {
    const initGame = async () => {
        try {
            // Start from a clean slate so replays don't stack rAF loops,
            // leak microphones or accumulate AudioContexts (browsers cap them).
            teardown()
            resetState()

            // audioContext has to be created/resumed after a user gesture.
            audioContext.value = new AudioContext()
            if (audioContext.value.state === "suspended") {
                await audioContext.value.resume()
            }
            analyser.value = audioContext.value.createAnalyser()
            await _startStream()
        } catch (e) {
            alert("請允許使用麥克風: " + JSON.stringify(e))
            log("no_mic")
            teardown()
            throw e
        }
    }

    const startGame = async () => {
        if (!audioContext.value || !analyser.value) {
            alert("請重新整理再試一次")
            throw new Error("audioContext or analyser is null")
        }
        // iOS Safari may suspend the context; resume within the gesture.
        if (audioContext.value.state === "suspended") {
            await audioContext.value.resume()
        }
        analyser.value.minDecibels = -100
        analyser.value.maxDecibels = -10
        analyser.value.smoothingTimeConstant = 0.85

        const tracks = _stream.value?.getAudioTracks() ?? []
        if (tracks.length === 0) {
            alert("無法取得麥克風音訊，請重新整理再試一次")
            throw new Error("no audio track available")
        }
        tracks[0].enabled = true

        // Initialize the SourceNode and connect it to the analyser.
        sourceNode = audioContext.value.createMediaStreamSource(_stream.value!)
        sourceNode.connect(analyser.value)

        _parseDataFromStream(audioContext.value, analyser.value)

        pitchRecord.value = []
        volumeRecord.value = []

        let noVolumeCount: number = -100 // 避免一開始就沒聲音

        if (recordTimer !== null) window.clearInterval(recordTimer)

        let startTime: number = Date.now()
        recordTimer = window.setInterval(() => {
            try {
                if (noVolumeCount < 0)
                    // 直到有聲音才開始計時
                    startTime = Date.now()
                else inGame.value = true

                duration.value = Date.now() - startTime
                pitchRecord.value.push(pitch.value)
                volumeRecord.value.push(volume.value)

                if (volume.value === -1) {
                    noVolumeCount++
                } else {
                    noVolumeCount = 0
                }
                if (noVolumeCount > 2 || duration.value > 60000) {
                    stopGame()
                }
            } catch (error) {
                console.log(error)
            }
        }, 100)
    }

    // End the current game and release all audio resources. Records and the
    // final duration are intentionally kept so the result screen can read them.
    const stopGame = () => {
        teardown()
        inGame.value = false
    }

    return {
        pitch,
        volume,
        duration,
        pitchRecord,
        volumeRecord,
        initGame,
        startGame,
        stopGame,
        inGame,
        ensurePermissions,
    }
}

const _parseDataFromStream = (audioContext: AudioContext, analyser: AnalyserNode): void => {
    rafId = requestAnimationFrame(() => {
        _parseDataFromStream(audioContext, analyser)
    })
    // 從 buffer 中取出資料
    const bufferLength: number = analyser.fftSize
    const buffer = new Float32Array(bufferLength)
    analyser.getFloatTimeDomainData(buffer)

    // 計算音量
    const currentvolume: number = getVolume(buffer)
    volume.value = currentvolume ? currentvolume + 50 : -1

    // 計算音高
    const autoCorrelateValue: number = autoCorrelate(buffer, audioContext.sampleRate) || -1
    // 四捨入，取整數 Hz
    const valueToDisplay: number = Math.round(autoCorrelateValue)

    // 典型成年男性的人聲基本頻率為85至180Hz，典型成年女性則為165至255Hz。
    if (valueToDisplay > 85 && valueToDisplay < 255) {
        pitch.value = valueToDisplay
    } else {
        // Reset on silence/out-of-range so the record isn't polluted with a
        // stale held pitch (matches how volume is reset to -1 each frame).
        pitch.value = -1
    }
}

const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    // Perform a quick root-mean-square to see if we have enough signal
    let SIZE = buffer.length
    let sumOfSquares = 0
    for (let i = 0; i < SIZE; i++) {
        const val = buffer[i]
        sumOfSquares += val * val
    }
    const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
    if (rootMeanSquare < 0.01) {
        return -1
    }

    // Find a range in the buffer where the values are below a given threshold.
    let r1 = 0
    let r2 = SIZE - 1
    const threshold = 0.2

    // Walk up for r1
    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) {
            r1 = i
            break
        }
    }

    // Walk down for r2
    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) {
            r2 = SIZE - i
            break
        }
    }

    // Trim the buffer to these ranges and update SIZE.
    buffer = buffer.slice(r1, r2)
    SIZE = buffer.length

    // Create a new array of the sums of offsets to do the autocorrelation
    const c = new Array(SIZE).fill(0)
    // For each potential offset, calculate the sum of each buffer value times its offset value
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
            c[i] = c[i] + buffer[j] * buffer[j + i]
        }
    }

    // Find the last index where that value is greater than the next one (the dip)
    let d = 0
    while (c[d] > c[d + 1]) {
        d++
    }

    // Iterate from that index through the end and find the maximum sum
    let maxValue = -1
    let maxIndex = -1
    for (let i = d; i < SIZE; i++) {
        if (c[i] > maxValue) {
            maxValue = c[i]
            maxIndex = i
        }
    }

    let T0 = maxIndex

    // Not as sure about this part, don't @ me
    // From the original author:
    // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
    // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
    // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
    const x1 = c[T0 - 1]
    const x2 = c[T0]
    const x3 = c[T0 + 1]

    const a = (x1 + x3 - 2 * x2) / 2
    const b = (x3 - x1) / 2
    if (a) {
        T0 = T0 - b / (2 * a)
    }

    return sampleRate / T0
}

const getVolume = (array: Float32Array): number => {
    let sum = 0,
        counter = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0.003) {
            sum += array[i]
            counter++
        }
    }
    // Explicit silence sentinel instead of relying on `NaN || 0`.
    if (counter === 0) return 0
    return 100 + 20 * Math.log(sum / counter)
}
