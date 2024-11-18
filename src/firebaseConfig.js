// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsoihZi5t4vTX75RDsbIZyrtcns3dOeMs",
  authDomain: "blogging-app-84e34.firebaseapp.com",
  projectId: "blogging-app-84e34",
  storageBucket: "blogging-app-84e34.firebasestorage.app",
  messagingSenderId: "433563786461",
  appId: "1:433563786461:web:df79750ba3244bd7db4f34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };

