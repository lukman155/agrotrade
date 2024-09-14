// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDH5trTFi707FJjPSXeIer4p05SuGP_8k",
  authDomain: "agrotrade-c6541.firebaseapp.com",
  projectId: "agrotrade-c6541",
  storageBucket: "agrotrade-c6541.appspot.com",
  messagingSenderId: "825864164805",
  appId: "1:825864164805:web:9e15e8bbeb730599d227ac",
  measurementId: "G-5G988K52SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };