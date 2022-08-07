import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJfx36jPa8LnTgkVzyo-jJ7t10yhNEsJ8",
  authDomain: "image-spa.firebaseapp.com",
  projectId: "image-spa",
  storageBucket: "image-spa.appspot.com",
  messagingSenderId: "1013336426530",
  appId: "1:1013336426530:web:211340c4601740e3f8a27b",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage }
