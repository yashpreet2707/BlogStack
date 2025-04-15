import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogstack-3155b.firebaseapp.com",
  projectId: "blogstack-3155b",
  storageBucket: "blogstack-3155b.firebasestorage.app",
  messagingSenderId: "557320394415",
  appId: "1:557320394415:web:2a892464ba69624472a65a",
};

export const app = initializeApp(firebaseConfig);
