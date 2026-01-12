import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your full configuration
const firebaseConfig = {
  apiKey: "AIzaSyApaM1kPkqc3oMKSSBadH1OA2QKFGmy4I8",
  authDomain: "practical-practice-e6c1c.firebaseapp.com",
  projectId: "practical-practice-e6c1c",
  storageBucket: "practical-practice-e6c1c.firebasestorage.app",
  messagingSenderId: "525397767284",
  appId: "1:525397767284:web:f4fd1c3d77a6699c050d21",
  measurementId: "G-0CE887NE9E"
};


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);