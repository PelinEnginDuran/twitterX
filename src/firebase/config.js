// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJN3Lrhfp8eXUYjVXOpWg_PJT-e4xDL4o",
  authDomain: "twitter-x-dc99f.firebaseapp.com",
  projectId: "twitter-x-dc99f",
  storageBucket: "twitter-x-dc99f.appspot.com",
  messagingSenderId: "1018233929860",
  appId: "1:1018233929860:web:1c955edfbb6f7fa365c2d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth =getAuth(app)


//provider
 export const provider = new GoogleAuthProvider()


 export const db = getFirestore(app)


 export const storage = getStorage(app)