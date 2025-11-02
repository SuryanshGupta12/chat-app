import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDAxCNO1wKfelyn4QuGh52pEHAmGYVGLjQ",
  authDomain: "chat-app-3000f.firebaseapp.com",
  databaseURL: "https://chat-app-3000f-default-rtdb.firebaseio.com",
  projectId: "chat-app-3000f",
  storageBucket: "chat-app-3000f.firebasestorage.app",
  messagingSenderId: "549361722055",
  appId: "1:549361722055:web:0f7e42a60b40724b9e54e2",
  measurementId: "G-3DLNGQFRH3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const messaging = getMessaging(app);