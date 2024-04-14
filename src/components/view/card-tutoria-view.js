import React from "react";
import Image from "next/image";

import "react-confirm-alert/src/react-confirm-alert.css"; 
import ToggleCardProfesor from "./toggle-card-profesor";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { format, parseISO } from 'date-fns';

const TutoriaCardView = ({ profesorTutoria, onComprar, type }) => {

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


  const renderAction = () => {
    if (type === "alumno" && reservada === false) {
      return (
        <div className="flex justify-start mb-[12px] ml-3">
          {" "}
    
          <PayPalScriptProvider
            options={{
              clientId:
                "AeebljmVdQuktuS4FyaIXDjI_JU29ceXgDaIlwy49WCuBrsVqktOKbEhlnkcl4n3URjmiUxXz1TVq2yR",
              currency: "MXN",
            }}
          >
            <PayPalButtons
              createOrder={async (data, actions) => {
                try {
                  const res = await fetch("/api/payment", {
                    method: "POST",
                    body: JSON.stringify({ costo: costo }),
                  });
                  const orderData = await res.json();
                  return orderData.id;
                } catch (error) {
                  console.error("Error al crear la orden:", error);
                  throw new Error("No se pudo crear la orden"); 
                }
              }}
              onCancel={(data) => alert("Compra cancelada")}
              onApprove={(data, actions) => {
                console.log(data);
                 actions.order.capture();
                onComprar(id);
              }}
              style={{ layout: "horizontal", color: "blue" }}
            />
          </PayPalScriptProvider>
        </div>
      );
    }

  };

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
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative">
      {fotografia && (
        <div className="w-full h-48 relative">
          <Image
            src={fotografia}
            alt={`Imagen de la tutoría ${titulo}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="border-t border-purple-200 p-4 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h3 className="text-gray-900 font-bold text-xl mb-2">{titulo}</h3>
          <p className="text-gray-700 text-base mb-4">{descripcion}</p>
          <p className="text-black text-base mb-2">Área: {area}</p>
          <p className="text-green-900 font-bold text-base mb-2">Fecha: {dateFormated} a las {horaInicio}</p>
          <p className="text-red-600 text-xl mb-1">Costo: ${costo}</p>

          {type === "mine" && (
        <a
          href={linkMeet}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unirse a la reunión
        </a>
      )}

        </div>
      </div>

      <ToggleCardProfesor profesor={profesor}> </ToggleCardProfesor>

      <div>{renderAction()}</div>
    </div>

  );
};

export default TutoriaCardView;
