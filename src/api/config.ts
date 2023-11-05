import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyB1a1F4nMswJ60bp2VVw9daJS05-FgLQH0",
  authDomain: "nuxt3-online-chess.firebaseapp.com",
  projectId: "nuxt3-online-chess",
  storageBucket: "nuxt3-online-chess.appspot.com",
  messagingSenderId: "857037525606",
  appId: "1:857037525606:web:c9f7c0a76d0642aed013a7"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { firestore, auth }