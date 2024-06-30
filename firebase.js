// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8hGA9qUG50TX0r_l8PI4NbCnpw4lmpwk",
  authDomain: "social-forum-33322.firebaseapp.com",
  projectId: "social-forum-33322",
  storageBucket: "social-forum-33322.appspot.com",
  messagingSenderId: "568912950650",
  appId: "1:568912950650:web:0f6db70b07738e576f12c3",
  measurementId: "G-CJPF5DQCZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);