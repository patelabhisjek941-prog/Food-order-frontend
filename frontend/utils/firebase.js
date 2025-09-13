// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "food-order-and-delivery-931fa.firebaseapp.com",
    projectId: "food-order-and-delivery-931fa",
    storageBucket: "food-order-and-delivery-931fa.firebasestorage.app",
    messagingSenderId: "947795759261",
    appId: "1:947795759261:web:9498436744608d42320474",
    measurementId: "G-7VLW5H87J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export { auth, provider };

