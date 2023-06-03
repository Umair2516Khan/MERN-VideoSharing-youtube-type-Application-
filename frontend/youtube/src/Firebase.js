// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_1rWAJmoA2C2J-JQPiyD7Kh-dHTV3Q54",
  authDomain: "by-uk-76b31.firebaseapp.com",
  projectId: "by-uk-76b31",
  storageBucket: "by-uk-76b31.appspot.com",
  messagingSenderId: "746455645716",
  appId: "1:746455645716:web:fc84d1951e5413145bf101",
  measurementId: "G-W37LDBC7F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;