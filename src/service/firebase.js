import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PRODUCT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp);
