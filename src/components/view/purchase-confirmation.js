// components/view/purchase-confirmation.js
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { handleCreateOrder } from "@/controllers/controller-order";
import ToggleCardProfesor from "./toggle-card-profesor";

const PurchaseConfirmation = ({ costo, id, titulo, descripcion, areaProgramacion, fotografia, fechaInicio, horaInicio, profesor, onComprar }) => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const areaMap = {
    "01": "Programación Básica y Algorítmica",
    "02": "Desarrollo Web Frontend",
    "03": "Desarrollo Web Backend",
    "04": "Desarrollo Móvil"
  };

  const area = areaMap[areaProgramacion] || "Área desconocida";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-600 mb-4">Confirmar Compra</h1>
        {fotografia && (
          <div className="w-full h-48 relative mb-4">
            <Image
              src={fotografia}
              alt={`Imagen de la tutoría ${titulo}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        <p className="text-gray-900 font-bold text-xl mb-2">{titulo}</p>
        <p className="text-gray-700 text-base mb-4">{descripcion}</p>
        <p className="text-black text-base mb-2">Área: {area}</p>
        <p className="text-green-900 font-bold text-base mb-2">Fecha: {fechaInicio} a las {horaInicio}</p>
        <p className="text-red-600 text-xl mb-1">Costo: ${costo}</p>
        <div className="flex justify-center mb-4">
          <ToggleCardProfesor profesor={profesor} />
        </div>
        <PayPalScriptProvider
          options={{
            clientId: "AeebljmVdQuktuS4FyaIXDjI_JU29ceXgDaIlwy49WCuBrsVqktOKbEhlnkcl4n3URjmiUxXz1TVq2yR",
            currency: "MXN",
          }}
        >
          <PayPalButtons
            createOrder={() => handleCreateOrder(costo)}
            onCancel={() => alert("Compra cancelada")}
            onApprove={(data, actions) => {
              actions.order.capture().then(() => {
                onComprar(id);
              });
            }}
            style={{ layout: "horizontal", color: "blue" }}
          />
        </PayPalScriptProvider>
        <button
          onClick={handleCancel}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PurchaseConfirmation;
