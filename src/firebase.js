
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd9VmlZFCeBPSYLi73_yhjpQwBVZ-YF0U",
  authDomain: "subscriptionmilk.firebaseapp.com",
  projectId: "subscriptionmilk",
  storageBucket: "subscriptionmilk.appspot.com",
  messagingSenderId: "693011215013",
  appId: "1:693011215013:web:31c0ea94698b93e647934c",
  measurementId: "G-K65SZE1YPX"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);