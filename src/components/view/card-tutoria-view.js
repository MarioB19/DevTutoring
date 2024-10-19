import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import "react-confirm-alert/src/react-confirm-alert.css";
import ToggleCardProfesor from "./toggle-card-profesor";
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, DollarSign, BookOpen, Video } from 'lucide-react';

const TutoriaCardView = ({ profesorTutoria, type }) => {
  const router = useRouter();

  function formatDateString(dateString) {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy');
  }

  const {
    tutoria: {
      titulo,
      descripcion,
      linkMeet,
      areaProgramacion,
      costo,
      reservada,
      id,
      fotografia,
      fechaInicio,
      horaInicio
    },
  } = profesorTutoria;

  const dateFormated = formatDateString(fechaInicio);
  const { profesor } = profesorTutoria;

  const handleComprarClick = () => {
    router.push({
      pathname: '/purchase-confirmation',
      query: { costo, id, titulo, descripcion, areaProgramacion, fotografia, fechaInicio, horaInicio, profesor: JSON.stringify(profesor) },
    });
  };

  const renderAction = () => {
    if (type === "alumno" && reservada === false) {
      return (
        <button 
          onClick={handleComprarClick} 
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Comprar Tutoría
        </button>
      );
    }
  };

  const areasProgramacion = {
    "01": "Programación Básica y Algorítmica",
    "02": "Desarrollo Web Frontend",
    "03": "Desarrollo Web Backend",
    "04": "Desarrollo Móvil",
  };

  const area = areasProgramacion[areaProgramacion] || "Área no especificada";

  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:shadow-2xl">
      {fotografia && (
        <div className="w-full h-56 relative">
          <Image
            src={fotografia}
            alt={`Imagen de la tutoría ${titulo}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/70 to-transparent opacity-60"></div>
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-2xl">{titulo}</h3>
        </div>
      )}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-4">{descripcion}</p>
          <div className="flex items-center mb-2 text-purple-700">
            <BookOpen size={18} className="mr-2" />
            <p className="text-sm">{area}</p>
          </div>
          <div className="flex items-center mb-2 text-purple-700">
            <Calendar size={18} className="mr-2" />
            <p className="text-sm">{dateFormated}</p>
          </div>
          <div className="flex items-center mb-4 text-purple-700">
            <Clock size={18} className="mr-2" />
            <p className="text-sm">{horaInicio}</p>
          </div>
          <div className="flex items-center mb-4 text-green-600 font-bold">
            <DollarSign size={18} className="mr-2" />
            <p className="text-xl">{costo} pesos MXN</p>
          </div>

          {type === "mine" && (
            <a
              href={linkMeet}
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video size={18} className="mr-2" />
              Unirse a la reunión
            </a>
          )}
        </div>
      </div>

      <ToggleCardProfesor profesor={profesor} />

      <div className="px-6 pb-6">
        {renderAction()}
      </div>
    </div>
  );
};

export default TutoriaCardView;