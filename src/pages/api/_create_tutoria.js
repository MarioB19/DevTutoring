

import { Tutoria } from '@/models/tutoria';
import { admin } from '@/config/firebase-config-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      const { id_profesor, title, description, area, linkMeet, fechaInicio, horaInicio ,costo , foto} = req.body;

      const db = admin.firestore();
      const storage = admin.storage();

      const nuevaTutoria = new Tutoria({
        id_alumno: "" ,
        id_profesor: id_profesor,
        titulo : title,
        descripcion: description,
        areaProgramacion : area,
        linkMeet,
        horaInicio,
        fechaInicio,
        costo,
        fotografia: foto

      });


      await db.collection('tutorias').withConverter(Tutoria.converter).add(nuevaTutoria);

      res.status(200).json({ message: 'Tutoría guardada con éxito' });
    } catch (error) {
      console.error('Error guardando la tutoría', error);
      res.status(500).json({ error: 'Error al guardar la tutoría' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
