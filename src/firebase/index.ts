import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

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