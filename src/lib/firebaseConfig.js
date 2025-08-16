
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCpv2gHcD5OtWDbMeiMZyMFs1Jy1Ldc4vw",
//   authDomain: "fir-6bba5.firebaseapp.com",
//   projectId: "fir-6bba5",
//   storageBucket: "fir-6bba5.appspot.com",
//   messagingSenderId: "213726878036",
//   appId: "1:213726878036:web:a6a49689112d80223190c1",
//   measurementId: "G-KMST1ZWF2T"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDZD8TXhaE6lr29R4no573qydMzUAL597Y",
  authDomain: "tssr-79f4a.firebaseapp.com",
  projectId: "tssr-79f4a",
  storageBucket: "tssr-79f4a.appspot.com",
  messagingSenderId: "465121616495",
  appId: "1:465121616495:web:f5575743436a14e786e39a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);