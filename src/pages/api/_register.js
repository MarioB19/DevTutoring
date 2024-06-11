import { FirestoreInstance } from '../../config/firestore-instance';
import { admin } from '@/config/firebase-config-admin'; 

import { Timestamp } from '@google-cloud/firestore';
import { Profesor } from '../../models/profesor';
import { Alumno } from '@/models/alumno';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }


  try {
    const { nombreCompleto, fechaNacimiento, correoElectronico, descripcionPerfil, tipoUsuario,password } = req.body;


      const userRecord = await admin.auth().createUser({
        email: correoElectronico,
        password: password, 
      });
      console.log("Usuario creado exitosamente:", userRecord.uid);



    let document;

    if (tipoUsuario === "alumno") {
      const nuevoAlumno = new Alumno({
        correoElectronico,
        nombreCompleto,

      });

      const alumno = new FirestoreInstance("alumnos", Alumno.converter);
      document = await alumno.create(userRecord.uid, nuevoAlumno);
    } else {
      const fechaNacimientoTimestamp = Timestamp.fromDate(new Date(fechaNacimiento));
      const nuevoProfesor = new Profesor({
        nombreCompleto,
        fechaNacimiento: fechaNacimientoTimestamp,
        correoElectronico,
        descripcionPerfil,
        aceptado: false,
        
      });

      const profesor = new FirestoreInstance("profesores", Profesor.converter);
      document = await profesor.create(userRecord.uid,nuevoProfesor);
    }


    res.status(200).json({ message: 'Usuario registrado correctamente', id: document.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
}
