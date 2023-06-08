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

const { stream: _stream, start: _startStream } = useUserMedia({
    audioDeviceId: currentMicrophone,
    videoDeviceId: false,
})

const pitch = ref(-1)
const volume = ref(-1)
const duration = ref(0)
const inGame = ref(false)

const audioContext = ref<null | AudioContext>(null)
const analyser = ref<null | AnalyserNode>(null)
const pitchRecord = ref([] as number[])
const volumeRecord = ref([] as number[])
let recordTimer: number

export const useGame = () => {
    const initGame = async () => {
        try {
            // audioContext.value has to be initialized after user interaction
            audioContext.value = new AudioContext()
            analyser.value = audioContext.value.createAnalyser()
            pitch.value = -1
            volume.value = -1
            await _startStream()
            // console.log("start stream")
            window.clearInterval(recordTimer)
        } catch (e) {
            alert("請允許使用麥克風: " + JSON.stringify(e))
            log("no_mic")
            throw e
        }
    }

    const startGame = async () => {
        if (!audioContext.value || !analyser.value) {
            alert("請重新整理再試一次")
            throw new Error("audioContext or analyser is null")
        }
        analyser.value.minDecibels = -100
        analyser.value.maxDecibels = -10
        analyser.value.smoothingTimeConstant = 0.85
        // Initialize the SourceNode
        if (!_stream.value) return
        _stream.value.getAudioTracks()[0].enabled = true
        const source = audioContext.value.createMediaStreamSource(_stream.value)
        // Connect the source node to the analyzer
        source.connect(analyser.value)

        _parseDataFromStream(audioContext.value, analyser.value)

        if (_stream.value) {
            _stream.value.getAudioTracks()[0].enabled = true
        }

        pitchRecord.value = []
        volumeRecord.value = []

        let noVolumeCount: number = -100 // 避免一開始就沒聲音

        if (recordTimer) window.clearInterval(recordTimer)

        let startTime: number = Date.now()
        recordTimer = window.setInterval(async () => {
            try {
                if (noVolumeCount < 0)
                    // 直到有聲音才開始計時
                    startTime = Date.now()
                else inGame.value = true

                duration.value = Date.now() - startTime
                pitchRecord.value.push(pitch.value)
                volumeRecord.value.push(volume.value)

                // console.log(
                //     "volume: ",
                //     volume.value,
                //     "pitch: ",
                //     pitch.value,
                //     "duration: ",
                //     duration.value,
                //     "encouragement: ",
                //     encouragement.value
                // )
                // console.log("noVolumeCount: ", noVolumeCount)
                // console.log("volume: ", volume.value, "pitch: ", pitch.value)
                if (volume.value === -1) {
                    noVolumeCount++
                } else {
                    noVolumeCount = 0
                }
                if (noVolumeCount > 2 || duration.value > 60000) {
                    if (_stream.value) {
                        // _stream.value.getAudioTracks()[0].enabled = false
                    }
                    inGame.value = false
                    // console.log("stop timer")
                    window.clearInterval(recordTimer)
                }
            } catch (error) {
                console.log(error)
            }
        }, 100)
    }

    return {
        pitch,
        volume,
        duration,
        pitchRecord,
        volumeRecord,
        initGame,
        startGame,
        inGame,
        ensurePermissions,
    }
}

const _parseDataFromStream = (audioContext: AudioContext, analyser: AnalyserNode): any => {
    requestAnimationFrame(() => {
        _parseDataFromStream(audioContext, analyser)
    })
    // 從 buffer 中取出資料
    var bufferLength: number = analyser.fftSize
    var buffer: Float32Array = new Float32Array(bufferLength)
    analyser.getFloatTimeDomainData(buffer)

    // 計算音量
    var currentvolume: number = getVolume(buffer)
    volume.value = currentvolume ? currentvolume + 50 : -1

    // 計算音高
    var autoCorrelateValue: number = autoCorrelate(buffer, audioContext.sampleRate) || -1
    // console.log("autoCorrelateValue: ", autoCorrelateValue)
    // 四捨入，取整數 Hz
    var valueToDisplay: number = Math.round(autoCorrelateValue)

    // 典型成年男性的人聲基本頻率為85至180Hz，典型成年女性則為165至255Hz。
    if (valueToDisplay > 85 && valueToDisplay < 255) pitch.value = valueToDisplay
}

const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    // Perform a quick root-mean-square to see if we have enough signal
    var SIZE = buffer.length
    var sumOfSquares = 0
    for (var i = 0; i < SIZE; i++) {
        var val = buffer[i]
        sumOfSquares += val * val
    }
    var rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
    if (rootMeanSquare < 0.01) {
        return -1
    }

    // Find a range in the buffer where the values are below a given threshold.
    var r1 = 0
    var r2 = SIZE - 1
    var threshold = 0.2

    // Walk up for r1
    for (var i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) {
            r1 = i
            break
        }
    }

    // Walk down for r2
    for (var i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) {
            r2 = SIZE - i
            break
        }
    }

    // Trim the buffer to these ranges and update SIZE.
    buffer = buffer.slice(r1, r2)
    SIZE = buffer.length

    // Create a new array of the sums of offsets to do the autocorrelation
    var c = new Array(SIZE).fill(0)
    // For each potential offset, calculate the sum of each buffer value times its offset value
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
            c[i] = c[i] + buffer[j] * buffer[j + i]
        }
    }

    // Find the last index where that value is greater than the next one (the dip)
    var d = 0
    while (c[d] > c[d + 1]) {
        d++
    }

    // Iterate from that index through the end and find the maximum sum
    var maxValue = -1
    var maxIndex = -1
    for (var i = d; i < SIZE; i++) {
        if (c[i] > maxValue) {
            maxValue = c[i]
            maxIndex = i
        }
    }

    var T0 = maxIndex

    // Not as sure about this part, don't @ me
    // From the original author:
    // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
    // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
    // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
    var x1 = c[T0 - 1]
    var x2 = c[T0]
    var x3 = c[T0 + 1]

    var a = (x1 + x3 - 2 * x2) / 2
    var b = (x3 - x1) / 2
    if (a) {
        T0 = T0 - b / (2 * a)
    }

    // console.log("sampleRate: ", sampleRate)
    // console.log("T0: ", T0)
    // console.log("sampleRate / T0: ", sampleRate / T0)

    return sampleRate / T0
}

const getVolume = (array: Float32Array): number => {
    // console.log(array)
    let sum = 0,
        counter = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0.003) {
            sum += array[i]
            counter++
        }
    }
    return 100 + 20 * Math.log(sum / counter) || 0
}
