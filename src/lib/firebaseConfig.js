
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpv2gHcD5OtWDbMeiMZyMFs1Jy1Ldc4vw",
  authDomain: "fir-6bba5.firebaseapp.com",
  projectId: "fir-6bba5",
  storageBucket: "fir-6bba5.appspot.com",
  messagingSenderId: "213726878036",
  appId: "1:213726878036:web:a6a49689112d80223190c1",
  measurementId: "G-KMST1ZWF2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);