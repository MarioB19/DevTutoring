import React from "react";
import Image from "next/image";
import { confirmAlert } from "react-confirm-alert"; // Importa confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"; // Importa los estilos por defecto

const TutoriaCardView = ({ tutoria, onComprar }) => {
  const handleComprarTutoria = (id) => {
    confirmAlert({
      title: "Confirmar compra",
      message: "¿Estás seguro de que quieres realizar la compra",
      buttons: [
        {
          label: "Sí",
          onClick: () => onComprar(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const {
    titulo,
    descripcion,
    linkMeet,
    areaProgramacion,
    costo,
    reservada,
    id,
    fotografia,
  } = tutoria;
  var area = "";
  switch (areaProgramacion) {
    case "01":
      area = "Programación Básica y Algorítmica";
      break;
    case "02":
      area = "Desarrollo Web Frontend";
      break;
    case "03":
      area = "Desarrollo Web Backend";
      break;

    case "04":
      area = "Desarrollo Móvil";
      break;
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {fotografia && (
        <div className="w-full h-48 relative">
          <Image
            src={fotografia}
            alt={`Imagen de la tutoría ${titulo}`}
            layout="fill"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="border-t border-purple-200 p-4 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h3 className="text-gray-900 font-bold text-xl mb-2">{titulo}</h3>
          <p className="text-gray-700 text-base mb-4">{descripcion}</p>
          <p className="text-black text-base mb-2">Área: {area}</p>
          <p className="text-red-600 text-xl mb-1">Costo: ${costo}</p>
       
        </div>
        <div className="mt-4">
          <button
            onClick={() => handleComprarTutoria(id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutoriaCardView;
