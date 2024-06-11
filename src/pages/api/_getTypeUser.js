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
      const profesorData = profesorSnap.data();

      if (profesorData.aceptado) {
        return res.status(200).json({ message: 'Usuario verificado exitosamente', tipo: "profesor" });
      } else {
        return res.status(200).json({ message: 'Usuario no aceptado', tipo: "profesorInvalido" });
      }
    }


    const alumnoRef = db.collection('alumnos').doc(uid);
    const alumnoSnap = await alumnoRef.get();

    if (alumnoSnap.exists) {
      return res.status(200).json({ message: 'Usuario verificado exitosamente', tipo: "alumno" });
    }



    const administradorRef = db.collection('administradores').doc(uid);
    const administradorSnap = await administradorRef.get();

    if (administradorSnap.exists) {
      return res.status(200).json({ message: 'Usuario verificado exitosamente', tipo: "admin" });
    }



    res.status(200).json({ message: 'Usuario no encontrado' , tipo: "error"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
}









    

   
