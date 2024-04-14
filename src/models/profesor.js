export class Profesor {
  constructor({ id, nombreCompleto, fechaNacimiento, correoElectronico, descripcionPerfil,username }) {
    this.id = id;
    this.nombreCompleto = nombreCompleto;
    this.fechaNacimiento = fechaNacimiento;

    this.correoElectronico = correoElectronico;
    this.descripcionPerfil = descripcionPerfil;
    this.fotoPerfil = "https://firebasestorage.googleapis.com/v0/b/ssmat-96fb9.appspot.com/o/fotoPerfilDefault.png?alt=media&token=fcf39337-8730-4bcc-ba26-0f7b6bbd44fc";

  }

  static converter = {
    toFirestore: (profesor) => {
      return {
        nombreCompleto: profesor.nombreCompleto,
        fechaNacimiento: profesor.fechaNacimiento,
  
        correoElectronico: profesor.correoElectronico,
        descripcionPerfil: profesor.descripcionPerfil,
        fotoPerfil: profesor.fotoPerfil,
  
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Profesor({
        id: snapshot.id,
        nombreCompleto: data.nombreCompleto,
        fechaNacimiento: data.fechaNacimiento,
  
        correoElectronico: data.correoElectronico,
        descripcionPerfil: data.descripcionPerfil,
        fotoPerfil: data.fotoPerfil,

      });
    }
  }
}
