// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuBdbAzuD3f1jLX8kgdjuPH1liqVAiy0Q",
  authDomain: "one8one-studios.firebaseapp.com",
  projectId: "one8one-studios",
  storageBucket: "one8one-studios.firebasestorage.app",
  messagingSenderId: "393384097761",
  appId: "1:393384097761:web:2699b53700c6cf57b944a0",
  measurementId: "G-XV8NL3S5W2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Analytics is optional. This avoids errors in some environments.
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;
