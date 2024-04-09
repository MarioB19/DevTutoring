export class Alumno {
    constructor({ id, nombreCompleto, telefono, correoElectronico }) {
      this.id = id;
      this.nombreCompleto = nombreCompleto;

      this.telefono = telefono;
      this.correoElectronico = correoElectronico;

      this.fotoPerfil = "https://firebasestorage.googleapis.com/v0/b/ssmat-96fb9.appspot.com/o/fotoPerfilDefault.png?alt=media&token=fcf39337-8730-4bcc-ba26-0f7b6bbd44fc";
  
    }
  
    static converter = {
      toFirestore: (alumno) => {
        return {
          nombreCompleto: alumno.nombreCompleto,
          telefono: alumno.telefono,
          correoElectronico: alumno.correoElectronico,
          fotoPerfil: alumno.fotoPerfil,

        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Alumno({
          id: snapshot.id,
          nombreCompleto: data.nombreCompleto,
    
          telefono: data.telefono,
          correoElectronico: data.correoElectronico,
   
          fotoPerfil: data.fotoPerfil,

        });
      }
    }
  }
  