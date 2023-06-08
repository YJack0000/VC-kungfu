import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const saveResult = async (name: string, age: string, result: any, pitchRecord: number[], volumeRecord: number[], duration: number) => {
    const docRef = collection(db, "result")
    await addDoc(docRef, {
        name: name,
        age: age,
        level: result.level,
        levelName: result.levelName,
        description: result.description,
        keys: result.keys,
        style: result.style,
        luck: result.luck,
        pitchRecord: pitchRecord,
        volumeRecord: volumeRecord,
        duration: duration,
        timestamp: new Date(),
    })
}

export const log = (name: string, params: any = {}) => {
    logEvent(analytics, name, params)
}