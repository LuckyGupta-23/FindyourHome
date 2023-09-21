// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApoE5FpoCPNWbgj2hOyMYb0jN-J5wK678",
  authDomain: "the-property-rent-sell.firebaseapp.com",
  projectId: "the-property-rent-sell",
  storageBucket: "the-property-rent-sell.appspot.com",
  messagingSenderId: "807672348564",
  appId: "1:807672348564:web:4c6ba3c47fa96b3a2ed981"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();