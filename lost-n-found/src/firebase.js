import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCr2qUIy73znpy9ma3AWQDitXDJKxteWpQ",
  authDomain: "hackillinois-b04fb.firebaseapp.com",
  databaseURL: "https://hackillinois-b04fb-default-rtdb.firebaseio.com",
  projectId: "hackillinois-b04fb",
  storageBucket: "hackillinois-b04fb.appspot.com",
  messagingSenderId: "1047962155910",
  appId: "1:1047962155910:web:d86e803998741a497fca07",
  measurementId: "G-9YB22RDP48"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);



export default firebaseConfig;
