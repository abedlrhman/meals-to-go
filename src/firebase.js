import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJw15R7A_Gm68sLovAmjTRhrxb7HvdZEQ",
  authDomain: "mealstogo-2ad50.firebaseapp.com",
  projectId: "mealstogo-2ad50",
  storageBucket: "mealstogo-2ad50.appspot.com",
  messagingSenderId: "527935926800",
  appId: "1:527935926800:web:03f4598bc559fdd3ff5095",
};

initializeApp(firebaseConfig);


const auth = getAuth();

export { auth };
