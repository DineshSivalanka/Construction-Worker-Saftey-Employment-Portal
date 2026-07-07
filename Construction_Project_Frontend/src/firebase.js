import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwGoUjSygzwCRS7XZK9Wfazi8aTEDicnw",
  authDomain: "constructionproject-dc006.firebaseapp.com",
  projectId: "constructionproject-dc006",
  storageBucket: "constructionproject-dc006.firebasestorage.app",
  messagingSenderId: "369155890019",
  appId: "1:369155890019:web:f361b4fc66b14e07491156",
  measurementId: "G-P2ZVHCBXV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
