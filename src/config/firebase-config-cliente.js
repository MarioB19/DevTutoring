
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  };
  
  


// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtén una instancia de Firebase Auth
const auth = getAuth(firebaseApp);

export { firebaseApp, auth , signInWithEmailAndPassword, onAuthStateChanged}; // Exporta la app y la instancia de auth para usarlas en otros archivos
 