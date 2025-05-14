import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "global-course-459521-h6.firebaseapp.com",
  projectId: "global-course-459521-h6",
  storageBucket: "global-course-459521-h6.firebasestorage.app",
  messagingSenderId: "145747364124",
  appId: "1:145747364124:web:a402b3d32913f3035452d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default app;
export { db };
