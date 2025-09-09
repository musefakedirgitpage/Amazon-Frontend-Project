
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAnftqjs_UIiGPkiWnAhp9N2kiHKtArW8",
  authDomain: "clone-ffc0b.firebaseapp.com",
  projectId: "clone-ffc0b",
  storageBucket: "clone-ffc0b.appspot.com", // 👈 fix: should end with .appspot.com
  messagingSenderId: "213932647300",
  appId: "1:213932647300:web:9148056e3068e1787d33d1",
  measurementId: "G-SRWJN89N1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth & firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
