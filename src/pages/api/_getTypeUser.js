import { admin } from '@/config/firebase-config-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { uid } = req.body;
    const db = admin.firestore();


    const profesorRef = db.collection('profesores').doc(uid);
    const profesorSnap = await profesorRef.get();

    if (profesorSnap.exists) {
      return res.status(200).json({ message: 'Usuario verificado exitosamente', tipo: "profesor" });
    }


    const alumnoRef = db.collection('alumnos').doc(uid);
    const alumnoSnap = await alumnoRef.get();

    if (alumnoSnap.exists) {
      return res.status(200).json({ message: 'Usuario verificado exitosamente', tipo: "alumno" });
    }


    res.status(200).json({ message: 'Usuario no encontrado' , tipo: "error"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
}









    

   
