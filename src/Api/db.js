// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);;
export const FIREBASE_DB = firebase.firestore(FIREBASE_APP);
export const FIREBASE_STORAGE = firebase.storage(FIREBASE_APP);

export const PRODUCTOS = FIREBASE_DB.collection('productos');
export const ENTRADAS = FIREBASE_DB.collection('entradas');
export const SALIDAS = FIREBASE_DB.collection('salidas');
