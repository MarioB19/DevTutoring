import React, { useState } from 'react';
import ProfesorCard from './card-profesor';
import Image from "next/image";

const ToggleCardProfesor = ({ profesor }) => { 
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  const handleImageClick = () => {
    setMostrarTarjeta(true);
  };

  const handleClose = () => {
    setMostrarTarjeta(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      handleClose();
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-24 h-24 mb-4 relative" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        <Image
          src={profesor.fotoPerfil}
          alt="Foto del creador"
          layout="fill"
          className="rounded-full object-cover"
        />
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
            <ProfesorCard
              key={profesor.id}
              nombreCompleto={profesor.nombreCompleto}
              correoElectronico={profesor.correoElectronico}
              descripcionPerfil={profesor.descripcionPerfil}
              fotoPerfil={profesor.fotoPerfil}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleCardProfesor;
