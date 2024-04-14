
import React, { useState } from 'react';
import AlumnoCard from './card-alumno';
import Image from "next/image";

const ToggleCardAlumno = ({ alumno }) => { // Asumiendo que 'alumno' se pasa como prop
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  const handleImageClick = () => {
    setMostrarTarjeta(true);
  };

  const handleClose = () => {
    setMostrarTarjeta(false);
  };

  // Cierra el modal si se hace clic fuera del contenido del alumnoCard
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      handleClose();
    }
  };

  return (
    <div>
          <div className="absolute bottom-0 right-0 mr-[1rem]"> {/* Ajusta el margen negativo aquí */}
          <div className="w-12 h-12 mb-1 relative" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
      <Image
        src= {alumno.fotoPerfil} // Sustituye esto por la URL de tu imagen
        alt="Foto del creador"
        layout="fill"
        className="rounded-full object-cover"
      />
    </div>


  </div>
      {mostrarTarjeta && (
        <div
          id="backdrop"
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AlumnoCard
              key={alumno.id}
              nombreCompleto={alumno.nombreCompleto}
              correoElectronico={alumno.correoElectronico}
       
              fotoPerfil={alumno.fotoPerfil}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleCardAlumno;
