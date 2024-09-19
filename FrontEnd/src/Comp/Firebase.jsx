
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyB6UwUS2LGv_YgeXY_b0pCMnIwJlI9C8zE",
  authDomain: "fitnessnetwork-507de.firebaseapp.com",
  projectId: "fitnessnetwork-507de",
  storageBucket: "fitnessnetwork-507de.appspot.com",
  messagingSenderId: "999890820992",
  appId: "1:999890820992:web:8ce51f482f8b9581e42b65",
  measurementId: "G-3FJY6JCHCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };


