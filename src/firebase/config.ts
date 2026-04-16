import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtXB_VBpFG52OaDwo_t1oyAFuqq3N_nyo",
  authDomain: "learn-lingo-5a9a6.firebaseapp.com",
  databaseURL: "https://learn-lingo-5a9a6-default-rtdb.firebaseio.com",

  projectId: "learn-lingo-5a9a6",
  storageBucket: "learn-lingo-5a9a6.firebasestorage.app",
  messagingSenderId: "270564844614",
  appId: "1:270564844614:web:4b0201d869268fc7161647",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
