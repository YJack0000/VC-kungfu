export const getResult = (duration: number, pitchRecord: number[], volumeRecord: number[]) => {
    const volumeResult: string = getVolumeResult(volumeRecord)
    const pitchResult: string = getPitchResult(pitchRecord)

    const resultKey: string = volumeResult + pitchResult
    const result = resultContext[resultKey]

    // console.log("type: " + resultKey)

    let level: number = 0
    if (duration < 10000) {
        level = 0
    } else if (duration < 15000) {
        level = 1
    } else if (duration < 20000) {
        level = 2
    } else if (duration < 30000) {
        level = 3
    } else {
        level = 4
    }

    return {
        level: level,
        levelString: levelStrings[level],
        levelName: levelNames[level],
        description: levelDescriptions[level],
        suggestion: levelSuggestions[level],
        // keys: result.keys.sort(() => 0.5 - Math.random()).slice(0, 3),
        keys: result.keys.slice(0, 3),
        style: result.style,
        luck: result.lucks[Math.floor(Math.random() * 3)],
    }
}

const getPitchResult = (pitchRecord: number[]): string => {
    const threshold = 180
    const n = pitchRecord.length
    let h = 0,
        l = 0
    for (let i = 0; i < n; i++) {
        if (pitchRecord[i] > threshold) {
            h++
        } else {
            l++
        }
    }

    // 高頻率與低頻率的比例小，代表頻率起伏
    // console.log("頻率：", h, l, h / l)
    if (h / l < 2 && h / l > 0.5) {
        return "f"
    } else if (h > l) {
        return "h"
    } else {
        return "l"
    }
}

const getVolumeResult = (volumeRecord: number[]): string => {
    if (volumeRecord.length === 0) return "f"
    const threshold = volumeRecord.reduce((a, b) => a + b) / volumeRecord.length
    const n = volumeRecord.length
    let h = 0,
        l = 0
    for (let i = 0; i < n; i++) {
        if (volumeRecord[i] > threshold) {
            h++
        } else {
            l++
        }
    }

    // 高音量與低音量的比例小，代表音量起伏
    // console.log("音量：", h, l, h / l, threshold)
    if (h / l < 2 && h / l > 0.5) {
        return "f"
    } else if (h > l) {
        return "h"
    } else {
        return "l"
    }
}

const levelStrings: string[] = ["第一式", "第二式", "第三式", "第四式", "第五式"]

const levelNames: string[] = ["關東長拳", "羅漢拳", "無影腳", "獅吼功", "金鐘罩"]

const levelDescriptions: string[] = [
    "鼓催拳起，槌落式停 配合默契，氣勢如虹",
    "步伐穩健，手法獨特 巧勁多變，呼喝相隨",
    "氣沉丹田，出招敏捷 以快制敵，方寸不亂",
    "不鳴則已，一鳴驚人 平日養氣調息，用時震懾十里",
    "金鐘罩身，外力難欺 拳覆鐵布，萬夫莫敵",
]

const levelSuggestions: any[] = [
    {
        do: "調勻呼吸節奏",
        dont: "久坐不動，致氣息淤積",
    },
    {
        do: "自覺呼吸韻律",
        dont: "怠慢忽略，致危害產生",
    },
    {
        do: "平心靜氣，深呼吸",
        dont: "心浮氣躁，致氣息紊亂",
    },
    {
        do: "適當運動，擴充肺活量",
        dont: "輕視新冠確診危害",
    },
    {
        do: "每日數回腹式呼吸訓練",
        dont: "輕視空污危害",
    },
]

const resultContext: any = {
    // 分貝高 x 頻率高
    hh: {
        keys: ["激昂", "果斷", "活潑", "性急", "直來直往"],
        style: "果斷且富有正義感的特質，讓你遙見路不平，必定狂奔而至，拔刀相助。\n然而性急也容易造成誤會，發功前請務必三思。",
        lucks: ["日出便見風雲散，光明清靜照世間", "世間凡事何難定，千山萬水也遲疑", "綠柳蒼蒼正當時，任君此去作乾坤"],
    },
    // 分貝高 x 頻率低
    hl: {
        keys: ["傳統", "固執", "自信", "沉穩", "雄渾"],
        style: "雄渾的底氣，與沉穩、自信的處事態度，在無形中令你成為眾人依循的標竿。\n擇善固執故為美事一樁，但請避免拘泥形式。",
        lucks: ["太公家業八十成，月出光輝四海明", "總是前途莫心勞，不須作福事如何", "平生富貴成祿位，君家門戶定光輝"],
    },
    // 分貝高 x 頻率起伏
    hf: {
        keys: ["機靈", "有創意", "俏皮", "緊張", "焦慮"],
        style: "創意的靈光，總像煙火般圍繞著你，請盡情享受遊戲人間的旅程，擔心失足的焦慮，將拖慢你輕巧的步伐。",
        lucks: ["凡事不須多憂慮，福祿自有慶家門", "雲開月出見分明，不須進退向前程", "目下緊事休相問，勸君且守待運通"],
    },
    // 分貝低 x 頻率高
    lh: {
        keys: ["內斂", "細心", "敏感", "不自信", "缺乏安全感"],
        style: "善於觀察，細心、敏感的你，總能見微知著，看清他人隱藏的情緒。內斂的個性，常導致過度謙虛，可以更有自信一點。",
        lucks: ["於今此景正當時，看看欲吐百花魁", "雲開月出照天下，郎君即便見太平", "選出牡丹第一枝，勸君折取莫遲疑"],
    },
    // 分貝低 x 頻率低
    ll: {
        keys: ["認真", "果決", "堅忍不拔", "遲鈍", "死腦筋"],
        style: "一旦下定決心，就會堅持到底，堅忍不拔到對自己近乎苛責，總能達成他人所不能。但在悶頭前行時，請記得過路的風景也值得欣賞。",
        lucks: ["花開花謝結子成，寬心且看月中桂", "月出光輝四海明，前途祿位見太平", "若見蘭桂漸漸發，長蛇反轉變成龍"],
    },
    // 分貝低 x 頻率起伏
    lf: {
        // 冷靜、機靈、聰慧狡黠 成府深、自尋煩惱
        keys: ["冷靜", "機靈", "聰慧狡黠", "成府深", "自尋煩惱"],
        style: "聰慧狡詰的才智，讓你總能先一步洞悉世故。這般遠見，有時會帶來不必要的煩惱，但你總能以創意的想法，機靈化解所有難關。",
        lucks: ["且守長江無大事，命逢太白守身邊", "不須作福不須求，用盡心機總未休", "一年作事急如飛，君爾寬心莫遲疑"],
    },
    // 分貝起伏 x 頻率高
    fh: {
        keys: ["豁達", "樂觀", "瀟灑隨興", "隨便", "粗心"],
        style: "豁達的世界觀，賦予你瀟灑的氣質，就算不是無憂無慮，但總能消遙自在。然而隨興的生活態度，有時會不小心造成些許粗心。",
        lucks: ["富貴由命天註定，雲開月出自分明", "君爾寬心且自由，門庭清吉家無憂", "客到前途多得利，月出光輝得運時"],
    },
    // 分貝起伏 x 頻率低
    fl: {
        keys: ["自在", "樸實", "知足", "不思進取", "狀況外"],
        style: "知足的天性，讓你如一汪清水般澄澈質樸，令他人在與你相處時，皆能感到十分自在。\n不過有時需避免太沉浸在自己的世界。",
        lucks: ["長江風浪漸漸靜，于今得進可安寧", "名顯有意在中間，不須祈禱心自安", "福如東海壽如山，君爾何須嘆苦難"],
    },
    // 分貝起伏 x 頻率起伏
    ff: {
        //熱情、炫目、人來瘋 中央空調、出爾反爾
        keys: ["熱情", "炫目", "人來瘋", "中央空調", "出爾反爾"],
        style: "情緒飽滿，容易與他人共情，持常會有不由自主的熱情。即使每段感情都是出自真心，但也要小心避免四處留情。",
        lucks: ["勸君把定心莫虛，天註姻緣自有餘", "紅日當空常照耀，還有貴人到家堂", "寬心且守寬心坐，必然遇得貴人扶"],
    },
}
