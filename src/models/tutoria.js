export class Tutoria {
    constructor({ 
      id, 
      id_alumno, 
      id_profesor, 
      titulo, 
      descripcion, 
      fotografia, 
      areaProgramacion, 
      duracion = '1 hora', 
      linkMeet, 
      fechaInicio,
      horaInicio,
      costo
    }) {
      this.id = id;
      this.id_alumno = id_alumno;
      this.id_profesor = id_profesor;
      this.titulo = titulo;
      this.fechaInicio = fechaInicio;
      this.descripcion = descripcion;
      this.fotografia = fotografia
      this.areaProgramacion = areaProgramacion;
      this.duracion = duracion;
      this.linkMeet = linkMeet;
      this.horaInicio = horaInicio;
      this.costo = costo;
    }
  
    static converter = {
      toFirestore: (tutoria) => {
        return {
            costo: tutoria.costo,
       id_alumno: tutoria.id_alumno,
          id_profesor: tutoria.id_profesor,
          titulo: tutoria.titulo,
          fechaInicio: tutoria.fechaInicio,
          descripcion: tutoria.descripcion,
          fotografia: tutoria.fotografia,
          areaProgramacion: tutoria.areaProgramacion,
          duracion: tutoria.duracion,
          linkMeet: tutoria.linkMeet,
          horaInicio: tutoria.horaInicio,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Tutoria({
          id: snapshot.id,
          id_alumno: data.id_alumno,
          id_profesor: data.id_profesor,
          titulo: data.titulo,
          descripcion: data.descripcion,
          fotografia: data.fotografia,
          areaProgramacion: data.areaProgramacion,
          duracion: data.duracion,
          linkMeet: data.linkMeet,
          horaInicio: data.horaInicio,
          fechaInicio: data.fechaInicio,
          costo: data.costo
        });
      }
    }
  }
  