// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import dotenv from "dotenv";
// dotenv.config();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqoiNLGty3IaMfwiS2kB2VuGQ07zSrVXY",
  authDomain: "mern-realestate-12f5c.firebaseapp.com",
  projectId: "mern-realestate-12f5c",
  storageBucket: "mern-realestate-12f5c.appspot.com",
  messagingSenderId: "922132447138",
  appId: "1:922132447138:web:ee33c110675328aa4b7cfb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
