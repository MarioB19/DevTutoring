// Firebase Admin SDK
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    // databaseURL: "https://<TU-PROYECTO>.firebaseio.com"
  });
}

// Exporta la instancia de admin para su uso en el lado del servidor
export { admin };


