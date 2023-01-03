import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCH5oTcduubaDq1LJqYaVi2XK0N22n1B1w",
  authDomain: "react-course-6d3c5.firebaseapp.com",
  projectId: "react-course-6d3c5",
  storageBucket: "react-course-6d3c5.appspot.com",
  messagingSenderId: "700765346866",
  appId: "1:700765346866:web:f3f0fcb43149f50d7a702b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);