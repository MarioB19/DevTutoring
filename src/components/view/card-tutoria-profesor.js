import React from "react";
import Image from "next/image";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; 

import { format, parseISO } from 'date-fns';
import ToggleCardAlumno from "./toggle-card-alumno";

const TutoriaCardProfesor = ({ tutoria, onEliminar , alumno}) => {

  function formatDateString(dateString) {
    const date = parseISO(dateString); 
    return format(date, 'dd/MM/yyyy'); 
  }

  
  const handleEliminarTutoria = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que quieres eliminar esta tutoría?",
      buttons: [
        {
          label: "Sí",
          onClick: () => onEliminar(id),
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
    fechaInicio,
    horaInicio,
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

  const dateFormated = formatDateString(fechaInicio);


  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative">
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
          <p className="text-green-900 font-bold text-base mb-2">Fecha: {dateFormated} a las {horaInicio}</p>
          <a
            href={linkMeet}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unirse a la reunión
          </a>
        </div>
        <div className="mt-4">
          <p
            className={`text-sm font-semibold mb-4 ${
              reservada ? "text-red-500" : "text-green-500"
            }`}
          >
            {reservada ? "Reservada" : "Disponible"}
          </p>

          {!reservada && (
            <button
              onClick={() => handleEliminarTutoria(id)}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Eliminar
            </button>
          )}


          {reservada && (
            <ToggleCardAlumno alumno={alumno}></ToggleCardAlumno>
          )}

       
        </div>
   
      </div>
    </div>
  );
};

export default TutoriaCardProfesor;
